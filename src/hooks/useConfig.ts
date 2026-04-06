import { useConfigContext } from '@/src/context/ConfigContext';

export function useConfig() {
  const { config } = useConfigContext();
  return config;
}
