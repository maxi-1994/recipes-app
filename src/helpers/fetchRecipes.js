export const fetchRecipes = async (userToken) => {
    const url = `https://backend-recipes-bootcamps-tribe-production.up.railway.app/api/recipes/get?auth=${userToken}`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const res = await fetch(url, requestOptions);

    const data = await res.json();

    return data;
}