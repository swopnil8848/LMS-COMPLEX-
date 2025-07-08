import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <img
        src="/notfound_img.jpg"
        alt="404 - Not Found"
        className="max-w-md w-full mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-600">Oops! The page you're looking for doesn’t exist.</p>
    </div>
  );
};

export default NotFound;
