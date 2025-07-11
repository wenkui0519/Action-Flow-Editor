// import { useContext } from 'react';
import { FlowNodeRegistry } from '../../typings';
import { defaultFormMeta } from '../default-form-meta';

export const StartNodeRegistry: FlowNodeRegistry = {
  title: 'Start',
  type: 'start',
  meta: {
    isStart: true, // Mark as start
    deleteDisable: true, // Start node cannot delete
    selectable: false, // Start node cannot select
    copyDisable: true, // Start node cannot copy
    addDisable: true, // Start Node cannot be added
  },
  info: {
    icon: 'icon-play',
    description:
      'The starting node of the workflow, used to set the information needed to initiate the workflow.',
  },
  /**
   * Render node via formMeta
   */
  formMeta: defaultFormMeta,
};
