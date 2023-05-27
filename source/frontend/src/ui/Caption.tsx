
import type { FC, PropsWithChildren } from "react";
import type { PropsWithClassName } from "@app/types/ui";
import cn from "classnames";
import { Typography } from 'antd';

type CaptionProps = PropsWithChildren & PropsWithClassName & { level?: 1 | 2 | 3 | 4 | 5 };

const { Title } = Typography;

const Caption: FC<CaptionProps> = props => {
  const { className, children, level = 3 } = props;
  return <Title level={level} className={className}>{children}</Title>;
};

export default Caption;
