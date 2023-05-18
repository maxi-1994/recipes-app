/*
    Method:     POST 
    Url:        https://backend-recipes-bootcamps-tribe-production.up.railway.app/api/recipes/add?auth={{token}}
    Cabeceras:  Content-Type: application/json

    body
    { 
        "name": "Empanadas", 
        "description": "Empanadas de carne", 
        "ingredients": [], 
        "imagePath": "https://storage.googleapis.com/avena-recipes/agtzfmF2ZW5hLWJvdHIZCxIMSW50ZXJjb21Vc2VyGICAgMW2rJ8LDA/22-04-2020/1587597532219.jpeg" 
    }

    respuesta esperada
    { "msg": "Store recipe ok" }

    Respuestas de errores
    errors: -> array
    "msg": "The recipe name is required",
    The recipe description is required",
    "The description of the recipe must have at least one letter",
    "The recipe image path is required",
*/


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