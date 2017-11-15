# Vanhackathon
Welcome to Pintellect challenge bulit spcifically for Vanhackers

## Frontend Challenge

### Context
- We are making our frontend 100% from scrath using React + Redux. It's one frontend independet and connected to our backend only trough API calls. 
- We want to able to to make anotation on top of PDF files. For that we know some open source tools that might help us on it
  - https://web.hypothes.is (https://github.com/hypothesis)
  - https://github.com/mozilla/pdf.js/
- The frontend need to be as much possible agnostic for HTML content or PDF content

### Challenge
- The challenge consist in build one inteface that given a JSON, you can render a page with hability to create highlights and annotations in a PDF (if the JSON says it is a PDF) or in a HTML
- You need to use React + Redux
- You don't need to post anything to the backend, but would be nice to mock your backend call in actions to:
  - Load the json (get to `/api/posts/<post_id>`)
  - Create annotation (post to `/api/posts/<post_id>/annotation`)

# Steps to complete
- [ ] Load the json from the API call (mocked)
- [ ] Render the proper view accordialyn with the content type
  - [ ] render the over layer for PDF contents
  - [ ] render the html body for html content
- [ ] Add a highlight on top of the content rendered
- [ ] Save the highlight in the backend (post mocked)
- [ ] Add an annotation related with this new highlight
- [ ] Save the annotation in the backend (post mocked)
- [ ] Be happy, you made it :)

# Screen References


## Backend Challenge
