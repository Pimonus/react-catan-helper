import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// actions
import gameActions from '@actions/game';
import { enableHistoryMode } from '@actions/gameHistory';
// icons
import { ReactComponent as BurgerMenuIcon } from './icons/menu.svg';
import { ReactComponent as HistoryIcon } from './icons/history.svg';
import { ReactComponent as StatsIcon } from './icons/stats.svg';

import './Menu.css';

const Menu = () => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

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
          <div className="entry" onClick={e => dispatchMenuAction(e, enableHistoryMode)}>
            <HistoryIcon />
            <p>Historique de la partie</p>
          </div>
          <div className="entry" onClick={e => dispatchMenuAction(e, gameActions.showStats)}>
            <StatsIcon />
            <p>Statistiques</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
