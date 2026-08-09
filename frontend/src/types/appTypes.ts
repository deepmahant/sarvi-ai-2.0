export interface WorkItem {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  tags?: string[];
  gradientClass: string;
  icon: 'star' | 'arrow-up-right' | 'plus' | 'circle' | 'sparkles' | 'layers';
  isDarkCard: boolean;
  accentColor: string;
}

export interface ClientLogo {
  name: string;
  delayMs: number;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  roleDescription: string;
  imageUrl: string;
  initials: string;
}

export interface PerspectiveItem {
  number: string;
  category: string;
  title: string;
  quote: string;
  description: string;
}
