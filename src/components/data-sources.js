import Cesium from 'cesium';

//load geojson
export default class GeoData {
    constructor(source){
        this.data = Cesium.GeoJsonDataSource.load(source);
    }
    init(){
        return this.data.then(data => {
            const geoEntities = data.entities.values;
            geoEntities.forEach(item => {
                if(Cesium.defined(item.polygon)){
                    item.polygon.material = Cesium.Color.fromRandom({
                        red : 0.1,
                        maximumGreen : 0.5,
                        minimumBlue : 0.5,
                        alpha : 0.4
                    });
                } else if(Cesium.defined(item.billboard)){
                    //get billboards from second layer visible
                    item.billboard.color = Cesium.Color.YELLOW;
                    const newPosition = item.position.getValue({});
                    newPosition.z += 200;
                    item.position.setValue(newPosition);
                }
            });

            return data;
        });
    }
};