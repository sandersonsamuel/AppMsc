import { Rating, RatingStar } from 'flowbite-react'
import { Accordion } from 'flowbite-react'
import { Alert } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi';

export const ReviewAlbum = ({review}) => {
  if (review) {
    return (
      <Accordion className='mt-5'>
        <Accordion.Panel>
        <Accordion.Title>
          <div className='flex gap-2'>
            <p>Review do Album</p>

            <Rating>
              <RatingStar/>
              {review.notaAlbum}
            </Rating>

          </div>
          </Accordion.Title>
        <Accordion.Content>
          <div className=''>
            <div className='justify-center flex items-center gap-1'>
            </div>
            <p className='text-justify break-words'>{review && review.avaliacao}</p>
          </div>
        </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      
    ) 
  }
}

{/* <div className='w-full flex justify-center mt-5'>
        <div className='w-2/3 min-h-36 p-3 px-8 bg-slate-600 rounded-lg'>
          <p className='text-center text-xl font-semibold'>Sua avaliação</p>
          <div className=''>
            <div className='justify-center flex items-center gap-1'>
              <Rating>
                <RatingStar/>
              </Rating>
              {review && review.notaAlbum}
            </div>
            <p className='text-justify break-words'>{review && review.avaliacao}</p>
          </div>
        </div>
      </div> */}
