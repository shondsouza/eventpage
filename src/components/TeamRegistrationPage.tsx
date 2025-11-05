import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Building2, Users } from 'lucide-react';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  college: string;
}

interface TeamRegistrationPageProps {
  event: {
    id: number;
    title: string;
    amount: string;
    date: string;
    time: string;
    teamSize: string;
  };
  onBack: () => void;
  onComplete: (teamData: { teamName: string; members: TeamMember[] }) => void;
}

const TeamRegistrationPage = ({ event, onBack, onComplete }: TeamRegistrationPageProps) => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', email: '', phone: '', college: '' } // Leader is the first member
  ]);

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
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
    }
    
    if (teamMembers.length < maxMembers) {
      setTeamMembers([...teamMembers, { name: '', email: '', phone: '', college: '' }]);
    }
  };

  const removeMember = (index: number) => {
    // Don't remove the team leader (first member)
    if (index > 0 && teamMembers.length > 1) {
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
    
    // Cache data in localStorage before proceeding to payment
    const registrationData = {
      eventId: event.id,
      eventName: event.title,
      teamName,
      members: teamMembers,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(`teamRegistration_${event.id}`, JSON.stringify(registrationData));
    
    // Pass data to onComplete handler
    onComplete({ teamName, members: teamMembers });
  };

  // Determine max team size for display
  let teamSizeText = event.teamSize;
  if (event.teamSize === 'team') {
    teamSizeText = '2-4 members';
  }

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
            BACK
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              TEAM REGISTRATION
            </h1>
            <p className="text-xl text-white">→ {event.title}</p>
            <p className="text-gray-400 mt-2">Team Event ({teamSizeText})</p>
          </div>

          {/* Registration Form */}
          <div className="border-2 border-white rounded-2xl p-8 bg-black/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">TEAM DETAILS</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Team Name */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
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
                <h3 className="text-xl font-bold text-white mb-4">Team Members</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Enter details for all team members (including team leader)
                </p>
                
                <div className="space-y-6">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="border border-gray-700/50 rounded-lg p-6 bg-black/30">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-bold text-white">
                          {index === 0 ? 'Team Leader' : `Member ${index + 1}`}
                        </h4>
                        {index > 0 && teamMembers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMember(index)}
                            className="text-red-500 hover:text-red-400 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-1">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                              placeholder="Full name"
                              className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                              required
                            />
                          </div>
                        </div>
                        
                        {/* Email */}
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-1">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                            <input
                              type="email"
                              value={member.email}
                              onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                              placeholder="Email address"
                              className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                              required
                            />
                          </div>
                        </div>
                        
                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-1">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                            <input
                              type="tel"
                              value={member.phone}
                              onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                              placeholder="Phone number"
                              className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                              required
                            />
                          </div>
                        </div>
                        
                        {/* College */}
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-1">
                            College/Institution *
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                            <input
                              type="text"
                              value={member.college}
                              onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                              placeholder="College name"
                              className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Add Member Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={addMember}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                    disabled={teamMembers.length >= 4}
                  >
                    + Add Another Member
                  </button>
                  <p className="text-gray-500 text-xs mt-2">
                    Maximum {teamSizeText}
                  </p>
                </div>
              </div>

              {/* Event Details */}
              <div className="border-t border-gray-700/30 pt-6 space-y-2">
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-white">Event:</span> {event.title}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-white">Date:</span> {event.date}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-white">Time:</span> {event.time}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-white">Amount:</span> {event.amount}
                </p>
              </div>

              {/* Submit Button */}
              <InteractiveHoverButton
                text="SAVE TEAM DETAILS & PROCEED TO PAYMENT"
                type="submit"
                className="bg-black text-white hover:bg-gray-800 border-gray-700 py-4 text-lg w-full"
              />

              {/* Terms */}
              <div className="text-center">
                <p className="text-white text-sm italic">
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

export default TeamRegistrationPage;