import { useEffect, useState } from "react";

import { fetchGetRecipes } from '../helpers/fetchGetRecipes';
import { fetchAddRecipe } from "../helpers/fetchAddRecipe";
import { fetchDeleteRecipe } from "../helpers/fetchDeleteRecipe";


export const useFetchRecipes = (userToken) => {

    const [ recipeList, setRecipeList ] = useState([]);

    // const [ loading, setLoading ] = useState(true);
    // Generar un useState que maneje la respuesta del servicio para usarla fuera del hook

    const getRecipeList = async () => {
        const list = await fetchGetRecipes(userToken);
        setRecipeList(list);
    }

    const addNewRecipe = (requestBody) => {
        fetchAddRecipe(requestBody, userToken)
            .then(res => {
                console.log(res);
                getRecipeList();
                // setState para menejar las resp del servico
            });
    }

    const editRecipe = (requestBody) => {
        console.log(requestBody);
        // setState para menejar las resp del servico
    }

    const deleteRecipe = (recipeId) => {
        fetchDeleteRecipe(recipeId, userToken)
            .then(res => {
                console.log(res);
                const recipeDeleted = recipeList.filter(recipe => recipe._id !== recipeId);
                setRecipeList([...recipeDeleted]);
                // setState para menejar las resp del servico
            })
    }

    useEffect(() => {
        getRecipeList();
    }, []);

    return {
        recipeList,
        addNewRecipe,
        editRecipe,
        deleteRecipe,
    }
}