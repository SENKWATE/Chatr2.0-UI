import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";
import emoji from "react-easy-emoji";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      username: this.props.user.username
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.Emoji = this.Emoji.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  Emoji(event) {
    this.setState({ message: "🎮" });
    console.log(this.state.message);
  }
  onSubmit(event) {
    console.log("Message: " + this.state.message);
    console.log(this.props);
    event.preventDefault();

    this.props.postMessage(this.props.id, this.state);
    this.setState({ message: "" });
    // this.props.postBook(this.state, this.props.authorID);
  }

  render() {
    return (
      <div className="col-6 mx-auto p-0 mt-5">
        <form onSubmit={this.onSubmit}>
          <textarea
            style={{ width: 400 }}
            type="text"
            name="message"
            value={this.state.message}
            placeholder="Add a message..."
            onChange={this.onTextChange}
            id="emoji"
          />

          <div>
            <input
              style={{ width: 400 }}
              className="btn"
              type="submit"
              value="Send"
            />
          </div>
          <button className="btn" type="text" onClick={() => this.Emoji}>
            🎮
          </button>
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
