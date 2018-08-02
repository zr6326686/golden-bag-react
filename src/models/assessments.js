import {queryAssessments} from '../services/api';

export default {

  namespace: 'assessments',

  state: {
    list: {},
  },

  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(queryAssessments);
      yield put({
        type: 'save',
        payload: response.data.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {...state, list: action.payload};
    },
  },
};
