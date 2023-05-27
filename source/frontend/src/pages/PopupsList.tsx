import type { FC } from "react";

import ApplicantProcessPopup from '../popup/ApplicantProcessPopup';
import CandidateProcessPopup from '../popup/CandidateProcessPopup';
import VacancyCreate from '../popup/VacancyCreate';
import InterviewPopup from '../popup/InterviewPopup';
import ProcessCreateStepAppendPopup from "../popup/ProcessCreateStepAppendPopup";

/** PopupsList -  */
const PopupsList: FC = () => {
  return (
    <>
      <ApplicantProcessPopup />
      <CandidateProcessPopup/>
      <InterviewPopup/>
      <VacancyCreate/>
      <ProcessCreateStepAppendPopup />
    </>
  );
};

export default PopupsList;
