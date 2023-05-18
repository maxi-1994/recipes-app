
export const fetchDeleteRecipe = async (recipeId, userTokem) => {
    const url = `https://backend-recipes-bootcamps-tribe-production.up.railway.app/api/recipes/delete/${recipeId}?auth=${userTokem}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
}