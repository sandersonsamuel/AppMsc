import * as React from "react";
import Rating from '@mui/material/Rating';7
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: 1,
    },
  },
  emptyStar: {
    color: '#00293b',
  },
});

export function AppRating(){

  const classes = useStyles();

  return (
    <>
      <Rating precision={0.5} size="large" icon={<StarIcon style={{ fontSize: 50 }} />} emptyIcon={
        <StarBorderIcon style={{fontSize: 50}} fontSize="inherit" className={classes.emptyStar}/>
      } />
    </>
  )
}