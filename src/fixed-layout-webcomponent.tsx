import r2wc from "react-to-webcomponent";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { Editor } from "./editor";

const WebApp = r2wc(Editor, React, ReactDOM, {
    props: {
        config: 'Object',
        initialData: 'Array',
        langs: 'Object',
    }
});
if (!customElements.get('fixed-layout-editor')) {
    customElements.define("fixed-layout-editor", WebApp);
}
