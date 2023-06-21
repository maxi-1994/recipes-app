import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { fetchAuth } from '../../helpers/fetchAuth';


export const RegisterPage = () => {

    // TODO: Poner el helper fetchAuth() dentro del AuthContext?
    const { login } = useContext(AuthContext);

    const { formState, onInputValueChange, onResetForm } = useForm({
        email: '',
        password: '',
        repeatPassword: '',
    });

    const invalidForm = formState.email === '' || 
                        formState.password === '' || 
                        formState.repeatPassword === '' ||
                        formState.password !== formState.repeatPassword;

    const navigate = useNavigate();
    const [ errorsList, setErrorsList ] = useState([]);

    const onSubmitForm = (event) => {
        event.preventDefault();

        fetchAuth(formState, 'signup')
            .then(userData => {
                if(userData.errors) {
                    const errors = userData.errors.map(e => e.msg);
                    (errorsList.length > 0) ?? setErrorsList([])
                    setErrorsList([...errors])
                } else {
                    login(userData);
                    navigate('/', {
                        replace: true
                    });
                }

            });
        
        onResetForm();
    }

    return (
        <>
            <div className="auth-background">
                <div className="auth-content d-flex justify-content-center">
                    <form className="w-75" onSubmit={ onSubmitForm }>
                        <h1 className="text-center">Registro</h1>

                        <ul className="errors-list">
                            {
                                errorsList.map(error => (
                                    <li key={ error } className="text-danger mt-2">{ error }</li>
                                ))
                            }
                        </ul>

                        <div className="input-content mt-4">
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
                        <div className="input-content mt-4">
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
                        <div className="input-content mt-4">
                            <input 
                                type="password"
                                id="repeatPassword" 
                                name="repeatPassword" 
                                autoComplete="off" 
                                value={ formState.repeatPassword } 
                                onChange={ onInputValueChange }
                            />
                            <label className="placeholder-label" htmlFor="repeatPassword">
                                <div className="label-text">Repite contraseña</div>
                            </label>
                        </div>
                        <div className="register-link">
                            <p>¿Ya tienes una cuenta? <Link to="/login" >Ingresa</Link></p>
                        </div>
                        <div className="button-content text-center mt-4">
                            <button type="submit" className="btn btn-primary" disabled={ invalidForm }>Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}