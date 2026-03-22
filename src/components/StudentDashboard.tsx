import  { useState } from 'react';
import { Search, Bell, User, BookOpen, Award, Globe, MessageCircle, Star, Briefcase, TrendingUp, Target, ChevronRight } from 'lucide-react';

interface StudentDashboardProps {
  userData: any;
  onLogout: () => void;
}

const companies = [
  { name: 'TechCorp', logo: '🚀', openings: 15, location: 'Bangalore', type: 'Technology' },
  { name: 'DataSys', logo: '📊', openings: 8, location: 'Hyderabad', type: 'Analytics' },
  { name: 'WebFlow', logo: '🌐', openings: 12, location: 'Mumbai', type: 'Web Development' },
  { name: 'CloudTech', logo: '☁️', openings: 6, location: 'Pune', type: 'Cloud Services' }
];

const jobRecommendations = [
  { company: 'TechCorp', role: 'Software Engineer', match: 95, salary: '8-12 LPA' },
  { company: 'DataSys', role: 'Data Analyst', match: 88, salary: '6-10 LPA' },
  { company: 'WebFlow', role: 'Frontend Developer', match: 82, salary: '7-11 LPA' }
];

export default function StudentDashboard({ userData, onLogout }: StudentDashboardProps) {
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const handleAIChat = () => {
    setShowAIChat(!showAIChat);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userData.name}</h1>
              <p className="text-gray-600">{userData.institution} • {userData.course}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={onLogout} className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                Log out
              </button>
              <Bell className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1640163561337-b0d4161f7ce9?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZGFzaGJvYXJkJTIwY2FyZWVyJTIwZ3VpZGFuY2UlMjBza2lsbHMlMjBkZXZlbG9wbWVudCUyMGNvbXBhbmllcyUyMGpvYnN8ZW58MHx8fHwxNzYyNDgxNzQ0fDA&ixlib=rb-4.1.0&fit=fillmax&h=300&w=400"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Applications</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <BookOpen className="h-12 w-12 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Interview Calls</p>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <Award className="h-12 w-12 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Offers</p>
                    <p className="text-3xl font-bold">1</p>
                  </div>
                  <Star className="h-12 w-12 text-purple-200" />
                </div>
              </div>
            </div>

            {/* Job Recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  AI-Powered Job Recommendations
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {jobRecommendations.map((job, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-gray-900">{job.role}</h3>
                          <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                            <span className="text-green-700 text-xs font-medium">{job.match}% Match</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{job.company}</p>
                        <p className="text-blue-600 text-sm font-medium">{job.salary}</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Companies */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Top Companies Hiring
                </h2>
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.map((company, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{company.logo}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{company.name}</h3>
                          <p className="text-gray-600 text-sm">{company.type}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                            <Globe className="w-3 h-3" />
                            <span>{company.location}</span>
                            <span>•</span>
                            <span>{company.openings} openings</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Skills Assistant */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                  AI Skills Assistant
                </h3>
                <button
                  onClick={handleAIChat}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors"
                >
                  Chat Now
                </button>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-700">
                  💡 Based on your profile, I recommend strengthening your React skills and learning TypeScript for better job opportunities!
                </p>
              </div>

              {showAIChat && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>AI Assistant:</strong> Hi! I've analyzed your profile and can help you improve your skills. What would you like to know?
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask about skills, career advice..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Skill Development */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Skill Development
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">React.js</span>
                  <span className="text-xs text-gray-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Node.js</span>
                  <span className="text-xs text-gray-500">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">TypeScript</span>
                  <span className="text-xs text-gray-500">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '40%'}}></div>
                </div>
              </div>

              <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                Improve Skills
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-600" />
                Recent Activity
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-900">Application viewed by TechCorp</p>
                    <p className="text-gray-500 text-xs">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-900">New job match found</p>
                    <p className="text-gray-500 text-xs">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-900">Interview scheduled</p>
                    <p className="text-gray-500 text-xs">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 