import * as React from 'react'
import * as styles from './Body.m.css'

interface BodyState { lmao: string }

export class Body extends React.Component<{}, BodyState> {
  public constructor (props: {}) {
    super(props)

    this.state = {
      lmao: null,
    }
  }

  public render (): React.ReactElement {
    const { lmao } = this.state

    return (
      <div className={styles.body}>
        <h1>React Scaffold</h1>
        <div>Ayy {lmao}</div>
      </div>
    )
  }

  public componentDidMount (): void {
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
