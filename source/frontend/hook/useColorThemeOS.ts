
import { useSyncExternalStore } from 'react';
import type { UIThemeType } from '@app/types/ui';

const osColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');

const subscribe = (callback: () => void): () => void => {
  osColorSchemeDark.addEventListener('change', callback);
  return () => osColorSchemeDark.removeEventListener('change', callback);
}

const useColorThemeOS = () => useSyncExternalStore(subscribe, (): UIThemeType => osColorSchemeDark.matches ? 'dark' : 'light');

export default useColorThemeOS;
