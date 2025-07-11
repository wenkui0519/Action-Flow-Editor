import { FunctionComponent, useContext, useMemo } from 'react';

import {
  useStartDragNode,
  FlowNodeRenderData,
  FlowNodeBaseType,
  FlowGroupService,
  type FlowNodeEntity,
  SelectorBoxPopoverProps,
} from '@flowgram.ai/fixed-layout-editor';
import { Tooltip } from '@douyinfe/semi-ui';

import { FlowCommandId } from '../../shortcuts/constants';
import { ConfigContext } from '../../context';

const BUTTON_HEIGHT = 24;

export const SelectorBoxPopover: FunctionComponent<SelectorBoxPopoverProps> = ({
  bounds,
  children,
  flowSelectConfig,
  commandRegistry,
}) => {
  const selectNodes = flowSelectConfig.selectedNodes;

  const { startDrag } = useStartDragNode();

  const draggable = selectNodes[0]?.getData(FlowNodeRenderData)?.draggable;

  // Does the selected component have a group node? (High-cost computation must use memo)
  const hasGroup: boolean = useMemo(() => {
    if (!selectNodes || selectNodes.length === 0) {
      return false;
    }
    const findGroupInNodes = (nodes: FlowNodeEntity[]): boolean =>
      nodes.some((node) => {
        if (node.flowNodeType === FlowNodeBaseType.GROUP) {
          return true;
        }
        if (node.blocks && node.blocks.length) {
          return findGroupInNodes(node.blocks);
        }
        return false;
      });
    return findGroupInNodes(selectNodes);
  }, [selectNodes]);

  const canGroup = !hasGroup && FlowGroupService.validate(selectNodes);

  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: bounds.right,
          top: bounds.top,
          transform: 'translate(-100%, -100%)',
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="eui-d-flex"
          style={{
            columnGap: "2px",
          }}
        >
          {draggable && (
            <Tooltip content={langs.drag_node || "Drag"}>
              <button className="eui-btn eui-icon-btn"
                style={{
                  cursor: 'grab',
                  height: BUTTON_HEIGHT,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  startDrag(e, {
                    dragStartEntity: selectNodes[0],
                    dragEntities: selectNodes,
                  });
                }}>
                <span className="eui-icon icon-move-list"></span>
              </button>
            </Tooltip>
          )}

          <Tooltip content={langs.collapse || 'Collapse'}>
            <button className="eui-btn eui-icon-btn"
              style={{
                height: BUTTON_HEIGHT,
              }}
              onClick={(e) => {
                commandRegistry.executeCommand(FlowCommandId.COLLAPSE);
              }}>
              <span className="eui-icon icon-cancel-fullscreen"></span>
            </button>
          </Tooltip>

          <Tooltip content={langs.expand || 'Expand'}>
            <button className="eui-btn eui-icon-btn"
              style={{
                height: BUTTON_HEIGHT,
              }}
              onClick={(e) => {
                commandRegistry.executeCommand(FlowCommandId.EXPAND);
              }}>
              <span className="eui-icon icon-fullscreen"></span>
            </button>
          </Tooltip>

          <Tooltip content={langs.group || 'Group'}>
            <button className="eui-btn eui-icon-btn"
              style={{
                display: canGroup ? 'inherit' : 'none',
                height: BUTTON_HEIGHT,
              }}
              onClick={(e) => {
                commandRegistry.executeCommand(FlowCommandId.GROUP);
              }}>
              <span className="eui-icon icon-combination"></span>
            </button>
          </Tooltip>

          {/* <Tooltip content={'Copy'}>
            <Button
              icon={<IconCopy />}
              style={{ height: BUTTON_HEIGHT }}
              type="primary"
              theme="solid"
              onClick={() => {
                commandRegistry.executeCommand(FlowCommandId.COPY);
              }}
            />
          </Tooltip> */}

          <Tooltip content={langs.delete_node || 'Delete'}>
            <button className="eui-btn eui-icon-btn"
              style={{
                height: BUTTON_HEIGHT,
              }}
              onClick={(e) => {
                commandRegistry.executeCommand(FlowCommandId.DELETE);
              }}>
              <span className="eui-icon icon-delete"></span>
            </button>
          </Tooltip>
        </div>
      </div>
      <div
        style={{ cursor: draggable ? 'grab' : 'auto' }}
        onMouseDown={(e) => {
          e.stopPropagation();
          startDrag(e, {
            dragStartEntity: selectNodes[0],
            dragEntities: selectNodes,
          });
        }}
      >
        {children}
      </div>
    </>
  );
};
