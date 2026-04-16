import { Reactive, reactive, ref, Ref } from "vue"
import * as THREE from "three";
import { CatmullRomCurve3, Vector3, Vector2, Raycaster, PerspectiveCamera, WebGLRenderer } from "three"
import ThreejsOverlayView from "@ubilabs/threejs-overlay-view"
import { Line2 } from "three/examples/jsm/lines/Line2.js"
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GMarker, GMarkerType, Latlng, MapBusLine, MapBusLineSegment } from "./GoogleMap.model"
import { GMapStore } from "@/stores/map/GMapStore"


// 公車延路線動畫
export class GoogleThreeOverlayRunCar {

    // config
    private IsMove3dModel?: boolean = true;//是否打開公車動態
    private currentMove_3DModellatlng?: any;// 移動3d model 的經緯度

    // input 
    private InitPoint?: any;// 初始點
    private MapPoints?: Array<any> = [];// 路線點資料
    private LineColor?: number = 0xff7b70c7;//預設紫色
    private LineWidth?: number = 4;//線寬
    private MapObject?: any;// 地圖物件


    // 內部參數
    private Overlay: Reactive<any>;//圖層
    private OverlayScene: Reactive<any>;// 場景
    private Target3DModel: Reactive<any>;// 載入模型
    private RouterLineCurve: Reactive<any>;// three 路線資料 3維資料
    private RouterLineGeometry: Reactive<any>;// three 路線3d幾何資料
    private ModelName?: string = 'car03.gltf';// 模型名稱
    private ModelUrl?: string = '';//模型全路徑
    private AnimatHour = 3600000  // 一小時 豪秒
    private Tangent = new Vector3(0, -1, 0)// 延線方向

    public markerList?: Ref<any>

    // 多公車同時出現
    public dynamicBusLine?: MapBusLine;

    // 公車路線各站點線段
    public busLineSegments?: MapBusLineSegment[];

    constructor(map, initPoint, color?: number, width?: number) {
        if (map == null)
            return;
        if (initPoint == null)
            return;
        this.MapObject = map;
        this.InitPoint = initPoint;
        this.markerList = ref([]);

        if (color != null)
            this.LineColor = color;
        if (width != null)
            this.LineWidth = width;

        this.init();
    }

    private init() {
        this.ModelUrl = this.ModelName.getFile();
        this.Overlay = new ThreejsOverlayView(this.InitPoint);
        this.Overlay.setMap(this.MapObject);
        this.OverlayScene = this.Overlay.getScene();
    }
    // 經緯度轉向量
    private convertLatLngToVector3(latlng) {
        if (this.Overlay == null)
            return null;
        return this.Overlay.latLngAltToVector3(latlng);
    }
    // 向量轉經緯度
    private convertVector3ToLatLng(vector3) {
        if (this.Overlay == null)
            return null;
        let latlng = this.Overlay.vector3ToLatLngAlt(vector3);
        return latlng;
    }
    // 載入模型
    private async load3DModel(url) {
        const loader = new GLTFLoader()
        const object = await loader.loadAsync(url)
        const group = object.scene
        group.scale.setScalar(20)
        return group
    }
    private createLineGeometry() {
        let self = this;
        let routePoint = this.MapPoints;
        // 經緯度轉3維座標
        const vectorPoints = routePoint.map((p) => self.convertLatLngToVector3(p));
        self.RouterLineCurve = new CatmullRomCurve3(vectorPoints, false, 'catmullrom', 0.3);

        // 將點拆密集轉3d幾何
        const expandPoints = self.RouterLineCurve.getSpacedPoints(self.RouterLineCurve.points.length * 10)
        const positions = expandPoints.map((point) => point.toArray()).flat()
        self.RouterLineGeometry = new Line2(
            new LineGeometry().setPositions(positions),
            new LineMaterial({
                color: self.LineColor,
                linewidth: self.LineWidth
            })
        )
    }
    private createMultiLineGeometry() {
        let self = this;

        let line = 0.1;
        for (let i = 0; i < this.dynamicBusLine.DynamicBusLatLngs?.length; i++) {

            let x = this.dynamicBusLine.DynamicBusLatLngs[i];
            let routePoint = x.getStartLinePoint();
            if (routePoint.length <= 1)
                continue;


            // 經緯度轉3維座標
            const vectorPoints = routePoint.map((p) => self.convertLatLngToVector3(p));
            x.treeJsRouterLineCurve = new CatmullRomCurve3(vectorPoints, false, 'catmullrom', 0.3);

            // 將點拆密集轉3d幾何
            if (x.treeJsRouterLineCurve != undefined && x.treeJsRouterLineCurve != null) {
                const expandPoints = x.treeJsRouterLineCurve?.getSpacedPoints(x.treeJsRouterLineCurve?.points.length * 10)
                const positions = expandPoints.map((point) => point.toArray()).flat()
                x.treeJsRouterLineGeometry = new Line2(
                    new LineGeometry().setPositions(positions),
                    new LineMaterial({
                        color: self.LineColor,
                        linewidth: line
                    })
                )
            }
        };
    }
    // 計算當前移動時間
    private getProgressTime() {
        return (performance.now() % this.AnimatHour) / this.AnimatHour;
    }

