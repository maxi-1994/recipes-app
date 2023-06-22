import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { toastMesseges } from "../helpers/constants";


export const useIngredients = (i = []) => {
    const [ ingredients, setIngredients ] = useState(i);

    const addIngredient = (ingredient) => {
        const ingredientItem = { name: ingredient.trim() };

        const ingredientExists = ingredients.find(item => item.name === ingredientItem.name);
        if (ingredientExists) {
            toast.error(toastMesseges.ingredientExists.title, toastMesseges.ingredientExists.toastConfig);
            return;
        }

        const newIngredients = [ ...ingredients, ingredientItem ];
        setIngredients(newIngredients);
    }

    const deleteIngredient = (ingredientName) => {
        const ingredientDeleted = ingredients.filter(item => item.name !== ingredientName);
        setIngredients([ ...ingredientDeleted ]);
    }

    return {
        ingredients,
        addIngredient,
        deleteIngredient
    }
}