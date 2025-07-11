import { nanoid } from 'nanoid';
import { FlowNodeSplitType } from '@flowgram.ai/fixed-layout-editor';

import { defaultFormMeta } from '../default-form-meta';
import { FlowNodeRegistry } from '../../typings';

export const IFNodeRegistry: FlowNodeRegistry = {
  title: 'If',
  extend: FlowNodeSplitType.STATIC_SPLIT,
  type: 'if',
  info: {
    icon: 'icon-filter',
    description: 'Only the corresponding branch will be executed if the set conditions are met.',
  },
  meta: {
  },
  formMeta: defaultFormMeta,
  onAdd(ctx, from, langs) {
    return {
      id: `if_${nanoid(5)}`,
      type: 'if',
      data: {
        title: langs?.if_node || 'If',
        type: 'if',
      },
      blocks: [
        {
          id: nanoid(5),
          type: 'ifBlock',
          data: {
            title: langs?.true_value || 'true',
            type: 'ifBlock',
            isTrue: true,
          },
          blocks: [],
        },
        {
          id: nanoid(5),
          type: 'ifBlock',
          data: {
            title: langs?.false_value || 'false',
            type: 'ifBlock',
            isTrue: false,
          },
        },
      ],
    };
  },
};
