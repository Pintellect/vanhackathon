import React from "react";
import { shallow } from "enzyme";

import ContentItemIcon from "./contentItemIcon";

describe("ContentListIcon Component", () => {
  
  it('should return the pdf icon if type is pdf', () => {
    const component = shallow(<ContentItemIcon type="pdf" />)
    expect(component.hasClass('fa-file-pdf-o')).toBeTruthy()
  })
  
  it('should return the html5 icon if type is html', () => {
    const component = shallow(<ContentItemIcon type="html" />)
    expect(component.hasClass('fa-html5')).toBeTruthy()
  })
  
});