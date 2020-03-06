import React from 'react'
import { Button } from 'react-bootstrap'

const ToggleButton = ({ onToggle })=>{
    return (
        <Button onClick={onToggle} type="primary" >
            toggle
        </Button>
    )
}
export default ToggleButton;