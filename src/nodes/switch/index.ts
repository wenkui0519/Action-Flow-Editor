import { nanoid } from 'nanoid';
import { FlowNodeSplitType } from '@flowgram.ai/fixed-layout-editor';

import { defaultFormMeta } from '../default-form-meta';
import { FlowNodeRegistry } from '../../typings';

export const SwitchNodeRegistry: FlowNodeRegistry = {
  title: 'Switch',
  extend: FlowNodeSplitType.DYNAMIC_SPLIT,
  type: 'switch',
  info: {
    icon: 'icon-structure',
    description:
      'Connect multiple downstream branches. Only the corresponding branch will be executed if the set conditions are met.',
  },
  meta: {
  },
  formMeta: defaultFormMeta,
  onAdd(ctx, from, langs) {
    return {
      id: `switch_${nanoid(5)}`,
      type: 'switch',
      data: {
        title: langs?.switch_node || 'Switch',
      },
      blocks: [
        {
          id: nanoid(5),
          type: 'case',
          data: {
            title: `${langs?.case_node || 'Case'}_0`,
            type: 'case',
          },
          blocks: [],
        },
        {
          id: nanoid(5),
          type: 'case',
          data: {
            title: `${langs?.case_node || 'Case'}_1`,
            type: 'case',
          },
        },
        {
          id: nanoid(5),
          type: 'caseDefault',
          data: {
            title: langs?.case_default_node || 'Default',
            type: 'caseDefault',
          },
          blocks: [],
        },
      ],
    };
  },
};
