/* @flow */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import PlayerModal from './PlayerModal';
import NewPlayerModal from './NewPlayerModal';
import * as playerActions from '../../../redux/actions/players';
import type { CatanState, Dispatch, Player } from '../../../flow';

import armyIcon from '../../../assets/images/army_icon.png';
import medalIcon from '../../../assets/images/medal_icon.png';
import roadIcon from '../../../assets/images/road_icon.png';

import './PlayerContainer.css';

type OwnProps = {
  +pausedGame: boolean,
};

type StateProps = {
  +players: $ReadOnlyArray<Player>,
  +selectedPlayerUuid?: string,
};

type DispatchProps = {
  +addCity: (playerUuid: string) => any,
  +addColony: (playerUuid: string) => any,
  +addNewPlayer: (nickname: string) => any,
  +addVictoryPoint: (playerUuid: string) => any,
  +attributeLongestRoad: (playerUuid: string) => any,
  +attributeStrongestArmy: (playerUuid: string) => any,
  +deletePlayer: (playerUuid: string) => any,
  +deselectPlayer: () => any,
  +destroyCity: (playerUuid: string) => any,
  +removeVictoryPoint: (playerUuid: string) => any,
  +savePlayerNickname: (playerUuid: string, nickname: string) => any,
  +selectPlayer: (playerUuid: string) => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  players: state.players,
  selectedPlayerUuid: state.selectedPlayerUuid,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  addCity: playerUuid => dispatch(playerActions.addCity(playerUuid)),
  addColony: playerUuid => dispatch(playerActions.addColony(playerUuid)),
  addNewPlayer: nickname => dispatch(playerActions.addNewPlayer(nickname)),
  addVictoryPoint: playerUuid =>
    dispatch(playerActions.addVictoryPoint(playerUuid)),
  attributeLongestRoad: playerUuid =>
    dispatch(playerActions.attributeLongestRoad(playerUuid)),
  attributeStrongestArmy: playerUuid =>
    dispatch(playerActions.attributeStrongestArmy(playerUuid)),
  deletePlayer: playerUuid => dispatch(playerActions.deletePlayer(playerUuid)),
  deselectPlayer: () => dispatch(playerActions.deselectPlayer()),
  destroyCity: playerUuid => dispatch(playerActions.destroyCity(playerUuid)),
  removeVictoryPoint: playerUuid =>
    dispatch(playerActions.removeVictoryPoint(playerUuid)),
  selectPlayer: playerUuid => dispatch(playerActions.selectPlayer(playerUuid)),
  savePlayerNickname: (playerUuid, nickname) =>
    dispatch(playerActions.savePlayerNickname(playerUuid, nickname)),
});

type Props = OwnProps & StateProps & DispatchProps;

const DicesContainer = (props: Props) => {
  const [showNewPlayerModal, toggleNewPlayerModal] = useState(false);

  const {
    // data
    pausedGame,
    players,
    selectedPlayerUuid,
    // functions
    addCity,
    addColony,
    addNewPlayer,
    addVictoryPoint,
    attributeLongestRoad,
    attributeStrongestArmy,
    deletePlayer,
    deselectPlayer,
    destroyCity,
    removeVictoryPoint,
    savePlayerNickname,
    selectPlayer,
  } = props;
  const playerCount = players.length;

  const submitNewPlayer = (nickname: string) => {
    toggleNewPlayerModal(false);
    addNewPlayer(nickname);
  };

  const selectedPlayer = players.find(
    player => player.uuid === selectedPlayerUuid
  );

  return (
    <div
      className={cn('player-container', {
        hidden: pausedGame,
      })}
    >
      {players.map((player, index) => {
        return (
          <>
            <div
              key={`player_${index}`}
              className={cn('player', {
                leader: player.isLeader,
              })}
              data-bg={index % playerCount}
              onClick={() => selectPlayer(player.uuid)}
            >
              <div className="avatar" data-avatar={index % playerCount}></div>
              <p className="nickname">{player.nickname}</p>
            </div>
            <p className="score">
              {`${player.score} points de victoire`}
              {player.isLeader ? (
                <span>
                  <img src={medalIcon} alt="Catan" />
                </span>
              ) : null}
              {player.hasStrongestArmy ? (
                <span>
                  <img src={armyIcon} alt="Catan" />
                </span>
              ) : null}
              {player.hasLongestRoad ? (
                <span>
                  <img src={roadIcon} alt="Catan" />
                </span>
              ) : null}
            </p>
          </>
        );
      })}
      <button
        className="new-player"
        onClick={() => toggleNewPlayerModal(!showNewPlayerModal)}
      >
        + Nouveau Joueur
      </button>
      {showNewPlayerModal ? (
        <NewPlayerModal
          cancel={() => toggleNewPlayerModal(false)}
          submitAndClose={nickname => submitNewPlayer(nickname)}
        />
      ) : null}
      {selectedPlayer && (
        <PlayerModal
          // data
          player={selectedPlayer}
          // functions
          deselect={deselectPlayer}
          addCity={uuid => addCity(uuid)}
          addColony={uuid => addColony(uuid)}
          addVictoryPoint={uuid => addVictoryPoint(uuid)}
          attributeLongestRoad={uuid => attributeLongestRoad(uuid)}
          attributeStrongestArmy={uuid => attributeStrongestArmy(uuid)}
          deletePlayer={uuid => deletePlayer(uuid)}
          destroyCity={uuid => destroyCity(uuid)}
          removeVictoryPoint={uuid => removeVictoryPoint(uuid)}
          savePlayerNickname={(uuid, nickname) =>
            savePlayerNickname(uuid, nickname)
          }
        />
      )}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicesContainer);
