import React, { useEffect, useState } from 'react';

import Axios from 'axios';

import { Box, Button, Text, TextArea, TextInput } from 'grommet';

import AppBar from '../../components/AppBar';
import IngredientsManager from './components/IngredientsManager';
import DirectionsManager from './components/DirectionsManager';

export default function Create() {
    const [ingredients, setIngredients] = useState([]);  // List of all entered ingredients
    const [directions, setDirections] = useState([]);  // List of all directions

    useEffect(() => {
        let api = process.env.REACT_APP_BACKEND + "auth/authenticated";
        Axios.get(api, { withCredentials: true }).then((data) => {
            if(!data.data) {
                window.location = '/login';
            }
        });
    } ,[]);

    function send() {
        console.log("Sent data");

        console.log("List of all ingredients:");
        console.log(ingredients);

        console.log("List of all steps:");
        console.log(directions);
    }

    return(
        <Box align="center" responsive>
            <AppBar authenticated={true} />

            <Box pad="medium">
                <h1>New Recipe</h1>
            </Box>

            <Box direction="row" align="center">
                <Box align="end" pad="small">
                    <Text>Recipe Name: </Text>
                </Box>
                <Box align="start" pad="small">
                    <TextInput name="name" placeholder="Sample recipe name" />
                </Box>
            </Box>
            <Box direction="row" align="center">
                <Box align="end" pad="small">
                    <Text>Recipe Description: </Text>
                </Box>
                <Box align="start" pad="small">
                    <TextArea
                        placeholder="Sample Description"
                    />
                </Box>
            </Box>

            {/* Ingredients table */}
            <Box pad="medium">
                <h2>Ingredients</h2>
            </Box>
            <IngredientsManager
                ingredients={ingredients}
                setIngredients={setIngredients}
            />

            {/* Directions table */}
            <Box pad="medium">
                <h2>Directions</h2>
            </Box>
            <DirectionsManager
                directions={directions}
                setDirections={setDirections}
            />

            <Box pad="large">
                <Button 
                    primary 
                    color="main"
                    onClick={() => send()}
                    label="Save to Recipe Book"
                />
            </Box>
        </Box>
    );
}