    //------------------------------------------------------------------------------------
    public addRunCarLayer(is3dModel: boolean = true) {
        let self = this;
        if (this.MapPoints.length == 0)
            return;

        // 1.建立路線幾何
        self.createLineGeometry();

        // 2. 加入場景
        self.OverlayScene.add(self.RouterLineGeometry);

        // 3. 載入模型
        if (is3dModel) {
            let url = this.ModelUrl;
            this.load3DModel(url).then((model) => {
                if (self.Target3DModel) {
                    self.OverlayScene.remove(self.Target3DModel)
                }
                self.Target3DModel = model;
                let dd = self.convertLatLngToVector3(self.MapPoints[0])
                self.Target3DModel.position.set(dd.x, dd.y, dd.z);
                console.log("dd", dd)
                self.OverlayScene.add(self.Target3DModel)
            })
        }


        self.Overlay.update = () => {
            // 刷新路線並縮放
            self.RouterLineGeometry.material.resolution.copy(
                self.Overlay.getViewportSize()
            )


            // 更新 3d model 動態
            if (is3dModel) {
                if (self.Target3DModel) {
                    const progress = self.getProgressTime();
                    console.log("getPointAt=>1", self.Target3DModel.position)
                    self.RouterLineCurve.getPointAt(progress, self.Target3DModel.position)
                    console.log("getPointAt=>2", self.Target3DModel.position)
                    self.Target3DModel.quaternion.setFromUnitVectors(
                        self.Tangent,
                        self.RouterLineCurve.getTangentAt(progress)
                    )
                    self.Target3DModel.rotateX(Math.PI / 2)

                    self.currentMove_3DModellatlng = self.convertVector3ToLatLng(self.Target3DModel.position);
                }
            }


            self.Overlay.requestRedraw()
        }

    }
    public setOpen3dModel(isopen: boolean) {
        this.IsMove3dModel = isopen;
        return this;
    }
    public getCurrentMove3DModelPosition() {
        return this.currentMove_3DModellatlng;
    }
    public setModelName(name: string) {
        this.ModelName = name;
        this.ModelUrl = this.ModelName.getFile();
        return this;
    }
    public setAnimatHour(time: number) {//豪秒
        this.AnimatHour = time;
        return this;
    }
    public setPoints(points: Array<any>) {
        this.MapPoints = points;
        return this;
    }
    public setMap(map) {
        this.Overlay.setMap(map);
        if (map == null) {
            this.markerList.value.forEach((marker) => marker.setMap(null))
        }
        return this;
    }
    //----------------------------------------------------------------------------------
    // 多公車出現
    public setDynamicBusLine(entity: MapBusLine) {
        this.dynamicBusLine = entity;
        return this;
    }
    public getDynamicBusLine() {
        return this.dynamicBusLine;
    }
    public addMultiRunCarLayer(isSubRoute: boolean = false) {
        let self = this;
        let markers = []
        if (this.dynamicBusLine == null)
            return;

        // 只畫主線
        if(isSubRoute){
            this.IsMove3dModel = false
            this.setPoints(this.dynamicBusLine.getreplaceBusLinePoint());
        } else {
            this.setPoints(this.dynamicBusLine.getOrgBusLinePoint());
        }
        self.createLineGeometry();
        self.OverlayScene.add(self.RouterLineGeometry);

        // 1.建立多條 路線幾何
        self.createMultiLineGeometry();

        // 2. 加入場景
        this.dynamicBusLine.DynamicBusLatLngs?.forEach((x) => {
            if(x instanceof THREE.Object3D){
                self.OverlayScene.add(x.treeJsRouterLineGeometry);
            }
        })


        // 3. 載入模型
        if (this.IsMove3dModel) {
            let url = this.ModelUrl;
            self.dynamicBusLine.DynamicBusLatLngs?.forEach((x) => {
                markers.push(this.createMarker({ data: x, layer: 'bus', markerType: GMarkerType.MARKER_BUS_INFO }).draw(this.MapObject, false))
                self.load3DModel(url).then((model) => {
                    if (x.treeJsTarget3DModel) {
                        self.OverlayScene.remove(x.treeJsTarget3DModel)
                    }
                    x.treeJsTarget3DModel = model;
                    self.OverlayScene.add(x.treeJsTarget3DModel)
                })//end forEach
            })
        }

        self.Overlay.update = () => {
            // 刷新路線並縮放
            self.dynamicBusLine.DynamicBusLatLngs?.forEach((x) => {
                x.treeJsRouterLineGeometry?.material.resolution.copy(
                    self.Overlay.getViewportSize()
                )
            })
            self.RouterLineGeometry.material.resolution.copy(
                self.Overlay.getViewportSize()
            )


            // 更新 3d model 動態
            if (this.IsMove3dModel) {
                self.dynamicBusLine.DynamicBusLatLngs?.forEach((x, index) => {
                    if (x.treeJsTarget3DModel) {
                        const progress = self.getProgressTime();
                        x.treeJsRouterLineCurve?.getPointAt(progress, x.treeJsTarget3DModel.position)
                        if(x.treeJsRouterLineCurve?.getTangentAt(progress)){
                            x.treeJsTarget3DModel?.quaternion?.setFromUnitVectors(
                                self.Tangent,
                                x.treeJsRouterLineCurve?.getTangentAt(progress)
                            )
                        } else {
                            self.OverlayScene.remove(x.treeJsTarget3DModel)
                        }
                        x.treeJsTarget3DModel?.rotateX(Math.PI / 2)

                        x.treeJsCurrentPoint = self.convertVector3ToLatLng(x.treeJsTarget3DModel.position);

                        const { lat, lng } = x.treeJsCurrentPoint
                        markers[index].position = new Latlng({ lat, lng }).toGooglelatlng()
                    }
                })
            }

            self.Overlay.requestRedraw()
        }

    }

