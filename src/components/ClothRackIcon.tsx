/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface ClothRackIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  filled?: boolean;
}

/**
 * Luxury Clothes Rack & Wardrobe Closet Icon for Atelier Cart & Wardrobe.
 * Depicts a tailored garment rolling rack with top hanging rail, dual stanchions,
 * base feet, and hanging sartorial silhouette.
 */
export const ClothRackIcon: React.FC<ClothRackIconProps> = ({
  className = 'w-5 h-5',
  filled = false,
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
      {/* Top horizontal hanging rail with elegant end finials */}
      <line x1="3" y1="5.5" x2="21" y2="5.5" />
      <circle cx="3" cy="5.5" r="0.8" fill="currentColor" />
      <circle cx="21" cy="5.5" r="0.8" fill="currentColor" />

      {/* Dual upright structural posts */}
      <line x1="5.5" y1="5.5" x2="5.5" y2="19.5" />
      <line x1="18.5" y1="5.5" x2="18.5" y2="19.5" />

      {/* Bottom base stabilizer stretcher */}
      <line x1="5.5" y1="18" x2="18.5" y2="18" />

      {/* Dual base feet / rolling plinths */}
      <line x1="3.5" y1="19.5" x2="7.5" y2="19.5" />
      <line x1="16.5" y1="19.5" x2="20.5" y2="19.5" />

      {/* Central hanging garment / hanger on the rack */}
      <path d="M12 5.5v1.8" />
      <path
        d="M12 7.3L8.5 10.2h7L12 7.3z"
        fill={filled ? 'currentColor' : 'none'}
      />
      <path d="M9 10.2v4.8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4.8" />
      <line x1="12" y1="10.8" x2="12" y2="14.8" />
    </svg>
  );
};

export const ClosetIcon = ClothRackIcon;
export default ClothRackIcon;
