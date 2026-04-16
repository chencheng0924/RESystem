// commomMap.model.ts
import { IMap, ILatLng } from './imap';
import { GoogleMap } from './googleMap/googleMap.composable';
import { Mapbox } from './mapbox/mapbox.composable';

export enum MapProvider {
    GOOGLE_MAP,
    MAPBOX
}

// 地圖組件類別
export class MapComponent {
    public componentType?: MapProvider;
    public mapEnttiy?: IMap;
    constructor(init?) {
        Object.assign(this, init);
    }
}

// 地圖工廠類別
export class MapFactory {
    public target?: MapProvider = MapProvider.GOOGLE_MAP;
    public components?: Array<MapComponent> = [];
    public mapOptions?: any;

    constructor(options?) {
        this.mapOptions = options;
        this.components = [
            new MapComponent({
                componentType: MapProvider.GOOGLE_MAP,
                mapEnttiy: new GoogleMap(),
            }),
            new MapComponent(
                {
                    componentType: MapProvider.MAPBOX,
                    mapEnttiy: new Mapbox(),
                }
            )
        ];

        this.target = options?.provider ?? this.target;
    }

    setOption(ops) {
        this.mapOptions = ops
        return this;
    }

    public setTarget(type: MapProvider) {
        this.target = type;
        return this;
    }

    public get getIMap(): IMap {
        // console.count()
        const component = this.components.find(x => x.componentType === this.target);
        if (!component) {
            throw new Error(`Map component not found for type: ${this.target}`);
        }

        return component.mapEnttiy?.setOption(this.mapOptions) as IMap;
    }

    public getCurrentMapType(): MapProvider {
        return this.target;
    }

    public getMapOptions() {
        return this.mapOptions;
    }

    public updateOptions(options): void {
        this.mapOptions = { ...options };
        const component = this.components.find(x => x.componentType === this.target);
        if (component) {
            this.getIMap.updateOptions?.(this.mapOptions);
        }
    }
}

