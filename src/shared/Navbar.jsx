import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../auth/context/AuthContext';

export const Navbar = () => {

    const { authState, logout } = useContext(AuthContext);
    const { user } = authState;
    const onLogout = () => logout();

    return (
        <nav id="navbar-component" className="navbar navbar-expand-lg">
            <div className="container">
                <div className="navbar-wrapper">
                    <Link className="navbar-brand" to="/">
                        <img src="../../assets/food-logo.png" alt="food-logo" />
                        <span>Recipe App</span>
                    </Link>
                    <div className="user-dropdown dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            { user.email }
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button type="button" className="dropdown-item" onClick={ onLogout }>Cerrar Sesión</button> 
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}