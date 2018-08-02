import React from 'react';
import Logo from '../components/Logo/Logo';
import IndexStyles from './Index.css';
import {Menu, Spin} from 'antd';
import {Route, Switch} from 'dva/router';
import {connect} from 'dva';
import GlobalFooter from '../components/GlobalFooter/GlobalFooter';
import Account from '../components/Account/Account';
import {isLogin} from '../utils/utils';

const menusMapping = {
  'basic.user': [
    {
      path: '/users',
      exact: true,
      title: '用户列表',
      component: require('./Users/Index').default,
    },
    {
      path: '/users/add',
      exact: true,
      title: '添加用户',
      component: require('./Users/Add').default,
    },
    {
      path: '/users/:id',
      exact: true,
      title: '更新用户',
      component: require('./Users/Update').default,
    }
  ],
  'basic.role': [
    {
      path: '/roles',
      exact: true,
      title: '角色列表',
      component: require('./Roles/Index').default,
    },
    {
      path: '/roles/add',
      exact: true,
      title: '添加角色',
      component: require('./Roles/Add').default,
    },
    {
      path: '/roles/:id',
      exact: true,
      title: '更新角色',
      component: require('./Roles/Update').default,
    },
  ],
  'basic.quarter': [
    {
      path: '/quarters',
      exact: true,
      title: '季度列表',
      component: require('./Quarters/Index').default,
    },
  ],
  'basic.department': [
    {
      path: '/departments',
      exact: true,
      title: '部门列表',
      component: require('./Departments/Index').default,
    }
  ],
  'template_module.template': [
    {
      path: '/templates/:id/update',
      exact: true,
      title: '编辑模板',
      component: require('./Templates/UpdateTemplate').default,
    },
    {
      path: '/templates',
      exact: true,
      title: '模板列表',
      component: require('./Templates/Index').default,
    }
  ],
  'assessment.directManagerScore': [
    {
      path: '/reviews/:id',
      exact: true,
      title: '直接经理评分',
      component: require('./ReviewsAndComments/ShowReview').default,
    },
    {
      path: '/reviews',
      exact: true,
      title: '待评分',
      component: require('./ReviewsAndComments/Reviews').default,
    }
  ],
  'assessment.indirectManagerAuditComments': [
    {
      path: '/comments/:id',
      exact: true,
      title: '间接经理审核建议',
      component: require('./ReviewsAndComments/ShowComment').default,
    },
    {
      path: '/comments',
      exact: true,
      title: '待审核',
      component: require('./ReviewsAndComments/Comments').default,
    }
  ],
  'assessment.selfEvaluation': [
    {
      path: '/self_evaluation',
      exact: true,
      title: '自评',
      component: require('./ReviewsAndComments/SelfEvaluation').default,
    }
  ],
  'assessment.summary': [
    {
      path: '/summary',
      exact: true,
      title: '考核汇总',
      component: require('./Assessments/Index').default,
    }
  ]
};

@connect(({users, app, loading}) => ({
  me: users.me,
  menus: app.menus,
  loading: loading.models.app,
}))
export default class Index extends React.PureComponent {
  constructor(props) {
    super(props);

    if (!isLogin()) {
      window.location = '/auth/login?callback=' + window.location;
    }

    this.props.dispatch({type: 'users/fetchMe'});
    this.flatMenus = [];
    this.props.dispatch({type: 'app/fetchMenus'}).then(() => {
      this.props.menus.forEach(pMenu => {
        this.flatMenus.push(pMenu.children.map(cMenu => {
          return cMenu.fullName = `${pMenu.name}.${cMenu.name}`
        }));
      });
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div>
        <header className={IndexStyles.header}>
          <main className="container">
            <Logo/>
            <Menu className={IndexStyles.menu} mode="horizontal">
              <Menu.Item key="index" onClick={() => {
                this.props.history.push('/');
              }}>
                首页
              </Menu.Item>

              {

                this.props.menus.map((pMenu, index) => {
                  return (
                    <Menu.SubMenu key={index} title={pMenu.displayName}>
                      {
                        pMenu.children.map((cMenu, index) => {
                          const menuItem = menusMapping[`${pMenu.name}.${cMenu.name}`];
                          if (menuItem) {
                            return (
                              <Menu.ItemGroup key={index} title={cMenu.displayName}>
                                {

                                  menuItem.map((route) => {
                                    if (!route.path.includes(':')) {
                                      return (
                                        <Menu.Item key={route.path} onClick={() => {
                                          this.props.history.push(route.path)
                                        }}>{route.title}
                                        </Menu.Item>
                                      );
                                    } else {
                                      return null;
                                    }
                                  })
                                }
                              </Menu.ItemGroup>
                            );
                          } else {
                            return null;
                          }
                        })
                      }
                    </Menu.SubMenu>
                  )
                })
              }
            </Menu>
            <Account user={this.props.me}/>
          </main>
        </header>
        <main className="container">
          <Spin spinning={this.props.loading}>
            <Switch>
              {/*<Route path="/users" exact component={require('./Users/Index').default}/>*/}
              {/*<Route path="/users/add" exact component={require('./Users/Add').default}/>*/}
              {/*<Route path="/users/:id" exact component={require('./Users/Update').default}/>*/}

              {/*<Route path="/departments" exact component={require('./Departments/Index').default}/>*/}

              {/*<Route path="/templates/:id/update" exact component={require('./Templates/UpdateTemplate').default}/>*/}

              {/*<Route path="/quarters" exact component={require('./Quarters/Index').default}/>*/}

              {/*<Route path="/reviews" exact component={require('./ReviewsAndComments/Reviews').default}/>*/}
              {/*<Route path="/reviews/:id" exact component={require('./ReviewsAndComments/ShowReview').default}/>*/}

              {/*<Route path="/comments" exact component={require('./ReviewsAndComments/Comments').default}/>*/}
              {/*<Route path="/comments/:id" exact component={require('./ReviewsAndComments/ShowComment').default}/>*/}

              {/*<Route path="/self_evaluation" exact component={require('./ReviewsAndComments/SelfEvaluation').default}/>*/}

              {/*<Route path="/roles" exact component={require('./Roles/Index').default}/>*/}
              {/*<Route path="/roles/add" exact component={require('./Roles/Add').default}/>*/}
              {/*<Route path="/roles/:id" exact component={require('./Roles/Update').default}/>*/}
              <Route path="/" exact render={() => {
                return <h1>这就是首页</h1>;
              }}/>
              {
                this.flatMenus.map(items => {
                  const menuItem = menusMapping[items.fullName] || [];
                  return menuItem.map((route, index) => {
                    return <Route key={index} path={route.path} exact component={route.component}/>
                  });
                })
              }
              <Route component={require('../components/Exception/Page404').default}/>
            </Switch>
          </Spin>
          <GlobalFooter/>

        </main>
      </div>
    )
  }
}
