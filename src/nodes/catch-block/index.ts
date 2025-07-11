import { nanoid } from 'nanoid';

import { FlowNodeRegistry } from '../../typings';
import { defaultFormMeta } from '../default-form-meta';

let id = 3;
export const CatchBlockNodeRegistry: FlowNodeRegistry = {
  title: 'Catch Block',
  type: 'catchBlock',
  meta: {
    copyDisable: true,
    addDisable: true,
  },
  info: {
    icon: '',
    description: 'Execute the catch branch when the condition is met.',
  },
  canAdd: () => false,
  canDelete: (ctx, node) => node.parent!.blocks.length >= 2,
  onAdd(ctx, from,langs) {
    return {
      id: `Catch_${nanoid(5)}`,
      type: 'catchBlock',
      data: {
        title: `${langs?.try_catch_node || 'Catch Block'}_${id++}`,
        type: 'catchBlock',
      },
    };
  },
  formMeta: defaultFormMeta,
};
