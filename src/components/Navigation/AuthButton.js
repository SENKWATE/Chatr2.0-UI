import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

import * as actionCreators from "../../store/actions/authentication";



class AuthButton extends Component {
  render() {
    const user  = this.props.user;
    let buttons;
    console.log(this.props.user);

    if (user) {
      buttons = (
        <li className="nav-item">
          <span className="nav-link">
            <Link to="/welcome" className="nav-link" onClick={this.props.logout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout {user.username}
            </Link>
          </span>
        </li>
      );
    } else {
      buttons = [
        <li key="loginButton" className="nav-item">
          <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </li>,
        <li key="signupButton" className="nav-item">
          <Link to="/signup" className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} /> Signup
          </Link>
        </li>
      ];
    }

    return (
      <ul className="navbar-nav ml-auto">
        {/* <span className="navbar-text">{user.username}</span> */}
        {buttons}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton);
