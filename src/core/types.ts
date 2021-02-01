export interface BarbariansStorableState {
  position: number;
}

export interface BarbariansState extends BarbariansStorableState {}

export interface GameStorableState {
  enabledThief: boolean;
}

export interface GameState extends GameStorableState {
  loading: boolean;
  paused: boolean;
  started: boolean;
}

export enum ClassicDiceValue {
  one = 'one',
  two = 'two',
  three = 'three',
  four = 'four',
  five = 'five',
  six = 'six',
}

export enum SpecialDiceValue {
  blue = 'blue',
  green = 'green',
  yellow = 'yellow',
  barbarians = 'barbarians',
}

export interface DicesValues {
  whiteValue: ClassicDiceValue;
  redValue: ClassicDiceValue;
  specialValue: SpecialDiceValue;
}

export interface DicesStorableState {
  values: DicesValues;
}

export interface DicesState extends DicesStorableState {
  flipped: boolean;
  rolling: boolean;
  spinning: boolean;
}

export interface Player {
  // id
  uuid: string;
  nickname: string;
  avatar: number;
  // game
  cities: number;
  colonies: number;
  hasLongestRoad: boolean;
  hasStrongestArmy: boolean;
  isLeader: boolean;
  score: number;
  victoryPoints: number;
}

export interface TurnState {
  game: GameStorableState;
  barbarians: BarbariansStorableState;
  dices: DicesStorableState;
  players: ReadonlyArray<Player>;
}

export interface GameHistoryState {
  enabled: boolean;
  nextTurnKey?: string;
  previousTurnKey?: string;
  turnKeys: string[];
  visualizedTurnIndex?: number;
  visualizedTurnState?: TurnState;
}

export interface CatanState {
  _createdAt: Date;
  _resumedAt: Date | null;
  _endedAt: Date | null;
  availableGame: boolean;
  barbarians: BarbariansState;
  dices: DicesState;
  game: GameState;
  gameHistory: GameHistoryState;
  listenToShortcuts: boolean;
  players: ReadonlyArray<Player>;
  selectedPlayerUuid?: string;
}

export interface ReduxAction {
  type: '@@INIT';
}

interface PlayerAction_Delete {
  type: 'PLAYER::DELETE';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_Select {
  type: 'PLAYER::SELECT';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_Deselect {
  type: 'PLAYER::DESELECT';
}
interface PlayerAction_AddColony {
  type: 'PLAYER::ADD::COLONY';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_DestroyColony {
  type: 'PLAYER::DESTROY::COLONY';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_AddCity {
  type: 'PLAYER::ADD::CITY';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_DestroyCity {
  type: 'PLAYER::DESTROY::CITY';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_AddPoint {
  type: 'PLAYER::ADD::POINT';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_RemovePoint {
  type: 'PLAYER::REMOVE::POINT';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_AttributeRoad {
  type: 'PLAYER::ATTRIBUTE::ROAD';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_AttributeArmy {
  type: 'PLAYER::ATTRIBUTE::ARMY';
  payload: {
    playerUuid: string;
  };
}
interface PlayerAction_SaveNickname {
  type: 'PLAYER::SAVE::NICKNAME';
  payload: {
    playerUuid: string;
    nickname: string;
  };
}

export type PlayerAction =
  | PlayerAction_Delete
  | PlayerAction_Select
  | PlayerAction_Deselect
  | PlayerAction_AddColony
  | PlayerAction_DestroyColony
  | PlayerAction_AddCity
  | PlayerAction_DestroyCity
  | PlayerAction_AddPoint
  | PlayerAction_RemovePoint
  | PlayerAction_AttributeRoad
  | PlayerAction_AttributeArmy
  | PlayerAction_SaveNickname;

interface GameAction_Check {
  type: 'GAME::CHECK';
}
interface GameAction_Found {
  type: 'GAME::FOUND';
}
interface GameAction_NotFound {
  type: 'GAME::NOT_FOUND';
}
interface GameAction_Load {
  type: 'GAME::LOAD';
  state: CatanState | null;
}
interface GameAction_LoadError {
  type: 'GAME::LOAD!!ERROR';
  error: SyntaxError;
}
interface GameAction_New {
  type: 'GAME::NEW';
}
interface GameAction_Start {
  type: 'GAME::START';
  payload: {
    players: ReadonlyArray<Player>;
  };
}
interface GameAction_Initialized {
  type: 'GAME::INITIALIZED';
}
interface GameAction_Resume {
  type: 'GAME::RESUME';
}
interface GameAction_Save {
  type: 'GAME::SAVE';
}
interface GameAction_EnableThief {
  type: 'GAME::THIEF::ENABLE';
}
interface GameAction_EnableHistory {
  type: 'GAME::HISTORY::ENABLE';
}
interface GameAction_DisableHistory {
  type: 'GAME::HISTORY::DISABLE';
}
interface GameAction_FetchTurn {
  type: 'GAME::HISTORY::TURN::FETCH';
  turnKey?: string;
}
interface GameAction_FetchTurnError {
  type: 'GAME::HISTORY::TURN::FETCH!!ERROR';
  turnKey?: string;
}
interface GameAction_VisualizeTurn {
  type: 'GAME::HISTORY::TURN::VISUALIZE';
  turn: TurnState;
  turnKey: string;
}

type GameAction =
  | GameAction_Check
  | GameAction_Found
  | GameAction_NotFound
  | GameAction_Load
  | GameAction_LoadError
  | GameAction_New
  | GameAction_Initialized
  | GameAction_Start
  | GameAction_Resume
  | GameAction_Save
  | GameAction_EnableThief
  | GameAction_EnableHistory
  | GameAction_DisableHistory
  | GameAction_FetchTurn
  | GameAction_FetchTurnError
  | GameAction_VisualizeTurn;

interface BarbarianAction_Progress {
  type: 'BARBARIANS::PROGRESS';
}

type BarbarianAction = BarbarianAction_Progress;

interface DiceAction_DefineValue {
  type: 'DICES::DEFINE::VALUES';
  payload: {
    values: DicesValues;
  };
}
interface DiceAction_Flip {
  type: 'DICES::FLIP';
}
interface DiceAction_Reveal {
  type: 'DICES::REVEAL';
}
interface DiceAction_Spin {
  type: 'DICES::SPIN';
}
interface DiceAction_Stop {
  type: 'DICES::STOP';
}

type DiceAction =
  | DiceAction_DefineValue
  | DiceAction_Flip
  | DiceAction_Reveal
  | DiceAction_Spin
  | DiceAction_Stop;

interface SwalAction_Fire {
  type: 'SWAL::FIRE';
}
interface SwalAction_Dismiss {
  type: 'SWAL::DISMISS';
}

type SwalAction = SwalAction_Fire | SwalAction_Dismiss;

export type CatanAction =
  | ReduxAction
  | PlayerAction
  | GameAction
  | BarbarianAction
  | DiceAction
  | SwalAction
  | { type: 'SHORTCUTS::DISABLE' };

export interface Dispatch {
  (action: CatanAction | ThunkAction): any;
}
export interface GetState {
  (): CatanState;
}
export interface ThunkAction {
  (dispatch: Dispatch, getState: GetState): any;
}
