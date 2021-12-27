import { useEffect, useState } from 'react';

import Axios from 'axios';

import { Box, Button, Table, TableBody, TableCell, TableHeader, TableRow, Text, TextInput } from 'grommet';
import { Trash } from 'grommet-icons';

import AppBar from '../../components/AppBar';
import IngredientsManager from './components/IngredientsManager';

export default function Create() {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredientName, setNewIngredientName] = useState("");
    const [newIngredientAmount, setNewIngredientAmount] = useState("");
    const [newIngredientPrep, setNewIngredientPrep] = useState("");

    useEffect(() => {
        let api = process.env.REACT_APP_BACKEND + "auth/authenticated";
        Axios.get(api, { withCredentials: true }).then((data) => {
            if(!data.data) {
                window.location = '/login';
            }
        });
    } ,[]);

    function addIngredient() {
        // Copy data from ingredients array
        let newIngredients = [...ingredients];

        // Check if ingredient already exists
        if(getIngredientIndex(newIngredientName) < 0) {
            // Create a new ingredient object and add it to the new array
            let ingredient = {
                name: newIngredientName,
                amount: newIngredientAmount,
                preparation: newIngredientPrep
            }

            // Add ingredient to list
            newIngredients.push(ingredient);

            // Save new data
            setIngredients(newIngredients);
        } else {
            alert(newIngredientName + " already exists");
        }
    
        // Reset new Ingredient values
        setNewIngredientName("");
        setNewIngredientAmount("");
        setNewIngredientPrep("");
    }

    function getIngredientIndex(name) {
        let index = -1;
        
        for(let i = 0; i < ingredients.length; i++) {
            if(ingredients[i].name === name) {
                return i;
            }
        }

        return index;
    }

    const removeIngredient = (name) => {
        // Edge case
        if(ingredients.length === 1) {
            setIngredients([]);
            return;
        }

        let newIngredients = [...ingredients];

        // Search through objects
        let index = getIngredientIndex(name);

        // Check if there are actually items to remove
        if(index < 0) {
            return;
        }

        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    }

    function send() {
        console.log("Sent data");
    }

    return(
        <Box align="center" fill responsive>
            <AppBar authenticated={true} />

            <Box pad="medium">
                <h1>New Recipe</h1>
            </Box>

            <Box align="center">
                <Box full direction="row" align="center">
                    <Box align="end" pad="small">
                        <Text>Recipe Name: </Text>
                    </Box>
                    <Box align="start" pad="small">
                        <TextInput name="name" placeholder="Sample recipe name" />
                    </Box>
                </Box>
                <Box full direction="row" align="center">
                    <Box align="end" pad="small">
                        <Text>Recipe Description: </Text>
                    </Box>
                    <Box align="start" pad="small">
                        <TextInput name="description" placeholder="Sample description" />
                    </Box>
                </Box>
                <Box full align="center">
                    <Table align="center">
                        <TableHeader align="center">
                            <TableRow key="headers">
                                <TableCell scope="col" border="bottom" key="name">
                                    <Text weight="bold">Ingredient*</Text>
                                </TableCell>
                                <TableCell scope="col" border="bottom" key="amount">
                                    <Text weight="bold">Amount</Text>
                                </TableCell>
                                <TableCell scope="col" border="bottom" key="prep">
                                    <Text weight="bold">Preparation</Text>
                                </TableCell>
                                <TableCell scope="col" border="bottom" key="del">
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ingredients.map((val) => {
                                return(
                                    <TableRow key={val.name}>
                                        <TableCell scope="row" border="bottom" key={`${val}:A`}>
                                            <TextInput value={val.name} disabled={true} />
                                        </TableCell>
                                        <TableCell scope="row" border="bottom" key={`${val}:B`}>
                                            <TextInput value={val.amount} disabled={true} />
                                        </TableCell>
                                        <TableCell scope="row" border="bottom" key={`${val}:C`}>
                                            <TextInput value={val.preparation} disabled={true} />
                                        </TableCell>
                                        <TableCell scope="row" border="bottom" key={`${val}:D`}>
                                            <Button 
                                                icon={<Trash />} 
                                                onClick={() => removeIngredient(val.name)} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            <TableRow key="empty">
                                <TableCell scope="row" border="bottom" key="empty:A">
                                    <TextInput
                                        value={newIngredientName}
                                        onChange={event => setNewIngredientName(event.target.value)}
                                    />
                                </TableCell>
                                <TableCell scope="row" border="bottom" key="empty:B">
                                    <TextInput
                                        value={newIngredientAmount}
                                        onChange={event => setNewIngredientAmount(event.target.value)}
                                    />
                                </TableCell>
                                <TableCell scope="row" border="bottom" key="empty:C">
                                    <TextInput
                                        value={newIngredientPrep}
                                        onChange={event => setNewIngredientPrep(event.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Button 
                        primary 
                        color="main" 
                        label="Add Ingredient"
                        onClick={() => addIngredient()}
                    />
                </Box>
            </Box>
            
        </Box>
    );
}