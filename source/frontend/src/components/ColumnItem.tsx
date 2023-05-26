import type { FC } from "react";
import { Tag, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, AlipayCircleOutlined } from '@ant-design/icons';

import type { BoardCardModelType } from "@app/types/model/board";

type ColumnItemProps = {
  task: BoardCardModelType;
  // title: string;
  // tagText: string;
  // id: string;
}

const ColumnItem: FC<ColumnItemProps> = props => {
  const { task } = props;
  const { name, id } = task;

  const tagText = task.step; // !

  // const [isModalOpen, setModalOpen] = useState(false);

  const handleDragStart = (ev: any) => {
    ev.dataTransfer.setData("itemId", id);
  }

  // const handleClik = () => {
  //   setModalOpen(false);
  // }

  return (
    // <>
      <Card
        hoverable
        size="small"
        title={name}
        // onClick={() => setModalOpen(true)}
        onDragStart={handleDragStart}
        draggable
        // extra={<a>Открыть</a>}
        // style={{ width: 300 }}
        className="w-card"
        actions={[
          <EditOutlined />,
          <SettingOutlined />,
          <EllipsisOutlined />,
          <AlipayCircleOutlined />
        ]}
      >
        <Card.Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
          title="Card title"
          description="This is the description"
        />
        <Tag color="yellow">{tagText}</Tag>
      </Card>
    // </>
  );

  {/* <div
    onClick={() => setModalOpen(true)}
    draggable
    onDragStart={handleDragStart}
    className="column-item-component boxAndRadius"
  >
    <p className="column-item-header">{title}</p>
    <Tag color="yellow">{tagText}</Tag>
  </div> */}
  {/* <CandidateModal isModalOpen={isModalOpen} handleClose={handleClik} /> */}
}

export default ColumnItem;
