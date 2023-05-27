import type { FC, ReactNode, PropsWithChildren } from "react";
import type { PropsWithClassName } from "@app/types/ui";
import { List, Spin, Typography } from 'antd';
import cn from "classnames";
import Paper from "../ui/Paper";
import Caption from "../ui/Caption";

const { Text } = Typography;

type PageListProps = PropsWithChildren & PropsWithClassName & {
  caption?: string;
  description?: string;
  dataSource?: Array<any>;
  renderItem?: ((item: any, index: number) => ReactNode) | undefined;
  loading?: boolean;
}

/** PageList -  */
const PageList: FC<PageListProps> = props => {
  const { children, className, caption, dataSource, renderItem, loading, description } = props;
  const classes = cn("w-main margin-center mt-content mb-content", className);

  return (
    <div className={classes}>
      {Boolean(caption || description) && (
        <div className="ta-c mb-8">
          {Boolean(caption) && <Caption>{caption}</Caption>}
          {Boolean(description) && <Text>{description}</Text>}
        </div>
      )}

      <Paper className="primary bordered">
        {Boolean(children) && (
          <Paper className="primary mb-4 bordered no-shadow">
            {children}
          </Paper>
        )}

        <Spin spinning={loading}>
          <List
            size="large"
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={renderItem}
          />
        </Spin>
      </Paper>
    </div>
  );
};

export default PageList;
