export interface Adventure <SceneID = string>{
  title: string
  startState: GameState<SceneID>
  scenes: {
    [idx: string]: Scene<SceneID>;
  }
}

export interface Scene <SceneID = string>{
  title: string
  imgUrl: string
  desc: string
  opts: Option<SceneID>[]
}

export interface Option <SceneID = string> {
  text: string,
  to: SceneID
}

export interface GameState <SceneID = string> {
  atScene: SceneID
}
