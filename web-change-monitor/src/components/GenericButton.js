import React from 'react'

const GenericButton = ({onClick, text}) => {
    
    return (
        <button className="GenericButton" onClick={onClick}>
          {text}
        </button>
    )
}

export default GenericButton
