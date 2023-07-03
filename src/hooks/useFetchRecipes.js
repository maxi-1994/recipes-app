import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

import { fetchGetRecipes } from '../helpers/fetchGetRecipes';
import { fetchAddRecipe } from "../helpers/fetchAddRecipe";
import { fetchDeleteRecipe } from "../helpers/fetchDeleteRecipe";
import { fetchEditRecipe } from "../helpers/fetchEditRecipe";

import { toastMesseges } from '../helpers/constants/toast-messages';


export const useFetchRecipes = (userToken) => {

    // TODO: el getRecipeList es un async/await y los demás no.

    const [ recipeList, setRecipeList ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const getRecipeList = async () => {
        const list = await fetchGetRecipes(userToken);
        
        if (list === 'Invalid token') {
            // TODO -> hacer un logout
            console.log('Invalid token');
        }

        setRecipeList(list);
        localStorage.setItem('recipeList', JSON.stringify(list));
        setLoading(false);
    }

    const addNewRecipe = (requestBody) => {
        fetchAddRecipe(requestBody, userToken)
            .then(res => {
                if(res.msg) {
                    getRecipeList();
                    toast.success(toastMesseges.newRecipeMsg.title, toastMesseges.newRecipeMsg.toastConfig);
                } else {
                    console.log(res.errors);
                }
            });
    }

    const editRecipe = (requestBody) => {
        setLoading(true);      
        fetchEditRecipe(requestBody, userToken)
            .then(() => {
                getRecipeList();
                toast.info(toastMesseges.editRecipeMsg.title, toastMesseges.editRecipeMsg.toastConfig);
                setLoading(false);
            });
    }

    const deleteRecipe = (recipeId) => {
        fetchDeleteRecipe(recipeId, userToken)
            .then(() => {
                const recipeDeleted = recipeList.filter(recipe => recipe._id !== recipeId);
                setRecipeList([...recipeDeleted]);
                localStorage.setItem('recipeList', JSON.stringify(recipeDeleted));
                toast.error(toastMesseges.deleteRecipeMsg.title, toastMesseges.deleteRecipeMsg.toastConfig);
            })
    }

    useEffect(() => {
        getRecipeList();
    }, []);

    return {
        recipeList,
        loading,
        addNewRecipe,
        editRecipe,
        deleteRecipe,
    }
}