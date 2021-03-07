import { CatanState } from '@core/types';
import { Player } from './players';

export interface GameStorableState {
  enabledThief: boolean;
}

export interface GameState extends GameStorableState {
  loading: boolean;
  paused: boolean;
  started: boolean;
}

interface GameMiddlwareAction_Scan {
  type: 'GAME::SCAN';
}

interface GameMiddlwareAction_New {
  type: 'GAME::NEW';
}

interface GameMiddlwareAction_Resume {
  type: 'GAME::RESUME';
}

interface GameAction_Found {
  type: 'GAME::FOUND';
}

interface GameAction_NotFound {
  type: 'GAME::NOT_FOUND';
}

interface GameAction_Load {
  type: 'GAME::LOAD';
  state: CatanState;
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

interface GameAction_Save {
  type: 'GAME::SAVE';
}

interface GameAction_EnableThief {
  type: 'GAME::THIEF::ENABLE';
}

export type GameMiddlewareAction =
  | GameMiddlwareAction_Scan
  | GameMiddlwareAction_New
  | GameMiddlwareAction_Resume;

export type GameAction =
  | GameAction_Found
  | GameAction_NotFound
  | GameAction_Load
  | GameAction_LoadError
  | GameAction_New
  | GameAction_Initialized
  | GameAction_Start
  | GameAction_Save
  | GameAction_EnableThief;
