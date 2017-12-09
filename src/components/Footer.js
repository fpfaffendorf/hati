import React from 'react';

import '../css/Footer.css';

// ============================================================================

class Footer extends React.Component {

  render() {
    return (
        <div id={this.props.id} className="Footer" style={ {background: this.props.background} }>
          <h3>{this.props.title}</h3>
        </div>  
      );
  }

}

// ============================================================================

export default Footer;