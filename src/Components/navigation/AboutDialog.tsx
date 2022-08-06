import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Dispatch, SetStateAction } from 'react';
import { Box, Grid, Link } from '@mui/material';
import { Container } from 'react-bootstrap';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AboutDialogProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}

export default function AboutDialog(props: AboutDialogProps) {
    // const [open, setOpen] = React.useState(props.show);

  
    return (
      <div>
        <Dialog
          fullScreen
          open={props.show}
          onClose={() => props.setShow(false)}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => props.setShow(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                About
              </Typography>
              <Button autoFocus color="inherit" onClick={() => props.setShow(false)}>
                Done
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 2 }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
              <Typography variant="body1">
              This is a React app that mints an NFT to represents your mark on the blockchain.  
              I made it to learn how to write apps that interact with SPL Token Library. To find out more about me, 
              check out <Link rel="noreferrer" href="https://www.ashwinnarayan.com/" target="_blank">my home page</Link>.
              
              </Typography>
              <br/>
              <Typography variant="h4">
              FAQ
              </Typography>

              <Typography variant="h5">
              How does this app prove my existence?
              </Typography>
              <Typography variant="body1">
              If you minted an NFT using this website, it proves (to me, the author of this website) that you existed at
              the moment you clicked the mint button. 
              </Typography>
              <br/>
              <Typography variant="h5">
              Do I exist?
              </Typography>
              <Typography variant="body1">
              It is my opinion that if you minted an NFT on this website, you existed. 
              But you could be a simulated consciousness. There's really no way to know. 
              </Typography>
              <br/>
              <Typography variant="h5">
              Can I see the code?
              </Typography>
              <Typography variant="body1">
              The code <Link href='https://github.com/RationalAsh/i-mint-therefore-i-am' target='_blank' rel='noreferrer'> exists.</Link>
              </Typography>
              <br/>
              <Typography variant="h5">
              What will this cost?
              </Typography>
              <Typography variant="body1">
              Minting the NFT is free (like drawing graffiti). The only cost to minting this NFT is the fees 
              for sending all the transactions to the Solana blockchain. You can liken this to the cost of public 
              transport for reaching the wall on which you want to write on in the real world and the cost of the paint.
              This cost is pretty low (less than a cent at the time of writing this). 
              </Typography>
              <br/>
              <Typography variant="h5">
              Will this website steal my SOL?
              </Typography>
              <Typography variant="body1">
              I promise it won't, but you can check the code if you want to be sure. 
              </Typography>

              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </div>
    );
  }