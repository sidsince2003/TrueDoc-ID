// Signup.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserCheck, Shield, Mail, Key, Lock, Send, User } from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    role: 'Individual',
    showPassword: false,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    if (!otpSent) {
      // Request OTP
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/request-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        });

        const data = await response.json();
        if (response.ok) {
          setOtpSent(true);
          setMessage('OTP sent successfully to your email!');
        } else {
          setError(true);
          setMessage(data.message || 'Failed to send OTP.');
        }
      } catch (err) {
        setError(true);
        setMessage('An error occurred while sending OTP.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Complete Signup
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            otp: formData.otp,
            role: formData.role,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage('Signup successful! Redirecting to login...');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          setError(true);
          setMessage(data.message || 'Signup failed.');
        }
      } catch (err) {
        setError(true);
        setMessage('An error occurred during signup.');
      } finally {
        setIsLoading(false);
      }
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
          <p className="text-blue-100 mt-2">Secure Signup</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
            <label htmlFor="role" className="block text-gray-700 font-semibold mb-2 items-center">
              <User className="mr-2 text-blue-600" size={20} />
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Individual">Individual</option>
              <option value="Issuer">Issuer</option>
              <option value="Verifier">Verifier</option>
            </select>
          </div>

          {otpSent && (
            <div className="relative">
              <label htmlFor="otp" className="block text-gray-700 font-semibold mb-2 items-center">
                <Key className="mr-2 text-blue-600" size={20} />
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                required
                placeholder="Enter the OTP sent to your email"
                className="w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

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
                placeholder="Enter a strong password"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                {otpSent ? (
                  <>
                    <UserCheck className="mr-2" size={20} />
                    Sign Up
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Request OTP
                  </>
                )}
              </>
            )}
          </button>
        </form>

        {message && (
          <div
            className={`p-4 text-center ${
              error ? 'text-red-500' : 'text-green-500'
            } bg-opacity-10 rounded-lg mx-8 mb-8`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}