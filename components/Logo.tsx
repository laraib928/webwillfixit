import React from 'react';
import Image from 'next/image';

interface LogoProps {
  showText?: boolean;
  className?: string;
  width?: number;
  height?: number;
  textClassName?: string;
  link?: boolean;
  variant?: 'horizontal' | 'stacked' | 'mark';
}

export function LogoMark({
  className = '',
  width = 56,
  height = 30,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src="/logo-mark.png"
      alt="Webwillfixit Logo Mark"
      width={width}
      height={height}
      className={`logo-mark-img ${className}`.trim()}
      priority
      style={{
        width: `${width}px`,
        height: 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
}

export default function Logo({
  showText = true,
  className = '',
  width,
  height,
  variant = 'horizontal',
}: LogoProps) {
  if (!showText || variant === 'mark') {
    return <LogoMark className={className} width={width || 56} height={height || 30} />;
  }

  if (variant === 'stacked') {
    return (
      <div
        className={`logo ${className}`.trim()}
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        <Image
          src="/logo.png"
          alt="Webwillfixit · Complete Digital Solutions"
          width={width || 180}
          height={height || 102}
          priority
          style={{
            width: width ? `${width}px` : 'clamp(140px, 32vw, 180px)',
            height: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    );
  }

  // Default: modern horizontal layout (Mark + Webwillfixit + Complete Digital Solutions)
  return (
    <div
      className={`logo ${className}`.trim()}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <Image
        src="/logo-horizontal.png"
        alt="Webwillfixit · Complete Digital Solutions"
        width={width || 205}
        height={height || 44}
        priority
        style={{
          width: width ? `${width}px` : 'clamp(145px, 38vw, 205px)',
          height: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}

