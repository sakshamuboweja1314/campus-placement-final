import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import StudentForm from './components/StudentForm';
import RecruiterForm from './components/RecruiterForm';
import RecruiterDashboard from './components/RecruiterDashboard';
import StudentDashboard from './components/StudentDashboard';

type AppState = 'login' | 'student-form' | 'recruiter-form' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [userType, setUserType] = useState<'student' | 'recruiter'>('student');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('campusConnectUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      const role = parsed.userType || parsed.role;
      if (role === 'student' || role === 'recruiter') {
        setUserType(role);
        setUserData(parsed);
        setAppState('dashboard');
      }
    }
  }, []);

  const handleLogin = (user: any, isNewUser: boolean) => {
    const role = user.role || user.userType || 'student';
    setUserType(role);
    setUserData(user);
    localStorage.setItem('campusConnectUser', JSON.stringify({ ...user, userType: role }));

    if (isNewUser) {
      setAppState(role === 'student' ? 'student-form' : 'recruiter-form');
    } else {
      setAppState('dashboard');
    }
  };

  const handleFormSubmit = (data: any) => {
    const role = data.userType || userType;
    const hydrate = { ...data, userType: role };
    localStorage.setItem('campusConnectUser', JSON.stringify(hydrate));
    setUserData(hydrate);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('campusConnectUser');
    setUserData(null);
    setAppState('login');
    setUserType('student');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {appState === 'login' && <LoginForm onLogin={handleLogin} />}
      {appState === 'student-form' && <StudentForm onSubmit={handleFormSubmit} />}
      {appState === 'recruiter-form' && <RecruiterForm onSubmit={handleFormSubmit} />}
      {appState === 'dashboard' && userData?.userType === 'recruiter' && (
        <RecruiterDashboard recruiterData={userData} onLogout={handleLogout} />
      )}
      {appState === 'dashboard' && userData?.userType === 'student' && (
        <StudentDashboard userData={userData} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
 