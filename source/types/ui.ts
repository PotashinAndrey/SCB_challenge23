export type PropsWithClassName = { className?: string };

export type UIThemeType = 'light' | 'dark';
export type UIThemeChangeHandler = (toDark: boolean) => void; // !

export type UIThemeProps = {
  theme: UIThemeType;
  changeTheme: UIThemeChangeHandler;
};