    private createMarker({ data, layer, markerType }: { data: any, layer: string; markerType: GMarkerType }) {
        const marker = new GMarker({
            layer: layer,
            type: markerType,
            dataObj: { ...data }
        })

        // marker.zoomChange = (markerEntity: GMarker, zoom: number) => {
        //     if (zoom > 15) {
        //         markerEntity.setType(markerType);
        //     } else {
        //         markerEntity.setType(GMarkerType.MARKER_ICON);
        //     }
        //     markerEntity.draw(this.MapObject);
        // };

        this.markerList.value.push(marker)

        return marker
    }

    private createBusLineSegmentsGeometry() {
        let self = this;

        let line = 3
        for (let i = 0; i < this.busLineSegments?.length; i++) {

            let x = this.busLineSegments[i];
            let routePoint = x.segmentPath;
            if (routePoint.length <= 1)
                continue;


            // 經緯度轉3維座標
            const vectorPoints = routePoint.map((p) => self.convertLatLngToVector3(p));
            x.treeJsRouterLineCurve = new CatmullRomCurve3(vectorPoints, false, 'catmullrom', 0.3);

            // 將點拆密集轉3d幾何
            if (x.treeJsRouterLineCurve != undefined && x.treeJsRouterLineCurve != null) {
                const expandPoints = x.treeJsRouterLineCurve?.getSpacedPoints(x.treeJsRouterLineCurve?.points.length * 10)
                const positions = expandPoints.map((point) => point.toArray()).flat()
                x.treeJsRouterLineGeometry = new Line2(
                    new LineGeometry().setPositions(positions),
                    new LineMaterial({
                        color: x.hexColorToNumber,
                        linewidth: line
                    })
                )
            }
        };
    }
    public setMultipleLine(multipleLine: MapBusLineSegment[]) {
        this.busLineSegments = multipleLine
        return this;
    }

