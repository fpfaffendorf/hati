import React from 'react';

import '../css/Settings.css';

// ============================================================================

class Settings extends React.Component {

  render() {
    return (
        <div id={this.props.id} className={'Settings ' + (this.props.visible ? '' : 'hide')}>
          TLE Origins<br /><textarea style={{width: '90%', height: '50px'}}></textarea>
        </div>  
      );
  }

}

// ============================================================================

export default Settings;