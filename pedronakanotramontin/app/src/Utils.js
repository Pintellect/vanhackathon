import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rangy from 'rangy/lib/rangy-core';
import rangyClassApplier from 'rangy/lib/rangy-classapplier';
import rangyHighlighter from 'rangy/lib/rangy-highlighter';

import rootReducer from './redux/reducers';

export function highlight(selection) {
  const highlightStyle = 'annotate-highlight';

  rangy.restoreSelection(selection);

  const applier = rangyClassApplier.createClassApplier(highlightStyle);

  const highlighter = rangyHighlighter.createHighlighter();

  highlighter.addClassApplier(applier);
  highlighter.highlightSelection(highlightStyle);
}

export function newAnnotation(annotation) {
  return (
    <div className="annotation" key={annotation.id} style={{ top: annotation.position }}>
      {annotation.description}
    </div>
  );
}

export function configureStore(preloadedState) {
  const loggerMiddleware = createLogger();

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  );
}

export function hasNewAnnotation(prevAnnotations, nextAnnotations) {
  return prevAnnotations.length !== nextAnnotations.length;
}

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

export function changedFormVisibility(prevVisibility, nextVisibility) {
  return prevVisibility !== nextVisibility;
}
