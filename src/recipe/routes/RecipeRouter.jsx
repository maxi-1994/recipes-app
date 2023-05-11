import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from '../../shared/Navbar';
import { RecipePage } from '../pages/RecipePage';
import { Recipe } from '../components/Recipe';

export const RecipeRouter = () => {

    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    <Route path='recetas' element={ <RecipePage /> } />
                    <Route path='receta/:recipeId' element={ <Recipe /> } />
                    {/* Agregar favoritos */}

                    <Route path='/' element={ <Navigate to='recetas' /> } />
                </Routes>
            </div>
        </>
    )
}