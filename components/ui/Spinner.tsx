type SpinnerProps = {
  size?: number;
  color?: string;
};

export default function Spinner({
  size = 24,
  color = "#8b5cf6",
}: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
        className="animate-spin rounded-full border-2 border-[#8b5cf6]"
      />
    </div>
  );
}
