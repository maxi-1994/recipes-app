import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AuthContext } from '../auth/context/AuthContext';

export const Navbar = () => {

    const { authState, logout } = useContext(AuthContext);
    const { user } = authState;

    const onLogout = () => {
        logout();
    }

    return (
        <>
            <nav id="navbar-component" className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/">Recipe App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#recipeAppNavbar" aria-controls="recipeAppNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="recipeAppNavbar">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item">
                                <NavLink className={ ({isActive}) => `nav-item nav-link ${isActive ? 'active' : ''}`} 
                                    to="/recetas"
                                >
                                    Listado Recetas
                                </NavLink>
                            </li>
                        </ul>
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
        </>
    )
}