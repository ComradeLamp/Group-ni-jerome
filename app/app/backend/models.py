from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from enum import Enum

# Enums
class VehicleType(str, Enum):
    new = "new"
    used = "used"

class VehicleStatus(str, Enum):
    available = "available"
    sold = "sold"
    reserved = "reserved"

class AppointmentStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"

class InquiryStatus(str, Enum):
    new = "new"
    responded = "responded"
    closed = "closed"

# Vehicle Models
class VehicleBase(BaseModel):
    name: str
    type: VehicleType
    year: int
    price: float
    mileage: int = 0
    engine: str
    horsepower: int
    torque: str
    transmission: str
    color: str
    image: str
    images: List[str]
    features: List[str]
    description: str
    status: VehicleStatus = VehicleStatus.available

class VehicleCreate(VehicleBase):
    pass

class Vehicle(VehicleBase):
    id: str = Field(alias="_id")
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

# Appointment Models
class AppointmentBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    vehicleId: str
    date: str
    timeSlot: str
    message: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class Appointment(AppointmentBase):
    id: str = Field(alias="_id")
    status: AppointmentStatus = AppointmentStatus.pending
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

# Inquiry Models
class InquiryBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    vehicleId: Optional[str] = None

class InquiryCreate(InquiryBase):
    pass

class Inquiry(InquiryBase):
    id: str = Field(alias="_id")
    status: InquiryStatus = InquiryStatus.new
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
