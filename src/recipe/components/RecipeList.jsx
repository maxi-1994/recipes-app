import { useContext } from 'react';

import { AuthContext } from '../../auth/context/AuthContext';
import { useFetchRecipes } from '../../hooks/useFetchRecipes';
import { RecipeItem } from './RecipeItem';


export const RecipeList = () => {

    const { authState } = useContext(AuthContext)
    const { user } = authState;

    const { recipeList } = useFetchRecipes(user.idToken);

    return (
        <>
            <h2>Listado de recetas</h2>
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