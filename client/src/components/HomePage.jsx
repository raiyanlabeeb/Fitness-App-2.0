import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Fitness App 2.0
      </h1>
      <p className="text-lg md:text-xl max-w-xl text-center">
        Track your workouts, set your goals, and stay motivated to become the best version of yourself.
      </p>
    </div>
  );
};

export default HomePage;
