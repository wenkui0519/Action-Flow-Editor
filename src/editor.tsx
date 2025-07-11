import '@flowgram.ai/fixed-layout-editor/index.css';
import { EditorRenderer, FixedLayoutEditorProvider, FlowNodeJSON } from '@flowgram.ai/fixed-layout-editor';

import { FlowNodeRegistries } from './nodes';
import { useEditorProps } from './hooks/use-editor-props';
import { Tools } from './components';

import { FlowGramConfig } from './interface';
import { ConfigContext } from './context';
import { InitialData } from './initial-data';
import './index.css';


export const Editor = (props: { hideTools?: boolean, config?: FlowGramConfig, initialData?: FlowNodeJSON[] } = {}) => {
  const flowDocumentJSON: any = {
    nodes: props.initialData,
  };
  /**
   * Editor Config
   */
  const editorProps = useEditorProps(flowDocumentJSON, FlowNodeRegistries, props.config as any);
  // const editorProps = useEditorProps(InitialData, FlowNodeRegistries, props.config as any);

  const config = props.config || { background: true };

  return (
    <div className="doc-feature-overview">
      {/* 存储config */}
      <ConfigContext.Provider value={config}>
        <FixedLayoutEditorProvider {...editorProps}>
          <EditorRenderer />
          {/* Tools */}
          {!props.hideTools ? (
            <>
              <Tools />
            </>
          ) : null}
        </FixedLayoutEditorProvider>
      </ConfigContext.Provider>
    </div>
  );
};
