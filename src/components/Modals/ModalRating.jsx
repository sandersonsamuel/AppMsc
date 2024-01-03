import { useState } from "react"
import { Modal, ModalBody, Button, ModalHeader } from "flowbite-react"
import { AppRating } from "../Rating"
import { databaseApp } from '../../configs/firebase'
import { auth } from "../../configs/firebase"
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"

export const ModalRating = ({color, msc}) => {

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


  const handleEnviar = async () =>{

    handleClose()

    const db = databaseApp
    const minhaColecao = collection(db, 'avaliacoes')

    await addDoc(minhaColecao, {
      idUser: auth.currentUser.uid,
      
      album: {
        avaliacaoText: '',
        data: '',
        idAlbum: '',
        nota: ''
      },
      musica: {
        idAlbum: '',
        idMusica: '',
        nota: ''
      }
    });



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
