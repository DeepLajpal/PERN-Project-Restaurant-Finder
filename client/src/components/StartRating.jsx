import React from 'react'
import { BiSolidStar, BiStar, BiSolidStarHalf } from 'react-icons/bi';

const StartRating = ({rating}) => {

    const stars = [];
    for (let i =1 ; i <=5 ; i++ ){
        if(i<=rating){
            stars.push(< BiSolidStar key={i}/>)
        }else if (i===Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<BiSolidStarHalf key={i}/>)
        }
        else{
            stars.push(<BiStar key={i}/>)
        }
    }

  return (
    <>
        {stars}
    </>
  )
}

export default StartRating