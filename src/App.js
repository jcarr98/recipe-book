import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Box } from 'grommet';

import AppBar from './components/AppBar';
import RecipeMenu from './pages/recipe_menu/RecipeMenu';
import Recipe from './pages/recipe/Recipe';
import Create from './pages/create/Create';
import Oops from './pages/Oops';

import Login from './pages/auth/Login';

function App() {

    useEffect(() => {
        document.title = "Jean's Recipe Book - Jeffrey Carr";
    }, []);

    return (
        <Box>
            <AppBar />
            <Router>
                <Routes>
                    <Route path="/" element={<RecipeMenu />} />
                    <Route path="/recipe/:id" element={<Recipe />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='*' element={<Oops />} />
                </Routes>
            </Router>
        </Box>
        
    );
}

export default App;
