import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Car, Calculator, Calendar, Phone, Award, Wrench, ChevronRight } from 'lucide-react';
import { testimonials, services } from '../mockData';
import { getVehicles } from '../services/api';

const Home = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const vehicles = await getVehicles({ type: 'new' });
        setFeaturedVehicles(vehicles.slice(0, 3));
      } catch (error) {
        console.error('Error loading vehicles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadVehicles();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Experience
              <span className="hero-highlight"> McLaren Excellence</span>
            </h1>
            <p className="hero-description">
              Discover the pinnacle of automotive engineering. From track-focused supercars to grand tourers, explore our exclusive collection of new and certified pre-owned McLaren vehicles.
            </p>
            <div className="hero-buttons">
              <Link to="/inventory">
                <Button size="lg" className="cta-primary">
                  View Inventory
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/appointment">
                <Button size="lg" variant="outline" className="cta-secondary">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Test Drive
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">Exceptional service at every touchpoint</p>
          </div>
          <div className="services-grid">
            {services.map((service) => {
              const IconComponent = { Car, Calculator, Award, Wrench }[service.icon];
              return (
                <div key={service.id} className="service-card">
                  <div className="service-icon">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Collection</h2>
            <p className="section-subtitle">Explore our latest McLaren supercars</p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading vehicles...</p>
            </div>
          ) : (
            <div className="vehicles-grid">
              {featuredVehicles.map((vehicle) => (
                <Link key={vehicle._id} to={`/vehicle/${vehicle._id}`} className="vehicle-card">
                  <div className="vehicle-image-wrapper">
                    <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
                    <div className="vehicle-badge">{vehicle.year}</div>
                  </div>
                  <div className="vehicle-info">
                    <h3 className="vehicle-name">{vehicle.name}</h3>
                    <div className="vehicle-specs">
                      <span>{vehicle.horsepower} HP</span>
                      <span className="spec-divider">•</span>
                      <span>{vehicle.engine}</span>
                    </div>
                    <div className="vehicle-footer">
                      <p className="vehicle-price">${vehicle.price.toLocaleString()}</p>
                      <Button variant="ghost" size="sm" className="view-details">
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="section-cta">
            <Link to="/inventory">
              <Button size="lg" variant="outline">
                View All Vehicles
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Client Experiences</h2>
            <p className="section-subtitle">What our McLaren owners say</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                  <div>
                    <p className="author-name">{testimonial.name}</p>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Own a McLaren?</h2>
          <p className="cta-description">
            Contact our team today to schedule a private viewing or test drive
          </p>
          <div className="cta-buttons">
            <Link to="/contact">
              <Button size="lg" className="cta-primary">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Link>
            <Link to="/financing">
              <Button size="lg" variant="outline" className="cta-secondary">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Financing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;