import { useCallback, useContext } from 'react';

import { usePlayground } from '@flowgram.ai/fixed-layout-editor';
import { IconButton, Tooltip } from '@douyinfe/semi-ui';
import { ConfigContext } from '../../context';
import { IconLock, IconUnlock } from '@douyinfe/semi-icons';

export const Readonly = () => {
  const playground = usePlayground();
  const toggleReadonly = useCallback(() => {
    playground.config.readonly = !playground.config.readonly;
  }, [playground]);

  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return playground.config.readonly ? (
    <Tooltip content={langs.readonly || 'readonly'}>
      <IconButton theme="borderless" type="tertiary" icon={<IconLock />} onClick={toggleReadonly} />
    </Tooltip>
  ) : (
    <Tooltip content={langs.edit_node || 'edit'}>
      <IconButton theme="borderless" type="tertiary" icon={<IconUnlock />} onClick={toggleReadonly} />
    </Tooltip>
  );
};
