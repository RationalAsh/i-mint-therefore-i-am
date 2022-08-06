import { Avatar, Button, Divider, IconButton, InputBase, Paper, Stack, TextField } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
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

    // Get intiials
    function getInitials(name: string) {
        const splitStr = name.split(" ");
        
        if (name.length > 0) {
            if (splitStr.length > 1) {
                const char1 = splitStr[0].length > 0 ? splitStr[0][0].toUpperCase() : "~";
                const char2 = splitStr[1].length > 0 ? splitStr[1][0].toUpperCase() : "";
                return ( char1 + char2 );
            } 
            
            if (splitStr.length === 1) {
                return splitStr[0].length > 0 ? splitStr[0][0].toUpperCase(): "~";
            }
        } else {
            return "~"
        }
    }

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
        <>
        <Paper
            component='form'
            sx={{ p: '2px 4px',
                  alignItems: 'center', 
                  width: "80%",
                  display: { xs: 'none', md: 'flex' } }}
            elevation={formFocused ? 5 : 2}>
            <IconButton sx={{ p: "2px" }} aria-label='avatar-select'>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{getInitials(minterName)}</Avatar>
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
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
        <Paper
        component='form'
        sx={{ p: '2px 4px',
              alignItems: 'center', 
              width: "80%",
              display: { xs: 'flex', md: 'none' } }}
        elevation={formFocused ? 5 : 2}>
            <Stack spacing={2} sx={{width: "100%", m: '5px'}}>
                <IconButton sx={{ p: "2px" }} aria-label='avatar-select'>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{getInitials(minterName)}</Avatar>
                </IconButton>
                <TextField 
                    label="Your graffiti"
                    variant='filled'
                    fullWidth
                    inputProps={{ 'aria-label': 'write some graffiti' }}
                    onFocus={() => setFormFocused(true)}
                    onBlur={() => setFormFocused(false)}
                    value={mintMessage}
                    onChange={(e) => setMintMessage(e.target.value)}/>
                <TextField 
                    label="Your name"
                    variant='filled'
                    fullWidth
                    inputProps={{ 'aria-label': 'write some graffiti' }}
                    onFocus={() => setFormFocused(true)}
                    onBlur={() => setFormFocused(false)}
                    value={minterName}
                    onChange={(e) => setMinterName(e.target.value)}/>
                <Button 
                    color="primary" 
                    sx={{ p: '10px' }} 
                    aria-label="Mint"
                    disabled={!connected || mintMessage.length === 0 || minterName.length === 0 }
                    onClick={createProofOfExistence}
                    fullWidth>
                    Mint!
                </Button>
            </Stack>
        </Paper>
        </>
    );
}
