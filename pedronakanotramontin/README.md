# React Highlight and Annotations
React + Redux application for displaying HTML and PDF documents while enabling the user to highlight and save annotations for each document.

## Features
* Loading of HTML and PDF documents based on JSON payload
* Can fetch PDF documents online if the server is enabled for CORS
* The fetch of JSON and saving of annotations is mocked via json-server

## Requirements
* Node.js for downloading dependencies (minimum tested version 6.11.4)
* Linux (did not tested on Windows and Mac, but it should work too)

## Coding
The application source code is on the folder pedronakanotramontin/app.
In the root folder pedronakanotramontin is the code for the mock server, the script to start the mock server and the application server together and the script to install all the dependencies.

## Running
First of all, install all the dependencies by runnning the following command in the project root dir:

    npm install

After installing the dependencies, run the following command to start the json-server (mock api) and the WebPack server that will serve the React app:

    npm start

This command should open your default browser on the address: http://localhost:3000, if it does not, just copy and paste it to your favorite browser to open the application.

## Deploying
This application can be build using the following command:

    npm run build

It will optimize the application for production and the files will be minified.
The output is the build folder.

To make it work in production, it is necessary to change the URLs in the functions fetchPost and saveAnnotation in the actions.js file, to point to a server that can serve the JSON data via the following api URL:

    <SERVER>/api/posts/<postId>

And can accept annotation data via the following URL:

    <SERVER>/api/posts/<postId>/annotation

## Improvements
* Permit the user select the text via keyboard
* Internationalize the strings
* Permit different configurations for dev and prod environments
* Paginate the PDF visualization
* Correct layout for the component react-pdf when resizing canvas
