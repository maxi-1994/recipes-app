import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../auth/context/AuthContext';
// import { useFetchRecipes } from '../../hooks/useFetchRecipes';
import { RecipeItem } from './RecipeItem';


export const RecipeList = () => {

    const { authState } = useContext(AuthContext)
    const { user } = authState;

    const [ recipeList, setRecipeList ] = useState([]);

    const getRecipeList = async () => {
        const url = `https://backend-recipes-bootcamps-tribe-production.up.railway.app/api/recipes/get?auth=${user.idToken}`;

        const resp =  await fetch(url);
        const data = await resp.json();
        setRecipeList(data);
    }

    useEffect(() => {
        getRecipeList();
    }, []);

    return (
        <>
            <h2>Listado de recetas - Agregar search</h2>
            <hr />

            <div id="cards-wrapper" className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                {
                    recipeList.map((recipe) => (
                        <RecipeItem key={ recipe._id } { ...recipe } />
                    ))
                }
                </div>
            </div>
        </>
    )
}