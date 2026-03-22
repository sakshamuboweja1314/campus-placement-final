import { useState } from 'react';
import { Users, MapPin, Star, Eye, Filter } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  institution: string;
  course: string;
  year: string;
  skills: string[];
  experience: any[];
  projects: any[];
  rating: number;
  location: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@student.ac.in',
    institution: 'IIT Delhi',
    course: 'Computer Science',
    year: '4th',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
    experience: [{ company: 'Google Summer of Code', role: 'Developer' }],
    projects: [{ name: 'E-commerce Platform', technologies: 'MERN Stack' }],
    rating: 4.8,
    location: 'Delhi'
  },
  {
    id: '2',
    name: 'Rahul Gupta',
    email: 'rahul.gupta@college.edu',
    institution: 'NIT Warangal',
    course: 'Electronics Engineering',
    year: '3rd',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    experience: [{ company: 'TechCorp', role: 'Intern' }],
    projects: [{ name: 'Banking System', technologies: 'Java Spring' }],
    rating: 4.5,
    location: 'Hyderabad'
  },
  {
    id: '3',
    name: 'Sneha Patel',
    email: 'sneha.patel@university.in',
    institution: 'BITS Pilani',
    course: 'Information Technology',
    year: '4th',
    skills: ['JavaScript', 'React', 'AWS', 'MongoDB'],
    experience: [{ company: 'Startup Hub', role: 'Frontend Developer' }],
    projects: [{ name: 'Social Media App', technologies: 'React Native' }],
    rating: 4.7,
    location: 'Rajasthan'
  },
  {
    id: '4',
    name: 'Arjun Singh',
    email: 'arjun.singh@tech.ac.in',
    institution: 'VIT Vellore',
    course: 'Computer Science',
    year: '3rd',
    skills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    experience: [],
    projects: [{ name: 'Blog Platform', technologies: 'Django REST' }],
    rating: 4.3,
    location: 'Chennai'
  }
];

interface RecruiterDashboardProps {
  recruiterData: any;
}

export default function RecruiterDashboard({ recruiterData }: RecruiterDashboardProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         student.institution.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'experienced') return matchesSearch && student.experience.length > 0;
    if (selectedFilter === 'final-year') return matchesSearch && student.year === '4th';
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {recruiterData.name}</h1>
              <p className="text-gray-600">{recruiterData.company} • {recruiterData.position}</p>
            </div>
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1565688527174-775059ac429c?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjByZWNydWl0bWVudCUyMGhpcmluZyUyMGNhbmRpZGF0ZXMlMjBvZmZpY2V8ZW58MHx8fHwxNzYyNDQ1NTI0fDA&ixlib=rb-4.1.0&fit=fillmax&h=300&w=400"
                alt="Recruiter"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  All Students ({mockStudents.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('experienced')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedFilter === 'experienced' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  With Experience
                </button>
                <button
                  onClick={() => setSelectedFilter('final-year')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedFilter === 'final-year' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Final Year Students
                </button>
              </div>

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Search by name, skills, institution..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Interested Candidates ({filteredStudents.length})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{student.rating}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">{student.institution}</p>
                            <p className="text-sm font-medium">{student.course} • {student.year} Year</p>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {student.location}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {student.skills.slice(0, 4).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {student.skills.length > 4 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{student.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {student.experience.length > 0 && (
                          <div className="mb-2">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Experience:</span> {student.experience[0].role} at {student.experience[0].company}
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="ml-4 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}

                {filteredStudents.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No students found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <p className="text-sm text-gray-600">{selectedStudent.email}</p>
                  <p className="text-sm text-gray-600">{selectedStudent.location}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Education</h4>
                  <p className="text-sm">{selectedStudent.institution}</p>
                  <p className="text-sm text-gray-600">{selectedStudent.course} • {selectedStudent.year} Year</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedStudent.experience.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Experience</h4>
                    {selectedStudent.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4 mb-3">
                        <p className="font-medium">{exp.role}</p>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                    ))}
                  </div>
                )}

                {selectedStudent.projects.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Projects</h4>
                    {selectedStudent.projects.map((project, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4 mb-3">
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-600">{project.technologies}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 flex space-x-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Send Interview Invite
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 