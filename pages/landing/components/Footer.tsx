import React, { FormEvent, useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');
      if (email) {
        const response = await fetch(`/api/email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Email successfully submitted!');
        } else {
          setMessageError(`Error: ${data.error}`);
        }
      } else {
        setMessageError(`Error: Email is required`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
      setMessageError(`Error: ${errorMessage}`);
    }

    setEmail('');
    setLoading(false);
  };
  return (
    <footer className='bg-black scroll-panel'>
      <div className='w-[90vw] mx-auto sm:w-[85vw] flex flex-col gap-8 py-16'>
        <h3 className='text-white md:text-[60px] text-[30px] leading-[39.3px] sm:text-[44px] sm:leading-[51.23px] font-medium md:leading-[78.6px]'>
          Ready to Own <span className='italic'>Your Piece of History?</span>
        </h3>

        <div className='flex gap-2 flex-col font-poppins'>
          <form className='border border-white rounded-full p-1 max-w-[400px] w-full flex' onSubmit={handleSubmit}>
            <input
              type='email'
              className='focus:outline-none bg-transparent px-4 py-2 w-full text-white'
              placeholder='johndoe@gmail.com'
              id='email'
              value={email}
              onChange={(e) => {
                setMessageError('');
                setEmail(e.target.value);
              }}
              disabled={loading}
            />
            <button className='bg-[#E4FF1A] px-4 py-2 rounded-full text-black font-'>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {messageError && <p style={{ color: 'red' }}>{messageError}</p>}
          <p className='text-white leading-[19.2px]  font-light'>
            Join the Waitlist & Get Informed when New Artworks are Available!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
