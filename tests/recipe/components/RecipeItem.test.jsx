/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import { RecipeItem } from '../../../src/recipe/components/RecipeItem';


describe('Pruebas en <RecipeItem />', () => {

    const recipe = {
        _id: '1',
        imagePath: 'https://www.gourmet.cl/wp-content/uploads/2022/05/Pollo-al-Horno-Web-570x458.jpg',
        name: 'pollo',
        description: 'receta pollo',
    }

    test('debe hacer match con el snapshot', () => {
        const { container } = render(<RecipeItem recipeItems={ recipe } onDeleteRecipe={() => {}} />);
        expect( container ).toMatchSnapshot();
    });
    
});