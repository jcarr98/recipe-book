import React, { useEffect, useRef, useState } from 'react';

import { Box, Button, Drop, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import { BsHeart } from 'react-icons/bs';

function FavoriteButton(props) {
    const buttonRef = useRef(null);
    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Set favorites
        let favs = localStorage.getItem('favorites');

        favs = (favs === null ? [] : JSON.parse(favs));

        setFavorites(favs);
    }, [])

    function favorite()  {
        // Check if item already exists
        if(favorites.includes(props.info.id)) {
            setErr(true);
            return;
        }

        // Add new object to list
        let newFavorites = [...favorites];
        newFavorites.push(props.info.id);

        // Update favorites and save to cookie
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setSucc(true);
    }

    function unFavorite() {
        // Get index of item
        let index = favorites.indexOf(props.info.id);

        // Check item exists
        if(index < 0) {
            return;
        }

        // Remove item 
        let newFavorites = [...favorites];
        newFavorites.splice(index, 1);

        // Save updates
        setFavorites(newFavorites);
        
        // If no more items in cookie, just remove it
        newFavorites.length === 0 ? localStorage.removeItem('favorites') : localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    return(
        <Box
            ref={buttonRef}
        >
            {/* If this item is favorited, show Remove from Favorites button, otherwise show Favorite button */}
            {favorites.includes(props.info.id) ? (
                <Box>
                    <Button 
                        secondary
                        plain
                        color="main"
                        label="Remove from favorites"
                        icon={<Trash />}
                        reverse
                        onClick={() => unFavorite()}
                    />
                </Box>
            ) : (
                <Box>
                    <Button 
                        secondary 
                        plain
                        color="main"
                        label="Add to favorites" 
                        icon={<BsHeart color="main" />}
                        reverse
                        onClick={() => favorite()} 
                    />
                </Box>
            )}
            {succ && (
                <Drop
                    target={buttonRef.current}
                    align={{left: "right"}}
                    margin={{left: "medium"}}
                    background="#5dda55"
                    round={true}
                    onClickOutside={() => {setSucc(false)}}
                >
                    <Box align="center" pad="small">
                        <Text color="white">Item added to favorites</Text>
                    </Box>
                </Drop>
            )}
            {err && (
                <Drop
                    target={buttonRef.current}
                    align={{left: "right"}}
                    margin={{left: "medium"}}
                    background="main"
                    round={true}
                    onClickOutside={() => {setErr(false)}}
                >
                    <Box align="center" pad="small">
                        <Text>Item already favorited</Text>
                    </Box>
                </Drop>
            )}
        </Box>
    );
}

export default FavoriteButton;