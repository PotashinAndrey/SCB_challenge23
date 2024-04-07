import type { FC, PropsWithChildren } from 'react';
import cn from 'classnames';
import { Card } from 'antd';
import type { PropsWithClassName } from '@app/types/ui';

type PaperProps = PropsWithChildren & PropsWithClassName;

const Paper: FC<PaperProps> = props => {
  const { children, className } = props;

  const classes = cn('ui-paper', className);
  // return <div className={classes}>{children}</div>;
  return (
    <Card className={classes}>
      {children}
    </Card>
  );
};

export default Paper;
