export class PageViewport {
    
    windowScale?: number;
    windowPositionX?: number;
    windowPositionY?: number;

    constructor(init?) {
        Object.assign(this, init);
    }
}