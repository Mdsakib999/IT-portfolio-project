export const PrimaryButton = ({ children, className = "w-full", ...props }) => {
  const baseClass =
    "px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/80 mt-3 md:mt-0 cursor-pointer";

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
