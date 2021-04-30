<template>
  <div>
    <tiptap-vuetify @input="input" placeholder="프로젝트에 대한 설명을 해주세요." v-model="explanation" :extensions="extensions" />
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
  props: {
    content: String,
  },
  data() {
    return {
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
    }
  },
  created() {
    this.isWatching = true
    this.unwatchIsLiveProp = this.$watch('content', (newVal) => {
      if (newVal) {
        this.unwatchIsLiveProp();
        this.explanation = newVal
        this.isWatching = false;
      }
    })
  },
  methods: {
    input() {
      this.$emit('change', this.explanation)
    }
  }
}
</script>