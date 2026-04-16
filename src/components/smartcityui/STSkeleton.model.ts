export class STSkeletonProps {
  shape?: STSkeletonShape
  size?: string
  width?: string
  height?: string
  animation?: STSkeletonAnimation
  type?: STSkeletonType

  constructor(init?: Partial<STSkeletonProps>) {
    Object.assign(this, init)
  }

  setShape(shape: STSkeletonShape) {
    this.shape = shape
    return this
  }

  setSize(size: string) {
    this.size = size
    return this
  }

  setWidthHeight(width: string, height: string) {
    this.width = width
    this.height = height
    return this
  }

  setAnimation(animation: STSkeletonAnimation) {
    this.animation = animation
    return this
  }
}

export enum STSkeletonShape {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle'
}

export enum STSkeletonAnimation {
  WAVE = 'wave',
  NONE = 'none'
}

export enum STSkeletonType {
  DEFAULT = 'default',
  CARD_IMG_WITH_FOOTER = 'card-img-with-footer',
  CARD_LR = 'card-lr',
  CARD_TLRB ='card-tlrb'
}