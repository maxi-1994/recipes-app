import { useContext } from 'react';
import Button from 'react-bootstrap/Button';

import { RecipeContext } from '../context/RecipeContext';

import { useModal } from '../../hooks/useModal';
import { ModalForm } from './ModalForm';
import { RecipeItem } from './RecipeItem';


export const RecipeList = () => {

    // TODO -> Agregar Loading antes de uqe lleguen las recetas

    const { show, handleClose, handleShow } = useModal();

    const { recipeList, addNewRecipe, deleteRecipe } = useContext(RecipeContext);

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
