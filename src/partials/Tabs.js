import React from 'react';

const Tabs = (props) => {

    return (
    	<div className="tabs">
			<h3>
				Wiki Socket
			</h3> 
			<ul id="breadcrumb">
				<li onClick={() => props.tabClick(0)}>
					<a className={props.currTab === 0 ? 'current' : 'not-current'}>
						All Projects
					</a>
				</li>
				<li onClick={() => props.tabClick(1)}>
					<a className={props.currTab === 1 ? 'current' : 'not-current'}>
						Pages
					</a>
				</li>
				<li onClick={() => props.tabClick(2)}>
					<a className={props.currTab === 2 ? 'current' : 'not-current'}>
						Page Details
					</a>
				</li>
			</ul>	
    	</div>);
}

export default Tabs;