import React from 'react'
import { connect } from 'react-redux'
import Players from './Players'
import Common from './Common'
import StartMatch from './StartMatch' 
import Me from './Me' 

class Board extends React.Component {
	
  render() {
    // workaround to avoid infinite loop on StartMatch
    var renderHtml = ""
    if (!this.props.isStart) {
      renderHtml = <StartMatch/>  
    }
    return (
    <div className='container'>
      <Common />
    	<Players/>
    	<Me/>
      { renderHtml }
    </div>
    )
  }
}

const mapStateToProps = function(store) {
  console.log(store)
  return {
    isStart: store.isStart
  };
}

export default connect(mapStateToProps)(Board);
