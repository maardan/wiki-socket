import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer';
import {uniqueID} from '../actions/cookies';

/**
* Websocket middleware (action -> socketMiddleware -> reducer)
*/	

let websocket;

const socketMiddleware = store => next => action => {

		// Call the next dispatch method in the middleware chain.
		let returnValue = next(action);

		switch (action.type) {
			// User request to initially connect
			case 'WEBSOCKET:CONNECT':
				// Configure the object...and attach appropriate call backs
				websocket = new WebSocket('wss://wiki-meta-explorer.herokuapp.com/'); 
				websocket.onopen = (event) => websocket.send(JSON.stringify({ id: action.id, name: 'project.list' })); // ex. { "id": "1234asdf", "name": "project.list" }
				websocket.onerror = (event) => store.dispatch({ type: 'WEBSOCKET:ERROR' });
				websocket.onclose = (event) => store.dispatch({ type: 'WEBSOCKET:CONNECT', id: uniqueID() }); // purpose of this is to loop back to 'WEBSOCKET:CONNECT' and not get disconnected
				websocket.onmessage = (event) => {
					
					const receivedMsg = JSON.parse(event.data);

					console.log(receivedMsg);

					// dispatch incoming message accordingly
					switch (receivedMsg.name) {
						case 'project.list':
							return store.dispatch({ type: 'WEBSOCKET:UPDATE_ALL_PROJECTS_LIST', payload: receivedMsg.data });
						case 'page.list':
							return store.dispatch({ type: 'WEBSOCKET:UPDATE_PAGES_LIST', id: receivedMsg.id, payload: receivedMsg.data });
						case 'page.query':
							return store.dispatch({ type: 'WEBSOCKET:UPDATE_PAGE_DETAILS', id: receivedMsg.id, payload: receivedMsg.data });		
						case 'project.update':
							return store.dispatch({ type: 'WEBSOCKET:UPDATE_PROJECT_SUBSCRIPTION', payload: receivedMsg.data });	
						case 'page.update':
							return store.dispatch({ type: 'WEBSOCKET:UPDATE_PAGE_SUBSCRIPTION', payload: receivedMsg.data });																			
						default: 
							break;
					}
				};
				break;
			// User request to send a message
			case 'WEBSOCKET:SEND':
				console.log(action.payload);
				websocket.send(JSON.stringify(action.payload));
				break;
			// User request to disconnect
			case 'WEBSOCKET:DISCONNECT':
				websocket.close(); 
				break;
			// We don't really need the default but ...
			default: 
				break;
		};
		// This will likely be the action itself, unless a middleware further in chain changed it.
		return returnValue;
}

let store = createStore(reducer,{},applyMiddleware(socketMiddleware));

export default store;