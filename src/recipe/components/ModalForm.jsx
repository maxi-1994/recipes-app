import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useForm } from '../../hooks/useForm';
import { useIngredients } from '../../hooks/useIngredients';

import { IngredientsList } from '../components/IngredientsList';


export const ModalForm = ({ modalState, onCloseModal, onFormState }) => {

    const { formState, onInputValueChange } = useForm({
        name: '',
        description: '',
        ingredients: '',
        imagePath: '',
    });
    
    const { ingredients, addIngredient, deleteIngredient } = useIngredients();

    const onAddIngredient = () => {
        addIngredient(formState.ingredients);
        formState.ingredients = '';
    }

    const invalidForm = formState.name === '' || 
                        formState.description === '' || 
                        formState.imagePath === '';

    const onSubmitModalForm = (e) => {
        e.preventDefault();

        const formBody = {
            name: formState.name,
            description: formState.description,
            ingredients: ingredients,
            imagePath: formState.imagePath,
        }

        onFormState(formBody);
        onCloseModal(false);
    }

    return (
        <Modal show={ modalState } onHide={ () => onCloseModal(false) }>
            <Modal.Header closeButton>
                <Modal.Title>Agregar nueva receta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="add-recipe-form" onSubmit={ onSubmitModalForm }>
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
                    <div className="d-flex justify-content-between">
                        <input 
                            type="text"
                            id="ingredients"
                            name="ingredients"
                            className="form-control"
                            placeholder="Ingredientes"
                            value={ formState.ingredients }
                            onChange={ onInputValueChange }
                        />
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={ onAddIngredient }
                            disabled={ formState.ingredients === '' }
                        >
                            Agregar ingrediente
                        </button>
                    </div>
                    <div>
                        <IngredientsList ingredientsList={ ingredients } isEditable={ true } onDeleteingredient={ deleteIngredient } />
                    </div>

                    <Button type="submit" variant="primary" disabled={ invalidForm }>
                        Agregar
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

ModalForm.propTypes = {
    modalState: PropTypes.bool.isRequired, 
    onCloseModal: PropTypes.func.isRequired, 
    onFormState: PropTypes.func.isRequired,
};