import { Tooltip } from '@douyinfe/semi-ui';
import { useContext } from 'react';
import { ConfigContext } from '../../context';

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
      <button className="eui-btn eui-icon-btn" onClick={() => {
        setMinimapVisible(Boolean(!minimapVisible));
      }}>
        <span
          className={"eui-icon icon-new-window-opens " + (minimapVisible ? 'eui-text-primary' : '')}
          style={{
            color: "#333"
          }}
        ></span>
      </button>
    </Tooltip>
  );
};
