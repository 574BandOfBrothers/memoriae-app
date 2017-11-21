import api from '../configs/api';

export const fetchStories = () => dispatch => {
  dispatch({
    type: 'STORIES/LIST_REQUEST'
  });

  api.getStories()
  .then((stories) => {
    return dispatch({
      type: 'STORIES/ADD',
      stories: stories,
    });
  })
  .catch(errorResponse => {
    return dispatch({
      type: 'STORIES/LIST_REQUEST_FAIL',
      error: errorResponse,
    });
  });
}

export const createStory = (fields, images) => dispatch => {
  dispatch({
    type: 'STORIES/CREATE_REQUEST',
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
        .catch(reject);
      })
      .catch(reject);
    })
  );

  Promise.all(promises)
  .then((uploadedImages) => {
    api.createStory({
      ...fields,
      media: uploadedImages,
    })
    .then((story) => {
      return dispatch({
        type: 'STORIES/ADD',
        stories: [story],
      });
    })
    .catch(errorResponse => {
      return dispatch({
        type: 'STORIES/CREATE_REQUEST_FAIL',
        error: errorResponse,
      });
    });
  })
  .catch((errorResponse) => {
    return dispatch({
      type: 'STORIES/CREATE_REQUEST_FAIL',
      error: errorResponse,
    });
  })
}
