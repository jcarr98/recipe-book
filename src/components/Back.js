import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

function Back(props) {
    const navigate = useNavigate();

    return(
        <Box align="start" pad="medium" fill>
            <Button 
                onClick={() => {navigate(props.route)}}
                color="main" 
                icon={ <LinkPrevious color="main" size="medium" /> } 
                label={props.label}
                plain
            />
        </Box>
    );
}

export default Back;