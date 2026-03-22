import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Info } from 'lucide-react';

/**
 * Clean and robust Icon component for Jurijob.
 * Supports all Lucide icons and provides a fallback.
 */

export type IconName = keyof typeof LucideIcons | string;

type IconProps = React.SVGProps<SVGSVGElement> & {
    name: IconName;
    size?: number;
    color?: string; // Standard HTML color or Tailwind color
    strokeWidth?: number;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ 
    name, 
    size = 24, 
    color = 'currentColor', 
    className = '', 
    strokeWidth = 2, 
    ...props 
}) => {
    // Resolve icon component dynamically from LucideIcons
    const IconComponent = (LucideIcons as any)[name];

    if (!IconComponent) {
        // Fallback to Info icon if the specified name is not found
        // Uses console.warn in development to help identify missing icons
        if (process.env.NODE_ENV === 'development') {
            console.warn(`Icon "${name}" not found in lucide-react.`);
        }
        return <Info size={size} color={color} strokeWidth={strokeWidth} className={className} {...props} />;
    }

    // Lucide icons expect 'size' or 'width'/'height'
    // The wrapper ensures consistency with existing project usage
    return (
        <IconComponent 
            size={size} 
            color={color} 
            strokeWidth={strokeWidth} 
            className={className} 
            {...props} 
        />
    );
};

export default Icon;
