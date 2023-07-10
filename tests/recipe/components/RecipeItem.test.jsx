/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import { RecipeItem } from '../../../src/recipe/components/RecipeItem';


const mockedUseContext = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => mockedUseContext
}));

describe('Test in <RecipeItem />', () => {

    const mockRecipe = {
        _id: '123',
        imagePath: 'https://www.gourmet.cl/wp-content/uploads/2022/05/Pollo-al-Horno-Web-570x458.jpg',
        name: 'pollo',
        description: 'receta pollo',
    };

    test('Should match with the snapshot', () => {
        const { container } = render(<RecipeItem recipeItems={ mockRecipe } onDeleteRecipe={ () => {} } />);

        expect(container).toMatchSnapshot();
    });

    test('Should show the recipe image, title and description in the component', () => {
        render(<RecipeItem recipeItems={ mockRecipe } onDeleteRecipe={ () => {} } />);

        expect(screen.getByAltText(mockRecipe.name)).toBeTruthy();
        expect(screen.getByText(mockRecipe.name)).toBeTruthy();
        expect(screen.getByText(mockRecipe.description)).toBeTruthy();
    });

    // TODO -> Se rompe cuando esta el <Link> en el componente
    // test('Should redirect to the URL when the link is click it', () => {
    //     const { getByText } = render(<RecipeItem recipeItems={ mockRecipe } onDeleteRecipe={ () => {} } />);

    //     const link = getByText('Detalles');
    //     fireEvent.click(link);
    // });

    test('Should call onDeleteRecipe function when click the delete button', () => {
        const onDeleteMockRecipe = jest.fn();

        const { getByText } = render(<RecipeItem recipeItems={ mockRecipe } onDeleteRecipe={ onDeleteMockRecipe } />);

        const deleteButton = getByText('Eliminar');
        fireEvent.click(deleteButton);
    
        expect(onDeleteMockRecipe).toHaveBeenCalledTimes(1);
        expect(onDeleteMockRecipe).toHaveBeenCalledWith('123');
    })
    
});