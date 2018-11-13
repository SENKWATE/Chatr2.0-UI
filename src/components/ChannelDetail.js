import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";

// Components
import MessageForm from "./MessageForm";
import Loading from "./Loading";

class ChannelDetail extends Component {
  componentDidMount() {
    this.interval = setInterval(
      () => this.props.getChannel(this.props.match.params.channelID),
      3000
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
        3000
      );
      console.log("update");
    }
  }

  convertTime(time) {
    let convertedTime;
    if (time) {
      time = time.slice(11, 16);
      let hour = time.slice(0, 2);
      hour = parseInt(hour, 10);
      hour = hour + 3;
      if (hour >= 12) {
        if (hour != 12) {
          hour = hour - 12;
        }
        convertedTime = "(" + hour + time.slice(2, 8) + "PM)";
      } else {
        convertedTime = "(" + hour + time.slice(2, 8) + "AM)";
      }
      return convertedTime;
    }
  }

  render() {
    const channel = this.props.channel;
    let messages = this.props.channel.map(a => (
      <div style={{ fontSize: 23 }}>
        <strong>{a.username}</strong>
        {": "}
        {this.convertTime(a.timestamp)}
        <div style={{ fontSize: 20 }}>
          {a.message} {"        "}
        </div>
      </div>
    ));
    console.log("This channel has the following:");
    console.log(messages);
    console.log(this.props.name);
    return (
      <div className="author">
        <div className="m-5">
          <h3>
            {"Channel: "}
            {this.props.match.params.channelID}
          </h3>

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
    channels: state.auth.channels,
    loading: state.auth.loading
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
