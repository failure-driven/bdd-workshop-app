import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import API from '../API';
import MainContainer from '../MainContainer';
import messageBus from '../../utils/messageBus';
import PropTypes from 'prop-types';
import ShowProfile from './ShowProfile';
import ProfileSteps from './ProfileSteps';
import OurForm from '../OurForm';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.fetchUserProfile();
  }

  state = {
    isEditting: false,
  };

  fetchUserProfile() {
    // TODO move out to separate lib? API
    try {
      const player =
        localStorage.getItem('player') !== 'undefined' &&
        JSON.parse(localStorage.getItem('player'));
      this.userProfilePromise = API.fetchUserProfile(player.id)
        .then(response => {
          localStorage.setItem('player', JSON.stringify(response.data));
        })
        .catch(({ response: { status, statusText } }) => {
          messageBus.error([status, statusText].join(' - '));
        });
    } catch (err) {
      messageBus.error('Access deined, please register');

      this.props.history.push('/');
    }
  }

  toggleIsEditting() {
    this.setState({ isEditting: !this.state.isEditting });
  }

  updateUserProfile(data) {
    data = Object.assign(this.props.profile, data);
    return API.updateUserProfile({ data })
      .then(response => {
        messageBus.info('Updated user profile');
        this.props.fetchProfile();
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
    const { isEditting } = this.state;
    const { profile } = this.props;

    if (!profile)
      return <Spinner color="primary" data-testid="profile-loading" />;
    return (
      <MainContainer dataTestId="profile">
        {isEditting && (
          <OurForm
            onSubmit={this.updateUserProfile.bind(this)}
            profile={profile}
          />
        )}
        {profile.percentComplete === 100 && !isEditting && (
          <ShowProfile
            profile={profile}
            editOnClick={this.toggleIsEditting.bind(this)}
          />
        )}
        {profile.percentComplete !== 100 && (
          <ProfileSteps
            profile={profile}
            onSubmit={this.updateUserProfile.bind(this)}
          />
        )}
      </MainContainer>
    );
  }
}

ProfileContainer.propTypes = {
  profile: PropTypes.object,
  fetchProfile: PropTypes.func,
  history: PropTypes.object,
};

export default ProfileContainer;
