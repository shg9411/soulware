<template>
  <div>
    <tiptap-vuetify @input="input" placeholder="본문을 작성하세요" v-model="explanation" :extensions="extensions" />
  </div>
</template>
 
<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
  name: "TextEditor",
  components: { TiptapVuetify },
  model: {
    prop: 'content',
    event: 'change'
  },
  props: ['content'],
  data: () => ({
    isWatching: false,
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ],
    explanation: ''
  }),
  watch: {
    content: function (val) {
      this.explanation = val
    }
  },
  methods: {
    input() {
      this.$emit('change', this.explanation)
    }
  }
}
</script>