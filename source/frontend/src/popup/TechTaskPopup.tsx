import { FC, useState } from "react";
import type { UUID } from "node:crypto";
import { useUnit } from "effector-react";
import { Modal, Button, Select } from 'antd';
import type { DepartmentModel } from "@app/types/model/department";
import { applicantProcessPopup, applicantData, candidateApply, techTaskPopup } from "../context/model/applicant";
import { processesListData } from "../context/model/process";
import CandidateInfo from "../components/CandidateInfo";
import { DocsUploadField } from "src/form/input";
import { useForm } from "effector-react-form";
import { candidateCreateForm } from "src/context/candidate";

/** ApplicantProcessPopup -  */
const TechTaskPopup: FC = () => {
  const { controller, handleSubmit } = useForm({ form: candidateCreateForm });
  const { open, close, visible } = useUnit(techTaskPopup);


  const handleCandidateApply = () => {
    close();
  }

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
              Отправить
            </Button>
          </div>
        </div>
      )}
    >
        <DocsUploadField controller={controller({ name: "photo" })} label={"Техническое задание"} />

    </Modal>
  );
};

export default TechTaskPopup;
