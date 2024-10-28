import logo from '../assets/images/logo.png';

const Logo = () => (
    <a href="/" onClick={() => window.location.href = '/'}>
        <img src={logo} alt="Logo" style={{ height: 'auto', width: '207px',  marginRight: '42em' }}/>
    </a>
);

export default Logo;

