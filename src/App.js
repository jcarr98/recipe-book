import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RecipeMenu from './pages/recipe_menu/RecipeMenu';
import Recipe from './pages/recipe/Recipe';
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Oops from './pages/Oops';

import Login from './pages/Login/Login';

function App() {
    const title = "Jean's Recipe Book";

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={RecipeMenu} />
                <Route path="/recipe/:id" component={Recipe} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/create" component={Create} />
                <Route component={Oops} />
            </Switch>
        </Router>
    );
}

export default App;
