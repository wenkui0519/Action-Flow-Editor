import { FlowNodeRenderData, type FlowNodeEntity } from '@flowgram.ai/fixed-layout-editor';

import { FlowNodeRegistries } from '../../nodes';
import { UIDragNodeContainer, UIDragCounts } from './styles';
import { Icon } from '../styles';

export interface PropsType {
  dragStart: FlowNodeEntity;
  dragNodes: FlowNodeEntity[];
}

export function DragNode(props: PropsType): JSX.Element {
  const { dragStart, dragNodes } = props;

  const icon = FlowNodeRegistries.find((registry) => registry.type === dragStart?.flowNodeType)
    ?.info?.icon;

  const dragLength = (dragNodes || [])
    .map((_node) =>
      _node.allCollapsedChildren.length
        ? _node.allCollapsedChildren.filter((_n) => !_n.hidden).length
        : 1
    )
    .reduce((acm, curr) => acm + curr, 0);

  return (
    <UIDragNodeContainer>
      <Icon src={icon} />
      {dragStart?.id}
      {dragLength > 1 && (
        <>
          <UIDragCounts>{dragLength}</UIDragCounts>
        </>
      )}
    </UIDragNodeContainer>
  );
}
