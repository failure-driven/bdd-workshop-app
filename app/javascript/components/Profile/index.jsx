import React, { Component } from 'react';
import { Alert, Spinner } from 'reactstrap';
import API from '../API';
import ErrorAlert from '../ErrorAlert';
import Handle from '../Handle';
import ProgressBar from '../ProgressBar';
import HandleForm from '../HandleForm';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.fetchUserProfile();
  }

  state = {
    failed: false,
    errorMessage: null,
    profile: null, // TODO could we pull it out JSON.parse(localStorage.getItem('player')),
    alert: null,
  };

  callCreateUserProfile(profile) {
    return API.createUserProfile().then(response => {
      profile.state.alert = 'Profile successfully created';
      return Promise.resolve(response);
    });
  }

  fetchUserProfile() {
    // TODO move out to separate lib?
    const player =
      localStorage.getItem('player') !== 'undefined' &&
      JSON.parse(localStorage.getItem('player'));
    this.userProfilePromise = (player
      ? API.fetchUserProfile(player.id)
      : this.callCreateUserProfile(this)
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
    const { profile, failed, errorMessage, alert } = this.state;
    // TODO should this be moved to an ErrorBoundary?
    if (failed) return <ErrorAlert errorMessage={errorMessage} />;
    if (!profile)
      return <Spinner color="primary" data-testid="profile-loading" />;
    return (
      <>
        {alert && <Alert>{alert}</Alert>}
        <div data-testid="profile">
          <ProgressBar value="50" />
          <h1>Profile</h1>
          <Handle profile={profile} />
          <HandleForm />
        </div>
      </>
    );
  }
}

export default Profile;
