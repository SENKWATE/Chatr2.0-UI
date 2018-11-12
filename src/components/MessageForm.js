import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      username: this.props.user.username
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    console.log("Message: " + this.state.message);
    console.log(this.props);
    event.preventDefault();
    this.props.postMessage(this.props.id, this.state);
    // this.props.postBook(this.state, this.props.authorID);
  }

  render() {
    return (
      <div className="col-6 mx-auto p-0 mt-5">
        <form onSubmit={this.onSubmit}>
          <input
            style={{ width: 400 }}
            type="text"
            name="message"
            value={this.state.message}
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
    user: state.auth.user,
    channel: state.auth.channel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (id, newChannel) =>
      dispatch(actionCreators.postMessage(id, newChannel))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
