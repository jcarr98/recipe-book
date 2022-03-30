import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

import { Box, Button, RadioButtonGroup, Text, TextArea, TextInput } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

import IngredientsManager from './components/IngredientsManager';
import DirectionsManager from './components/DirectionsManager';
import Loading from '../../components/Loading';

export default function Create() {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(-1);
    const [ingredients, setIngredients] = useState([]);  // List of all entered ingredients
    const [directions, setDirections] = useState([]);  // List of all directions
    const [categories, setCategories] = useState([]);
    const [customCat, setCustomCat] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Get all categories
        Axios.get(`${process.env.REACT_APP_BACKEND}/getCategories`).then((data) => {
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

        // Check auth
        const authToken = localStorage.getItem('authToken');
        if(authToken !== null) {
            Axios.get(`${process.env.REACT_APP_BACKEND}/auth/validUser`, {params: {tokenId: authToken}}).then((res) => {
                if(res.data.status) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            });
        } else {
            setLoggedIn(false);
        }
    } ,[]);

    /**
     * Send all recipe data to database
     * @returns true if successful, false if not
     */
    function send() {
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
        Axios.post(`${process.env.REACT_APP_BACKEND}/createRecipe`, {data: {recipe: recipe, token: localStorage.getItem('authToken')}}).then(response => {
            if(response.data.status < 0) {
                alert(response.data.message);
            } else {
                window.location.href = '/';
            }
        });

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

    function back() {
        let goBack = window.confirm("Are you sure you want to go back? Your input will not be saved");

        if(goBack) {
            navigate('/');
        }
    }

    return(
        <Box align="center" responsive>
            {/* Back to recipe list */}
            <Box align="start" pad="medium" fill>
                <Button 
                    onClick={() => back()}
                    color="main" 
                    icon={ <LinkPrevious color="main" size="medium" /> } 
                    label={"Back to recipe list"}
                    plain
                />
            </Box>

            {loggedIn === null ?
                <Loading text={"Checking permissions..."} />
                :
                loggedIn ?
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
                :
                navigate('/login')
            }
        </Box>
    );
}