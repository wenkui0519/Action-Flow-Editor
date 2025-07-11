import { useContext, useState } from 'react';

import { usePlaygroundTools } from '@flowgram.ai/fixed-layout-editor';
import { Divider, Dropdown } from '@douyinfe/semi-ui';

import { SelectZoom } from './styles';
import { ConfigContext } from '../../context';

export const ZoomSelect = () => {
  const tools = usePlaygroundTools();
  const [dropDownVisible, openDropDown] = useState(false);

  // 获取多语言配置
  const config = useContext(ConfigContext),
    langs = config?.langs || {};

  return (
    <Dropdown
      position="top"
      trigger="custom"
      visible={dropDownVisible}
      onClickOutSide={() => openDropDown(false)}
      render={
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => tools.zoomin()}>{langs.zoom_in || 'Zoomin'}</Dropdown.Item>
          <Dropdown.Item onClick={() => tools.zoomout()}>{langs.zoom_out || 'Zoomout'}</Dropdown.Item>
          <Divider layout="horizontal" />
          <Dropdown.Item onClick={() => tools.updateZoom(0.5)}>50%</Dropdown.Item>
          <Dropdown.Item onClick={() => tools.updateZoom(1)}>100%</Dropdown.Item>
          <Dropdown.Item onClick={() => tools.updateZoom(1.5)}>150%</Dropdown.Item>
          <Dropdown.Item onClick={() => tools.updateZoom(2.0)}>200%</Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <SelectZoom onClick={() => openDropDown(true)}>{Math.floor(tools.zoom * 100)}%</SelectZoom>
    </Dropdown>
  );
};
