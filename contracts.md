# McLaren Dealership - Backend Integration Contracts

## Current Mock Data (to be replaced)
Located in: `/app/frontend/src/mockData.js`
- `vehicles` array (6 vehicles with full details)
- `testimonials` array (3 testimonials)
- `services` array (4 service cards)
- `appointments` array (empty)
- `inquiries` array (empty)

## API Endpoints to Implement

### 1. Vehicles API
**Base Path**: `/api/vehicles`

#### GET /api/vehicles
- Returns all vehicles with optional filtering
- Query params: `type` (new/used), `minPrice`, `maxPrice`, `search`
- Response: Array of vehicle objects

#### GET /api/vehicles/:id
- Returns single vehicle by ID
- Response: Vehicle object

#### POST /api/vehicles (Admin - Optional for MVP)
- Create new vehicle listing
- Body: Vehicle data

### 2. Appointments API
**Base Path**: `/api/appointments`

#### POST /api/appointments
- Create new test drive appointment
- Body: `{ name, email, phone, vehicleId, date, timeSlot, message }`
- Response: Created appointment object

#### GET /api/appointments (Admin - Optional)
- Get all appointments
- Response: Array of appointments

### 3. Inquiries/Contact API
**Base Path**: `/api/inquiries`

#### POST /api/inquiries
- Submit contact form or vehicle inquiry
- Body: `{ name, email, phone, subject, message, vehicleId? }`
- Response: Created inquiry object

## MongoDB Models

### Vehicle Model
```
{
  _id: ObjectId,
  name: String (required),
  type: String (required, enum: ['new', 'used']),
  year: Number (required),
  price: Number (required),
  mileage: Number (default: 0),
  engine: String (required),
  horsepower: Number (required),
  torque: String (required),
  transmission: String (required),
  color: String (required),
  image: String (required, URL),
  images: [String] (array of URLs),
  features: [String] (array of feature strings),
  description: String (required),
  status: String (enum: ['available', 'sold', 'reserved'], default: 'available'),
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Model
```
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  vehicleId: ObjectId (required, ref: 'Vehicle'),
  date: Date (required),
  timeSlot: String (required),
  message: String,
  status: String (enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

### Inquiry Model
```
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String,
  subject: String (required),
  message: String (required),
  vehicleId: ObjectId (optional, ref: 'Vehicle'),
  status: String (enum: ['new', 'responded', 'closed'], default: 'new'),
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration Steps

1. **Remove mock data imports** from page components
2. **Replace with API calls** using axios
3. **Add loading states** for better UX
4. **Add error handling** with toast notifications
5. **Update forms** to submit to backend APIs

### Files to Update:
- `/app/frontend/src/pages/Home.jsx` - Fetch vehicles and testimonials
- `/app/frontend/src/pages/Inventory.jsx` - Fetch vehicles with filters
- `/app/frontend/src/pages/VehicleDetail.jsx` - Fetch single vehicle
- `/app/frontend/src/pages/Appointment.jsx` - Submit appointment to API
- `/app/frontend/src/pages/Contact.jsx` - Submit inquiry to API

## Implementation Order

1. ✅ Create MongoDB models (Vehicle, Appointment, Inquiry)
2. ✅ Seed database with mock vehicle data
3. ✅ Implement GET /api/vehicles (with filters)
4. ✅ Implement GET /api/vehicles/:id
5. ✅ Implement POST /api/appointments
6. ✅ Implement POST /api/inquiries
7. ✅ Update frontend to use APIs
8. ✅ Test all endpoints
9. ✅ Verify full integration

## Notes
- Keep testimonials and services as static data (no backend needed for MVP)
- All dates stored in ISO format
- Vehicle images use external URLs (Unsplash)
- Error responses follow standard format: `{ error: string, message: string }`
