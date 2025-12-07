import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, Phone, Calculator, ChevronLeft, Check } from 'lucide-react';
import { getVehicle } from '../services/api';
import { toast } from 'sonner';

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setLoading(true);
        const data = await getVehicle(id);
        setVehicle(data);
      } catch (error) {
        console.error('Error loading vehicle:', error);
        toast.error('Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };
    loadVehicle();
  }, [id]);

  const handleInquiry = () => {
    toast.success('Inquiry Sent! Our team will contact you shortly.');
  };

  if (loading) {
    return (
      <div className="vehicle-detail-page">
        <div className="section-container">
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading vehicle details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="vehicle-detail-page">
        <div className="section-container">
          <div className="not-found text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Vehicle not found</h2>
            <Link to="/inventory">
              <Button>Back to Inventory</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vehicle-detail-page">
      <div className="section-container">
        <Link to="/inventory" className="back-link">
          <ChevronLeft className="h-4 w-4" />
          Back to Inventory
        </Link>

        <div className="vehicle-detail-grid">
          {/* Image Gallery */}
          <div className="gallery-section">
            <div className="main-image-wrapper">
              <img
                src={vehicle.images[selectedImage]}
                alt={vehicle.name}
                className="main-image"
              />
              <Badge className="vehicle-status-badge">
                {vehicle.type === 'new' ? 'New' : 'Certified Pre-Owned'}
              </Badge>
            </div>
            <div className="thumbnail-grid">
              {vehicle.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                >
                  <img src={image} alt={`View ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="info-section">
            <div className="vehicle-header">
              <div>
                <h1 className="vehicle-detail-title">{vehicle.name}</h1>
                <p className="vehicle-detail-subtitle">{vehicle.year} • {vehicle.color}</p>
              </div>
              <p className="vehicle-detail-price">${vehicle.price.toLocaleString()}</p>
            </div>

            <p className="vehicle-description">{vehicle.description}</p>

            {/* Quick Actions */}
            <div className="quick-actions">
              <Link to="/appointment" className="w-full">
                <Button size="lg" className="w-full cta-primary">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Test Drive
                </Button>
              </Link>
              <Link to="/financing" className="w-full">
                <Button size="lg" variant="outline" className="w-full">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Payment
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full" onClick={handleInquiry}>
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="specs" className="vehicle-tabs">
              <TabsList className="w-full">
                <TabsTrigger value="specs" className="flex-1">Specifications</TabsTrigger>
                <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="specs-content">
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Engine</span>
                    <span className="spec-value">{vehicle.engine}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Horsepower</span>
                    <span className="spec-value">{vehicle.horsepower} HP</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Torque</span>
                    <span className="spec-value">{vehicle.torque}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Transmission</span>
                    <span className="spec-value">{vehicle.transmission}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Year</span>
                    <span className="spec-value">{vehicle.year}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Mileage</span>
                    <span className="spec-value">
                      {vehicle.mileage === 0 ? 'Brand New' : `${vehicle.mileage.toLocaleString()} miles`}
                    </span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="features-content">
                <div className="features-list">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <Check className="feature-check" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;