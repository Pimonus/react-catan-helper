export interface BarbariansStorableState {
  position: number;
}

export interface BarbariansState extends BarbariansStorableState {}

interface BarbarianAction_Progress {
  type: 'BARBARIANS::PROGRESS';
}

export type BarbarianAction = BarbarianAction_Progress;
