export interface CryptoCardProps {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change: number;
  onClick?: () => void;
  portfolio?: boolean;
}