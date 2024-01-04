export function Explict({bool}){
  return(
    <>
      {
        bool === true ?(
          <div className="w-6 h-6 bg-neutral-700 rounded-sm flex justify-center items-center">
            <p className="text-center text-sm">E</p>
          </div>
        ): null
      }
    </>
  )
}