import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SubMenuProps from "../interfaces/InterfaceSubmenu";

const SubMenu: React.FC<SubMenuProps> = ({ anchorEl, open, onClose, options }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: '#D4BEE4',
          padding: 2,
          width: '300px'
        }
      }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} onClick={onClose} sx={{ fontSize: '1.2rem', padding: '16px' }}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
};



export default SubMenu;
