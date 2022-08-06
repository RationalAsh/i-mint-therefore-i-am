import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import * as React from 'react';

export interface IMintDisplayProps {
}

export default function MintDisplay (props: IMintDisplayProps) {
    return (
        <>
        <Typography variant='h3' sx={{ mt: '10px' }}>
            Graffiti Wall
        </Typography>
        <List sx={{ width: "100%", maxWidth: 500, bgcolor: 'background.paper' }}>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
            
            <ListItemText
                primary="Brunch this weekend?"
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
        </>
    );
}
