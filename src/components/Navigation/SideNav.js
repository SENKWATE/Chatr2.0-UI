import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authentication";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  // componentDidMount() {
  //   this.props.fetchChannels();
  // }

  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));

    return (
      <div>
        {this.props.user ? (
          <div>
            <ul
              className="navbar-nav navbar-sidenav"
              id="exampleAccordion"
              style={{ overflowY: "scroll" }}
            >
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
              >
                <Link className="nav-link heading" to="/createChannel">
                  <span className="nav-link-text mr-2">Channels</span>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </Link>
              </li>
              {channelLinks}
              // {this.props.channel}
            </ul>
          </div>
        ) : null}

        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  channels: state.auth.channels
});

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideNav)
);
