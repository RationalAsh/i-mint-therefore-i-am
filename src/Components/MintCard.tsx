import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function MintCard() {
  return (
    <Card sx={{ minWidth: 275, padding: "5px", margin: "0.5rem" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          Rene Descartes minted, therefore he was.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
