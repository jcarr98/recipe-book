import React, { useEffect, useState } from 'react';

import { Accordion, AccordionPanel, Box } from 'grommet';
import Axios from 'axios';

// Sub components
import FavoriteButton from './components/FavoriteButton';
import WakeLock from './components/WakeLock';
import DirectionsList from './components/DirectionsList';
import IngredientsList from './components/IngredientsList';
// Global components
import Back from '../../components/Back';
import Loading from '../../components/Loading';
import ServerError from '../../components/ServerError';

function Recipe() {
    const [recipeInfo, setRecipeInfo] = useState({name: "undefined"});
    const [loading, setLoading] = useState([]);
    const [activeIndex, setActiveIndex] = useState([0,1]);
    const [error, setError] = useState(false);

    const pathname = window.location.pathname.split('/');
    const id = pathname[pathname.length-1];

    // Load stuff
    useEffect(() => {
        // Set loading
        setLoading(true);

        // Load recipe info
        let api = process.env.REACT_APP_BACKEND + "get/" + id;
        Axios.get(api).then((data) => {
            if(data.data.length === 0) {
                setError(true);
                document.title = "Error";
            } else {
                setRecipeInfo(data.data[0]);
                document.title = "Jean's Recipe Book - " + data.data[0].name;
            }

            setLoading(false);
        });
    }, [id]);

    return(
        <Box align="center" full responsive>
            <Box direction="row" fill>
                {/* Back to recipe list */}
                <Back route="/" label="Back to Recipe List" />

                {/* WakeLock toggle */}
                <WakeLock />
            </Box>
            
            {loading ? <Loading text="Loading Recipe..." /> : null}
            {error ? <ServerError name="this recipe" /> : (
                <Box align="center" style={{visibility: loading ? "hidden" : "visible"}}>
                    <h1>{recipeInfo.name}</h1>

                    {/* Favorite Item */}
                    <FavoriteButton info={recipeInfo} />

                    {/* Accordion holding both ingredients list and steps */}
                    <Accordion 
                        multiple={true} 
                        activeIndex={activeIndex}
                        onActive={newActiveIndex => setActiveIndex(newActiveIndex)}
                        animate={true}
                    >
                        {/* Ingredients list */}
                        <AccordionPanel label="Ingredients" >
                            <IngredientsList id={id} />
                        </AccordionPanel>
                        {/* Directions list */}
                        <AccordionPanel label="Directions">
                            <DirectionsList id={id} />
                        </AccordionPanel>
                    </Accordion>
                </Box>
            )}
        </Box>
    );
}

export default Recipe;