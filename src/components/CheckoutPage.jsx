import React from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';

const CheckoutPage = ({ 
  cart, 
  totalAmount, 
  teamData,
  onBack, 
  onCheckoutComplete 
}) => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Events
        </button>
        
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="max-w-2xl mx-auto">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-center py-4 border-b border-gray-700">
                <div className="font-bold text-lg mb-2">Tiered Pricing Model</div>
                <div className="text-sm text-gray-300">
                  Pricing based on total number of events
                </div>
              </div>
              
              <div className="py-3 border-b border-gray-700">
                <div className="flex justify-between">
                  <span>1 Event :</span>
                  <span>₹ 150</span>
                </div>
              </div>
              
              <div className="py-3 border-b border-gray-700">
                <div className="flex justify-between">
                  <span>2 Events :</span>
                  <span>₹ 200</span>
                </div>
              </div>
              
              <div className="py-3 border-b border-gray-700">
                <div className="flex justify-between">
                  <span>3 Events :</span>
                  <span>₹ 250</span>
                </div>
              </div>
              
              <div className="py-3 border-b border-gray-700">
                <div className="flex justify-between">
                  <span>4 Events :</span>
                  <span>₹ 300</span>
                </div>
              </div>
              
              <div className="py-3 border-b border-gray-700 mb-4">
                <div className="flex justify-between">
                  <span>5+ Events :</span>
                  <span>₹ 300 + ₹ 100 each</span>
                </div>
              </div>
              
              <div className="flex justify-between py-3 font-bold text-lg">
                <span>Total ({cart.length} event{cart.length !== 1 ? 's'   : ''}) :</span>
                <span>₹ {totalAmount}</span>
              </div>
            </div>
            
            {/* Team Registration Data */}
            {teamData && Object.keys(teamData).length > 0 && (
              <div className="mt-6 bg-gray-900 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-4">Team Details</h3>
                <div className="space-y-4">
                  {Object.entries(teamData).map(([eventId, teamInfo]) => {
                    const event = cart.find(item => item.id === parseInt(eventId));
                    return event ? (
                      <div key={eventId} className="border-b border-gray-700 pb-3 last:border-0 last:pb-0">
                        <h4 className="font-bold text-white">{event.title}</h4>
                        <p className="text-gray-300 text-sm">
                          <span className="font-semibold">Team :</span> {teamInfo.teamName}
                        </p>
                        <p className="text-gray-300 text-sm">
                          <span className="font-semibold">Members :</span> {teamInfo.members.length}
                        </p>
                        <div className="mt-2">
                          <h5 className="font-semibold text-gray-400 text-xs">Member Details :</h5>
                          {teamInfo.members.map((member, index) => (
                            <div key={index} className="text-xs text-gray-400 ml-2">
                              <p>{index + 1}. {member.name} ({member.email})</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* Razorpay Payment Button */}
          <div className="mt-8">
            <div className="bg-gray-900 rounded-lg p-4">
              <button
                onClick={onCheckoutComplete}
                className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <CreditCard className="mr-2" />
                PROCEED TO PAYMENT ₹ {totalAmount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;