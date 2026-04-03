// extensions/MdcBlock.ts
// Custom TipTap Node extension for MDC (Markdown Component) blocks.
// Renders :::ComponentName{prop="value"}::: as a styled chip in the editor.

import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import MdcBlockView from '@/components/MdcBlockView.vue'

export interface MdcBlockOptions {
  HTMLAttributes: Record<string, string>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mdcBlock: {
      insertMdcBlock: (attrs?: { component: string; props: string }) => ReturnType
    }
  }
}

export const MdcBlock = Node.create<MdcBlockOptions>({
  name: 'mdcBlock',
  group: 'block',
  atom: true, // treated as a single indivisible unit

  addOptions() {
    return { HTMLAttributes: {} }
  },

  addAttributes() {
    return {
      component: { default: 'MyComponent' },
      props: { default: '' },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-mdc-block]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const { component, props } = HTMLAttributes
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, {
        'data-mdc-block': '',
        'data-component': component,
        'data-props': props,
        class: 'mdc-block',
      }),
      `:::${component}${props ? `{${props}}` : ''}:::`,
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(MdcBlockView)
  },

  addCommands() {
    return {
      insertMdcBlock:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attrs ?? { component: 'MyComponent', props: '' },
          })
        },
    }
  },
})
