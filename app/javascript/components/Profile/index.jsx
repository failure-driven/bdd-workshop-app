import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import API from '../API';
import ErrorAlert from '../ErrorAlert';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.fetchUserProfile();
  }

  state = {
    failed: false,
    errorMessage: null,
    profile: null, // TODO could we pull it out JSON.parse(localStorage.getItem('player')),
  };

  fetchUserProfile() {
    // TODO move out to separate lib?
    const player =
      localStorage.getItem('player') !== 'undefined' &&
      JSON.parse(localStorage.getItem('player'));
    this.userProfilePromise = (player
      ? API.fetchUserProfile(player.id)
      : API.createUserProfile()
    )
      .then(response => {
        this.setState({ profile: response.data });
        localStorage.setItem('player', JSON.stringify(response.data));
      })
      .catch(({ response: { status, statusText } }) => {
        this.setState({
          failed: true,
          errorMessage: [status, statusText].join(' - '),
        });
      });
  }

  render() {
    const { profile, failed, errorMessage } = this.state;
    // TODO should this be moved to an ErrorBoundary?
    if (failed) return <ErrorAlert errorMessage={errorMessage} />;
    if (!profile)
      return <Spinner color="primary" data-test-id="profile-loading" />;
    return (
      <>
        <div data-test-id="profile">
          <h1>Profile</h1>
          <span data-test-id="profile-user-id">{profile.id}</span>
        </div>
      </>
    );
  }
}

export default Profile;
