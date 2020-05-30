import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import axios from 'axios';

import { setGuide } from './ducks';
import USMap from './us-map';
import SideBar from './side-bar/index';

const AppWrapper = ({ countyList }) => (
  <div className="App">
    <USMap countyList={countyList} />
    <SideBar />
  </div>
)

const LoadingWrapper = () => (
  <div className="App">
    <span>Loading...</span>
  </div>
)

const DesktopWrapper = ({ setGuide }) => {
  const [countyList, setCountyList] = useState(undefined);

  async function fetchData() {
    const response = await axios(process.env.REACT_APP_PAINT_BY_COUNTY_API);
    await setGuide(response.data.dataGuide);
    setCountyList(response.data.dataSet);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      {countyList ? <AppWrapper countyList={countyList} /> : <LoadingWrapper />}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setGuide: county => dispatch(setGuide(county)),
})

export default connect(null, mapDispatchToProps)(DesktopWrapper)