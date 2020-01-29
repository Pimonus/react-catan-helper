/* @flow */

import React, { useState } from 'react';
import cn from 'classnames';

import type { Player } from '../../../flow';

import './PlayerModal.css';

type OwnProps = {
  +addCity: (playerUuid: string) => any,
  +addColony: (playerUuid: string) => any,
  +addVictoryPoint: (playerUuid: string) => any,
  +attributeLongestRoad: (playerUuid: string) => any,
  +attributeStrongestArmy: (playerUuid: string) => any,
  +deselect: () => any,
  +destroyCity: (playerUuid: string) => any,
  +player: Player,
};

const NO_ACTION = 0;
const COLONIES_ACTIONS = 1;
const CITIES_ACTIONS = 2;
const VICTORY_POINTS_ACTIONS = 3;
type ACTION_CODE = 0 | 1 | 2 | 3;

const PlayerModal = (props: OwnProps) => {
  const { player } = props;
  const { cities, colonies, uuid, victoryPoints } = player;

  const [showActionsPanel, toggleActionPanel] = useState(NO_ACTION);
  const [actionsDOM, changeActionsDOM] = useState(null);

  const switchActionsDOM = (code: ACTION_CODE) => {
    switch (code) {
      case NO_ACTION:
        toggleActionPanel(NO_ACTION);
        changeActionsDOM(null);
        break;
      case COLONIES_ACTIONS:
        if (showActionsPanel === COLONIES_ACTIONS) {
          toggleActionPanel(NO_ACTION);
          changeActionsDOM(null);
        } else {
          toggleActionPanel(COLONIES_ACTIONS);
          changeActionsDOM(
            <>
              <p onClick={() => props.addColony(player.uuid)}>
                Ajouter une colonie
              </p>
              <p onClick={() => props.addCity(player.uuid)}>
                Transformer une colonie en ville
              </p>
            </>
          );
        }
        break;
      case CITIES_ACTIONS:
        if (showActionsPanel === CITIES_ACTIONS) {
          toggleActionPanel(NO_ACTION);
          changeActionsDOM(null);
        } else {
          toggleActionPanel(CITIES_ACTIONS);
          changeActionsDOM(
            <>
              <p onClick={() => props.destroyCity(player.uuid)}>
                Détruire une ville
              </p>
            </>
          );
        }
        break;
      case VICTORY_POINTS_ACTIONS:
        if (showActionsPanel === VICTORY_POINTS_ACTIONS) {
          toggleActionPanel(NO_ACTION);
          changeActionsDOM(null);
        } else {
          toggleActionPanel(CITIES_ACTIONS);
          changeActionsDOM(
            <>
              <p onClick={() => props.addVictoryPoint(player.uuid)}>
                Ajouter un point de victoire
              </p>
            </>
          );
        }
        break;
      default:
        return;
    }
  };

  return (
    <div className="player modal">
      <div className="container">
        <div className="cancel-cross" onClick={props.deselect}></div>
        <h1>{player.nickname}</h1>
        <div className="top-half">
          <div
            className="colonies-manager"
            onClick={() => switchActionsDOM(COLONIES_ACTIONS)}
          >
            <span>{`${colonies} ${
              colonies > 1 ? 'colonies' : 'colonie'
            }`}</span>
          </div>
          <div
            className={cn('cities-manager', {
              disabled: cities === 0,
            })}
            onClick={() => {
              if (cities > 0) switchActionsDOM(CITIES_ACTIONS);
            }}
          >
            <span>{`${cities} ${cities > 1 ? 'villes' : 'ville'}`}</span>
          </div>
          <div
            className="victory-points-manager"
            onClick={() => switchActionsDOM(VICTORY_POINTS_ACTIONS)}
          >
            <span>{`${victoryPoints} ${
              victoryPoints > 1 ? 'points de victoire' : 'point de victoire'
            }`}</span>
          </div>
        </div>
        <div
          className={cn('bottom-half', {
            'with-actions': showActionsPanel,
          })}
        >
          {showActionsPanel ? (
            actionsDOM
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
