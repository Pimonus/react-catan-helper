/* @flow */

import uuidv1 from 'uuid/v1';

import type { ClassicDiceValue, Player, SpecialDiceValue } from '../flow';

export const ONE = 'one';
export const TWO = 'two';
export const THREE = 'three';
export const FOUR = 'four';
export const FIVE = 'five';
export const SIX = 'six';
export const BARBARIANS = 'barbarians';
export const YELLOW = 'yellow';
export const BLUE = 'blue';
export const GREEN = 'green';

const classicDiceValues = [ONE, TWO, THREE, FOUR, FIVE, SIX];
const specialDiceValues = [
  BARBARIANS,
  BARBARIANS,
  BARBARIANS,
  YELLOW,
  GREEN,
  BLUE,
];

export const attackAdvance = 7;

export const newPlayer = (nickname: string): Player => ({
  nickname,
  uuid: uuidv1(),
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

export const computePlayersScores = (
  state: $ReadOnlyArray<Player>
): $ReadOnlyArray<Player> => {
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
  state: $ReadOnlyArray<Player>,
  data: {
    newArmyHolder?: string,
    newRoadHolder?: string,
    newVictoryPoint?: string,
  }
): $ReadOnlyArray<Player> => {
  if (Object.keys(data).length !== 1)
    throw 'Payload on players state change should only contain one value (newArmyHolder | newRoadHolder | newVictoryPoint)';

  let newState: $ReadOnlyArray<Player> = state;
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
        player.uuid === data.newVictoryPoint
          ? player.victoryPoints + 1
          : player.victoryPoints,
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

export const didBarbariansReachCoast = (advance: number) =>
  advance === attackAdvance;
