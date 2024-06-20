const ProgressBar = ({ current, total }) => {
    const percentage = (total > 0) ? (current / total) * 100 : 0;
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
        <div
          className={`bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
          style={{ width: `${percentage}%` }}
        >
          {current}/{total} vote points
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  