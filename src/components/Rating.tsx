import * as React from "react";
import Rating from '@mui/material/Rating';7
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';

export function AppRating({color}){

  return (
    <>
      <Rating precision={0.5} size="large"/>
    </>
  )
}