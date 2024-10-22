const BackgroundAnimation = () => {
    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-500 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
      </div>
    );
  };
  
  export default BackgroundAnimation;