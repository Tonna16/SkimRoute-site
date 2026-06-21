export default function ChromeIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4.5" fill="white" />
      <path d="M12 7.5h9.16A10 10 0 1 0 12 22V7.5z" fill="none" />
      <path d="M12 7.5h9.16a10 10 0 0 0-9.16-5.5A10 10 0 0 0 3.5 7.5H12z" fill="#EA4335" />
      <path d="M3.5 7.5A10 10 0 0 0 12 22l4.58-7.94A4.5 4.5 0 0 1 12 16.5a4.5 4.5 0 0 1-4.5-4.5A4.5 4.5 0 0 1 12 7.5H3.5z" fill="#34A853" />
      <path d="M12 7.5a4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-.92 2.74L21.5 7.5A10 10 0 0 0 12 2a10 10 0 0 0-8.5 5.5H12z" fill="#FBBC05" />
      <path d="M16.58 14.24A4.5 4.5 0 0 1 12 16.5a4.5 4.5 0 0 1-4.5-4.5A4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-.08.74z" fill="none" />
      <circle cx="12" cy="12" r="3" fill="#4285F4" />
    </svg>
  );
}