interface RingProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
  children?: (percentage: number) => React.ReactNode;
}

const RingProgress: React.FC<RingProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#FFF',
  className = '',
  children,
}) => {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (clampedPercentage / 100) * circumference;

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(clampedPercentage);
    }
    return children;
  };
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        filter:
          'drop-shadow(0 4px 20px rgba(252, 116, 0, 0.4)) drop-shadow(0 8px 40px rgba(252, 116, 0, 0.2))',
      }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(252, 116, 0, 0.6))',
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {renderChildren()}
      </div>
    </div>
  );
};
export default RingProgress;
