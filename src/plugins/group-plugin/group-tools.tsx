import { useContext, type CSSProperties, type FC } from 'react';

import {
  useService,
  useStartDragNode,
  FlowGroupService,
  type FlowNodeEntity,
  type FlowGroupController,
  useClientContext,
} from '@flowgram.ai/fixed-layout-editor';
import { Tooltip } from '@douyinfe/semi-ui';
import { ConfigContext } from '../../context';

interface GroupToolsProps {
  groupNode: FlowNodeEntity;
  groupController: FlowGroupController;
  visible: boolean;
  style?: CSSProperties;
}

const BUTTON_HEIGHT = 24;

export const GroupTools: FC<GroupToolsProps> = (props) => {
  const { groupNode, groupController, visible, style = {} } = props;

  const groupService = useService<FlowGroupService>(FlowGroupService);
  const { operation, playground, clipboard } = useClientContext();

  const { startDrag } = useStartDragNode();

  const buttonStyle = {
    cursor: 'pointer',
    height: BUTTON_HEIGHT,
  };
  if (playground.config.readonly) return null;

  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return (
    <div
      style={{
        display: 'flex',
        opacity: visible ? 1 : 0,
        gap: 5,
        paddingBottom: 5,
        color: 'rgb(97, 69, 211)',
        ...style,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="eui-d-flex">
        <Tooltip content="Drag">
          <button className="eui-btn eui-icon-btn"
            style={{ ...buttonStyle, cursor: 'grab' }}
            onMouseDown={(e) => {
              e.stopPropagation();
              startDrag(e, {
                dragStartEntity: groupNode,
                dragEntities: [groupNode],
              });
            }}
          >
            <span className="eui-icon icon-move-list"></span>
          </button>
        </Tooltip>

        <Tooltip content={groupController?.collapsed ? (langs.expand || 'Expand') : (langs.collapse || 'Collapse')}>
          <button className="eui-btn eui-icon-btn"
            style={buttonStyle}
            onClick={(e) => {
              if (!groupController) {
                return;
              }
              e.stopPropagation();
              if (groupController.collapsed) {
                groupController.expand();
              } else {
                groupController.collapse();
              }
            }}>
            <span className={"eui-icon " + (groupController?.collapsed ? 'icon-fullscreen' : 'icon-cancel-fullscreen')}></span>
          </button>
        </Tooltip>
        <Tooltip content={langs.un_group || "Ungroup"}>
          <button className="eui-btn eui-icon-btn"
            style={buttonStyle}
            onClick={() => {
              groupService.ungroup(groupNode);
            }}>
            <span className="eui-icon icon-cancel-combination"></span>
          </button>
        </Tooltip>
        {/* <Tooltip content="Copy">
          <Button
            icon={<IconCopy />}
            style={buttonStyle}
            type="primary"
            theme="borderless"
            onClick={() => {
              const nodeJSON = groupNode.toJSON();

              writeData([nodeJSON], clipboard);
              Toast.success({
                content: 'Copied. You can move to any [+] to paste.',
              });
            }}
          />
        </Tooltip> */}
        <Tooltip content={langs.delete_node || "Delete"}>
          <button className="eui-btn eui-icon-btn"
            style={buttonStyle}
            onClick={() => {
              operation.deleteNode(groupNode);
            }}>
            <span className="eui-icon icon-delete"></span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
