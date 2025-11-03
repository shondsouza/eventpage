import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, DollarSign, Code, Database, Cpu, Terminal, Music, Mic, Drama, Users, Sparkles, Trophy, Lightbulb, Rocket } from 'lucide-react';

const EventRegistrationPage = () => {
  const [activeCategory, setActiveCategory] = useState('technical');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleRegister = (event) => {
    setSelectedEvent(event);
  };

  const handleBack = () => {
    setSelectedEvent(null);
  };

  // Background pattern components for each category
  const TechnicalBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      {/* Circuit board pattern */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Code className="w-20 h-20 text-blue-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          </div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`db-${i}`} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Database className="w-16 h-16 text-cyan-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          </div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div key={`cpu-${i}`} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Cpu className="w-24 h-24 text-blue-300 animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          </div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div key={`term-${i}`} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Terminal className="w-18 h-18 text-cyan-500 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          </div>
        ))}
      </div>
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );

  const CulturalBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      {/* Musical notes and instruments */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Music className="w-20 h-20 text-pink-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          </div>
        ))}
        {[...Array(25)].map((_, i) => (
          <div key={`mic-${i}`} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Mic className="w-16 h-16 text-purple-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          </div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`drama-${i}`} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Drama className="w-24 h-24 text-rose-400 animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          </div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`users-${i}`} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Users className="w-18 h-18 text-fuchsia-400 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          </div>
        ))}
      </div>
      {/* Wave pattern */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="waves" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50 Q25 25, 50 50 T100 50" fill="none" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>
    </div>
  );

  const SpecialBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      {/* Innovation and achievement symbols */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Sparkles className="w-20 h-20 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          </div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`trophy-${i}`} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Trophy className="w-16 h-16 text-amber-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          </div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div key={`bulb-${i}`} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Lightbulb className="w-24 h-24 text-orange-400 animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          </div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div key={`rocket-${i}`} className="absolute" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}>
            <Rocket className="w-18 h-18 text-yellow-500 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          </div>
        ))}
      </div>
      {/* Star pattern */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stars" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="rgba(251, 191, 36, 0.3)"/>
            <circle cx="50" cy="30" r="1.5" fill="rgba(251, 191, 36, 0.3)"/>
            <circle cx="70" cy="60" r="2.5" fill="rgba(251, 191, 36, 0.3)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
      </svg>
    </div>
  );

  const events = [
    {
      id: 1,
      title: "SHARK TANK",
      category: "technical",
      tagline: "App Pitching Competition",
      description: "Pitch your innovative app idea to judges. 2-4 members per team. 3-5 min pitch + 5 min Q&A.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Ms. Saakshi J Shetty",
      contact: "+91 9606469357",
      amount: "TBA",
      teamSize: "team",
      gradient: "from-purple-500 to-pink-600",
      studentCoordinator: "Mr. Lohith Gowda (9019844009)"
    },
    {
      id: 2,
      title: "STRATEGIC IT VISION",
      category: "technical",
      tagline: "IT Manager Challenge",
      description: "Individual event with elimination rounds. Test your IT management skills and strategic thinking.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Mr. Thejash",
      contact: "+91 8075773051",
      amount: "TBA",
      teamSize: "individual",
      gradient: "from-blue-500 to-cyan-600",
      studentCoordinator: "Ms. Sinchana P S (7483081046)"
    },
    {
      id: 3,
      title: "EYES OFF! CODE ON",
      category: "technical",
      tagline: "Blind Coding Challenge",
      description: "Code without seeing your screen! Max 2 participants. Languages: C, Python, Java. Two rounds of intense coding.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Ms. Spoorthi B Shetty",
      contact: "+91 9482906943",
      amount: "TBA",
      teamSize: "team",
      gradient: "from-indigo-500 to-purple-600",
      studentCoordinator: "Ms. Bandhavya K S (8904827379)"
    },
    {
      id: 4,
      title: "WEBVERSE",
      category: "technical",
      tagline: "Web Designing Competition",
      description: "Design stunning websites in 2-member teams. Offline event, no internet. Follow the theme, no templates!",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Ms. Deepthi",
      contact: "+91 9880501735",
      amount: "TBA",
      teamSize: "team",
      gradient: "from-green-500 to-emerald-600",
      studentCoordinator: "Mr. Santosh M (9611535134)"
    },
    {
      id: 5,
      title: "LINE QUEST",
      category: "technical",
      tagline: "Line Follower Robot",
      description: "Build autonomous line-following robots. Teams of 3-5. Navigate curves and intersections. Score based on time + penalties.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Ms. Ankitha Shetty",
      contact: "+91 8310866320",
      amount: "TBA",
      teamSize: "team",
      gradient: "from-orange-500 to-red-600",
      studentCoordinator: "Ms. S B Poorvi (9353181551)"
    },
    {
      id: 6,
      title: "ERROR EXTERMINATOR",
      category: "technical",
      tagline: "Debug the Code",
      description: "Individual debugging challenge. Languages: C and Python. Round 1: Debugging Quiz, Round 2: Speed Debugging.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Mrs. Latha S",
      contact: "+91 9611095629",
      amount: "TBA",
      teamSize: "individual",
      gradient: "from-red-500 to-pink-600",
      studentCoordinator: "Ms. Preethishree S D (8618010509)"
    },
    {
      id: 7,
      title: "DASHING DASHBOARDS",
      category: "technical",
      tagline: "Data Visualization Challenge",
      description: "Create stunning dashboards using Power BI or Tableau. Individual or 2-member teams. 2 hours to impress!",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Ms. Meenakshi",
      contact: "+91 8088994353",
      amount: "TBA",
      teamSize: "team",
      gradient: "from-teal-500 to-blue-600",
      studentCoordinator: "Mr. Karthik A T (9353493357)"
    },
    {
      id: 8,
      title: "UXPERTS",
      category: "technical",
      tagline: "Poster Designing",
      description: "Individual poster design competition. Software provided: Figma, Canva, Photoshop. Topic assigned on spot.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Ms. Kyathi",
      contact: "+91 8296849083",
      amount: "TBA",
      teamSize: "individual",
      gradient: "from-pink-500 to-rose-600",
      studentCoordinator: "Janhavi Rathod (7208773651)"
    },
    {
      id: 9,
      title: "CODEWARS",
      category: "technical",
      tagline: "Competitive Coding",
      description: "Individual coding competition. Languages: C, C++, Java, Python. Round 1: Basic, Round 2: Advanced problem solving.",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Mr. Savan Shetty",
      contact: "+91 6360841765",
      amount: "TBA",
      teamSize: "individual",
      gradient: "from-blue-600 to-indigo-700",
      studentCoordinator: "Nihal S Kolambkar (7204196221)"
    },
    {
      id: 10,
      title: "Battle of Bands",
      category: "cultural",
      tagline: "Rock the stage",
      description: "Showcase your musical talent in an electrifying band competition.",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "TBA",
      contact: "TBA",
      amount: "TBA",
      teamSize: "team",
      gradient: "from-red-600 to-rose-700"
    },
    {
      id: 11,
      title: "Street Dance Championship",
      category: "cultural",
      tagline: "Move to the beat",
      description: "Bring your crew and dominate the dance floor with killer moves.",
      image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "TBA",
      contact: "TBA",
      amount: "TBA",
      teamSize: "team",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      id: 12,
      title: "Innovation Summit",
      category: "special",
      tagline: "Shape the future",
      description: "Attend talks and workshops by industry leaders.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "TBA",
      contact: "TBA",
      amount: "TBA",
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

      {/* Events Grid with Category-Specific Background */}
      <div className="relative min-h-screen">
        {activeCategory === 'technical' && <TechnicalBackground />}
        {activeCategory === 'cultural' && <CulturalBackground />}
        {activeCategory === 'special' && <SpecialBackground />}
        
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
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