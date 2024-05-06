import type { FC } from 'react';

import TaskViewPopup from '@popup/TaskViewPopup';
import DashboardCreatePopup from '@popup/DashboardCreatePopup';
import TaskCreatePopup from '@popup/TaskCreatePopup';

/** PopupsList -  */
const PopupsList: FC = () => {
  return (
    <>
      <DashboardCreatePopup />
      <TaskCreatePopup />
      <TaskViewPopup />
    </>
  );
};

export default PopupsList;
