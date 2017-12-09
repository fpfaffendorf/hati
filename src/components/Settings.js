import React from 'react';

import '../css/Settings.css';

// ============================================================================

class Settings extends React.Component {

  render() {
    return (
        <div id={this.props.id} className={'Settings ' + (this.props.visible ? '' : 'hide')}>
          <h3>About hati.space ...</h3>
        	<span>
            Mobile satellite mission control. Communicate with your satellites from your mobile.<br />
        		Idea and development by Federico Pfaffendorf (yo@federicopfaffendorf.com.ar)<br />
        		Special thanks to Juan Pablo Saraceno for his support and guidance.<br />
        		In memory of David H. Ransom Jr.<br />
        	</span>
        </div>  
      );
  }

}

// ============================================================================

export default Settings;