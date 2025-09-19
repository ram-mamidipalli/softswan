import type { SVGProps } from 'react';

export function SwanLogo(props: SVGProps<HTMLSpanElement>) {
  return (
    <span {...props}>
      Soft<span className="text-primary">Swan</span>
    </span>
  );
}
