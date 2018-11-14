import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";

class ChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image_url: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.postChannel(this.state);
    this.setState({ name: "", image_url: "" });
  }

  componentWillUnmount() {
    this.setState({ name: "", image_url: "" });
  }
  render() {
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">Create Channel</h5>
          <form onSubmit={this.submitHandler} noValidate>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="name"
                name="name"
                required
                value={this.state.name}
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="url"
                placeholder="Image url"
                name="image_url"
                required
                value={this.state.image_url}
                onChange={this.changeHandler}
              />
            </div>
            <input
              className="btn btn-light"
              type="submit"
              value="Create Channel"
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
const mapDispatchToProps = dispatch => ({
  postChannel: channel => dispatch(actionCreators.postChannel(channel))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
