import { TurnState } from '@core/types';

interface GameHistoryAction_Enable {
  type: 'GAME::HISTORY::ENABLE';
}

interface GameHistoryAction_Disable {
  type: 'GAME::HISTORY::DISABLE';
}

interface GameHistoryAction_FetchTurn {
  type: 'GAME::HISTORY::TURN::FETCH';
  turnKey?: string;
}

interface GameHistoryAction_FetchTurnError {
  type: 'GAME::HISTORY::TURN::FETCH!!ERROR';
  turnKey?: string;
}

interface GameHistoryAction_VisualizeTurn {
  type: 'GAME::HISTORY::TURN::VISUALIZE';
  turn: TurnState;
  turnKey: string;
}

export type GameHistoryMiddlewareAction =
  | GameHistoryAction_FetchTurn
  | GameHistoryAction_FetchTurnError;

export type GameHistoryAction =
  | GameHistoryAction_Enable
  | GameHistoryAction_Disable
  | GameHistoryAction_VisualizeTurn;
