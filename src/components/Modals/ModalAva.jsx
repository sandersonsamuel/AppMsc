import { useState } from "react"
import { AppRating } from "../Rating";
import { Modal, Button, ModalBody, Label, Textarea } from "flowbite-react";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";

export function ModalAva({albumInfos}){

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [textAva, setTextAva] = useState("")
  const [starAva, setStarAva] = useState(null)

  const handleOpen = () => {
    if (!auth.currentUser) {
      navigate(`/login`)
    }
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return(
    <>
      <i onClick={handleOpen} className="fa-solid fa-pen-to-square text-2xl md:text-3xl cursor-pointer"></i>
        <Modal dismissible show={open} onClose={handleClose} >
          <Modal.Header>Avaliar "{albumInfos.name}"</Modal.Header>
          <ModalBody>
          <div className="space-y-6">

              <AppRating value={3} />

              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Sua avaliação" />
                </div>
                <Textarea id="comment" placeholder="Avalie aqui..." required rows={4} />
              </div>

            </div>
          </ModalBody>
          <Modal.Footer>
            <Button onClick={handleClose}>Enviar</Button>
            <Button color="gray" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>

        </Modal>
    </>
  )
}