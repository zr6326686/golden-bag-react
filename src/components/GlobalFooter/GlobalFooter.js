import React from 'react';
import GlobalFooterStyles from './GlobalFooter.css';

export default class GlobalFooter extends React.PureComponent {
  render() {
    return (
      <footer className={GlobalFooterStyles.footer}>
        Copyright &copy; 2018
      </footer>
    );
  }
}
