import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGoogleLogout } from 'react-google-login';

import Axios from 'axios';
import { Accordion, AccordionPanel, Box, Button, Grid, Heading, Nav, Text, TextInput } from 'grommet';

// Sub components
import FavoriteItem from './components/FavoriteItem';
import Categories from './components/Categories';
// Global components
import Loading from '../../components/Loading';
import RecipeItem from './components/RecipeItem';
import ServerError from '../../components/ServerError';

export default function RecipeMenu() {
    /* States */
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
    // Constant states
    const [recipeList, setRecipeList] = useState([]);
    const [loggedIn, setLogginIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate();
    // Changing states
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState([]);
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [boxView, setBoxView] = useState(true);
    const [error, setError] = useState(false);

    // Load recipes
    useEffect(() => {
        document.title = "Jean's Recipe Book"
        // Load all cookies
        loadCookies();

        // Get all recipes
        Axios.get(`${process.env.REACT_APP_BACKEND}/get`).then((data) => {
            if(data.data.length === 0) {
                setError(true);
            } else {
                setRecipeList(data.data);
            }
        });

        // Check auth
        const authToken = localStorage.getItem('authToken');
        if(authToken !== null) {
            Axios.get(`${process.env.REACT_APP_BACKEND}/auth/validUser`, {params: {tokenId: localStorage.getItem('authToken')}}).then((res) => {
                if(res.data.status) {
                    setLogginIn(true);
                    setUserName(res.data.user);
                }

                setLoading(false);
            });
        } else {
            console.log('No auth token');
            setLoading(false);
        }
    }, []);

    /*************/
    /* Signout Code */
    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure
    });

    function onLogoutSuccess() {
        alert('Successfully logged out');
        localStorage.setItem('authToken', '');
        setLogginIn(false);
    }

    function onFailure() {
        alert('Logout failed');
    }
    /************/

    function loadCookies() {
        // Load favorites
        let favs = localStorage.getItem('favorites');
        setFavorites(favs === null ? [] : JSON.parse(favs));

        // Load view
        let view = localStorage.getItem('view');
        setBoxView(view === null ? true : JSON.parse(view));
    }

    function changeView() {
        let view = !boxView;

        // Change view state
        setBoxView(view);

        // Save as cookie
        localStorage.setItem('view', JSON.stringify(view));
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
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    const deleteItem = (id) => {
        // Confirm user is authed
        if(!loggedIn) {
            alert("You must be an admin!");
            return;
        }

        // Get user's auth token
        let authToken = localStorage.getItem('authToken');
        // Call delete api
        Axios.post(`${process.env.REACT_APP_BACKEND}/deleteRecipe`, {data: {recipeId: id, token: authToken}}).then((response) => {
            // Check if successful or not
            if(response.data.status > 0) {
                alert("Recipe successfully deleted!");
                if(response.data.categoryDeleted !== null) {
                    // TODO - Remove from categories list
                }

                // Remove recipe from list
                removeFromRecipesList(id);
            } else {
                alert("Deletion failed");
            }
        })
    }

    function removeFromRecipesList(id) {
        let newRecipeList = [...recipeList];
        for(let i = 0; i < newRecipeList.length; i++) {
            if(newRecipeList[i].id === id) {
                newRecipeList.splice(i, 1);
                break;
            }
        }

        setRecipeList(newRecipeList);
    }

    return (
        <Box align="center" full responsive>
            <Box fill align='center' pad='medium'>
                <Heading alignSelf="center">Jean's Recipe Book</Heading>
                {loggedIn ? 
                    <Box fill align='center'>
                        <Box pad='small'>
                            <Text color='mainText'>Hi, {userName}. You're logged in</Text>
                        </Box>
                        <Box align="center"  responsive direction='row'>
                            <Box pad={{horizontal: 'small'}}>
                                <Button 
                                    primary
                                    color='main'
                                    label={<Text color='mainText'>New Recipe</Text>} 
                                    onClick={() => window.location.href='/create'}
                                />
                            </Box>
                            <Box>
                                <Button
                                    secondary
                                    color='secondary'
                                    label={<Text color='mainText'>Log Out</Text>} 
                                    onClick={signOut}
                                />
                            </Box>
                        </Box>
                    </Box>
                : 
                    <Box fill align='center'>
                        <Box pad='small'>
                            <Text color='mainText'>You are not logged in.</Text>
                        </Box>
                        <Box>
                            <Button
                                primary
                                color='main'
                                label={<Text color='mainText'>Log in</Text>}
                                onClick={() => {navigate('/login')}}
                            />
                        </Box>
                    </Box>
                }
            </Box>

            <Nav direction="row" align="center" background="main" width="75%" pad="medium" responsive>
                <Categories loading={loading} setCategoriesValue={setCategoriesValue} />
                <TextInput
                    placeholder="Search"
                    onChange={event => setSearchValue(event.target.value)}
                    a11yTitle="A search box to filter shown recipes"
                />
                <Button color="secondary" label={<Text color='mainText'>Change View</Text>} onClick={changeView} />
            </Nav>
            <Accordion width="70%">
                <AccordionPanel label="Favorites">
                    {loading ? <Loading text="Loading favorites..." /> : null}
                    {error ? null : (
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
                                    })
                                }
                            </ul>
                        </Box>
                    )}
                </AccordionPanel>
            </Accordion>

            {loading ? <Loading text="Loading Recipes..." /> : null}
            {error ? <ServerError name="the recipe list" /> : (
                <Grid width="full" gap="medium" pad="medium" columns={{ count: 'fit', size: "medium"}} style={{visibility: loading ? "hidden" : "visible"}}>
                    {recipeList.filter(function(val,key) {
                        // Clause checks if no filter is applied
                        if(categoriesValue.length === 0) {
                            return true;
                        } else {
                            return categoriesValue.includes(val.category);
                        }
                    }).filter(function(val,key) {
                        return(val.name.toLowerCase().indexOf(searchValue.toString().toLowerCase()) > -1 ? true : false);
                    }).map((val,key) => {
                        return(
                            <RecipeItem
                                key={key}
                                view={boxView}
                                isAdmin={loggedIn}
                                delete={deleteItem}
                                item={val}
                                favorited={favorites.includes(val.id)}
                                add={addToFavorites}
                                remove={removeFromFavorites}
                            />
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
}
