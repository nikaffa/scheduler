import React from "react";

//The render function allows to render Components
import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

//A test that renders a React Component
it("renders without crashing", () => {
  render(<Application />);
});
