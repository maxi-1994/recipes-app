import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from '../../shared/Navbar';
import { RecipePage } from '../pages/RecipePage';
import { Recipe } from '../components/Recipe';

export const RecipeRouter = () => {

    return (
        <>
            <Navbar />

            <Routes>
                <Route path='recetas' element={ <RecipePage /> } />
                <Route path='receta/:recipeId' element={ <Recipe /> } />

                <Route path='/' element={ <Navigate to='recetas' /> } />
            </Routes>
        </>
    )
}