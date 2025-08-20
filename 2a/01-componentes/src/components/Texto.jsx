import './Texto.css'

function Texto(props) {
  return (
    <div className='texto-container'>
        <p>{props.texto}</p>
    </div>
  )
}

export default Texto