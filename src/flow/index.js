/* @flow */

export type BarbariansState = {
  +position: number,
};

export type GameState = {
  +enabledThief: boolean,
  +loading: boolean,
  +paused: boolean,
};

export type ClassicDiceValue =
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six';

export type SpecialDiceValue = 'blue' | 'green' | 'yellow' | 'barbarians';

export type DicesValues = {
  +whiteValue: ClassicDiceValue,
  +redValue: ClassicDiceValue,
  +specialValue: SpecialDiceValue,
};

export type DicesState = {
  +flipped: boolean,
  +history: $ReadOnlyArray<DicesValues>,
  +rolling: boolean,
  +spinning: boolean,
  +values: DicesValues,
};

export type Player = {
  // id
  +uuid: string,
  +nickname: string,
  // game
  +cities: number,
  +colonies: number,
  +hasLongestRoad: boolean,
  +hasStrongestArmy: boolean,
  +isLeader: boolean,
  +score: number,
  +victoryPoints: number,
};

export type CatanState = {
  +_createdAt: Date,
  +_resumedAt: Date | null,
  +_endedAt: Date | null,
  +availableGame: boolean,
  +barbarians: BarbariansState,
  +dices: DicesState,
  +game: GameState,
  +listenToShortcuts: boolean,
  +players: $ReadOnlyArray<Player>,
  +selectedPlayerUuid?: string,
};

type ReduxAction = { type: '@@INIT' };

export type CatanAction =
  | ReduxAction
  | { type: 'GAME::CHECK' }
  | { type: 'GAME::FOUND' }
  | { type: 'GAME::NOT_FOUND' }
  | { type: 'GAME::LOAD', state: ?CatanState }
  | { type: 'GAME::LOAD!!ERROR', error: SyntaxError }
  | { type: 'GAME::NEW' }
  | { type: 'GAME::CREATED' }
  | { type: 'GAME::PAUSE' }
  | { type: 'GAME::RESUME' }
  | { type: 'GAME::THIEF::ENABLE' }
  | { type: 'BARBARIANS::ATTACK' }
  | { type: 'BARBARIANS::PROGRESS' }
  | { type: 'DICES::DEFINE::VALUES', values: DicesValues }
  | { type: 'DICES::FLIP' }
  | { type: 'DICES::REVEAL' }
  | { type: 'DICES::SPIN' }
  | { type: 'DICES::STOP' }
  | { type: 'PLAYER::ADD', nickname: string }
  | { type: 'PLAYER::SELECT', playerUuid: string }
  | { type: 'PLAYER::DESELECT' }
  | { type: 'PLAYER::ADD::COLONY', playerUuid: string }
  | { type: 'PLAYER::ADD::CITY', playerUuid: string }
  | { type: 'PLAYER::DESTROY::CITY', playerUuid: string }
  | { type: 'PLAYER::ADD::POINT', playerUuid: string }
  | { type: 'PLAYER::ATTRIBUTE::ROAD', playerUuid: string }
  | { type: 'PLAYER::ATTRIBUTE::ARMY', playerUuid: string }
  | { type: 'PLAYER::SAVE::NICKNAME', playerUuid: string, nickname: string }
  | { type: 'SHORTCUTS::DISABLE' }
  | { type: 'SWAL::FIRE' }
  | { type: 'SWAL::DISMISS' };

export type Dispatch = (action: CatanAction | ThunkAction) => any;
export type GetState = () => CatanState;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
