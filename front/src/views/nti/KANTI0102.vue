<template>
  <div id="ct">
    <section class="card">
      <header
        class="card-header"
        style="padding: 1.6rem 1rem;"
      >
        <!-- Use the component in the right place of the template -->
        <tiptap-vuetify
          v-model="content"
          :extensions="extensions"
        />
      </header>
    </section>
  </div>
</template>

<script>
// don't forget to import CSS styles
import 'tiptap-vuetify/dist/main.css'
// Vuetify's CSS styles
import 'vuetify/dist/vuetify.min.css'
// import the component and the necessary extensions
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
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
    // starting editor's content
    content: `
      <h1>Yay Headlines!</h1>
      <p>All these <strong>cool tags</strong> are working now.</p>
    `
  })
}
</script>

<style>

</style>
