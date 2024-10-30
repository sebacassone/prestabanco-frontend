/**
 * Interface for the PromoCard component
 * @interface
 * @property {string} title - The title of the card
 * @property {string} description - The description of the card
 * @property {string} bgColor - The background color of the card
 */
interface PromoCardProps {
  title: string;
  description: string;
  bgColor: string; // Background color for the card
}

export default PromoCardProps;
