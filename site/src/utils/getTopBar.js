const groq = require('groq')
const client = require('./sanityClient.js')

async function getTopBar() {
  const filter = groq`*[_type == "topBar"][0] {
    centerContent {
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
  return topBar || {
    centerContent: {
      text: 'Welcome to Enough Structures'
    },
    leftLink: { text: 'About', url: '/about' },
    rightLink: { text: 'Blog', url: '/blog' }
  }
}

module.exports = getTopBar 