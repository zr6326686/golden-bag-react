import {queryQuarters, updateQuarter, queryCurrentQuarter} from '../services/api';

export default {

  namespace: 'quarters',

  state: {
    list: {},
    current: {},
  },


  effects: {
    * fetch({page = 0, size = 10}, {call, put}) {
      const response = yield call(queryQuarters, page, size);
      yield put({
        type: 'saveQuarters',
        payload: response.data.data,
      });
    },
    * fetchCurrent({id}, {call, put}) {
      const response = yield call(queryCurrentQuarter, id);
      yield put({
        type: 'saveCurrent',
        payload: response.data.data,
      });
    },
    * updateQuarter({id, quarter}, {call}) {
      yield call(updateQuarter, id, quarter);
    }
  },

  reducers: {
    saveQuarters(state, action) {
      return {...state, list: action.payload};
    },
    saveCurrent(state, action) {
      return {...state, current: action.payload};
    },
  },

};
