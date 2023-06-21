import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

import { fetchGetRecipes } from '../helpers/fetchGetRecipes';
import { fetchAddRecipe } from "../helpers/fetchAddRecipe";
import { fetchDeleteRecipe } from "../helpers/fetchDeleteRecipe";
import { fetchEditRecipe } from "../helpers/fetchEditRecipe";

import { toastMesseges } from '../helpers/constants';


export const useFetchRecipes = (userToken) => {

    // TODO: el getRecipeList es un async/await y los demás no.

    const [ recipeList, setRecipeList ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const getRecipeList = async () => {
        const list = await fetchGetRecipes(userToken);
        setRecipeList(list);
        localStorage.setItem('recipeList', JSON.stringify(list));
        setLoading(false);

        // En vez de generar un reducer, directamente guardo la lista de recetas en localStorage. Cuando estoy en detalles obtengo el id de la url y busco la receta que matchea con id.
        // busco que coincidan los id dentro de la lista guardada en localStorage

        // No me pareció crear un reducer ya que el "recipeList" del useState se va actualizando cada vez que llamo a la API (en el addNewRecipe, editRecipe y deleteRecipe).
        // Si hago el reducer seria redundante estar actualizando el estado si ya me viene actualizado del servicio?
    }

    const addNewRecipe = (requestBody) => {
        fetchAddRecipe(requestBody, userToken)
            .then(res => {
                if(res.msg) {
                    getRecipeList();
                    toast(toastMesseges.newRecipeMsg.title, toastMesseges.newRecipeMsg.toastConfig);
                } else {
                    console.log(res.errors);
                }
            });
    }

    const editRecipe = (requestBody) => {        
        fetchEditRecipe(requestBody, userToken)
            .then(() => {
                getRecipeList();
                toast(toastMesseges.editRecipeMsg.title, toastMesseges.editRecipeMsg.toastConfig);
            });
    }

    const deleteRecipe = (recipeId) => {
        fetchDeleteRecipe(recipeId, userToken)
            .then(() => {
                const recipeDeleted = recipeList.filter(recipe => recipe._id !== recipeId);
                setRecipeList([...recipeDeleted]);
                localStorage.setItem('recipeList', JSON.stringify(recipeDeleted));
                toast(toastMesseges.deleteRecipeMsg.title, toastMesseges.deleteRecipeMsg.toastConfig);
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