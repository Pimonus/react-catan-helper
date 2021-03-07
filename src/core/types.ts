import { BarbarianAction, BarbariansState, BarbariansStorableState } from '@redux/types/barbarians';
import {
  DiceAction,
  DiceMiddlewareAction,
  DicesState,
  DicesStorableState,
} from '@redux/types/dices';
import { GameAction, GameMiddlewareAction, GameState, GameStorableState } from '@redux/types/game';
import { GameHistoryAction, GameHistoryMiddlewareAction } from '@redux/types/gameHistory';
import { Player, PlayerAction } from '@redux/types/players';
import { SwalAction } from '@redux/types/swal';

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

export type MiddlewareAction =
  | GameMiddlewareAction
  | GameHistoryMiddlewareAction
  | DiceMiddlewareAction;

export type CatanAction =
  | MiddlewareAction
  | ReduxAction
  | PlayerAction
  | GameAction
  | GameHistoryAction
  | BarbarianAction
  | DiceAction
  | SwalAction
  | { type: 'SHORTCUTS::DISABLE' };
