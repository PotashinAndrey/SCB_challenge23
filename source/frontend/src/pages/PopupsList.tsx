import type { FC } from "react";

import ApplicantProcessPopup from '../popup/ApplicantProcessPopup';
import CandidateProcessPopup from '../popup/CandidateProcessPopup';
import VacancyCreate from '../popup/VacancyCreate';
import InterviewPopup from '../popup/InterviewPopup';
import ProcessCreateStepAppendPopup from "../popup/ProcessCreateStepAppendPopup";
import CalendarPopup from "src/popup/CalendarPopup";
import TechTaskPopup from "src/popup/TechTaskPopup";
import TechTaskRatePopup from "src/popup/TechTaskRatePopup";

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
      <TechTaskPopup/>
      <TechTaskRatePopup/>
    </>
  );
};

export default PopupsList;
