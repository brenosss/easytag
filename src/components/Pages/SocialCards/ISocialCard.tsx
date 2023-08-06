interface TwitterCardProps {
    card: 'summary_large_image' | 'summary' | 'app' | 'player';
}

export interface SocialCardProps {
  title: string;
  description: string;
  image: string;
  domain: string;
  twitter?: TwitterCardProps;
  path?: string
}