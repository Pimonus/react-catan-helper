/* @flow */

import React from 'react';

import type { Player } from '../../../flow';

import './PlayerModal.css';

type OwnProps = {
  +addVictoryPoint: (playerUuid: string) => any,
  +attributeLongestRoad: (playerUuid: string) => any,
  +attributeStrongestArmy: (playerUuid: string) => any,
  +deselect: () => any,
  +player: Player,
};

const PlayerModal = (props: OwnProps) => {
  const { player } = props;
  const { uuid } = player;

  return (
    <div className="player modal">
      <div className="container">
        <div className="cancel-cross" onClick={props.deselect}></div>
        <h1>{player.nickname}</h1>
        <div className="actions">
          <div
            className="action victory-point"
            onClick={() => props.addVictoryPoint(uuid)}
          >
            <div className="img"></div>
            <p>Point de Victoire</p>
          </div>
          <div
            className="action road"
            onClick={() => props.attributeLongestRoad(uuid)}
          >
            <div className="img">
              {player.hasLongestRoad ? <div className="checked" /> : null}
            </div>
            <p>Route la plus longue</p>
          </div>
          <div
            className="action army"
            onClick={() => props.attributeStrongestArmy(uuid)}
          >
            <div className="img">
              {player.hasStrongestArmy ? <div className="checked" /> : null}
            </div>

            <p>Armée la plus puissante</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
