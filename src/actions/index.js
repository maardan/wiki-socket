import {uniqueID} from './cookies';







/*================================================================
 * Setting the tabs on top
 * =============================================================*/
export const setTab = (tabIndex) => {
	return {
		type: 'SET_TAB',
		tabIndex
	};
};
/*================================================================
 * =============================================================*/









/*================================================================
 * Websocket connect/disconnect
 * =============================================================*/
export const wsConnect = (url) => {
	return {
		type: 'WEBSOCKET:CONNECT',
		id: uniqueID(),
		url
	}
}; 

export const wsDisconnect = () => {
	return {
		type: 'WEBSOCKET:DISCONNECT'
	}
}
/*================================================================
 * =============================================================*/











/*================================================================
 * User input when searching through projects
 * =============================================================*/
export const handleSearch = (usrInput) => {
	return {
		type: 'USER_SEARCH_INPUT',
		usrInput
	}	
};
/*================================================================
 * =============================================================*/










/*================================================================
 * Websocket request commands
 * =============================================================*/
export const fetchPageList = (project) => {
	return {
		type: 'WEBSOCKET:SEND',
		payload: { 
			"id": uniqueID(), 
			"name": "page.list", 
			"args": { project } 
		}
	}	
};

export const fetchPageDetails = (pageId, pageTitle) => {
	return {
		type: 'WEBSOCKET:SEND',
		selectedPage: {pageId, pageTitle},
		payload: { 
			"id": uniqueID(), 
			"name": "page.query", 
			"args": { pageId } 
		}
	}	
};

export const subscribeProject = (project) => {
	return {
		type: 'WEBSOCKET:SEND',
		payload: { 
			"id": uniqueID(), 
			"name": "project.subscribe", 
			"args": { project } 
		}
	}	
};

export const subscribePage = (pageId) => {
	return {
		type: 'WEBSOCKET:SEND',
		payload: { 
			"id": uniqueID(),
			"name": "page.subscribe", 
			"args": { pageId } 
		}
	}	
};

export const unsubscribeProject = () => {
	return {
		type: 'WEBSOCKET:SEND',
		payload: { 
			"id": uniqueID(), 
			"name": "project.unsubscribe"
		}
	}	
};

export const unsubscribePage = () => {
	return {
		type: 'WEBSOCKET:SEND',
		payload: { 
			"id": uniqueID(),
			"name": "page.unsubscribe"
		}
	}	
};
/*================================================================
 * =============================================================*/