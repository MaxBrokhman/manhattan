import React from 'react';
import './layer-button.css';

const LayerButton = (props) => {
    
    const compStyle = {
        position: 'absolute',
        top: '20px',
        left: (props.count + 1) * 200 + 'px',
        zIndex: 20, 
        width: '150px',
        height: '40px',
        border: 'none',
        borderRadius: '30px',
        backgroundColor: 'blue',
        color: 'white'
    }

    return(
        <button 
            onClick={() => props.onButtonClick(props.id)}
            style={compStyle}>
                toggle layer: {props.value}
        </button>
    );
}; 

export default LayerButton;