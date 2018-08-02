import {addDepartment, delDepartment, queryDepartments, updateDepartment} from '../services/api';

export default {

  namespace: 'departments',

  state: {
    list: [],
  },

  effects: {
    * fetch({page = 0, size = 10}, {call, put}) {
      const response = yield call(queryDepartments, page, size);
      yield put({
        type: 'saveDepartments',
        payload: response.data.data,
      });
    },
    * updateDepartment({id, department}, {call, put}) {
      yield call(updateDepartment, id, department);
      yield put({type: 'fetch'});
    },
    * addDepartment({department}, {call, put}) {
      yield call(addDepartment, department);
      yield put({type: 'fetch'});
    },
    * delDepartment({id}, {call, put}) {
      yield call(delDepartment, id);
      yield put({type: 'fetch'});
    },
  },

  reducers: {
    saveDepartments(state, action) {
      return {...state, list: action.payload};
    },
  },
};
