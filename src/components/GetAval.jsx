import { doc, onSnapshot } from "firebase/firestore";
import { auth, databaseApp } from "../configs/firebase";
import { useState } from "react";

export const GetAvalAlbum = (setAvaliacoesUser) => {
  if (!auth.currentUser) {
    return;
  }

  return onSnapshot(doc(databaseApp, 'avaliacoes/' + auth.currentUser.uid), (docSnap) => {
    if (docSnap.exists()) {
      setAvaliacoesUser(docSnap.data().albuns)
    }
  });
}

export const GetAvalMusica = (setAvaliacoesUser) => {
  if (!auth.currentUser){
    return
  }

  return onSnapshot(doc(databaseApp, 'avaliacoes/' + auth.currentUser.uid), (docSnap)=>{
    if (docSnap.exists()){
      setAvaliacoesUser(docSnap.data().musicas)
    }
  })
}
