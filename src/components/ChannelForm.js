import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class ChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    // this.props.postBook(this.state, this.props.authorID);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Channel name..."
          onChange={this.onTextChange}
        />

        <input type="submit" value="Add Channel" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // postBook: (book, authorID) =>
    //   dispatch(actionCreators.postBook(book, authorID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
