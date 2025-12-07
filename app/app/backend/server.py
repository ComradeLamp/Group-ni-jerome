from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from models import (
    Vehicle, VehicleCreate, VehicleType, VehicleStatus,
    Appointment, AppointmentCreate, AppointmentStatus,
    Inquiry, InquiryCreate, InquiryStatus
)
from seed_data import vehicles_data


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Helper function to convert MongoDB document to dict
def doc_to_dict(doc):
    if doc:
        doc['_id'] = str(doc['_id'])
        return doc
    return None


# Seed database on startup
@app.on_event("startup")
async def seed_database():
    # Check if vehicles collection is empty
    count = await db.vehicles.count_documents({})
    if count == 0:
        logger.info("Seeding database with vehicle data...")
        for vehicle_data in vehicles_data:
            await db.vehicles.insert_one(vehicle_data)
        logger.info(f"Successfully seeded {len(vehicles_data)} vehicles")


# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "McLaren Dealership API", "status": "running"}


# Vehicles Endpoints
@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles(
    type: Optional[str] = Query(None),
    minPrice: Optional[float] = Query(None),
    maxPrice: Optional[float] = Query(None),
    search: Optional[str] = Query(None)
):
    """Get all vehicles with optional filtering"""
    query = {}
    
    if type and type != "all":
        query["type"] = type
    
    if minPrice is not None or maxPrice is not None:
        query["price"] = {}
        if minPrice is not None:
            query["price"]["$gte"] = minPrice
        if maxPrice is not None:
            query["price"]["$lte"] = maxPrice
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"color": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    vehicles = await db.vehicles.find(query).to_list(100)
    return [doc_to_dict(v) for v in vehicles]


@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    """Get a single vehicle by ID"""
    try:
        vehicle = await db.vehicles.find_one({"_id": ObjectId(vehicle_id)})
        if not vehicle:
            raise HTTPException(status_code=404, detail="Vehicle not found")
        return doc_to_dict(vehicle)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid vehicle ID: {str(e)}")


@api_router.post("/vehicles", response_model=Vehicle)
async def create_vehicle(vehicle: VehicleCreate):
    """Create a new vehicle (Admin endpoint)"""
    vehicle_dict = vehicle.dict()
    vehicle_dict['createdAt'] = datetime.utcnow()
    vehicle_dict['updatedAt'] = datetime.utcnow()
    
    result = await db.vehicles.insert_one(vehicle_dict)
    created_vehicle = await db.vehicles.find_one({"_id": result.inserted_id})
    return doc_to_dict(created_vehicle)


# Appointments Endpoints
@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(appointment: AppointmentCreate):
    """Create a new test drive appointment"""
    # Verify vehicle exists
    try:
        vehicle = await db.vehicles.find_one({"_id": ObjectId(appointment.vehicleId)})
        if not vehicle:
            raise HTTPException(status_code=404, detail="Vehicle not found")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid vehicle ID")
    
    appointment_dict = appointment.dict()
    appointment_dict['status'] = AppointmentStatus.pending.value
    appointment_dict['createdAt'] = datetime.utcnow()
    appointment_dict['updatedAt'] = datetime.utcnow()
    
    result = await db.appointments.insert_one(appointment_dict)
    created_appointment = await db.appointments.find_one({"_id": result.inserted_id})
    return doc_to_dict(created_appointment)


@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    """Get all appointments (Admin endpoint)"""
    appointments = await db.appointments.find().sort("createdAt", -1).to_list(100)
    return [doc_to_dict(a) for a in appointments]


# Inquiries Endpoints
@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(inquiry: InquiryCreate):
    """Create a new inquiry/contact form submission"""
    # Verify vehicle exists if vehicleId provided
    if inquiry.vehicleId:
        try:
            vehicle = await db.vehicles.find_one({"_id": ObjectId(inquiry.vehicleId)})
            if not vehicle:
                raise HTTPException(status_code=404, detail="Vehicle not found")
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid vehicle ID")
    
    inquiry_dict = inquiry.dict()
    inquiry_dict['status'] = InquiryStatus.new.value
    inquiry_dict['createdAt'] = datetime.utcnow()
    inquiry_dict['updatedAt'] = datetime.utcnow()
    
    result = await db.inquiries.insert_one(inquiry_dict)
    created_inquiry = await db.inquiries.find_one({"_id": result.inserted_id})
    return doc_to_dict(created_inquiry)


@api_router.get("/inquiries", response_model=List[Inquiry])
async def get_inquiries():
    """Get all inquiries (Admin endpoint)"""
    inquiries = await db.inquiries.find().sort("createdAt", -1).to_list(100)
    return [doc_to_dict(i) for i in inquiries]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()