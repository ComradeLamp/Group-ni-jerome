import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { vehicles } from '../mockData';

const Appointment = () => {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleId: '',
    timeSlot: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: "Appointment Requested!",
      description: "We'll confirm your test drive appointment within 24 hours.",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      vehicleId: '',
      timeSlot: '',
      message: ''
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  return (
    <div className="appointment-page">
      <div className="appointment-header">
        <div className="section-container">
          <h1 className="page-title">Schedule Test Drive</h1>
          <p className="page-subtitle">Experience McLaren performance firsthand</p>
        </div>
      </div>

      <div className="appointment-content">
        <div className="section-container">
          <div className="appointment-grid">
            <Card className="appointment-form-card">
              <CardHeader>
                <CardTitle>Book Your Appointment</CardTitle>
                <CardDescription>
                  Select your preferred date, time, and vehicle for the test drive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-row">
                    <div className="form-group">
                      <Label htmlFor="name">
                        <User className="inline h-4 w-4 mr-1" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        placeholder="John Smith"
                      />
                    </div>

                    <div className="form-group">
                      <Label htmlFor="email">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="phone">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="form-group">
                    <Label htmlFor="vehicle">Select Vehicle *</Label>
                    <Select value={formData.vehicleId} onValueChange={(value) => handleChange('vehicleId', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a McLaren model" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map(vehicle => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.year} {vehicle.name} - {vehicle.color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <Label>
                        <CalendarIcon className="inline h-4 w-4 mr-1" />
                        Select Date *
                      </Label>
                      <div className="calendar-wrapper">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date(new Date().toDateString())}
                          className="rounded-md border"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <Label htmlFor="timeSlot">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Time Slot *
                      </Label>
                      <Select value={formData.timeSlot} onValueChange={(value) => handleChange('timeSlot', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(slot => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="message">Additional Notes</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Any specific requirements or questions?"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Request Appointment
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="appointment-info">
              <Card>
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="info-number">1</span>
                      <div>
                        <strong>Confirmation</strong>
                        <p className="text-sm text-muted-foreground">We'll confirm your appointment within 24 hours</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="info-number">2</span>
                      <div>
                        <strong>Preparation</strong>
                        <p className="text-sm text-muted-foreground">Your selected McLaren will be ready for you</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="info-number">3</span>
                      <div>
                        <strong>Experience</strong>
                        <p className="text-sm text-muted-foreground">Enjoy a personalized test drive with our specialist</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="info-number">4</span>
                      <div>
                        <strong>Follow-up</strong>
                        <p className="text-sm text-muted-foreground">Discuss options and next steps</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Valid driver's license required</li>
                    <li>• Minimum age: 25 years</li>
                    <li>• Proof of insurance recommended</li>
                    <li>• Test drives typically last 30-45 minutes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;