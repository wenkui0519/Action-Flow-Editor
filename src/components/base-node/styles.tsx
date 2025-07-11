import styled from 'styled-components';

export const BaseNodeStyle = styled.div`
  align-items: flex-start;
  border-radius: 6px;
  border: 1px solid transparent;
  background: linear-gradient(359deg, rgba(78, 137, 248, 0.00) 43.99%, rgba(78, 137, 248, 0.06) 98.82%), #FFF;
  box-shadow: 0px 0px 4px 0px rgba(15, 21, 75, 0.16);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: auto;
  overflow: hidden;
  &.activated {
    border: 1px solid #82a7fc;
  }
`;

  // background-color: #fff;
  // border: 1px solid rgba(6, 7, 9, 0.15);
  // border-radius: 6px;
  // box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04), 0 4px 12px 0 rgba(0, 0, 0, 0.02);
