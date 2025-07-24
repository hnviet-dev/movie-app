function CircularProgressBar({ percent = percent, size = 3, strokeWidth = 0.3 }) {
    const radius = size / 2 - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
  
    return (
      <div>
        <svg width={`${size}vw`} height={`${size}vw`}>
          {/* Background Circle */}
          <circle
            r={`${radius}vw`}
            cx={`${size / 2}vw`}
            cy={`${size / 2}vw`}
            stroke="white"
            fill="black"
            strokeWidth={`${strokeWidth}vw`}
          />
  
          {/* Progress Circle */}
          <circle
            r={`${radius}vw`}
            cx={`${size / 2}vw`}
            cy={`${size / 2}vw`}
            stroke={percent>=80 ?'green':(percent>50?'orange':'red')}
            fill="none"
            strokeWidth={`${strokeWidth}vw`}
            strokeDasharray={`${circumference}vw`}
            strokeDashoffset={`${offset}vw`}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "center",
            }}
            strokeLinecap="round"
            
          />
  
          {/* Percentage Text */}
          <text
            x={`${size / 2}vw`}
            y={`${size / 2}vw`}
            fontSize={`${size * 0.25}vw`}
            fill="white"
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            {`${percent}`}
          </text>
        </svg>
      </div>
    );
  }
  
  export default CircularProgressBar;
  