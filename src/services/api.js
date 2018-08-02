import request from '../utils/request';

export async function queryUsers() {
  return request('/users');
}

export async function queryCurrentUser(id) {
  return request(`/users/${id}`);
}

export async function addUser(user) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

export async function updateUser(id, user) {
  return request(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
}

export async function searchUser(params) {
  return request('/users/search?' + new URLSearchParams(params).toString());
}

export async function queryDepartments() {
  return request('/departments');
}


export async function addDepartment(department) {
  return request('/departments', {
    method: 'POST',
    body: JSON.stringify(department),
  });
}

export async function updateDepartment(id, department) {
  return request(`/departments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(department),
  });
}

export async function delDepartment(id) {
  return request(`/departments/${id}`, {
    method: 'DELETE',
  });
}

export async function queryQuarters() {
  return request('/quarters');
}

export async function queryTemplates() {
  return request('/templates');
}

export async function queryCurrentTemplate(id) {
  return request(`/templates/${id}`);
}

export async function queryMyTemplate() {
  return request(`/templates/get_template`);
}


export async function updateTemplate(id, type, params) {
  return request(`/templates/${type}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

export async function addTemplateChild(id, type, params) {
  return request(`templates/${id}/${type}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function queryReviewList() {
  return request(`/me/review_list`);
}

export async function queryCommentList() {
  return request(`/me/comment_list`);
}

export async function review(id, reviewData) {
  return request(`/direct_manager_score/${id}`, {
    method: 'PUT',
    body: JSON.stringify(reviewData),
  });
}

export async function comment(id, commentData) {
  return request(`/indirect_manager_comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(commentData),
  });
}

export async function selfEvaluation(selfEvaluationData) {
  return request(`/self_evaluation`, {
    method: 'POST',
    body: JSON.stringify(selfEvaluationData),
  });
}

export async function queryMe() {
  return request('/me');
}

export async function queryCurrentAssessments(id) {
  return request(`/assessments/${id}`);
}

export async function queryRoles() {
  return request('/roles');
}

export async function queryCurrentRoles(id) {
  return request(`/roles/${id}`);
}

export async function queryPermissions() {
  return request('/permissions');
}

export async function addRole(role) {
  return request('/roles', {
    method: 'POST',
    body: JSON.stringify(role),
  });
}

export async function updateRole(id, role) {
  return request(`/roles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(role),
  });
}

export async function fetchMenus() {
  return request('/permissions/menus');
}

export async function queryAssessments(quarterId) {
  return request(quarterId ? `/assessments?quarter_id=${quarterId}` : '/assessments');
}
