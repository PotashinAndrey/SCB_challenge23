import type { FC } from "react";
import "../style/CandidateStatusInfo.css";
import type { MenuProps } from 'antd';
import { Divider, Space, Tag, Dropdown, Steps } from 'antd';

interface CandidateStatusInfoProps {
    name: string,
    status: string,
    department: string,
    histories?: { date: string, message: string }[],
}

const CandidateStatusInfo: FC<CandidateStatusInfoProps> = props => {
    const { name, status, department, histories } = props;

    const items: MenuProps['items'] = [
        {
            label: 'Удалить',
            key: '1',
        }
    ];

    return (
        <div className="candidate-status">
            <div className="candidate-status__top">
                <p className="candidate-status__name">
                    {name}
                </p>
                {/* <Dropdown
                    menu={{ items }}
                >
                    <div className="candidate-status__button">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </Dropdown> */}
            </div>
            <div className="candidate-status__mid">
                <Divider
                    orientation="left"
                    orientationMargin="0"
                >
                    Status
                </Divider>
                <Space size={[0, 8]} wrap>
                    {/* <Tag color="grey">
                            {status}
                        </Tag>

                    <Tag color="grey">
                        backlog
                    </Tag>
                    <Tag color="purple">preporation</Tag>
                    <Tag color="blue">
                            in progress
                    </Tag> */}
                    <Tag color="green">approved</Tag>
                </Space>
                <Divider
                    orientation="left"
                    orientationMargin="0"
                >
                    Department step
                </Divider>
                <Space size={[0, 1]} wrap>
                    <Tag color="magenta">
                        {department}
                    </Tag>
                </Space>
            </div>
            <div className="candidate-status__bot">
                <Divider
                    orientation="left"
                    orientationMargin="0"
                >
                    History
                </Divider>
                <Steps
                    progressDot
                    current={1}
                    direction="vertical"
                    items={histories?.map(e => ({title: e.message, description: e.date}))}
                />
                {/* <ul className="candidate-status__history-list">
                    {histories?.map(history => (
                        <li>
                            <div className="candidate-status-history">
                                <div className="candidate-status-history__date">
                                    {history.date}
                                </div>
                                <div className="candidate-status-history__content">
                                    {history.message}
                                </div>
                            </div>
                        </li>
                    ))}
                    <li></li>
                    <li></li>
                </ul> */}
            </div>
        </div>
    );
}

export default CandidateStatusInfo;
