import StepTable from "./StepTable";

import { Box } from 'grommet';

export default function IngredientsManager(props) {
    /** Verifies inputs before adding to full list of ingredients
     * 
     * @returns true if successful, false if not
     */
    function addIngredient(vals) {
        let ingredient = {
            name: "",
            amount: "",
            style: "",
            optional: false
        };
        
        // Check a name was provided
        if(vals[0].length < 1) {
            alert("You must provide a name");
            return false;
        }
        // Check ingredient doesn't already exist and save the name
        if(getIngredientIndex(vals[0]) >= 0) {
            alert("Item already exists");
            return false;
        }

        ingredient.name = vals[0];
        ingredient.amount = vals[1];
        ingredient.style = vals[2];
        ingredient.optional = vals["optional"];

        // Add new ingredient to full list
        let newIngredients = [...props.ingredients, ingredient];
        // Update list in higher level element
        props.setIngredients(newIngredients);

        return true;
    }

    function removeIngredient(item) {
        // Find index of deleted item
        let index = getIngredientIndex(item[0]);

        // Check item exists
        if(index < 0) {
            alert("Item does not exist");
            return false;
        }

        // Update ingredients list
        let newArr = [...props.ingredients];
        newArr.splice(index, 1);
        props.setIngredients(newArr);

        return true;
    }

    /** Gets index of named ingredient
     * @returns the index of the ingredient, -1 if not in list
     */
    function getIngredientIndex(name) {
        for(let i = 0; i < props.ingredients.length; i++) {
            if(props.ingredients[i].name === name) {
                return i;
            }
        }

        return -1;
    }

    return(
        <Box width="95%">
            <StepTable
                numCols={3}
                headers={[
                    "Name",
                    "Amount",
                    "Style"
                ]}
                addItemExternally={addIngredient}
                removeItemExternally={removeIngredient}
            />
        </Box>
    );
}