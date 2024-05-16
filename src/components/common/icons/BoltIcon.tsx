interface BoldIconProps {
  width?: string;
  height?: string;
  color?: string;
}

export default function BoltIcon({
  width = "8",
  height = "12",
  color = "#ccc",
}: BoldIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 11.5L2.5 7.65H0L4.5 0.5H5.5L5 4.9H8L3 11.5H2Z" fill={color} />
    </svg>
  );
}
