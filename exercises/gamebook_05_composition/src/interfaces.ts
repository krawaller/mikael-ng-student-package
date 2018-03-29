export interface Adventure {
  title: string
  startState: GameState
  scenes: {
    [idx: string]: Scene
  }
}

export interface Scene {
  title: string
  imgUrl: string
  desc: string
  opts: Option[]
}

export interface Option {
  text: string,
  to: PageId
}

export interface GameState {
  atScene: PageId
}

type PageId = 'beginning' | 'hallway' | 'room';