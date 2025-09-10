const blockContentToHtml = require('@sanity/block-content-to-html')
const client = require('./sanityClient.js')

const serializers = {
  marks: {
    internalLink: ({mark, children}) => {
      const slug = mark?.reference?.content?.main?.slug?.current || '#'
      const type = mark?.reference?._type || ''
      
      // Generate appropriate URL based on content type
      let url = '#'
      switch(type) {
        case 'post':
          url = `/journal/${slug}`
          break
        case 'category':
          url = `/category/${slug}`
          break
        case 'listing':
          url = `/listing/${slug}`
          break
        case 'manufacturer':
          url = `/supplier/${slug}`
          break
        default:
          url = `/${slug}`
      }
      
      return `<a href="${url}">${children}</a>`
    },
    link: ({mark, children}) => {
      const href = mark?.href || '#'
      const target = mark?.blank ? ' target="_blank" rel="noopener"' : ''
      return `<a href="${href}"${target}>${children}</a>`
    }
  },
  types: {
    block: (props) => {
      const {style = 'normal'} = props.node
      const children = props.children || ''
      
      // Return inline content without paragraph wrapper for topbar
      return children
    }
  }
}

function renderRichTextToHTML(richTextBlocks) {
  if (!richTextBlocks || !Array.isArray(richTextBlocks) || richTextBlocks.length === 0) {
    return null
  }
  
  try {
    // Check if blockContentToHtml is available, otherwise fall back to simple text processing
    if (typeof blockContentToHtml === 'function') {
      return blockContentToHtml({
        blocks: richTextBlocks,
        serializers,
        ...client.config()
      })
    }
    
    // Fallback: simple text extraction
    return extractPlainText(richTextBlocks)
  } catch (error) {
    console.warn('Failed to render rich text, falling back to plain text:', error)
    return extractPlainText(richTextBlocks)
  }
}

function extractPlainText(richTextBlocks) {
  if (!richTextBlocks || !Array.isArray(richTextBlocks)) return null
  
  return richTextBlocks
    .filter(block => block._type === 'block')
    .map(block => {
      if (block.children && Array.isArray(block.children)) {
        return block.children
          .map(child => {
            if (child.text) {
              // Handle marks (bold, italic, links)
              let text = child.text
              if (child.marks && child.marks.length > 0) {
                // Simple processing for marks - you may want to enhance this
                child.marks.forEach(markKey => {
                  const mark = block.markDefs?.find(def => def._key === markKey)
                  if (mark) {
                    if (mark._type === 'internalLink' && mark.reference) {
                      const slug = mark.reference.content?.main?.slug?.current
                      const type = mark.reference._type
                      let url = '#'
                      switch(type) {
                        case 'post': url = `/journal/${slug}`; break
                        case 'category': url = `/category/${slug}`; break
                        case 'listing': url = `/listing/${slug}`; break
                        case 'manufacturer': url = `/supplier/${slug}`; break
                        default: url = `/${slug}`
                      }
                      text = `<a href="${url}">${text}</a>`
                    } else if (mark._type === 'link') {
                      const target = mark.blank ? ' target="_blank" rel="noopener"' : ''
                      text = `<a href="${mark.href || '#'}"${target}>${text}</a>`
                    }
                  }
                })
              }
              return text
            }
            return ''
          })
          .join('')
      }
      return ''
    })
    .join(' ')
}

module.exports = {
  renderRichTextToHTML,
  serializers
}