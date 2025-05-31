export const PrimaryButton = ({ children, className = "", ...props }) => {
  const baseClass =
    "px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/80";

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
