interface LoadingProps {
  root?: string; //Customize bg with tailwind classes
  size?: number;
  color?: string;
}

export default function Loading({
  root = "",
  size = 44,
  color = "border-green-900",
}: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${root}`}>
      <div
        style={{ width: size, height: size }}
        className={`round-full border-3  border-t-transparent rounded-full animate-spin ${color}`}
      />
    </div>
  );
}
