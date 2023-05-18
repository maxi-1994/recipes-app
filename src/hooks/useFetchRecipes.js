import { useEffect, useState } from "react";

import { fetchRecipes } from '../helpers/fetchRecipes';

export const useFetchRecipes = (userToken) => {

    const [ recipeList, setRecipeList ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const getRecipeList = async () => {
        const recipeList = await fetchRecipes(userToken);
        setRecipeList(recipeList);
        setLoading(false);
    }

    useEffect(() => {
        getRecipeList();
    }, []);

    return {
        recipeList,
        loading,
    }
}