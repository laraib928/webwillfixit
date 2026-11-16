import React from 'react';

interface LogoProps {
  showText?: boolean;
  className?: string;
  width?: number;
  height?: number;
  textClassName?: string;
  link?: boolean;
}

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 36" aria-hidden="true" className={className}>
      <path
        d="M2 4h8l7 20 4-11"
        fill="none"
        stroke="#f6f2e8"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M19 13l5-9 9 26 11-26"
        fill="none"
        stroke="#ffc21a"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M6 30c12 2 26-4 38-22"
        fill="none"
        stroke="#ff9a0a"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Logo({
  showText = true,
  className = '',
  width = 38,
  height = 30,
  textClassName = '',
}: LogoProps) {
  return (
    <div className={`logo ${className}`.trim()} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg
        viewBox="0 0 48 36"
        width={width}
        height={height}
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M2 4h8l7 20 4-11"
          fill="none"
          stroke="#f6f2e8"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M19 13l5-9 9 26 11-26"
          fill="none"
          stroke="#ffc21a"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M6 30c12 2 26-4 38-22"
          fill="none"
          stroke="#ff9a0a"
          strokeWidth="2"
        />
      </svg>
      {showText && (
        <span className={textClassName}>
          Web<span className="gold">will</span>fixit
        </span>
      )}
    </div>
  );
}

