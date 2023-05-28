import { FC, useState } from "react";
import type { UUID } from "node:crypto";
import { useUnit } from "effector-react";
import { Modal, Button, Select, Rate } from 'antd';
import { applicantProcessPopup, applicantData, candidateApply, techTaskPopup, techTaskRatePopup } from "../context/model/applicant";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import Paragraph from "antd/es/typography/Paragraph";

/** ApplicantProcessPopup -  */
const TechTaskRatePopup: FC = () => {
  const { open, close, visible } = useUnit(techTaskRatePopup);


  const handleCandidateApply = () => {
    close();
  }

  const customIcons: Record<number, React.ReactNode> = {
    0: <FrownOutlined />,
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  return (
    <Modal
      open={visible}
      width={700}
      onCancel={close}
      footer={(
        <div className="flex space-between mt-8">
          <div>
            <Button key="back" type="link" onClick={close}>
              Закрыть
            </Button>
            <Button
              type="primary"
              key="goOn"
              onClick={() => handleCandidateApply()}
            //   disabled={!selectedProcess}
            >
              Оценить
            </Button>
          </div>
        </div>
      )}
    >
        <Paragraph className="mb-8">Оценка технического задание</Paragraph>
        <Rate defaultValue={4} character={({ index }) => customIcons[index && index + 1 || 0]} />
    </Modal>
  );
};

export default TechTaskRatePopup;
