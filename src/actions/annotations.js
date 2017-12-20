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

export const fetchAnnotationswithstoryid = () => dispatch => {
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

export const fetchAnnotationswithkeyword = () => dispatch => {
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

export const createAnnotation = (fields, images) => dispatch => {
  dispatch({
    type: 'ANNOTATIONS/CREATE_REQUEST',
  });

  const promises = images.map((image) =>
    new Promise((resolve, reject) => {
      api.requestSignedUrl()
      .then((signedData) => {
        api.uploadToSignedUrl(signedData.signedUrl, image.uri)
        .then(() => resolve({
          type: signedData.config.ContentType,
          url: signedData.fileUrl,
        }))
        .catch((error) => { console.log(error); reject();});
      })
      .catch((error) => { console.log(error); reject();});
    })
  );

  Promise.all(promises)
  .then((uploadedImages) => {
    api.createAnnotation({
      ...fields,
      media: uploadedImages,
    })
    .then((annotation) => {
      return dispatch({
        type: 'ANNOTATIONS/ADD',
        annotations: [annotation],
      });
    })
    .catch(errorResponse => {
      console.log(errorResponse);
      return dispatch({
        type: 'ANNOTATIONS/CREATE_REQUEST_FAIL',
        error: errorResponse,
      });
    });
  })
  .catch((errorResponse) => {
    console.log(errorResponse);
    return dispatch({
      type: 'ANNOTATIONS/CREATE_REQUEST_FAIL',
      error: errorResponse,
    });
  })
}