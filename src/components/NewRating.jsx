import React, { useState } from 'react';
import ReactStars from 'react-stars';

export const NewRating = ({setValue}) => {

  const ratingChanged = (newRating) => {
    console.log(newRating)
  }

  return (
    <ReactStars
    count={5}
    onChange={setValue}
    size={45}
    color2={'#E3A008'} />
  )
}
