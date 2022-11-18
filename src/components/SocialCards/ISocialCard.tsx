interface TwitterCardProps {
    card: 'summary_large_image' | 'summary';
}

export interface SocialCardProps {
  title: string;
  description: string;
  image: string;
  domain: string;
  twitter?: TwitterCardProps;
}