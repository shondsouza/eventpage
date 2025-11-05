import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, DollarSign, Code, Database, Cpu, Terminal, Music, Mic, Drama, Users, Sparkles, Trophy, Lightbulb, Rocket, ShoppingCart, X } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  date: string;
  time: string;
  organizer: string;
  contact: string;
  amount: string;
  teamSize: string;
  gradient: string;
  studentCoordinator?: string;
  isTeamEvent?: boolean; // New property to identify team events
}

interface CartItem extends Event {
  quantity: number;
}

interface TeamData {
  teamName: string;
  members: any[];
}

interface EventRegistrationPageProps {
  onProceedToCheckout?: (cartItems: CartItem[], totalAmount: number) => void;
  teamData?: Record<number, TeamData>;
  setTeamData?: (data: Record<number, TeamData>) => void;
}

const EventRegistrationPage = ({ 
  onProceedToCheckout, 
  teamData,
  setTeamData
}: EventRegistrationPageProps) => {
  const [activeCategory, setActiveCategory] = useState('technical');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedTeamEvent, setSelectedTeamEvent] = useState<CartItem | null>(null);

  // Function to update team data for an event
  const updateTeamData = (eventId: number, data: TeamData) => {
    if (setTeamData) {
      const newData = { ...(teamData || {}), [eventId]: data };
      setTeamData(newData);
    }
  };

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleBack = () => {
    setSelectedEvent(null);
  };

  // Handle card flip
  const handleCardFlip = (eventId: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  // Add event to cart (only once)
  const addToCart = (event: Event) => {
    // For team events, we no longer redirect immediately
    // Just add the event to cart like any other event
    setCart(prevCart => {
      // Check if event already exists in cart
      const existingItem = prevCart.find(item => item.id === event.id);
      if (existingItem) {
        // Event already in cart, don't add duplicate
        return prevCart;
      } else {
        // Add new event to cart with quantity 1
        return [...prevCart, { ...event, quantity: 1 }];
      }
    });
  };

  // Remove event from cart
  const removeFromCart = (eventId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== eventId));
  };

  // Update quantity in cart
  const updateQuantity = (eventId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(eventId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === eventId ? { ...item, quantity } : item
      )
    );
  };

  // Calculate total amount based on number of events
  const calculateTotal = () => {
    const eventCount = cart.length;
    
    if (eventCount === 0) return 0;
    if (eventCount === 1) return 100;
    if (eventCount === 2) return 160;
    if (eventCount === 3) return 210;
    if (eventCount >= 4) return 250;
    
    return 0;
  };

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout(cart, calculateTotal());
    } else {
      // Default behavior if no callback is provided
      alert(`Proceeding to checkout. Total amount: ₹${calculateTotal()}`);
    }
  };

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
      amount: "₹100",
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
      amount: "₹100",
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
      image: "/Eyesoff.jpg",
      date: "TBA",
      time: "TBA",
      organizer: "Ms. Spoorthi B Shetty",
      contact: "+91 9482906943",
      amount: "₹100",
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
      amount: "₹100",
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
      amount: "₹100",
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
      amount: "₹100",
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
      amount: "₹100",
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
      image: "https://images.unsplash.com/photo-1561070791-29b0f74f9713?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "Ms. Kyathi",
      contact: "+91 8296849083",
      amount: "₹100",
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
      amount: "₹100",
      teamSize: "individual",
      gradient: "from-blue-600 to-indigo-700",
      studentCoordinator: "Nihal S Kolambkar (7204196221)"
    },
    {
      id: 10,
      title: "YAKSHA KALARAM",
      category: "cultural",
      tagline: "Yakshagana Performance",
      description: "Individual Yakshagana performance. 8+2 mins for Natya and Arthagarike. Himmela should be recorded.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      date: "Day 1",
      time: "TBA",
      organizer: "Prof. Ananya J",
      contact: "+91 9845790058",
      amount: "₹100",
      teamSize: "individual",
      gradient: "from-yellow-600 to-orange-700",
      studentCoordinator: "S H Adithya (8073256702)"
    },
    {
      id: 11,
      title: "SHRINGAR VISMAY",
      category: "cultural",
      tagline: "Fashion Walk",
      description: "Fashion show with 4-6 members. Time: 4+1 mins. Any theme welcomed - bring creativity to the runway!",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea3c5b55?w=800&q=80",
      date: "Day 1",
      time: "TBA",
      organizer: "Prof. Anupama",
      contact: "TBA",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-pink-500 to-purple-600",
      studentCoordinator: "Sowparnika Shetty (9113810849)"
    },
    {
      id: 12,
      title: "RUN-BHUMI",
      category: "cultural",
      tagline: "Gully Cricket",
      description: "6+1 players per team. 3 overs, different bowlers. Six considered out. Overarm bowling only. ID card compulsory.",
      image: "https://images.unsplash.com/photo-1540747913346-19e32778a8e1?w=800&q=80",
      date: "Day 1",
      time: "TBA",
      organizer: "Prof. Suryakanth",
      contact: "+91 9980811082",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-green-600 to-emerald-700",
      studentCoordinator: "Chirag Shetty (8792876922)"
    },
    {
      id: 13,
      title: "LUDO SAMRAT",
      category: "cultural",
      tagline: "Ludo Championship",
      description: "Individual Ludo competition. Pre-install Ludo King app. No team-ups. Any foul play leads to disqualification.",
      image: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=800&q=80",
      date: "Day 1",
      time: "TBA",
      organizer: "Prof. Diana D'Souza",
      contact: "+91 7795604890",
      amount: "₹100",
      teamSize: "individual",
      gradient: "from-red-500 to-orange-600",
      studentCoordinator: "Charan Reddy (9731596319)"
    },
    {
      id: 14,
      title: "DRISHYA MAHIMA",
      category: "cultural",
      tagline: "Reel Making",
      description: "Two in a team. Max 60 seconds. Must be original creation. Submit within allotted time.",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
      date: "Day 1",
      time: "TBA",
      organizer: "Prof. Pooja",
      contact: "TBA",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-purple-600 to-pink-600",
      studentCoordinator: "Jefin (7510593275)"
    },
    {
      id: 15,
      title: "BATTLE OF BANDS",
      category: "cultural",
      tagline: "Live Music Competition",
      description: "5-12 members, minimum 3 live instruments. 15 mins including sound check. Songs in any language permitted.",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&q=80",
      date: "28th December, 5:30 PM",
      time: "5:30 PM",
      organizer: "Prof. Sheryl Iona",
      contact: "+91 8197201536",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-red-600 to-rose-700",
      studentCoordinator: "Akash singh (8296856531)"
    },
    {
      id: 16,
      title: "KOHJ KSHETRA",
      category: "cultural",
      tagline: "Treasure Hunt",
      description: "4 in a team. Solve puzzles, riddles or links. No tampering with other teams. Follow all rules or face disqualification.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Vignesh",
      contact: "+91 7204273146",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-amber-600 to-yellow-700",
      studentCoordinator: "Ananya rao (8147158229)"
    },
    {
      id: 17,
      title: "AGNI CHAKRAVYUHA",
      category: "cultural",
      tagline: "Free Fire Tournament",
      description: "4 players squad. Mobile only - no triggers/iPads/emulators. Map: Bermuda, Level 30+. Report 10 mins before match.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Mohammed Hashim",
      contact: "+91 9061293705",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-orange-600 to-red-700",
      studentCoordinator: "Ganesh (7483896493)"
    },
    {
      id: 18,
      title: "SHAKTHI SANGRAM",
      category: "cultural",
      tagline: "Tug of War",
      description: "7 players +1 substitute (max 570kg combined). Shoulder pulling not allowed. Scaling on 28-11-2025 before 10 AM.",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Suryakanth",
      contact: "+91 9980811082",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-blue-600 to-indigo-700",
      studentCoordinator: "Kishan kumar (7558892264)"
    },
    {
      id: 19,
      title: "TAAL YUDHA",
      category: "cultural",
      tagline: "Face-Off Dance",
      description: "Dance battle to live DJ beats. Music genres change for each pair. Judges choose winners until final 2 dancers remain.",
      image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Kyathi",
      contact: "+91 8296849083",
      amount: "₹100",
      teamSize: "individual",
      gradient: "from-purple-600 to-pink-700",
      studentCoordinator: "Siri V S (6362184296)"
    },
    {
      id: 20,
      title: "BHAVA SPHRUTHI",
      category: "cultural",
      tagline: "Solo Dance",
      description: "Classical/semi-classical solo dance. 3+1 mins. Submit music 1 day prior. Fire, color, smoke restricted.",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Spoorthi B Shetty",
      contact: "+91 9482906943",
      amount: "₹100",
      teamSize: "individual",
      gradient: "from-rose-500 to-pink-600",
      studentCoordinator: "Akshitha (7975059513)"
    },
    {
      id: 21,
      title: "NRITHYA PARVA",
      category: "cultural",
      tagline: "Group Dance",
      description: "6-10 members. 4+1 mins. Any dance form allowed. Submit music 1 day prior. Fire, color, smoke restricted.",
      image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Shwetha Rai",
      contact: "+91 7349013217",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-indigo-500 to-purple-600",
      studentCoordinator: "Sushmitha S k (9353249945)"
    },
    {
      id: 22,
      title: "ANIME VICHAR",
      category: "cultural",
      tagline: "Anime Quiz",
      description: "Individual anime quiz competition. 4 rounds total. No electronic devices allowed during competition.",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Thejash",
      contact: "+91 8075773051",
      amount: "₹100",
      teamSize: "individual",
      gradient: "from-blue-500 to-cyan-600",
      studentCoordinator: "Chandan Ponnappa (6360162184)"
    },
    {
      id: 23,
      title: "SANGEETH SPARSH",
      category: "cultural",
      tagline: "Solo Singing",
      description: "Solo singing in any language. 3+1 mins. With/without karaoke. Submit tracks 2 days prior. Max 1 instrument allowed.",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Ashwini",
      contact: "+91 9743079974",
      amount: "₹100",
      teamSize: "individual",
      gradient: "from-teal-500 to-green-600",
      studentCoordinator: "Ananya R (9148136288)"
    },
    {
      id: 24,
      title: "RANG MUKHAM",
      category: "cultural",
      tagline: "Face Painting",
      description: "Two in a team. 2 hrs time limit. Bring your own materials. Topic given on spot. Only water color paints allowed.",
      image: "https://images.unsplash.com/photo-1513364776144-ce544e77e70f?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Prafulla Shetty",
      contact: "+91 7204549248",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-pink-500 to-rose-600",
      studentCoordinator: "Harshitha Banjan (7559457095)"
    },
    {
      id: 25,
      title: "CHAVI-CHITHRA",
      category: "cultural",
      tagline: "Photography",
      description: "Individual photography within campus. Digital camera only. No editing/manipulation. Submit best capture.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Deepthi",
      contact: "+91 9880501735",
      amount: "₹100",
      teamSize: "individual",
      gradient: "from-gray-600 to-slate-700",
      studentCoordinator: "Joyston (8296839379)"
    },
    {
      id: 26,
      title: "RANG DHARA",
      category: "cultural",
      tagline: "Brand Rangoli",
      description: "Two members per team. 1 hour time limit. Multiple teams from same college welcome.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Roshal Lynshal Nazareth",
      contact: "+91 7899506648",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-orange-500 to-red-600",
      studentCoordinator: "Smruthi sudhakaran (8139885955)"
    },
    {
      id: 27,
      title: "VEERA SAMARA",
      category: "cultural",
      tagline: "BGMI Tournament",
      description: "4 players per team. Mobile only, no emulators. Level 30+ required. No hacks/cheats. Only registered players allowed.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      date: "Day 2",
      time: "TBA",
      organizer: "Prof. Savan Shetty",
      contact: "+91 6360841765",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-red-500 to-orange-600",
      studentCoordinator: "Jayasagar (7483013936)"
    },
    {
      id: 28,
      title: "Innovation Summit",
      category: "special",
      tagline: "Shape the future",
      description: "Attend talks and workshops by industry leaders.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "TBA",
      contact: "TBA",
      amount: "₹100",
      teamSize: "individual",
      gradient: "from-teal-500 to-green-600"
    },
    // Add new events here following the same structure
    {
      id: 29,
      title: "Example",
      category: "special",
      tagline: "Example",
      description: "Example.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      date: "TBA",
      time: "TBA",
      organizer: "TBA",
      contact: "TBA",
      amount: "₹100",
      teamSize: "team",
      gradient: "from-teal-500 to-green-600",
      isTeamEvent: true // Marking this as a team event
    }
    // Example of how to add a new team event:
    // {
    //   id: 30,
    //   title: "New Team Event",
    //   category: "technical", // or "cultural" or "special"
    //   tagline: "Exciting team challenge",
    //   description: "Description of your team event goes here.",
    //   image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
    //   date: "TBA",
    //   time: "TBA",
    //   organizer: "Organizer Name",
    //   contact: "+91 9876543210",
    //   amount: "₹100",
    //   teamSize: "team",
    //   gradient: "from-blue-500 to-cyan-600",
    //   isTeamEvent: true // This property triggers the team registration flow
    // }
  ];

  const categories = [
    { id: 'technical', name: 'Technical' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'special', name: 'Special' }
  ];

  const filteredEvents = events.filter(event => event.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background GIF */}
      <div 
        className="fixed inset-0 z-0 opacity-50"
        style={{ 
          backgroundImage: "url('/bg.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
      
      {/* Content wrapper to ensure content is above background */}
      <div className="relative z-10">

        {/* Category Filter */}
        <div className="bg-gray-900 py-6 px-4 z-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 font-bold rounded-lg transition ${
                    activeCategory === category.id
                      ? 'bg-white text-black'
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
          {/* Removed category-specific backgrounds to prevent overlay on bg.gif */}
          
          <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="relative w-64 h-80 cursor-pointer perspective-1000"
                  onClick={() => handleCardFlip(event.id)}
                >
                  {/* Flip container */}
                  <div 
                    className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                      flippedCards[event.id] ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front side - Image only */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-white/20 ${
                      flippedCards[event.id] ? 'hidden' : ''
                    }`}>
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Back side - Event details */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-white/20 rotate-y-180 bg-black/30 backdrop-blur-lg p-4 flex flex-col ${
                      flippedCards[event.id] ? '' : 'hidden'
                    }`}>
                      <div className="flex-1 overflow-y-auto">
                        <h3 className="text-xl font-black mb-2 text-white">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 italic mb-3 text-sm">{event.tagline}</p>
                        <p className="text-gray-400 text-xs mb-4">{event.description}</p>

                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2 text-white">
                            <Calendar className="w-3 h-3" />
                            <span className="font-semibold">Date:</span>
                            <span className="text-white">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <Clock className="w-3 h-3" />
                            <span className="font-semibold">Time:</span>
                            <span className="text-white">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <User className="w-3 h-3" />
                            <span className="font-semibold">Organizer:</span>
                            <span className="text-white">{event.organizer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <Phone className="w-3 h-3" />
                            <span className="font-semibold">Contact:</span>
                            <span className="text-white">{event.contact}</span>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (cart.some(item => item.id === event.id)) {
                            removeFromCart(event.id);
                          } else if (cart.length < 4) {
                            addToCart(event);
                          }
                        }}
                        disabled={cart.length >= 4 && !cart.some(item => item.id === event.id)}
                        className={`mt-3 w-full font-black py-2 rounded-lg text-xs transition ${
                          cart.length >= 4 && !cart.some(item => item.id === event.id)
                            ? "bg-gray-600/30 text-gray-300 cursor-not-allowed"
                            : cart.some(item => item.id === event.id)
                              ? "bg-red-500/60 text-white hover:bg-red-600/70"
                              : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                        }`}
                      >
                        {cart.length >= 4 && !cart.some(item => item.id === event.id)
                          ? "MAXIMUM EVENTS REACHED" 
                          : cart.some(item => item.id === event.id) 
                            ? "REMOVE FROM CART" 
                            : "ADD TO CART"}
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

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <button
            onClick={() => setShowCart(true)}
            className="fixed bottom-6 right-6 bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-200 transition z-50"
          >
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6" />
              <span className="ml-2 font-bold">{cart.length}</span>
            </div>
          </button>
        )}

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-white">Your Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-bold text-white">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.tagline}</p>
                            {/* Show team info if team data exists */}
                            {teamData && teamData[item.id] && (
                              <p className="text-gray-300 text-xs mt-1">
                                Team: {teamData[item.id].teamName} ({teamData[item.id].members.length} members)
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-bold">1</span>
                            {/* Add team members button for team events */}
                            {(item.teamSize === 'team' || item.isTeamEvent) && (
                              <button
                                onClick={() => {
                                  setSelectedTeamEvent(item);
                                  setShowTeamModal(true);
                                }}
                                className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                              >
                                {(teamData && teamData[item.id]) ? 'Edit Team' : 'Add Team'}
                              </button>
                            )}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-2 text-red-500 hover:text-red-400"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-700">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold text-white">Total for {cart.length} event{cart.length > 1 ? 's' : ''}:</span>
                        <span className="text-2xl font-black text-white">
                          ₹{calculateTotal()}
                        </span>
                      </div>
                      <button
                        onClick={handleProceedToCheckout}
                        className="w-full bg-white text-black font-black py-4 rounded-lg hover:bg-gray-200 transition"
                      >
                        PROCEED TO CHECKOUT
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Team Member Modal */}
        {showTeamModal && selectedTeamEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-white">Team Details for {selectedTeamEvent.title}</h2>
                  <button
                    onClick={() => setShowTeamModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <TeamMemberForm 
                  event={selectedTeamEvent}
                  initialData={(teamData && selectedTeamEvent) ? teamData[selectedTeamEvent.id] : undefined}
                  onSave={(data) => {
                    updateTeamData(selectedTeamEvent.id, data);
                    setShowTeamModal(false);
                  }}
                  onCancel={() => setShowTeamModal(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Team Member Form Component
interface TeamMemberFormProps {
  event: CartItem;
  initialData?: TeamData;
  onSave: (data: TeamData) => void;
  onCancel: () => void;
}

const TeamMemberForm = ({ event, initialData, onSave, onCancel }: TeamMemberFormProps) => {
  const [teamName, setTeamName] = useState(initialData?.teamName || '');
  const [teamMembers, setTeamMembers] = useState<any[]>(initialData?.members || [
    { name: '', email: '', phone: '', college: '' }
  ]);

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
  };

  const addMember = () => {
    // Determine max team size from event.teamSize (e.g., "2-4 members" or "team")
    let maxMembers = 4;
    if (event.teamSize.includes('-')) {
      const parts = event.teamSize.split('-');
      maxMembers = parseInt(parts[1]) || 4;
    } else if (event.teamSize === 'team') {
      maxMembers = 4; // Default for generic "team"
    }
    
    if (teamMembers.length < maxMembers) {
      setTeamMembers([...teamMembers, { name: '', email: '', phone: '', college: '' }]);
    }
  };

  const removeMember = (index: number) => {
    if (teamMembers.length > 1) {
      const updatedMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(updatedMembers);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    for (let i = 0; i < teamMembers.length; i++) {
      const member = teamMembers[i];
      if (!member.name || !member.email || !member.phone || !member.college) {
        alert(`Please fill all fields for member ${i + 1}`);
        return;
      }
    }
    
    if (!teamName) {
      alert('Please enter a team name');
      return;
    }
    
    onSave({ teamName, members: teamMembers });
  };

  // Determine max team size for display
  let teamSizeText = event.teamSize;
  if (event.teamSize === 'team') {
    teamSizeText = '2-4 members';
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Team Name */}
      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Team Name *
        </label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter your team name"
          className="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
          required
        />
      </div>

      {/* Team Members */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Team Members</h3>
        
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="border border-gray-700/50 rounded-lg p-4 bg-black/30">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-md font-bold text-white">
                  Member {index + 1}
                </h4>
                {teamMembers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 bg-black border border-gray-700/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Email *</label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                    placeholder="Email address"
                    className="w-full px-3 py-2 bg-black border border-gray-700/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={member.phone}
                    onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                    placeholder="Phone number"
                    className="w-full px-3 py-2 bg-black border border-gray-700/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">College *</label>
                  <input
                    type="text"
                    value={member.college}
                    onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                    placeholder="College name"
                    className="w-full px-3 py-2 bg-black border border-gray-700/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 text-sm"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Member Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={addMember}
            className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-700 transition"
          >
            + Add Member
          </button>
          <p className="text-gray-500 text-xs mt-1">
            Maximum {teamSizeText}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
        >
          Save Team Details
        </button>
      </div>
    </form>
  );
};

export default EventRegistrationPage;