import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// actions
// import { moveBarbariansForward } from '@actions/barbarians';
import { disableShortcuts/*, enableThief, saveGame*/ } from '@actions/game';
import { dismissSwal, fireSwal } from '@actions/swal';
// components
import BarbariansSwal from '@modules/swals/BarbariansSwal';
import ThiefSwal from '@modules/swals/ThiefSwal';
// helpers
// import { didBarbariansProgress, didBarbariansReachCoast, getDicesScore, THIEF_SCORE } from '@/core';
// types
import { CatanState } from '@core/types';

import './SwalManager.css';

const swal = withReactContent(Swal);
const swalDelay = 2000;
const swalTimmer = 5000;

interface SwalWithCallback {
  swal: {
    timer: number,
    showConfirmButton: boolean,
    html: any,
  };
  callback: () => any;
};

const dicesHaveBeenRevealed = (flipped: boolean, stillFlipped: boolean) => flipped && !stillFlipped;

const SwalManager = () => {
  const dispatch = useDispatch();

  const _createdAt = useSelector((state: CatanState) => state._createdAt);
  const barbarians = useSelector((state: CatanState) => state.barbarians);
  const dices = useSelector((state: CatanState) => state.dices);
  const game = useSelector((state: CatanState) => state.game);

  useEffect(() => {

  }, [_createdAt, barbarians, dices, game]);

  const processSwalQueue = async (swalQueue: SwalWithCallback[]) => {
    dispatch(disableShortcuts());
    await new Promise(r => setTimeout(r, swalDelay));
    dispatch(fireSwal());
    await swalQueue.reduce(async (previous, item) => {
      await previous;
      await swal.fire(item.swal);
      item.callback();
    }, Promise.resolve());
  }

  // async componentDidUpdate(prevProps: Props) {
  //   const { dices: prevDices, game } = prevProps;
  //   const { barbarians, dices } = this.props;
  //   const thiefWasNotEnabled = !game.enabledThief;

  //   if (
  //     prevProps._createdAt === this.props._createdAt &&
  //     dicesHaveBeenRevealed(prevDices.flipped, dices.flipped)
  //   ) {
  //     const dicesScore = getDicesScore(dices.values);
  //     const swalQueue: SwalWithCallback[] = [];

  //     // Enabled thief swal
  //     if (thiefWasNotEnabled && dicesScore === THIEF_SCORE)
  //       swalQueue.push({
  //         swal: {
  //           timer: swalTimmer,
  //           showConfirmButton: false,
  //           html: <ThiefSwal />,
  //         },
  //         callback: () => dispatch(enableThief()),
  //       });

  //     // Barbarians progress swal
  //     if (didBarbariansProgress(dices.values)) {
  //       swalQueue.push({
  //         swal: {
  //           timer: swalTimmer,
  //           showConfirmButton: false,
  //           html: <BarbariansSwal attack={didBarbariansReachCoast(barbarians.position)} />,
  //         },
  //         callback: () => dispatch(moveBarbariansForward()),
  //       });
  //     }

  //     if (swalQueue.length > 0) await processSwalQueue(swalQueue);
  //     dispatch(saveGame());
  //   }
  // }

  return null;
}

export default SwalManager;
