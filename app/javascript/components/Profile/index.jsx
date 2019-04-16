import React, { Component } from 'react';
import { Button, Alert, Spinner } from 'reactstrap';
import API from '../API';
import Avatar from '../Avatar';
import ProgressBar from '../ProgressBar';
import OurForm from '../OurForm';
import messageBus from '../../utils/messageBus';
import MainContainer from '../MainContainer';
import PropTypes from 'prop-types';
import ShowProfile from './ShowProfile';
import { Link } from 'react-router-dom';

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
    isEditting: false,
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

  toggleIsEditting() {
    this.setState({ isEditting: !this.state.isEditting });
  }

  updateUserProfile(data) {
    data = Object.assign(this.state.profile, data);
    return API.updateUserProfile({ data })
      .then(response => {
        messageBus.info('Updated user profile');
        this.state.fetchProfile();
        if (this.state.isEditting) {
          this.toggleIsEditting();
        }
        return Promise.resolve(response);
      })
      .catch(res => {
        const errors = res.response.data.errors;
        const messages = Array.isArray(errors)
          ? errors.map(e => e.detail).join()
          : Object.keys(errors)
              .map(key => [key, errors[key]].join(': '))
              .join();
        messageBus.error(messages);
      });
  }

  render() {
    const { isEditting, profile, alert } = this.state;
    const progressValue =
      profile && profile.id && profile.handle && profile.email
        ? 100
        : profile && profile.id && profile.handle
        ? 50
        : 0;

    if (!profile)
      return <Spinner color="primary" data-testid="profile-loading" />;
    // TODO what if request finishes but with failure should spinner dissapear? YES!
    if (progressValue === 100 || isEditting)
      return (
        <MainContainer dataTestId="profile">
          {isEditting ? (
            <>
              <OurForm
                onSubmit={this.updateUserProfile.bind(this)}
                profile={profile}
              />
            </>
          ) : (
            <>
              <ShowProfile profile={profile} />
              <div data-testid="actions">
                <Button tag={Link} to="/game" color="secondary">
                  Play the game
                </Button>
                <Button
                  color="primary"
                  onClick={this.toggleIsEditting.bind(this)}
                  className="float-right"
                >
                  Edit
                </Button>
              </div>
            </>
          )}
        </MainContainer>
      );
    return (
      <MainContainer dataTestId="profile">
        {alert && <Alert>{alert}</Alert>}
        <div>
          <h1>
            Hi : <span data-testid="details-handle">{profile.handle}</span>
          </h1>
          <p>Your profile is almost complete</p>
          <ProgressBar progressValue={progressValue} />
          <Avatar />
          <OurForm
            onSubmit={this.updateUserProfile.bind(this)}
            profile={profile}
            step="email"
          />
          <div data-testid="actions">
            <Button tag={Link} to="/game" color="secondary">
              Play the game
            </Button>
          </div>
        </div>
      </MainContainer>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  fetchProfile: PropTypes.func,
  history: PropTypes.object,
};

export default Profile;
