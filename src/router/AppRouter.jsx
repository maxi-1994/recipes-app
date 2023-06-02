import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { RecipeProvider } from '../recipe/context/RecipeProvider';

import { LoginPage } from '../auth/pages/LoginPage';
import { RegisterPage } from '../auth/pages/RegisterPage';
import { RecipeRouter } from '../recipe/routes/RecipeRouter'


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
                        <RecipeProvider>
                            <RecipeRouter />
                        </RecipeProvider>
                    </PrivateRoute>
                } />
            </Routes>
        </>
    )
}