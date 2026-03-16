import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

type IconName = keyof typeof LucideIcons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'currentColor', className = '', strokeWidth = 2, ...props }) => {
    const IconComponent = LucideIcons[name] as React.FC<React.SVGProps<SVGSVGElement>>;

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent width={size} color={color} strokeWidth={strokeWidth} className={className} {...props} />;
};

export default Icon;
