import { useContext } from 'react';

import { AuthContext } from '../../auth/context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { fetchAddRecipe } from '../../helpers/fetchAddRecipe';

export const AddRecipePage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const { formState, onInputValueChange, onResetForm } = useForm({
        name: '',
        description: '',
        ingredients: [],
        imagePath: '',
    });

    const onSubmitRecipeForm = (event) => {
        event.preventDefault();
    
        /*
            - manejar errores form / validacion form
            - agregar ingredientes
            - agregar estilos
        */

        fetchAddRecipe(formState, user.idToken)
            .then(res => console.log(res));

        onResetForm();
    }

    return (
        <>
            <h4>Agregar Receta</h4>

            <form className="add-recipe-form" onSubmit={ onSubmitRecipeForm }>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Nombre de la receta"
                        value={ formState.name }
                        onChange={ onInputValueChange }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="description" 
                        placeholder="Descripción de la receta" 
                        value={ formState.description }
                        onChange={ onInputValueChange }
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="ingredients">Ingredientes</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="ingredients" 
                        placeholder="Ingredientes"
                        value={ formState.ingredients }
                        onChange={ onInputValueChange }
                    />
                </div> */}
                <div className="form-group">
                    <label htmlFor="imagePath">Ruta de la imagen</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="imagePath" 
                        placeholder="Ruta de la imagen"
                        value={ formState.imagePath }
                        onChange={ onInputValueChange }
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </>
    )
}