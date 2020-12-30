export default {
  type: 'material',
  name: 'material',
  type: 'array',
  of: [
    {type: 'string'}
  ],
  options: {
    list: [
      { value: 'biodegredable', title: 'BAD FIX' },
      { value: 'biodegradable', title: 'Biodegradable' },
      { value: 'compostable', title: 'Compostable' },
      { value: 'home-compostable', title: 'Home Compostable' },
      { value: 'renewed-material', title: 'Renewed Material' },
      { value: 'bio-based', title: 'Bio-Based' },
      { value: 'regenerative', title: 'regenerative' },
      { value: 'recyclable', title: 'Recyclable' },
    ],
    layout: 'tags'
  }
}