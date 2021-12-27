import { useEffect, useState } from 'react';
import Axios from 'axios';

import { Box, Button, Table, TableBody, TableCell, TableHeader, TableRow, Text, TextInput } from 'grommet';
import { Trash } from 'grommet-icons';

export default function IngredientsManager(props) {
    const [allIngredients, setAllIngredients] = useState();
    const [ingredients, setIngredients] = useState([]);
    
    useEffect(() => {
        // Load existing ingredients
        let api = process.env.REACT_APP_BACKEND + "getIngredients";
        Axios.get(api).then((data) => {
            // Add all ingredients names to an array
            let ing = [];
            for(let i = 0; i < data.data.length; i++) {
                ing.push(data.data[i].name);
            }

            // Save ingredient names as state
            setAllIngredients(ing);
        });
    }, []);

    function addItem(name) {

    }

    function blankItem() {
        // Add blank item to list 
        let ing = [...ingredients];
        ing.push("");
        setIngredients(ing);
    }

    function remove(name) {
        props.removeIngredient(name);
    }

    return (
        <Box>
            <Table align="center">
                <TableHeader align="center">
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
                </TableHeader>
                <TableBody>
                    {ingredients.map((val) => {
                        return(
                            <TableRow key={val}>
                                <TableCell scope="row" border="bottom" key={`${val}:A`}>
                                    <TextInput value={val} disabled={val.length > 0} />
                                </TableCell>
                                <TableCell scope="row" border="bottom" key={`${val}:B`}>
                                    <TextInput value={val} disabled={val.length > 0} />
                                </TableCell>
                                <TableCell scope="row" border="bottom" key={`${val}:C`}>
                                    <TextInput value={val} disabled={val.length > 0} />
                                </TableCell>
                                <TableCell scope="row" border="bottom" key={`${val}:D`}>
                                    <Button 
                                        icon={<Trash />} 
                                        onClick={() => remove(val)} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    <TableRow key="empty">
                        <TableCell scope="row" border="bottom" key="empty:A">
                            <TextInput />
                        </TableCell>
                        <TableCell scope="row" border="bottom" key="empty:B">
                            <TextInput />
                        </TableCell>
                        <TableCell scope="row" border="bottom" key="empty:C">
                            <TextInput />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Button 
                primary 
                color="main" 
                label="Add Ingredient"
                onClick={() => blankItem()}
            />
        </Box>
    );
}