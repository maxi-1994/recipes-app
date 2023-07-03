import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { fetchAuth } from '../../helpers/fetchAuth';

import Swal from 'sweetalert2';


export const LoginPage = () => {

    // TODO: Poner el helper fetchAuth() dentro del AuthContext/useAuth
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const { formState, onInputValueChange, onResetForm } = useForm({
        email: '',
        password: '',
    });

    const invalidForm = formState.email === '' || 
                        formState.password === '';

    const onSubmitForm = (event) => {
        event.preventDefault();

        fetchAuth(formState, 'login')
            .then(userData => {
                if(userData.error) {
                    Swal.fire({  
                        icon: 'error',
                        text: 'El email o la contraseña son incorrectas',
                    }); 
                } else {
                    login(userData);
                    navigate('/', {
                        replace: true
                    });
                }

            })
            .catch(error => console.error(`ERROR: ${error}`));

        onResetForm();
    } 

    return (
        <>
            <div className="auth-background">
                <div className="auth-content d-flex justify-content-center">
                    <form className="w-75" onSubmit={ onSubmitForm }>
                        <h1 className="text-center">Login</h1>
                        <div className="input-content mt-5">
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                autoComplete="off" 
                                value={ formState.email }
                                onChange={ onInputValueChange }
                            />
                            <label className="placeholder-label" htmlFor="email">
                                <div className="label-text">Email</div>
                            </label>
                        </div>
                        <div className="input-content mt-5">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="off"
                                value={ formState.password }
                                onChange={ onInputValueChange }
                            />
                            <label className="placeholder-label" htmlFor="password">
                                <div className="label-text">Contraseña</div>
                            </label>
                        </div>
                        <div className="register-link">
                            <p>¿No tienes cuenta? <Link to="/register" >Registrate</Link></p>
                        </div>
                        <div className="button-content text-center mt-4">
                            <button type="submit" className="btn btn-primary" disabled={ invalidForm } >Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}