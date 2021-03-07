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
