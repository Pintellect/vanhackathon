import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from 'react-router-dom'

import ContentList from "./contentList";
import ContentItem from "./contentItem";

const content = [1, 2, 3];

describe("ContentList Component", () => {
  let props;
  let mountedContentList;
  const contentList = () => {
    if (!mountedContentList) {
      mountedContentList = mount(
        <MemoryRouter>
          <ContentList {...props} />
        </MemoryRouter>
      );
    }
    return mountedContentList;
  }

  beforeEach(() => {
    props = {
      items: [],
      fetchContent: jest.fn()
    };
    mountedContentList = undefined;
  });
  
  it("always renders an ul", () => {
    const ul = contentList().find("ul");
    expect(ul.length).toBeGreaterThan(0);
  });
  
  it("should have called fetchContent()", () => {
    contentList()
    expect(props.fetchContent).toHaveBeenCalled();
  });

  describe('passing items', () => {
    beforeEach(() => {
      props.items = content
    })

    it('should render <ContentItem />s', () => {
      const items = contentList().find(ContentItem);
      expect(items.length).toEqual(content.length)
    })
  })
});