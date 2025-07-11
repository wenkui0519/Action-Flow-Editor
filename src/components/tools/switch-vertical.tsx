import { usePlaygroundTools } from '@flowgram.ai/fixed-layout-editor';
import { Tooltip } from '@douyinfe/semi-ui';
import { ConfigContext } from '../../context';
import { useContext } from 'react';

export const SwitchVertical = () => {
  const tools = usePlaygroundTools();
  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return (
    <Tooltip content={!tools.isVertical ? (langs.vertical || 'Vertical Layout') : (langs.horizontal || 'Horizontal Layout')}>
      <button className="eui-btn eui-icon-btn" onClick={() => tools.changeLayout()}>
        <span
          className={"eui-icon " + (tools.isVertical ? 'icon-vertical-layout' : 'icon-horizontal-layout')}
          style={{
            color: "#333"
          }}
        ></span>
      </button>
    </Tooltip>
  );
};
