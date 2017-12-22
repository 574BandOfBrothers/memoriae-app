import api from '../configs/api';

export const fetchAnnotations = () => dispatch => {
  dispatch({
    type: 'ANNOTATIONS/LIST_REQUEST'
  });

  api.getAnnotations()
  .then((annotations) => {
    return dispatch({
      type: 'ANNOTATIONS/ADD',
      annotations: annotations,
    });
  })
  .catch(errorResponse => {
    return dispatch({
      type: 'ANNOTATIONS/LIST_REQUEST_FAIL',
      error: errorResponse,
    });
  });
}

export const fetchAnnotationsWithTarget = (storyId, target) => dispatch => {
  dispatch({
    type: 'ANNOTATIONS/LIST_REQUEST',
    storyId,
  });

  api.getAnnotations({ target })
  .then(({ first }) => {
    return dispatch({
      type: 'ANNOTATIONS/ADD',
      storyId,
      annotations: first.items,
    });
  })
  .catch(errorResponse => {
    return dispatch({
      type: 'ANNOTATIONS/LIST_REQUEST_FAIL',
      storyId,
      error: errorResponse,
    });
  });
}

export const createAnnotationRequest = (storyId, annotationData) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({
      type: 'ANNOTATIONS/CREATE_REQUEST',
      storyId,
    });

    api.createAnnotation({
      '@context': 'http://www.w3.org/ns/anno.jsonld',
      type: 'Annotation',
      ...annotationData,
    })
    .then((annotation) => {
      dispatch({
        type: 'ANNOTATIONS/CREATE',
        storyId,
        annotation,
      });

      resolve();
    })
    .catch(errorResponse => {
      dispatch({
        type: 'ANNOTATIONS/CREATE_REQUEST_FAIL',
        storyId,
        error: errorResponse,
      });

      reject();
    });
  })
