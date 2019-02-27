import * as React from 'react'
import * as styles from './Body.m.css'

export interface BodyProps {}
interface BodyState { lmao: string }

export class Body extends React.Component<BodyProps, BodyState> {
  constructor (props: BodyProps) {
    super(props)

    this.state = {
      lmao: null,
    }
  }

  render () {
    const { lmao } = this.state

    return (
      <div className={styles.body}>
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
