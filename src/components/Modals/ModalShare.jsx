import { Modal, ModalBody, Button, ModalHeader, Alert, Rating, RatingStar, Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import React, { useRef, useState } from 'react';
import { HiInformationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import DomToImage from "dom-to-image";

import FundoAva44 from '../../assets/FundoMMAvaliação442x.png'
import FundoAva169 from '../../assets/FundoMMAvaliação.png'

function Alerta() {
  return (
    <Alert style={{ zIndex: 9999 }} className='mb-5 fixed top-2 right-2' color="success" icon={HiInformationCircle}>
      Link copiado para a área de transferência
    </Alert>
  );
}

export const ModalShare = ({ review, avaliacoesDoAlbum, ratingAlbum }) => {

  const divRef = useRef()

  const [openModal, setOpenModal] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const textShare = encodeURIComponent(`Minha avaliação do álbum "${review.nameAlbum}" foi de ${ratingAlbum.toFixed(2)}⭐. Avalie e compartilhe sua opinião em: https://MelodyMingler.vercel.app/album/${review.idAlbum}`);
  const textShareWpp = encodeURIComponent(`Minha avaliação do álbum "${review.nameAlbum}" foi de ${ratingAlbum.toFixed(2)} estrelas. Avalie e compartilhe sua opinião em: https://MelodyMingler.vercel.app/album/${review.idAlbum}`);


  const handleShowAlert = () => {
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://melodymingler.vercel.app/album/${review.idAlbum}`)
      .then(() => handleShowAlert())
      .catch(err => alert('Algo deu errado', err));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const convertDivToImage = (w, h) => {
    divRef.current.style.display = 'flex';

    divRef.current.style.width = `${w}px`
    divRef.current.style.height = `${h}px`

    if(h == 1500){
      divRef.current.style.backgroundImage = `url('${FundoAva44}')`
    }else{
      divRef.current.style.backgroundImage = `url('${FundoAva169}')`
    }

    

    DomToImage.toPng(divRef.current)
      .then(function (dataUrl) {
        let link = document.createElement('a');
        link.download = `AvaliacaoDoAlbum${review.nameAlbum}MelodyMingler`
        link.href = dataUrl;
        link.click();
        divRef.current.style.display = 'none';

      })
      .catch(function (error) {
        console.error('Erro ao converter div para imagem!', error);
        divRef.current.style.display = 'none';

      });
  };
  
  

  return (
    <>
      {alerta && <Alerta />}
      <i onClick={handleOpenModal} className="fa-solid fa-up-right-from-square hover:scale-[1.15]"></i>
      <Modal show={openModal} onClose={handleCloseModal}>
        <ModalHeader>Compartilhar Review do Album</ModalHeader>
        <ModalBody>
          <div className="text-white flex flex-col items-center">
            <div className="text-5xl md:text-6xl flex text-slate-300 justify-center gap-3 my-1">
              <a className='fa-brands fa-square-twitter hover:scale-110 transition' href={`https://twitter.com/intent/tweet?text=${textShare}`} target="_blank"></a>
              <a className="fa-brands fa-square-whatsapp hover:scale-110 transition" href={`https://wa.me/?text=${textShareWpp}`} target="_blank"></a>
            </div>
            <div className="w-full flex flex-col items-center">
              <div className="w-full h-12 rounded-full my-2 bg-neutral-800 flex flex-col justify-center md:items-center px-5">
                <p className="overflow-auto">{`http://melodymingler.vercel.app/album/${review.idAlbum}`}</p>
              </div>
              <div className="flex justify-between md:justify-evenly gap-2">
                <Button size={'sm'} onClick={handleCopy}>Copiar</Button>
                <Link to={`http://melodymingler.vercel.app/album/${review.idAlbum}`}><Button color="gray">Seguir para o link</Button></Link>
              </div>
              
              <div className="w-full flex items-center flex-col m-2 bg-slate-600 p-3 rounded-lg">
                <p className="text-center text-xl font-bold">Baixar uma Imagem da sua Avaliação</p>
                <div className="flex flex-col md:flex-row md:gap-2">
                  <button
                  onClick={()=> convertDivToImage(1080, 1920)} 
                  className="my-2 px-3 p-2 rounded-md border border-gray-400 transition-colors hover:bg-cyan-600 duration-500"
                  >Imagem 16:9</button>
                  
                  <button
                  onClick={()=> convertDivToImage(1500, 1500)} 
                  className="my-2 px-3 p-2 rounded-md border border-gray-400 transition-colors hover:bg-cyan-600 duration-500"
                  >Imagem 4:4</button>
                </div>
              </div>

              <div ref={divRef} className={`p-40 border-4 border-slate-800`}>
                
                <div className="w-full h-full items-center gap-2 flex flex-col justify-center">
                  <p className="text-7xl font-bold mb-10">MelodyMingler</p>
                  <img className="w-[45rem] border-8 border-slate-700 rounded-xl" src={review.InfoAlbum.images[0].url}/>
                  <p className="font-semibold text-7xl text-center">{review.nameAlbum}</p>
                  <p className="text-4xl">by: {review.InfoAlbum.artists[0].name}</p>

                  <div className="flex font-bold justify-center items-center text-5xl my-1">
                    <i className="fa-solid fa-star text-[#E3A008]"></i>
                    <p>{ratingAlbum.toFixed(2)}</p>
                  </div>
                  
                  <p className="text-justify mt-2 text-4xl font-thin">{review.avaliacao}</p>
                </div>

              </div>

            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
