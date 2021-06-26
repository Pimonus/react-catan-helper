import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

// hooks
import useGameStats from '@hooks/useGameStats';
import useMount from '@hooks/useMount';
// actions
import gameActions from '@actions/game';
// images
import normalDistributionImage from '@images/normal_distribution.png';

import './GameStatsContainer.css';

const GameStatsContainer = () => {
  const dispatch = useDispatch();
  const { stats } = useGameStats();

  const [discovered, setDiscovered] = useState(false);

  useMount(() => {
    setTimeout(() => {
      setDiscovered(true);
    }, 0);
  });

  const closeStats = () => {
    setDiscovered(false);
    dispatch(gameActions.closeStats);
  };

  const renderBars = () => {
    if (!stats) return null;
    const { distribution } = stats;
    let maxScore: number;
    distribution.forEach(score => {
      if (!maxScore || score.total > maxScore) {
        maxScore = score.total;
      }
    });
    const bars = distribution.map(score => {
      const percentage = score.total / maxScore;
      return (
        <span
          className="bar"
          key={`bar-${score.score}`}
          style={{ width: 20, height: `${percentage * 100}%` }}
        >
          <span className="score">{score.score}</span>
          {score.total > 0 && <span className="total">{score.total}</span>}
        </span>
      );
    });
    return bars;
  };

  return (
    <div className={cn('game-stats-container', { discovered })}>
      <span className="cancel-cross" onClick={closeStats} />
      <div className="stats">{renderBars()}</div>
      <div className="normal-distribution">
        <img src={normalDistributionImage} alt="normal-distribution" />
      </div>
    </div>
  );
};

export default GameStatsContainer;
