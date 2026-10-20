export default function GradientBlob({ className = '' }) {
  return (
    <div
      className={`absolute pointer-events-none rounded-full blur-3xl opacity-30 ${className}`}
      aria-hidden
    />
  );
}
