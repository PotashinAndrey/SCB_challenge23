import type { FC } from 'react';

import TaskViewPopup from '@popup/TaskViewPopup/TaskViewPopup';
import CreateDashboardPopup from '@popup/CreateDashboardPopup';
import TaskCreatePopup from '@popup/TaskCreatePopup';

/** PopupsList -  */
const PopupsList: FC = () => {
  return (
    <>
      <CreateDashboardPopup />
      <TaskCreatePopup />
      <TaskViewPopup />
    </>
  );
};

export default PopupsList;
