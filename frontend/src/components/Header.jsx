import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { clearCredentials } from '../slices/authSlice';

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(clearCredentials());
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container style={{paddingTop: '7px'}}>
                    <Link to='/' style={{color: 'white', textDecoration: 'none'}}>
                        <h4>MERN Authentication</h4>
                    </Link>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            { userInfo ? (
                                <>
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <Link to='/profile' style={{color: 'black', textDecoration: 'none', marginLeft: '10px'}}>
                                            Profile
                                        </Link>
                                        <br />
                                        <Link onClick={ logoutHandler } to='/logout' style={{color: 'black', textDecoration: 'none', marginLeft: '10px'}}>
                                            Logout
                                        </Link>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <Link to='/login' style={{color: 'white', textDecoration: 'none', marginRight: '20px'}}>
                                        <p>
                                            <FaSignInAlt /> Sign In
                                        </p>
                                    </Link>
                                    <Link to='/register' style={{color: 'white', textDecoration: 'none'}}>
                                        <p>
                                            <FaSignOutAlt /> Sign Up
                                        </p>
                                    </Link>
                                </>
                            ) }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;