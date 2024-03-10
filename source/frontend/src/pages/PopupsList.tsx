import type { FC } from 'react';

import ProcessCreateStepAppendPopup from '../popup/ProcessCreateStepAppendPopup';
import CreateDashboardPopup from '../popup/CreateDashboardPopup';

/** PopupsList -  */
const PopupsList: FC = () => {
  return (
    <>
      <ProcessCreateStepAppendPopup />
      <CreateDashboardPopup />
    </>
  );
};

export default PopupsList;
