import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export const RecipeItem = ({ recipeItems, onDeleteRecipe }) => {

    return (
        <div className="col">
            <div className="card">
                <img src={ recipeItems.imagePath } className="card-img-top" alt={ recipeItems.name } />
                <div className="card-body">
                    <h5 className="card-title">{ recipeItems.name }</h5>
                    <p className="card-text">{ recipeItems.description }</p>

                    <h6>Ingredientes</h6>
                    {
                        recipeItems.ingredients && recipeItems.ingredients.lenght > 0 ?
                        (
                            <ul>
                                <li>{ recipeItems.ingredients }</li>
                            </ul>
                        ) :
                        (
                            <p className="card-text">Esta receta no tiene ingredientes cargados</p>
                        )
                    }
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <Link className="btn btn-primary" to={`/receta/${recipeItems._id}`}><i className="bi bi-card-text"></i> Detalles</Link>
                    <button className="btn btn-danger" onClick={ () => onDeleteRecipe(recipeItems._id) }><i className="bi bi-trash"></i> Eliminar</button>
                </div>
            </div>
        </div>
    )
}

RecipeItem.propTypes = {
    recipeItems: PropTypes.object.isRequired,
    onDeleteRecipe: PropTypes.func.isRequired,
};

// customHook de recipe hecho -> lo centralice en un context para poder hacer el edit que lo hago redirigiendo a otra pantalla
// y tomo el id de la url. asi que estoy con el edit 

// usuario se borra solo

// re-renderizado en el getAllRecipes