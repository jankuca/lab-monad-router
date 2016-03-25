
export default function render(props) {
  console.info('render(Props) -> Promise<Rendering>')

  return Promise.resolve({
    type: 'div',
    text: 'Document List',
    actions: [
      { label: 'Open Document 1', url: 'app://documents/?id=1' },
      { label: 'Open Document 2', url: 'app://documents/?id=2' },
      { label: 'Open Document 3', url: 'app://documents/?id=3' }
    ]
  })
}
