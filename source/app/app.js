import React from 'react'

import Header from './header/header'
import MessagesContainer from './messages/messages_container'
import Footer from './footer/footer'

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <main>
          <MessagesContainer />
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
