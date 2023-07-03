import * as urls from '../helpers/constants/endpoints';


export const fetchAuth = async (requestBody, endpoint) => {

    const url = `${urls.BaseUrls}auth/${endpoint}`;
        
    const requestOptions = {
        method: 'POST',
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