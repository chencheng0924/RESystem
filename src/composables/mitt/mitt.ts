import mitt, { Emitter } from 'mitt'

export type Events = {
  'default:updateView': void
  'default:updateEntitySection': void
}

export const emitter: Emitter<Events> = mitt<Events>()