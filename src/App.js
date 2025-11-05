import './App.css';
import EventRegistrationPage from './components/eventpage.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('events'); // events, checkout, success
  const [cart, setCart] = useState([]);
  const [teamData, setTeamData] = useState({}); // Store team data for cart items

  const handleCheckoutComplete = () => {
    setCurrentPage('success');
    // Clear team data after successful checkout
    setTeamData({});
  };

  const handleBackToEvents = () => {
    setCurrentPage('events');
  };

  const handleProceedToCheckout = (cartItems, totalAmount) => {
    setCart(cartItems);
    setCurrentPage('checkout');
  };

  if (currentPage === 'checkout') {
    // Calculate total amount for the checkout page using tiered pricing
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
  }

  if (currentPage === 'success') {
    return (
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
    );
  }

  return (
    <EventRegistrationPage
      onProceedToCheckout={handleProceedToCheckout}
      teamData={teamData}
      setTeamData={setTeamData}
    />
  );
}

export default App;