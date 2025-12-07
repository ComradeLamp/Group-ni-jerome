import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll respond within 24 hours.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="section-container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">Get in touch with our McLaren specialists</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="section-container">
          <div className="contact-grid">
            {/* Contact Form */}
            <Card className="contact-form-card">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-group">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="form-group">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      required
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div className="form-group">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="contact-info-section">
              <Card>
                <CardHeader>
                  <CardTitle>Visit Our Showroom</CardTitle>
                  <CardDescription>Experience McLaren in person</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="contact-info-item">
                    <div className="contact-icon">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-sm text-muted-foreground">
                        123 Supercar Boulevard<br />
                        Beverly Hills, CA 90210
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-icon">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        Sales: (310) 555-0100<br />
                        Service: (310) 555-0101
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-icon">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">
                        sales@mclarendealer.com<br />
                        service@mclarendealer.com
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-icon">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 7:00 PM<br />
                        Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: 10:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><a href="/appointment" className="text-sm hover:underline">Schedule a Test Drive</a></li>
                    <li><a href="/financing" className="text-sm hover:underline">Financing Calculator</a></li>
                    <li><a href="/inventory" className="text-sm hover:underline">View Inventory</a></li>
                    <li><a href="#" className="text-sm hover:underline">Trade-In Valuation</a></li>
                    <li><a href="#" className="text-sm hover:underline">Service & Parts</a></li>
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

export default Contact;