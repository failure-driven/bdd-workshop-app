import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../API';
import MainContainer from '../MainContainer';
import messageBus from '../../utils/messageBus';
import PropTypes from 'prop-types';
import ShowProfile from '../Profile/ShowProfile';
import ProfileSteps from '../Profile/ProfileSteps';
import OurForm from '../OurForm';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isEditing: false,
  };

  toggleisEditing() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  updateUserProfile(data) {
    data = Object.assign(this.props.profile, data);
    return API.updateUserProfile({ data })
      .then(response => {
        messageBus.info('Updated user profile');
        this.props.fetchProfile();
        if (this.state.isEditing) {
          this.toggleisEditing();
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
    const { isEditing } = this.state;
    const { profile } = this.props;
    if (!profile) {
      return <Redirect to="/" />;
    }
    return (
      <MainContainer dataTestId="profile">
        {isEditing && (
          <OurForm
            onSubmit={this.updateUserProfile.bind(this)}
            profile={profile}
          />
        )}
        {profile.percentComplete === 100 && !isEditing && (
          <ShowProfile
            profile={profile}
            editOnClick={this.toggleisEditing.bind(this)}
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
