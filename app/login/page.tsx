'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Shield, Lock, LogIn } from 'lucide-react';

type UserRole = 'Issuer' | 'Verifier' | 'Individual';

interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    hash_id: string;
    is_email_verified: boolean;
  };
}

const roleRedirects: Record<UserRole, string> = {
  Issuer: '/dashboard/issuer',
  Verifier: '/dashboard/verifier',
  Individual: '/dashboard/individual',
};

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    showPassword: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Get redirect path from mapping, fallback to dashboard
        const redirectPath = roleRedirects[data.user.role] || '/dashboard';
        router.push(redirectPath);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center">
            <Shield className="mr-3" size={32} />
            Document Verifier
          </h2>
          <p className="text-blue-100 mt-2">Welcome Back</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 items-center">
              <Mail className="mr-2 text-blue-600" size={20} />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 items-center">
              <Lock className="mr-2 text-blue-600" size={20} />
              Password
            </label>
            <div className="relative">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {formData.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 text-center text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                <LogIn className="mr-2" size={20} />
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}