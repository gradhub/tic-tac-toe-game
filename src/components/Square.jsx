function Square({ value, setSquareValue, isEndGame}) {
  const handleClick = () => {
    if(isEndGame)
      return
    
    setSquareValue()
  }

  return(
      <button style={value !== '-' ? {color: '#282c34'} : {color: '#f0f0f5'}} className="square" 
        onClick={
          handleClick
      }>
        {value}
      </button>
  )
}

export default Square