import { nanoid } from 'nanoid';

import { FlowNodeRegistry } from '../../typings';
import { defaultFormMeta } from '../default-form-meta';

let id = 2;
export const CaseNodeRegistry: FlowNodeRegistry = {
  title: 'Case',
  type: 'case',
  /**
   * 分支节点需要继承自 block
   * Branch nodes need to inherit from 'block'
   */
  extend: 'block',
  meta: {
    copyDisable: true,
    addDisable: true,
  },
  info: {
    icon: '',
    description: 'Execute the branch when the condition is met.',
  },
  canDelete: (ctx, node) => node.parent!.blocks.length >= 3,
  onAdd(ctx, from, langs) {
    return {
      id: `Case_${nanoid(5)}`,
      type: 'case',
      data: {
        title: `${langs?.case_node || 'Case'}_${id++}`,
        type: 'case',
      },
    };
  },
  formMeta: defaultFormMeta,
};
