
//import PCARSLV_BASIC from './PCARSLV_BASIC.js';

class PCARSLV_SETTINGS extends PCARSLV_BASIC {
	
	
	// example function header
	/*
	 * param {string}
	 * param {object}
	 * param {int}
	 * 
	 * return {string} true if all is fine, false if something went wrong
	 */	
	
		
	/* getAPIMODE()
	 * 
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	constructor() {
		super();	// get functions from basic class
				
		this.initFromConfigFile();
			
	}
	
	
	/* initFromConfigFile()
	 * initialize all relevant variables from config file. 
	 * 
	 * return {boolean} true if all is fine, false if something went wrong
	 */
	initFromConfigFile(){
		
		this.version = SCRIPTVERSION;
		
		this.curAPIMODE = APIMODE;
		this.curDsServerURL = DsServerURL;
		this.curDsPort = DsPort; 		
		
		
		return true;		
	}
	
	
	/* switchAPIMODE()
	 * 
	 * return {boolean} true if all is fine, false if something went wrong
	 */
	switchAPIMODE(apimode){
		
		switch (apimode) {
		
			// validations
			case "DS":
				if (this.curDsServerURL && this.curDsPort !== undefined){					
					if (this._isApiModeValid(apimode)){
						this.curAPIMODE = apimode;	// set new API mode
						this.displayMsg("INFO", "API Mode switched to: " + apimode);
					} else {
						this.displayMsg("WARN", "API Mode NOT switched. \nInvalid APIMODE: " + apimode);
					}										
				}else{
					this.displayErrorMsg("Switch canceled, not all variables defined. \nDSSERVERURL: "+ this.curDsServerURL +"\nDSPORT: "+ this.curDsPort +" !");
				}			
				break;
				
			case "DEMO":
									
				if (this._isApiModeValid(apimode)){
					this.curAPIMODE = apimode;	// set new API mode
					this.displayMsg("INFO", "API Mode switched to: " + apimode);
				} else {
					this.displayMsg("WARN", "API Mode NOT switched. \nInvalid APIMODE: " + apimode);
				}										
					
				break;
			
			default:
				if (this._isApiModeValid(apimode)){
					this.curAPIMODE = apimode;	// set new API mode
					this.displayMsg("INFO", "API Mode switched to: " + apimode);
				} else {
					this.displayMsg("ERROR", "API Mode NOT switched. \nInvalid APIMODE: " + apimode);
				}									
				break;
				
		} 
		
		
		
		if (this.curAPIMODE){
			return this.curAPIMODE;
		}else{
			this.displayErrorMsg("APIMODE not defined");	// used from basic class
			return false;
		}				
	}
	
	
	
	/* getAPIMODE()
	 * 
	 * return {boolean} true if all is fine, false if something went wrong
	 */
	getAPIMODE(){		
		if (this.curAPIMODE){
			return this.curAPIMODE;
		}else{
			this.displayErrorMsg("APIMODE not defined");	// used from basic class
			return false;
		}				
	}
	
	/* getAPIMODE()
	 * 
	 * param {string} string of the APIMODE
	 * return {boolean} true if all is fine, false if something went wrong
	 */	
	_isApiModeValid(apimode){
		
		var aVALIDAPIMODES = {				
				"DS" : 		'active',
				"DS2" : 	'active',
				"DS-AMS2" : 'active',
				"CREST" : 	'active',
				"CREST2" : 	'active',
				"CREST2-AMS2" : 'active',
				"DEMO" : 	'active'				
		}
		
		if (apimode in aVALIDAPIMODES){
			return true;			
		}else{			
			return false;
		}				
	}
	
	/*
	* Description: In case of APIMODE switch, copy specific variables to the common one
	* Usage: setCurrentSettings("CREST2");
	* 
	* param {string}  string of APIMODE
	* return {bolean} true if all is fine, false if something went wrong
	*/
	setCurrentSettings(sApiMode){
		
		switch(sApiMode){
			case "DS":
				sCurUrl = DsServerURL;
				sCurPort = DsPort;
				sCurPath = DsPath;
				break;

			case "DS2":
				sCurUrl = Ds2ServerURL;
				sCurPort = Ds2Port;
				sCurPath = Ds2Path;
				break;

			case "DS-AMS2":
				sCurUrl = DsAMS2ServerURL;
				sCurPort = DsAMS2Port;
				sCurPath = DsAMS2Path;
				break;
			
			case "CREST":
				sCurUrl = CRESTServerURL;
				sCurPort = CRESTPort;
				sCurPath = CRESTPath;
				break;
			
			case "CREST2":
				sCurUrl = CREST2ServerURL;
				sCurPort = CREST2Port;
				sCurPath = CREST2Path;
				break;

			case "CREST2-AMS2":
				sCurUrl = CREST2AMS2ServerURL;
				sCurPort = CREST2AMS2Port;
				sCurPath = CREST2AMS2Path;
				break;
				
			default:  // fall back to DS1 settings
				sCurUrl = DsServerURL;
				sCurPort = DsPort;
				sCurPath = DsPath;
		}
		
		if(log >= 3){console.log ("called setCurrentSettings() changed to: " +"|" + sCurUrl +' | '+ sCurPort);}
		
		return 1;
	}
	
}