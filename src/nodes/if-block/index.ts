import { FlowNodeRegistry } from '../../typings';
import { defaultFormMeta } from '../default-form-meta';

export const IFBlockNodeRegistry: FlowNodeRegistry = {
  type: 'ifBlock',
  /**
   * 分支节点需要继承自 block
   * Branch nodes need to inherit from 'block'
   */
  extend: 'block',
  meta: {
    copyDisable: true,
    addDisable: true,
    sidebarDisable: true,
    defaultExpanded: false,
  },
  info: {
    icon: '',
    description: '',
  },
  canAdd: () => false,
  canDelete: (ctx, node) => false,
  formMeta: defaultFormMeta,
};
