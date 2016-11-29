import React from 'react'

import Header from './header/header'
//import Messages from './layouts/messages'
import Footer from './footer/footer'

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <main>
          <div>MESSAGES will go here</div>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
}

export default App
