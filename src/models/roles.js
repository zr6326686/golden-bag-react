import {addRole, queryCurrentRoles, queryPermissions, queryRoles, updateRole} from '../services/api';

export default {

  namespace: 'roles',

  state: {
    list: {},
    permissions: {},
    current: {},
  },


  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(queryRoles);
      yield put({
        type: 'saveRoles',
        payload: response.data.data,
      });
    },
    * fetchCurrent({id}, {call, put}) {
      const response = yield call(queryCurrentRoles, id);
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
    },
    * fetchPermissions(_, {call, put}) {
      const response = yield call(queryPermissions);
      yield put({
        type: 'savePermissions',
        payload: response.data.data,
      });
    },
    * addRole({role}, {call}) {
      yield call(addRole, role);
    },
    * updateRole({id, role}, {call}) {
      yield call(updateRole, id, role);
    },
  },

  reducers: {
    saveRoles(state, action) {
      return {...state, list: action.payload};
    },
    saveCurrent(state, action) {
      return {...state, current: action.payload};
    },
    savePermissions(state, action) {
      return {...state, permissions: action.payload};
    },
  },

};
