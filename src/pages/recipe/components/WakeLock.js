import React, { useState, useEffect } from 'react';

import { Box, CheckBox, Text } from 'grommet';

function WakeLock() {
    const [wakeLock, setWakeLock] = useState([]);
    const [supported, setSupported] = useState(false);
    const [failed, setFailed] = useState(false);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        setSupported('wakeLock' in navigator);
    }, [])

    function updateLock() {
        let lockStatus = locked;

        if(lockStatus) {
            releaseWakeLock();
        } else {
            createWakeLock();
        }

        setLocked(!lockStatus);
    }

    const createWakeLock = async () => {
        // Create reference for wake lock
        let lock = null;

        // Create an async function to request
        try {
            lock = await navigator.wakeLock.request('screen');
        } catch (err) {
            // Wake Lock failed - usually system related, such as battery
            setFailed(true);
        }

        setWakeLock(lock);
    }

    function releaseWakeLock() {
        let lock = wakeLock;

        lock.release().then(() => {
            lock = null;
        });

        setWakeLock(lock);
    }
    
    return(
        <Box alignSelf="center" align="end" fill>
            <Box pad="small">
                    <CheckBox
                        toggle
                        disabled={!supported}
                        label="Keep screen awake"
                        onChange={() => updateLock()}
                    />
            </Box>
            {supported && failed && (
                <Box>
                    <Text color="red">Wake Lock failed - usually system related, such as battery</Text>
                </Box>
            )}
            {!supported && (
                <Box pad="small">
                    <Text>Your browser does not support keeping the screen awake</Text>
                </Box>
            )}
        </Box>
    )
}

export default WakeLock;