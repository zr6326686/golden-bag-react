import {addRole, delRole, queryCurrentRoles, queryPermissions, queryRoles, updateRole} from '../services/api';

export default {

  namespace: 'roles',

  state: {
    list: {content: []},
    permissions: {},
    current: {},
  },


  effects: {
    * fetch({page = 0, size = 10}, {call, put}) {
      const response = yield call(queryRoles, page, size);
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
    * delRole({id}, {call, put}) {
      yield call(delRole, id);
    }
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
