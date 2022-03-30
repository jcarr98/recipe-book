import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Box } from 'grommet';

import AppBar from './components/AppBar';
import RecipeMenu from './pages/recipe_menu/RecipeMenu';
import Recipe from './pages/recipe/Recipe';
import Create from './pages/create/Create';
import Oops from './pages/Oops';

import Login from './pages/auth/Login';

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        document.title = "Jean's Recipe Book - Jeffrey Carr";
    }, []);

    return (
        <Box>
            <AppBar token={token} setToken={setToken} />
            <Router>
                <Switch>
                    <Route path="/" exact component={RecipeMenu} />
                    <Route path="/recipe/:id" component={Recipe} />
                    <Route path="/login" render={() => (
                        <Login setToken={setToken} />
                    )} />
                    <Route path="/create" render={() => (
                        <Create setToken={setToken} token={token} />
                    )}/>
                    <Route component={Oops} />
                </Switch>
            </Router>
        </Box>
        
    );
}

export default App;
