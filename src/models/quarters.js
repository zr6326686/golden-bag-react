import {queryQuarters} from '../services/api';

export default {

  namespace: 'quarters',

  state: {
    list: {},
  },


  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(queryQuarters);
      yield put({
        type: 'saveQuarters',
        payload: response.data.data,
      });
    },
  },

  reducers: {
    saveQuarters(state, action) {
      return {...state, list: action.payload};
    },
  },

};
