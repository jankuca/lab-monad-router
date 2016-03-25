
export default function render(props) {
  console.info('render(Props) -> Promise<Rendering>')

  return Promise.resolve({
    type: 'div',
    text: 'Document ID=' + props['id'],
    actions: [
      { label: 'List Documents', url: 'app://document-list' },
      { label: 'Exit', url: null }
    ]
  })
}
