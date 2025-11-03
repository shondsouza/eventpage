import './App.css';
import EventRegistrationPage from './components/eventpage.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('events'); // events, checkout, success
  const [cart, setCart] = useState([]);

  const handleCheckoutComplete = () => {
    setCurrentPage('success');
  };

  const handleBackToEvents = () => {
    setCurrentPage('events');
  };

  const handleProceedToCheckout = (cartItems, totalAmount) => {
    setCart(cartItems);
    setCurrentPage('checkout');
  };

  if (currentPage === 'checkout') {
    // Calculate total amount for the checkout page
    const totalAmount = cart.reduce((total, item) => {
      if (item.amount === "TBA") return total;
      const amount = parseFloat(item.amount.replace('₹', '').replace(',', '')) || 0;
      return total + amount;
    }, 0);

    return (
      <CheckoutPage
        cart={cart}
        totalAmount={totalAmount}
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
            className="px-8 py-4 bg-blue-400 text-black font-bold rounded-lg hover:bg-blue-300 transition"
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
    />
  );
}

export default App;