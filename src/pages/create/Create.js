import React, { useEffect, useState } from 'react';

import Axios from 'axios';

import { Box, Button, RadioButtonGroup, Text, TextArea, TextInput } from 'grommet';

import IngredientsManager from './components/IngredientsManager';
import DirectionsManager from './components/DirectionsManager';
import Loading from '../../components/Loading';
import Login from '../auth/Login';

export default function Create(props) {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(-1);
    const [ingredients, setIngredients] = useState([]);  // List of all entered ingredients
    const [directions, setDirections] = useState([]);  // List of all directions
    const [categories, setCategories] = useState([]);
    const [customCat, setCustomCat] = useState("");

    useEffect(() => {
        console.log("Running");
        // Check user is authenticated
        let api = process.env.REACT_APP_BACKEND + "auth/authenticated";
        Axios.get(api, { withCredentials: true }).then((data) => {
            if(!data.data) {
                window.location = '/login';
            }
        });

        // Get all categories
        api = process.env.REACT_APP_BACKEND + "getCategories";
        Axios.get(api).then((data) => {
            let cats = [];
            for(let i = 0; i < data.data.length; i++) {
                let obj = {
                    label: data.data[i].name,
                    value: data.data[i].name
                }
                cats.push(obj);
            }

            let otherCat = {
                label: "Other",
                value: 0
            }

            cats.push(otherCat);

            setCategories(cats);
            setLoading(false);
        })
    } ,[]);

    if(!props.token) {
        return <Login setToken={props.setToken} />
    }

    /**
     * Send all recipe data to database
     * @returns true if successful, false if not
     */
    function send() {
        console.log("Sending data");

        console.log(category);
        // Check category only contains letters
        let nospaces = customCat.replace(" ", "");
        if(category === '0' && !/^[a-z]+$/i.test(nospaces)) {
            alert("New category names can only contain letters");
            return;
        }

        // Package items into recipe object
        let recipe = {
            name: name,
            details: description,
            category: category,
            categoryName: customCat,
            ingredients: ingredients,
            directions: directions
        }

        // Confirm entries
        if(recipe.name.replace(" ", "").length < 1) {
            post_error("Recipe must have a name");
            return false;
        }
        else if(recipe.category < 0) {
            post_error("Recipe must have a category");
            return false;
        }
        else if(ingredients.length < 1) {
            post_error("Recipe must have at least one ingredient");
            return false;
        }
        else if(directions.length < 1) {
            post_error("Recipe must have at least one step");
            return false;
        }

        // Create api string and send recipe object to backend
        let api = process.env.REACT_APP_BACKEND + "createRecipe";
        Axios.post(api, recipe).then(response => {
            if(response.data.status < 0) {
                alert(response.data.message);
            } else {
                console.log(response.data.message);
            }
        });

        console.log(`Sent ${recipe.name}`);
        console.log("Data sent");
        return true;
    }

    function reset() {
        setName("");
        setDescription("");
        // setCategories(-1);
        setCustomCat("");
        setIngredients([]);
        setDirections([]);
    }

    // Display error to user
    function post_error(message) {
        alert(message);
        return true;
    }

    return(
        <Box align="center" responsive>
            <Box pad="medium">
                <h1>New Recipe</h1>
            </Box>

            {/* Recipe name */}
            <Box direction="row" align="center">
                <Box align="end" pad="small">
                    <Text>Recipe Name: </Text>
                </Box>
                <Box align="start" pad="small">
                    <TextInput 
                        name="name" 
                        placeholder="Sample recipe name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </Box>
            </Box>

            {/* Recipe description */}
            <Box direction="row" align="center">
                <Box align="end" pad="small">
                    <Text>Recipe Description: </Text>
                </Box>
                <Box align="start" pad="small">
                    <TextArea
                        placeholder="Sample Description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </Box>
            </Box>

            {/* Recipe category */}
            <h2>Category</h2>
            {loading ? <Loading text={"Loading Categories..."} />: (
                <Box align="center">
                    <Box>
                        <RadioButtonGroup 
                            name="cat"
                            options={categories}
                            onChange={event => setCategory(event.target.value)}
                        />
                    </Box>
                    <Box pad="small">
                        <Box direction="row" align="center">
                            <Box pad="small">
                                <Text>Category: </Text>
                            </Box>
                            <Box>
                                <TextInput value={customCat} onChange={event => setCustomCat(event.target.value)} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                )}
            

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

            {/* Submit button */}
            <Box pad="large">
                <Box>
                    <Button 
                        primary 
                        color="main"
                        onClick={() => send()}
                        label="Save to Recipe Book"
                    />
                </Box>
                <Box pad="small">
                    <Button
                        secondary
                        color="main"
                        onClick={() => reset()}
                        label="Reset"
                    />
                </Box>
                
            </Box>
        </Box>
    );
}