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
          name: 'richText',
          title: 'Rich Text Content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' }
              ],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' }
                ],
                annotations: [
                  {
                    name: 'internalLink',
                    type: 'object',
                    title: 'Internal Link',
                    fields: [
                      {
                        name: 'reference',
                        type: 'reference',
                        title: 'Link to',
                        to: [
                          { type: 'post' },
                          { type: 'category' },
                          { type: 'listing' },
                          { type: 'manufacturer' }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'link',
                    type: 'object',
                    title: 'External Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL'
                      },
                      {
                        title: 'Open in new tab',
                        name: 'blank',
                        type: 'boolean'
                      }
                    ]
                  }
                ]
              }
            }
          ],
          description: 'Rich text content for the top bar center - supports inline links to internal pages and external URLs'
        },
        {
          name: 'fallbackText',
          title: 'Fallback Text',
          type: 'string',
          description: 'Simple text fallback (used if rich text is empty)'
        },
        {
          name: 'link',
          title: 'Overall Link (Legacy)',
          type: 'object',
          description: 'Legacy link option - use rich text inline links instead',
          options: {
            collapsible: true,
            collapsed: true
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