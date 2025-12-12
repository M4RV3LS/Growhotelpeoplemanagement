export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-[#E5E7EB] rounded animate-pulse ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, #E5E7EB 0%, #F3F4F6 50%, #E5E7EB 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
}

// Add to globals.css if needed:
// @keyframes shimmer {
//   0% { background-position: 200% 0; }
//   100% { background-position: -200% 0; }
// }
