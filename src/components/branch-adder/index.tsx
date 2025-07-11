import { type FlowNodeEntity, useClientContext } from '@flowgram.ai/fixed-layout-editor';

import { CatchBlockNodeRegistry } from '../../nodes/catch-block';
import { CaseNodeRegistry } from '../../nodes/case';
import { Container } from './styles';
import { useContext } from 'react';
import { ConfigContext } from '../../context';

interface PropsType {
  activated?: boolean;
  node: FlowNodeEntity;
}

export default function BranchAdder(props: PropsType) {
  const { activated, node } = props;
  const nodeData = node.firstChild!.renderData;
  const ctx = useClientContext();
  const { operation, playground } = ctx;
  const { isVertical } = node;
  // 获取配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};
  function addBranch() {
    const block = operation.addBlock(
      node,
      node.flowNodeType === 'switch'
        ? CaseNodeRegistry.onAdd!(ctx, node, langs)
        : CatchBlockNodeRegistry.onAdd!(ctx, node, langs),
      {
        index: 0,
      }
    );

    setTimeout(() => {
      playground.scrollToView({
        bounds: block.bounds,
        scrollToCenter: true,
      });
    }, 10);
  }
  if (playground.config.readonlyOrDisabled) return null;

  return (
    <Container
      isVertical={isVertical}
      activated={activated}
      onMouseEnter={() => nodeData?.toggleMouseEnter()}
      onMouseLeave={() => nodeData?.toggleMouseLeave()}
    >
      <div
        onClick={() => {
          addBranch();
        }}
        aria-hidden="true"
        style={{ flexGrow: 1, textAlign: 'center' }}
      >
        <span className="eui-icon icon-append"></span>
      </div>
    </Container>
  );
}
