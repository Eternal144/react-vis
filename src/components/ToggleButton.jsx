import React from 'react'

const ToggleButton = ({ onToggle })=>{
    return (
        <button onClick={onToggle}>
            toggle
        </button>
    )
}
export default ToggleButton;