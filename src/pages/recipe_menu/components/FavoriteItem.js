import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button } from 'grommet';
import { Trash } from 'grommet-icons';

function FavoriteItem(props) {
    const navigate = useNavigate();

    function remove() {
        props.remove(props.id);
    }

    return(
        <Box direction="row" align="center">
            <Box>
                <Button
                    secondary
                    plain
                    color="main"
                    onClick={() => {navigate(`/recipe/${props.id}`)}}
                    label={props.name}
                />
            </Box>
            <Box>
                <Button 
                    icon={<Trash />}
                    onClick={() => remove()}
                />
            </Box>
        </Box>
    )
}

export default FavoriteItem;