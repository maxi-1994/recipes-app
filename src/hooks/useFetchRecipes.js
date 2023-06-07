import { useEffect, useState } from "react";

import { fetchGetRecipes } from '../helpers/fetchGetRecipes';
import { fetchAddRecipe } from "../helpers/fetchAddRecipe";
import { fetchDeleteRecipe } from "../helpers/fetchDeleteRecipe";
import { fetchEditRecipe } from "../helpers/fetchEditRecipe";


export const useFetchRecipes = (userToken) => {

    const [ recipeList, setRecipeList ] = useState([]);

    // const [ loading, setLoading ] = useState(true);
    // Generar un useState que maneje la respuesta del servicio para usarla fuera del hook

    const getRecipeList = async () => {
        const list = await fetchGetRecipes(userToken);
        setRecipeList(list);
        localStorage.setItem('recipeList', JSON.stringify(list));

        // En vez de generar un reducer, directamente guardo la lista de recetas en localStorage. De esta manera en la url de "detalle" donde saco el id de la url.
        // busco que coincidan los id dentro de la lista guardada en localStorage

        // No me pareció crear un reducer ya que el "recipeList" del useState se va actualizando cada vez que llamo a la API (en el addNewRecipe, editRecipe y deleteRecipe).
        // Si hago el reducer seria redundante estar actualizando el estado si ya me viene actualizado del servicio?
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
        // Method: PUT 
        // Url: https://backend-recipes-bootcamps-tribe-production.up.railway.app/api/recipes/edit/{{_id }}?auth={{token}}
        // Cabeceras: Content-Type: application/json
        
        fetchEditRecipe(requestBody, userToken)
            .then(res => {
                console.log(res);
                getRecipeList();
                // setState para menejar las resp del servico
            });

        // setState para menejar las resp del servico
    }

    const deleteRecipe = (recipeId) => {
        fetchDeleteRecipe(recipeId, userToken)
            .then(res => {
                console.log(res);
                const recipeDeleted = recipeList.filter(recipe => recipe._id !== recipeId);
                setRecipeList([...recipeDeleted]);
                localStorage.setItem('recipeList', JSON.stringify(recipeDeleted));
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