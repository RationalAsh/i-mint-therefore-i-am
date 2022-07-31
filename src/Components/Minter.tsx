import { Button, FilledInput, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Nft } from "@metaplex-foundation/js";
import { useMetaplex } from './useMetaplex';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Pronoun } from '../data/Models';


export interface IMinterProps {
}

export default function Minter (props: IMinterProps) {
    const [mintMessage, setMintMessage] = useState("");
    const [mintPronoun, setMintPronoun] = useState<Pronoun>(Pronoun.he);
    const { metaplex } = useMetaplex() as any;
    const { publicKey, wallet, connect, connecting, connected, disconnect, disconnecting } = useWallet();

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMintMessage(event.target.value);
    }

    function handlePronounChange(event: SelectChangeEvent<Pronoun>) {
        console.log(event)
        setMintPronoun(Pronoun[event.target.value as keyof typeof Pronoun]);
    }

    // Function to mint the NFT
    function createProofOfExistence() {
        if (metaplex && publicKey) {
            // Do the minting
            console.log("Preparing to mint your NFT....");

            // Show a notification to show that minting has started.
            
            try {
                // Call function to create NFT.

                // Show a notification to show that minting is done.
            } catch (error: any) {
                // Something went wrong with the minting
                console.log(error);
                // Show a notification describing the error.
            }
        } else {
            // We should never come here but if it happens, express confusion.
        }
    }

    return (
    <Grid container alignItems="center">
        <Grid item xs={10} md={4}>
            <FormControl fullWidth sx={{m: 4}} variant="filled">
            <InputLabel htmlFor="nft-mint-message">Enter your name.</InputLabel>
            <FilledInput
                id="nft-mint-message"
                value={mintMessage}
                aria-describedby="nft-mint-message-helper-text"
                onChange={handleNameChange}
                inputProps={{
                'aria-label': 'name',
                }}/>
            </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
            minted, and therefore
        </Grid>
        <Grid item xs={6} md={1}>
            <FormControl fullWidth sx={{m: 4}} variant="filled">
                <InputLabel id="pronoun-select">Pronoun</InputLabel>
                <Select
                    labelId='pronoun-select'
                    id='demo-simple-select'
                    value={mintPronoun}
                    onChange={handlePronounChange}
                    inputProps={{
                        'aria-label': 'pronoun',
                        }}>
                    <MenuItem value={Pronoun.he}> he </MenuItem>
                    <MenuItem value={Pronoun.she}> she </MenuItem>
                    <MenuItem value={Pronoun.they}> they </MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6} md={2}>
            {mintPronoun == Pronoun.they ? "were." : "was."}
        </Grid>
        <Grid item xs={12} md={1} alignItems="center">
            <Tooltip title="Connect wallet and enter a mint message to mint.">
            <span>
            <Button variant="contained"
                    disabled={ !connected || mintMessage.length === 0 }>
                Mint!
            </Button>
            </span>
            </Tooltip>
        </Grid>
    </Grid>
    );
}
