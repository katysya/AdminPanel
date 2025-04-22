const NotFound = () => {
  return (
    <div className="flex-column items-center justify-center m-6">
      <svg
        className="w-12 h-12 mb-1 mx-auto text-gray-400 dark:text-gray-500 self-center"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 9.75L14.25 14.25M9.75 14.25L14.25 9.75M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        />
      </svg>
      <div className="flex items-center justify-center text-lg">Not Found</div>
    </div>
  );
};

export default NotFound;
