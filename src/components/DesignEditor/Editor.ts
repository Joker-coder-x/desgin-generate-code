import { ComponentConfigMap, ComponentConfigRecord, IComponentConfig } from "../../types";

export default class Editor {
  private componentRecords: ComponentConfigRecord = {};
  private componentMap: ComponentConfigMap = {};

  getComponentRecords (): ComponentConfigRecord {
    return this.componentRecords;
  }

  getComponentMap (): ComponentConfigMap {
    return this.componentMap;
  }
 
  addComponent (key: string, namespace: string, component: IComponentConfig): void {
    const { componentMap, componentRecords } = this;

    if (Object.prototype.hasOwnProperty.call(componentMap, namespace)) {
      const componentList = componentMap[namespace];
      componentList.push(component);
    } else {
      componentMap[namespace] = [component];
    }

    componentRecords[key] = component;
  }

  removeComponent (key: string, namespace: string): void {
    const { componentMap, componentRecords } = this;
    const component = componentRecords[key];
    if (component) {
      const componentList = componentMap[namespace];

      if (componentList) {
        componentList.splice(componentList.indexOf(component), 1);
      }
    }
  }
}


