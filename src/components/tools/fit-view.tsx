import { IconButton, Tooltip } from '@douyinfe/semi-ui';
import { useContext } from 'react';
import { ConfigContext } from '../../context';
import { IconExpand } from '@douyinfe/semi-icons';

export const FitView = (props: { fitView: () => void }) => {

  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return (
    <Tooltip content={langs.zoom_fit || "FitView"}>
      <IconButton
        icon={<IconExpand />}
        type="tertiary"
        theme="borderless"
        onClick={() => props.fitView()}
      />
    </Tooltip>
  );
};
