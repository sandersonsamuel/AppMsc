import { useEffect, useState } from "react"
import { AppRating } from "../Rating";
import { Modal, Button, ModalBody, Label, Textarea } from "flowbite-react";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";
import { deleteField, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { databaseApp } from "../../configs/firebase";
import { Timestamp } from "firebase/firestore";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { GetAvalAlbum } from "../GetAval";


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
        albuns: {
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
        [`albuns.${albumInfos.id}`]: {
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

              <div className={`w-12 border-2 ${350 - textAva.length <= 25 ? 'border-red-500 text-red-500' : 350 - textAva.length > 25 && 350 - textAva.length <=50 ? 'border-yellow-400 text-yellow-400': 'border-green-500 text-green-500'} flex items-center justify-center rounded-full`}>
                <p className="">{350 - textAva.length}</p>
              </div>

            </div>
          </ModalBody>
          <Modal.Footer>
            <div className="flex w-full justify-between">
              <div className="flex gap-2">
                <Button size={'sm'} onClick={handleSubmit} disabled={textAva.length > 350}>Enviar</Button>
                <Button size={'sm'} color="gray" onClick={handleClose}>Cancelar</Button>
              </div>
              <AlertDeleteAva setClodeModal={setOpen} albumInfos={albumInfos}/>
            </div>
          </Modal.Footer>

        </Modal>
    </>
  )
}


function AlertDeleteAva({setClodeModal, albumInfos}) {

  const [openModal, setOpenModal] = useState(false)
  const [avaliacoes, setAvaliacoes] = useState(false)
  const [isAva, setIsAva] = useState(false)

  useEffect(()=>{
    GetAvalAlbum(setAvaliacoes)
  }, [])

  useEffect(()=>{
    if (avaliacoes){
      Object.values(avaliacoes).forEach((avaliacao)=> {
        if (avaliacao.idAlbum === albumInfos.id){
          setIsAva(true)
        }
      })
    }
  }, [avaliacoes])

  const handleDeletAva = async () =>{

    setOpenModal(false)

    const db = databaseApp
    const userDoc = doc(db, 'avaliacoes', auth.currentUser.uid)

    await updateDoc(userDoc, {
      [`albuns.${albumInfos.id}`]: deleteField()
    })

    await setClodeModal(false)
  }

  return (
    <>
      {isAva && 
        <>

          <Button size={'sm'} color="failure" onClick={()=> setOpenModal(true)}>Redefinir</Button>
          
          <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Tem certeza que deseja deletar a avalição deste album?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={() => handleDeletAva()}>
                    Deletar
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          
        </>
      }
    </>
  )
}