import { ObjectDirective } from "vue";

const handlerKey = Symbol();

interface IHTMLElement extends HTMLElement {
  [handlerKey]: ((e: Event) => void) | null 
}

export default {
  mounted (el: IHTMLElement) {
    const hanlder = (e: Event) => e.preventDefault();

    el.addEventListener('contextmenu', hanlder);
    el[handlerKey] = hanlder;
  },

  unmount (el: IHTMLElement) {
    el.removeEventListener('contextmenu', el[handlerKey]!);
    el[handlerKey] = null;
  }
} as ObjectDirective;