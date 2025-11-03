import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Building2 } from 'lucide-react';

interface IndividualRegistrationPageProps {
  event: {
    id: number;
    title: string;
    teamSize: string;
    amount: string;
    date: string;
    time: string;
  };
  onBack: () => void;
}

const IndividualRegistrationPage = ({ event, onBack }: IndividualRegistrationPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.college) {
      alert('Please fill in all fields');
      return;
    }
    
    // TODO: Integrate with Supabase to save registration
    alert(`Registration successful!

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
College: ${formData.college}`);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,100,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,100,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative z-10">
        {/* Back Button */}
        <div className="p-6">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-400 text-black font-bold rounded-lg hover:bg-blue-300 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            BACK
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-blue-400 mb-4 tracking-tight">
              EVENT REGISTRATION
            </h1>
            <p className="text-xl text-blue-400">→ {event.title}</p>
            <p className="text-gray-400 mt-2">Individual Event</p>
          </div>

          {/* Registration Form */}
          <div className="border-2 border-blue-400 rounded-2xl p-8 bg-black/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">REGISTER NOW</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-blue-400 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-black border border-blue-400/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-blue-400 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-black border border-blue-400/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-blue-400 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-black border border-blue-400/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              {/* College */}
              <div>
                <label className="block text-sm font-bold text-blue-400 mb-2">
                  <Building2 className="w-4 h-4 inline mr-2" />
                  College/Institution *
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                  className="w-full px-4 py-3 bg-black border border-blue-400/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              {/* Event Details */}
              <div className="border-t border-blue-400/30 pt-6 space-y-2">
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-blue-400">Event:</span> {event.title}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-blue-400">Date:</span> {event.date}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-blue-400">Time:</span> {event.time}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-blue-400">Amount:</span> {event.amount}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-400 text-black font-black py-4 rounded-lg hover:bg-blue-300 transition text-lg"
              >
                REGISTER
              </button>

              {/* Terms */}
              <div className="text-center">
                <p className="text-blue-400 text-sm italic">
                  Terms and Conditions applied*
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualRegistrationPage;
