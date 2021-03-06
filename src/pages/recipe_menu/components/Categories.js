import { useEffect, useState } from 'react';

import Axios from 'axios';

import { Box, CheckBoxGroup, DropButton, Text } from 'grommet';

import Loading from '../../../components/Loading';

export default function Categories(props) {
    const [value, setValue] = useState([]);
    const [options, setOptions] = useState([]);
    const parentValues = props.setCategoriesValue;

    useEffect(() => {
        // Load categories
        loadCategories();

        // Get cookie
        let categories = localStorage.getItem('categories');
        
        // Check if cookie existed and apply value
        let val = categories === null ? [] : JSON.parse(categories)
        
        // Update variables
        setValue(val);
        parentValues(val);
    }, [parentValues]);

    /**
     * Load all categories from database
     */
    function loadCategories() {
        Axios.get(`${process.env.REACT_APP_BACKEND}/getCategories`).then((data) => {
            // Convert list of json objects to list of checkbox objects
            let items = [];

            for(let i = 0; i < data.data.length; i++) {
                let current = data.data[i];
                let item = {
                    label: current.name,
                    val: current.id
                }

                items.push(item);
            }
            setOptions(items);
        });
    }

    function updateSelections(newValue) {
        // Update cookie. If no more categories selected then delete cookie
        if(newValue.length === 0) {
            localStorage.removeItem('categories');
        } else {
            localStorage.setItem('categories', JSON.stringify(newValue));
        }

        // Update values
        setValue(newValue);

        // Update list
        parentValues(newValue);
    }
    
    return(
        <DropButton 
            color="secondary"
            label={<Text color='mainText'>Filters</Text>}
            dropAlign={{top: 'bottom', right: 'right'}}
            dropContent={
                <Box pad="medium" background='background'>
                    {props.loading ? <Loading text="Loading Categories..." /> : (
                        <CheckBoxGroup 
                            color="main"
                            labelKey="label"
                            valueKey="val"
                            options={options}
                            value={value}
                            onChange={(event) => {
                                updateSelections(event.value);
                            }}
                        />
                    ) }
                </Box>
            }
        />
    )
}