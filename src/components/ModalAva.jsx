import { useState } from "react"
import { Dialog, TextField } from "@mui/material"
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from "@mui/material";
import { AppRating } from "./Rating";

export function ModalAva(){

  const theme = createTheme({
    components:{
      MuiDialog:{
        styleOverrides:{
          paper:{
            backgroundColor: '#232323',
            color: 'white'
          }
        }
      },
      MuiTextField:{
        styleOverrides:{
          root: {
            '& .MuiInputBase-input': {
              color: 'white', // texto
            },
            '& label.Mui-focused': {
              color: 'white', // rótulo quando focado
            },
            '& .MuiInputLabel-root': {
              color: 'white', // rótulo
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // borda
              },
              '&:hover fieldset': {
                borderColor: 'white', // borda ao passar o mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // borda ao focar
              },
            },
          },
        }
      }
    }
  })

  const [open, setOpen] = useState(false)
  const [textAva, setTextAva] = useState("")
  const [starAva, setStarAva] = useState(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return(
    <>
      <div>
        <i onClick={handleOpen} className="text-2xl md:text-3xl fa-solid fa-pen-to-square p-2 sm:p-3 rounded-sm hover:brightness-90 cursor-pointer" title='Avaliar Album'></i>
        <ThemeProvider theme={theme}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Avaliação"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" color={'white'}>
              </DialogContentText>
              <AppRating/>
                <TextField
                autoFocus
                margin="dense"
                id="avaliacao"
                label="Digite sua avaliação aqui"
                type="text"
                fullWidth
                value={textAva}
                onChange={(e)=> setTextAva(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>Cancelar</Button>
              <Button onClick={handleClose} autoFocus>Enviar</Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    </>
  )
}