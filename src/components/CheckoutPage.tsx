import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  tagline: string;
  amount: string;
  quantity: number;
}

interface CheckoutPageProps {
  cart: CartItem[];
  totalAmount: number;
  onBack: () => void;
  onCheckoutComplete: () => void;
}

const CheckoutPage = ({ cart, totalAmount, onBack, onCheckoutComplete }: CheckoutPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onCheckoutComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative z-10">
        {/* Back Button */}
        <div className="p-6">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            BACK TO EVENTS
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              CHECKOUT
            </h1>
            <p className="text-xl text-gray-400">Complete your registration</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-800">
                    <div>
                      <h3 className="font-bold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.tagline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">
                        {item.amount === "TBA" ? "TBA" : `₹${item.amount}`}
                      </p>
                      <p className="text-blue-400 font-bold">
                        {item.amount === "TBA" ? "TBA" : `₹${item.amount}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total:</span>
                  <span className="text-2xl font-black text-blue-400">
                    {cart.some(item => item.amount === "TBA") 
                      ? "TBA" 
                      : `₹${cart.reduce((total, item) => {
                          if (item.amount === "TBA") return total;
                          const amount = parseFloat(item.amount.replace('₹', '').replace(',', '')) || 0;
                          return total + amount;
                        }, 0)}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Participant Details</h2>
              
              <form onSubmit={handleCheckout} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                    required
                  />
                </div>

                {/* College */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    College/Institution *
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter your college name"
                    className="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                    required
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="mr-3"
                      />
                      <span className="text-white">UPI Payment</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="mr-3"
                      />
                      <span className="text-white">Credit/Debit Card</span>
                    </label>
                  </div>
                </div>

                {/* Terms */}
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    By proceeding, you agree to our Terms and Conditions
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-400 text-black font-black py-4 rounded-lg hover:bg-blue-300 transition disabled:opacity-50"
                >
                  {isProcessing ? 'PROCESSING...' : `PAY ₹${totalAmount}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;