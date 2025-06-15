
export function Button({ children, onClick, variant = "default" }) {
  const baseStyle = "px-4 py-2 rounded font-semibold cursor-pointer";
  const variantStyle = variant === "outline"
    ? "border border-black text-black bg-white"
    : "bg-black text-white";
  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
      {children}
    </button>
  );
}
