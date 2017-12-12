import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as siteActions from 'store/actions/site';
import './Gallery.css';

class Gallery extends Component {
  componentWillMount() {
    this.props.siteActions.fetchSites();
  };

  renderSites() {
    return this.props.site.items.map((post, index) => {
      return (
        <li className='list-item' key={post.sys.id}>
          <h3>{post.fields.title}</h3>
          <p>{post.fields.description}</p>
          date
          URL
          keywords
        </li>
      );
    });
  };

  render() {
    return (
      <ul className='list'>
        { this.renderSites() }
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  site: state.site
});

const mapDispatchToProps = (dispatch) => ({
  siteActions: bindActionCreators(siteActions, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
