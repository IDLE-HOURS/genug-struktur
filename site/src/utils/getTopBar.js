const groq = require('groq')
const client = require('./sanityClient.js')
const { renderRichTextToHTML } = require('./renderRichText.js')

async function getTopBar() {
  const filter = groq`*[_type == "topBar"][0] {
    centerContent {
      richText[] {
        ...,
        markDefs[] {
          ...,
          _type == "internalLink" => {
            ...,
            "reference": reference-> {
              _type,
              content {
                main {
                  slug
                }
              }
            }
          }
        }
      },
      fallbackText,
      text,
      link {
        type,
        external,
        "internalReference": internalReference-> {
          _type,
          content {
            main {
              slug
            }
          }
        }
      }
    },
    leftLink,
    rightLink
  }`
  
  const topBar = await client.fetch(filter).catch(err => console.error(err))
  
  if (topBar?.centerContent) {
    // Process rich text content
    const richTextHTML = renderRichTextToHTML(topBar.centerContent.richText)
    topBar.centerContent.richTextHTML = richTextHTML
    
    // Use fallback text if rich text is empty
    if (!richTextHTML && topBar.centerContent.fallbackText) {
      topBar.centerContent.text = topBar.centerContent.fallbackText
    }
  }
  
  return topBar || {
    centerContent: {
      text: 'Welcome to Enough Structures'
    },
    leftLink: { text: 'About', url: '/about' },
    rightLink: { text: 'Blog', url: '/blog' }
  }
}

module.exports = getTopBar 