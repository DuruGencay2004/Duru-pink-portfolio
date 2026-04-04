interface LilyDividerProps {
  variant?: 'a' | 'b';
}

const PETALS_A = [0, 60, 120, 180, 240, 300];
const PETALS_B = [30, 90, 150, 210, 270, 330];

export default function LilyDivider({ variant = 'a' }: LilyDividerProps) {
  const angles = variant === 'a' ? PETALS_A : PETALS_B;

  return (
    <div className="flex justify-center py-10 pt-0">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-12 h-12 opacity-60"
      >
        <g transform="translate(24,24)">
          {angles.map((angle, i) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-10"
              rx="3.5"
              ry="8"
              fill={i % 2 === 0 ? '#FF1F7A' : '#FFB3D4'}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="3.5" fill="#E0006F" />
        </g>
      </svg>
    </div>
  );
}
