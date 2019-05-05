import React from 'react';
import './layer-button.css';

const LayerButton = (props) => {
    
    const compStyle = {
        left: (props.count + 1) * 200 + 'px'
    }

    return(
        <button
            className='layer-button'
            onClick={() => props.onButtonClick(props.id)}
            style={compStyle}>
                toggle layer: {props.value}
        </button>
    );
}; 

export default LayerButton;