import React from 'react';
import NyViewer from '../viewer';
import LayerButton from '../layer-button';
import './app.css';

export default class App extends React.Component {

    //save geojson data to app property
    constructor(props){

        super();

        this.data = props.data;

        //width and height are saved to rerender on browser resize
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.viewer = {};

        this.onButtonClick = this.onButtonClick.bind(this);

        window.onresize = () => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
    }
    
    //init cesium and add layers
    componentDidMount(){
        this.viewer = new NyViewer();
        this.data.forEach(item => {
            this.viewer.dataSources.add(item);
        });
    }

    //add or remove geojson data from viewer, data stays in data property
    onButtonClick(id){
        let dataToToggle;
        
        this.data.forEach(item => {
            if(item.entities.id === id){
                dataToToggle = item;
            }
        });

        if(this.viewer.dataSources.contains(dataToToggle)){
            this.viewer.dataSources.remove(dataToToggle);
        } else{
            this.viewer.dataSources.add(dataToToggle);
        }
        
    }

    render(){

        const compStyle = {
            width: this.state.width,
            height: this.state.height
        };

        const data = this.data;
        const buttons = () => {
            return data.map((item, i)=> {
                return (
                    <LayerButton key={item.entities.id} id={item.entities.id} count={i} onButtonClick={this.onButtonClick} value={item.name}/>
                );
            });
        };

        return (
            <div id="cesiumContainer" style={compStyle}>
                {buttons()}
            </div>
        );
    }
};