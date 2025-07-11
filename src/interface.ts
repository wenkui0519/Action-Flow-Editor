
export interface FlowGramConfig {
    // 显示背景
    background?: boolean,
    // 只读
    readonly?: boolean,
    // 默认布局方式
    defaultLayout?: 'vertical-fixed-layout' | 'horizontal-fixed-layout',
    // 样式配置
    constants?: ConstantKeys,
    // 组件初始化回调
    onInit?: (ext: any) => void,
    // 节点数据改变回调
    onchange?: (
        data: FlowNodeJSON | any,
        opt: {
            type: 'addFromNode' | 'addBlock' | 'moveChildNodes' | 'deleteBlock' | 'changeFormValues',
            value: {
                // 节点信息{id,type,data,blocks},公共属性
                data: any,
                // addFromNode
                fromId: string,
                // addBlock
                targetId: string, //添加到哪个节点的blocks中
                index: number, //添加到第几个位置
                // deleteBlock:index\parentId
                parentId: 'root' | string, // 删除的节点的父节点id
                // moveChildNodes
                nodeIds: string[], // 移动的节点id
                fromIndex: number, // 移动前index
                toIndex: number, // 移动后index
                fromParentId: 'root' | string, // 移动前父节点id
                toParentId: 'root' | string, // 移动后父节点id
                // changeFormValues
                id: string, // 修改的节点id
                oldValues: any, // 修改前的值
                values: any, // 修改后的值
                path: string, // 修改参数路径,'.'连接的路径
            }
        }
    ) => void,
    // 画布销毁回调
    onDispose?: () => void,
    /**
     * 节点添加回调
     * @param addProps 添加节点参数 
     * @returns 添加节点数据
     * */
    beforeAdd?: (addProps: FlowNodeJSON) => FlowNodeJSON,
    // 多语言
    langs?: { [key: string]: string },
}

// 节点类型配置
export type NodeType = 'start' | 'end' | 'switch' | 'case' | 'caseDefault' | 'default' | 'loop' | 'tryCatch' | 'catchBlock' | 'if' | 'ifBlock' | 'breakLoop';

// 节点数据配置
export interface FlowNodeJSON {
    id: string,
    type: string,
    data: {
        title?: string,
        [key: string]: any,
    },
    blocks: FlowNodeJSON[]
}

// 样式配置
interface ConstantKeys {
    /**
     * loop 底部留白
     */
    INLINE_SPACING_BOTTOM: string;
    /**
     * inlineBlocks 的 inlineTop
     * loop 循环线条上边距
     */
    INLINE_BLOCKS_INLINE_SPACING_TOP: string;
    /**
     * inlineBlocks 的 inlineBottom
     * loop 循环线条的下边距
     *
     */
    INLINE_BLOCKS_INLINE_SPACING_BOTTOM: string;
    /***
     * 线条、label 默认颜色
     */
    BASE_COLOR: string;
    /***
     * 线条、label 激活后的颜色
     */
    BASE_ACTIVATED_COLOR: string;
    /**
     * Branch bottom margin
     * 分支下边距
     */
    INLINE_BLOCKS_PADDING_TOP: string;
    NODE_SPACING: string;
    ROUNDED_LINE_X_RADIUS: string;
    ROUNDED_LINE_Y_RADIUS: string;
    INLINE_BLOCKS_PADDING_BOTTOM: string;
    COLLAPSED_SPACING: string;
    HOVER_AREA_WIDTH: string;
}