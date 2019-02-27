import 'css/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  render () {
    const { lmao } = this.state

    return (
      <div>Ayy {lmao}</div>
    )
  }

  componentDidMount () {
    let ayy = new Request('/api/ayy')

    fetch(ayy)
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status)
        }
        return response.json()
      })
      .then((response) => {
        this.setState({
          lmao: response.response,
        })
      })
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
