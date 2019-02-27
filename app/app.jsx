import 'css/index.scss'
import styles from './app.m.css'

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
      <div className={styles.app}>
        <h1>T-Chat, yo</h1>
        <div>Ayy {lmao}</div>
      </div>
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
