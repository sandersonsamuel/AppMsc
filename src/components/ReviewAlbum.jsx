import { Modal, Rating, RatingStar } from 'flowbite-react'
import { Accordion } from 'flowbite-react'
import { useEffect, useState } from 'react';
import {GetAvalMusica } from './GetAval';
import { Link } from 'react-router-dom';
import { ModalShare } from './Modals/ModalShare';

export const ReviewAlbum = ({review, complete}) => {

  const [avaliacoes, setAvaliacoes] = useState(null)
  const [avaliacoesDoAlbum, setAvaliacoesDoAlbum] = useState(null)
  const [ratingAlbum, setRatingAlbum] = useState(0)

  useEffect(()=>{
    if (avaliacoesDoAlbum) {
      let ratingsMsc = 0

      Object.values(avaliacoesDoAlbum).map((avaliacao)=>{
        ratingsMsc += avaliacao.nota
      })

      setRatingAlbum(ratingsMsc/Object.values(avaliacoesDoAlbum).length.toFixed(2))
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
      <Accordion className='mt-5' collapseAll>
        <Accordion.Panel>
        <Accordion.Title>
          
          <div className='flex gap-5 items-center justify-center'>


            <div className='flex flex-col md:flex-row gap-2'>
              
              <div className='flex w-full items-center gap-5 md:gap-2'>
                
              <ModalShare review={review} avaliacoesDoAlbum={avaliacoesDoAlbum} ratingAlbum={ratingAlbum}/>

                
                {complete && <Link to={`/album/${review.idAlbum}`}><img className='w-12 border-2 border-slate-400 rounded-md' src={review.InfoAlbum.images[0].url} alt={"Capa do album "+ review.nameAlbum} /></Link>}

                {complete && 
                  <Rating>
                    <RatingStar/>
                    {ratingAlbum.toFixed(2)}
                  </Rating>}

                <div className='hidden md:block'>
                  <p className='text-wrap'>{!complete ? 'Review do Album' : review.nameAlbum}</p>
                </div>
              </div>

              <div className='md:hidden'>
                <p className='text-wrap text-center'>{!complete ? 'Review do Album' : review.nameAlbum}</p>
              </div>


              {!complete && 
              <Rating>
                <RatingStar/>
                {ratingAlbum.toFixed(2)}
              </Rating>}

            </div>

          </div>

          
          </Accordion.Title>
        <Accordion.Content>
          <div className='w-full flex items-center justify-center mb-3'>
          
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

