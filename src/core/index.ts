import { v1 as uuidv1 } from 'uuid';

import { CatanState, ClassicDiceValue, DicesValues, Player, SpecialDiceValue } from '@core/types';

const classicDiceValues = [
  ClassicDiceValue.one,
  ClassicDiceValue.two,
  ClassicDiceValue.three,
  ClassicDiceValue.four,
  ClassicDiceValue.five,
  ClassicDiceValue.six,
];

const specialDiceValues = [
  SpecialDiceValue.barbarians,
  SpecialDiceValue.barbarians,
  SpecialDiceValue.barbarians,
  SpecialDiceValue.yellow,
  SpecialDiceValue.green,
  SpecialDiceValue.blue,
];

export const diceValueMatching = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
};

export const THIEF_SCORE = 7;
export const ATTACK_POSITION = 7;

export const getStateForHistory = (state: CatanState): string =>
  JSON.stringify({
    game: {
      enabledThief: state.game.enabledThief,
    },
    barbarians: {
      position: state.barbarians.position,
    },
    dices: {
      values: state.dices.values,
    },
    players: state.players,
  });

export const getStateForStorage = (state: CatanState): string =>
  JSON.stringify({
    ...state,
    gameHistory: {
      ...state.gameHistory,
      enabled: false,
      nextTurnKey: undefined,
      previousTurnKey: undefined,
      visualizedTurnState: undefined,
    },
  });

export const newPlayer = (nickname: string, avatar: number): Player => ({
  nickname,
  uuid: uuidv1(),
  avatar,
  cities: 1,
  colonies: 1,
  hasLongestRoad: false,
  hasStrongestArmy: false,
  isLeader: false,
  score: 0,
  victoryPoints: 0,
});

export const getPlayerScore = (player: Player): number =>
  player.victoryPoints +
  (player.hasStrongestArmy ? 2 : 0) +
  (player.hasLongestRoad ? 2 : 0) +
  2 * player.cities +
  player.colonies;

export const computePlayersScores = (state: ReadonlyArray<Player>): ReadonlyArray<Player> => {
  let topScore = 0;
  let newState: Array<Player> = state.map(player => {
    const score = getPlayerScore(player);
    if (score > topScore) topScore = score;
    return {
      ...player,
      score,
    };
  });
  return newState.map(player => ({
    ...player,
    isLeader: player.score === topScore,
  }));
};

export const computePlayersState = (
  state: ReadonlyArray<Player>,
  data: {
    newArmyHolder?: string;
    newRoadHolder?: string;
    newVictoryPoint?: string;
    newColony?: string;
    newCity?: string;
    destroyCity?: string;
    newNickname?: {
      uuid: string;
      nickname: string;
    };
    removeVictoryPoint?: string;
  }
): ReadonlyArray<Player> => {
  if (Object.keys(data).length !== 1)
    throw new Error(
      'Payload on players state change should only contain one value (newArmyHolder | newRoadHolder | newVictoryPoint)'
    );

  let newState: ReadonlyArray<Player> = state;
  if (data.newArmyHolder) {
    newState = state.map<Player>((player: Player) => ({
      ...player,
      hasStrongestArmy: player.uuid === data.newArmyHolder,
    }));
  }
  if (data.newRoadHolder) {
    newState = state.map<Player>((player: Player) => ({
      ...player,
      hasLongestRoad: player.uuid === data.newRoadHolder,
    }));
  }
  if (data.newVictoryPoint) {
    newState = state.map<Player>((player: Player) => ({
      ...player,
      victoryPoints:
        player.uuid === data.newVictoryPoint ? player.victoryPoints + 1 : player.victoryPoints,
    }));
  }
  if (data.removeVictoryPoint) {
    newState = state.map<Player>((player: Player) => ({
      ...player,
      victoryPoints:
        player.uuid === data.removeVictoryPoint ? player.victoryPoints - 1 : player.victoryPoints,
    }));
  }
  if (data.newColony) {
    newState = state.map<Player>((player: Player) => ({
      ...player,
      colonies: player.uuid === data.newColony ? player.colonies + 1 : player.colonies,
    }));
  }
  if (data.newCity) {
    newState = state.map<Player>((player: Player) => ({
      ...player,
      colonies: player.uuid === data.newCity ? player.colonies - 1 : player.colonies,
      cities: player.uuid === data.newCity ? player.cities + 1 : player.cities,
    }));
  }
  if (data.destroyCity) {
    newState = state.map<Player>((player: Player) => ({
      ...player,
      colonies: player.uuid === data.destroyCity ? player.colonies + 1 : player.colonies,
      cities: player.uuid === data.destroyCity ? player.cities - 1 : player.cities,
    }));
  }
  if (data.newNickname) {
    const { uuid, nickname } = data.newNickname;
    newState = state.map<Player>((player: Player) => ({
      ...player,
      nickname: player.uuid === uuid ? nickname : player.nickname,
    }));
  }
  return computePlayersScores(newState);
};

export const getClassicDiceValue = (): ClassicDiceValue => {
  const i = Math.floor(Math.random() * Math.floor(classicDiceValues.length));
  return classicDiceValues[i];
};

export const getSpecialDiceValue = (): SpecialDiceValue => {
  const i = Math.floor(Math.random() * Math.floor(specialDiceValues.length));
  return specialDiceValues[i];
};

export const getDicesScore = (values: DicesValues): number =>
  diceValueMatching[values.redValue] + diceValueMatching[values.whiteValue];

export const didBarbariansProgress = (values: DicesValues) =>
  values.specialValue === SpecialDiceValue.barbarians;

export const didBarbariansReachCoast = (advance: number) => advance === ATTACK_POSITION - 1;
