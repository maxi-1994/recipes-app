import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { IngredientsList } from '../components/IngredientsList';


export const RecipeItem = ({ recipeItems, onDeleteRecipe }) => {

    return (
        <div className="col">
            <div className="card">
                <img src={ recipeItems.imagePath } className="card-img-top" alt={ recipeItems.name } />
                <div className="card-body">
                    <h5 className="card-title">{ recipeItems.name }</h5>
                    <p className="card-text">{ recipeItems.description }</p>

                    <IngredientsList ingredientsList={ recipeItems.ingredients } isEditable={ false } />

                </div>
                <div className="card-footer d-flex justify-content-between">
                    <Link className="btn btn-primary" to={`/receta/${recipeItems._id}`}><i className="bi bi-card-text"></i> Detalles</Link>
                    <button type="button" className="btn btn-danger" onClick={ () => onDeleteRecipe(recipeItems._id) }><i className="bi bi-trash"></i> Eliminar</button>
                </div>
            </div>
        </div>
    )
}

RecipeItem.propTypes = {
    recipeItems: PropTypes.object.isRequired,
    onDeleteRecipe: PropTypes.func.isRequired,
};