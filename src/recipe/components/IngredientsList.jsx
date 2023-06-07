import PropTypes from 'prop-types';


export const IngredientsList = ({ ingredientsList }) => {

    return (
        <>
            {
                ingredientsList.length > 0 ?
                (
                    <div className="ingredients-wrapper">
                        <h5>Ingredientes:</h5>

                        <ul className="ingredients-list">
                        {
                            ingredientsList.map( ingredient => (
                                <li key={ ingredient.name }>{ ingredient.name }</li>
                            ))
                        }
                        </ul>
                    </div>
                ) :
                (
                    <div className="alert alert-warning mt-3" role="alert">
                        Esta receta no tiene ingredientes cargados
                    </div>
                )
            }
        </>
    )
}

IngredientsList.propTypes = {
    ingredientsList: PropTypes.array.isRequired, 
};