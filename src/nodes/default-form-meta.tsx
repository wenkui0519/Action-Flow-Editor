import { autoRenameRefEffect } from '@flowgram.ai/form-materials';
import { FormRenderProps, FormMeta, ValidateTrigger, useClientContext, FlowNodeRegistry } from '@flowgram.ai/fixed-layout-editor';

import { FlowNodeJSON } from '../typings';
import { ConfigContext, NodeRenderContext } from '../context';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON['data']>) => {

  // 获取配置
  const config = useContext(ConfigContext);
  const elRef = useRef<HTMLElement>(null);

  // 注册回调函数
  const { node, deleteNode } = useContext(NodeRenderContext);
  const clientContext = useClientContext();
  const registry = node.getNodeRegistry<FlowNodeRegistry>();
  // 删除
  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      deleteNode();
      e && e.preventDefault();
    },
    [clientContext, node]
  );
  // 删除状态
  const deleteDisabled = () => {
    if (registry.canDelete) {
      return !registry.canDelete(clientContext, node);
    }
    return registry.meta!.deleteDisable;
  };

  // 获取当前节点数据
  const nodeData = form.values;

  // 参数传递
  useEffect(() => {
    if (elRef.current) {
      elRef.current.removeAttribute('config');
      // type
      (elRef.current as any).type = node.flowNodeType;
      // config
      (elRef.current as any).config = config;
      // 当前节点数据
      (elRef.current as any).nodeData = nodeData;
      // 节点相关操作方法集合
      (elRef.current as any).flowNodeOperation = {
        'setValue': form.setValueIn,
        'getValue': form.getValueIn,
        'deleteNode': handleDelete,
        'deleteDisabled': deleteDisabled,
      };
    }
  }, [clientContext, node]);

  return (
    <>
      {/* {node.flowNodeType} */}
      {/* 传入的节点 */}
      <fixed-node-form ref={elRef}></fixed-node-form>
    </>
  );
}

export const defaultFormMeta: FormMeta<FlowNodeJSON['data']> = {
  render: renderForm,
  // validateTrigger: ValidateTrigger.onChange,
  // validate: {
  //   title: ({ value }) => (value ? undefined : 'Title is required'),
  //   'inputsValues.*': ({ value, context, formValues, name }) => {
  //     const valuePropetyKey = name.replace(/^inputsValues\./, '');
  //     const required = formValues.inputs?.required || [];
  //     if (
  //       required.includes(valuePropetyKey) &&
  //       (value === '' || value === undefined || value?.content === '')
  //     ) {
  //       return `${valuePropetyKey} is required`;
  //     }
  //     return undefined;
  //   },
  // },
  effect: {
    inputsValues: autoRenameRefEffect,
  },
};
