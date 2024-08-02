// Settings.tsx
import React from 'react';

const Settings = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2" // Fix camelCase
    strokeLinecap="round" // Fix camelCase
    strokeLinejoin="round" // Fix camelCase
    className={className}
  >
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

export default Settings;
