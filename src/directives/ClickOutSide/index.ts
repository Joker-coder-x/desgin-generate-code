import { DirectiveBinding, ObjectDirective } from "vue";
import { isFunction } from "../../utils";

const handlerKey = Symbol();
const events = new Map();

interface IHTMLElement extends HTMLElement {
  [handlerKey]: ((e: Event) => void) | null 
}

if (window && document) {
  document.addEventListener('click', (e: Event) => {
    for (const cb of events.values()) {
      cb(e);
    }
  }, false);
}

export default {
  mounted (el: IHTMLElement, bindings: DirectiveBinding) {
    const cb = (e: Event): void => {
      if (!el.contains(e.target as HTMLElement)) {
        isFunction(bindings.value) && bindings.value();
      } 
    }; 

    events.set(el, cb);
  },

  unmount (el: IHTMLElement) {
    if (events.has(el)) {
      events.delete(el);
    }
  }
} as ObjectDirective;