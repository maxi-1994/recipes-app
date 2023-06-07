/* eslint-disable react/prop-types */
import { useContext } from 'react';

import { RecipeContext } from './RecipeContext';
import { AuthContext } from '../../auth/context/AuthContext';

import { useFetchRecipes } from '../../hooks/useFetchRecipes';


export const RecipeProvider = ({ children }) => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const { recipeList, addNewRecipe, deleteRecipe, editRecipe } = useFetchRecipes(user.idToken);
    
    return (
        <RecipeContext.Provider value={{
            recipeList,
            addNewRecipe,
            deleteRecipe,
            editRecipe
        }}>
            { children }
        </RecipeContext.Provider>
    )
}