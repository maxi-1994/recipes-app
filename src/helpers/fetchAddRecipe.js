export const fetchAddRecipe = async (requestBody, userToken) =>{
    const url = `https://backend-recipes-bootcamps-tribe-production.up.railway.app/api/recipes/add?auth=${userToken}`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    }

    try {

    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;

    } catch(error) {
        console.error(`ERROR: ${error}`);
    }
}