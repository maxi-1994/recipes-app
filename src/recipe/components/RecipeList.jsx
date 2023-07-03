import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';

import { RecipeContext } from '../context/RecipeContext';
import { useModal } from '../../hooks/useModal';
import { ModalForm } from './ModalForm';
import { RecipeItem } from './RecipeItem';

export const RecipeList = () => {
    // TODO -> Agregar un test

    const { show, handleClose, handleShow } = useModal();
    const { recipeList, loading, addNewRecipe, deleteRecipe } = useContext(RecipeContext);
    const loadingSpinner = loading && (<lottie-player id='loading-spinner' src="https://assets8.lottiefiles.com/packages/lf20_d2yblndy.json" loop autoplay />);

    return (
        <>
            <ToastContainer />

            <div id="recipe-list-wrapper">
                <div className="title-wrapper">
                    <div className="container d-flex justify-content-between align-items-center">
                        <h4 className="m-0">Listado de recetas</h4>
                        <Button variant="primary" onClick={ handleShow }>Agregar Receta</Button>
                    </div>
                </div>

                { loadingSpinner }

                <div className="container">
                {
                    (recipeList.length === 0 && !loading) ?
                        (
                            <div className="alert alert-warning mt-3" role="alert">
                                No hay recetas cargadas. . .
                            </div>
                        ) :
                        (
                            <div className="row row-cols-1 row-cols-md-3 g-4 cards-wrapper">
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
                        )
                }
                </div>

                <ModalForm 
                    modalState={ show } 
                    onCloseModal={ (e) => handleClose(e) } 
                    onFormState={ (e) => addNewRecipe(e) } 
                />
            </div>

        </>
    )
}
