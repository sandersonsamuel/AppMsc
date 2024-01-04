import { Explict } from "./Explict"
import { ModalRating } from "./Modals/ModalRating"
import { FieldPath, QuerySnapshot, collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { databaseApp } from "../configs/firebase"
import { auth } from "../configs/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Rating } from 'flowbite-react'

export function Faixas({album, color}){

  const faixas = album.tracks.items

  const [avaliacoesUser, setAvaliacoesUser] = useState(null)
  const [mscAvaliadas, setMscAvaliadas] = useState([])

  function msToMin(ms){
    let minutos = Math.floor(ms / 1000 / 60)
    let segundos = Math.floor((ms / 1000) % 60)

    return `${minutos}:${segundos}`
  }

  useEffect(()=>{

    let avas = []

    if (avaliacoesUser) {
      Object.values(avaliacoesUser).forEach(musica => {
        if (musica.idAlbum === album.id){
          avas.push(musica)
        }}
    )}

    setMscAvaliadas(avas)

  },[avaliacoesUser])
  

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
  
    const unsubscribe = onSnapshot(doc(databaseApp, `avaliacoes/${auth.currentUser.uid}`), (docSnap) => {
      if (docSnap.exists()) {
        setAvaliacoesUser(docSnap.data().musicas)
      }
    });
  
    return () => unsubscribe();
  }, [auth.currentUser])
  


  return(
    <div className="w-100">
      {
        faixas.map((msc, index)=>(
          <div key={index} className="flex justify-center items-center mt-5 gap-3 w-full px-5">
            <div className="flex w-full md:p-5 md:shadow-2xl md:border-2 border-slate-700 cursor-pointer md:bg-slate-800 justify-between items-center md:hover:saturate-[120%] md:hover:shadow-envolve-xl" key={index}>
              <div className="px-2 overflow-hidden overflow-ellipsis whitespace-nowrap w-96">
                <h1 className="text-white text-xl overflow-hidden overflow-ellipsis whitespace-nowrap">{msc.name}</h1>
                <div className="flex gap-2 items-center">
                  <Explict bool={msc.explicit}/>
                  <h1 className="text-white text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{msc.artists[0].name}</h1>
                  {avaliacoesUser && 
                    Object.values(avaliacoesUser).find(musica => musica.idMsc === msc.id) ? 
                    (<Rating title="Você avaliou essa música">
                      <Rating.Star/>
                        <p>{Object.values(avaliacoesUser).find(musica => musica.idMsc === msc.id).nota}</p>
                    </Rating>): 
                    null
                  }
                </div>
              </div>
              
              <h1 className="text-white md:text-xl">{msToMin(msc.duration_ms)}</h1>
            </div>
            <ModalRating color={color} msc={msc} album={album}/>
          </div>
        ))
      }
    </div>
  )
}