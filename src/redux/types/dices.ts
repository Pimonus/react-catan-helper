export type ClassicDiceValue = 'one' | 'two' | 'three' | 'four' | 'five' | 'six';
export const ClassicDiceValues: ClassicDiceValue[] = ['one', 'two', 'three', 'four', 'five', 'six'];

export const diceValueMatching = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
};

export const THIEF_SCORE = 7;

export type SpecialDiceValue = 'blue' | 'green' | 'yellow' | 'barbarians';
export const SpecialDiceValues: SpecialDiceValue[] = ['blue', 'green', 'yellow', 'barbarians'];

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

interface DiceAction_DefineValue {
  type: 'DICES::DEFINE::VALUES';
  payload: {
    values: DicesValues;
  };
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
export type DiceAction =
  | DiceAction_DefineValue
  | DiceAction_Reveal
  | DiceAction_Spin
  | DiceAction_Stop;

interface DiceMiddlewareAction_Roll {
  type: 'DICES::ROLL';
}

export type DiceMiddlewareAction = DiceMiddlewareAction_Roll;
