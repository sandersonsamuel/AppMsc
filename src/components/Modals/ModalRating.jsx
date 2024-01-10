import { useState } from "react"
import { Modal, ModalBody, Button, ModalHeader } from "flowbite-react"
import { AppRating } from "../Rating"
import { databaseApp } from '../../configs/firebase'
import { auth } from "../../configs/firebase"
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc, setDoc, deleteField } from "firebase/firestore"

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

  const clearAva = async () => {
    setOpen(false)
    setRating(0)
  
    const db = databaseApp;
    const userDoc = doc(db, 'avaliacoes', auth.currentUser.uid)

    await updateDoc(userDoc, {
      [`musicas.${msc.id}`]: deleteField()
    });
  }
  
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
              <Button size={'sm'} onClick={clearAva} color="failure">Limpar</Button>
            </div>
          </Modal.Footer>
      </Modal>
    </div>
  )
}
