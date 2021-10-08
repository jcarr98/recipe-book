import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Card, CardHeader, CardBody, CardFooter, Heading } from 'grommet';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

function RecipeCard(props) {
    const [el, setel] = useState("none");
    const history = useHistory();

    /** Apply elevation to card on mouse enter */
    function elevate() {
        setel("xlarge");
    }

    /** Remove elevation to card on mouse leave */
    function unelevate() {
        setel("none")
    }

    /** Update the status of whether this item is favorited or not */
    function updateFavorite() {
        // Use callbacks to update cookie
        props.favorites.includes(props.item.id) ? props.remove(props.item.id) : props.add(props.item.id);
    }

    return (
        <Card 
            align='center'
            elevation={el}
            pad="medium"
            background="secondary"
            onMouseEnter={() => elevate()}
            onMouseLeave={() => unelevate()}
        >
            <CardHeader size="small" width="full" round>
                <Box width="full" align="center">
                    <Heading level="3" weight="bold">{props.item.name}</Heading>
                </Box>
            </CardHeader>
            <CardBody pad="small">{props.item.details}</CardBody>
            <CardFooter pad="small">
                {/* Link to recipe */}
                <Button 
                    primary 
                    color="main" 
                    onClick={() => {history.push('/recipe/' + props.item.id)}}
                    label="Open" 
                />
                {/* Add to favorites */}
                <Button 
                    secondary 
                    plain
                    color="main"
                    onClick={() => updateFavorite()} 
                    label={props.favorites.includes(props.item.id) ? <BsHeartFill size="1.25em" color="main" /> : <BsHeart size="1.25em" color="main" />}
                />
            </CardFooter>
        </Card>
    )
}

export default RecipeCard;