import type { FC } from "react";
import { useCallback } from "react";
import { Tag, Card, Avatar, Tabs, Divider, Tooltip, Badge, Space, Typography, Descriptions } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, AlipayCircleOutlined, AntDesignOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import Amount from "../ui/Amount";
import { candidateProcessPopup } from "../context/model/applicant";


import type { BoardCardModelType } from "@app/types/model/board";
const { Text } = Typography;

type BoardTaskProps = {
  task: any; // BoardCardModelType;
  // title: string;
  // tagText: string;
  // id: string;
}

const items = [ //  TabsProps['items']
  {
    key: '1',
    label: `Найм`,
    children: (
      <Space direction="vertical">
        <Text>текущая задача по найму</Text>
        <Text>на чьей стороне "мячик"</Text>
        <Text>например, "выполняет тестовое задание"</Text>
      </Space>
    ),
  },
  {
    key: '2',
    label: `Оценки`,
    children: `Саммари оценок / заметок по кандидату по предыдущим этапам`,
  },
  {
    key: '3',
    // label: `Tab 2`,
    label: (
      <Badge count={1000} overflowCount={9} size="small">
        <MessageOutlined />
        <Text className="mr-2">Чат</Text>
      </Badge>
    ),
    children: `последние сообщения от кандидата`,
  }
];

const onChange = (key: string) => {
  console.log(key);
};

const BoardTask: FC<BoardTaskProps> = props => {
  const { task } = props;
  const { name, id, applicant } = task;
  console.log("task task", task)

  const tagText = task.step; // !

  // const [isModalOpen, setModalOpen] = useState(false);

  const handleDragStart = useCallback((ev: any) => {
    console.log("id drqagstart", task.task)
    ev.dataTransfer.setData("taskId", task.task);
  }, [task])

  // const handleClik = () => {
  //   setModalOpen(false);
  // }

  return (
    // <>
    <Badge.Ribbon text="Hippies">
      <Card
        hoverable
        // size="small"
        // title={name}
        // onClick={() => setModalOpen(true)}
        onClick={() => candidateProcessPopup.open(applicant)}
        onDragStart={handleDragStart}
        draggable
        // extra={<a>Открыть</a>}
        // tabList={tabList}
        // style={{ width: 300 }}
        className="w-card"
        actions={[
          // <Space size="large">
          //   <EditOutlined />
          //   <Badge count={1000} overflowCount={9} size="small">
          //     <MessageOutlined />
          //   </Badge>
          // </Space>,
          <Amount mode="from" value={3e5} />,
          // <SettingOutlined />,
          // <EllipsisOutlined />,
          // <AlipayCircleOutlined />
          <Avatar.Group size="small" maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            <Avatar size="small" src={"https://xsgames.co/randomusers/avatar.php?g=pixel&key=2&" + Math.random()} />
            <Avatar size="small" style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            <Tooltip title="Ant User" placement="top">
              <Avatar size="small" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Tooltip>
            <Avatar size="small" style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
          </Avatar.Group>
        ]}
      >
        <Card.Meta
          avatar={<Avatar size={60} src={"https://xsgames.co/randomusers/avatar.php?g=pixel&key=1&" + Math.random()} />}
          title={name}
          description="Должность из резюме"
        />

        <div className="mt-4">
          <Tag color="yellow">seniour</Tag>
          <Tag color="volcano">frontend</Tag>
          <Tag>удалёнка</Tag>

          <Divider />

          {/*  title="User Info" */}
          <Descriptions column={1} size="small">
            {/* <Descriptions.Item label="Инфо">26 лет</Descriptions.Item>
            <Descriptions.Item label="Образование">Высшее</Descriptions.Item> */}
            <Descriptions.Item label="Опыт">4 года 4 месяца</Descriptions.Item>
            {/* <Descriptions.Item label="Локация">Уфа, Россия</Descriptions.Item> */}
            {/* <Descriptions.Item label="Образование">УГАТУ</Descriptions.Item> */}
            {/* <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item> */}
          </Descriptions>

          <Tag>автоматизация</Tag>
          <Tag>react</Tag>

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </Card>
    </Badge.Ribbon>
    // </>
  );
}

export default BoardTask;
