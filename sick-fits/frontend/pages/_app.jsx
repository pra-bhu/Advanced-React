import App from 'next/app'
import Page from '../components/Page'

class CustomApp extends App {
  render() {
    const { Component } = this.props
    return (
      <div>
        <Page>
          <Component/>
        </Page>
      </div>
    )
  }
}

export default CustomApp
