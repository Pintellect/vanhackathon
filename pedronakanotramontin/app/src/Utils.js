import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rangy from 'rangy/lib/rangy-core';
import rangyClassApplier from 'rangy/lib/rangy-classapplier';
import rangyHighlighter from 'rangy/lib/rangy-highlighter';

import rootReducer from './redux/reducers';

// Highlights the selections using the predifined class 'annotate-highlight'
export function highlight(selection) {
  const highlightStyle = 'annotate-highlight';

  rangy.restoreSelection(selection);

  const applier = rangyClassApplier.createClassApplier(highlightStyle);

  const highlighter = rangyHighlighter.createHighlighter();

  highlighter.addClassApplier(applier);
  highlighter.highlightSelection(highlightStyle);
}

// Create a new annotation container
export function newAnnotation(annotation) {
  return (
    <div className="annotation" key={annotation.id} style={{ top: annotation.position }}>
      {annotation.description}
    </div>
  );
}

// Creates the application store
export function configureStore(preloadedState) {
  const loggerMiddleware = createLogger();

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  );
}

// Test if there is new annotation in the state
export function hasNewAnnotation(prevAnnotations, nextAnnotations) {
  return prevAnnotations.length !== nextAnnotations.length;
}

// Tests if the posts are different
export function hasNewPost(prevPost, nextPost) {
  if (
    (prevPost && !nextPost)
    ||
    (!prevPost && nextPost)
  ) {
    return true;
  }

  if (
    prevPost !== null &&
    nextPost != null &&
    prevPost.id !== nextPost.id
  ) {
    return true;
  }

  return false;
}

// Checks if the form visibility has changed
export function changedFormVisibility(prevVisibility, nextVisibility) {
  return prevVisibility !== nextVisibility;
}
