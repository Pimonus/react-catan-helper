import { useEffect } from 'react';

const useMount = (onMount: () => any) =>
  useEffect(() => {
    onMount();
  }, []);

export default useMount;
