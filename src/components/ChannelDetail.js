import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
// Components
import MessageForm from "./MessageForm";

class ChannelDetail extends Component {
  componentDidMount() {
    this.interval = setInterval(
      () => this.props.getChannel(this.props.match.params.channelID),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      clearInterval(this.interval);
      this.interval = setInterval(
        () => this.props.getChannel(this.props.match.params.channelID),
        2000
      );
    }
  }
  render() {
    const channel = this.props.channel;
    let messages = this.props.channel.map(a => (
      <div>
        <strong>{a.username}</strong>
        {": "} {a.message}
      </div>
    ));
    console.log("This channel has the following:");
    console.log(messages);
    return (
      <div className="author">
        <div className="m-5">
          <h3>
            {"Channel: "}
            {this.props.match.params.channelID}
          </h3>
          <h3>{"Messages: "}</h3>
          {messages}
          <MessageForm id={this.props.match.params.channelID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channel: state.auth.channel,
    channels: state.auth.channels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannel: channelID =>
      dispatch(actionCreators.fetchChannelDetail(channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetail);
