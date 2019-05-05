import Cesium from 'cesium';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import GeoData from './components/data-sources';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MDJlZmJhZC05ZTUwLTQzYzktYTVmYS02YmZkMDlkN2IxNTciLCJpZCI6MTA1MTMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY3MjkyMDd9._VuAIhDuK0JHpCRcFc7aJ1AF4EBHxpJexBmjPqwJkME';


const firstSource = new GeoData('./features.geojson');
const secondSource = new GeoData('./features3.geojson');

//when we have all data app starts
Promise.all([
    firstSource.init(),
    secondSource.init()
]).then(data => {
    ReactDOM.render(<App data={data}/>, document.getElementById('root'));
}).catch(error => {
    console.log(error);
    ReactDOM.render(<App data={[]}/>, document.getElementById('root'));
});
