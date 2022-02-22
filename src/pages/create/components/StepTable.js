import { useEffect, useState } from 'react';

import { Box, Button, Table, TableBody, TableCell, TableHeader, TableRow, Text, TextInput } from 'grommet';
import { Trash } from 'grommet-icons';

import propTypes from 'prop-types';

export default function StepTable(props) {
    // Full list of items
    const [items, setItems] = useState([]);
    // Values that haven't been saved yet
    const [values, setValues] = useState([]);

    useEffect(() => {
        let vals = [];
        for(let i = 0; i < props.numCols; i++) {
            vals.push("");
        }

        setValues(vals);
    }, [props.numCols]);

    function addItem() {
        // Create object
        let newItem = {};
        for(let i = 0; i < props.numCols; i++) {
            newItem[i] = values[i];
        }

        // Save items in higher level component
        if(!props.addItemExternally(newItem)) {
            return false;
        }

        // Save items in this component
        let newItems = [...items];
        newItems.push(newItem);
        setItems(newItems);

        // Clear inputs
        let newVals = [];
        for(let j = 0; j < values.length; j++) {
            newVals.push("");
        }
        setValues(newVals);
    }

    function removeItem(i) {
        // Remove item externally
        if(!props.removeItemExternally(items[i])) {
            console.log("failure");
            return false;
        }

        // Remove item interally
        let newArr = [...items];
        newArr.splice(i, 1);
        setItems(newArr);

    }

    function enterItem(event){
        let code = event.keyCode || event.which;

        // Check if enter key was pressed
        if(code === 13) {
            // Add ingredient to running list
            addItem();

            // Set focus to first input box on the next line
            // dirRef.current.focus();
        }
    }

    function createHistoryRow() {
        return items.map((row, i) => {
            return (
                <TableRow key={i}>
                    <TableCell scope="row" border="bottom" key={i}>
                        <Text>{i+1}</Text>
                    </TableCell>

                    {createHistoryCells(row)}

                    <TableCell scope="row" border="bottom" key={`${i}:Trash`}>
                        <Button 
                            icon={<Trash />} 
                            onClick={() => removeItem(i)} 
                        />
                    </TableCell>
                </TableRow>
            );
        });
    }

    function createHistoryCells(row) {
        return Object.keys(row).map((key, i) => {
            return(
                <TableCell scope="row" border="bottom" key={i}>
                    <TextInput value={row[key]} disabled />
                </TableCell>
            );
        });
    }

    function createInputRow() {
        return(
            <TableRow>
                <TableCell scope="row" border="bottom" key="num">
                    <Text>{items.length+1}</Text>
                </TableCell>
                {values.map((val, i) => {
                    return(
                        <TableCell scope="row" border="bottom" key={i}>
                            <TextInput 
                                value={val}
                                onChange={event => handleChange(event.target.value, i)}
                                onKeyPress={event => enterItem(event)}
                            />
                        </TableCell>
                    )
                })}
                <TableCell scope="row" border="bottom" key="del">
                    <Button icon={<Trash />} disabled />
                </TableCell>
            </TableRow>
        );
    }

    function handleChange(value, i) {
        let newVals = [...values];

        newVals[i] = value;

        setValues(newVals);
    }

    return(
        <Box fill align="center">
            <Table width="90%">
                <TableHeader>
                    <TableRow>
                        <TableCell scope="col" border="bottom" key="num" size="1em">
                            <Text>#</Text>
                        </TableCell>
                        {props.headers.map((header) => {
                            return(
                                <TableCell scope="col" border="bottom" key={header}>
                                    <Text>{header}</Text>
                                </TableCell>
                            );
                        })}
                        <TableCell scope="col" border="bottom" key="del" size="3em">
                            <Text>Delete</Text>
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Items already added */}
                    {createHistoryRow()}

                    {createInputRow()}
                </TableBody>
            </Table>

            <Box center align="center" pad="small" width="small">
                <Button secondary color="main" onClick={() => addItem()} label="Add" />
            </Box>
        </Box>
    );
}

// Required props
StepTable.propTypes = {
    numCols: propTypes.number.isRequired,
    headers: propTypes.array.isRequired,
    addItemExternally: propTypes.func.isRequired,
    removeItemExternally: propTypes.func.isRequired
}