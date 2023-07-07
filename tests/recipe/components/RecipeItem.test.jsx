/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { RecipeItem } from '../../../src/recipe/components/RecipeItem';


const mockedUseContext = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => mockedUseContext
}));

describe('Pruebas en <RecipeItem />', () => {

    const recipe = {
        _id: '1',
        imagePath: 'https://www.gourmet.cl/wp-content/uploads/2022/05/Pollo-al-Horno-Web-570x458.jpg',
        name: 'pollo',
        description: 'receta pollo',
    };

    test('debe hacer match con el snapshot', () => {
        const { container } = render(<RecipeItem recipeItems={ recipe } onDeleteRecipe={() => {}} />);
        expect( container ).toMatchSnapshot();
    });
    
});