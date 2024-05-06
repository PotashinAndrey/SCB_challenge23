import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { UIThemeType } from '@app/types/ui';
import useColorThemeOS from "./useColorThemeOS";
import type { UIThemeChangeHandler } from '@app/types/ui';

const cssVariable = '--darkmode';
const changeAppTheme: UIThemeChangeHandler = toDark => document.documentElement.style.setProperty(cssVariable, toDark ? '1' : '0');

const subscribe = (callback: () => void): () => void => {
  let value = document.documentElement.style.getPropertyValue(cssVariable);

  const styleObserver = new MutationObserver((mutations) => {
    const currentValue = (mutations[0].target as HTMLElement).style.getPropertyValue(cssVariable);

    if (currentValue !== value) {
      value = currentValue;
      callback();
    }
  });

  styleObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
  return () => styleObserver.disconnect();
}

const appThemeSet = (value: UIThemeType): void => changeAppTheme(value === "dark");

const storedColorTheme = (): UIThemeType => document.documentElement.style.getPropertyValue(cssVariable) === "1" ? "dark" : "light";

const useColorTheme = () => {
  const osTheme = useColorThemeOS();
  const appTheme = useSyncExternalStore(subscribe, storedColorTheme);

  useEffect(() => appThemeSet(osTheme), [osTheme]);
  const appThemeToggle = useCallback(() => appThemeSet(appTheme === "light" ? "dark" : "light"), [appTheme]);

  return { appTheme, appThemeSet, appThemeToggle };
}

export default useColorTheme;
