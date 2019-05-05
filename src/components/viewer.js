import Cesium from 'cesium';

export default class NyViewer {
    //all unnecessary widgets removed
    constructor(){
        this.viewer = new Cesium.Viewer('cesiumContainer', {
            creditContainer: 'credits',
            geoCoder: false, 
            sceneModePicker: false,
            baseLayerPicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            scene3DOnly: true,
            sceneMode : Cesium.SceneMode.SCENE3D,
            terrainProvider: Cesium.createWorldTerrain()
        });

        this.tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ 
            url: Cesium.IonResource.fromAssetId(22479)
        }));

        //building colored depending on height
        this.tileset.style = new Cesium.Cesium3DTileStyle({
            color : {
                conditions : [
                    ["${height} >= 300", "rgba(45, 0, 75, 0.5)"],
                    ["${height} >= 200", "rgb(102, 71, 151)"],
                    ["${height} >= 100", "rgb(170, 162, 204)"],
                    ["${height} >= 50", "rgb(224, 226, 238)"],
                    ["${height} >= 25", "rgb(252, 230, 200)"],
                    ["${height} >= 10", "rgb(248, 176, 87)"],
                    ["${height} >= 5", "rgb(198, 106, 11)"],
                    ["true", "rgb(127, 59, 8)"]
                ]
            }
        });

        //standart imagery replaced by sentinel-2
        this.viewer.imageryLayers.remove(this.viewer.imageryLayers.get(0));
        this.viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId : 3954 }));
        
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
        this.viewer.scene.globe.enableLighting = true;
        
        //get camera to manhattan
        const initialPosition = Cesium.Cartesian3.fromDegrees(-74.01881302800248, 40.684, 1500);
        const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415);
        const homeView = {
            destination: initialPosition,
            orientation: initialOrientation,
            endTransform: Cesium.Matrix4.IDENTITY
        };
        
        this.viewer.scene.camera.setView(homeView);
            
        homeView.duration = 2.0;
        homeView.endTransform = Cesium.Matrix4.IDENTITY;

        //get initial view on home button click
        this.viewer.homeButton.viewModel.command.beforeExecute.addEventListener( (evt) => {
            evt.cancel = true;
            this.viewer.scene.camera.flyTo(homeView);
        });

        return this.viewer;
    }
};