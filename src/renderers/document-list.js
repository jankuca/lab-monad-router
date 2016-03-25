
export default function render(props) {
  console.info('render(Props) -> Promise<Rendering>')

  return Promise.resolve({
    type: 'div',
    text: 'Document List',
    nextUrl: 'app://documents/?id=123'
  })
}
