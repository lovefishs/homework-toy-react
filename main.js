import { render, Component, createElement } from './toy-react'

class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>my component</h1>
        {this.children}
      </div>
    )
  }
}

const insertElem = (
  <MyComponent id="a" class="c">
    <div></div>
    <div>children2</div>
    <div>children3</div>
  </MyComponent>
)

render(insertElem, document.body)
