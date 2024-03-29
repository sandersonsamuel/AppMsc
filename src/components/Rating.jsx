import { Rating } from 'flowbite-react';
import { useState } from 'react';
import ReactStars from 'react-stars';
import { Rate } from 'antd';
import '../App.css'

export function AppRating({value, setRating, rating}) {

  const [hover, setHover] = useState(0)

  if (value) {
    return (
      <Rating className='flex my-2' size='md'>
        <Rating.Star filled={value >= 1}/>
        <Rating.Star filled={value >= 2}/>
        <Rating.Star filled={value >= 3}/>
        <Rating.Star filled={value >= 4}/>
        <Rating.Star filled={value >= 5}/>
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{value} de 5</p>
      </Rating>

    )
  }else{
  
    return (
      <Rate style={{color: '#F09F00'}} className='text-3xl' onChange={setRating} allowHalf/>
    )
    
  }
}