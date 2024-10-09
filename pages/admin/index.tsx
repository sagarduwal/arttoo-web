'use client';
import React, { useState, useEffect } from 'react';

interface Email {
  id: string;
  email: string;
}

const LoginForm: React.FC<{ onLogin: (username: string, password: string) => void; error: string }> = ({
  onLogin,
  error,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <input
        type='text'
        placeholder='Username'
        autoComplete='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='w-full p-2 mb-4 border rounded'
      />
      <input
        type='password'
        placeholder='Password'
        autoComplete='current-password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full p-2 mb-4 border rounded'
      />
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
        Login
      </button>
    </form>
  );
};

const EmailTable: React.FC<{ emails: Email[] }> = ({ emails }) => (
  <table className='w-full border-collapse border'>
    <thead>
      <tr className='bg-gray-200'>
        <th className='border p-2'>Email</th>
      </tr>
    </thead>
    <tbody>
      {emails.map((email) => (
        <tr key={email.id}>
          <td className='border p-2'>{email.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmails();
    }
  }, [isAuthenticated]);

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError('');
    if (username === process.env.NEXT_PUBLIC_USERNAME && password === process.env.NEXT_PUBLIC_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  const fetchEmails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/email');
      if (!response.ok) throw new Error('Failed to fetch emails');
      const data = await response.json();
      setEmails(data.data);
    } catch (err) {
      console.error('Error fetching emails:', err);
      setError('Failed to fetch emails');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmails([]);
  };

  if (isLoading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <LoginForm onLogin={handleLogin} error={error} />
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Email Dashboard</h1>
        <button onClick={handleLogout} className='bg-red-500 text-white p-2 rounded'>
          Logout
        </button>
      </div>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <EmailTable emails={emails} />
    </div>
  );
}
