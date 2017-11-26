import React from "react";
import { shallow } from "enzyme";

import AuthorDetail from "./authorDetail";

describe("ContentListIcon Component", () => {
  
  it('should render the author name and url', () => {
    const author = "Stephen King"
    const url = "http://stephenking.com/"
    const component = shallow(<AuthorDetail author={author} author_url={url} />)
    expect(component.find("a").text()).toEqual(author)
    expect(component.find("a").props()).toHaveProperty("href", url)
  })

});