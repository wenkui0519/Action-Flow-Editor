import { usePlaygroundTools } from '@flowgram.ai/fixed-layout-editor';
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { ConfigContext } from '../../context';
import { useContext } from 'react';
import { IconServer } from '@douyinfe/semi-icons';

export const SwitchVertical = () => {
  const tools = usePlaygroundTools();
  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return (
    <Tooltip  content={!tools.isVertical ? (langs.vertical || 'Vertical Layout') : (langs.horizontal || 'Horizontal Layout')}>
      <Button
        theme="borderless"
        size="small"
        onClick={() => tools.changeLayout()}
        icon={
          <IconServer
            style={{
              transform: !tools.isVertical ? '' : 'rotate(90deg)',
              transition: 'transform .3s ease',
            }}
          />
        }
        type="tertiary"
      />
    </Tooltip>
  );
};
