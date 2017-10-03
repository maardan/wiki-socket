import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchPageDetails} from '../actions';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
/**
* Contents under the "Pages" tab
*/	
class PagesList extends Component {

	render() {
		const {pagesList, selectPage, selectedPage} = this.props;

		const pgList = () => {

			if (pagesList.length > 0) {
				return (
					<ListGroup>
						{pagesList.map((pg, i) => <ListGroupItem key={i} bsStyle={pg.pageid === selectedPage.pageId ? 'success' : null} onClick={() => selectPage(pg.pageid, pg.title)}>{pg.title}</ListGroupItem>)}
					</ListGroup>);
			}
			else {
				return <h4>Please select a project</h4>;
			}
		};
	
		return pgList();
	}
}

const mapStateToProps = (state) => {
	return { 
		pagesList: state.events.pagesList,
		selectedPage: state.events.selectedPage
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectPage: (id, title) => dispatch(fetchPageDetails(id, title))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesList);