import PropTypes from 'prop-types';


export const IngredientsList = ({ ingredientsList, isEditable, onDeleteingredient }) => {

    return (
        <>
            {
                ingredientsList.length > 0 ?
                (
                    <div className="ingredients-wrapper">
                        <h5 className="mt-3">Lista de ingredientes:</h5>

                        <ul className="ingredients-list">
                        {
                            ingredientsList.map( ingredient => (
                                <div className="ingredient-card" key={ ingredient.name }> 
                                    <span>{ ingredient.name }</span>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        style={{ display: isEditable ? 'block' : 'none' }} 
                                        onClick={ () => onDeleteingredient(ingredient.name) }
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            ))
                        }
                        </ul>
                    </div>
                ) :
                (
                    <div className="alert alert-warning mt-3" role="alert">
                        Esta receta aún no tiene ingredientes cargados
                    </div>
                )
            }
        </>
    )
}

IngredientsList.propTypes = {
    ingredientsList: PropTypes.array.isRequired,
    isEditable: PropTypes.bool.isRequired,
    onDeleteingredient: PropTypes.func,
};