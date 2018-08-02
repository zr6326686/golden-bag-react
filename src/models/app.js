import {fetchMenus} from '../services/api';

export default {

  namespace: 'app',

  state: {
    menus: [],
  },


  effects: {
    * fetchMenus(_, {call, put}) {
      const response = yield call(fetchMenus);
      yield put({
        type: 'saveMenus',
        payload: response.data.data,
      });
    },
  },

  reducers: {
    saveMenus(state, action) {
      return {...state, menus: action.payload};
    },
  },

};
