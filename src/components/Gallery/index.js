import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tile from './Tile';

import * as siteActions from 'store/actions/site';
import './Gallery.css';

class Gallery extends Component {
  componentWillMount() {
    this.props.siteActions.fetchSites();
  };

  renderSites() {
    return this.props.site.items.map((item, index) => {
      return (
        <li className='grid-item' key={item.sys.id}>
          <Tile data={item.fields}></Tile>
        </li>
      );
    });
    // return this.props.sites.map((year, index) => {
    //   Object.keys(year);
    //   return (
    //     <li className='grid-item' key={index}>
    //       <Tile data={item.fields}></Tile>
    //     </li>
    //   );
    // });

  };

  render() {
    return (
      <ul className='grid'>
        { this.renderSites() }
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.site
  // sites: sites
});

const mapDispatchToProps = (dispatch) => ({
  siteActions: bindActionCreators(siteActions, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
