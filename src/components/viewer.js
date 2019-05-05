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

        this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ 
            url: Cesium.IonResource.fromAssetId(22478)
        }));

        //standart imagery replaced by sentinel-2
        this.viewer.imageryLayers.remove(this.viewer.imageryLayers.get(0));
        this.viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId : 3954 }));
        
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
        this.viewer.scene.globe.enableLighting = true;
        
        //get camera to manhattan
        const initialPosition = Cesium.Cartesian3.fromDegrees(-74.01881302800248, 40.69114333714821, 753);
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