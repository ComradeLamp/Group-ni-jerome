// Mock data for McLaren dealership

export const vehicles = [
  {
    id: '1',
    name: 'McLaren 720S',
    type: 'new',
    year: 2024,
    price: 310000,
    mileage: 0,
    engine: '4.0L V8 Twin-Turbo',
    horsepower: 710,
    torque: '568 lb-ft',
    transmission: '7-Speed SSG',
    color: 'Volcano Orange',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'
    ],
    features: ['Carbon Fiber Interior', 'Sport Exhaust', 'Parking Sensors', 'Premium Audio'],
    description: 'The 720S combines extreme performance with refined luxury.',
    status: 'available'
  },
  {
    id: '2',
    name: 'McLaren Artura',
    type: 'new',
    year: 2024,
    price: 237500,
    mileage: 0,
    engine: '3.0L V6 Hybrid',
    horsepower: 671,
    torque: '531 lb-ft',
    transmission: '8-Speed SSG',
    color: 'Azure Blue',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80'
    ],
    features: ['Hybrid Technology', 'Electric Range 11 miles', 'Active Dynamics', 'Lightweight Construction'],
    description: 'The Artura represents McLaren innovative plug-in hybrid supercar.',
    status: 'available'
  },
  {
    id: '3',
    name: 'McLaren 765LT',
    type: 'new',
    year: 2024,
    price: 382500,
    mileage: 0,
    engine: '4.0L V8 Twin-Turbo',
    horsepower: 755,
    torque: '590 lb-ft',
    transmission: '7-Speed SSG',
    color: 'Silica White',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'
    ],
    features: ['Longtail Aerodynamics', 'Titanium Exhaust', 'Carbon Fiber Body', 'Track Telemetry'],
    description: 'The 765LT is the ultimate track-focused McLaren with Longtail DNA.',
    status: 'available'
  },
  {
    id: '4',
    name: 'McLaren GT',
    type: 'new',
    year: 2024,
    price: 215000,
    mileage: 0,
    engine: '4.0L V8 Twin-Turbo',
    horsepower: 612,
    torque: '465 lb-ft',
    transmission: '7-Speed SSG',
    color: 'Onyx Black',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'
    ],
    features: ['Panoramic Roof', 'Touring Suspension', '420L Luggage Space', 'Premium Leather'],
    description: 'The GT combines supercar performance with grand touring comfort.',
    status: 'available'
  },
  {
    id: '5',
    name: 'McLaren 570S',
    type: 'used',
    year: 2021,
    price: 185000,
    mileage: 8500,
    engine: '3.8L V8 Twin-Turbo',
    horsepower: 562,
    torque: '443 lb-ft',
    transmission: '7-Speed SSG',
    color: 'Ventura Orange',
    image: 'https://images.unsplash.com/photo-1618843479619-f3d0d3f1b7f6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618843479619-f3d0d3f1b7f6?w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'
    ],
    features: ['Sport Exhaust', 'Carbon Fiber Package', 'Navigation', 'Parking Camera'],
    description: 'Certified Pre-Owned McLaren with full service history.',
    status: 'available'
  },
  {
    id: '6',
    name: 'McLaren 600LT Spider',
    type: 'used',
    year: 2020,
    price: 245000,
    mileage: 12000,
    engine: '3.8L V8 Twin-Turbo',
    horsepower: 592,
    torque: '457 lb-ft',
    transmission: '7-Speed SSG',
    color: 'Chicane Grey',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'
    ],
    features: ['Retractable Hardtop', 'Longtail Design', 'Carbon Fiber Seats', 'Track Mode'],
    description: 'Exceptional pre-owned 600LT Spider with low mileage.',
    status: 'available'
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'James Peterson',
    role: 'McLaren 720S Owner',
    content: 'The entire buying experience was exceptional. The team helped me configure my dream 720S and the delivery was seamless.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    role: 'McLaren Artura Owner',
    content: 'Professional, knowledgeable, and passionate about McLaren. They made the process of purchasing my first supercar stress-free.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'McLaren GT Owner',
    content: 'Outstanding service from start to finish. The financing team worked with me to create a perfect plan.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80'
  }
];

export const services = [
  {
    id: '1',
    title: 'Premium Selection',
    description: 'Curated collection of new and certified pre-owned McLaren vehicles',
    icon: 'Car'
  },
  {
    id: '2',
    title: 'Expert Financing',
    description: 'Tailored financing solutions with competitive rates for your McLaren',
    icon: 'Calculator'
  },
  {
    id: '3',
    title: 'White Glove Service',
    description: 'Personalized consultation and seamless delivery experience',
    icon: 'Award'
  },
  {
    id: '4',
    title: 'Certified Technicians',
    description: 'Factory-trained service team for maintenance and repairs',
    icon: 'Wrench'
  }
];

export const appointments = [];
export const inquiries = [];