import { useEffect, useState } from 'react';

import { computeGameStatistics, GameStatistics } from '@core/index';

const useGameStats = (): { stats: GameStatistics | undefined } => {
  const [stats, setStats] = useState<GameStatistics>();

  const history = JSON.parse(localStorage.getItem('gameHistory') || '');

  useEffect(() => {
    if (!stats) {
      const registeredTurns: string[] = Object.values(history);
      const turns = registeredTurns.map((turn) => JSON.parse(turn || '').dices.values);
      setStats(computeGameStatistics(turns));
    }
  }, [history, stats]);

  return { stats };
};

export default useGameStats;
