import { useEffect, useState } from "react"
import { AppRating } from "../Rating";
import { Modal, Button, ModalBody, Label, Textarea } from "flowbite-react";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";
import { useRatingAlbum } from "../RatingAlbum";
import { doc, onSnapshot } from "firebase/firestore";
import { databaseApp } from "../../configs/firebase";

export function ModalAva({albumInfos}){

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [textAva, setTextAva] = useState("")
  const [starAva, setStarAva] = useState(null)
  const [avaliacoesUser, setAvaliacoesUser] = useState(null);
  const [mscAvaliadas, setMscAvaliadas] = useState([]);
  const [pdAvaliar, setPdAvaliar] = useState(false);

  useEffect(() => {
    if (mscAvaliadas.length === albumInfos.tracks.items.length){
      setPdAvaliar(true);
    } else {
      setPdAvaliar(false);
    }
  }, [mscAvaliadas, albumInfos.tracks.items.length]);

  useEffect(() => {
    let avas = [];

    if (avaliacoesUser) {
      Object.values(avaliacoesUser).forEach(musica => {
        if (musica.idAlbum === albumInfos.id){
          avas.push(musica);
        }
      });
    }

    setMscAvaliadas(avas);
  }, [avaliacoesUser]);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    const unsubscribe = onSnapshot(doc(databaseApp, `avaliacoes/${auth.currentUser.uid}`), (docSnap) => {
      if (docSnap.exists()) {
        setAvaliacoesUser(docSnap.data().musicas);
      }
    });

    return () => unsubscribe();
  }, [auth.currentUser]);


  const handleOpen = () => {
    if (!auth.currentUser) {
      navigate(`/login`)
    }

    if(pdAvaliar){
      setOpen(true)
    }else{
      alert('Você precisa avaliar todas as músicas antes de avaliar o album por completo')
    }
    
  }
  const handleClose = () => setOpen(false)

  const handleSubmit = () => {

    handleClose()
    
  }

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
            <Button onClick={handleSubmit}>Enviar</Button>
            <Button color="gray" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>

        </Modal>
    </>
  )
}
