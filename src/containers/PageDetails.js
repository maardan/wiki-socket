import React, { Component } from 'react';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
/**
* Contents under the "Page Details" tab
*/	
class PageDetails extends Component {

	render() {
		const {pageDetails} = this.props;

		const pgList = () => {
			let key, text = [];

			for (key in pageDetails) {
				if (key !== 'revisions') 
					text.push(key + ": " + pageDetails[key]);
			}
			return text.length > 0 ? text.map((obj, i) => <ListGroupItem key={i}>{obj}</ListGroupItem>) : <h4>Please select a page</h4>;
		}

		return (
			<ListGroup>
				{pgList()}
			</ListGroup>);
	}
}

const mapStateToProps = (state) => {
	return { 
		pageDetails: state.events.pageDetails
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetails);