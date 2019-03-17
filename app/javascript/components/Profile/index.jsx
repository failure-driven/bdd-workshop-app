import React, { Component } from 'react';
import { Alert, Spinner } from 'reactstrap';
import API from '../API';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.fetchUserProfile();
  }

  state = {
    failed: false,
    errorMessage: null,
    profile: null,
  };

  fetchUserProfile() {
    this.fetchUserProfilePromise = API.fetchUserProfile()
      .then(() => {
        this.setState({ profile: true });
      })
      .catch(error => {
        this.setState({
          failed: true,
          errorMessage: `${error.response.status} - ${
            error.response.statusText
          }`,
        });
      });
  }

  render() {
    const { profile, failed, errorMessage } = this.state;
    if (failed) {
      // TODO should this be moved to an ErrorBoundary?
      return (
        <Alert color="danger">Something went wrong - {errorMessage}</Alert>
      );
    } else {
      return (
        <>
          <div data-test-id="profile">
            <h1>Profile</h1>
            {profile ? (
              <span>{profile}</span>
            ) : (
              <Spinner color="primary" data-test-id="loading-profile" />
            )}
          </div>
        </>
      );
    }
  }
}

export default Profile;
