import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { fetchAuth } from '../../helpers/fetchAuth';


export const LoginPage = () => {

    const { login } = useContext(AuthContext);

    const { formState, onInputValueChange, onResetForm } = useForm({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const invalidForm = formState.email === '' || 
                        formState.password === '';

    const onSubmitForm = (event) => {
        event.preventDefault();

        if(invalidForm) { return; }

        fetchAuth(formState, 'login')
            .then(userData => {
                if(userData.error) {
                    console.log('Error en validacion', userData.error);
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