import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, DollarSign, Users } from 'lucide-react';
import RegistrationPage from './RegistrationPage.tsx';
import IndividualRegistrationPage from './IndividualRegistrationPage.tsx';

const EventRegistrationPage = () => {
  const [activeCategory, setActiveCategory] = useState('technical');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleRegister = (event) => {
    // Always navigate to appropriate registration page based on event type
    setSelectedEvent(event);
  };

  const handleBack = () => {
    setSelectedEvent(null);
  };

  // If an event is selected, show the appropriate registration page
  if (selectedEvent) {
    if (selectedEvent.teamSize === 'team') {
      return <RegistrationPage event={selectedEvent} onBack={handleBack} />;
    } else {
      return <IndividualRegistrationPage event={selectedEvent} onBack={handleBack} />;
    }
  }

  const events = [
    {
      id: 1,
      title: "Loot & Load",
      category: "technical",
      tagline: "Battle it out in BGMI",
      description: "Compete with the best teams in a high stakes BGMI tournament.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      date: "7 Nov",
      time: "9:00 AM onwards",
      organizer: "Yishith",
      contact: "+91 9964057549",
      amount: "₹500",
      teamSize: "team",
      gradient: "from-red-500 to-orange-600"
    },
    {
      id: 2,
      title: "R00TQuest",
      category: "technical",
      tagline: "Crack the code. Capture the flag.",
      description: "Test your cybersecurity skills in a capture-the-flag challenge.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      date: "7 Nov",
      time: "11:00 - 12:30",
      organizer: "Koshin",
      contact: "+91 7899715941",
      amount: "₹200",
      teamSize: "team",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: 3,
      title: "How I Met My Investor",
      category: "special",
      tagline: "Pitch. Persuade. Prevail.",
      description: "Present your startup idea to real investors and secure funding.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      date: "8 Nov",
      time: "2:00 PM - 5:00 PM",
      organizer: "Priya Sharma",
      contact: "+91 9876543210",
      amount: "₹300",
      teamSize: "team",
      gradient: "from-yellow-500 to-amber-600"
    },
    {
      id: 4,
      title: "Oh My Grid!",
      category: "technical",
      tagline: "Untangle the CSS chaos",
      description: "Showcase your frontend magic in a CSS design challenge.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
      date: "8 Nov",
      time: "10:00 AM - 1:00 PM",
      organizer: "Arjun Kumar",
      contact: "+91 8765432109",
      amount: "₹150",
      teamSize: "individual",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: 5,
      title: "CodeStorm",
      category: "technical",
      tagline: "Speed meets logic",
      description: "Rapid-fire coding competition testing your problem-solving skills.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
      date: "9 Nov",
      time: "9:00 AM - 12:00 PM",
      organizer: "Rahul Verma",
      contact: "+91 9988776655",
      amount: "₹250",
      teamSize: "individual",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: 6,
      title: "Battle of Bands",
      category: "cultural",
      tagline: "Rock the stage",
      description: "Showcase your musical talent in an electrifying band competition.",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&q=80",
      date: "9 Nov",
      time: "6:00 PM - 9:00 PM",
      organizer: "Sneha Reddy",
      contact: "+91 9123456789",
      amount: "₹500",
      teamSize: "team",
      gradient: "from-red-600 to-rose-700"
    },
    {
      id: 7,
      title: "Street Dance Championship",
      category: "cultural",
      tagline: "Move to the beat",
      description: "Bring your crew and dominate the dance floor with killer moves.",
      image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
      date: "10 Nov",
      time: "4:00 PM - 7:00 PM",
      organizer: "Vikram Singh",
      contact: "+91 8899001122",
      amount: "₹400",
      teamSize: "team",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      id: 8,
      title: "AI Innovation Summit",
      category: "special",
      tagline: "Shape the future",
      description: "Attend talks and workshops by industry leaders in AI and ML.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      date: "10 Nov",
      time: "10:00 AM - 4:00 PM",
      organizer: "Dr. Meera Patel",
      contact: "+91 9876501234",
      amount: "Free",
      teamSize: "individual",
      gradient: "from-teal-500 to-green-600"
    }
  ];

  const categories = [
    { id: 'technical', name: 'Technical' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'special', name: 'Special' }
  ];

  const filteredEvents = events.filter(event => event.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-cyan-500 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <button className="mb-8 px-6 py-2 bg-black text-blue-400 font-bold rounded-lg hover:bg-gray-900 transition">
            ← BACK
          </button>
          <h1 className="text-5xl md:text-7xl font-black text-black mb-4 tracking-tight">
            SAMBHRAM EVENTS
          </h1>
          <p className="text-xl md:text-2xl text-black font-semibold">
            → Build, Compete, and Leave Your Mark
          </p>
          <button className="mt-8 px-8 py-3 bg-black text-blue-400 font-bold rounded-lg hover:bg-gray-900 transition flex items-center gap-2">
            <span>📥</span> EVENT RULEBOOK
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-900 py-6 px-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 font-bold rounded-lg transition ${
                  activeCategory === category.id
                    ? 'bg-blue-400 text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-gray-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-2/5 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-80`}></div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 md:h-full object-cover mix-blend-overlay"
                  />
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-6">
                  <h3 className="text-2xl font-black mb-2 text-blue-400">
                    → {event.title}
                  </h3>
                  <p className="text-gray-400 italic mb-3">{event.tagline}</p>
                  <p className="text-gray-300 text-sm mb-4">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Calendar className="w-4 h-4" />
                      <span className="font-semibold">Date:</span>
                      <span className="text-white">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">Time:</span>
                      <span className="text-white">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      <User className="w-4 h-4" />
                      <span className="font-semibold">Organizer:</span>
                      <span className="text-white">{event.organizer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      <Phone className="w-4 h-4" />
                      <span className="font-semibold">Contact:</span>
                      <span className="text-white">{event.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">Amount:</span>
                      <span className="text-white font-bold">{event.amount}</span>
                      <span className="text-gray-400">/ {event.teamSize}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleRegister(event)}
                    className="mt-6 w-full bg-blue-400 text-black font-black py-3 rounded-lg hover:bg-blue-300 transition"
                  >
                    REGISTER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Sambhram Events. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationPage;