# Vanhackathon
Welcome to Pintellect challenge bulit spcifically for Vanhackers

## Frontend Challenge

### Context
- We are making our frontend 100% from scrath using React + Redux. It's one frontend independet and connected to our backend only trough API calls. 
- We want to able to to make anotation on top of PDF files. For that we know some open source tools that might help us on it
  - https://web.hypothes.is
  - https://github.com/mozilla/pdf.js/
- The frontend need to be as much possible agnostic for HTML content or PDF content

### Challenge
- The challenge consist in build one inteface that given a JSON, you can render a page with hability to create annotations in a PDF (if the JSON says it is a PDF) or in a HTML
- You need to use React + Redux
- You don't need to post anything to the backend, but would be nice to mock your backend call in actions to:
  - Load the json (get to `/api/posts/<post_id>`)
  - Create annotation (post to `/api/posts/<post_id>/annotation`)

## Backend Challenge
