

export const fetchEditRecipe = async (requestBody, userToken) => {

    const url = `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/edit/${ requestBody._id }?auth=${ userToken }`;

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
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