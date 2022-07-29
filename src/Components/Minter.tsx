import { Button, FilledInput, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

export interface IMinterProps {
}

export default function Minter (props: IMinterProps) {
    const [mintMessage, setMintMessage] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMintMessage(event.target.value)
    }

    return (
    <Grid container alignItems="center">
        <Grid item xs={6} md={10}>
            <FormControl fullWidth sx={{m: 4}} variant="filled">
            <InputLabel htmlFor="nft-mint-message">Enter your name.</InputLabel>
            <FilledInput
                id="nft-mint-message"
                value={mintMessage}
                aria-describedby="filled-weight-helper-text"
                onChange={handleChange}
                inputProps={{
                'aria-label': 'weight',
                }}/>
            </FormControl>
        </Grid>
        <Grid item xs={6} md={2} alignItems="center">
            <Button variant="contained">Mint!</Button>
        </Grid>
    </Grid>
    );
}
