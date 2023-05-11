import { Routes, Route } from 'react-router-dom';

import { Login } from '../auth/pages/Login';
import { Register } from '../auth/pages/Register';
import { RecipeRouter } from '../recipe/routes/RecipeRouter'

/*
    TODO:
    Agregar rutas publicas y privadas
*/

export const AppRouter = () => {

    return (
        <>
            <Routes>
                <Route path='/login' element={ <Login /> }/>
                <Route path='/register' element={ <Register /> }/>

                <Route path='/*' element={ <RecipeRouter /> } />
            </Routes>
        </>
    )
}