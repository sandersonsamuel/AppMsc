import { Link } from "react-router-dom";
import { useRef } from "react";
import AvatarEditor from "react-avatar-editor";

export function Artistas({artistas, pesquisa}) {
  const editorRef = useRef(null);

  if (artistas){
    return(
      <>
        {artistas.map((artista, index)=>(
          <Link to={`artista/albuns/${artista.id}`} key={index}>
            <div className="md:mx-10 gap-5 flex w-100 md:p-2 shadow-2xl border-2 border-slate-700 m-3 items-center bg-slate-800 hover:saturate-[120%] hover:shadow-envolve-xl">
              {artista.images && artista.images[0] && artista.images[0].url ? 
              <div className="w-16 h-16">
                <AvatarEditor
                  ref={editorRef}
                  image={artista.images[0].url}
                  width={64}
                  height={64}
                  border={0}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={1.2}
                  rotate={0}
                />
              </div>
                : <div className="min-w-16 h-16 bg-neutral-700 flex justify-center items-center text-2xl">?</div>}
              <h1 className="text-2xl whitespace-nowrap overflow-hidden overflow-ellipsis">{artista.name}</h1>
            </div>
          </Link>
        ))}
      </>
    )
  }else{
    return null
  }
}
