import {
  comment,
  queryCommentList,
  queryCurrentAssessments,
  queryReviewList,
  review,
  selfEvaluation
} from '../services/api';

export default {

  namespace: 'reviewsAndComments',

  state: {
    reviews: {},
    comments: {},
    currentAssessment: {
      assessmentProjectScores: [],
      assessmentInputContents: [],
      assessmentTemplate: {
        assessmentProjects: [],
        assessmentInputs: [],
      }
    },
  },

  effects: {
    * fetchReviews({page = 0, size = 10}, {call, put}) {
      const response = yield call(queryReviewList, page, size);
      yield put({
        type: 'saveReviews',
        payload: response.data.data,
      });
    },
    * fetchCurrentAssessment({id}, {call, put}) {
      const response = yield call(queryCurrentAssessments, id);
      yield put({
        type: 'saveCurrentAssessment',
        payload: response.data.data,
      });
    },
    * fetchComments({page = 0, size = 10}, {call, put}) {
      const response = yield call(queryCommentList, page, size);
      yield put({
        type: 'saveComments',
        payload: response.data.data,
      });
    },

    * review({id, reviewData}, {call}) {
      yield call(review, id, reviewData);
    },

    * comment({id, commentData}, {call}) {
      yield call(comment, id, commentData);
    },

    * selfEvaluation({selfEvaluationData}, {call}) {
      yield call(selfEvaluation, selfEvaluationData);
    }
  },

  reducers: {
    saveReviews(state, action) {
      return {...state, reviews: action.payload};
    },
    saveCurrentAssessment(state, action) {
      return {...state, currentAssessment: action.payload};
    },
    saveComments(state, action) {
      return {...state, comments: action.payload};
    },
  },

};
