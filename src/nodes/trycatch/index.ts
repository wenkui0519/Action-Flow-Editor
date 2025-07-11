import { nanoid } from 'nanoid';

import { FlowNodeRegistry } from '../../typings';
import { defaultFormMeta } from '../default-form-meta';

export const TryCatchNodeRegistry: FlowNodeRegistry = {
  title: 'TryCatch',
  type: 'tryCatch',
  info: {
    icon: 'icon-attention',
    description: 'try catch.',
  },
  meta: {
    // style: {
    //   width: 240,
    // },
  },
  formMeta: defaultFormMeta,
  onAdd(ctx, from, langs) {
    return {
      id: `tryCatch${nanoid(5)}`,
      type: 'tryCatch',
      data: {
        title: langs?.try_catch_node || 'TryCatch',
        type: 'tryCatch',
      },
      blocks: [
        {
          id: `tryBlock${nanoid(5)}`,
          type: 'tryBlock',
          data: {
            title: langs?.try_block_node || 'Try Block',
            type: 'tryBlock',
          },
          blocks: [],
        },
        {
          id: `catchBlock${nanoid(5)}`,
          type: 'catchBlock',
          blocks: [],
          data: {
            title: `${langs?.catch_block_node || 'Catch Block'}_1`,
            type: 'catchBlock',
          },
        },
      ],
    };
  },
};
