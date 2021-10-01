import React, { useEffect, useState } from 'react';

import Axios from 'axios';
import { Accordion, AccordionPanel, Box, CheckBoxGroup, DropButton, Grid, Heading, Nav, Text, TextInput } from 'grommet';
import { Search } from 'grommet-icons';

// Sub components
import RecipeCard from './components/RecipeCard';
import FavoriteItem from './components/FavoriteItem';
// Global components
import AppBar from '../../components/AppBar';
import Loading from '../../components/Loading';

function RecipeMenu() {
    /* States */
    // Constant states
    const [recipeList, setRecipeList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    // Changing states
    const [loading, setLoading] = useState([true]);
    const [searchValue, setSearchValue] = useState([]);
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Load recipes
    useEffect(() => {
        document.title = "Jean's Recipe Book"
        // Get favorite items
        setFavorites(loadCookies());

        // Get all categories
        Axios.get("http://localhost:3002/api/getCategories").then((data) => {
            // Convert list of json objects to list of checkbox objects
            let items = [];

            for(let i = 0; i < data.data.length; i++) {
                let item = {
                    label: data.data[i].name,
                    checked: false,
                    value: data.data[i].id
                }

                items.push(item);
            }

            setCategoryList(items);
        });


        // Get all recipes
        Axios.get("http://localhost:3002/api/get").then((data) => {
            setRecipeList(data.data);

            setLoading(false);
        });
    }, []);

    function loadCookies() {
        let favs = localStorage.getItem('favorites');

        return favs === null ? [] : JSON.parse(favs);
    }

    const removeFromFavorites = (id) => {
        let newFavorites = [...favorites];

        // Search for item
        let index = newFavorites.indexOf(id);

        // Check if item exists
        if(index < 0) {
            return;
        }

        // Remove item
        newFavorites.splice(index, 1);

        // Update list and cookie
        setFavorites(newFavorites);
        console.log("Removed favorite: " + id);
        // If no more items in cookie, just remove it
        newFavorites.length === 0 ? localStorage.removeItem('favorites') : localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    const addToFavorites = (id) => {
        // Check if item already exists
        if(favorites.includes(id)) {
            return;
        }

        // Add new object to list
        let newFavorites = [...favorites];
        newFavorites.push(id);

        // Update list and cookie
        setFavorites(newFavorites);
        console.log("New favorite: " + id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    return (
        <Box align="center" full responsive>
            <AppBar />
            <Heading pad="medium" alignSelf="center">Jean's Recipe Book</Heading>
            <Nav direction="row" align="center" background="main" width="75%" pad="medium" responsive>
                <DropButton 
                    color="secondary"
                    label="Filters"
                    dropAlign={{top: 'bottom', right: 'right'}}
                    dropContent={
                        <Box pad="medium">
                            {loading ? <Loading text="Loading Categories..." /> : null}
                            <CheckBoxGroup 
                                color="main" 
                                options={categoryList} 
                                onChange={(event) => {setCategoriesValue(event.value)}}
                                style={{visibility: loading ? "hidden" : "visible"}}
                            />
                        </Box>
                    }
                />
                <TextInput
                    placeholder="Search"
                    icon={<Search />}
                    reverse
                    onChange={event => setSearchValue(event.target.value)}
                    a11yTitle="A search box to filter shown recipes"
                />
            </Nav>
            <Accordion width="70%">
                <AccordionPanel label="Favorites">
                    {loading ? <Loading text="Loading favorites..." /> : null}
                    <Box style={{visibility: loading ? "hidden" : "visible"}}>
                        {favorites.length === 0 ? <Text>No favorites to show</Text> : null}
                        <ul style={{visibility: favorites.length === 0 ? "hidden" : "visible"}}>
                            {recipeList.filter(function(val,key) {
                                return favorites.includes(val.id);
                            }).map((val,key) => {
                                return(
                                    <li key={val.id}>
                                        <FavoriteItem name={val.name} id={val.id} remove={removeFromFavorites} />
                                    </li>
                                )
                            })}
                        </ul>
                    </Box>
                </AccordionPanel>
            </Accordion>

            {loading ? <Loading text="Loading Recipes..." /> : null}
            <Grid width="full" gap="medium" pad="medium" columns={{ count: 'fit', size: "medium"}} style={{visibility: loading ? "hidden" : "visible"}}>
                {recipeList.filter(function(val,key) {
                    // Clause checks if no filter is applied
                    if(categoriesValue.length === 0) {
                        return true;
                    } else {
                        return categoriesValue.includes(val.category);
                    }
                }).filter(function(val,key) {
                    return(val.name.toLowerCase().indexOf(searchValue) > -1 ? true : false);
                }).map((val,key) => {
                    return(<RecipeCard key={val.id} item={val} favorites={favorites} add={addToFavorites} remove={removeFromFavorites} />);
                })}
            </Grid>
        </Box>
    );
}

export default RecipeMenu;