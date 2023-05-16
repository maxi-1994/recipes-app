import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from '../../shared/Navbar';
import { RecipePage } from '../pages/RecipePage';
import { AddRecipePage } from '../pages/AddRecipePage';
import { Recipe } from '../components/Recipe';

export const RecipeRouter = () => {

    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    <Route path='recetas' element={ <RecipePage /> } />
                    <Route path='agregar' element={ <AddRecipePage /> } />
                    <Route path='receta/:recipeId' element={ <Recipe /> } />
                    {/* Agregar favoritos */}

                    <Route path='/' element={ <Navigate to='recetas' /> } />
                </Routes>
            </div>
        </>
    )
}