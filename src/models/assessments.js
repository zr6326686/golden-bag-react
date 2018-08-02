import {queryAssessments} from '../services/api';

export default {

  namespace: 'assessments',

  state: {
    list: {},
  },

  effects: {
    * fetch({page = 0, size = 10}, {call, put}) {
      const response = yield call(queryAssessments, page, size);
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
