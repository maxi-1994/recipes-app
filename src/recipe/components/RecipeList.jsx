import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';

import { RecipeContext } from '../context/RecipeContext';
import { useModal } from '../../hooks/useModal';
import { ModalForm } from './ModalForm';
import { RecipeItem } from './RecipeItem';

export const RecipeList = () => {
    
    // TODO -> Fixear spinner loading

    const { show, handleClose, handleShow } = useModal();

    const { recipeList, loading, addNewRecipe, deleteRecipe } = useContext(RecipeContext);

    return (
        <>
            <ToastContainer />

            <h2>Listado de recetas</h2>
            <Button variant="primary" onClick={ handleShow }>Agregar Receta</Button>
            <hr />

            {
                loading && (
                    <div>Cargando. . .</div>
                    // <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_d2yblndy.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop controls autoplay></lottie-player>
                )
            }

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
