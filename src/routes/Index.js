import React from 'react';
import Logo from '../components/Logo/Logo';
import IndexStyles from './Index.css';
import {Menu} from 'antd';
import {Route, Switch} from 'dva/router';
import {connect} from 'dva';

@connect(({users}) => ({
  me: users.me,
}))
export default class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.dispatch({type: 'users/fetchMe'});
  }

  render() {
    return (
      <div>
        <header className={IndexStyles.header}>
          <main className="container">
            <Logo/>
            <Menu className={IndexStyles.menu}>
              <Menu.Item key="index">
                首页
              </Menu.Item>
            </Menu>
          </main>
        </header>
        <main className="container">
          <Switch>
            <Route path="/users" exact component={require('./Users/Index').default}/>
            <Route path="/users/add" exact component={require('./Users/Add').default}/>
            <Route path="/users/:id" exact component={require('./Users/Update').default}/>
            <Route path="/departments" exact component={require('./Departments/Index').default}/>
            <Route path="/quarters" exact component={require('./Quarters/Index').default}/>
            <Route path="/templates/:id/update" exact component={require('./Templates/UpdateTemplate').default}/>
            <Route path="/reviews" exact component={require('./ReviewsAndComments/Reviews').default}/>
            <Route path="/reviews/:id" exact component={require('./ReviewsAndComments/ShowReview').default}/>

            <Route path="/comments" exact component={require('./ReviewsAndComments/Comments').default}/>
            <Route path="/comments/:id" exact component={require('./ReviewsAndComments/ShowComment').default}/>

            <Route path="/self_evaluation" exact component={require('./ReviewsAndComments/SelfEvaluation').default}/>
            <Route component={require('../components/Exception/Page404').default}/>
          </Switch>
        </main>
      </div>
    );
  }
}
