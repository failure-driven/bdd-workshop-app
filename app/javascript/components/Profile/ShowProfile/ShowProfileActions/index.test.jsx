import React from "react";
import ShowProfileActions from ".";
import { shallow } from "enzyme";

describe("ShowProfileActions", () => {
  it("THEN renders", () => {
    const wrapper = shallow(<ShowProfileActions editOnClick={jest.fn()} />);
    expect(wrapper).toMatchInlineSnapshot(`
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
  <Button
    className="float-right"
    color="primary"
    onClick={[MockFunction]}
    tag="button"
  >
    Edit
  </Button>
</div>
`);
  });
});
