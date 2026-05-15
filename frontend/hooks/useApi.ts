import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T,>(
  apiCall: () => Promise<T>,
  deps: React.DependencyList = [],
  options: { skipInitialCall?: boolean } = {}
) => {
  const { skipInitialCall = false } = options;
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, deps);

  useEffect(() => {
    if (!skipInitialCall) {
      execute();
    }
  }, [execute, skipInitialCall]);

  const refresh = () => {
    execute();
  };

  return { ...state, execute, refresh };
};