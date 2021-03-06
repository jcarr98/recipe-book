import React, { useEffect, useState } from 'react';

import { Box, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet';

import Axios from 'axios';

import Loading from '../../../components/Loading';

function IngredientsList(props) {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load ingredients
    useEffect(() => {
        // Load ingredients
        Axios.get(`${process.env.REACT_APP_BACKEND}/getIngredients/${props.id}`).then((data) => {
            let items = [];

            for(let i = 0; i < data.data.length; i++) {
                let item = {
                    uid: data.data[i].id,
                    name: data.data[i].name,
                    amount: data.data[i].amount,
                    style: data.data[i].style,
                    optional: data.data[i].optional
                };

                items.push(item);
            }

            setIngredients(items);
            setLoading(false);
        });
    }, [props.id]);

    return(
        <Box align="center" pad="medium">
            {/* Show spinner if loading, show table otherwise */}
            {loading ? <Loading text="Loading ingredients..." /> : (
                <Table>
                    {/* Headers for table */}
                    <TableHeader>
                        <TableRow>
                            <TableCell scope="col" border="bottom" key="Ingredient">
                                <Text color="main" weight="bold">Ingredient</Text>
                            </TableCell>
                            <TableCell scope="col" border="bottom" key="Amount">
                                <Text color="main" weight="bold">Amount</Text>
                            </TableCell>
                            <TableCell scope="col" border="bottom" key="Preparation">
                                <Text color="main" weight="bold">Preparation</Text>
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Maps ingredients to table */}
                        {ingredients.map((val,key) => {
                            return(
                                <TableRow key={val.uid}>
                                    <TableCell scope="row" border="bottom" key={`${key}:A`}>
                                        <Text>{val.name}</Text>
                                        <Text> {val.optional ? "(optional)" : ''}</Text>
                                    </TableCell>
                                    <TableCell scope="row" border="left right" key={`${key}:B`}>
                                        <Text>{val.amount}</Text>
                                    </TableCell>
                                    <TableCell scope="row" border="bottom" key={`${key}:C`}>
                                        <Text>{val.style}</Text>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </Box>
    )
}

export default IngredientsList;