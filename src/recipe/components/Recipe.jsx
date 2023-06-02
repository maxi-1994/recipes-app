import { useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { RecipeContext } from "../context/RecipeContext";

import { IngredientsList } from './IngredientsList';


export const Recipe = () => {

    const navigate = useNavigate();

    const { recipeId } = useParams();
    const { recipeList } = useContext(RecipeContext);

    const recipeSelected = recipeList.find(item => item._id === recipeId);

    const onBack = () => {
        navigate('/', {
            replace: false
        })
    }

    const onEditRecipe = () => {
        console.log('onEditRecipe');
    }
    
    return (
        <>
            <div id="recipe">
                <div className="buttons-wrapper">
                    <button className="btn btn-secondary" onClick={ onBack }>
                        <i className="bi bi-arrow-left-square"></i> Volver
                    </button>

                    <button className="btn btn-primary" onClick={ onEditRecipe }>
                        <i className="bi bi-pencil-square"></i> Editar
                    </button>
                </div>
                <div className="recipe-wrapper">
                    <div className="recipe-img-wrapper text-center">
                        <img className="img-thumbnail" src={ recipeSelected.imagePath } alt={ recipeSelected.name } />
                    </div>
                    <div className="recipe-details">
                        <h3>{ recipeSelected.name }</h3>
                        <p>{ recipeSelected.description }</p>
                    </div>
                </div>

                <IngredientsList ingredientsList={ recipeSelected.ingredients } />
            </div>
        </>
    )
}