import { nanoid } from 'nanoid';

import { defaultFormMeta } from '../default-form-meta';
import { FlowNodeRegistry } from '../../typings';

export const LoopNodeRegistry: FlowNodeRegistry = {
  title: 'Loop',
  type: 'loop',
  info: {
    icon: 'icon-refresh',
    description:
      'Used to repeatedly execute a series of tasks by setting the number of iterations and logic',
  },
  meta: {
  },
  formMeta: defaultFormMeta,
  onAdd(ctx, from, langs) {
    return {
      id: `loop_${nanoid(5)}`,
      type: 'loop',
      data: {
        title: langs?.loop_node || 'Loop',
        type: 'loop',
      },
    };
  },
};
