import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// actions
import { moveBarbariansForward } from '@actions/barbarians';
import gameActions from '@actions/game';
import swalActions from '@actions/swal';
// components
import BarbariansSwal from '@modules/swals/BarbariansSwal';
import ThiefSwal from '@modules/swals/ThiefSwal';
// helpers
import { didBarbariansProgress, didBarbariansReachCoast, getDicesScore } from '@core/index';
// types
import { CatanState } from '@core/types';
import { THIEF_SCORE } from '@redux/types/dices';

import './SwalManager.less';

const swal = withReactContent(Swal);
const swalDelay = 2000;
const swalTimmer = 5000;

interface SwalWithCallback {
  swal: {
    timer: number;
    showConfirmButton: boolean;
    html: any;
  };
  callback: () => any;
}

const dicesHaveBeenRevealed = (flipped?: boolean, stillFlipped?: boolean) =>
  flipped && !stillFlipped;

const SwalManager = () => {
  const dispatch = useDispatch();

  const _createdAt = useSelector((state: CatanState) => state._createdAt);
  const barbarians = useSelector((state: CatanState) => state.barbarians);
  const dices = useSelector((state: CatanState) => state.dices);
  const game = useSelector((state: CatanState) => state.game);

  const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const _prevCreatedAt = usePrevious(_createdAt);
  const wasThiefEnabled = usePrevious(game.enabledThief);
  const wereDicesFlipped = usePrevious(dices.flipped);

  useEffect(() => {
    const manageSwals = async () => {
      if (_prevCreatedAt === _createdAt && dicesHaveBeenRevealed(wereDicesFlipped, dices.flipped)) {
        const dicesScore = getDicesScore(dices.values);
        const swalQueue: SwalWithCallback[] = [];

        if (!wasThiefEnabled && dicesScore === THIEF_SCORE)
          swalQueue.push({
            swal: {
              timer: swalTimmer,
              showConfirmButton: false,
              html: <ThiefSwal />,
            },
            callback: () => dispatch(gameActions.enableThief),
          });

        if (didBarbariansProgress(dices.values)) {
          swalQueue.push({
            swal: {
              timer: swalTimmer,
              showConfirmButton: false,
              html: <BarbariansSwal attack={didBarbariansReachCoast(barbarians.position)} />,
            },
            callback: () => dispatch(moveBarbariansForward),
          });
        }

        if (swalQueue.length > 0) await processSwalQueue(swalQueue);
        dispatch(gameActions.saveGame);
      }
    };

    manageSwals();
  }, [_createdAt, barbarians, dices, game.enabledThief]);

  const processSwalQueue = async (swalQueue: SwalWithCallback[]) => {
    dispatch(gameActions.disableShortcuts);
    await new Promise((r) => setTimeout(r, swalDelay));
    dispatch(swalActions.fire);
    await swalQueue.reduce(async (previous, item) => {
      await previous;
      await swal.fire(item.swal);
      item.callback();
    }, Promise.resolve());
  };

  return null;
};

export default SwalManager;
