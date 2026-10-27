/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface HangerIconProps extends React.SVGProps<SVGSVGElement> {
  filled?: boolean;
  className?: string;
}

/**
 * Luxury Clothes Hanger Icon component for Saved Pieces / Wishlist.
 * Replicates a classic atelier tailored garment hanger with an elegant hook
 * and sculptural triangular frame.
 */
export const HangerIcon: React.FC<HangerIconProps> = ({
  filled = false,
  className = 'w-5 h-5',
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Top Hanger Hook: always a graceful curved stroke */}
      <path
        d="M9.5 4.2C9.5 2.8 10.6 1.8 12.2 1.8C13.8 1.8 14.8 2.8 14.8 4.2C14.8 5.6 13.6 6.6 12 7.4V9.5"
        fill="none"
      />
      {/* Hanger Frame / Crossbar Body */}
      <path
        d="M12 9.5L2.5 16.5C1.8 17.2 2.2 18 3.2 18H20.8C21.8 18 22.2 17.2 21.5 16.5L12 9.5Z"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  );
};

export default HangerIcon;
