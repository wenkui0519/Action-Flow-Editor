import { IconButton, Tooltip } from '@douyinfe/semi-ui';
import { useContext } from 'react';
import { ConfigContext } from '../../context';
import { IconGridRectangle } from '@douyinfe/semi-icons';

export const MinimapSwitch = (props: {
  minimapVisible: boolean;
  setMinimapVisible: (visible: boolean) => void;
}) => {
  const { minimapVisible, setMinimapVisible } = props;

  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return (
    <Tooltip content={langs.mini_map || "Minimap"}>
      <IconButton
        theme="borderless"
        icon={
          <IconGridRectangle
            style={{
              color: minimapVisible ? undefined : '#060709cc',
            }}
          />
        }
        onClick={() => {
          setMinimapVisible(Boolean(!minimapVisible));
        }}
      />
    </Tooltip>
  );
};