    public addMultiSegmentRunCarLayer(is3dModel: boolean = true) {
        let self = this;
        let markers = [];

        // 1.建立路線幾何
        self.createBusLineSegmentsGeometry();
        self.createMultiLineGeometry();

        // 2. 加入場景
        this.busLineSegments.forEach((seg, index)=>{
            self.OverlayScene.add(seg.treeJsRouterLineGeometry);

            // 創建起點站牌
            const fromMarker = this.createMarker({ data: seg, layer: 'busStop', markerType: GMarkerType.MARKER_BUS_STOPS }).draw(this.MapObject, false);
            fromMarker.position = new Latlng({ lat: seg.from_lat, lng: seg.from_lon }).toGooglelatlng();

            // 最後一段路線時，創建終點站牌
            if (index === this.busLineSegments.length - 1) {
                const toMarker = this.createMarker({ data: seg, layer: 'busStop', markerType: GMarkerType.MARKER_BUS_STOPS }).draw(this.MapObject, false);
                toMarker.position = new Latlng({ lat: seg.to_lat, lng: seg.to_lon }).toGooglelatlng();
            }
        })


        // 3. 載入模型
        if (is3dModel) {
            let url = this.ModelUrl;
            self.dynamicBusLine.DynamicBusLatLngs?.forEach((x) => {
                markers.push(this.createMarker({ data: x, layer: 'bus', markerType: GMarkerType.MARKER_BUS_INFO }).draw(this.MapObject, false))
                self.load3DModel(url).then((model) => {
                    if (x.treeJsTarget3DModel) {
                        self.OverlayScene.remove(x.treeJsTarget3DModel)
                    }
                    x.treeJsTarget3DModel = model;
                    self.OverlayScene.add(x.treeJsTarget3DModel)
                })//end forEach
            })
        }

        self.Overlay.update = () => {
            // 刷新路線並縮放
            self.busLineSegments?.forEach((x) => {
                x.treeJsRouterLineGeometry?.material.resolution.copy(
                    self.Overlay.getViewportSize()
                )
            })

            // 更新 3d model 動態
            if (is3dModel) {
                self.dynamicBusLine.DynamicBusLatLngs?.forEach((x, index) => {
                    if (x.treeJsTarget3DModel) {
                        const progress = self.getProgressTime();
                        x.treeJsRouterLineCurve?.getPointAt(progress, x.treeJsTarget3DModel.position)
                        if(x.treeJsRouterLineCurve?.getTangentAt(progress)){
                            x.treeJsTarget3DModel?.quaternion?.setFromUnitVectors(
                                self.Tangent,
                                x.treeJsRouterLineCurve?.getTangentAt(progress)
                            )
                        } else {
                            self.OverlayScene.remove(x.treeJsTarget3DModel)
                        }
                        x.treeJsTarget3DModel?.rotateX(Math.PI / 2)

                        x.treeJsCurrentPoint = self.convertVector3ToLatLng(x.treeJsTarget3DModel.position);

                        const { lat, lng } = x.treeJsCurrentPoint
                        markers[index].position = new Latlng({ lat, lng }).toGooglelatlng()
                    }
                })
            }
            self.Overlay.requestRedraw()
        }
    }
}