import { useState } from "react"
import { Modal, ModalBody, Button, ModalHeader } from "flowbite-react"
import { AppRating } from "../Rating"
import { databaseApp } from '../../configs/firebase'
import { auth } from "../../configs/firebase"
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, getDoc, setDoc } from "firebase/firestore"

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
    const userDoc = doc(db, 'avaliacoes', auth.currentUser.uid);
  
    // verificando se o usuário ja existe
    const docSnap = await getDoc(userDoc);
  
    if (!docSnap.exists()) {
      //Se o usuário não existir, crie a estrutura e bota os dads
      await setDoc(userDoc, {
        musicas: {
          [`${msc.id}`]: {
            idUser: auth.currentUser.uid,
            idAlbum: album.id,
            nota: rating
          }
        }
      });
    } else {
      // Se o usuário já existir, só atualiza os dados
      await updateDoc(userDoc, {
        [`musicas.${msc.id}`]: {
          idUser: auth.currentUser.uid,
          idAlbum: album.id,
          nota: rating
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
            <Button onClick={handleEnviar}>Enviar</Button>
            <Button color="gray" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}
