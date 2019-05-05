import Cesium from 'cesium';

//load geojson
export default class GeoData {
    constructor(source){
        this.data = Cesium.GeoJsonDataSource.load(source);
    }
    init(){
        return this.data.then(data => {
            const geoEntities = data.entities.values;
            geoEntities.map(item => {
                if(Cesium.defined(item.polygon)){
                    item.polygon.material = Cesium.Color.fromRandom({
                        red : 0.3,
                        maximumGreen : 0.7,
                        minimumBlue : 0.3,
                        alpha : 0.4
                    });
                }
            });

            return data;
        });
    }
};