import {combineReducers} from 'redux';

const initialState = {
	tabIndex: 0,
	usrInput: '',
	searchSuggestions: [],
	allProjectsList: [],
	pagesList: [],
	pageDetails: [],
	selectedProject: '',
	selectedPage: {pageId: '', pageTitle: ''},
	projectSubscription: null,
	pageSubscription: null,
	wsCloseMsg: false,
	wsErrormsg: null,
	loading: false
};

const events = (state = initialState, action) => {

	switch (action.type) {
		/**
		* For top tab navigation
		*/			
		case 'SET_TAB' : 
			return {
				...state, 
				tabIndex: action.tabIndex
			}

		/**
		* To handle user text input & search logic
		*/	
		case 'USER_SEARCH_INPUT':	
			const regexp = new RegExp(action.usrInput, 'gi'); // use regex to search case-insensitive
			const searchSuggestions = action.usrInput === '' ? [] : state.allProjectsList.filter(obj => obj.match(regexp));
			return {
				...state, 
				usrInput: action.usrInput, searchSuggestions 
			}

		/**
		* from actions, 'WEBSOCKET:SEND', triggers this THEN middleware
		*/	
		case 'WEBSOCKET:SEND':	
			return {
				...state, 
				loading: (action.payload.name === "project.unsubscribe" || action.payload.name === "page.unsubscribe" ? false : true), 
				selectedProject: (action.payload.name === "page.list" ? action.payload.args.project : state.selectedProject),
				selectedPage: (action.payload.name === "page.query" ? action.selectedPage : state.selectedPage),
				projectSubscription: (action.payload.name === "project.unsubscribe" ? null : state.projectSubscription),
				pageSubscription: (action.payload.name === "page.unsubscribe" ? null : state.pageSubscription)
			}

		/**
		* The rest are state updates based on Websocket incoming message
		*/	
		case 'WEBSOCKET:UPDATE_ALL_PROJECTS_LIST':	
			return {
				...state, 
				allProjectsList: action.payload, 
				loading: false 
			}

		case 'WEBSOCKET:UPDATE_PAGES_LIST':	
			return {
				...state, 
				tabIndex: 1, 
				pagesList: action.payload, 
				loading: false 
			}

		case 'WEBSOCKET:UPDATE_PAGE_DETAILS':	
			return {
				...state, 
				tabIndex: 2, 
				pageDetails: action.payload, 
				loading: false 
			}

		case 'WEBSOCKET:UPDATE_PROJECT_SUBSCRIPTION':	
			return {
				...state, 
				projectSubscription: state.selectedProject, 
				pagesList: action.payload,
				loading: false 
			}			

		case 'WEBSOCKET:UPDATE_PAGE_SUBSCRIPTION':	
			return {
				...state, 
				pageSubscription: state.selectedPage.pageTitle, 
				pageDetails: action.payload, 
				loading: false 
			}	

		case 'WEBSOCKET:CLOSE':
			return {
				...state, 
				wsCloseMsg: 'Websocket Closed',
				loading: false 
			}

		case 'WEBSOCKET:ERROR':
			return {
				...state, 
				wsErrormsg: 'Connection Error',
				loading: false 
			}

		default:
			return state;
	}
}

export default combineReducers({ events });