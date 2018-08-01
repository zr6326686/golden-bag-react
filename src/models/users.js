import {addUser, queryCurrentUser, queryMe, queryUsers, searchUser, updateUser} from '../services/api';

export default {

  namespace: 'users',

  state: {
    list: {},
    current: {},
    searchUsers: [],
    me: {},
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(queryUsers);
      yield put({
        type: 'saveUsers',
        payload: response.data.data,
      });
    },
    * fetchCurrent({params: {id}}, {call, put}) {
      const response = yield call(queryCurrentUser, id);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data.data,
      });
      yield put({
        type: 'addSearchUsers',
        payload: response.data.data.directManager,
      });
      yield put({
        type: 'addSearchUsers',
        payload: response.data.data.indirectManager,
      });
    },
    * searchUsers({params}, {call, put}) {
      const response = yield call(searchUser, params);
      yield put({
        type: 'saveSearchUsers',
        payload: response.data.data,
      });
    },
    * updateUser({id, user}, {call}) {
      yield call(updateUser, id, user);
    },
    * addUser({id, user}, {call}) {
      yield call(addUser, user);
    },
    * fetchMe(_, {call, put}) {
      const response = yield call(queryMe);
      yield put({
        type: 'saveMe',
        payload: response.data.data,
      });
    }
  },

  reducers: {
    saveUsers(state, action) {
      return {...state, list: action.payload};
    },
    saveMe(state, action) {
      return {...state, me: action.payload};
    },
    saveCurrentUser(state, action) {
      return {...state, current: action.payload};
    },
    saveSearchUsers(state, action) {
      return {...state, searchUsers: action.payload};
    },
    addSearchUsers(state, action) {
      return {
        ...state,
        searchUsers: [...state.searchUsers, action.payload].filter(item => item),
      };
    },
  },

};
