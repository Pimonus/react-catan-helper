import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import gameActions from '@actions/game';
import Divider from '@components/Divider';
import { newPlayer } from '@core/index';
import { Player } from '@redux/types/players';

import './PlayerFactory.less';

interface Props {}

const PlayerFactory = ({  }: Props) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<number>(1);
  const [nickname, setNickname] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedPlayer && nicknameInputRef.current) nicknameInputRef.current.select();
  }, [selectedPlayer]);

  const onSubmitPlayer = useCallback(() => {
    if (selectedPlayer) {
      setPlayers(
        players.map(player => {
          if (player.uuid === selectedPlayer)
            return {
              ...player,
              nickname,
            };
          else return player;
        })
      );
      setSelectedPlayer(null);
    } else {
      setPlayers([...players, newPlayer(nickname, avatar)]);
      setAvatar((avatar + 1) % 7 || 1);
    }
    setNickname('');
  }, [avatar, nickname]);

  const onDeletePlayer = (uuid: string) => {
    setPlayers(players.filter(player => player.uuid !== uuid));
  };

  const onStartGame = () => {
    if (players.length > 2) {
      dispatch(gameActions.startGameWithPlayers(players));
    }
  };

  const onSelectPlayer = (uuid: string) => {
    setSelectedPlayer(uuid);
    const selectedPlayer = players.find(player => player.uuid === uuid);
    if (!selectedPlayer) return;
    setNickname(selectedPlayer.nickname);
  };

  const isNicknameAlreadyInUse = (nickname: string) =>
    selectedPlayer
      ? players.some(player => player.nickname === nickname && player.uuid !== selectedPlayer)
      : players.some(player => player.nickname === nickname);

  const isNewPlayerButtonDisabled = !nickname || isNicknameAlreadyInUse(nickname);

  const renderPlayers = () => {
    if (players.length) {
      return players.map(player => (
        <div key={player.uuid} className="player" onClick={() => onSelectPlayer(player.uuid)}>
          <div className="player-avatar" data-avatar={player.avatar}>
            {!selectedPlayer && (
              <div
                className="delete-cross"
                onClick={e => {
                  e.stopPropagation();
                  onDeletePlayer(player.uuid);
                }}
              />
            )}
          </div>
          <p>{player.nickname}</p>
        </div>
      ));
    } else {
      return <p className="hint">3 joueurs sont nécessaires pour démarrer la partie !</p>;
    }
  };

  return (
    <div className="player-factory modal">
      <div className="container">
        <h1>Création des joueurs</h1>
        <div className="form">
          <input
            ref={nicknameInputRef}
            placeholder="Nom du joueur"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <button
            className={cn({ disabled: isNewPlayerButtonDisabled })}
            onClick={() => {
              if (!isNewPlayerButtonDisabled) onSubmitPlayer();
            }}
          >
            {selectedPlayer ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
        <Divider width="50%" />
        <div className="list">{renderPlayers()}</div>
        <button className={cn('start', { disabled: players.length < 3 })} onClick={onStartGame}>
          Commencer la partie !
        </button>
      </div>
    </div>
  );
};

export default PlayerFactory;
