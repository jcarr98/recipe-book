import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Card, CardHeader, CardBody, CardFooter, Heading, Text } from 'grommet';
import { BsHeart, BsHeartFill, BsTrash } from 'react-icons/bs';

export default function RecipeItem(props) {
    const [el, setEl] = useState("none");
    const history = useHistory();

    /** Update the status of whether this item is favorited or not */
    function updateFavorite() {
        // Use callbacks to update cookie
        props.favorited ? props.remove(props.item.id) : props.add(props.item.id);
    }

    function deleteItem() {
        console.log(`Recipe item deleting ${props.item.id}`);
        props.delete(props.item.id);
    }

    return(
        /* Handle both views since they contain the same information */
        props.view ? (
            // Box view
            <Card
                align='center'
                elevation={el}
                pad="medium"
                key={props.item.id}
                background="secondary"
                onMouseEnter={() => setEl("xlarge")}
                onMouseLeave={() => setEl("none")}
            >
                <CardHeader size="small" width="full" round>
                    <Box width="full" align="center">
                        <Heading level="3" weight="bold" align="center">{props.item.name}</Heading>
                    </Box>
                </CardHeader>
                <CardBody pad="small">
                    <Box>
                        <Text>{props.item.details}</Text>
                    </Box>
                    <br />
                    <Box>
                        <Text>Author: {props.item.author ? props.item.author : "Unknown"}</Text>
                    </Box>
                </CardBody>
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
                        label={props.favorited ? <BsHeartFill size="1.25em" color="main" /> : <BsHeart size="1.25em" color="main" />}
                    />
                    {/* Delete button (only shows if admin) */}
                    {props.isAdmin ? 
                        <Button
                            secondary
                            plain
                            color="main"
                            onClick={() => deleteItem()}
                            label={<BsTrash color="main" size="1.25em" />}
                        />
                        : null}
                </CardFooter>
            </Card>
        ) : (
            // List view
            <Box full align="center">
                <li style={{listStyleType: "none"}} key={props.item.id}>
                    <Box fill direction="row" align="center">
                        {/* Link to recipe */}
                        <Box pad="small">
                            <Button
                                secondary
                                plain
                                color="main"
                                pad="medium"
                                label={props.item.name}
                                onClick={() => {history.push('/recipe/' + props.item.id)}}
                            />
                        </Box>
                        {/* Add to favorites */}
                        <Box>
                            <Button
                                secondary
                                plain
                                color="main"
                                label={
                                    props.favorited ? 
                                        <BsHeartFill size="1em" color="main" /> :
                                        <BsHeart size="1em" color="main" />
                                }
                                onClick={() => updateFavorite()}
                            />
                        </Box>
                    </Box>
                </li>
            </Box>
        )
    );
}
