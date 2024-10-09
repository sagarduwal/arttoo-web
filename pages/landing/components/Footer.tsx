import React, { FormEvent, useCallback, useEffect, useState } from 'react';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface SubmitResponse {
  error?: string;
}

const useEmailSubmit = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  const clearMessages = useCallback(() => {
    setMessage('');
    setMessageError('');
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (message || messageError) {
      timer = setTimeout(clearMessages, 2000);
    }
    return () => clearTimeout(timer);
  }, [message, messageError, clearMessages]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    clearMessages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      if (!email) {
        throw new Error('Email is required');
      }

      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: SubmitResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit email');
      }

      setMessage('Email successfully submitted!');
      setEmail('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
      setMessageError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail: handleEmailChange, loading, message, messageError, handleSubmit };
};

const Footer = () => {
  const { email, setEmail, loading, message, messageError, handleSubmit } = useEmailSubmit();

  return (
    <footer className='bg-black '>
      <div className='w-[90vw] mx-auto sm:w-[85vw] flex flex-col gap-8 py-16'>
        <h3 className='text-white md:text-[60px] text-[30px] leading-[39.3px] sm:text-[44px] sm:leading-[51.23px] font-medium md:leading-[78.6px]'>
          Ready to Own <span className='italic'>Your Piece of History?</span>
        </h3>

        <div className='flex gap-2 flex-col font-poppins'>
          <form className='border border-white rounded-full p-1 max-w-[400px] w-full flex' onSubmit={handleSubmit}>
            <input
              type='text'
              className='focus:outline-none bg-transparent px-4 py-2 w-full text-white'
              placeholder='johndoe@gmail.com'
              id='email'
              value={email}
              onChange={setEmail}
              disabled={loading}
            />
            <button disabled={loading} className='bg-[#E4FF1A] px-4 py-2 rounded-full text-black'>
              Submit
            </button>
          </form>
          <p className='text-white leading-[19.2px] font-light'>
            Join the Waitlist & Get Informed when New Artworks are Available!
          </p>
          {message && <p className='text-green-600 text-sm'>{message}</p>}
          {messageError && <p className='text-red-600 text-sm'>{messageError}</p>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
