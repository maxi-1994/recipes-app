import * as urls from '../helpers/constants/endpoints';


export const fetchGetRecipes = async (userToken) => {
    const url = `${urls.BaseUrls}recipes/get?auth=${userToken}`;
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