import styled from 'styled-components';
import {
  FlowNodeEntity,
  FlowNodeRegistry,
  FlowNodeType,
  useClientContext,
} from '@flowgram.ai/fixed-layout-editor';

import { FlowNodeRegistries } from '../nodes';
import { useContext } from 'react';
import { ConfigContext } from '../context';

const NodeWrap = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 19px;
  padding: 6px 8px;
  background: #fff;
`;

const NodeLabel = styled.div`
  font-size: 14px;
  margin-left: 6px;
`;


function Node(props: { label: string; icon: string; onClick: () => void; disabled: boolean }) {
  return (
    <NodeWrap
      className='eui-bg-primary-hover eui-text-hover-primary'
      onClick={props.disabled ? undefined : props.onClick}
      style={props.disabled ? { opacity: 0.3 } : {}}
    >
      <span className={'eui-text-primary eui-icon ' + props.icon} style={{ fontSize: 16 }}></span>
      <NodeLabel>{props.label}</NodeLabel>
    </NodeWrap>
  );
}

const NodesWrap = styled.div`
  max-height: 500px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export function NodeList(props: { onSelect: (meta: any) => void; from: FlowNodeEntity }) {
  const context = useClientContext();
  // 获取配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  // 节点类型对应多语言key
  const langKey: any = {
    start: 'start_node',
    end: 'end_node',
    default: 'default_node',
    if: 'if_node',
    switch: 'switch_node',
    case: 'case_node',
    caseDefault: 'case_default_node',
    loop: 'loop_node',
    breakLoop: 'break_loop_node',
    tryCatch: 'try_catch_node',
    ifBlock: 'if_block',
    catchBlock: 'try_catch_node',
  }
  const handleClick = (registry: FlowNodeRegistry) => {
    let addProps = registry.onAdd(context, props.from, langs);
    // 添加节点回调，用于外部组件数据加工
    if (config?.beforeAdd) {
      addProps = config.beforeAdd(addProps);
    }
    props.onSelect?.(addProps);
  };
  return (
    <NodesWrap style={{ width: 80 * 2 + 20 }}>
      {FlowNodeRegistries.filter((registry) => !registry.meta?.addDisable).map((registry) => (
        <Node
          key={registry.type}
          disabled={!(registry.canAdd?.(context, props.from) ?? true)}
          icon={registry.info.icon}
          onClick={() => handleClick(registry)}
          label={langs[langKey[registry.type]] || registry.title}
        />
      ))}
    </NodesWrap>
  );
}
