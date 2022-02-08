import * as React from 'react';
import { Button, Typography } from '@mui/material';
import HeroLayout from './HeroLayout';

import rocket from './rocket_bg.jpeg';

export default function Hero(props) {
    return (
        <HeroLayout
            sxBackground={{
                backgroundImage: `url(${rocket})`,
                backgroundColor: '#7fc7d9', // average color of the background image.
                backgroundPosition: 'center',
            }}
        >
            <img
                style={{ display: 'none' }}
                src={rocket}
                alt="increase priority"
            />
            <Typography color="inherit" align="center" variant="h4" sx={{ mt: '50px', fontSize: '75px' }}>
                QuizHub
            </Typography>
            <span style={{width: '80px', height: '5px', margin: '8px auto 0', display: 'block', backgroundColor: '#007fff' }} />
            <Typography
                color="inherit"
                align="center"
                variant="h6"
                sx={{ mb: 4, mt: { sx: 4, sm: 10 }, fontFamily: 'Open Sans', fontWeight: '30' }}
            >
                Let your knowledge take off
            </Typography>
            <Button
                color="primary"
                variant="contained"
                size="large"
                component="a"
                href="#signup"
                sx={{ minWidth: 200, marginTop: '40px' }}
            >
                Sign up
            </Button>
            <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                Scroll to know more
            </Typography>
        </HeroLayout>
    );
};