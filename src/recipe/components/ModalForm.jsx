import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useForm } from '../../hooks/useForm';
import { useIngredients } from '../../hooks/useIngredients';

import { IngredientsList } from '../components/IngredientsList';


export const ModalForm = ({ modalState, onCloseModal, onFormState }) => {

    const { formState, onInputValueChange, onResetForm } = useForm({
        name: '',
        description: '',
        ingredients: '',
        imagePath: '',
    });
    
    const { ingredients, addIngredient, deleteIngredient } = useIngredients();

    const onAddIngredient = ({ _reactName, target, code }) => {
        if (code === 'Enter' && target.value.length > 0) {
            addIngredient(target.value);
            formState.ingredients = '';
        } else if (_reactName === 'onClick') {
            addIngredient(formState.ingredients);
            formState.ingredients = '';
        }
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
        onResetForm();
        onCloseModal(false);
    }

    return (
        <Modal id="add-modal" show={ modalState } onHide={ () => onCloseModal(false) }>
            <Modal.Header>
                <Modal.Title>Agregar nueva receta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="add-recipe-form">
                    <div className="form-group">
                        <label htmlFor="name">*nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name"
                            name="name" 
                            placeholder="Nombre de la receta"
                            value={ formState.name }
                            onChange={ onInputValueChange }
                        />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="description">*descripción</label>
                        <textarea 
                            type="text" 
                            className="form-control" 
                            id="description"
                            name="description" 
                            placeholder="Descripción de la receta"
                            rows="3"
                            value={ formState.description }
                            onChange={ onInputValueChange }
                        />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="imagePath">*imagen</label>
                        <input 
                            type="text" 
                            className="form-control"
                            id="imagePath"
                            name="imagePath" 
                            placeholder="Ruta de la imagen"
                            value={ formState.imagePath }
                            onChange={ onInputValueChange }
                        />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="ingredients">Ingredientes</label>
                        <div className="d-flex justify-content-between ">
                            <input 
                                type="text"
                                id="ingredients"
                                name="ingredients"
                                className="form-control"
                                placeholder="Ingredientes"
                                value={ formState.ingredients }
                                onChange={ onInputValueChange }
                                onKeyUp={ onAddIngredient }
                            />
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={ onAddIngredient }
                                disabled={ formState.ingredients === '' }
                            >
                                Agregar
                            </button>
                        </div>
                        <div>
                            <IngredientsList ingredientsList={ ingredients } isEditable={ true } onDeleteingredient={ deleteIngredient } />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <Button type="button" variant="primary" disabled={ invalidForm } onClick={ onSubmitModalForm }>
                            agregar receta
                        </Button>

                        <Button type="button" variant="seconday" onClick={ () => onCloseModal(false) }>
                            cancelar
                        </Button>
                    </div>
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