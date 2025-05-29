import {
  PenTool,
  Target,
  Search,
  Share2,
  Mail,
  TrendingUp,
  Briefcase,
  FileText,
  Zap,
  Heart,
  ShoppingCart,
  DollarSign,
  LucideIcon
} from 'lucide-react';

// Icon mapping from string names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Target,
  Search,
  Share2,
  Mail,
  TrendingUp,
  Briefcase,
  FileText,
  Zap,
  Heart,
  ShoppingCart,
  DollarSign,
};

// Default icon for fallback
const DefaultIcon = PenTool;

/**
 * Maps an icon string name to the corresponding Lucide icon component
 * @param iconName - The string name of the icon
 * @returns The Lucide icon component
 */
export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || DefaultIcon;
}

/**
 * Gets all available icon names
 * @returns Array of available icon names
 */
export function getAvailableIconNames(): string[] {
  return Object.keys(iconMap);
}

export default iconMap; 