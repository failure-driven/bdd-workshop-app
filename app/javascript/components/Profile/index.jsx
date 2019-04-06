import React, { Component } from 'react';
import { Alert, Spinner } from 'reactstrap';
import API from '../API';
import Handle from '../Handle';
import Avatar from '../Avatar';
import ProgressBar from '../ProgressBar';
import HandleForm from '../HandleForm';
import messageBus from '../../utils/messageBus';
import MainContainer from '../MainContainer';
import PropTypes from 'prop-types';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.fetchUserProfile();
  }

  state = {
    profile: this.props.profile,
    alert: null,
    fetchProfile: this.props.fetchProfile,
    history: this.props.history,
  };

  callCreateUserProfile(profile) {
    return API.createUserProfile().then(response => {
      profile.state.alert = 'Profile successfully created';
      return Promise.resolve(response);
    });
  }

  fetchUserProfile() {
    // TODO move out to separate lib? API
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
        // TODO: 500 - 599 should be generic "something went wrong" message
        messageBus.error([status, statusText].join(' - '));
      });
  }

  updateUserProfile(data) {
    data = Object.assign(data, this.state.profile);
    return API.updateUserProfile({ data: data }).then(response => {
      messageBus.info('Updated user profile');
      this.state.fetchProfile()
      this.state.history.push('/game')
      return Promise.resolve(response);
    });
  }

  render() {
    const { profile, alert } = this.state;

    if (!profile)
      return <Spinner color="primary" data-testid="profile-loading" />;
    // TODO what if request finishes but with failure should spinner dissapear? YES!
    return (
      <MainContainer dataTestId="profile">
        {alert && <Alert>{alert}</Alert>}
        <div>
          <ProgressBar value="50" />
          <h1>{profile.handle}</h1>
          <Avatar />
          <Handle profile={profile} />
          <HandleForm onSubmit={this.updateUserProfile.bind(this)} profile={profile} step="email" />
        </div>
      </MainContainer>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  fetchProfile: PropTypes.func,
  history: PropTypes.object,
}

export default Profile;
