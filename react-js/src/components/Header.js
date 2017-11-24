import React from 'react';
import FontAwesome from 'react-fontawesome';

import '../css/Header.css';

// ============================================================================

class Header extends React.Component {

  render() {
    return (
        <div id={this.props.id} className="Header" style={ {background: this.props.background} } onClick={this.props.bodyClick}>
          <h2>{this.props.title} <span><FontAwesome name={this.props.actionIcon} style={ {color: this.props.background} } onClick={ this.props.actionClick } /></span></h2>
        </div>  
      );
  }

}

// ============================================================================

export default Header;