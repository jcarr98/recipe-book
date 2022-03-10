import React, { useEffect, useState } from 'react';

import { Box, Button, CheckBox, Table, TableBody, TableCell, TableHeader, TableRow, Text, TextInput } from 'grommet';
import { Trash } from 'grommet-icons';

import propTypes from 'prop-types';

export default function StepTable(props) {
    // Full list of items
    const [items, setItems] = useState([]);
    // Values that haven't been saved yet
    const [values, setValues] = useState([]);
    // Checked items
    const [checked, setChecked] = useState(false);
    // Ref for first item in table
    const [inputRef, setInputRef] = useState();

    useEffect(() => {
        // Create input ref
        setInputRef(React.createRef());

        // Create array of values for inputs
        let vals = [];
        for(let i = 0; i < props.numCols; i++) {
            vals.push("");
        }

        setValues(vals);
    }, [props.numCols]);

    /**
     * Add item to external and internal lists of items
     * @returns true if successful, false if not
     */
    function addItem() {
        // Create object
        let newItem = {};
        for(let i = 0; i < values.length; i++) {
            newItem[i] = values[i];
        }

        newItem["optional"] = checked;

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

        setChecked(false);

        setValues(newVals);

        console.log(items);
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
            inputRef.current.focus();
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

                    <TableCell scope="row" border="bottom" key={`{${i}}:Optional`}>
                        <CheckBox checked={row["optional"]} disabled />
                    </TableCell>

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
            if(key === 'optional') {
                return null;
            } else {
                return(
                    <TableCell scope="row" border="bottom" key={i}>
                        <TextInput value={row[key]} disabled />
                    </TableCell>
                );
            }
        });
    }

    function createInputRow() {
        return(
            <TableRow>
                <TableCell scope="row" border="bottom" key="num">
                    <Text>{items.length+1}</Text>
                </TableCell>
                {values.map((val, i) => {
                    if(i === 0) {
                        return(
                            <TableCell scope="row" border="bottom" key={i}>
                                <TextInput
                                    value={val}
                                    onChange={event => handleChange(event.target.value, i)}
                                    onKeyPress={event => enterItem(event)}
                                    ref={inputRef}
                                />
                            </TableCell>
                        )
                    } else {
                        return(
                            <TableCell scope="row" border="bottom" key={i}>
                                <TextInput 
                                    value={val}
                                    onChange={event => handleChange(event.target.value, i)}
                                    onKeyPress={event => enterItem(event)}
                                />
                            </TableCell>
                        )
                    }
                })}
                <TableCell scope="row" border="bottom" key="opt">
                    <CheckBox checked={checked} onChange={checkOptional} />
                </TableCell>
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

    function checkOptional() {
        let status = checked;
        setChecked(!status);
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
                        <TableCell scope="col" border="bottom" key="opt" size="3.5em">
                            <Text>Optional</Text>
                        </TableCell>
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