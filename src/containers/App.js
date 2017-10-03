import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid, Carousel} from 'react-bootstrap';
import {wsConnect, wsDisconnect, setTab, subscribeProject, subscribePage, unsubscribeProject, unsubscribePage} from '../actions';
import PagesList from './PagesList';
import ProjectsList from './ProjectsList';
import PageDetails from './PageDetails';
import Tabs from '../partials/Tabs';
import Selected from '../partials/Selected';
import './App.css';

/**
* App is starting point (top node) of all components
*/	
class App extends Component {

	// Connect to websocket endpoint once the application is loaded
	componentDidMount() {
		const {wsConnect} = this.props;
        wsConnect();
	}

	componentWillUnmount() {
		const {wsDisconnect} = this.props;
        wsDisconnect();
	}

	render() {
		const {setTab, tabIndex, selectedProject, selectedPage, subscribeProject, subscribePage, projectSubscription, pageSubscription, unsubscribeProject, unsubscribePage, loading} = this.props;

		const currView = () => {

			if (loading) {
				return <div className="loader"></div>;
			}
			else {
				return (
					<Carousel activeIndex={tabIndex} controls={false} direction={null} indicators={false}>
						<Carousel.Item>
							<ProjectsList />
						</Carousel.Item>

						<Carousel.Item>
							<PagesList />
						</Carousel.Item>

						<Carousel.Item>
							<PageDetails />
						</Carousel.Item>
					</Carousel>);
			}
		};

		return (
			<Grid>
				<Tabs currTab={tabIndex} tabClick={(tabIndex) => setTab(tabIndex)} />
				<Selected 
					project={selectedProject} 
					page={selectedPage} 
					pgSubscription={pageSubscription}
					pjSubscription={projectSubscription}
					subscribeProject={() => subscribeProject(selectedProject)} 
					subscribePage={() => subscribePage(selectedPage.pageId)} 
					unsubscribeProject={() => unsubscribeProject()}
					unsubscribePage={() => unsubscribePage()}			
				/>
				<hr/>
				{currView()}
			</Grid>);
	}
}

const mapStateToProps = (state) => {
	return {
		tabIndex: state.events.tabIndex,
		selectedProject: state.events.selectedProject,
		selectedPage: state.events.selectedPage,
		projectSubscription: state.events.projectSubscription,
		pageSubscription: state.events.pageSubscription,
		loading: state.events.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		wsConnect: (url) => dispatch(wsConnect(url)),
		wsDisconnect: () => dispatch(wsDisconnect()),
		setTab: (tabIndex) => dispatch(setTab(tabIndex)),
		subscribeProject: (project) => dispatch(subscribeProject(project)),
		subscribePage: (pageId) => dispatch(subscribePage(pageId)),
		unsubscribeProject: () => dispatch(unsubscribeProject()),
		unsubscribePage: () => dispatch(unsubscribePage())		
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);