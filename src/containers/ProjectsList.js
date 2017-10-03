import React, { Component } from 'react';
import {ListGroup, ListGroupItem, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchPageList, handleSearch} from '../actions';

class ProjectsList extends Component {

	render() {
		const {handleSearch, usrInput, searchSuggestions, selectProject, selectedProject} = this.props;

		const suggestions = () => {
			if (searchSuggestions.length > 0) {
				return (
					<ListGroup>
						{searchSuggestions.map((project, i) => <ListGroupItem key={i} bsStyle={project === selectedProject ? 'success' : null} onClick={() => selectProject(project)}>{project}</ListGroupItem>)}
					</ListGroup>);
			}
			else {
				return null;
			}
		};

		return (
			<FormGroup>
				<ControlLabel>Search</ControlLabel>
          		<FormControl type="text" placeholder="Ex. 'Warriors' or 'Trump'" value={usrInput} onChange={handleSearch} />
          		{suggestions()}
			</FormGroup>);
	}
}

const mapStateToProps = (state) => {
	return {
		usrInput: state.events.usrInput,
		searchSuggestions: state.events.searchSuggestions,
		selectedProject: state.events.selectedProject,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectProject: (str) => dispatch(fetchPageList(str)),
		handleSearch: (e) => dispatch(handleSearch(e.target.value))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);