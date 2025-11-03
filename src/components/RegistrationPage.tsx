import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';

interface RegistrationPageProps {
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

const RegistrationPage = ({ event, onBack }: RegistrationPageProps) => {
  const [leaderEmail, setLeaderEmail] = useState('');

  const handleCreateTeam = () => {
    // TODO: Integrate with Supabase to create team
    alert('Creating team...');
  };

  const handleJoinTeam = () => {
    if (!leaderEmail) {
      alert('Please enter team leader\'s email');
      return;
    }
    // TODO: Integrate with Supabase to join team
    alert(`Joining team with leader: ${leaderEmail}`);
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
            className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            BACK
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              EVENT REGISTRATION
            </h1>
            <p className="text-xl text-white">→ {event.title}</p>
          </div>

          {/* Registration Box */}
          <div className="border-2 border-white rounded-2xl p-8 bg-black/50 backdrop-blur-sm">
            {/* Create Team Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">CREATE A TEAM</h2>
              <p className="text-gray-400 text-sm mb-4">
                The team leader should create the team first before others can join
              </p>
              <InteractiveHoverButton
                text="CREATE TEAM"
                onClick={handleCreateTeam}
                className="bg-black text-white hover:bg-gray-800 border-gray-700 py-4 text-lg"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700/30 my-8"></div>

            {/* Join Team Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">JOIN A TEAM</h2>
              <p className="text-gray-400 text-sm mb-4">
                Enter your team leader's email to join their team
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={leaderEmail}
                  onChange={(e) => setLeaderEmail(e.target.value)}
                  placeholder="Enter Leader's Email"
                  className="flex-1 px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                />
                <InteractiveHoverButton
                  text="JOIN"
                  onClick={handleJoinTeam}
                  className="bg-black text-white hover:bg-gray-800 border-gray-700 w-auto px-8"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="mt-8 text-center">
              <p className="text-white text-sm italic">
                Terms and Conditions applied*
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
