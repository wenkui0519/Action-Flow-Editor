import { FlowNodeRegistry } from '../../typings';
import { defaultFormMeta } from '../default-form-meta';

export const CaseDefaultNodeRegistry: FlowNodeRegistry = {
  title: 'CaseDefault',
  type: 'caseDefault',
  /**
   * 分支节点需要继承自 block
   * Branch nodes need to inherit from 'block'
   */
  extend: 'case',
  meta: {
    copyDisable: true,
    addDisable: true,
    /**
     * caseDefault 永远在最后一个分支，所以不允许拖拽排序
     * "caseDefault" is always in the last branch, so dragging and sorting is not allowed.
     */
    draggable: false,
    deleteDisable: true,
  },
  info: {
    icon: '',
    description: 'Switch default branch',
  },
  canDelete: (ctx, node) => false,
  formMeta: defaultFormMeta,
};
