import { type FlowNodeRegistry } from '../typings';
import { TryCatchNodeRegistry } from './trycatch';
import { SwitchNodeRegistry } from './switch';
import { StartNodeRegistry } from './start';
import { LoopNodeRegistry } from './loop';
import { DefaultNodeRegistry } from './default';
import { IFBlockNodeRegistry } from './if-block';
import { IFNodeRegistry } from './if';
import { EndNodeRegistry } from './end';
import { CatchBlockNodeRegistry } from './catch-block';
import { CaseDefaultNodeRegistry } from './case-default';
import { CaseNodeRegistry } from './case';
import { BreakLoopNodeRegistry } from './break-loop';

export const FlowNodeRegistries: FlowNodeRegistry[] = [
  StartNodeRegistry,
  DefaultNodeRegistry,
  IFNodeRegistry,
  IFBlockNodeRegistry,
  SwitchNodeRegistry,
  CaseNodeRegistry,
  CaseDefaultNodeRegistry,
  LoopNodeRegistry,
  BreakLoopNodeRegistry,
  TryCatchNodeRegistry,
  CatchBlockNodeRegistry,
  EndNodeRegistry,
];
