import React, { useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader, Button } from 'flowbite-react'

export const ModalTop3 = () => {

  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }

  const handleSubmit = () =>{
    setOpen(false)
  }

  return (
    <>
      <i onClick={handleOpen} className="fa-solid fa-circle-plus text-3xl cursor-pointer hover:scale-125 transition hover:text-blue-500"></i>
      <Modal show={open} onClose={handleClose}>
        <div className='text-white'>
          <ModalHeader>
            Escolha seu Top 3
          </ModalHeader>
          <ModalBody>

            <div className='flex flex-col gap-3 items-start'>  
              <Button>Adicionar top 1</Button>
              <Button>Adicionar top 2</Button>
              <Button>Adicionar top 3</Button>
            </div>

          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>Adicionar</Button>
            <Button onClick={handleClose} color='gray'>Cancelar</Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  )
}
