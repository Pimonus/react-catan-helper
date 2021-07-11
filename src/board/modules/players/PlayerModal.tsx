import React, { useState } from 'react';
import cn from 'classnames';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Player } from '@redux/types/players';

import './PlayerModal.less';

const swal = withReactContent(Swal);

interface Props {
  player: Player;
  addCity: (playerUuid: string) => any;
  addColony: (playerUuid: string) => any;
  addVictoryPoint: (playerUuid: string) => any;
  attributeLongestRoad: (playerUuid: string) => any;
  attributeStrongestArmy: (playerUuid: string) => any;
  deletePlayer: (playerUuid: string) => any;
  deselect: () => any;
  destroyCity: (playerUuid: string) => any;
  destroyColony: (playerUuid: string) => any;
  removeVictoryPoint: (playerUuid: string) => any;
  savePlayerNickname: (playerUuid: string, nickname: string) => any;
}

const NO_ACTION = 0;
const COLONIES_ACTIONS = 1;
const CITIES_ACTIONS = 2;
const VICTORY_POINTS_ACTIONS = 3;
type ACTION_TYPE = 0 | 1 | 2 | 3;

const PlayerModal = ({
  // data
  player,
  //functions
  addCity,
  addColony,
  addVictoryPoint,
  attributeLongestRoad,
  attributeStrongestArmy,
  deletePlayer,
  deselect,
  destroyCity,
  destroyColony,
  removeVictoryPoint,
  savePlayerNickname,
}: Props) => {
  const { cities, colonies, uuid, victoryPoints } = player;

  // const [showActionsPanel, toggleActionPanel] = useState(NO_ACTION);
  const [actionType, setActionType] = useState(NO_ACTION);
  const [nickname, setNickname] = useState(player.nickname);
  const [nicknameEdition, toggleNicknameEdition] = useState(false);

  const handleActionTypeChange = (type: ACTION_TYPE) => {
    if (type !== NO_ACTION && type === actionType) setActionType(NO_ACTION);
    else setActionType(type);
  };

  const onAddCity = () => {
    if (player.colonies > 0) addCity(player.uuid);
  };
  const onAddColony = () => addColony(player.uuid);
  const onAddVictoryPoint = () => addVictoryPoint(player.uuid);
  const onDestroyCity = () => {
    if (player.cities > 1) {
      destroyCity(player.uuid);
    } else if (player.cities === 1) {
      destroyCity(player.uuid);
      setActionType(NO_ACTION);
    }
  };
  const onDestroyColony = () => {
    if (player.colonies > 0) destroyColony(player.uuid);
  };
  const onRemoveVictoryPoint = () => {
    if (player.victoryPoints > 0) removeVictoryPoint(player.uuid);
  };

  const getActionDOM = () => {
    switch (actionType) {
      case NO_ACTION:
        return null;
      case COLONIES_ACTIONS:
        return (
          <>
            <p onClick={onAddColony}>Ajouter une colonie</p>
            <p className={cn({ disabled: player.colonies < 1 })} onClick={onAddCity}>
              Transformer une colonie en ville
            </p>
            <p className={cn({ disabled: player.colonies < 1 })} onClick={onDestroyColony}>
              Détruire une colonie
            </p>
          </>
        );
      case CITIES_ACTIONS:
        return <p onClick={onDestroyCity}>Détruire une ville</p>;
      case VICTORY_POINTS_ACTIONS:
        return (
          <>
            <p onClick={onAddVictoryPoint}>Ajouter un point de victoire</p>
            <p
              className={cn({ disabled: player.victoryPoints < 1 })}
              onClick={onRemoveVictoryPoint}
            >
              Retirer un point de victoire
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="player modal">
      <div className="container">
        <div className="cancel-cross" onClick={deselect}></div>
        <div
          className="trash-bin"
          onClick={() => {
            swal.fire({
              html: (
                <div className="deletion-confirmation-swal">
                  <div className="text">
                    <div className="img" />
                    <p>
                      Vous êtes sur le point de faire disparaitre
                      <span>{player.nickname}</span> de la partie.
                    </p>
                    <p>Que dites-vous ?</p>
                  </div>
                  <div className="buttons">
                    <button
                      className="danger"
                      onClick={() => {
                        deletePlayer(player.uuid);
                        swal.close();
                      }}
                    >
                      Coupez-lui la tête !
                    </button>
                    <button onClick={() => swal.close()}>Laissez-le sauf !</button>
                  </div>
                </div>
              ),
              backdrop: 'rgba(0,0,0,0.9)',
              showConfirmButton: false,
              showCancelButton: false,
            });
          }}
        ></div>
        <div className="title">
          {nicknameEdition ? (
            <input
              autoFocus
              placeholder="Nom du joueur"
              type="text"
              value={nickname}
              onChange={event => {
                if (event.target.value.length < 20) setNickname(event.target.value);
              }}
              onFocus={event => event.target.select()}
              onKeyUp={event => {
                if (event.key === 'Escape') {
                  toggleNicknameEdition(false);
                } else if (event.key === 'Enter') {
                  savePlayerNickname(player.uuid, nickname);
                  toggleNicknameEdition(false);
                }
              }}
            />
          ) : (
            <>
              <h1>{player.nickname}</h1>
              <div className="edit" onClick={() => toggleNicknameEdition(true)} />
            </>
          )}
        </div>
        <div className="top-half">
          <div
            className="colonies-manager"
            onClick={() => handleActionTypeChange(COLONIES_ACTIONS)}
          >
            <span>{`${colonies} ${colonies > 1 ? 'colonies' : 'colonie'}`}</span>
          </div>
          <div
            className={cn('cities-manager', {
              disabled: cities === 0,
            })}
            onClick={() => {
              if (cities > 0) handleActionTypeChange(CITIES_ACTIONS);
            }}
          >
            <span>{`${cities} ${cities > 1 ? 'villes' : 'ville'}`}</span>
          </div>
          <div
            className="victory-points-manager"
            onClick={() => handleActionTypeChange(VICTORY_POINTS_ACTIONS)}
          >
            <span>{`${victoryPoints} ${
              victoryPoints > 1 ? 'points de victoire' : 'point de victoire'
            }`}</span>
          </div>
        </div>
        <div
          className={cn('bottom-half', {
            'with-actions': actionType,
          })}
        >
          {actionType ? (
            getActionDOM()
          ) : (
            <>
              <div className="action road" onClick={() => attributeLongestRoad(uuid)}>
                <div className="img">{player.hasLongestRoad && <div className="checked" />}</div>
                <p>Route la plus longue</p>
              </div>
              <div className="action army" onClick={() => attributeStrongestArmy(uuid)}>
                <div className="img">{player.hasStrongestArmy && <div className="checked" />}</div>
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
