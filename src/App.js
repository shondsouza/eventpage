import './App.css';
import EventRegistrationPage from './components/eventpage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import PageTransition from './components/transitions/PageTransition';

function App() {
  const [currentPage, setCurrentPage] = useState('events'); // events, checkout, success
  const [cart, setCart] = useState([]);
  const [teamData, setTeamData] = useState({}); // Store team data for cart items
  const [transitionPhase, setTransitionPhase] = useState('idle'); // idle, closing, waiting, opening

  const handleCheckoutComplete = () => {
    setTransitionPhase('closing');
    setTimeout(() => {
      setCurrentPage('success');
      setTransitionPhase('opening');
      // Clear team data after successful checkout
      setTeamData({});
    }, 1500); // Increased from 700 to 1500 to match the closing animation duration + delay
  };

  const handleBackToEvents = () => {
    setTransitionPhase('closing');
    setTimeout(() => {
      setCurrentPage('events');
      setTransitionPhase('opening');
    }, 1500); // Increased from 700 to 1500 to match the closing animation duration + delay
  };

  const handleProceedToCheckout = (cartItems, totalAmount) => {
    setCart(cartItems);
    setTransitionPhase('closing');
    setTimeout(() => {
      setCurrentPage('checkout');
      setTransitionPhase('opening');
    }, 1500); // Increased from 700 to 1500 to match the closing animation duration + delay
  };

  // Reset transition phase after opening
  useEffect(() => {
    if (transitionPhase === 'opening') {
      const timer = setTimeout(() => {
        setTransitionPhase('idle');
      }, 1500); // Increased from 1000 to 1500 to match the opening animation duration
      return () => clearTimeout(timer);
    }
  }, [transitionPhase]);

  return (
    <>
      <PageTransition phase={transitionPhase} />
      
      {currentPage === 'checkout' ? (
        // Calculate total amount for the checkout page using tiered pricing
        (() => {
          const eventCount = cart.length;
          let totalAmount = 0;
          
          if (eventCount === 1) totalAmount = 100;
          else if (eventCount === 2) totalAmount = 160;
          else if (eventCount === 3) totalAmount = 210;
          else if (eventCount >= 4) totalAmount = 250;

          return (
            <CheckoutPage
              cart={cart}
              totalAmount={totalAmount}
              teamData={teamData}
              onBack={handleBackToEvents}
              onCheckoutComplete={handleCheckoutComplete}
            />
          );
        })()
      ) : currentPage === 'success' ? (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="text-center max-w-2xl">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              REGISTRATION SUCCESSFUL!
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Thank you for registering. You will receive a confirmation email shortly.
            </p>
            <button
              onClick={handleBackToEvents}
              className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
            >
              BACK TO EVENTS
            </button>
          </div>
        </div>
      ) : (
        <EventRegistrationPage
          onProceedToCheckout={handleProceedToCheckout}
          teamData={teamData}
          setTeamData={setTeamData}
          onCategoryChange={(categoryId) => {
            // Trigger transition when changing categories
            setTransitionPhase('closing');
            setTimeout(() => {
              setTransitionPhase('opening');
            }, 1500); // Increased from 700 to 1500 to match the closing animation duration + delay
          }}
        />
      )}
    </>
  );
}

export default App;