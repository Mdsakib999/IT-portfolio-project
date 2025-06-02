const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin shadow-lg ring-2 ring-blue-100"></div>
        <p className="text-sm text-gray-500 font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
