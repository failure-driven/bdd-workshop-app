import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
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
    // TODO what if request finishes but with failure should spinner dissapear? YES!
    if (profile.percentComplete === 100 || isEditting)
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
        <div>
          <h1>
            Hi : <span data-testid="details-handle">{profile.handle}</span>
          </h1>
          <p>Your profile is almost complete</p>
          <ProgressBar percentComplete={profile.percentComplete} />
          <Avatar profile={profile} />
          <OurForm
            onSubmit={this.updateUserProfile.bind(this)}
            profile={profile}
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
