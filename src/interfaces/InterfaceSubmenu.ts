interface SubMenuProps {
  menuId: string;
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  options: string[];
}

export default SubMenuProps;