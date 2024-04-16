
interface RendererParams {
  minScale: number,
  maxScale: number,
  element: HTMLElement,
  scaleSensitivity: number,
}

interface ZoomState {
  element: HTMLElement,
  minScale: number,
  maxScale: number,
  scaleSensitivity: number,
  transformation: {
    originX: number,
    originY: number,
    translateX: number,
    translateY: number,
    scale: number,
  }
}

export const renderer = ({ minScale, maxScale, element, scaleSensitivity = 10 }: RendererParams) => {
  const state: ZoomState = {
    element,
    minScale,
    maxScale,
    scaleSensitivity,
    transformation: {
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  }

  return Object.assign({}, canZoom(state), canPan(state))
}

interface PanParams {
  state: ZoomState,
  originX: number,
  originY: number,
}

const pan = ({ state, originX, originY }: PanParams) => {
  state.transformation.translateX += originX
  state.transformation.translateY += originY
  state.element.style.transform = getMatrix({
    scale: state.transformation.scale,
    translateX: state.transformation.translateX,
    translateY: state.transformation.translateY,
  })
}

interface OriginPoint {
  originX: number,
  originY: number,
}

interface ZoomPoint {
  originX: number,
  originY: number,
  scale: number,
}

const canPan = (state: ZoomState) => {
  return {
    panBy: ({ originX, originY }: OriginPoint) => pan({ state, originX, originY }),
    panTo: ({ originX, originY, scale }: ZoomPoint) => {
      state.transformation.scale = scale
      pan({
        state,
        originX: originX - state.transformation.translateX,
        originY: originY - state.transformation.translateY,
      })
    }
  }
}

interface GetMatrixParams {
  scale: number,
  translateX: number,
  translateY: number,
}

const getMatrix = ({ scale, translateX, translateY }: GetMatrixParams) => {
  return `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`
}

interface ZoomParams {
  x: number,
  y: number,
  deltaScale: number,
}

const canZoom = (state: ZoomState) => {
  return {
    zoom: ({ x, y, deltaScale }: ZoomParams) => {
      const { element, transformation, minScale, maxScale, scaleSensitivity } = state
      const { top, left } = element.getBoundingClientRect()
      const [scale, newScale] = getScale({ scale: transformation.scale, deltaScale, minScale, maxScale, scaleSensitivity })
      const originX = x - left
      const originY = y - top
      const newOriginX = originX / scale
      const newOriginY = originY / scale
      const translate = getTranslate({ scale, minScale, maxScale })
      const translateX = translate({ pos: originX, prevPos: transformation.originX, translate: transformation.translateX })
      const translateY = translate({ pos: originY, prevPos: transformation.originY, translate: transformation.translateY })

      state.element.style.transformOrigin = `${newOriginX}px ${newOriginY}px`
      state.element.style.transform = getMatrix({ scale: newScale, translateX, translateY })
      state.transformation = { originX: newOriginX, originY: newOriginY, translateX, translateY, scale: newScale }
    },
  }
}

interface GetScaleParams {
  scale: number,
  minScale: number,
  maxScale: number,
  scaleSensitivity: number,
  deltaScale: number,
}

const getScale = ({ scale, minScale, maxScale, scaleSensitivity, deltaScale }: GetScaleParams) => {
  let newScale = scale + (deltaScale / (scaleSensitivity / scale))
  newScale = Math.max(minScale, Math.min(newScale, maxScale))
  return [scale, newScale]
}

interface PositionDiff {
  pos: number,
  prevPos: number,
}

const hasPositionChanged = ({ pos, prevPos }: PositionDiff) => pos !== prevPos

interface ZoomValue {
  minScale: number,
  maxScale: number,
  scale: number,
}

const valueInRange = ({ minScale, maxScale, scale }: ZoomValue) => scale <= maxScale && scale >= minScale

interface TranslateParams {
  pos: number,
  prevPos: number,
  translate: number,
}

const getTranslate = ({ minScale, maxScale, scale }: ZoomValue) => ({ pos, prevPos, translate }: TranslateParams) => {
  return valueInRange({ minScale, maxScale, scale }) && hasPositionChanged({ pos, prevPos })
    ? translate + (pos - prevPos * scale) * (1 - 1 / scale)
    : translate
}
