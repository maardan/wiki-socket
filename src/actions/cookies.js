 /*================================================================
  * For reading/storing cookies, where the unique ID is stored
 * =============================================================*/
const generateID = () => {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const setCookie = (cname,cvalue,exdays) => {
	let d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

export const uniqueID = () => {
	let uid = getCookie("uniqueID");
	if (uid !== "") {
		return uid;
	} else {
		uid = generateID();
		if (uid !== "" && uid !== null) {
			setCookie("uniqueID", uid, 30);
			return uid;
		}
	}
}
/*================================================================
 * =============================================================*/