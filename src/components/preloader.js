import React from 'react';


export default class Preloader extends React.Component {
    
    state ={
        display: ''
    }
    

    dissapear(){
        this.setState({
            display: 'none'
        });
    }

    render(){
        console.log('render');
        setTimeout(() => {
            this.dissapear();
        }, 4000);
        const compStyle = {
            display: this.state.display,
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'black',
            width: window.innerWidth,
            height: window.innerHeight,
            position: 'absolute',
            verticalAlign: 'middle',
            fontSize: '50px'
        }
        return(
            <div className="preloader" style={compStyle}>
                Welcome to New-York
            </div>
        );
    }
}

