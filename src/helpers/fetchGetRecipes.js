export const fetchGetRecipes = async (userToken) => {
    const url = `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/get?auth=${userToken}`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {

        const res = await fetch(url, requestOptions);
        const data = await res.json();
    
        return data;

    } catch(error) {
        console.error(`ERROR: ${error}`);
        return error;
    } 

}