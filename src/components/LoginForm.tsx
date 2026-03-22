import { useState } from 'react';
import { User, Building, Eye, EyeOff, Users, Globe } from 'lucide-react';
interface LoginFormProps {
  onLogin: (user: any, isNewUser: boolean) => void;
}
export default function LoginForm({
  onLogin
}: LoginFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'student' | 'recruiter'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    institution: '',
    company: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password.trim().length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'register' && !formData.name.trim()) {
      alert('Name is required for registration.');
      return;
    }

    if (mode === 'register' && userType === 'student' && !formData.institution.trim()) {
      alert('Institution is required for student registration.');
      return;
    }

    if (mode === 'register' && userType === 'recruiter' && !formData.company.trim()) {
      alert('Company is required for recruiter registration.');
      return;
    }

    const payload: any = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
      role: userType
    };

    if (mode === 'register') {
      payload.name = formData.name.trim();
      if (formData.institution) payload.institution = formData.institution.trim();
      if (formData.company) payload.company = formData.company.trim();
    }

    try {
      const endpoint = mode === 'register' ? '/api/users' : '/api/users/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Login/Register failed' }));

        if (mode === 'register' && err.message?.toLowerCase().includes('email already in use')) {
          // If user already exists, automatically try login path for convenience.
          const loginRes = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: payload.email, password: payload.password })
          });
          if (loginRes.ok) {
            const existingUser = await loginRes.json();
            const normalized = { ...existingUser, userType: existingUser.role || userType };
            localStorage.setItem('campusConnectUser', JSON.stringify(normalized));
            onLogin(normalized, false);
            return;
          }

          const loginErr = await loginRes.json().catch(() => ({ message: 'Account exists with different password. Please login with your registered password.' }));
          alert(loginErr.message || 'Account exists with different password. Please login with your registered password.');
          return;
        }

        alert(err.message || `Failed to ${mode === 'register' ? 'register' : 'login'}. Please check your credentials and try again.`);
        return;
      }

      const user = await res.json();
      const normalizedUser = { ...user, userType: user.role || userType };
      localStorage.setItem('campusConnectUser', JSON.stringify(normalizedUser));
      onLogin(normalizedUser, mode === 'register');
    } catch (error: any) {
      console.error(`${mode === 'register' ? 'Registering' : 'Logging in'} user failed:`, error);
      alert(`An error occurred during ${mode === 'register' ? 'registration' : 'login'}. Check console for details.`);
    }
  };

  return <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-white">
            <Users className="w-8 h-8" />
            <h1 className="text-2xl font-bold">CampusConnect</h1>
          </div>
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Unified Campus Placement Platform
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Connecting institutions, students, and recruiters across India with transparent and equitable recruitment opportunities.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-blue-100">
                <Globe className="w-5 h-5" />
                <span>Equal access for Tier 1, 2, and 3 colleges</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <User className="w-5 h-5" />
                <span>AI-driven skill enhancement</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <Building className="w-5 h-5" />
                <span>Real-time tracking and notifications</span>
              </div>
            </div>
          </div>
        </div>
        
               {/* Campus Images */}
        <div className="grid grid-cols-2 gap-4">
          <img className="h-48 w-full object-cover opacity-[1.1] rounded-lg" style={{
          MozAppearance: "none"
        }} src="https://images.unsplash.com/photo-1666066839374-29d8bfd9c19b?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBwbGFjZW1lbnQlMjBzdHVkZW50cyUyMGNvbGxlZ2UlMjByZWNydWl0bWVudHxlbnwwfHx8fDE3NjI0NDQ1NDB8MA&ixlib=rb-4.1.0&fit=fillmax&h=300&w=400" alt="Students walking on campus" />

          <img src="https://images.unsplash.com/photo-1642287342121-8857cd9d1f5f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxjYW1wdXMlMjBwbGFjZW1lbnQlMjBzdHVkZW50cyUyMGNvbGxlZ2UlMjByZWNydWl0bWVudHxlbnwwfHx8fDE3NjI0NDQ1NDB8MA&ixlib=rb-4.1.0&fit=fillmax&h=300&w=400" alt="Campus environment" className="rounded-lg h-48 w-full object-cover opacity-80" />

        </div> 
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h3>
            <p className="text-gray-600 mt-2">
              {mode === 'login' ? 'Sign in to your account' : 'Register for CampusConnect'}
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-4 text-sm">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`px-4 py-2 rounded-lg ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`px-4 py-2 rounded-lg ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Register
            </button>
          </div>

          {/* User Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button type="button" onClick={() => setUserType('student')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${userType === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <User className="w-4 h-4 inline mr-2" />
              Student
            </button>
            <button type="button" onClick={() => setUserType('recruiter')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${userType === 'recruiter' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <Building className="w-4 h-4 inline mr-2" />
              Recruiter
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {mode === 'register' && userType === 'student' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your college/university"
                />
              </div>
            )}

            {mode === 'register' && userType === 'recruiter' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your company name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={e => setFormData({
                ...formData,
                password: e.target.value
              })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10" placeholder="Enter your password" />

                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">

                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              {mode === 'login'
                ? `Sign In as ${userType === 'student' ? 'Student' : 'Recruiter'}`
                : `Register as ${userType === 'student' ? 'Student' : 'Recruiter'}`}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
              <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-blue-600 hover:text-blue-500 font-medium">
                {mode === 'login' ? 'Register now' : 'Login instead'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>;
}