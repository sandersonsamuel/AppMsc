import { Rating, RatingStar } from 'flowbite-react'
import { Accordion } from 'flowbite-react'
import { useEffect, useState } from 'react';
import {GetAvalMusica } from './GetAval';
import { Link } from 'react-router-dom';

export const ReviewAlbum = ({review, complete}) => {

  const [avaliacoes, setAvaliacoes] = useState(null)
  const [avaliacoesDoAlbum, setAvaliacoesDoAlbum] = useState(null)
  const [ratingAlbum, setRatingAlbum] = useState(0)

  console.log(review);

  useEffect(()=>{
    if (avaliacoesDoAlbum) {
      let ratingsMsc = 0

      Object.values(avaliacoesDoAlbum).map((avaliacao)=>{
        ratingsMsc += avaliacao.nota
      })

      setRatingAlbum(ratingsMsc/Object.values(avaliacoesDoAlbum).length)
    }
  }, [avaliacoesDoAlbum])

  useEffect(()=>{
    GetAvalMusica(setAvaliacoes)
  },[])

  useEffect(()=>{
    if (avaliacoes){
    setAvaliacoesDoAlbum(Object.values(avaliacoes).filter((avaliacao)=> avaliacao.idAlbum === review.idAlbum))
    }

  }, [avaliacoes])

  if (review) {
    return (
      <Accordion className='mt-5'>
        <Accordion.Panel>
        <Accordion.Title>
          <div className='flex gap-2 items-center'>
            {complete && 
              <Link to={`/album/${review.idAlbum}`}>
              <i className="text-white fa-solid fa-arrow-up-right-from-square mr-1 hover:scale-125"></i>
            </Link>
            }
            
            {complete && <img className='w-16' src={review.InfoAlbum.images[0].url} alt={"Capa do album "+ review.nameAlbum} />}

            <p className='text-wrap'>{!complete ? 'Review do Album' : review.nameAlbum}</p>

            {!complete && 
            <Rating>
              <RatingStar/>
              {ratingAlbum.toFixed(2)}
            </Rating>}

          </div>
          </Accordion.Title>
        <Accordion.Content>
          <div className='w-full flex items-center justify-center mb-3'>
          {complete && 
              <Rating>
                <RatingStar/>
                {ratingAlbum.toFixed(2)}
              </Rating>}
          </div>
          <div className=''>
            <div className='justify-center flex items-center gap-1'>
            </div>
            <p className='text-justify break-words'>{review && review.avaliacao}</p>
          </div>
        </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      
    ) 
  }else{
    return null
  }
}

