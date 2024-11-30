import { useAuth } from '../contexts/AuthContext';
import { Login } from '../components/cloud/Login';
import { AdminDashboard } from '../components/cloud/AdminDashboard';

export function CloudPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}

export default CloudPage;