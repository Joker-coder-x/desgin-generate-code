import { markRaw, Component, ComponentOptions, App } from "vue";
import { IComponent, IVNode, IComponentConfig, ITreeNode, INormalizedVNode, ITransferableComponentOptions  } from "@/types";
import { generateUid, isString, isObject, hasOwn, hyphenate } from "@/utils";

import EditorCanvasBlock from "./EditorCanvasBlock.vue";

export function renderComponent (vnode: IComponent): JSX.Element {
  const { 
    type: Tag,
    componentConfig,
    props: componentProps = {},
    slots = {},
  } = vnode;
  
  if (componentConfig.__layout) {
    return (
      <Tag  {...componentProps} node={ vnode }>
        {{ ...slots }}
      </Tag>
    );
  }

  return (
    <Tag  {...componentProps} >
      {{ ...slots }}
    </Tag>
  );
}

export function renderElement (vnode: IComponent): JSX.Element {
  const { 
    type: Tag,
    props: componentProps = {},
    children = []
  } = vnode;

  return (
    <Tag {...componentProps}>
      {
        children.map((c: any) => {
          if (typeof(c) === 'string') {
            return c;
          }

          return <EditorCanvasBlock node={ c }></EditorCanvasBlock>
        })
      }
    </Tag>
  );
}

export function createComponentVNode (
  componentConfig: IComponentConfig
): IComponent {
  const { type, slots = {}, props = {}, children = [] } = componentConfig.render();

  return {
    uid: generateUid(),
    componentConfig: markRaw(componentConfig),
    type: isString(type) ? type : markRaw(type) as Component,
    props,
    slots: slots,
    children: children as IComponent[],
    __root: componentConfig.__root ? true : false,
  }
}

export function normalizeTreeData (root: IComponent): ITreeNode {
  const node: ITreeNode = {
    label: root.componentConfig.label,
    children: []
  };
  const children = root.children;

  if (children && children.length) {
    node.children = children.map(c => normalizeTreeData(c));
  }

  return node;
}

/**
 *  {
      uid: string;
      __root: boolean;
      componentConfig: IComponentConfig;
      type: Component | string;
      props: Record<string, any>;
      slots?: ISlots | null;
      children?: IComponent[];
    }
 * transfrom 
    {
      type: {
        path: 'xxx',
        tag: 'el-button'
      },
      props: {
        default: () => 'text'
      },
      children: null,
      directives: null,
      slots: null
    }
 * @param vnode 
 */
export function normalizeVNode (
  vnode: IComponent
): INormalizedVNode {
  const { type, props, children = [], slots = {} } = vnode;

  if (isObject(type) && hasOwn(type, "transform")) {
    return (type as ITransferableComponentOptions).transform(vnode, normalizeVNode);
  } else {
    const newVnode: INormalizedVNode  = {
      type: isString(type) ? hyphenate(type) :  { tag: hyphenate(type.name!) },
      props: { ...props },
      slots: Object.entries(slots!).reduce((map: Record<any, any>, [key, fn]) => {
        map[key] = fn!();
        return map;
      }, {}),
      children: children.map(c => normalizeVNode(c))
    };

    return newVnode;
  }
}

export function createComponent (
  app: App, 
  componentName: string, 
  template: string,
  isCover: boolean = true
): Component {

  if (isCover) {
    app.component(componentName, {
      name: componentName,
      template
    });
  } else if (!app.component(componentName)) {
    app.component(componentName, {
      name: componentName,
      template
    });
  }

  return app.component(componentName)!;
}