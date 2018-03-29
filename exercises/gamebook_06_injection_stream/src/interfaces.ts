export interface Adventure {
  title: string,
  startState: GameState
  scenes: {
    [index: string]: Scene
  }
}

export interface Scene {
  title: string
  imgUrl: string
  desc: string
  opts: Option[]
}

export interface GameState {
  atScene?: string
}

export interface Option {
  text: string,
  to: string
}

export interface ResetAction {
  type: 'newstate'
  newState: GameState
}

export interface LinkAction {
  type: 'link'
  target: string
}

export type Action = LinkAction | ResetAction;