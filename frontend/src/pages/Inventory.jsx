import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { getVehicles } from '../services/api';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('featured');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        const data = await getVehicles({
          type: typeFilter,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          search: searchTerm
        });
        setVehicles(data);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(loadVehicles, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, typeFilter, priceRange]);

  const filteredVehicles = useMemo(() => {
    let filtered = [...vehicles];

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'year') {
      filtered.sort((a, b) => b.year - a.year);
    }

    return filtered;
  }, [vehicles, sortBy]);

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div className="section-container">
          <h1 className="page-title">Our Inventory</h1>
          <p className="page-subtitle">Discover your perfect McLaren from our exclusive collection</p>
        </div>
      </div>

      <div className="inventory-content">
        <div className="section-container">
          {/* Filters */}
          <div className="filters-section">
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <div className="search-input-wrapper">
                  <Search className="search-icon" />
                  <Input
                    placeholder="Search by model or color..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Certified Pre-Owned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="year">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="price-filter">
              <label className="filter-label">
                Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={500000}
                step={10000}
                className="price-slider"
              />
            </div>
          </div>

          {/* Results */}
          <div className="results-header">
            <p className="results-count">{filteredVehicles.length} vehicles found</p>
          </div>

          {/* Vehicles Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading vehicles...</p>
            </div>
          ) : (
            <div className="vehicles-grid">
              {filteredVehicles.map((vehicle) => (
                <Link key={vehicle._id} to={`/vehicle/${vehicle._id}`} className="vehicle-card">
                <div className="vehicle-image-wrapper">
                  <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
                  <Badge className="vehicle-type-badge">
                    {vehicle.type === 'new' ? 'New' : 'Certified Pre-Owned'}
                  </Badge>
                </div>
                <div className="vehicle-info">
                  <div className="vehicle-header-info">
                    <h3 className="vehicle-name">{vehicle.name}</h3>
                    <p className="vehicle-year">{vehicle.year}</p>
                  </div>
                  <div className="vehicle-specs">
                    <span>{vehicle.horsepower} HP</span>
                    <span className="spec-divider">•</span>
                    <span>{vehicle.color}</span>
                    {vehicle.mileage > 0 && (
                      <>
                        <span className="spec-divider">•</span>
                        <span>{vehicle.mileage.toLocaleString()} mi</span>
                      </>
                    )}
                  </div>
                  <div className="vehicle-features">
                    {vehicle.features.slice(0, 2).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="feature-badge">
                        {feature}
                      </Badge>
                    ))}
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

          {filteredVehicles.length === 0 && (
            <div className="no-results">
              <SlidersHorizontal className="no-results-icon" />
              <p className="no-results-text">No vehicles match your filters</p>
              <Button onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setPriceRange([0, 500000]);
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;