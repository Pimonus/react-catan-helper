import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import PlayerModal from '@modules/players/PlayerModal';
import NewPlayerModal from '@modules/players/NewPlayerModal';
import {
  addCity,
  addColony,
  addNewPlayer,
  addVictoryPoint,
  attributeLongestRoad,
  attributeStrongestArmy,
  deletePlayer,
  deselectPlayer,
  destroyCity,
  destroyColony,
  removeVictoryPoint,
  savePlayerNickname,
  selectPlayer,
} from '@actions/players';
import { CatanState } from '@core/types';

import armyIcon from '@images/army_icon.png';
import medalIcon from '@images/medal_icon.png';
import roadIcon from '@images/road_icon.png';

import './PlayerContainer.css';

const PlayerContainer = () => {
  const [showNewPlayerModal, toggleNewPlayerModal] = useState(false);

  const selectedPlayerUuid = useSelector((state: CatanState) => state.selectedPlayerUuid);
  // use history values if history mode is enabled
  const players = useSelector((state: CatanState) => {
    const { enabled: isHistoryEnabled } = state.gameHistory;
    const { visualizedTurnState } = state.gameHistory;

    return isHistoryEnabled && visualizedTurnState ? visualizedTurnState.players : state.players;
  });
  const playerCount = players.length;
  const selectedPlayer = players.find(player => player.uuid === selectedPlayerUuid);

  const dispatch = useDispatch();

  const submitNewPlayer = (nickname: string) => {
    toggleNewPlayerModal(false);
    dispatch(addNewPlayer(nickname));
  };

  return (
    <div className="player-container">
      {players.map((player, index) => (
        <div key={`player_${index}`}>
          <div
            className={cn('player', { leader: player.isLeader })}
            data-bg={index % playerCount}
            onClick={() => dispatch(selectPlayer(player.uuid))}
          >
            <div className="avatar" data-avatar={index % playerCount}></div>
            <p className="nickname">{player.nickname}</p>
          </div>
          <p className="score">
            {`${player.score} points de victoire`}
            {player.isLeader && (
              <span>
                <img src={medalIcon} alt="Catan" />
              </span>
            )}
            {player.hasStrongestArmy && (
              <span>
                <img src={armyIcon} alt="Catan" />
              </span>
            )}
            {player.hasLongestRoad && (
              <span>
                <img src={roadIcon} alt="Catan" />
              </span>
            )}
          </p>
        </div>
      ))}
      <button className="new-player" onClick={() => toggleNewPlayerModal(!showNewPlayerModal)}>
        + Nouveau Joueur
      </button>
      {showNewPlayerModal && (
        <NewPlayerModal
          cancel={() => toggleNewPlayerModal(false)}
          submitAndClose={nickname => submitNewPlayer(nickname)}
        />
      )}
      {selectedPlayer && (
        <PlayerModal
          // data
          player={selectedPlayer}
          // functions
          deselect={() => dispatch(deselectPlayer())}
          addCity={uuid => dispatch(addCity(uuid))}
          addColony={uuid => dispatch(addColony(uuid))}
          addVictoryPoint={uuid => dispatch(addVictoryPoint(uuid))}
          attributeLongestRoad={uuid => dispatch(attributeLongestRoad(uuid))}
          attributeStrongestArmy={uuid => dispatch(attributeStrongestArmy(uuid))}
          deletePlayer={uuid => dispatch(deletePlayer(uuid))}
          destroyCity={uuid => dispatch(destroyCity(uuid))}
          destroyColony={uuid => dispatch(destroyColony(uuid))}
          removeVictoryPoint={uuid => dispatch(removeVictoryPoint(uuid))}
          savePlayerNickname={(uuid, nickname) => dispatch(savePlayerNickname(uuid, nickname))}
        />
      )}
    </div>
  );
};

export default PlayerContainer;