import capaAlbumJesusIsKing from '../assets/jesusAlbumC.png'

export function AlbumGirando(){

  return(
    <>
      <div className="flex w-full flex-col items-center">
          <img src={capaAlbumJesusIsKing} 
          className="w-[14rem] md:w-[30rem] animate-spin-super-slow" alt="Capa do album jesus is king (kanye west)" />
      </div>
    </>
  )
}
