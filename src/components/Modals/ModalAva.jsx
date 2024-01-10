import { useEffect, useState } from "react"
import { AppRating } from "../Rating";
import { Modal, Button, ModalBody, Label, Textarea } from "flowbite-react";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";
import { useRatingAlbum } from "../RatingAlbum";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { databaseApp } from "../../configs/firebase";
import { Timestamp } from "firebase/firestore";

export function ModalAva({albumInfos, alerta}){

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [textAva, setTextAva] = useState("")
  const [starAva, setStarAva] = useState(null)
  const [avaliacoesUser, setAvaliacoesUser] = useState(null);
  const [mscAvaliadas, setMscAvaliadas] = useState([]);
  const [pdAvaliar, setPdAvaliar] = useState(false);
  const [totalMsc, setTotalMsc] = useState(albumInfos.tracks.items.length)

  useEffect(()=>{
    let notas = 0

    if (mscAvaliadas) {
      mscAvaliadas.map((musica)=>{
        notas += musica.nota
      })
    }

    notas = notas/totalMsc

    setStarAva(notas.toFixed(2))

  },[mscAvaliadas])

  useEffect(() => {
    if (mscAvaliadas.length === albumInfos.tracks.items.length){
      setPdAvaliar(true);
    } else {
      setPdAvaliar(false);
    }
  }, [mscAvaliadas, albumInfos.tracks.items.length])

  useEffect(() => {
    let avas = []

    if (avaliacoesUser) {
      Object.values(avaliacoesUser).forEach(musica => {
        if (musica.idAlbum === albumInfos.id){
          avas.push(musica);
        }
      });
    }

    setMscAvaliadas(avas)

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
      alerta()
    }
    
  }
  const handleClose = () => setOpen(false)

  const handleSubmit = async () => {

    handleClose()

    const db = databaseApp
    const userDoc = doc(db, 'avaliacoes', auth.currentUser.uid);
    
    const docSnap = await getDoc(userDoc)
  
    if (!docSnap.exists()) {

      await setDoc(userDoc, {
        album: {
          [`${albumInfos.id}`]: {
            idUser: auth.currentUser.uid,
            idAlbum: albumInfos.id,
            notaAlbum: starAva,
            avaliacao: textAva,
            nameAlbum: albumInfos.name,
            dataAva: Timestamp.now(),
            InfoAlbum: albumInfos
          }
        }
      });
    } else {
      // Se o usuário já existir, só atualiza os dados
      await updateDoc(userDoc, {
        [`album.${albumInfos.id}`]: {
          idUser: auth.currentUser.uid,
          idAlbum: albumInfos.id,
          notaAlbum: starAva,
          avaliacao: textAva,
          nameAlbum: albumInfos.name,
          dataAva: Timestamp.now(),
          InfoAlbum: albumInfos
        }
      });
    }
  }

  return(
    <>
      <i onClick={handleOpen} className="fa-solid fa-pen-to-square text-2xl md:text-3xl cursor-pointer"></i>
        <Modal dismissible show={open} onClose={handleClose} >
          <Modal.Header>Avaliar "{albumInfos.name}"</Modal.Header>
          <ModalBody>
          <div className="space-y-6">

              <AppRating value={starAva} />

              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Sua avaliação" />
                </div>
                <Textarea onChange={(e)=> setTextAva(e.target.value)} id="comment" placeholder="Avalie aqui..." required rows={4} />
              </div>

            </div>
          </ModalBody>
          <Modal.Footer>
            <Button size={'sm'} onClick={handleSubmit}>Enviar</Button>
            <Button size={'sm'} color="gray" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>

        </Modal>
    </>
  )
}
