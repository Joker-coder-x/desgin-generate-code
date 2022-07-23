import { isString } from "lodash";
import { INormalizedVNode } from "../types";

export function renderVNodes (vnodes: (INormalizedVNode | string)[]): string {
  let ret = vnodes.map(vnode => renderVNode(vnode)).join("\r\n");
  return ret;
}

export function renderVNode (vnode: INormalizedVNode | string): string {
  if (typeof(vnode) === 'string') {
    return vnode;
  }

  const { type } = vnode;

  if (typeof(type) === 'string') {
    // 普通元素
    return renderElementVNode(vnode);
  } else  {
    // 组件
    return renderComponentVNode(vnode);
  }
}

function renderElementVNode (vnode: INormalizedVNode): string {
  const { type, props, children } = vnode;

  let ret = `<${type}`;
  // 拼接props
  ret += renderProps(props);
  ret += '>';

  if (children && children.length > 0) {
    ret += renderVNodes(children as INormalizedVNode[]);
  }

  ret += `</${type}>`;

  return ret;
}

function renderComponentVNode (vnode: INormalizedVNode): string {
  const { type: componentOpotion, props, slots } = vnode;
  const { tag } = componentOpotion as { tag: string };

  let ret = `<${tag}`;
  ret += renderProps(props);
  ret += '>';
  ret += renderSlots(slots);
  ret += `</${tag}>`;

  return ret;
}

function renderProps (props: Record<string, any>): string {
  let ret = '';
  for (const key in props) {
    if (Object.hasOwnProperty.call(props, key)) {
      ret += ` ${key}="${props[key]}"`;
    }
  }

  return ret;
}

function renderSlots (slots: Record<string, any>): string {
  let ret = '';

  if (slots) {
    const slotsLen = Object.keys(slots).length;

    for (const key in slots) {
      if (Object.hasOwnProperty.call(slots, key)) {
        if (slotsLen === 1 && key === 'default') {
          // 如果只有一个插槽，并且插槽名为default的话无需加上<template>标签
          const vnodes = slots[key];
          ret += isString(vnodes) ? vnodes : renderVNodes(vnodes);
        } else {
          ret += `<template v-slot:${key}>${renderVNodes(slots[key])}</template>`;
        }
      }
    }
  }

  return ret;
}