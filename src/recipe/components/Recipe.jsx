import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../../auth/context/AuthContext';
import { RecipeContext } from '../context/RecipeContext';
import { useForm } from '../../hooks/useForm';
import { useIngredients } from '../../hooks/useIngredients';
import { IngredientsList } from './IngredientsList';


export const Recipe = () => {
    const { authState } = useContext(AuthContext);
    const { editRecipe, loading } = useContext(RecipeContext);
    const { user } = authState;

    const loadingSpinner = loading && (<lottie-player id='loading-spinner' src="https://assets8.lottiefiles.com/packages/lf20_d2yblndy.json" loop autoplay />);


    const { recipeId } = useParams();
    const recipeListStorage = JSON.parse(localStorage.getItem('recipeList'));
    const recipeSelected = recipeListStorage.find(item => item._id === recipeId);
    const ingredientsFromRecipe = recipeSelected.ingredients.map(item => { return {name: item.name} });

    const { formState, onInputValueChange, onResetForm } = useForm({
        name: recipeSelected.name,
        description: recipeSelected.description,
        imagePath: recipeSelected.imagePath,
        ingredient: '',
    });

    const { ingredients, addIngredient, deleteIngredient } = useIngredients(ingredientsFromRecipe);

    const [ showEditForm, setShowEditForm ] = useState(false);

    const navigate = useNavigate();
    const onBack = () => navigate('/', { replace: false });

    const onShowEditForm = () => {
        showEditForm ? setShowEditForm(false) : setShowEditForm(true);
        onResetForm();
    }

    const onAddIngredient = ({ _reactName, target, code }) => {
        if (code === 'Enter' && target.value.length > 0) {
            addIngredient(target.value);
            formState.ingredient = '';
        } else if (_reactName === 'onClick') {
            addIngredient(formState.ingredient);
            formState.ingredient = '';
        }
    }

    const onSubmitEditForm = (e) => {
        e.preventDefault();

        const formBody = {
            _id: recipeId,
            description: formState.description,
            imagePath: formState.imagePath,
            ingredients: ingredients,
            name: formState.name,
            userEmail: user.email,
        };
        
        editRecipe(formBody);
        onResetForm();
        setShowEditForm(false);
    }
    
    return (
        <>
            <ToastContainer />
            
            <div id="recipe">
                <div className="buttons-wrapper">
                    <div className="container d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={ onBack }>
                            <i className="bi bi-arrow-left-square"></i> Volver
                        </button>

                        <button type="button" className="btn btn-primary" onClick={ onShowEditForm }>
                            <i className="bi bi-pencil-square"></i> { showEditForm ? 'Deshacer' : 'Editar' }
                        </button>
                    </div>
                </div>

                <div className="container">
                {
                    loading ?
                    loadingSpinner :
                    <form>
                        <div className="recipe-wrapper">
                            <div className="recipe-img-wrapper text-center">
                                <img src={ recipeSelected.imagePath } alt={ recipeSelected.name } style={{ display: showEditForm ? 'none' : 'block' }} />
                                <input 
                                    type="text" 
                                    id="imagePath"
                                    name="imagePath"
                                    className="form-control" 
                                    style={{ display: showEditForm ? 'block' : 'none' }}
                                    placeholder="Ingrese URL de la imagen"
                                    value={ formState.imagePath }
                                    onChange={ onInputValueChange }
                                />
                            </div>
                            <div className="recipe-details">
                                <h3 style={{ display: showEditForm ? 'none' : 'block' }}>{ recipeSelected.name }</h3>
                                <input 
                                    type="text" 
                                    id="name"
                                    name="name"
                                    className="form-control" 
                                    style={{ display: showEditForm ? 'block' : 'none' }}
                                    placeholder="Nombre de la receta"
                                    value={ formState.name }
                                    onChange={ onInputValueChange }
                                />

                                <p style={{ display: showEditForm ? 'none' : 'block' }}>{ recipeSelected.description }</p>
                                <textarea 
                                    id="description"
                                    name="description"
                                    className="form-control mt-3"
                                    style={{ display: showEditForm ? 'block' : 'none' }}
                                    rows="18" 
                                    placeholder="Descripción"
                                    value={ formState.description }
                                    onChange={ onInputValueChange }
                                />
                            </div>
                        </div>

                        <div style={{ display: showEditForm ? 'block' : 'none' }}>
                            <div className="d-flex justify-content-between mt-3">
                                <input 
                                    type="text"
                                    id="ingredient"
                                    name="ingredient"
                                    className="form-control"
                                    placeholder="Ingrediente"
                                    value={ formState.ingredient }
                                    onChange={ onInputValueChange }
                                    onKeyUp={ onAddIngredient }
                                />
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={ onAddIngredient }
                                    disabled={ formState.ingredient === '' }
                                >
                                    Agregar
                                </button>
                            </div>
                            
                            {/* TODO: Usar un solo componente, ver de agregar una validacion en el "isEditable" */}
                            <IngredientsList ingredientsList={ ingredients } isEditable={ true } onDeleteingredient={ deleteIngredient } />
                        </div>

                        <div style={{ display: showEditForm ? 'none' : 'block' }}>
                            <IngredientsList ingredientsList={ ingredients } isEditable={ false } />
                        </div>

                        <div>
                            <button 
                                type="button"
                                className="btn btn-success" 
                                style={{ display: showEditForm ? 'block' : 'none' }} 
                                onClick={ onSubmitEditForm }
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                }
                </div>
            </div>
        </>
    )
}