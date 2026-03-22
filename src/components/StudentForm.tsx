import  { useState } from 'react';
import { User, Code, Briefcase, FolderOpen, Plus, X } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (data: any) => void;
}

export default function StudentForm({ onSubmit }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    course: '',
    year: '',
    skills: [''],
    experience: [{
      company: '',
      role: '',
      duration: '',
      description: ''
    }],
    projects: [{
      name: '',
      description: '',
      technologies: '',
      link: ''
    }]
  });

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const removeSkill = (index: number) => {
    const skills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills });
  };

  const updateSkill = (index: number, value: string) => {
    const skills = [...formData.skills];
    skills[index] = value;
    setFormData({ ...formData, skills });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', role: '', duration: '', description: '' }]
    });
  };

  const removeExperience = (index: number) => {
    const experience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const experience = [...formData.experience];
    experience[index] = { ...experience[index], [field]: value };
    setFormData({ ...formData, experience });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: '', description: '', technologies: '', link: '' }]
    });
  };

  const removeProject = (index: number) => {
    const projects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const projects = [...formData.projects];
    projects[index] = { ...projects[index], [field]: value };
    setFormData({ ...formData, projects });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, userType: 'student' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1638452033979-14fba9e17fbb?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHNraWxscyUyMHByb2dyYW1taW5nJTIwY29kaW5nJTIwcG9ydGZvbGlvJTIwcHJvamVjdHN8ZW58MHx8fHwxNzYyNDQ0Nzk3fDA&ixlib=rb-4.1.0&fit=fillmax&h=300&w=400"
                alt="Student profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Student Profile</h2>
            <p className="text-gray-600 mt-2">Build your comprehensive profile to connect with top recruiters</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <input
                  type="text"
                  required
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study</label>
                <select
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold">Technical Skills</h3>
              </div>
              <div className="space-y-3">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      placeholder="e.g., JavaScript, Python, React"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </button>
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold">Experience</h3>
              </div>
              {formData.experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="Company/Organization"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(index, 'role', e.target.value)}
                      placeholder="Role/Position"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      placeholder="Duration (e.g., 3 months)"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    placeholder="Description of your role and achievements"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      Remove Experience
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </button>
            </div>

            {/* Projects */}
            <div>
              <div className="flex items-center mb-4">
                <FolderOpen className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold">Projects</h3>
              </div>
              {formData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      placeholder="Project Name"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={project.technologies}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                      placeholder="Technologies Used"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      placeholder="Project Link (optional)"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    placeholder="Project Description"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      Remove Project
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addProject}
                className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Create Student Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
 