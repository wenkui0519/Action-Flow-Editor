import { Tooltip } from '@douyinfe/semi-ui';
import { useContext } from 'react';
import { ConfigContext } from '../../context';

export const FitView = (props: { fitView: () => void }) => {

  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return (
    <Tooltip content={langs.zoom_fit || "FitView"}>
      <button className="eui-btn eui-icon-btn" onClick={() => props.fitView()}>
        <span
          className="eui-icon icon-arrows-w"
          style={{
            color: "#333"
          }}
        ></span>
      </button>
    </Tooltip>
  );
};
