import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/authentication";
import "./App.css";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import ChannelForm from "./components/ChannelForm";
import AddChannel from "./components/AddChannel";
import MessageForm from "./components/MessageForm";
import ChannelDetail from "./components/ChannelDetail";

class App extends Component {
  componentDidMount() {
    // this.props.checkToken();
    this.props.fetchChannels();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/channels/:channelID" component={ChannelDetail} />

          <Route path="/welcome" component={Welcome} />
          <Route path="/createChannel" component={ChannelForm} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkToken: () => dispatch(actionCreators.checkForExpiredToken()),
  fetchChannels: () => dispatch(actionCreators.fetchChannels())
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
