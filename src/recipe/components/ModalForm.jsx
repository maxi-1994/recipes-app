import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useForm } from '../../hooks/useForm';


export const ModalForm = ({ modalState, onCloseModal, onFormState }) => {

    const { formState, onInputValueChange } = useForm({
        name: '',
        description: '',
        ingredients: [],
        imagePath: '',
    });

    const onSubmitModalForm = (e) => {
        e.preventDefault();
        onFormState(formState);
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
                    {/* <div className="form-group">
                        <label htmlFor="ingredients">Ingredientes</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="ingredients" 
                            placeholder="Ingredientes"
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
                    <Button type="submit" variant="primary">
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