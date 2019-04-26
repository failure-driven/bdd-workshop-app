import React from "react";
import ProfileSteps from ".";
import { shallow } from "enzyme";

describe("ProfileSteps", () => {
  it("THEN renders", () => {
    const wrapper = shallow(
      <ProfileSteps profile={{ percentComplete: 33 }} onSubmit={jest.fn()} />
    );
    expect(wrapper).toMatchInlineSnapshot(`
      <div>
        <h1>
          Hi : 
          <span
            data-testid="details-handle"
          />
        </h1>
        <p>
          Your profile is almost complete
        </p>
        <ProgressBar
          percentComplete={33}
        />
        <Avatar
          profile={
            Object {
              "percentComplete": 33,
            }
          }
        />
        <OurForm
          onSubmit={[MockFunction]}
          profile={
            Object {
              "percentComplete": 33,
            }
          }
        />
        <div
          data-testid="actions"
        >
          <Button
            color="secondary"
            tag={[Function]}
            to="/game"
          >
            Play the game
          </Button>
        </div>
      </div>
    `);
  });
});
