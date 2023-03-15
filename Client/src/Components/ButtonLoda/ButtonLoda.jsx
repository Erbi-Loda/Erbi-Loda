import './ButtonLoda.style.css'


export default function ButtonLoda({text, icon,fs,type}){

    return(
        <>
            <button id="estado-cargando" className={type==="small"?'buttonLodaSmall':'buttonLoda'}>
                <span style={fs?{fontSize:fs}:{fontSize:18}}>{icon} {text}</span>
            </button>
        </>
    )
}