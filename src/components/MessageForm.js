import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: this.props.user.username
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.postMessage(this.state);
    // this.props.postBook(this.state, this.props.authorID);
  }

  render() {
    console.log("Message: " + this.state.name + ", by: " + this.state.username);
    return (
      <div className="col-6 mx-auto p-0 mt-5">
        <form onSubmit={this.onSubmit}>
          <input
            style={{ width: 400 }}
            type="text"
            name="name"
            placeholder="Add a message..."
            onChange={this.onTextChange}
          />

          <input className="btn" type="submit" value="Add Message" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: newChannel => dispatch(actionCreators.postMessage(newChannel))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
