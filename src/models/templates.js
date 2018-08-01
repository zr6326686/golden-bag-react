import {addTemplateChild, queryCurrentTemplate, queryMyTemplate, updateTemplate} from '../services/api';
import {initialUppercase, underline2Hump} from '../utils/utils';
import clone from 'clone';

export default {

  namespace: 'templates',

  state: {
    current: {
      assessmentProjects: [],
      assessmentInputs: [],
    },
    myTemplate: {
      assessmentProjects: [],
      assessmentInputs: [],
    },
  },


  effects: {
    * fetchCurrent({id}, {call, put}) {
      const response = yield call(queryCurrentTemplate, id);
      yield put({
        type: 'saveCurrent',
        payload: response.data.data,
      });
    },

    * fetchMyTemplate(_, {call, put}) {
      const response = yield call(queryMyTemplate);
      yield put({
        type: 'saveMyTemplate',
        payload: response.data.data,
      });
    },

    * updateTemplate({id, templateChildType, params}, {call, put}) {
      const response = yield call(updateTemplate, id, templateChildType, params);
      yield put({
        type: `update${initialUppercase(underline2Hump(templateChildType))}`,
        payload: response.data.data,
      });
    },
    * addTemplateChild({id, templateChildType, params}, {call, put}) {
      const response = yield call(addTemplateChild, id, templateChildType, params);
      if (templateChildType === 'project_item') {
        response.data.data.parentId = params.id;
      }
      yield put({
        type: `add${initialUppercase(underline2Hump(templateChildType))}`,
        payload: response.data.data,
      });
    }
  },

  reducers: {
    saveCurrent(state, action) {
      return {...state, current: action.payload};
    },
    saveMyTemplate(state, action) {
      return {...state, myTemplate: action.payload};
    },

    updateProjectItem(state, {payload}) {
      const stateBak = clone(state);
      const project =
        stateBak.current.assessmentProjects.find(item => item.items.findIndex(i => i.id === payload.id) >= 0);
      if (project) {
        const index = project.items.findIndex(item => item.id === payload.id);
        if (index >= 0) {
          project.items[index] = payload;
        }
      }

      return stateBak;
    },
    updateProject(state, {payload}) {
      const stateBak = clone(state);
      const index =
        stateBak.current.assessmentProjects.findIndex(item => item.id === payload.id);
      if (index >= 0) {
        stateBak.current.assessmentProjects[index].title = payload.title;
      }
      return stateBak;
    },
    updateTemplateInput(state, {payload}) {
      const stateBak = clone(state);
      const index =
        stateBak.current.assessmentInputs.findIndex(item => item.id === payload.id);
      if (index >= 0) {
        stateBak.current.assessmentInputs[index] = payload;
      }
      return stateBak;
    },

    addProjectItem(state, {payload}) {
      const stateBak = clone(state);
      const project =
        stateBak.current.assessmentProjects.find(item => item.id === payload.parentId);
      if (project) {
        project.items.push(payload);
      }
      return stateBak;
    },
    addProject(state, {payload}) {
      const stateBak = clone(state);
      stateBak.current.assessmentProjects.push(payload);
      return stateBak;
    },
    addTemplateInput(state, {payload}) {
      const stateBak = clone(state);
      stateBak.current.assessmentInputs.push(payload);
      return stateBak;
    },
  },

};
