import React, { useState } from 'react';
import { Users, UserPlus, Mail, X, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: string;
  status: 'active' | 'pending';
  avatar?: string;
}

const TeamView: React.FC = () => {
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Mock team data - replace with actual API call
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      email: 'john@example.com',
      name: 'John Doe',
      role: 'Admin',
      status: 'active',
      avatar: 'https://source.unsplash.com/random/100x100?face=1'
    },
    {
      id: '2',
      email: 'jane@example.com',
      name: 'Jane Smith',
      role: 'Member',
      status: 'active',
      avatar: 'https://source.unsplash.com/random/100x100?face=2'
    },
    {
      id: '3',
      email: 'pending@example.com',
      name: 'Pending User',
      role: 'Member',
      status: 'pending'
    }
  ];

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!inviteEmail) {
      setError('Please enter an email address');
      return;
    }

    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInviteEmail('');
      setIsInviting(false);
    } catch (error) {
      setError('Failed to send invitation');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-bolt-blue" />
          <h2 className="text-2xl font-bold text-white">Team Members</h2>
        </div>

        <button
          onClick={() => setIsInviting(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-bolt-blue to-bolt-purple text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
        >
          <UserPlus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      {/* Invite Modal */}
      {isInviting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="group relative w-full max-w-md mx-4">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50" />
            
            <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Invite Team Member</h3>
                <button
                  onClick={() => setIsInviting(false)}
                  className="text-bolt-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bolt-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bolt-gray-400" />
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue"
                      placeholder="colleague@example.com"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-bolt-blue to-bolt-purple text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
                >
                  Send Invitation
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="group relative">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
            
            <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-bolt-gray-800 flex items-center justify-center">
                      <span className="text-xl font-bold text-bolt-gray-400">
                        {member.name[0]}
                      </span>
                    </div>
                  )}
                  {member.status === 'active' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-bolt-darker" />
                  )}
                </div>

                <div>
                  <h3 className="text-white font-medium">{member.name}</h3>
                  <p className="text-sm text-bolt-gray-400">{member.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-bolt-gray-800 text-bolt-gray-300">
                      {member.role}
                    </span>
                    {member.status === 'pending' && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamView;