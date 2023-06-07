import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { AuthContext } from '../../auth/context/AuthContext';
import { RecipeContext } from '../context/RecipeContext';
import { useForm } from '../../hooks/useForm';
import { IngredientsList } from './IngredientsList';


export const Recipe = () => {

    {/*
        TODO:
        - Generar funcionalidad para mostrar u ocultar formulario de edit
        - agregar card a la lista de items con boton borrar
        - no mostrar el componentn "ingredientList" cuando se edita
        - generar el submit + generar la llamada por fetch en useFetchRecipes
        - Ver de generar un custom hook para la funcionalidad de ingredientes o para todo el edit
    */}

    const { editRecipe } = useContext(RecipeContext);

    const { formState, onInputValueChange, onResetForm } = useForm({
        name: '',
        description: '',
        ingredient: '',
    });
    const [ ingredients, setIngredients ] = useState([]);

    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const recipeListStorage = JSON.parse(localStorage.getItem('recipeList'));

    const { recipeId } = useParams();
    const recipeSelected = recipeListStorage.find(item => item._id === recipeId);

    const onBack = () => {
        navigate('/', {
            replace: false
        })
    };

    const onShowEditForm = () => {
        console.log('onShowEditForm');
        // Mostrar form para editar
    }

    const onAddIngredient = () => {
        const ingredientItem = { name: formState.ingredient.trim() };
        const newIngredient = [ ...ingredients, ingredientItem ];
        setIngredients(newIngredient);
        formState.ingredient = '';
    }

    // const onDeleteIngredient = () => {
    //     console.log('onDeleteIngredient');
    // }

    const onSubmitEditForm = (e) => {
        e.preventDefault();

        const formBody = {
            _id: recipeId,
            description: formState.description,
            imagePath: 'https://www.rionegro.com.ar/wp-content/uploads/2019/05/locro-criollo-abundante-D_NQ_NP_982225-MLA27393397210_052018-F.jpg',
            ingredients: ingredients,
            name: formState.name,
            userEmail: user.email,
        };
        
        editRecipe(formBody);
        onResetForm();
    }
    
    return (
        <>
            <div id="recipe">
                <div className="buttons-wrapper">
                    <button type="button" className="btn btn-secondary" onClick={ onBack }>
                        <i className="bi bi-arrow-left-square"></i> Volver
                    </button>

                    <button type="button" className="btn btn-primary" onClick={ onShowEditForm }>
                        <i className="bi bi-pencil-square"></i> Editar
                    </button>
                </div>
                <form onSubmit={ onSubmitEditForm }>
                    <div className="recipe-wrapper">
                        <div className="recipe-img-wrapper text-center">
                            <img className="img-thumbnail" src={ recipeSelected.imagePath } alt={ recipeSelected.name } />
                        </div>
                        <div className="recipe-details">
                            <h3>{ recipeSelected.name }</h3>
                                <input 
                                type="text" 
                                id="name"
                                name="name"
                                className="form-control" 
                                placeholder="Nombre de la receta"
                                value={ formState.name }
                                onChange={ onInputValueChange }
                            />

                            <p>{ recipeSelected.description }</p>
                            <textarea 
                                id="description"
                                name="description"
                                className="form-control" 
                                rows="3" 
                                placeholder="Descripción"
                                value={ formState.description }
                                onChange={ onInputValueChange }
                            />
                        </div>
                    </div>

                    <div className='d-flex justify-content-between'>
                        <input 
                            type="text"
                            id="ingredient"
                            name="ingredient"
                            className="form-control"
                            placeholder="Ingrediente"
                            value={ formState.ingredient }
                            onChange={ onInputValueChange }
                        />
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={ onAddIngredient }
                            disabled={ formState.ingredient === '' }
                        >
                            Agregar ingrediente
                        </button>
                    </div>
                    
                    {/* Generar cards para cada item con boton para eliminar -> onDeleteIngredient */}
                    <ul>
                        {
                            ingredients.map(item => (
                                <li key={item.name}>{item.name}</li>
                            ))
                        }
                    </ul>

                    {/* No mostrar en el editar, mostrar solo la lista que voy llenando, cuando se submitea le pega al servicio y actualiza el estado */}
                    <IngredientsList ingredientsList={ recipeSelected.ingredients } />

                    <div>
                        <button type="submit" className="btn btn-primary">Guardar cambios</button>
                    </div>
                </form>
            </div>
        </>
    )
}