import { useCallback, useContext } from 'react';

import { usePlayground } from '@flowgram.ai/fixed-layout-editor';
import { Tooltip } from '@douyinfe/semi-ui';
import { ConfigContext } from '../../context';

export const Readonly = () => {
  const playground = usePlayground();
  const toggleReadonly = useCallback(() => {
    playground.config.readonly = !playground.config.readonly;
  }, [playground]);

  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return (
    <Tooltip content={playground.config.readonly ? (langs.readonly || 'readonly') : (langs.edit_node || 'edit')}>
      <button className="eui-btn eui-icon-btn" onClick={toggleReadonly}>
        <span
          className={"eui-icon " + (playground.config.readonly ? 'icon-change-password' : 'icon-locking')}
          style={{
            color: "#333"
          }}
        ></span>
      </button>
    </Tooltip>

  );
};
