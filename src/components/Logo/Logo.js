import React from 'react';
import LogoStyles from './Logo.css';

export default class Logo extends React.PureComponent {
  render() {
    return (
      <div className={LogoStyles.logo}>员工绩效考评</div>
    );
  }
}
