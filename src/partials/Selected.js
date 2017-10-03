import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

const Selected = (props) => {

	const checkedAnimation = <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
								<circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
								<path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
							</svg>;

	const projectSubscription = () => {
		if (props.project) {
			return (				
				<div>
					<h4>Project: {props.project}</h4>
					{
						props.pjSubscription === props.project ?
						<div className="subscribed">
							<Button className="unsubscribe-btn" bsStyle="danger" onClick={props.unsubscribeProject}>Unubscribe</Button>
							<div className="check">{checkedAnimation}</div>
						</div>
						:
						<Button bsStyle="primary" onClick={props.subscribeProject}>Subscribe</Button>
					}
				</div>);
		}
		else {
			return null;
		}
	};

	const pageSubscription = () => {
		if (props.page.pageTitle) {
			return (				
				<div>
					<h4>Page: {props.page.pageTitle}</h4>
					{
						props.pgSubscription === props.page.pageTitle ? 
						<div className="subscribed">
							<div className="check">{checkedAnimation}</div>
							<Button className="unsubscribe-btn" bsStyle="danger" onClick={props.unsubscribePage}>Unsubscribe</Button>
						</div> 
						:
						<Button bsStyle="primary" onClick={props.subscribePage}>Subscribe</Button>
					}
				</div>);
		}
		else {
			return null;
		}
	};

    return (
		<Row>
			<Col xs={6} sm={6} md={6} lg={6}>
				{projectSubscription()}
			</Col>
			
			<Col xs={6} sm={6} md={6} lg={6} className="align-right">
				{pageSubscription()}
			</Col>
		</Row>);
}

export default Selected;