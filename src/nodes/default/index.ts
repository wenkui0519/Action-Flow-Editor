import { nanoid } from 'nanoid';

import { defaultFormMeta } from '../default-form-meta';
import { FlowNodeRegistry } from '../../typings';

let index = 0;
export const DefaultNodeRegistry: FlowNodeRegistry = {
  title: 'Action',
  type: 'default',
  info: {
    icon: 'icon-operation',
    description:
      'Call the large language model and use variables and prompt words to generate responses.',
  },
  formMeta: defaultFormMeta,
  onAdd(ctx, from, langs) {
    return {
      id: `default_${nanoid(5)}`,
      type: 'default',
      data: {
        title: `${langs?.default_node || 'Action'}_${++index}`,
        type: 'default',
      },
    };
  },
};
