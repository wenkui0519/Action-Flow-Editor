import { nanoid } from 'nanoid';

import { FlowNodeRegistry } from '../../typings';
import { defaultFormMeta } from '../default-form-meta';

/**
 * Break 节点用于在 loop 中根据条件终止并跳出
 */
export const BreakLoopNodeRegistry: FlowNodeRegistry = {
  title: 'BreakLoop',
  type: 'breakLoop',
  extend: 'end',
  info: {
    icon: 'icon-minus-circle',
    description: 'Break in current Loop.',
  },
  meta: {
    style: {
      width: 240,
    },
  },
  /**
   * Render node via formMeta
   */
  formMeta: defaultFormMeta,
  canAdd(ctx, from) {
    while (from.parent) {
      if (from.parent.flowNodeType === 'loop') return true;
      from = from.parent;
    }
    return false;
  },
  onAdd(ctx, from, langs) {
    return {
      id: `break_${nanoid()}`,
      type: 'breakLoop',
      data: {
        title: langs?.break_loop_node || 'BreakLoop',
        type: 'breakLoop',
      },
    };
  },
};
