import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginPage } from '../auth/pages/LoginPage';
import { RegisterPage } from '../auth/pages/RegisterPage';
import { RecipeRouter } from '../recipe/routes/RecipeRouter'

/*
    TODO:
    Agregar rutas publicas y privadas
*/

export const AppRouter = () => {

    return (
        <>
            <Routes>
                <Route path='/login' element={ 
                    <PublicRoute> 
                        <LoginPage />
                    </PublicRoute>
                }/>


                <Route path='/register' element={ 
                    <PublicRoute>
                        <RegisterPage /> 
                    </PublicRoute>
                }/>

                <Route path='/*' element={ 
                    <PrivateRoute>
                        <RecipeRouter /> 
                    </PrivateRoute>
                } />
            </Routes>
        </>
    )
}