import { useContext } from 'react';

import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../auth/context/AuthContext';
import { useFetchRecipes } from '../../hooks/useFetchRecipes';
import { useModal } from '../../hooks/useModal';
import { RecipeItem } from './RecipeItem';
import { ModalForm } from './ModalForm';


export const RecipeList = () => {

    const { authState } = useContext(AuthContext)
    const { user } = authState;

    const { recipeList, addNewRecipe, deleteRecipe } = useFetchRecipes(user.idToken);

    const { show, handleClose, handleShow } = useModal();

    return (
        <>
            <h2>Listado de recetas</h2>
            <Button variant="primary" onClick={ handleShow }>Agregar Receta</Button>
            <hr />

            <div id="cards-wrapper" className="row row-cols-1 row-cols-md-3 g-4">
                {
                    recipeList.map((recipe) => (
                        <RecipeItem 
                            key={ recipe._id } 
                            recipeItems={ recipe } 
                            onDeleteRecipe={ (e) => deleteRecipe(e) } 
                        />
                    ))
                }
            </div>

            <ModalForm 
                modalState={ show } 
                onCloseModal={ (e) => handleClose(e) } 
                onFormState={ (e) => addNewRecipe(e) } 
            />
        </>
    )
}
