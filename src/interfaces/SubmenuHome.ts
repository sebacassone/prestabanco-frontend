/**
 * Interface for the SubMenu component
 * @interface
 * @property {string} menuId - The menu's id
 * @property {HTMLElement} anchorEl - The element that triggers the menu
 * @property {boolean} open - The menu's open state
 * @property {() => void} onClose - The function that closes the menu
 * @property {string[]} options - The menu's options
 */
interface SubMenuProps {
  menuId: string;
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  options: string[];
}

export default SubMenuProps;