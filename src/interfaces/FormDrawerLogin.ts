/**
 * Interface for FormDrawer component
 * @interface
 * @property {boolean} open - The drawer's open state
 * @property {() => void} onClose - The function that closes the drawer
 */
interface FormDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default FormDrawerProps;
