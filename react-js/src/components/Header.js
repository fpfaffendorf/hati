import React from 'react';
import FontAwesome from 'react-fontawesome';

import '../css/Header.css';

// ============================================================================

class Header extends React.Component {

  render() {
    return (
        <div id={this.props.id} className="Header" style={ {background: this.props.background} }>
          <h2>{this.props.title} <span><FontAwesome name={this.props.actionIcon} style={ {color: this.props.background} } /></span></h2>
        </div>  
      );
  }

}

// ============================================================================

export default Header;