import * as urls from '../helpers/constants/endpoints';


export const fetchDeleteRecipe = async (recipeId, userTokem) => {
    const url = `${urls.BaseUrls}recipes/delete/${recipeId}?auth=${userTokem}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }


    try {

        const res = await fetch(url, requestOptions);
        const data = await res.json();
    
        return data;

    } catch(error) {
        console.error(`ERROR: ${error}`);
        return error;
    }
}