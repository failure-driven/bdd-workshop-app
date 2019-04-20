import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
  }

  state = {
    isEditting: false,
  };

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
    if (!profile) {
      return <Redirect to="/" />;
    }
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
