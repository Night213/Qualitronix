import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

export default function PaymentSuccess() {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
  if (seconds <= 0) {
    navigate('/Dashboard');
    return
  };

  const timer = setInterval(() => {
    setSeconds((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [seconds]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-all">
      <div className="bgc p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gold mb-4 drop-shadow">Payment Successful!</h1>
        <p className="text-gold mb-2">Thank you for your purchase. Your transaction has been completed successfully.</p>
        <p className="text-gold mb-6">Redirecting to dashboard in <span className="font-semibold">{seconds}</span> seconds...</p>
        
        {seconds <= 0 && (
          <div className="1">
            <p className="text-gold mb-4">If you are not redirected, click the button below:</p>
            <Link to="/dashboard" className="text-center bg-green p-3 py-2 rounded">
              <button className="slogan font-bold text-lg">
                Go to Dashboard
              </button>
            </Link>
          </div>
        )}
        
      </div>
    </div>
  );
}
