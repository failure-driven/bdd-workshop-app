import React from 'react';
import { shallow } from 'enzyme';
import GameProfile from '.';

describe('GameProfile', () => {
  it('Renders an incomplete profile with a complete my profile button', () => {
    const wrapper = shallow(
      <GameProfile profile={{ handle: 'my-handle', percentComplete: 0 }} />
    );
    expect(
      wrapper
        .find('Button')
        .children()
        .text()
    ).toEqual('Complete my profile');
    expect(wrapper).toMatchInlineSnapshot(`
      <Fragment>
        <div
          style={
            Object {
              "alignItems": "center",
              "display": "flex",
            }
          }
        >
          <i
            aria-hidden="true"
            className="fa fa-user"
          />
          <span>
            my-handle
          </span>
        </div>
        <Button
          className="float-right"
          color="primary"
          data-testid="actions"
          tag={[Function]}
          to="/profile"
        >
          Complete my profile
        </Button>
      </Fragment>
    `);
  });

  it('Renders a complete profile with image and gold star', () => {
    const wrapper = shallow(
      <GameProfile profile={{ handle: 'my-handle', percentComplete: 100 }} />
    );
    expect(wrapper).toMatchInlineSnapshot(`
            <Fragment>
              <div
                style={
                  Object {
                    "alignItems": "center",
                    "display": "flex",
                  }
                }
              >
                <styled.img
                  alt="avatar for my-handle"
                  data-testid="avatar-my-handle"
                />
                <i
                  aria-hidden="true"
                  className="fa fa-star"
                  style={
                    Object {
                      "color": "gold",
                      "fontSize": "80px",
                    }
                  }
                />
                <styled.span>
                  my-handle
                </styled.span>
              </div>
              <p>
                Your profile is complete!
              </p>
            </Fragment>
        `);
  });
});
