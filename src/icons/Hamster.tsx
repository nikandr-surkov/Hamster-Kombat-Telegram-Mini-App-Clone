// Hamster.tsx
import React from 'react';

const Hamster = ({ size, className }: { size: number; className?: string }) => (
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
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default Hamster;
