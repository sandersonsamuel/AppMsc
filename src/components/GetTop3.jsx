import { doc, onSnapshot } from "firebase/firestore";
import { auth, databaseApp } from "../configs/firebase";

export const GetTop3Musicas = (setMusicas) => {
  if (!auth.currentUser){
    return null
  }
  return onSnapshot(doc(databaseApp, 'avaliacoes/' + auth.currentUser.uid), (docSnap)=>{
    if (docSnap.exists()) {
      setMusicas(docSnap.data().top3Musicas)
    }
  })
}


export const GetTop3Albuns = (setAlbuns) => {
  if (!auth.currentUser){
    return null
  }
  return onSnapshot(doc(databaseApp, 'avaliacoes/' + auth.currentUser.uid), (docSnap)=>{
    console.log
    if (docSnap.exists()) {
      setAlbuns(docSnap.data().top3Albuns)
    }
  })
}