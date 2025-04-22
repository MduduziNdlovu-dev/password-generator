import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex space-x-4">
      <Link to="/" className="hover:underline">Generate</Link>
      <Link to="/saved" className="hover:underline">Saved Passwords</Link>
      <Button variant="link" onClick={handleLogout} className="ml-auto">
        Logout
      </Button>
    </nav>
  );
}