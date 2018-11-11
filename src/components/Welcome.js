import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/authentication";


class Welcome extends Component {
  // componentDidMount() {
  //    this.props.checkToken();
  //  }


  render() {
    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1">WELCOME TO CHATR</h1>

          {this.props.user?null: <div><Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
            <h3 className="mb-5">
              <em>You're gonna need to login to see the messages</em>
            </h3></div>
          }

        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  // checkToken: () => dispatch(actionCreators.checkForExpiredToken())
});

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
