import { useEffect, useState } from "react"
import { Modal, ModalBody, Button, ModalHeader } from "flowbite-react"
import { AppRating } from "../Rating"
import { databaseApp } from '../../configs/firebase'
import { auth } from "../../configs/firebase"
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc, setDoc, deleteField } from "firebase/firestore"
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { GetAvalAlbum } from "../GetAval"

export const ModalRating = ({color, msc, album}) => {

  const [open, setOpen] = useState(false)
  const [starAva, setStarAva] = useState(null)
  const [rating, setRating] = useState(0)

  const navigate = useNavigate()

  const handleOpen = () => {
    if (!auth.currentUser) {
      navigate(`/login`)
    }
    setOpen(true)
  }

  const handleClose = () => setOpen(false)
  
  const handleEnviar = async () => {

    handleClose()
  
    const db = databaseApp;
    const userDoc = doc(db, 'avaliacoes', auth.currentUser.uid)
  
    // verificando se o usuário ja existe
    const docSnap = await getDoc(userDoc);
  
    if (!docSnap.exists()) {
      //Se o usuário não existir, crie a estrutura e bota os dads
      await setDoc(userDoc, {
        musicas: {
          [`${msc.id}`]: {
            idUser: auth.currentUser.uid,
            idAlbum: album.id,
            nota: rating,
            idMsc: msc.id,
            mscInfos: msc

          }
        }
      });
    } else {
      // Se o usuário já existir, só atualiza os dados
      await updateDoc(userDoc, {
        [`musicas.${msc.id}`]: {
          idUser: auth.currentUser.uid,
          idAlbum: album.id,
          nota: rating,
          idMsc: msc.id,
          mscInfos: msc

        }
      });
    }
  }
  
  

  return (
    <div>
      <i onClick={handleOpen} style={{color: color}} className="fa-solid fa-circle-plus text-xl md:text-3xl hover:scale-110 cursor-pointer transition"></i>
      <Modal dismissible show={open} onClose={handleClose}>
        <ModalHeader>
          Avaliar "{msc.name}"
        </ModalHeader>
        <ModalBody>
          <AppRating setRating={setRating} rating={rating}/>
        </ModalBody>
        <Modal.Footer>
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                <Button size={'sm'} onClick={handleEnviar}>Enviar</Button>
                <Button size={'sm'} color="gray" onClick={handleClose}>Cancelar</Button>
              </div>
              <DeletAlert msc={msc} album={album} setRating={setRating} CloseModal={handleClose}/>
            </div>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

function DeletAlert({msc, album, setRating, CloseModal}) {

  const [openModal, setOpenModal] = useState(false)
  const [avaliacoes, setAvaliacoes] = useState(null)
  const [isAva, setIsAva] = useState(false)

  useEffect(()=>{

    GetAvalAlbum(setAvaliacoes)

  }, [])
  useEffect(()=>{
    if (avaliacoes) {
      if (album) {
        Object.values(avaliacoes).forEach((avaliacao)=>{
          if(avaliacao.idAlbum == album.id){
            setIsAva(true)
          }
        })
        
      }
    }
  },[avaliacoes])

  const clearAva = async () => {

    setOpenModal(false)
    setRating(0)
  
    const db = databaseApp;
    const userDoc = doc(db, 'avaliacoes', auth.currentUser.uid)

    await updateDoc(userDoc, {
      [`musicas.${msc.id}`]: deleteField()
    })
    
    if (isAva) {
      await updateDoc(userDoc, {
        [`albuns.${album.id}`]: deleteField()
      })
    }

    await CloseModal()
  }

  return (
    <>
      <Button onClick={()=> setOpenModal(true)} size={'sm'} color="failure">Limpar</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Tem certeza que deseja limpar a avaliacão? {isAva && 'isso irá apagar a avaliação deste album'} 
            </h3>
            <div className="flex justify-center gap-4">
              <Button size={'sm'} color="failure" onClick={() => clearAva()}>
                Apagar
              </Button>
              <Button size={'sm'} color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
