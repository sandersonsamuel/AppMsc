import { Rating } from 'flowbite-react';
import { useState } from 'react';

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
      <Rating className="flex" size='md'>
        {[...Array(5)].map((star, i) => {
          const ratingValue = (i + 1)
          return (
            <Rating.Star 
              key={i}
              filled={hover >= ratingValue || rating >= ratingValue} 
              onClick={()=> rating != ratingValue ? setRating(ratingValue) : setRating(0)}
              onMouseEnter={()=> setHover(ratingValue)} 
              onMouseLeave={()=> setHover(0)}
            />
          );
        })}
      </Rating>
    )
  }
}