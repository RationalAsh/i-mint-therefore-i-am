import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import * as React from 'react';

export interface IMintDisplayProps {
}

export default function MintDisplay (props: IMintDisplayProps) {
    return (
        <>
        <Typography variant='h3' sx={{ pt: '20px' }}>
            Graffiti Wall
        </Typography>
        <List sx={{ width: "100%", maxWidth: 500, bgcolor: 'background.paper' }}>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
            
            <ListItemText
                primary="I think, therefore I am. Pretty obvious IMHO."
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        René Descartes
                    </Typography>
                    {"~ 1637"}
                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
        </>
    );
}
