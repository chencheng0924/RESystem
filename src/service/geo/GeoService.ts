
import { Position } from "./Geo.model";

export class Geo {
    public static getCurrentPos(type?: boolean): Promise<Position> {

        // if (loc.getLoc() != null)
        //     return new Promise((resolve, reject) => {
        //         let pos = loc.getLoc();
        //         resolve(pos);
        //     });

        const myPromise: Promise<Position> = new Promise((resolve, reject) => {
            if ("geolocation" in window.navigator) {
                window.navigator.geolocation.getCurrentPosition(function (position) {
                    let pos = new Position(position.coords.latitude, position.coords.longitude).setHasCurrentPos(true);
                    // pos.setDefault();
                    if (type) {
                        pos.hasCurrentPos = true
                        const check = Geo.isInsideKG(pos.latitude, pos.longitude)
                        pos.setInsideKaohsiung(check);
                        pos.setKGPos()
                        resolve(pos);
                    } else {

                        resolve(pos);
                    }
                }, function (e) {
                    // console.log("getCurrentPos error", e);
                    let pos = new Position().setDefault().isUnableBrowserLocation().setHasCurrentPos(false); // 左營高鐵
                    resolve(pos);

                });
            } else {
                console.log("not found geolocation");
                return null;
            }

        });
        return myPromise
            .then((res) => {
                return res
            })
            .catch((res) => {
                return null
            });
    }
    public static getDistanceByLatLng(curLat: number, curLng: number, placeLat: number, placeLng: number) {
        const deg2rad = (deg: number) => {
            return deg * (Math.PI / 180)
        }
        const R = 6371 // 地球半徑(km)
        const dLat = deg2rad(placeLat - curLat)
        const dLon = deg2rad(placeLng - curLng)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(curLat)) * Math.cos(deg2rad(placeLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const d = R * c // 距離(km)
        return Number((d * 1000).toFixed(2))
    }
    public static isInsideKG(latitude: number, longitude: number) {
        const kaohsiungBounds = {
            north: 23.367222,
            south: 22.475556,
            east: 121.048889,
            west: 120.175556
        };
        if (
            latitude >= kaohsiungBounds.south &&
            latitude <= kaohsiungBounds.north &&
            longitude >= kaohsiungBounds.west &&
            longitude <= kaohsiungBounds.east
        ) {
            return true;
        } else {
            return false;
        }
    }

    public static async getBrowserLocation(): Promise<boolean> {
        return new Promise((resolve) => {
            if ("geolocation" in window.navigator) {
                window.navigator.geolocation.getCurrentPosition(function (position) {
                    resolve(true);
                }, function (e) {
                    resolve(false);
                });
            } else {
                console.log("not found geolocation");
                resolve(false);
            }
        })
    }
}