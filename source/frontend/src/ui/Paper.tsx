import type { FC, PropsWithChildren } from "react";
import type { PropsWithClassName } from "@app/types/ui";
import cn from "classnames";

type PaperProps = PropsWithChildren & PropsWithClassName;

const Paper: FC<PaperProps> = props => {
  const { children, className } = props;

  const classes = cn("ui-paper", className);
  return <div className={classes}>{children}</div>;
};

export default Paper;

