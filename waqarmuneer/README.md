### Recomended Reading

### To Run
- Go to project dir and run commands (npm install ) and (npm run)

### Completed Points
- PDF and HTML rendering
- text layer rendering for PDF
- highlight and annotation
- integration of required JS libs for pdf and annotation
- Used Redux for state management of annotations

### Known Issue
- text layer of pdf will become bit off when will do selection and make annotation. So annotated text will be different and text will be form pdf. Moreover, text layer can be inspected in browser debugger 


# Vanhackathon
Welcome to Pintellect challenge bulit specifically for Vanhackers!

## Frontend Challenge

### Context
- We are making our frontend 100% from scratch using React + Redux. It's one frontend independent and connected to our backend only through API calls. 
- We want to able to to make highlights and annotations on top of PDF files. For that we know some open source tools that you can use for it:
  - https://web.hypothes.is (https://github.com/hypothesis)
  - https://github.com/mozilla/pdf.js/
- The frontend needs to be agnostic for HTML content or PDF content

### Challenge
- The challenge consists in building one inteface that given a JSON, you can render a page with the ability to create highlights and annotations in a PDF (if the JSON says it is a PDF) or in a HTML
- You need to use React + Redux
- You don't need to post anything to the backend, but would be nice to mock your backend call in actions to:
  - Load the json (get to `/api/posts/<post_id>`)
  - Create annotation (post to `/api/posts/<post_id>/annotation`)

### Steps to complete
- [ ] Load the [JSONs](/json) from the API call (mocked)
- [ ] Render the proper view according with the content type
  - [ ] render the over layer for PDF contents
  - [ ] render the html body for html content
- [ ] Add a highlight on top of the content rendered
- [ ] Save the highlight in the backend (post mocked)
- [ ] Add an annotation related with this new highlight
- [ ] Save the annotation in the backend (post mocked)
- [ ] Be happy, you made it :)

### What we want to see

- Good usage of React (components)
- Actions to be called in React
- Reducers using Redux
- Over layer for PDF content
- Good practices in the code

### Screen References

MVP with one highlight and annotation for HTML content ![alt textMVP with one highlight and annotation for HTML content](https://raw.githubusercontent.com/Pintellect/vanhackathon/master/images/highligh_and_annotation.png)
