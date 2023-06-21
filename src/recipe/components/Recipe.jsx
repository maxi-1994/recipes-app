import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../../auth/context/AuthContext';
import { RecipeContext } from '../context/RecipeContext';
import { useForm } from '../../hooks/useForm';
import { IngredientsList } from './IngredientsList';

import { toastMesseges } from '../../helpers/constants';


export const Recipe = () => {

    // TODO: Agregar loading antes de que actualice el componente luego de editarlo
    // TODO: Agregar styles a la lista de ingredientes + boton borrar

    const { authState } = useContext(AuthContext);
    const { editRecipe } = useContext(RecipeContext);
    const { user } = authState;

    const { recipeId } = useParams();
    const recipeListStorage = JSON.parse(localStorage.getItem('recipeList'));
    const recipeSelected = recipeListStorage.find(item => item._id === recipeId);

    const { formState, onInputValueChange, onResetForm } = useForm({
        name: recipeSelected.name,
        description: recipeSelected.description,
        ingredient: '',
    });

    const [ ingredients, setIngredients ] = useState([]);
    const [ showForm, setShowForm ] = useState(false);

    const navigate = useNavigate();
    
    const onBack = () => {
        navigate('/', {
            replace: false
        })
    };

    const onShowEditForm = () => {
        showForm ? setShowForm(false) : setShowForm(true);
        onResetForm();
        setIngredients(recipeSelected.ingredients);
    }

    const onAddIngredient = () => {
        const ingredientItem = { name: formState.ingredient.trim() };

        const ingredientExists = ingredients.find(item => item.name === ingredientItem.name);
        if (ingredientExists) {
            toast.error(toastMesseges.ingredientExists.title, toastMesseges.ingredientExists.toastConfig);
            return
        }

        const newIngredients = [ ...ingredients, ingredientItem ];
        setIngredients(newIngredients);
        formState.ingredient = '';
    }

    const onDeleteIngredient = (ingredientName) => {
        const ingredientDeleted = ingredients.filter(item => item.name !== ingredientName);
        setIngredients([ ...ingredientDeleted ]);
    }

    const onSubmitEditForm = (e) => {
        e.preventDefault();

        const formBody = {
            _id: recipeId,
            description: formState.description,
            imagePath: 'https://images.themodernproper.com/billowy-turkey/production/posts/2019/Beef-Empanadas-15.jpg?w=800&q=82&fm=jpg&fit=crop&dm=1607710512&s=9a4f102faa12d78c992ca464af2f7e3c',
            ingredients: ingredients,
            name: formState.name,
            userEmail: user.email,
        };
        
        editRecipe(formBody);
        onResetForm();
        setShowForm(false);
    }
    
    return (
        <>
            <ToastContainer />

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
                            <h3 style={{ display: showForm ? 'none' : 'block' }}>{ recipeSelected.name }</h3>
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                className="form-control" 
                                style={{ display: showForm ? 'block' : 'none' }}
                                placeholder="Nombre de la receta"
                                value={ formState.name }
                                onChange={ onInputValueChange }
                            />

                            <p style={{ display: showForm ? 'none' : 'block' }}>{ recipeSelected.description }</p>
                            <textarea 
                                id="description"
                                name="description"
                                className="form-control mt-3"
                                style={{ display: showForm ? 'block' : 'none' }}
                                rows="10" 
                                placeholder="Descripción"
                                value={ formState.description }
                                onChange={ onInputValueChange }
                            />
                        </div>
                    </div>

                    <div style={{ display: showForm ? 'block' : 'none' }}>
                        <div className="d-flex justify-content-between">
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

                        <IngredientsList ingredientsList={ ingredients } isEditable={ true } onDeleteingredient={ onDeleteIngredient } />

                    </div>

                   

                    <div style={{ display: showForm ? 'none' : 'block' }}>
                        <IngredientsList ingredientsList={ recipeSelected.ingredients } isEditable={ false } />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary" style={{ display: showForm ? 'block' : 'none' }}>
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}