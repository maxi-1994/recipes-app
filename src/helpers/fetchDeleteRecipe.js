
export const fetchDeleteRecipe = async (recipeId, userTokem) => {
    const url = `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/delete/${recipeId}?auth=${userTokem}`;
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