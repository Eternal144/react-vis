import React from 'react';
import '../style/app.css'
import { Row, Col,Button } from 'react-bootstrap'
import EventThreadContainer from './EventThreadContainer'
import PeakChartContainer from './PeakChartContainer'
import ToolContainer from './ToolsContainer'
import { connect } from 'react-redux';
const App = ({ chartFlag })=>(
  <div id="app-container" className="border">
    <Row>
      <Col sm={8} className="border">
        {/* <EventThreadContainer visible={chartFlag}/> */}
        <EventThreadContainer visible={false}/>
        <PeakChartContainer visible={true}/>
      </Col>
      <Col sm={4} className="border">
        <Row className="border">
          <ToolContainer/>
        </Row>
        <Row className="border">
          剩下的空间
        </Row>

      </Col>
    </Row>
    </div>
)
// id="chart-container"        {/* <PeakChartContainer visible={!chartFlag}/> */}
const mapStateToProps = state =>({
  chartFlag: state.chartFlag
})

export default connect(
  mapStateToProps
)(App);
