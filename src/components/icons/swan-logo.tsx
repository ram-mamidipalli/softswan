import type { SVGProps } from 'react';

export function SwanLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 6c-4 0-4 2-6 3s-3 1-5 1-4-1-5-2-1.5-2.5-1.5-3.5C4.5 3.5 6 3 8 3c2.5 0 4 2 6.5 2S18 3 22 6Z" />
      <path d="M2 12c4 0 4-2 6-3s3-1 5-1 4 1 5 2 1.5 2.5 1.5 3.5c0 1-.5 1.5-1.5 1.5C16 16 14 14 11.5 14S7.5 16 2 12Z" />
    </svg>
  );
}
