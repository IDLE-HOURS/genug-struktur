import Tabs from 'sanity-plugin-tabs'

export default {
  name: "categoryContent",
  type: "object",
  title: "Category Content",
  inputComponent: Tabs,
  fieldsets: [
    { name: "main", title: "Main" },
    { name: "listings", title: "Listings" },
    { name: "posts", title: "Blog Posts" },
    { name: "defaultMeta", title: "Meta" }
  ],
  options: {
    layout: "object"
  },
  fields: [
    {
      type: "categoryModule",
      name: "main",
      title: "Category",
      fieldset: "main"
    },
    {
      name: 'listings',
      title: 'Listings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'listing' }]}],
      fieldset: 'listings',
    },
    {
      name: 'posts',
      title: 'Blog Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }]}],
      fieldset: 'posts',
    },
    {
      type: "metaCard",
      name: "meta",
      title: "Meta",
      fieldset: "defaultMeta"
    }
  ]
}
