const groq = require('groq')
const client = require('./sanityClient.js')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const serializers = require('./serializers')

function generatePost(post) {
  return {
    ...post,
    content: BlocksToMarkdown(post.content, { serializers, ...client.config() })
  }
}

async function getBlogPosts(limit) {
  const limiter = limit ? `[0..${limit}]` : ''
  const filter = groq`*[_type == "post"] | order(publishedAt desc) ${limiter} {
    title,
    slug,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    content,
    "categories": categories[]-> {
      "title": content.main.name,
      "slug": content.main.slug.current
    }
  }`
  
  const docs = await client.fetch(filter).catch(err => console.error(err))
  const posts = docs.map(generatePost)
  return posts
}

module.exports = getBlogPosts 