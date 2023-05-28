import { FC, useState } from "react";
import type { UUID } from "node:crypto";
import { useUnit } from "effector-react";
import { Modal, Button, Select } from 'antd';
import type { DepartmentModel } from "@app/types/model/department";
import { applicantProcessPopup, applicantData, candidateApply } from "../context/model/applicant";
import { processesListData } from "../context/model/process";
import CandidateInfo from "../components/CandidateInfo";

/** ApplicantProcessPopup -  */
const ApplicantProcessPopup: FC = () => {
  const { open, close, visible } = useUnit(applicantProcessPopup);
  const { store, loading } = useUnit(processesListData);
  const { store: candidate } = useUnit(applicantData);
  const [selectedProcess, setSelectedProcess] = useState<string>();

  const departmentsOptions = store?.items.map((item: DepartmentModel) => {
    return {
      label: item.name,
      value: item.id
    }
  });

  const handleCandidateApply = (id: UUID) => {
    candidateApply({
      candidateId: id,
      processId: selectedProcess
    });
    close();
  }

  return (
    <Modal
      open={visible}
      width={700}
      onCancel={close}
      footer={(
        <div className="flex space-between mt-8">
          <Button type="link" danger key="reject" onClick={() => { }}>
            Отказать
          </Button>
          <div>
            <Button key="back" type="link" onClick={close}>
              Закрыть
            </Button>
            <Button
              type="primary"
              key="goOn"
              onClick={() => handleCandidateApply(candidate.id)}
              disabled={!selectedProcess}
            >
              Взять на рассмотрение
            </Button>
          </div>
        </div>
      )}
    >

      <CandidateInfo candidate={candidate} />

      <Select
        defaultValue="Выбор процесса"
        className="w-card"
        onChange={(value) => { setSelectedProcess(value) }}
        options={departmentsOptions}
      />

    </Modal>
  );
};

export default ApplicantProcessPopup;
