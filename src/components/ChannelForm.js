import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class ChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.postChannel(this.props, this.state);
    // this.props.postBook(this.state, this.props.authorID);
  }

  render() {
    return (
      <div className="col-6 mx-auto p-0 mt-5">
        <form onSubmit={this.onSubmit}>
          <input
            style={{ width: 400 }}
            type="text"
            name="name"
            placeholder="Channel name..."
            onChange={this.onTextChange}
          />

          <input className="btn" type="submit" value="Add Channel" />
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
    postChannel: newChannel => dispatch(actionCreators.postChannel(newChannel))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
