import styled from 'styled-components';

export const ToolContainer = styled.div`
  position: absolute;
  bottom: 16px;
  right: 30px;
  min-width: 200px;
  display: flex;
  justify-content: left;
  pointer-events: none;
  gap: 8px;

  z-index: 99;
`;

export const ToolSection = styled.div`
  display: inline-flex;
  padding: 6px;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid #EFEFEF;
  background: #FFF;
  box-shadow: 0px 2px 8px 0px rgba(15, 21, 75, 0.10);
  pointer-events: auto;
`;

export const SelectZoom = styled.span`
    display: flex;
    padding: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    border: 1px solid #CCC;
    font-size: 12px;
`;

export const MinimapContainer = styled.div`
  position: absolute;
  bottom: 60px;
  width: 198px;
`;
