import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const RecipeItem = ({ _id, imagePath, name, description, ingredients }) => {

    const onDeleteRecipe = () => {
        console.log('onDeleteRecipe');
    }

    return (
        <div className="card">
            <img src={ imagePath } className="card-img-top" alt={ name } />
            <div className="card-body">
                <h5 className="card-title">{ name }</h5>
                <p className="card-text">{ description }</p>

                <h6>Ingredientes</h6>
                {
                    ingredients && ingredients.lenght > 0 ?
                    (
                        <ul>
                            <li>{ ingredients }</li>
                        </ul>
                    ) :
                    (
                        <p className="card-text">Esta receta no tiene ingredientes cargados</p>
                    )
                }
            </div>
            <div className="card-footer d-flex justify-content-between">
                <Link className="btn btn-primary" to={`/receta/${_id}`}><i className="bi bi-card-text"></i> Detalles</Link>
                <button className="btn btn-danger" onClick={ onDeleteRecipe }><i className="bi bi-trash"></i> Eliminar</button>
            </div>
        </div>
    )
}

RecipeItem.propTypes = {
    _id: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
}