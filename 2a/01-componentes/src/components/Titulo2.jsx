

function Titulo2(props) {
  return (
    <h2 className='titulo2-container'>
        {props.texto} {props.emoji}

        {console.log(props)}
    </h2>
  )
}

export default Titulo2