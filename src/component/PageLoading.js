import React from 'react';
import { makeStyles, Box, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: "#fff",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 2000,
    },
    loader: {
        width: "100px",
        margin: "auto",
    },
    progressBar: {
        height: "3px",
    },
}));

export default function PageLoading() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Box >
                {/* <LinearProgress height={10} /> */}
                <img className={classes.loader} src="/images/centerimg.png" alt="" />
            </Box>
        </div>
    )
}
