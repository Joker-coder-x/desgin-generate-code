export * from "./renderer";

export function isObject(val: any): val is Record<any, any> {
  return val && typeof(val) === 'object';
}

export function isPlainObject(val: any): val is object {
  return Object.prototype.toString.call(val) === '[Object object]';
}

export function isString(val: any): val is string {
  return typeof(val) === 'string';
}

export function isFunction(val: any): boolean {
  return typeof(val) === 'function';
}

export function hasOwn (obj: Record<string, any>, key: string | symbol): key is keyof typeof obj {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function generateUid (): string {
  return `uid__${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

const camelizeRE = /-(\w)/g
export const camelize = (str: string): string => str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));

const hyphenateRE = /\B([A-Z])/g
export const hyphenate = (str: string): string => str.replace(hyphenateRE, '-$1').toLowerCase();