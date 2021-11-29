import React, { useEffect, useState } from 'react';

import Axios from 'axios';
import { Box } from 'grommet';

// Sub components
import Direction from './Direction';
// Global components
import Loading from '../../../components/Loading';

function DirectionsList(props) {
    const [loading, setLoading] = useState(true);
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        // Load directions
        let api = process.env.REACT_APP_BACKEND + "getDirections/" + props.id;
        Axios.get(api).then((data) => {
            setDirections(data.data);

            // Done loading
            setLoading(false);
        });
    }, [props.id]);

    return(
        <Box>
            {/* Maps directions to a list. Directions are checkboxes */}
            {loading ? <Loading text="Loading directions..." /> : (
                directions.map((val,key) => {
                    return(
                        <ul style={{listStyleType: "none"}}>
                            <li key={key}>
                                <Direction key={val.step_num} values={val} />
                            </li>
                        </ul>
                    );
                })
            )}
        </Box>
    )
}

export default DirectionsList;