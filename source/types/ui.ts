export type PropsWithClassName = { className?: string };

export type UIThemeType = 'light' | 'dark';

export type UIThemeProps = {
  theme: UIThemeType;
  changeTheme: (toDark: boolean) => void; // !
};
