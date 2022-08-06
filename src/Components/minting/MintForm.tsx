import { Button, Divider, IconButton, InputBase, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import * as React from 'react';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSnackbar } from 'notistack';
import { useMetaplex } from './useMetaplex';


export interface IMintFormProps {
}

export default function MintForm (props: IMintFormProps) {
    const [ formFocused, setFormFocused ] = useState(false);
    const [ mintMessage, setMintMessage ] = useState("");
    const [ minterName, setMinterName ] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const { metaplex } = useMetaplex() as any;
    const { publicKey, wallet, connect, connecting, connected, disconnect, disconnecting } = useWallet();

    // Function to mint the NFT
    function createProofOfExistence(event: any) {
        if (metaplex && publicKey) {
            // Do the minting
            console.log("Preparing to mint your NFT....");

            // Show a notification to show that minting has started.
            enqueueSnackbar("Started mint!", { variant: 'info', autoHideDuration: 5000 });
        
            try {
                // Call function to create NFT.
                // const response = await metaplex.nfts().create({
                //     uri: "",
                //     symbol: "BWH",
                // });

                // Show a notification to show that minting is done.
                enqueueSnackbar("Mint done!", { variant: 'success', autoHideDuration: 5000 });
            } catch (error: any) {
                // Something went wrong with the minting
                console.log(error);
                // Show a notification describing the error.
                enqueueSnackbar("Mint error!", { variant: 'error', autoHideDuration: 20000 });
            }
        } else {
            // We should never come here but if it happens, express confusion.
        }
    }

    return (
        <Paper
            component='form'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%" }}
            elevation={formFocused ? 5 : 2}>
            <InputBase
                sx={{ ml: 1, width: "60%" }}
                placeholder="Your Graffiti"
                inputProps={{ 'aria-label': 'write some graffiti' }}
                onFocus={() => setFormFocused(true)}
                onBlur={() => setFormFocused(false)}
                value={mintMessage}
                onChange={(e) => setMintMessage(e.target.value)}/>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Your name"
                inputProps={{ 'aria-label': 'enter your name' }}
                onFocus={() => setFormFocused(true)}
                onBlur={() => setFormFocused(false)}
                value={minterName}
                onChange={(e) => setMinterName(e.target.value)}/>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button 
                color="primary" 
                sx={{ p: '10px' }} 
                aria-label="Mint"
                disabled={!connected || mintMessage.length === 0 || minterName.length === 0 }
                onClick={createProofOfExistence}>
                Mint!
            </Button>
        </Paper>
    );
}
