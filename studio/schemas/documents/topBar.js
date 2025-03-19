export default {
  name: 'topBar',
  title: 'Top Bar',
  type: 'document',
  fields: [
    {
      name: 'centerContent',
      title: 'Center Content',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
          description: 'The message to display in the center of the top bar'
        },
        {
          name: 'link',
          title: 'Link',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false
          },
          fields: [
            {
              name: 'type',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'No Link', value: 'none' },
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' }
                ],
                layout: 'radio'
              },
              initialValue: 'none'
            },
            {
              name: 'internalReference',
              title: 'Select Internal Page',
              type: 'reference',
              to: [
                { type: 'post' },
                { type: 'category' },
                { type: 'listing' },
                { type: 'manufacturer' }
              ],
              hidden: ({ parent }) => !parent?.type || parent.type !== 'internal'
            },
            {
              name: 'external',
              title: 'External URL',
              type: 'url',
              description: 'Enter a full URL (e.g., https://example.com)',
              hidden: ({ parent }) => !parent?.type || parent.type !== 'external',
              validation: Rule => Rule.uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              })
            }
          ]
        }
      ]
    },
    {
      name: 'leftLink',
      title: 'Left Link',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Link Text',
          type: 'string'
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
          description: 'The URL for the left link (default is /about)'
        }
      ]
    },
    {
      name: 'rightLink',
      title: 'Right Link',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Link Text',
          type: 'string'
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
          description: 'The URL for the right link (default is /blog)'
        }
      ]
    }
  ]
} 