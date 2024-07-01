import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import rate from "./rating";

function Hcard(props) {
    const [r, setR] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await rate(`/anime/${props.mal_id}/statistics`);
                setR(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Cleanup function, clear the value of r when component unmounts
        return () => {
            setR(null);
        };
    }, [props.mal_id]); // mal_id should be included in the dependency array to re-run the effect when it changes

    return (
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    {props.name}
                </Typography>
                <Typography>{r}</Typography>
            </CardContent>
        </Card>
    );
}

export default Hcard;
