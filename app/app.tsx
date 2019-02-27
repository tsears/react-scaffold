import 'css/index.scss'
import * as styles from './app.m.css'

import { Header } from './Header/Header'
import { Body } from './Body/Body'
import { Footer } from './Footer/Footer'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default class App extends React.Component {
  render () {
    return (
      <div className={styles.app}>
        <Header />
        <Body />
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
