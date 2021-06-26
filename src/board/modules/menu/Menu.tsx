import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

// actions
import gameActions from '@actions/game';
import { enableHistoryMode } from '@actions/gameHistory';
// icons
import { ReactComponent as BurgerMenuIcon } from './icons/menu.svg';
import { ReactComponent as HistoryIcon } from './icons/history.svg';
import { ReactComponent as StatsIcon } from './icons/stats.svg';
// types
import { CatanState } from '@core/types';

import './Menu.css';

const Menu = () => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const availableHistory = useSelector((state: CatanState) => state.gameHistory.turnKeys.length);

  const dispatchMenuAction = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    action: { type: string }
  ) => {
    e.stopPropagation();
    setShowMenu(false);
    dispatch(action);
  };

  return (
    <div className="menu" onClick={() => setShowMenu(prev => !prev)}>
      <BurgerMenuIcon />
      {showMenu && (
        <div className="opened-menu">
          <div
            className={cn('entry', { disabled: !availableHistory })}
            onClick={availableHistory ? e => dispatchMenuAction(e, enableHistoryMode) : undefined}
          >
            <HistoryIcon />
            <p>Historique de la partie</p>
          </div>
          <div
            className={cn('entry', { disabled: !availableHistory })}
            onClick={
              availableHistory ? e => dispatchMenuAction(e, gameActions.showStats) : undefined
            }
          >
            <StatsIcon />
            <p>Statistiques</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
