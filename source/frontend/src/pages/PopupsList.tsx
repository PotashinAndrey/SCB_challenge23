import type { FC } from "react";

import ApplicantProcessPopup from '../popup/ApplicantProcessPopup';
import CandidateProcessPopup from '../popup/CandidateProcessPopup';
import VacancyCreate from '../popup/VacancyCreate';
import InterviewPopup from '../popup/InterviewPopup';
import ProcessCreateStepAppendPopup from "../popup/ProcessCreateStepAppendPopup";
import CalendarPopup from "src/popup/CalendarPopup";

/** PopupsList -  */
const PopupsList: FC = () => {
  return (
    <>
      <ApplicantProcessPopup />
      <CandidateProcessPopup/>
      <InterviewPopup/>
      <VacancyCreate/>
      <ProcessCreateStepAppendPopup />
      <CalendarPopup/>
    </>
  );
};

export default PopupsList;
