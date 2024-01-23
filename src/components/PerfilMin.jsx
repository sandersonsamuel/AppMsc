import { Link } from "react-router-dom"
import { auth } from "../configs/firebase"
import { signOut } from "firebase/auth"
import { useState } from "react"
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "flowbite-react"

export function PerfilMin(){

  const user = auth.currentUser

  if (user){
    const userName = [] = user.displayName.split(' ')

    return(
      <>
          <div className="flex gap-3 justify-center items-center md:rounded-md transition-all max-h-10">
            <Link to={'/user'} className="flex gap-2">
              <div className="flex justify-center items-center">
                <h1 className="hidden lg:block text-xl cursor-pointer">{userName[0]}</h1>
              </div>
              {user.photoURL ? <div>
                <img className="w-10 rounded-full cursor-pointer" src={user.photoURL} />
              </div>: <div className="flex text-center items-center justify-center bg-neutral-700 w-10 h-10 rounded-full font-semibold text-sm text-gray-300"><i className="fa-regular fa-user"></i></div>}
            </Link>
            <ModalLogOut/>
          </div>
      </>
    )
  }else{
    return null    
  }

}

const ModalLogOut = () =>{

  const [openModal, setOpenModal] = useState(false)

  function logOut (){
    setOpenModal(false)
    signOut(auth)
    location.reload(true)
  }

  function handleOpenModal(){
    setOpenModal(true)
  }

  function handleCloseModal(){
    setOpenModal(false)
  }
  
  return (
    <>
      <i onClick={handleOpenModal} className="fa-solid fa-right-from-bracket text-xl cursor-pointer text-red-500"></i>
      <Modal show={openModal} onClose={handleCloseModal}>
        <ModalHeader>Sair da conta</ModalHeader>
        <ModalBody>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Tem certeza que deseja sair da conta?
            </h3>
          <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4">
            <Button color="failure" onClick={logOut}>
              {"Sim, sair"}
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Não, Continuar logado
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}