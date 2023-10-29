
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_DATABUFFER_IMPLEMENTED="1";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_STREAM_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="release";
CFG_DIDDY_FRAMEWORK="1";
CFG_GLFW_COPY_LIBS="openal32";
CFG_GLFW_COPY_LIBS_32="openal32";
CFG_GLFW_GCC_LIB_OPTS="-lopenal32";
CFG_HOST="winnt";
CFG_HTML5_APP_FILENAME="CerberusGame.html";
CFG_HTML5_APP_ICON="";
CFG_HTML5_APP_TITLE="CerberusGame";
CFG_HTML5_CANVAS_ALPHA="0";
CFG_HTML5_CANVAS_ANTIALIAS="1";
CFG_HTML5_CANVAS_HEIGHT="480";
CFG_HTML5_CANVAS_RESIZE_MODE="1";
CFG_HTML5_CANVAS_WIDTH="800";
CFG_HTML5_CONSOLE_SHOW="1";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_REFLECTION_FILTER="diddy.exception";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n[Image1.png];type=image/png;width=1024;height=1024;\n[Image2.png];type=image/png;width=1024;height=1024;\n[Image3.png];type=image/png;width=1024;height=1024;\n[Image4.png];type=image/png;width=1024;height=512;\n[Image5.png];type=image/png;width=256;height=256;\n[Image6.png];type=image/png;width=512;height=512;\n[Image7.png];type=image/png;width=1024;height=1024;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Cerberus runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Cerberus Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

//function debugLog( str ){
//	if( window.console!=undefined ) window.console.log( str );
//}

function debugLog( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Cerberus Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "cerberusstate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "cerberusstate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.CountJoysticks=function( update ){
	return 0;
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.GetDeviceWindowWidth=function(){
	return this.GetDeviceWidth();
}

BBGame.prototype.GetDeviceWindowHeight=function(){
	return this.GetDeviceHeight();
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Cerberus Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


var webglGraphicsSeq=1;

function BBHtml5Game( canvas ){

	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){

		//can't get these to fire!
		canvas.addEventListener( "webglcontextlost",function( event ){
			event.preventDefault();
//			print( "WebGL context lost!" );
		},false );

		canvas.addEventListener( "webglcontextrestored",function( event ){
			++webglGraphicsSeq;
//			print( "WebGL context restored!" );
		},false );

		var attrs={ antialias: ( CFG_HTML5_CANVAS_ANTIALIAS=="1" ), alpha:( CFG_HTML5_CANVAS_ALPHA=="1" ) };
	
		this._gl=this._canvas.getContext( "webgl",attrs );

		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl",attrs );
		
		if( !this._gl ) this.Die( "Can't create WebGL" );
		
		gl=this._gl;
	}
	
	// --- start gamepad api by skn3 ---------
	this._gamepads = null;
	this._gamepadLookup = [-1,-1,-1,-1];//support 4 gamepads
	this._gamepadCount = -1;//Grant Edit HTML5 gamepad count
	var that = this;
	window.addEventListener("gamepadconnected", function(e) {
		that.connectGamepad(e.gamepad);
	});
	
	window.addEventListener("gamepaddisconnected", function(e) {
		that.disconnectGamepad(e.gamepad);
	});
	
	//need to process already connected gamepads (before page was loaded)
	var gamepads = this.getGamepads();
	if (gamepads && gamepads.length > 0) {
		for(var index=0;index < gamepads.length;index++) {
			this.connectGamepad(gamepads[index]);
		}
	}
	// --- end gamepad api by skn3 ---------
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

// --- start gamepad api by skn3 ---------

//Grant Edit HTML5 gamepad count ---- start
BBHtml5Game.prototype.CountJoysticks = function( update ) {
	if (update || this._gamepadCount == -1) {
		for (var i = this._gamepadLookup.length-1; i >= 0; i --) {
			if (this._gamepadLookup[i] != -1) {
				this._gamepadCount = i+1;
				return this._gamepadCount;
			}
		}
		return 0;
	}
	return this._gamepadCount;
}
//Grant Edit HTML5 gamepad count ---- end

BBHtml5Game.prototype.getGamepads = function() {
	return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
}

BBHtml5Game.prototype.connectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//check if this is a standard gamepad
//	if (gamepad.mapping == "standard") {
		//yup so lets add it to an array of valid gamepads
		//find empty controller slot
		var slot = -1;
		for(var index = 0;index < this._gamepadLookup.length;index++) {
			if (this._gamepadLookup[index] == -1) {
				slot = index;
				break;
			}
		}
		
		//can we add this?
		if (slot != -1) {
			this._gamepadLookup[slot] = gamepad.index;
			
			//console.log("gamepad at html5 index "+gamepad.index+" mapped to Cerberus gamepad unit "+slot);
		}
//	} else {
//		console.log('Cerberus has ignored gamepad at raw port #'+gamepad.index+' with unrecognised mapping scheme \''+gamepad.mapping+'\'.');
//	}
}

BBHtml5Game.prototype.disconnectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}

	var m_disconnectedIndex = -1;//Grant Edit HTML5 gamepad count

	//scan all gamepads for matching index
	for(var index = 0;index < this._gamepadLookup.length;index++) {
		if (this._gamepadLookup[index] == gamepad.index) {
			//remove this gamepad
			m_disconnectedIndex = index;//Grant Edit HTML5 gamepad count
			this._gamepadLookup[index] = -1
			break;
		}
	}
	//Grant Edit HTML5 gamepad count ---- start
	if (m_disconnectedIndex >= 0 && m_disconnectedIndex < this._gamepadLookup.length-1) {
		for (var i = m_disconnectedIndex+1; i < this._gamepadLookup.length; i ++) {
			this._gamepadLookup[i-1] = this._gamepadLookup[i];
		}
		this._gamepadLookup[this._gamepadLookup.length-1] = -1;
	}
	//Grant Edit HTML5 gamepad count ---- end
}

BBHtml5Game.prototype.PollJoystick=function(port, joyx, joyy, joyz, buttons){
	//is this the first gamepad being polled
	if (port == 0) {
		//yes it is so we use the web api to get all gamepad info
		//we can then use this in subsequent calls to PollJoystick
		this._gamepads = this.getGamepads();
	}
	
	//dont bother processing if nothing to process
	if (!this._gamepads) {
	  return false;
	}
	
	//so use the Cerberus port to find the correct raw data
	var index = this._gamepadLookup[port];
	if (index == -1) {
		return false;
	}

	var gamepad = this._gamepads[index];
	if (!gamepad) {
		return false;
	}
	//so now process gamepad axis/buttons according to the standard mappings
	//https://w3c.github.io/gamepad/#remapping
	
	//left stick axis
	joyx[0] = gamepad.axes[0];
	joyy[0] = -gamepad.axes[1];
	
	//right stick axis
	joyx[1] = gamepad.axes[2];
	joyy[1] = -gamepad.axes[3];
	
	//left trigger
	joyz[0] = gamepad.buttons[6] ? gamepad.buttons[6].value : 0.0;
	
	//right trigger
	joyz[1] = gamepad.buttons[7] ? gamepad.buttons[7].value : 0.0;
	
	//clear button states
	for(var index = 0;index <32;index++) {
		buttons[index] = false;
	}
	
	//map html5 "standard" mapping to Cerberuss joy codes
	/*
	Const JOY_A=0
	Const JOY_B=1
	Const JOY_X=2
	Const JOY_Y=3
	Const JOY_LB=4
	Const JOY_RB=5
	Const JOY_BACK=6
	Const JOY_START=7
	Const JOY_LEFT=8
	Const JOY_UP=9
	Const JOY_RIGHT=10
	Const JOY_DOWN=11
	Const JOY_LSB=12
	Const JOY_RSB=13
	Const JOY_MENU=14
	*/
	buttons[0] = gamepad.buttons[0] && gamepad.buttons[0].pressed;
	buttons[1] = gamepad.buttons[1] && gamepad.buttons[1].pressed;
	buttons[2] = gamepad.buttons[2] && gamepad.buttons[2].pressed;
	buttons[3] = gamepad.buttons[3] && gamepad.buttons[3].pressed;
	buttons[4] = gamepad.buttons[4] && gamepad.buttons[4].pressed;
	buttons[5] = gamepad.buttons[5] && gamepad.buttons[5].pressed;
	buttons[6] = gamepad.buttons[8] && gamepad.buttons[8].pressed;
	buttons[7] = gamepad.buttons[9] && gamepad.buttons[9].pressed;
	buttons[8] = gamepad.buttons[14] && gamepad.buttons[14].pressed;
	buttons[9] = gamepad.buttons[12] && gamepad.buttons[12].pressed;
	buttons[10] = gamepad.buttons[15] && gamepad.buttons[15].pressed;
	buttons[11] = gamepad.buttons[13] && gamepad.buttons[13].pressed;
	buttons[12] = gamepad.buttons[10] && gamepad.buttons[10].pressed;
	buttons[13] = gamepad.buttons[11] && gamepad.buttons[11].pressed;
	buttons[14] = gamepad.buttons[16] && gamepad.buttons[16].pressed;
	
	//success
	return true
}
// --- end gamepad api by skn3 ---------


BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "cerberus://data/" )!=0 ) return "";
	path=path.slice(16);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "cerberus:" )!=0 ){
		return path;
	}else if( path.indexOf( "cerberus://data/" )==0 ) {
		return "data/"+path.slice( 16 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e),0 );
		eatEvent( e );
	}

	canvas.onwheel=function( e ){
		var amount = 0;
		if(e.deltaY < 0){
			amount = 1;
		}else if(e.deltaY > 0){
			amount = -1;
		}
		game.MouseEvent( BBGameEvent.MouseMove, -1, mouseX(e), mouseY(e), amount);
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}else{
			game.ValidateUpdateTimer();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}

	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();
	
	game.RenderGame();
}


function BBCerberusGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBCerberusGame.prototype=extend_class( BBHtml5Game );

BBCerberusGame.Main=function( canvas ){

	var game=new BBCerberusGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		try {
			chan.waSource.stop( 0 );
			chan.state = 0			
		} catch (err) {			
		}
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		try {
			chan.waSource.stop( 0 );
		} catch (err) {			
		}
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	try {
		chan.waSource.stop( 0 );
	} catch (err) {			
	}
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	thread._surface=null;
	thread._result=false;
	thread._running=true;

	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._result=true;
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._running=false;
	}
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
	this._running=false;
}
  
if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	var req=new XMLHttpRequest();
	req.open( "get",BBGame.Game().PathToUrl( this._path ),true );
	req.responseType="arraybuffer";
	
	req.onload=function(){
		//load success!
		wa.decodeAudioData( req.response,function( buffer ){
			//decode success!
			thread._sample=new gxtkSample();
			thread._sample.waBuffer=buffer;
			thread._sample.state=1;
			thread._result=true;
			thread._running=false;
		},function(){	
			//decode fail!
			thread._running=false;
		} );
	}
	
	req.onerror=function(){
		//load fail!
		thread._running=false;
	}
	
	req.send();
}
	
}else{
 
BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var audio=new Audio();
	if( !audio ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	audio.src=BBGame.Game().PathToUrl( this._path );
	audio.preload='auto';	
	
	var success=function( e ){
		thread._sample=new gxtkSample( audio );
		thread._result=true;
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	var error=function( e ){
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	audio.addEventListener( 'canplaythrough',success,false );
	audio.addEventListener( 'error',error,false );
	
	//voodoo fix for Chrome!
	var timer=setInterval( function(){ if( !thread._running ) clearInterval( timer ); },200 );
	
	audio.load();
}

}
  
BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return this._running;
}


function BBDataBuffer(){
	this.arrayBuffer=null;
	this.length=0;
}

BBDataBuffer.tbuf=new ArrayBuffer(4);
BBDataBuffer.tbytes=new Int8Array( BBDataBuffer.tbuf );
BBDataBuffer.tshorts=new Int16Array( BBDataBuffer.tbuf );
BBDataBuffer.tints=new Int32Array( BBDataBuffer.tbuf );
BBDataBuffer.tfloats=new Float32Array( BBDataBuffer.tbuf );

BBDataBuffer.prototype._Init=function( buffer ){
  
  this.length=buffer.byteLength;
  
  if (buffer.byteLength != Math.ceil(buffer.byteLength / 4) * 4)
  {
    var new_buffer = new ArrayBuffer(Math.ceil(buffer.byteLength / 4) * 4);
    var src = new Int8Array(buffer);
    var dst = new Int8Array(new_buffer);
    for (var i = 0; i < this.length; i++) {
      dst[i] = src[i];
    }
    buffer = new_buffer;    
  }

	this.arrayBuffer=buffer;
	this.bytes=new Int8Array( buffer );	
	this.shorts=new Int16Array( buffer,0,this.length/2 );	
	this.ints=new Int32Array( buffer,0,this.length/4 );	
	this.floats=new Float32Array( buffer,0,this.length/4 );
}

BBDataBuffer.prototype._New=function( length ){
	if( this.arrayBuffer ) return false;
	
	var buf=new ArrayBuffer( length );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._Load=function( path ){
	if( this.arrayBuffer ) return false;
	
	var buf=BBGame.Game().LoadData( path );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._LoadAsync=function( path,thread ){

	var buf=this;
	
	var xhr=new XMLHttpRequest();
	xhr.open( "GET",BBGame.Game().PathToUrl( path ),true );
	xhr.responseType="arraybuffer";
	
	xhr.onload=function(e){
		if( this.status==200 || this.status==0 ){
			buf._Init( xhr.response );
			thread.result=buf;
		}
		thread.running=false;
	}
	
	xhr.onerror=function(e){
		thread.running=false;
	}
	
	xhr.send();
}


BBDataBuffer.prototype.GetArrayBuffer=function(){
	return this.arrayBuffer;
}

BBDataBuffer.prototype.Length=function(){
	return this.length;
}

BBDataBuffer.prototype.Discard=function(){
	if( this.arrayBuffer ){
		this.arrayBuffer=null;
		this.length=0;
	}
}

BBDataBuffer.prototype.PokeByte=function( addr,value ){
	this.bytes[addr]=value;
}

BBDataBuffer.prototype.PokeShort=function( addr,value ){
	if( addr&1 ){
		BBDataBuffer.tshorts[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		return;
	}
	this.shorts[addr>>1]=value;
}

BBDataBuffer.prototype.PokeInt=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tints[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.ints[addr>>2]=value;
}

BBDataBuffer.prototype.PokeFloat=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tfloats[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.floats[addr>>2]=value;
}

BBDataBuffer.prototype.PeekByte=function( addr ){
	return this.bytes[addr];
}

BBDataBuffer.prototype.PeekShort=function( addr ){
	if( addr&1 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		return BBDataBuffer.tshorts[0];
	}
	return this.shorts[addr>>1];
}

BBDataBuffer.prototype.PeekInt=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tints[0];
	}
	return this.ints[addr>>2];
}

BBDataBuffer.prototype.PeekFloat=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tfloats[0];
	}
	return this.floats[addr>>2];
}


function BBStream(){
}

BBStream.prototype.Eof=function(){
	return 0;
}

BBStream.prototype.Close=function(){
}

BBStream.prototype.Length=function(){
	return 0;
}

BBStream.prototype.Position=function(){
	return 0;
}

BBStream.prototype.Seek=function( position ){
	return 0;
}

BBStream.prototype.Read=function( buffer,offset,count ){
	return 0;
}

BBStream.prototype.Write=function( buffer,offset,count ){
	return 0;
}

/*
Copyright (c) 2011 Steve Revill and Shane Woolcock
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var diddy = new Object();

var diddy_mouseWheelDelta = 0.0;

diddy.mouseZ = function() {
	var t = diddy_mouseWheelDelta;
	diddy_mouseWheelDelta = 0.0;
	return t;
}

diddy.mouseZInit = function() {
	var canvas=document.getElementById( "GameCanvas" );
	
	canvas.onmousewheel = function(e) {
		diddy_mouseWheelDelta += e.wheelDelta/120.0;
	}
}

diddy.systemMillisecs=function(){
	return new Date().getTime();
};

diddy.setGraphics=function(w, h)
{
	var canvas=document.getElementById( "GameCanvas" );
	canvas.width  = w;
	canvas.height = h;
	//return window.innerHeight;
}
diddy.setMouse=function(x, y)
{
}
diddy.showKeyboard=function()
{
}
diddy.launchBrowser=function(address, windowName)
{
	window.open(address, windowName);
}
diddy.launchEmail=function(email, subject, text)
{
	location.href="mailto:"+email+"&subject="+subject+"&body="+text+"";
}

diddy.startVibrate=function(millisecs)
{
}
diddy.stopVibrate=function()
{
}

diddy.startGps=function(){
}

diddy.getLatitude=function(){
	return ""
}
diddy.getLongitude=function(){
	return ""
}
diddy.showAlertDialog=function(title, message)
{
	alert(title + "\n\n" + message);
}
diddy.getInputString=function()
{
	return "";
}
// Browser detect from http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

diddy.getBrowserName=function(){
	return BrowserDetect.browser;
};

diddy.getBrowserVersion=function(){
	return BrowserDetect.version;
};

diddy.getBrowserOS=function(){
	return BrowserDetect.OS;
};

diddy.seekMusic=function(timeMillis)
{
	if(bb_audio_device &&
		bb_audio_device.channels &&
		bb_audio_device.channels[32] &&
		bb_audio_device.channels[32].audio)
	{
		var audio = bb_audio_device.channels[32].audio;
		try {
			audio.currentTime = timeMillis/1000.0;
			return 1;
		} catch(e) {}
	}
	return 0;
};

function c_BoolObject(){
	Object.call(this);
	this.m_value=false;
}
c_BoolObject.m_new=function(t_value){
	this.m_value=t_value;
	return this;
}
c_BoolObject.prototype.p_ToBool=function(){
	return this.m_value;
}
c_BoolObject.prototype.p_Equals=function(t_box){
	return this.m_value==t_box.m_value;
}
c_BoolObject.m_new2=function(){
	return this;
}
function c_IntObject(){
	Object.call(this);
	this.m_value=0;
}
c_IntObject.m_new=function(t_value){
	this.m_value=t_value;
	return this;
}
c_IntObject.m_new2=function(t_value){
	this.m_value=((t_value)|0);
	return this;
}
c_IntObject.prototype.p_ToInt=function(){
	return this.m_value;
}
c_IntObject.prototype.p_ToFloat=function(){
	return (this.m_value);
}
c_IntObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_IntObject.prototype.p_Equals2=function(t_box){
	return this.m_value==t_box.m_value;
}
c_IntObject.prototype.p_Compare=function(t_box){
	return this.m_value-t_box.m_value;
}
c_IntObject.m_new3=function(){
	return this;
}
function c_FloatObject(){
	Object.call(this);
	this.m_value=.0;
}
c_FloatObject.m_new=function(t_value){
	this.m_value=(t_value);
	return this;
}
c_FloatObject.m_new2=function(t_value){
	this.m_value=t_value;
	return this;
}
c_FloatObject.prototype.p_ToInt=function(){
	return ((this.m_value)|0);
}
c_FloatObject.prototype.p_ToFloat=function(){
	return this.m_value;
}
c_FloatObject.prototype.p_ToString=function(){
	return String(this.m_value);
}
c_FloatObject.prototype.p_Equals3=function(t_box){
	return this.m_value==t_box.m_value;
}
c_FloatObject.prototype.p_Compare2=function(t_box){
	if(this.m_value<t_box.m_value){
		return -1;
	}
	return ((this.m_value>t_box.m_value)?1:0);
}
c_FloatObject.m_new3=function(){
	return this;
}
function c_StringObject(){
	Object.call(this);
	this.m_value="";
}
c_StringObject.m_new=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new2=function(t_value){
	this.m_value=String(t_value);
	return this;
}
c_StringObject.m_new3=function(t_value){
	this.m_value=t_value;
	return this;
}
c_StringObject.prototype.p_ToString=function(){
	return this.m_value;
}
c_StringObject.prototype.p_Equals4=function(t_box){
	return this.m_value==t_box.m_value;
}
c_StringObject.prototype.p_Compare3=function(t_box){
	return string_compare(this.m_value,t_box.m_value);
}
c_StringObject.m_new4=function(){
	return this;
}
function bb_boxes_BoxBool(t_value){
	return (c_BoolObject.m_new.call(new c_BoolObject,t_value));
}
function bb_boxes_BoxInt(t_value){
	return (c_IntObject.m_new.call(new c_IntObject,t_value));
}
function bb_boxes_BoxFloat(t_value){
	return (c_FloatObject.m_new2.call(new c_FloatObject,t_value));
}
function bb_boxes_BoxString(t_value){
	return (c_StringObject.m_new3.call(new c_StringObject,t_value));
}
function bb_boxes_UnboxBool(t_box){
	return object_downcast((t_box),c_BoolObject).m_value;
}
function bb_boxes_UnboxInt(t_box){
	return object_downcast((t_box),c_IntObject).m_value;
}
function bb_boxes_UnboxFloat(t_box){
	return object_downcast((t_box),c_FloatObject).m_value;
}
function bb_boxes_UnboxString(t_box){
	return object_downcast((t_box),c_StringObject).m_value;
}
function bb_lang_DebugLog(t_message){
	var t_b=0;
	return 0;
}
function bb_lang_DebugStop(){
	return 0;
}
function c_DiddyException(){
	ThrowableObject.call(this);
	this.m_message="";
	this.m_cause=null;
	this.m_type="";
	this.m_fullType="";
}
c_DiddyException.prototype=extend_class(ThrowableObject);
c_DiddyException.prototype.p_Message=function(){
	return this.m_message;
}
c_DiddyException.prototype.p_Message2=function(t_message){
	this.m_message=t_message;
}
c_DiddyException.prototype.p_Cause=function(){
	return this.m_cause;
}
c_DiddyException.prototype.p_Cause2=function(t_cause){
	if(t_cause==(this)){
		t_cause=null;
	}
	this.m_cause=t_cause;
}
c_DiddyException.prototype.p_Type=function(){
	return this.m_type;
}
c_DiddyException.prototype.p_FullType=function(){
	return this.m_fullType;
}
c_DiddyException.prototype.p_ToString2=function(t_recurse){
	var t_rv=this.m_type+": "+this.m_message;
	if(t_recurse){
		var t_depth=10;
		var t_current=this.m_cause;
		while(((t_current)!=null) && t_depth>0){
			if((object_downcast((t_current),c_DiddyException))!=null){
				t_rv=t_rv+("\nCaused by "+this.m_type+": "+object_downcast((t_current),c_DiddyException).m_message);
				t_current=object_downcast((t_current),c_DiddyException).m_cause;
				t_depth-=1;
			}else{
				t_rv=t_rv+"\nCaused by a non-Diddy exception.";
				t_current=null;
			}
		}
	}
	return t_rv;
}
c_DiddyException.m_new=function(t_message,t_cause){
	this.m_message=t_message;
	this.m_cause=t_cause;
	var t_ci=bb_reflection_GetClass2(this);
	if((t_ci)!=null){
		this.m_fullType=t_ci.p_Name();
	}else{
		this.m_fullType="diddy.exception.DiddyException";
	}
	if(this.m_fullType.indexOf(".")!=-1){
		this.m_type=this.m_fullType.slice(this.m_fullType.lastIndexOf(".")+1);
	}else{
		this.m_type=this.m_fullType;
	}
	return this;
}
function c_ClassInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__sclass=null;
	this.m__ifaces=[];
	this.m__rconsts=[];
	this.m__consts=[];
	this.m__rfields=[];
	this.m__fields=[];
	this.m__rglobals=[];
	this.m__globals=[];
	this.m__rmethods=[];
	this.m__methods=[];
	this.m__rfunctions=[];
	this.m__functions=[];
	this.m__ctors=[];
}
c_ClassInfo.prototype.p_Name=function(){
	return this.m__name;
}
c_ClassInfo.m_new=function(t_name,t_attrs,t_sclass,t_ifaces){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__sclass=t_sclass;
	this.m__ifaces=t_ifaces;
	return this;
}
c_ClassInfo.m_new2=function(){
	return this;
}
c_ClassInfo.prototype.p_Init=function(){
	return 0;
}
c_ClassInfo.prototype.p_InitR=function(){
	if((this.m__sclass)!=null){
		var t_consts=c_Stack.m_new2.call(new c_Stack,this.m__sclass.m__rconsts);
		var t_=this.m__consts;
		var t_2=0;
		while(t_2<t_.length){
			var t_t=t_[t_2];
			t_2=t_2+1;
			t_consts.p_Push(t_t);
		}
		this.m__rconsts=t_consts.p_ToArray();
		var t_fields=c_Stack2.m_new2.call(new c_Stack2,this.m__sclass.m__rfields);
		var t_3=this.m__fields;
		var t_4=0;
		while(t_4<t_3.length){
			var t_t2=t_3[t_4];
			t_4=t_4+1;
			t_fields.p_Push4(t_t2);
		}
		this.m__rfields=t_fields.p_ToArray();
		var t_globals=c_Stack3.m_new2.call(new c_Stack3,this.m__sclass.m__rglobals);
		var t_5=this.m__globals;
		var t_6=0;
		while(t_6<t_5.length){
			var t_t3=t_5[t_6];
			t_6=t_6+1;
			t_globals.p_Push7(t_t3);
		}
		this.m__rglobals=t_globals.p_ToArray();
		var t_methods=c_Stack4.m_new2.call(new c_Stack4,this.m__sclass.m__rmethods);
		var t_7=this.m__methods;
		var t_8=0;
		while(t_8<t_7.length){
			var t_t4=t_7[t_8];
			t_8=t_8+1;
			t_methods.p_Push10(t_t4);
		}
		this.m__rmethods=t_methods.p_ToArray();
		var t_functions=c_Stack5.m_new2.call(new c_Stack5,this.m__sclass.m__rfunctions);
		var t_9=this.m__functions;
		var t_10=0;
		while(t_10<t_9.length){
			var t_t5=t_9[t_10];
			t_10=t_10+1;
			t_functions.p_Push13(t_t5);
		}
		this.m__rfunctions=t_functions.p_ToArray();
	}else{
		this.m__rconsts=this.m__consts;
		this.m__rfields=this.m__fields;
		this.m__rglobals=this.m__globals;
		this.m__rmethods=this.m__methods;
		this.m__rfunctions=this.m__functions;
	}
	return 0;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare4=function(t_lhs,t_rhs){
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare4(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare4(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap(){
	c_Map.call(this);
}
c_StringMap.prototype=extend_class(c_Map);
c_StringMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare4=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
var bb_reflection__classesMap=null;
var bb_reflection__classes=[];
function c_Node(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
function bb_reflection_GetClass(t_name){
	if(!((bb_reflection__classesMap)!=null)){
		bb_reflection__classesMap=c_StringMap.m_new.call(new c_StringMap);
		var t_=bb_reflection__classes;
		var t_2=0;
		while(t_2<t_.length){
			var t_c=t_[t_2];
			t_2=t_2+1;
			var t_name2=t_c.p_Name();
			bb_reflection__classesMap.p_Set(t_name2,t_c);
			var t_i=t_name2.lastIndexOf(".");
			if(t_i==-1){
				continue;
			}
			t_name2=t_name2.slice(t_i+1);
			if(bb_reflection__classesMap.p_Contains(t_name2)){
				bb_reflection__classesMap.p_Set(t_name2,null);
			}else{
				bb_reflection__classesMap.p_Set(t_name2,t_c);
			}
		}
	}
	return bb_reflection__classesMap.p_Get(t_name);
}
function c__GetClass(){
	Object.call(this);
}
c__GetClass.prototype.p_GetClass=function(t_obj){
}
c__GetClass.m_new=function(){
	return this;
}
var bb_reflection__getClass=null;
function bb_reflection_GetClass2(t_obj){
	return bb_reflection__getClass.p_GetClass(t_obj);
}
function c_AssertException(){
	c_DiddyException.call(this);
}
c_AssertException.prototype=extend_class(c_DiddyException);
c_AssertException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_ConcurrentModificationException(){
	c_DiddyException.call(this);
}
c_ConcurrentModificationException.prototype=extend_class(c_DiddyException);
c_ConcurrentModificationException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_IndexOutOfBoundsException(){
	c_DiddyException.call(this);
}
c_IndexOutOfBoundsException.prototype=extend_class(c_DiddyException);
c_IndexOutOfBoundsException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_IllegalArgumentException(){
	c_DiddyException.call(this);
}
c_IllegalArgumentException.prototype=extend_class(c_DiddyException);
c_IllegalArgumentException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_XMLParseException(){
	c_DiddyException.call(this);
}
c_XMLParseException.prototype=extend_class(c_DiddyException);
c_XMLParseException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_UnsupportedOperationException(){
	c_DiddyException.call(this);
}
c_UnsupportedOperationException.prototype=extend_class(c_DiddyException);
c_UnsupportedOperationException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_FormatException(){
	c_DiddyException.call(this);
}
c_FormatException.prototype=extend_class(c_DiddyException);
c_FormatException.m_new=function(t_message,t_cause){
	c_DiddyException.m_new.call(this,t_message,t_cause);
	return this;
}
function c_R16(){
	c_ClassInfo.call(this);
}
c_R16.prototype=extend_class(c_ClassInfo);
c_R16.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.lang.Object",1,null,[]);
	return this;
}
c_R16.prototype.p_Init=function(){
	this.p_InitR();
	return 0;
}
function c_R17(){
	c_ClassInfo.call(this);
}
c_R17.prototype=extend_class(c_ClassInfo);
c_R17.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.boxes.BoolObject",0,bb_reflection__classes[0],[]);
	bb_reflection__boolClass=(this);
	return this;
}
c_R17.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R18.m_new.call(new c_R18));
	this.m__methods=new_object_array(2);
	this.m__methods[0]=(c_R20.m_new.call(new c_R20));
	this.m__methods[1]=(c_R21.m_new.call(new c_R21));
	this.m__ctors=new_object_array(2);
	this.m__ctors[0]=(c_R19.m_new.call(new c_R19));
	this.m__ctors[1]=(c_R22.m_new.call(new c_R22));
	this.p_InitR();
	return 0;
}
var bb_reflection__boolClass=null;
function c_R23(){
	c_ClassInfo.call(this);
}
c_R23.prototype=extend_class(c_ClassInfo);
c_R23.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.boxes.IntObject",0,bb_reflection__classes[0],[]);
	bb_reflection__intClass=(this);
	return this;
}
c_R23.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R24.m_new.call(new c_R24));
	this.m__methods=new_object_array(5);
	this.m__methods[0]=(c_R27.m_new.call(new c_R27));
	this.m__methods[1]=(c_R28.m_new.call(new c_R28));
	this.m__methods[2]=(c_R29.m_new.call(new c_R29));
	this.m__methods[3]=(c_R30.m_new.call(new c_R30));
	this.m__methods[4]=(c_R31.m_new.call(new c_R31));
	this.m__ctors=new_object_array(3);
	this.m__ctors[0]=(c_R25.m_new.call(new c_R25));
	this.m__ctors[1]=(c_R26.m_new.call(new c_R26));
	this.m__ctors[2]=(c_R32.m_new.call(new c_R32));
	this.p_InitR();
	return 0;
}
var bb_reflection__intClass=null;
function c_R33(){
	c_ClassInfo.call(this);
}
c_R33.prototype=extend_class(c_ClassInfo);
c_R33.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.boxes.FloatObject",0,bb_reflection__classes[0],[]);
	bb_reflection__floatClass=(this);
	return this;
}
c_R33.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R34.m_new.call(new c_R34));
	this.m__methods=new_object_array(5);
	this.m__methods[0]=(c_R37.m_new.call(new c_R37));
	this.m__methods[1]=(c_R38.m_new.call(new c_R38));
	this.m__methods[2]=(c_R39.m_new.call(new c_R39));
	this.m__methods[3]=(c_R40.m_new.call(new c_R40));
	this.m__methods[4]=(c_R41.m_new.call(new c_R41));
	this.m__ctors=new_object_array(3);
	this.m__ctors[0]=(c_R35.m_new.call(new c_R35));
	this.m__ctors[1]=(c_R36.m_new.call(new c_R36));
	this.m__ctors[2]=(c_R42.m_new.call(new c_R42));
	this.p_InitR();
	return 0;
}
var bb_reflection__floatClass=null;
function c_R43(){
	c_ClassInfo.call(this);
}
c_R43.prototype=extend_class(c_ClassInfo);
c_R43.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.boxes.StringObject",0,bb_reflection__classes[0],[]);
	bb_reflection__stringClass=(this);
	return this;
}
c_R43.prototype.p_Init=function(){
	this.m__fields=new_object_array(1);
	this.m__fields[0]=(c_R44.m_new.call(new c_R44));
	this.m__methods=new_object_array(3);
	this.m__methods[0]=(c_R48.m_new.call(new c_R48));
	this.m__methods[1]=(c_R49.m_new.call(new c_R49));
	this.m__methods[2]=(c_R50.m_new.call(new c_R50));
	this.m__ctors=new_object_array(4);
	this.m__ctors[0]=(c_R45.m_new.call(new c_R45));
	this.m__ctors[1]=(c_R46.m_new.call(new c_R46));
	this.m__ctors[2]=(c_R47.m_new.call(new c_R47));
	this.m__ctors[3]=(c_R51.m_new.call(new c_R51));
	this.p_InitR();
	return 0;
}
var bb_reflection__stringClass=null;
function c_R52(){
	c_ClassInfo.call(this);
}
c_R52.prototype=extend_class(c_ClassInfo);
c_R52.m_new=function(){
	c_ClassInfo.m_new.call(this,"cerberus.lang.Throwable",33,bb_reflection__classes[0],[]);
	return this;
}
c_R52.prototype.p_Init=function(){
	this.p_InitR();
	return 0;
}
function c_R53(){
	c_ClassInfo.call(this);
}
c_R53.prototype=extend_class(c_ClassInfo);
c_R53.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.DiddyException",32,bb_reflection__classes[5],[]);
	return this;
}
c_R53.prototype.p_Init=function(){
	this.m__fields=new_object_array(4);
	this.m__fields[0]=(c_R54.m_new.call(new c_R54));
	this.m__fields[1]=(c_R55.m_new.call(new c_R55));
	this.m__fields[2]=(c_R56.m_new.call(new c_R56));
	this.m__fields[3]=(c_R57.m_new.call(new c_R57));
	this.m__methods=new_object_array(7);
	this.m__methods[0]=(c_R58.m_new.call(new c_R58));
	this.m__methods[1]=(c_R59.m_new.call(new c_R59));
	this.m__methods[2]=(c_R60.m_new.call(new c_R60));
	this.m__methods[3]=(c_R61.m_new.call(new c_R61));
	this.m__methods[4]=(c_R62.m_new.call(new c_R62));
	this.m__methods[5]=(c_R63.m_new.call(new c_R63));
	this.m__methods[6]=(c_R65.m_new.call(new c_R65));
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R64.m_new.call(new c_R64));
	this.p_InitR();
	return 0;
}
function c_R66(){
	c_ClassInfo.call(this);
}
c_R66.prototype=extend_class(c_ClassInfo);
c_R66.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.AssertException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R66.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R67.m_new.call(new c_R67));
	this.p_InitR();
	return 0;
}
function c_R68(){
	c_ClassInfo.call(this);
}
c_R68.prototype=extend_class(c_ClassInfo);
c_R68.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.ConcurrentModificationException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R68.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R69.m_new.call(new c_R69));
	this.p_InitR();
	return 0;
}
function c_R70(){
	c_ClassInfo.call(this);
}
c_R70.prototype=extend_class(c_ClassInfo);
c_R70.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.IndexOutOfBoundsException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R70.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R71.m_new.call(new c_R71));
	this.p_InitR();
	return 0;
}
function c_R72(){
	c_ClassInfo.call(this);
}
c_R72.prototype=extend_class(c_ClassInfo);
c_R72.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.IllegalArgumentException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R72.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R73.m_new.call(new c_R73));
	this.p_InitR();
	return 0;
}
function c_R74(){
	c_ClassInfo.call(this);
}
c_R74.prototype=extend_class(c_ClassInfo);
c_R74.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.XMLParseException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R74.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R75.m_new.call(new c_R75));
	this.p_InitR();
	return 0;
}
function c_R76(){
	c_ClassInfo.call(this);
}
c_R76.prototype=extend_class(c_ClassInfo);
c_R76.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.UnsupportedOperationException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R76.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R77.m_new.call(new c_R77));
	this.p_InitR();
	return 0;
}
function c_R78(){
	c_ClassInfo.call(this);
}
c_R78.prototype=extend_class(c_ClassInfo);
c_R78.m_new=function(){
	c_ClassInfo.m_new.call(this,"diddy.exception.FormatException",32,bb_reflection__classes[6],[]);
	return this;
}
c_R78.prototype.p_Init=function(){
	this.m__ctors=new_object_array(1);
	this.m__ctors[0]=(c_R79.m_new.call(new c_R79));
	this.p_InitR();
	return 0;
}
function c_FunctionInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__retType=null;
	this.m__argTypes=[];
}
c_FunctionInfo.m_new=function(t_name,t_attrs,t_retType,t_argTypes){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__retType=t_retType;
	this.m__argTypes=t_argTypes;
	return this;
}
c_FunctionInfo.m_new2=function(){
	return this;
}
var bb_reflection__functions=[];
function c_R4(){
	c_FunctionInfo.call(this);
}
c_R4.prototype=extend_class(c_FunctionInfo);
c_R4.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.BoxBool",0,bb_reflection__classes[0],[bb_reflection__boolClass]);
	return this;
}
function c_R5(){
	c_FunctionInfo.call(this);
}
c_R5.prototype=extend_class(c_FunctionInfo);
c_R5.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.BoxInt",0,bb_reflection__classes[0],[bb_reflection__intClass]);
	return this;
}
function c_R6(){
	c_FunctionInfo.call(this);
}
c_R6.prototype=extend_class(c_FunctionInfo);
c_R6.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.BoxFloat",0,bb_reflection__classes[0],[bb_reflection__floatClass]);
	return this;
}
function c_R7(){
	c_FunctionInfo.call(this);
}
c_R7.prototype=extend_class(c_FunctionInfo);
c_R7.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.BoxString",0,bb_reflection__classes[0],[bb_reflection__stringClass]);
	return this;
}
function c_R8(){
	c_FunctionInfo.call(this);
}
c_R8.prototype=extend_class(c_FunctionInfo);
c_R8.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.UnboxBool",0,bb_reflection__boolClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R9(){
	c_FunctionInfo.call(this);
}
c_R9.prototype=extend_class(c_FunctionInfo);
c_R9.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.UnboxInt",0,bb_reflection__intClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R10(){
	c_FunctionInfo.call(this);
}
c_R10.prototype=extend_class(c_FunctionInfo);
c_R10.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.UnboxFloat",0,bb_reflection__floatClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R11(){
	c_FunctionInfo.call(this);
}
c_R11.prototype=extend_class(c_FunctionInfo);
c_R11.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.boxes.UnboxString",0,bb_reflection__stringClass,[bb_reflection__classes[0]]);
	return this;
}
function c_R12(){
	c_FunctionInfo.call(this);
}
c_R12.prototype=extend_class(c_FunctionInfo);
c_R12.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.lang.DebugLog",0,bb_reflection__intClass,[bb_reflection__stringClass]);
	return this;
}
function c_R13(){
	c_FunctionInfo.call(this);
}
c_R13.prototype=extend_class(c_FunctionInfo);
c_R13.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.lang.DebugStop",0,bb_reflection__intClass,[]);
	return this;
}
function c_R14(){
	c_FunctionInfo.call(this);
}
c_R14.prototype=extend_class(c_FunctionInfo);
c_R14.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.lang.Print",1,bb_reflection__intClass,[bb_reflection__stringClass]);
	return this;
}
function c_R15(){
	c_FunctionInfo.call(this);
}
c_R15.prototype=extend_class(c_FunctionInfo);
c_R15.m_new=function(){
	c_FunctionInfo.m_new.call(this,"cerberus.lang.Error",1,bb_reflection__intClass,[bb_reflection__stringClass]);
	return this;
}
function c___GetClass(){
	c__GetClass.call(this);
}
c___GetClass.prototype=extend_class(c__GetClass);
c___GetClass.m_new=function(){
	c__GetClass.m_new.call(this);
	return this;
}
c___GetClass.prototype.p_GetClass=function(t_o){
	if(object_downcast((t_o),c_FormatException)!=null){
		return bb_reflection__classes[13];
	}
	if(object_downcast((t_o),c_UnsupportedOperationException)!=null){
		return bb_reflection__classes[12];
	}
	if(object_downcast((t_o),c_XMLParseException)!=null){
		return bb_reflection__classes[11];
	}
	if(object_downcast((t_o),c_IllegalArgumentException)!=null){
		return bb_reflection__classes[10];
	}
	if(object_downcast((t_o),c_IndexOutOfBoundsException)!=null){
		return bb_reflection__classes[9];
	}
	if(object_downcast((t_o),c_ConcurrentModificationException)!=null){
		return bb_reflection__classes[8];
	}
	if(object_downcast((t_o),c_AssertException)!=null){
		return bb_reflection__classes[7];
	}
	if(object_downcast((t_o),c_DiddyException)!=null){
		return bb_reflection__classes[6];
	}
	if(object_downcast((t_o),ThrowableObject)!=null){
		return bb_reflection__classes[5];
	}
	if(object_downcast((t_o),c_StringObject)!=null){
		return bb_reflection__classes[4];
	}
	if(object_downcast((t_o),c_FloatObject)!=null){
		return bb_reflection__classes[3];
	}
	if(object_downcast((t_o),c_IntObject)!=null){
		return bb_reflection__classes[2];
	}
	if(object_downcast((t_o),c_BoolObject)!=null){
		return bb_reflection__classes[1];
	}
	if(t_o!=null){
		return bb_reflection__classes[0];
	}
	return bb_reflection__unknownClass;
}
function bb_reflection___init(){
	bb_reflection__classes=new_object_array(14);
	bb_reflection__classes[0]=(c_R16.m_new.call(new c_R16));
	bb_reflection__classes[1]=(c_R17.m_new.call(new c_R17));
	bb_reflection__classes[2]=(c_R23.m_new.call(new c_R23));
	bb_reflection__classes[3]=(c_R33.m_new.call(new c_R33));
	bb_reflection__classes[4]=(c_R43.m_new.call(new c_R43));
	bb_reflection__classes[5]=(c_R52.m_new.call(new c_R52));
	bb_reflection__classes[6]=(c_R53.m_new.call(new c_R53));
	bb_reflection__classes[7]=(c_R66.m_new.call(new c_R66));
	bb_reflection__classes[8]=(c_R68.m_new.call(new c_R68));
	bb_reflection__classes[9]=(c_R70.m_new.call(new c_R70));
	bb_reflection__classes[10]=(c_R72.m_new.call(new c_R72));
	bb_reflection__classes[11]=(c_R74.m_new.call(new c_R74));
	bb_reflection__classes[12]=(c_R76.m_new.call(new c_R76));
	bb_reflection__classes[13]=(c_R78.m_new.call(new c_R78));
	bb_reflection__classes[0].p_Init();
	bb_reflection__classes[1].p_Init();
	bb_reflection__classes[2].p_Init();
	bb_reflection__classes[3].p_Init();
	bb_reflection__classes[4].p_Init();
	bb_reflection__classes[5].p_Init();
	bb_reflection__classes[6].p_Init();
	bb_reflection__classes[7].p_Init();
	bb_reflection__classes[8].p_Init();
	bb_reflection__classes[9].p_Init();
	bb_reflection__classes[10].p_Init();
	bb_reflection__classes[11].p_Init();
	bb_reflection__classes[12].p_Init();
	bb_reflection__classes[13].p_Init();
	bb_reflection__functions=new_object_array(12);
	bb_reflection__functions[0]=(c_R4.m_new.call(new c_R4));
	bb_reflection__functions[1]=(c_R5.m_new.call(new c_R5));
	bb_reflection__functions[2]=(c_R6.m_new.call(new c_R6));
	bb_reflection__functions[3]=(c_R7.m_new.call(new c_R7));
	bb_reflection__functions[4]=(c_R8.m_new.call(new c_R8));
	bb_reflection__functions[5]=(c_R9.m_new.call(new c_R9));
	bb_reflection__functions[6]=(c_R10.m_new.call(new c_R10));
	bb_reflection__functions[7]=(c_R11.m_new.call(new c_R11));
	bb_reflection__functions[8]=(c_R12.m_new.call(new c_R12));
	bb_reflection__functions[9]=(c_R13.m_new.call(new c_R13));
	bb_reflection__functions[10]=(c_R14.m_new.call(new c_R14));
	bb_reflection__functions[11]=(c_R15.m_new.call(new c_R15));
	bb_reflection__getClass=(c___GetClass.m_new.call(new c___GetClass));
	return 0;
}
var bb_reflection__init=0;
function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	if((bb_app__app)!=null){
		error("App has already been created");
	}
	bb_app__app=this;
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app__game.SetDelegate(bb_app__delegate);
	return this;
}
c_App.prototype.p_OnResize=function(){
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	return 0;
}
c_App.prototype.p_OnResume=function(){
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	return 0;
}
c_App.prototype.p_OnRender=function(){
	return 0;
}
c_App.prototype.p_OnClose=function(){
	bb_app_EndApp();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	this.p_OnClose();
	return 0;
}
c_App.prototype.p_OnFileDrop=function(t_filename){
	return 0;
}
function c_Game_Volleyball(){
	c_App.call(this);
}
c_Game_Volleyball.prototype=extend_class(c_App);
c_Game_Volleyball.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_Game_Volleyball.prototype.p_OnBack=function(){
	return 0;
}
c_Game_Volleyball.m_RX_Ekr=0;
c_Game_Volleyball.m_RY_Ekr=0;
c_Game_Volleyball.m_Flag_End=0;
c_Game_Volleyball.m_MassaRL=0;
c_Game_Volleyball.m_MassaRP=0;
c_Game_Volleyball.m_MassaB=0;
c_Game_Volleyball.m_SV_Bomb=0;
c_Game_Volleyball.m_Grav=0;
c_Game_Volleyball.m_Y_Ekran=0;
c_Game_Volleyball.m_X_NachF1=0;
c_Game_Volleyball.m_Smok1_X=[];
c_Game_Volleyball.m_Smok1_Y=[];
c_Game_Volleyball.m_Smok1_R=[];
c_Game_Volleyball.m_Smok1_A=[];
c_Game_Volleyball.m_X_NachF2=0;
c_Game_Volleyball.m_Smok2_X=[];
c_Game_Volleyball.m_Smok2_Y=[];
c_Game_Volleyball.m_Smok2_R=[];
c_Game_Volleyball.m_Smok2_A=[];
c_Game_Volleyball.m_Fire1_X=[];
c_Game_Volleyball.m_Fire1_Y=[];
c_Game_Volleyball.m_Fire1_R=[];
c_Game_Volleyball.m_Fire1_A=[];
c_Game_Volleyball.m_Fire2_X=[];
c_Game_Volleyball.m_Fire2_Y=[];
c_Game_Volleyball.m_Fire2_R=[];
c_Game_Volleyball.m_Fire2_A=[];
c_Game_Volleyball.m_NachFireSmok=function(){
	for(var t_C=0;t_C<=19;t_C=t_C+1){
		c_Game_Volleyball.m_Smok1_X[t_C]=(c_Game_Volleyball.m_X_NachF1)+bb_random_Rnd2(1.0,25.0);
		c_Game_Volleyball.m_Smok1_Y[t_C]=310.0-bb_random_Rnd2(1.0,360.0);
		c_Game_Volleyball.m_Smok1_R[t_C]=0.5;
		c_Game_Volleyball.m_Smok1_A[t_C]=1.0;
		c_Game_Volleyball.m_Smok2_X[t_C]=(c_Game_Volleyball.m_X_NachF2)+bb_random_Rnd2(1.0,25.0);
		c_Game_Volleyball.m_Smok2_Y[t_C]=310.0-bb_random_Rnd2(1.0,360.0);
		c_Game_Volleyball.m_Smok2_R[t_C]=0.5;
		c_Game_Volleyball.m_Smok2_A[t_C]=1.0;
	}
	for(var t_C2=0;t_C2<=19;t_C2=t_C2+1){
		c_Game_Volleyball.m_Fire1_X[t_C2]=(c_Game_Volleyball.m_X_NachF1)+bb_random_Rnd2(1.0,25.0);
		c_Game_Volleyball.m_Fire1_Y[t_C2]=310.0-bb_random_Rnd2(1.0,160.0);
		c_Game_Volleyball.m_Fire1_R[t_C2]=0.6;
		c_Game_Volleyball.m_Fire1_A[t_C2]=1.0;
		c_Game_Volleyball.m_Fire2_X[t_C2]=(c_Game_Volleyball.m_X_NachF2)+bb_random_Rnd2(1.0,25.0);
		c_Game_Volleyball.m_Fire2_Y[t_C2]=310.0-bb_random_Rnd2(1.0,160.0);
		c_Game_Volleyball.m_Fire2_R[t_C2]=0.6;
		c_Game_Volleyball.m_Fire2_A[t_C2]=1.0;
	}
	return 0;
}
c_Game_Volleyball.m_Rekord_Player=[];
c_Game_Volleyball.m_Rekord_Bot=[];
c_Game_Volleyball.m_Atlas_Image1=null;
c_Game_Volleyball.m_Atlas_Image2=null;
c_Game_Volleyball.m_Atlas_Image3=null;
c_Game_Volleyball.m_Atlas_Image4=null;
c_Game_Volleyball.m_Atlas_Image5=null;
c_Game_Volleyball.m_Atlas_Image6=null;
c_Game_Volleyball.m_Atlas_Image7=null;
c_Game_Volleyball.m_Im_Zastavka=null;
c_Game_Volleyball.m_Im_Loading=null;
c_Game_Volleyball.m_Im_EkNast=null;
c_Game_Volleyball.m_Im_Play=null;
c_Game_Volleyball.m_Im_Settings=null;
c_Game_Volleyball.m_Im_Help=null;
c_Game_Volleyball.m_Im_Cifra1=[];
c_Game_Volleyball.m_ImT_Off=null;
c_Game_Volleyball.m_ImT_On=null;
c_Game_Volleyball.m_ImT_5=null;
c_Game_Volleyball.m_ImT_10=null;
c_Game_Volleyball.m_ImT_15=null;
c_Game_Volleyball.m_ImT_20=null;
c_Game_Volleyball.m_ImT_25=null;
c_Game_Volleyball.m_ImT_Easy=null;
c_Game_Volleyball.m_ImT_Medium=null;
c_Game_Volleyball.m_ImT_Hard=null;
c_Game_Volleyball.m_ImT_Slider=null;
c_Game_Volleyball.m_ImT_Arrows=null;
c_Game_Volleyball.m_ImT_Accelerometer=null;
c_Game_Volleyball.m_ImT_Left=null;
c_Game_Volleyball.m_ImT_Right=null;
c_Game_Volleyball.m_ImT_2Play=null;
c_Game_Volleyball.m_Im_Ind1=null;
c_Game_Volleyball.m_Im_Ind2=null;
c_Game_Volleyball.m_Im_Ind3=null;
c_Game_Volleyball.m_Im_Cifra2=[];
c_Game_Volleyball.m_Im_DT=null;
c_Game_Volleyball.m_ImT_15s=null;
c_Game_Volleyball.m_ImT_30s=null;
c_Game_Volleyball.m_ImT_45s=null;
c_Game_Volleyball.m_ImT_60s=null;
c_Game_Volleyball.m_ImT_75s=null;
c_Game_Volleyball.m_ImT_90s=null;
c_Game_Volleyball.m_ImT_Ruin=null;
c_Game_Volleyball.m_ImT_Space=null;
c_Game_Volleyball.m_ImT_Mountain=null;
c_Game_Volleyball.m_Im_Fon=null;
c_Game_Volleyball.m_Im_Nebo=null;
c_Game_Volleyball.m_Im_EkHelp=null;
c_Game_Volleyball.m_Im_UkB=null;
c_Game_Volleyball.m_Im_RobL=[];
c_Game_Volleyball.m_Im_RobP=[];
c_Game_Volleyball.m_Im_Quit=null;
c_Game_Volleyball.m_Im_Tap=null;
c_Game_Volleyball.m_Im_More_Games=null;
c_Game_Volleyball.m_Im_Bomb=[];
c_Game_Volleyball.m_Im_BombL=[];
c_Game_Volleyball.m_Im_Lost=null;
c_Game_Volleyball.m_Im_Won=null;
c_Game_Volleyball.m_Im_Draw=null;
c_Game_Volleyball.m_Im_Fire=null;
c_Game_Volleyball.m_Im_Smok=null;
c_Game_Volleyball.m_Im_RobT=null;
c_Game_Volleyball.m_Im_BombT=null;
c_Game_Volleyball.m_Im_Vzriv=[];
c_Game_Volleyball.m_Im_Vvzriv=null;
c_Game_Volleyball.m_Im_Setka=[];
c_Game_Volleyball.m_Im_Razriad=null;
c_Game_Volleyball.m_Im_Fon_Space=null;
c_Game_Volleyball.m_Im_Fon_Gora=null;
c_Game_Volleyball.m_Zv_Click=null;
c_Game_Volleyball.m_Zv_Udar=null;
c_Game_Volleyball.m_Zv_Bomb=null;
c_Game_Volleyball.m_Zv_Razriad=null;
c_Game_Volleyball.m_Zv_Otskok=null;
c_Game_Volleyball.m_Kol_Bomb=0;
c_Game_Volleyball.m_Slojno=0;
c_Game_Volleyball.m_Nach_TB=0;
c_Game_Volleyball.m_Poz_Player=0;
c_Game_Volleyball.m_Flag_Sound=0;
c_Game_Volleyball.m_Flag_Music=0;
c_Game_Volleyball.m_Flag_Fon=0;
c_Game_Volleyball.m_Dlina=function(t_St,t_Dl){
	var t_StD="";
	t_StD=String(t_St);
	while(t_StD.length<t_Dl){
		t_StD="0"+t_StD;
	}
	return t_StD;
}
c_Game_Volleyball.m_SaveDan=function(){
	var t_StrokaDan="";
	t_StrokaDan=t_StrokaDan+c_Game_Volleyball.m_Dlina(c_Game_Volleyball.m_Kol_Bomb,2);
	t_StrokaDan=t_StrokaDan+c_Game_Volleyball.m_Dlina(c_Game_Volleyball.m_Slojno,1);
	t_StrokaDan=t_StrokaDan+c_Game_Volleyball.m_Dlina(c_Game_Volleyball.m_Nach_TB,2);
	t_StrokaDan=t_StrokaDan+c_Game_Volleyball.m_Dlina(c_Game_Volleyball.m_Poz_Player,1);
	t_StrokaDan=t_StrokaDan+c_Game_Volleyball.m_Dlina(c_Game_Volleyball.m_Flag_Sound,1);
	t_StrokaDan=t_StrokaDan+c_Game_Volleyball.m_Dlina(c_Game_Volleyball.m_Flag_Music,1);
	t_StrokaDan=t_StrokaDan+c_Game_Volleyball.m_Dlina(c_Game_Volleyball.m_Flag_Fon,1);
	bb_app_SaveState(t_StrokaDan);
	return 0;
}
c_Game_Volleyball.m_SaveNachDan=function(){
	c_Game_Volleyball.m_Kol_Bomb=5;
	c_Game_Volleyball.m_Slojno=1;
	c_Game_Volleyball.m_Nach_TB=60;
	c_Game_Volleyball.m_Poz_Player=1;
	c_Game_Volleyball.m_Flag_Sound=0;
	c_Game_Volleyball.m_Flag_Music=0;
	c_Game_Volleyball.m_Flag_Fon=0;
	c_Game_Volleyball.m_SaveDan();
	return 0;
}
c_Game_Volleyball.m_LoadDan=function(){
	var t_StrokaDan=bb_app_LoadState();
	if(t_StrokaDan=="" || t_StrokaDan.length>15){
		c_Game_Volleyball.m_SaveNachDan();
	}else{
		c_Game_Volleyball.m_Kol_Bomb=parseInt((bb_functions_Mid(t_StrokaDan,1,2)),10);
		c_Game_Volleyball.m_Slojno=parseInt((bb_functions_Mid(t_StrokaDan,3,1)),10);
		c_Game_Volleyball.m_Nach_TB=parseInt((bb_functions_Mid(t_StrokaDan,4,2)),10);
		c_Game_Volleyball.m_Poz_Player=parseInt((bb_functions_Mid(t_StrokaDan,6,1)),10);
		c_Game_Volleyball.m_Flag_Sound=parseInt((bb_functions_Mid(t_StrokaDan,7,1)),10);
		c_Game_Volleyball.m_Flag_Music=parseInt((bb_functions_Mid(t_StrokaDan,8,1)),10);
		c_Game_Volleyball.m_Flag_Fon=parseInt((bb_functions_Mid(t_StrokaDan,9,1)),10);
		if(c_Game_Volleyball.m_Nach_TB==0){
			c_Game_Volleyball.m_Nach_TB=60;
			c_Game_Volleyball.m_SaveDan();
		}
	}
	return 0;
}
c_Game_Volleyball.prototype.p_OnCreate=function(){
	bb_app_SetUpdateRate(40);
	c_Game_Volleyball.m_RX_Ekr=(bb_app_DeviceWidth())/800.0;
	c_Game_Volleyball.m_RY_Ekr=(bb_app_DeviceHeight())/480.0;
	bb_random_Seed=diddy.systemMillisecs();
	c_Game_Volleyball.m_Flag_End=0;
	c_Game_Volleyball.m_MassaRL=5000.0;
	c_Game_Volleyball.m_MassaRP=5000.0;
	c_Game_Volleyball.m_MassaB=150.0;
	c_Game_Volleyball.m_SV_Bomb=1;
	c_Game_Volleyball.m_Grav=0.0;
	c_Game_Volleyball.m_Y_Ekran=-420;
	c_Game_Volleyball.m_NachFireSmok();
	for(var t_C=1;t_C<=15;t_C=t_C+1){
		c_Game_Volleyball.m_Rekord_Player[t_C]=t_C;
		c_Game_Volleyball.m_Rekord_Bot[t_C]=t_C*2;
	}
	c_Game_Volleyball.m_Atlas_Image1=bb_graphics_LoadImage("Image1.png",1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Atlas_Image2=bb_graphics_LoadImage("Image2.png",1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Atlas_Image3=bb_graphics_LoadImage("Image3.png",1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Atlas_Image4=bb_graphics_LoadImage("Image4.png",1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Atlas_Image5=bb_graphics_LoadImage("Image5.png",1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Atlas_Image6=bb_graphics_LoadImage("Image6.png",1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Atlas_Image7=bb_graphics_LoadImage("Image7.png",1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Zastavka=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(1,1,800,480,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Loading=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,1,220,35,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_EkNast=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(1,482,800,415,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Play=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(1,898,186,52,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Settings=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(188,898,318,56,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Help=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(507,898,187,52,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[0]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[1]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(816,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[2]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(830,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[3]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(844,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[4]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(858,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[5]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(872,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[6]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(886,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[7]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(900,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[8]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(914,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra1[9]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(928,37,13,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Off=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(942,37,38,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_On=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(981,37,38,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_5=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,57,11,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_10=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(814,57,26,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_15=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(841,57,26,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_20=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(868,57,26,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_25=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(895,57,26,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Easy=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,77,53,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Medium=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(856,77,90,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Hard=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(947,77,55,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Slider=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,97,79,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Arrows=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(882,97,88,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Accelerometer=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,117,179,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Left=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,137,50,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Right=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(853,137,71,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_2Play=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,157,115,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Ind1=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(1,955,380,41,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Ind2=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(382,955,380,41,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Ind3=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(763,955,80,52,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[0]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(695,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[1]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(721,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[2]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(747,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[3]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(773,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[4]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(799,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[5]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(825,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[6]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(851,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[7]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(877,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[8]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(903,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Cifra2[9]=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(929,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_DT=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(955,898,25,36,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_15s=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,177,26,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_30s=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(829,177,26,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_45s=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(856,177,27,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_60s=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(884,177,26,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_75s=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(911,177,26,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_90s=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(938,177,26,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Ruin=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,197,55,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Space=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,217,68,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_ImT_Mountain=c_Game_Volleyball.m_Atlas_Image1.p_GrabImage(802,237,118,19,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Fon=c_Game_Volleyball.m_Atlas_Image2.p_GrabImage(1,1,800,354,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Nebo=c_Game_Volleyball.m_Atlas_Image2.p_GrabImage(1,356,800,300,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_EkHelp=c_Game_Volleyball.m_Atlas_Image2.p_GrabImage(1,657,714,366,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_UkB=c_Game_Volleyball.m_Atlas_Image2.p_GrabImage(802,363,29,24,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_UkB.p_SetHandle(15.0,0.0);
	c_Game_Volleyball.m_Im_RobL[0]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(1,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[0].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[1]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(101,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[1].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[2]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(201,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[2].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[3]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(301,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[3].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[4]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(401,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[4].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[5]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(501,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[5].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[6]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(601,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[6].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[7]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(701,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[7].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[8]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(801,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[8].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[9]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(901,1,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[9].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[10]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(1,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[10].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobL[11]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(101,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobL[11].p_SetHandle(49.0,46.0);
	c_Game_Volleyball.m_Im_RobP[0]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(201,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[0].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[1]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(301,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[1].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[2]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(401,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[2].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[3]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(501,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[3].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[4]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(601,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[4].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[5]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(701,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[5].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[6]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(801,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[6].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[7]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(901,135,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[7].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[8]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(1,269,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[8].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[9]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(101,269,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[9].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[10]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(201,269,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[10].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_RobP[11]=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(301,269,99,133,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobP[11].p_SetHandle(51.0,46.0);
	c_Game_Volleyball.m_Im_Quit=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(401,269,400,155,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Tap=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(1,425,474,42,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_More_Games=c_Game_Volleyball.m_Atlas_Image3.p_GrabImage(1,649,350,112,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Bomb[0]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(1,1,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Bomb[0].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_Bomb[1]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(96,1,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Bomb[1].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_Bomb[2]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(191,1,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Bomb[2].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_Bomb[3]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(286,1,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Bomb[3].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_Bomb[4]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(381,1,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Bomb[4].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[0]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(1,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[0].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[1]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(96,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[1].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[2]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(191,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[2].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[3]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(286,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[3].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[4]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(381,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[4].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[5]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(476,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[5].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[6]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(571,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[6].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[7]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(666,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[7].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[8]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(761,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[8].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[9]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(856,96,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[9].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[10]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(1,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[10].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[11]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(96,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[11].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[12]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(191,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[12].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[13]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(286,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[13].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[14]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(381,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[14].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[15]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(476,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[15].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[16]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(571,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[16].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[17]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(666,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[17].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[18]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(761,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[18].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[19]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(856,191,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[19].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[20]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(1,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[20].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[21]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(96,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[21].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[22]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(191,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[22].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[23]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(286,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[23].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[24]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(381,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[24].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[25]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(476,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[25].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[26]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(571,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[26].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[27]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(666,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[27].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[28]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(761,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[28].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[29]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(856,286,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[29].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[30]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(1,381,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[30].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[31]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(96,381,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[31].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[32]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(191,381,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[32].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[33]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(286,381,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[33].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[34]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(381,381,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[34].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_BombL[35]=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(476,381,94,94,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombL[35].p_SetHandle(47.0,47.0);
	c_Game_Volleyball.m_Im_Lost=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(571,441,437,59,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Won=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(571,381,444,59,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Draw=c_Game_Volleyball.m_Atlas_Image4.p_GrabImage(476,1,285,58,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Fire=c_Game_Volleyball.m_Atlas_Image5.p_GrabImage(1,1,64,64,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Fire.p_SetHandle(32.0,32.0);
	c_Game_Volleyball.m_Im_Smok=c_Game_Volleyball.m_Atlas_Image5.p_GrabImage(66,1,128,128,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Smok.p_SetHandle(64.0,64.0);
	c_Game_Volleyball.m_Im_RobT=c_Game_Volleyball.m_Atlas_Image5.p_GrabImage(1,130,96,22,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_RobT.p_SetHandle(48.0,11.0);
	c_Game_Volleyball.m_Im_BombT=c_Game_Volleyball.m_Atlas_Image5.p_GrabImage(98,130,66,17,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_BombT.p_SetHandle(33.0,9.0);
	c_Game_Volleyball.m_Im_Vzriv[0]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(130,1,80,80,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Vzriv[0].p_SetHandle(40.0,40.0);
	c_Game_Volleyball.m_Im_Vzriv[1]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(211,1,80,80,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Vzriv[1].p_SetHandle(40.0,40.0);
	c_Game_Volleyball.m_Im_Vzriv[2]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(292,1,80,80,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Vzriv[2].p_SetHandle(40.0,40.0);
	c_Game_Volleyball.m_Im_Vvzriv=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(1,1,128,128,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Vvzriv.p_SetHandle(64.0,64.0);
	c_Game_Volleyball.m_Im_Setka[0]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(1,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Setka[1]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(34,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Setka[2]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(67,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Setka[3]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(100,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Setka[4]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(133,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Setka[5]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(166,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Setka[6]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(199,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Setka[7]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(232,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Setka[8]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(265,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Setka[9]=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(298,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Razriad=c_Game_Volleyball.m_Atlas_Image6.p_GrabImage(331,130,32,179,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Fon_Space=c_Game_Volleyball.m_Atlas_Image7.p_GrabImage(1,1,800,480,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Im_Fon_Gora=c_Game_Volleyball.m_Atlas_Image7.p_GrabImage(1,482,800,480,1,c_Image.m_DefaultFlags);
	c_Game_Volleyball.m_Zv_Click=bb_audio_LoadSound("Click.wav");
	c_Game_Volleyball.m_Zv_Udar=bb_audio_LoadSound("Udar.wav");
	c_Game_Volleyball.m_Zv_Bomb=bb_audio_LoadSound("Bomb.wav");
	c_Game_Volleyball.m_Zv_Razriad=bb_audio_LoadSound("Razriad.wav");
	c_Game_Volleyball.m_Zv_Otskok=bb_audio_LoadSound("Otskok.wav");
	c_Game_Volleyball.m_LoadDan();
	return 0;
}
c_Game_Volleyball.m_Regim=0;
c_Game_Volleyball.m_Progrev_On=0;
c_Game_Volleyball.m_Proz_Screen=0;
c_Game_Volleyball.m_Update_Zastavka=function(){
	c_Game_Volleyball.m_Progrev_On=c_Game_Volleyball.m_Progrev_On+1;
	if(c_Game_Volleyball.m_Progrev_On==20){
		c_Game_Volleyball.m_Progrev_On=0;
		c_Game_Volleyball.m_Regim=1;
		c_Game_Volleyball.m_Proz_Screen=1.0;
		if(c_Game_Volleyball.m_Flag_Music==1){
			bb_audio_PlayMusic("Music.wav",1);
		}
	}
	for(var t_C=0;t_C<=19;t_C=t_C+1){
		if(c_Game_Volleyball.m_Fire1_Y[t_C]<=150.0){
			c_Game_Volleyball.m_Fire1_X[t_C]=160.0+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Fire1_Y[t_C]=310.0+bb_random_Rnd2(1.0,10.0);
			c_Game_Volleyball.m_Fire1_R[t_C]=0.6;
			c_Game_Volleyball.m_Fire1_A[t_C]=1.0;
		}else{
			c_Game_Volleyball.m_Fire1_Y[t_C]=c_Game_Volleyball.m_Fire1_Y[t_C]-(bb_math_Abs2(c_Game_Volleyball.m_Fire1_Y[t_C])+100.0)/100.0;
			c_Game_Volleyball.m_Fire1_R[t_C]=c_Game_Volleyball.m_Fire1_R[t_C]-0.005;
			c_Game_Volleyball.m_Fire1_A[t_C]=c_Game_Volleyball.m_Fire1_A[t_C]-0.02;
			if(c_Game_Volleyball.m_Fire1_A[t_C]<0.0){
				c_Game_Volleyball.m_Fire1_A[t_C]=0.0;
			}
		}
		if(c_Game_Volleyball.m_Fire2_Y[t_C]<=150.0){
			c_Game_Volleyball.m_Fire2_X[t_C]=490.0+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Fire2_Y[t_C]=310.0+bb_random_Rnd2(1.0,10.0);
			c_Game_Volleyball.m_Fire2_R[t_C]=0.6;
			c_Game_Volleyball.m_Fire2_A[t_C]=1.0;
		}else{
			c_Game_Volleyball.m_Fire2_Y[t_C]=c_Game_Volleyball.m_Fire2_Y[t_C]-(bb_math_Abs2(c_Game_Volleyball.m_Fire2_Y[t_C])+100.0)/100.0;
			c_Game_Volleyball.m_Fire2_R[t_C]=c_Game_Volleyball.m_Fire2_R[t_C]-0.005;
			c_Game_Volleyball.m_Fire2_A[t_C]=c_Game_Volleyball.m_Fire2_A[t_C]-0.02;
			if(c_Game_Volleyball.m_Fire2_A[t_C]<0.0){
				c_Game_Volleyball.m_Fire2_A[t_C]=0.0;
			}
		}
	}
	for(var t_C2=0;t_C2<=19;t_C2=t_C2+1){
		if(c_Game_Volleyball.m_Smok1_Y[t_C2]<=-50.0){
			c_Game_Volleyball.m_Smok1_X[t_C2]=160.0+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Smok1_Y[t_C2]=310.0-bb_random_Rnd2(1.0,20.0);
			c_Game_Volleyball.m_Smok1_R[t_C2]=0.5;
			c_Game_Volleyball.m_Smok1_A[t_C2]=1.0;
		}
		c_Game_Volleyball.m_Smok1_Y[t_C2]=c_Game_Volleyball.m_Smok1_Y[t_C2]-150.0/bb_random_Rnd2(80.0,100.0);
		c_Game_Volleyball.m_Smok1_X[t_C2]=c_Game_Volleyball.m_Smok1_X[t_C2]+bb_random_Rnd2(-5.0,5.0)/5.0;
		c_Game_Volleyball.m_Smok1_R[t_C2]=c_Game_Volleyball.m_Smok1_R[t_C2]+0.003;
		if(c_Game_Volleyball.m_Smok1_A[t_C2]>0.0){
			c_Game_Volleyball.m_Smok1_A[t_C2]=c_Game_Volleyball.m_Smok1_A[t_C2]-0.002;
		}
		if(c_Game_Volleyball.m_Smok2_Y[t_C2]<=-50.0){
			c_Game_Volleyball.m_Smok2_X[t_C2]=490.0+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Smok2_Y[t_C2]=310.0-bb_random_Rnd2(1.0,20.0);
			c_Game_Volleyball.m_Smok2_R[t_C2]=0.5;
			c_Game_Volleyball.m_Smok2_A[t_C2]=1.0;
		}
		c_Game_Volleyball.m_Smok2_Y[t_C2]=c_Game_Volleyball.m_Smok2_Y[t_C2]-150.0/bb_random_Rnd2(80.0,100.0);
		c_Game_Volleyball.m_Smok2_X[t_C2]=c_Game_Volleyball.m_Smok2_X[t_C2]+bb_random_Rnd2(-5.0,5.0)/5.0;
		c_Game_Volleyball.m_Smok2_R[t_C2]=c_Game_Volleyball.m_Smok2_R[t_C2]+0.003;
		if(c_Game_Volleyball.m_Smok2_A[t_C2]>0.0){
			c_Game_Volleyball.m_Smok2_A[t_C2]=c_Game_Volleyball.m_Smok2_A[t_C2]-0.002;
		}
	}
	return 0;
}
c_Game_Volleyball.m_Flag_Help=0;
c_Game_Volleyball.m_X_Bomb=0;
c_Game_Volleyball.m_Update_GlMeny=function(){
	if(c_Game_Volleyball.m_Y_Ekran>-420){
		c_Game_Volleyball.m_Y_Ekran=c_Game_Volleyball.m_Y_Ekran-20;
		if(c_Game_Volleyball.m_Y_Ekran<=-400){
			c_Game_Volleyball.m_Flag_Help=0;
		}
		if(c_Game_Volleyball.m_Y_Ekran<-420){
			c_Game_Volleyball.m_Y_Ekran=-420;
		}
	}else{
		var t_3=c_Game_Volleyball.m_Flag_End;
		if(t_3==0){
			for(var t_Co=0;t_Co<=10;t_Co=t_Co+1){
				if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>240.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<560.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>160.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<237.0*c_Game_Volleyball.m_RY_Ekr){
					if(c_Game_Volleyball.m_Flag_Sound==1){
						bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
					}
					c_Game_Volleyball.m_Proz_Screen=1.0;
					c_Game_Volleyball.m_X_Bomb=0.0;
					c_Game_Volleyball.m_Regim=4;
				}
				if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>240.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<560.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>237.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<312.0*c_Game_Volleyball.m_RY_Ekr){
					if(c_Game_Volleyball.m_Flag_Sound==1){
						bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
					}
					c_Game_Volleyball.m_Y_Ekran=-420;
					c_Game_Volleyball.m_Regim=2;
				}
				if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>240.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<560.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>312.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<385.0*c_Game_Volleyball.m_RY_Ekr){
					if(c_Game_Volleyball.m_Flag_Sound==1){
						bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
					}
					c_Game_Volleyball.m_Y_Ekran=-420;
					c_Game_Volleyball.m_Flag_Help=1;
					c_Game_Volleyball.m_Regim=3;
				}
			}
		}else{
			if(t_3==1){
				for(var t_Co2=0;t_Co2<=10;t_Co2=t_Co2+1){
					if(bb_input_TouchHit(t_Co2)==1 && bb_input_TouchX(t_Co2)>100.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co2)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co2)>100.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co2)<230.0*c_Game_Volleyball.m_RY_Ekr){
						if(c_Game_Volleyball.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
						}
						error("");
					}
					if(bb_input_TouchHit(t_Co2)==1 && bb_input_TouchX(t_Co2)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co2)<700.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co2)>100.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co2)<230.0*c_Game_Volleyball.m_RY_Ekr){
						if(c_Game_Volleyball.m_Flag_Sound==1){
							bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
						}
						c_Game_Volleyball.m_Flag_End=0;
					}
				}
			}
		}
	}
	return 0;
}
c_Game_Volleyball.m_Update_Settings=function(){
	if(c_Game_Volleyball.m_Y_Ekran<0){
		c_Game_Volleyball.m_Y_Ekran=c_Game_Volleyball.m_Y_Ekran+20;
		if(c_Game_Volleyball.m_Y_Ekran>0){
			c_Game_Volleyball.m_Y_Ekran=0;
		}
	}else{
		for(var t_Co=0;t_Co<=10;t_Co=t_Co+1){
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>73.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<152.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>128.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<180.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Kol_Bomb=5;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>152.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<218.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>128.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<180.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Kol_Bomb=10;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>218.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<284.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>128.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<180.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Kol_Bomb=15;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>284.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<353.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>128.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<180.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Kol_Bomb=20;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>353.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<433.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>128.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<180.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Kol_Bomb=25;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>468.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<549.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>128.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<180.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Slojno=1;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>549.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<666.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>128.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<180.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Slojno=2;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>666.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<746.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>128.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<180.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Slojno=3;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>80.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<140.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>203.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<253.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Nach_TB=15;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>140.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<196.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>203.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<253.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Nach_TB=30;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>196.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<252.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>203.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<253.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Nach_TB=45;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>252.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<310.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>203.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<253.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Nach_TB=60;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>310.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<365.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>203.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<253.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Nach_TB=75;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>365.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<425.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>203.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<253.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Nach_TB=90;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>500.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<598.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>203.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<253.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Poz_Player=1;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>598.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<715.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>203.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<253.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Poz_Player=2;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>120.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<210.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>278.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<330.0*c_Game_Volleyball.m_RY_Ekr){
				var t_11=c_Game_Volleyball.m_Flag_Sound;
				if(t_11==0){
					c_Game_Volleyball.m_Flag_Sound=1;
				}else{
					if(t_11==1){
						c_Game_Volleyball.m_Flag_Sound=0;
					}
				}
				bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,0,0);
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>295.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<380.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>278.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<330.0*c_Game_Volleyball.m_RY_Ekr){
				var t_12=c_Game_Volleyball.m_Flag_Music;
				if(t_12==0){
					c_Game_Volleyball.m_Flag_Music=1;
					bb_audio_PlayMusic("Music.wav",1);
				}else{
					if(t_12==1){
						c_Game_Volleyball.m_Flag_Music=0;
						bb_audio_StopMusic();
					}
				}
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>450.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<536.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>278.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<330.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Flag_Fon=0;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>536.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<620.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>278.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<330.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Flag_Fon=1;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>620.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<755.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>278.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<330.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Flag_Fon=2;
				c_Game_Volleyball.m_SaveDan();
			}
			if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>320.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<475.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>335.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<393.0*c_Game_Volleyball.m_RY_Ekr){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
				}
				c_Game_Volleyball.m_Regim=1;
			}
		}
		if((bb_input_KeyHit(27))!=0){
			if(c_Game_Volleyball.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
			}
			c_Game_Volleyball.m_Regim=1;
		}
	}
	return 0;
}
c_Game_Volleyball.m_Update_Help=function(){
	if(c_Game_Volleyball.m_Y_Ekran<0){
		c_Game_Volleyball.m_Y_Ekran=c_Game_Volleyball.m_Y_Ekran+20;
		if(c_Game_Volleyball.m_Y_Ekran>0){
			c_Game_Volleyball.m_Y_Ekran=0;
		}
	}else{
		if((bb_input_KeyHit(27))!=0){
			if(c_Game_Volleyball.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
			}
			c_Game_Volleyball.m_Regim=1;
		}
	}
	return 0;
}
c_Game_Volleyball.m_Anim_DRL=0;
c_Game_Volleyball.m_Anim_PRL=0;
c_Game_Volleyball.m_Frame_RL=0;
c_Game_Volleyball.m_X_RL=0;
c_Game_Volleyball.m_Y_RL=0;
c_Game_Volleyball.m_Sm_XRL=0;
c_Game_Volleyball.m_Sm_YRL=0;
c_Game_Volleyball.m_U_RL=0;
c_Game_Volleyball.m_Anim_PRP=0;
c_Game_Volleyball.m_Anim_DRP=0;
c_Game_Volleyball.m_Frame_RP=0;
c_Game_Volleyball.m_X_RP=0;
c_Game_Volleyball.m_Y_RP=0;
c_Game_Volleyball.m_Sm_XRP=0;
c_Game_Volleyball.m_Sm_YRP=0;
c_Game_Volleyball.m_U_RP=0;
c_Game_Volleyball.m_Kol_UL=0;
c_Game_Volleyball.m_Kol_UP=0;
c_Game_Volleyball.m_Anim_Bomb=0;
c_Game_Volleyball.m_Frame_Bomb=0;
c_Game_Volleyball.m_Sm_XB=0;
c_Game_Volleyball.m_Sm_YB=0;
c_Game_Volleyball.m_Y_Bomb=0;
c_Game_Volleyball.m_Arsenal=0;
c_Game_Volleyball.m_Zad_Sek=0;
c_Game_Volleyball.m_Timer_B=0;
c_Game_Volleyball.m_TRez_P=0;
c_Game_Volleyball.m_TRez_B=0;
c_Game_Volleyball.m_Rez_LI=0;
c_Game_Volleyball.m_Rez_PI=0;
c_Game_Volleyball.m_Nach_DV=0;
c_Game_Volleyball.m_Max_SK=0;
c_Game_Volleyball.m_Flag_Game=0;
c_Game_Volleyball.m_Update_NachGame=function(){
	c_Game_Volleyball.m_Proz_Screen=c_Game_Volleyball.m_Proz_Screen-0.03;
	c_Game_Volleyball.m_Anim_DRL=0;
	c_Game_Volleyball.m_Anim_PRL=0;
	c_Game_Volleyball.m_Frame_RL=0;
	c_Game_Volleyball.m_X_RL=200.0;
	c_Game_Volleyball.m_Y_RL=309.0;
	c_Game_Volleyball.m_Sm_XRL=0.0;
	c_Game_Volleyball.m_Sm_YRL=0.0;
	c_Game_Volleyball.m_U_RL=0;
	c_Game_Volleyball.m_Anim_PRP=0;
	c_Game_Volleyball.m_Anim_DRP=0;
	c_Game_Volleyball.m_Frame_RP=0;
	c_Game_Volleyball.m_X_RP=600.0;
	c_Game_Volleyball.m_Y_RP=309.0;
	c_Game_Volleyball.m_Sm_XRP=0.0;
	c_Game_Volleyball.m_Sm_YRP=0.0;
	c_Game_Volleyball.m_U_RP=0;
	c_Game_Volleyball.m_Kol_UL=0;
	c_Game_Volleyball.m_Kol_UP=0;
	c_Game_Volleyball.m_Grav=0.0;
	c_Game_Volleyball.m_Anim_Bomb=0;
	c_Game_Volleyball.m_Frame_Bomb=0;
	c_Game_Volleyball.m_Sm_XB=0.0;
	c_Game_Volleyball.m_Sm_YB=0.0;
	if(c_Game_Volleyball.m_Poz_Player==1){
		c_Game_Volleyball.m_X_Bomb=200.0;
	}
	if(c_Game_Volleyball.m_Poz_Player==2){
		c_Game_Volleyball.m_X_Bomb=600.0;
	}
	if(c_Game_Volleyball.m_Poz_Player==3 && c_Game_Volleyball.m_X_Bomb<200.0){
		var t_PBo=((bb_random_Rnd2(1.0,3.0))|0);
		if(t_PBo==1){
			c_Game_Volleyball.m_X_Bomb=200.0;
		}else{
			c_Game_Volleyball.m_X_Bomb=600.0;
		}
	}
	c_Game_Volleyball.m_Y_Bomb=220.0;
	c_Game_Volleyball.m_Arsenal=c_Game_Volleyball.m_Kol_Bomb;
	c_Game_Volleyball.m_Zad_Sek=40;
	c_Game_Volleyball.m_Timer_B=c_Game_Volleyball.m_Nach_TB;
	c_Game_Volleyball.m_TRez_P=0;
	c_Game_Volleyball.m_TRez_B=0;
	c_Game_Volleyball.m_Rez_LI=0;
	c_Game_Volleyball.m_Rez_PI=0;
	var t_20=c_Game_Volleyball.m_Slojno;
	if(t_20==1){
		c_Game_Volleyball.m_Nach_DV=90;
		c_Game_Volleyball.m_Max_SK=5;
	}else{
		if(t_20==2){
			c_Game_Volleyball.m_Nach_DV=80;
			c_Game_Volleyball.m_Max_SK=6;
		}else{
			if(t_20==3){
				c_Game_Volleyball.m_Nach_DV=40;
				c_Game_Volleyball.m_Max_SK=8;
			}
		}
	}
	if(c_Game_Volleyball.m_Proz_Screen<=0.0){
		c_Game_Volleyball.m_Proz_Screen=0.0;
		c_Game_Volleyball.m_Regim=5;
		c_Game_Volleyball.m_Flag_Game=0;
	}
	c_Game_Volleyball.m_X_NachF1=((bb_random_Rnd2(100.0,300.0))|0);
	c_Game_Volleyball.m_X_NachF2=((bb_random_Rnd2(500.0,700.0))|0);
	for(var t_C=0;t_C<=19;t_C=t_C+1){
		if(c_Game_Volleyball.m_Fire1_Y[t_C]<=150.0){
			c_Game_Volleyball.m_Fire1_X[t_C]=(c_Game_Volleyball.m_X_NachF1)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Fire1_Y[t_C]=310.0+bb_random_Rnd2(1.0,10.0);
			c_Game_Volleyball.m_Fire1_R[t_C]=0.6;
			c_Game_Volleyball.m_Fire1_A[t_C]=1.0;
		}else{
			c_Game_Volleyball.m_Fire1_Y[t_C]=c_Game_Volleyball.m_Fire1_Y[t_C]-(bb_math_Abs2(c_Game_Volleyball.m_Fire1_Y[t_C])+100.0)/100.0;
			c_Game_Volleyball.m_Fire1_R[t_C]=c_Game_Volleyball.m_Fire1_R[t_C]-0.005;
			c_Game_Volleyball.m_Fire1_A[t_C]=c_Game_Volleyball.m_Fire1_A[t_C]-0.02;
			if(c_Game_Volleyball.m_Fire1_A[t_C]<0.0){
				c_Game_Volleyball.m_Fire1_A[t_C]=0.0;
			}
		}
		if(c_Game_Volleyball.m_Fire2_Y[t_C]<=150.0){
			c_Game_Volleyball.m_Fire2_X[t_C]=(c_Game_Volleyball.m_X_NachF2)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Fire2_Y[t_C]=310.0+bb_random_Rnd2(1.0,10.0);
			c_Game_Volleyball.m_Fire2_R[t_C]=0.6;
			c_Game_Volleyball.m_Fire2_A[t_C]=1.0;
		}else{
			c_Game_Volleyball.m_Fire2_Y[t_C]=c_Game_Volleyball.m_Fire2_Y[t_C]-(bb_math_Abs2(c_Game_Volleyball.m_Fire2_Y[t_C])+100.0)/100.0;
			c_Game_Volleyball.m_Fire2_R[t_C]=c_Game_Volleyball.m_Fire2_R[t_C]-0.005;
			c_Game_Volleyball.m_Fire2_A[t_C]=c_Game_Volleyball.m_Fire2_A[t_C]-0.02;
			if(c_Game_Volleyball.m_Fire2_A[t_C]<0.0){
				c_Game_Volleyball.m_Fire2_A[t_C]=0.0;
			}
		}
	}
	for(var t_C2=0;t_C2<=19;t_C2=t_C2+1){
		if(c_Game_Volleyball.m_Smok1_Y[t_C2]<=-50.0){
			c_Game_Volleyball.m_Smok1_X[t_C2]=(c_Game_Volleyball.m_X_NachF1)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Smok1_Y[t_C2]=310.0-bb_random_Rnd2(1.0,20.0);
			c_Game_Volleyball.m_Smok1_R[t_C2]=0.5;
			c_Game_Volleyball.m_Smok1_A[t_C2]=1.0;
		}
		c_Game_Volleyball.m_Smok1_Y[t_C2]=c_Game_Volleyball.m_Smok1_Y[t_C2]-150.0/bb_random_Rnd2(80.0,100.0);
		c_Game_Volleyball.m_Smok1_X[t_C2]=c_Game_Volleyball.m_Smok1_X[t_C2]+bb_random_Rnd2(-5.0,5.0)/5.0;
		c_Game_Volleyball.m_Smok1_R[t_C2]=c_Game_Volleyball.m_Smok1_R[t_C2]+0.003;
		if(c_Game_Volleyball.m_Smok1_A[t_C2]>0.0){
			c_Game_Volleyball.m_Smok1_A[t_C2]=c_Game_Volleyball.m_Smok1_A[t_C2]-0.002;
		}
		if(c_Game_Volleyball.m_Smok2_Y[t_C2]<=-50.0){
			c_Game_Volleyball.m_Smok2_X[t_C2]=(c_Game_Volleyball.m_X_NachF2)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Smok2_Y[t_C2]=310.0-bb_random_Rnd2(1.0,20.0);
			c_Game_Volleyball.m_Smok2_R[t_C2]=0.5;
			c_Game_Volleyball.m_Smok2_A[t_C2]=1.0;
		}
		c_Game_Volleyball.m_Smok2_Y[t_C2]=c_Game_Volleyball.m_Smok2_Y[t_C2]-150.0/bb_random_Rnd2(80.0,100.0);
		c_Game_Volleyball.m_Smok2_X[t_C2]=c_Game_Volleyball.m_Smok2_X[t_C2]+bb_random_Rnd2(-5.0,5.0)/5.0;
		c_Game_Volleyball.m_Smok2_R[t_C2]=c_Game_Volleyball.m_Smok2_R[t_C2]+0.003;
		if(c_Game_Volleyball.m_Smok2_A[t_C2]>0.0){
			c_Game_Volleyball.m_Smok2_A[t_C2]=c_Game_Volleyball.m_Smok2_A[t_C2]-0.002;
		}
	}
	return 0;
}
c_Game_Volleyball.m_Napr_Setka=0;
c_Game_Volleyball.m_Frame_Setka=0;
c_Game_Volleyball.m_Upravlenie=0;
c_Game_Volleyball.m_Zad_NachG=0;
c_Game_Volleyball.m_Flag_Vibro=0;
c_Game_Volleyball.m_Flag_Razriad=0;
c_Game_Volleyball.m_Alpha_IndL=0;
c_Game_Volleyball.m_Alpha_IndP=0;
c_Game_Volleyball.m_Vzriv_C=0;
c_Game_Volleyball.m_Vzriv_NC=[];
c_Game_Volleyball.m_Vzriv_X=[];
c_Game_Volleyball.m_Vzriv_Y=[];
c_Game_Volleyball.m_Vzriv_SmX=[];
c_Game_Volleyball.m_Vzriv_SmY=[];
c_Game_Volleyball.m_Vzriv_R=[];
c_Game_Volleyball.m_Vzriv_A=[];
c_Game_Volleyball.m_Vzriv_TU=[];
c_Game_Volleyball.m_Vzriv_UP=[];
c_Game_Volleyball.m_Nach_Vzriv=function(){
	c_Game_Volleyball.m_Vzriv_C=100;
	for(var t_N=0;t_N<=149;t_N=t_N+1){
		c_Game_Volleyball.m_Vzriv_NC[t_N]=bb_random_Rnd2(0.0,2.0);
		if(c_Game_Volleyball.m_Vzriv_NC[t_N]>1.0){
			c_Game_Volleyball.m_Vzriv_NC[t_N]=1.0;
		}
		c_Game_Volleyball.m_Vzriv_X[t_N]=c_Game_Volleyball.m_X_Bomb+(10.0-bb_random_Rnd2(0.0,20.0));
		c_Game_Volleyball.m_Vzriv_Y[t_N]=c_Game_Volleyball.m_Y_Bomb+(10.0-bb_random_Rnd2(0.0,20.0));
		var t_SmX=Math.cos((t_N*4)*D2R);
		var t_SmY=Math.sin((t_N*4)*D2R);
		var t_DobS=(bb_random_Rnd2(0.0,49.0)+1.0)/3.0;
		c_Game_Volleyball.m_Vzriv_SmX[t_N]=t_SmX*t_DobS;
		c_Game_Volleyball.m_Vzriv_SmY[t_N]=t_SmY*t_DobS;
		if(c_Game_Volleyball.m_Vzriv_NC[t_N]<2.0){
			c_Game_Volleyball.m_Vzriv_R[t_N]=0.5;
		}else{
			c_Game_Volleyball.m_Vzriv_R[t_N]=1.0;
		}
		c_Game_Volleyball.m_Vzriv_A[t_N]=1.0;
		c_Game_Volleyball.m_Vzriv_TU[t_N]=bb_random_Rnd2(0.0,360.0);
		c_Game_Volleyball.m_Vzriv_UP[t_N]=20.0-bb_random_Rnd2(0.0,40.0);
	}
	return 0;
}
c_Game_Volleyball.m_Raschet_Vzriv=function(){
	if(c_Game_Volleyball.m_Vzriv_C>0){
		for(var t_N=0;t_N<=149;t_N=t_N+1){
			c_Game_Volleyball.m_Vzriv_X[t_N]=c_Game_Volleyball.m_Vzriv_X[t_N]+c_Game_Volleyball.m_Vzriv_SmX[t_N];
			c_Game_Volleyball.m_Vzriv_Y[t_N]=c_Game_Volleyball.m_Vzriv_Y[t_N]+c_Game_Volleyball.m_Vzriv_SmY[t_N];
			c_Game_Volleyball.m_Vzriv_TU[t_N]=c_Game_Volleyball.m_Vzriv_TU[t_N]+c_Game_Volleyball.m_Vzriv_UP[t_N];
			if(c_Game_Volleyball.m_Vzriv_TU[t_N]>360.0){
				c_Game_Volleyball.m_Vzriv_TU[t_N]=c_Game_Volleyball.m_Vzriv_TU[t_N]-360.0;
			}
			if(c_Game_Volleyball.m_Vzriv_TU[t_N]<0.0){
				c_Game_Volleyball.m_Vzriv_TU[t_N]=360.0+c_Game_Volleyball.m_Vzriv_TU[t_N];
			}
			c_Game_Volleyball.m_Vzriv_SmY[t_N]=c_Game_Volleyball.m_Vzriv_SmY[t_N]+0.3;
			if(c_Game_Volleyball.m_Vzriv_NC[t_N]<2.0){
				if(c_Game_Volleyball.m_Vzriv_R[t_N]>0.0){
					c_Game_Volleyball.m_Vzriv_R[t_N]=c_Game_Volleyball.m_Vzriv_R[t_N]-0.003;
				}
				if(c_Game_Volleyball.m_Vzriv_A[t_N]>0.0){
					c_Game_Volleyball.m_Vzriv_A[t_N]=c_Game_Volleyball.m_Vzriv_A[t_N]-0.01;
				}
			}
		}
		c_Game_Volleyball.m_Vzriv_C=c_Game_Volleyball.m_Vzriv_C-1;
	}
	return 0;
}
c_Game_Volleyball.m_Update_Game=function(){
	for(var t_C=0;t_C<=19;t_C=t_C+1){
		if(c_Game_Volleyball.m_Fire1_Y[t_C]<=150.0){
			c_Game_Volleyball.m_Fire1_X[t_C]=(c_Game_Volleyball.m_X_NachF1)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Fire1_Y[t_C]=310.0+bb_random_Rnd2(1.0,10.0);
			c_Game_Volleyball.m_Fire1_R[t_C]=0.6;
			c_Game_Volleyball.m_Fire1_A[t_C]=1.0;
		}else{
			c_Game_Volleyball.m_Fire1_Y[t_C]=c_Game_Volleyball.m_Fire1_Y[t_C]-(bb_math_Abs2(c_Game_Volleyball.m_Fire1_Y[t_C])+100.0)/100.0;
			c_Game_Volleyball.m_Fire1_R[t_C]=c_Game_Volleyball.m_Fire1_R[t_C]-0.005;
			c_Game_Volleyball.m_Fire1_A[t_C]=c_Game_Volleyball.m_Fire1_A[t_C]-0.02;
			if(c_Game_Volleyball.m_Fire1_A[t_C]<0.0){
				c_Game_Volleyball.m_Fire1_A[t_C]=0.0;
			}
		}
		if(c_Game_Volleyball.m_Fire2_Y[t_C]<=150.0){
			c_Game_Volleyball.m_Fire2_X[t_C]=(c_Game_Volleyball.m_X_NachF2)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Fire2_Y[t_C]=310.0+bb_random_Rnd2(1.0,10.0);
			c_Game_Volleyball.m_Fire2_R[t_C]=0.6;
			c_Game_Volleyball.m_Fire2_A[t_C]=1.0;
		}else{
			c_Game_Volleyball.m_Fire2_Y[t_C]=c_Game_Volleyball.m_Fire2_Y[t_C]-(bb_math_Abs2(c_Game_Volleyball.m_Fire2_Y[t_C])+100.0)/100.0;
			c_Game_Volleyball.m_Fire2_R[t_C]=c_Game_Volleyball.m_Fire2_R[t_C]-0.005;
			c_Game_Volleyball.m_Fire2_A[t_C]=c_Game_Volleyball.m_Fire2_A[t_C]-0.02;
			if(c_Game_Volleyball.m_Fire2_A[t_C]<0.0){
				c_Game_Volleyball.m_Fire2_A[t_C]=0.0;
			}
		}
	}
	for(var t_C2=0;t_C2<=19;t_C2=t_C2+1){
		if(c_Game_Volleyball.m_Smok1_Y[t_C2]<=-50.0){
			c_Game_Volleyball.m_Smok1_X[t_C2]=(c_Game_Volleyball.m_X_NachF1)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Smok1_Y[t_C2]=310.0-bb_random_Rnd2(1.0,20.0);
			c_Game_Volleyball.m_Smok1_R[t_C2]=0.5;
			c_Game_Volleyball.m_Smok1_A[t_C2]=1.0;
		}
		c_Game_Volleyball.m_Smok1_Y[t_C2]=c_Game_Volleyball.m_Smok1_Y[t_C2]-150.0/bb_random_Rnd2(80.0,100.0);
		c_Game_Volleyball.m_Smok1_X[t_C2]=c_Game_Volleyball.m_Smok1_X[t_C2]+bb_random_Rnd2(-5.0,5.0)/5.0;
		c_Game_Volleyball.m_Smok1_R[t_C2]=c_Game_Volleyball.m_Smok1_R[t_C2]+0.003;
		if(c_Game_Volleyball.m_Smok1_A[t_C2]>0.0){
			c_Game_Volleyball.m_Smok1_A[t_C2]=c_Game_Volleyball.m_Smok1_A[t_C2]-0.002;
		}
		if(c_Game_Volleyball.m_Smok2_Y[t_C2]<=-50.0){
			c_Game_Volleyball.m_Smok2_X[t_C2]=(c_Game_Volleyball.m_X_NachF2)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Smok2_Y[t_C2]=310.0-bb_random_Rnd2(1.0,20.0);
			c_Game_Volleyball.m_Smok2_R[t_C2]=0.5;
			c_Game_Volleyball.m_Smok2_A[t_C2]=1.0;
		}
		c_Game_Volleyball.m_Smok2_Y[t_C2]=c_Game_Volleyball.m_Smok2_Y[t_C2]-150.0/bb_random_Rnd2(80.0,100.0);
		c_Game_Volleyball.m_Smok2_X[t_C2]=c_Game_Volleyball.m_Smok2_X[t_C2]+bb_random_Rnd2(-5.0,5.0)/5.0;
		c_Game_Volleyball.m_Smok2_R[t_C2]=c_Game_Volleyball.m_Smok2_R[t_C2]+0.003;
		if(c_Game_Volleyball.m_Smok2_A[t_C2]>0.0){
			c_Game_Volleyball.m_Smok2_A[t_C2]=c_Game_Volleyball.m_Smok2_A[t_C2]-0.002;
		}
	}
	var t_24=c_Game_Volleyball.m_Napr_Setka;
	if(t_24==0){
		c_Game_Volleyball.m_Frame_Setka=c_Game_Volleyball.m_Frame_Setka-1;
	}else{
		if(t_24==1){
			c_Game_Volleyball.m_Frame_Setka=c_Game_Volleyball.m_Frame_Setka+1;
		}
	}
	if(c_Game_Volleyball.m_Frame_Setka<=0){
		c_Game_Volleyball.m_Frame_Setka=0;
		c_Game_Volleyball.m_Napr_Setka=1;
	}
	if(c_Game_Volleyball.m_Frame_Setka>=9){
		c_Game_Volleyball.m_Frame_Setka=9;
		c_Game_Volleyball.m_Napr_Setka=0;
	}
	var t_25=c_Game_Volleyball.m_Flag_Game;
	if(t_25==0){
		if((bb_input_KeyHit(27))!=0){
			if(c_Game_Volleyball.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
			}
			c_Game_Volleyball.m_Flag_Game=4;
		}
		if(c_Game_Volleyball.m_Anim_PRL==0){
			c_Game_Volleyball.m_Anim_DRL=0;
		}
		if(c_Game_Volleyball.m_Anim_PRP==0){
			c_Game_Volleyball.m_Anim_DRP=0;
		}
		var t_KasanieL=0;
		var t_KasanieP=0;
		var t_26=c_Game_Volleyball.m_Poz_Player;
		if(t_26==1){
			var t_27=c_Game_Volleyball.m_Upravlenie;
			if(t_27==1){
				for(var t_Co=0;t_Co<=10;t_Co=t_Co+1){
					if(bb_input_TouchDown(t_Co)==1 && bb_input_TouchX(t_Co)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
						if((c_Game_Volleyball.m_X_RL-2.0)*c_Game_Volleyball.m_RX_Ekr>bb_input_TouchX(t_Co)){
							c_Game_Volleyball.m_Anim_DRL=1;
						}
						if((c_Game_Volleyball.m_X_RL+2.0)*c_Game_Volleyball.m_RX_Ekr<bb_input_TouchX(t_Co)){
							c_Game_Volleyball.m_Anim_DRL=2;
						}
						t_KasanieL=1;
					}
					if(bb_input_TouchHit(t_Co)==1 && bb_input_TouchX(t_Co)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
						c_Game_Volleyball.m_Anim_PRL=1;
						c_Game_Volleyball.m_Sm_YRL=-7.0;
					}
					if(((bb_input_KeyHit(32))!=0) && c_Game_Volleyball.m_Anim_PRL==0){
						c_Game_Volleyball.m_Anim_PRL=1;
						c_Game_Volleyball.m_Sm_YRL=-7.0;
					}
				}
			}else{
				if(t_27==2){
					if(bb_input_AccelX()<-0.04){
						c_Game_Volleyball.m_Anim_DRL=1;
					}
					if(bb_input_AccelX()>0.04){
						c_Game_Volleyball.m_Anim_DRL=2;
					}
					for(var t_Co2=0;t_Co2<=10;t_Co2=t_Co2+1){
						if(bb_input_TouchHit(t_Co2)==1 && bb_input_TouchX(t_Co2)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co2)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co2)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co2)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
							c_Game_Volleyball.m_Anim_PRL=1;
							c_Game_Volleyball.m_Sm_YRL=-7.0;
						}
					}
				}else{
					if(t_27==3){
						for(var t_Co3=0;t_Co3<=10;t_Co3=t_Co3+1){
							if(bb_input_TouchDown(t_Co3)==1 && bb_input_TouchX(t_Co3)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co3)<200.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co3)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co3)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
								c_Game_Volleyball.m_Anim_DRL=1;
								t_KasanieL=1;
							}
							if(bb_input_TouchDown(t_Co3)==1 && bb_input_TouchX(t_Co3)>200.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co3)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co3)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co3)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
								c_Game_Volleyball.m_Anim_DRL=2;
								t_KasanieL=1;
							}
							if(bb_input_TouchHit(t_Co3)==1 && bb_input_TouchX(t_Co3)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co3)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co3)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co3)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
								c_Game_Volleyball.m_Anim_PRL=1;
								c_Game_Volleyball.m_Sm_YRL=-7.0;
							}
							if(((bb_input_KeyHit(32))!=0) && c_Game_Volleyball.m_Anim_PRL==0){
								c_Game_Volleyball.m_Anim_PRL=1;
								c_Game_Volleyball.m_Sm_YRL=-7.0;
							}
						}
					}
				}
			}
			var t_28=c_Game_Volleyball.m_Anim_DRL;
			if(t_28==0){
				c_Game_Volleyball.m_Sm_XRL=0.0;
				c_Game_Volleyball.m_Frame_RL=0;
				if(c_Game_Volleyball.m_Anim_PRL==1){
					c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
					c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
					if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
						c_Game_Volleyball.m_Frame_RL=9;
					}
					if(c_Game_Volleyball.m_Y_RL<=300.0){
						c_Game_Volleyball.m_Frame_RL=10;
					}
					if(c_Game_Volleyball.m_Y_RL>309.0){
						c_Game_Volleyball.m_Frame_RL=11;
					}
					if(c_Game_Volleyball.m_Y_RL>=323.0){
						c_Game_Volleyball.m_Frame_RL=0;
						c_Game_Volleyball.m_Y_RL=309.0;
						c_Game_Volleyball.m_Sm_YRL=0.0;
						c_Game_Volleyball.m_Anim_PRL=0;
					}
				}
			}else{
				if(t_28==1){
					if(c_Game_Volleyball.m_X_RL>-30.0){
						if(c_Game_Volleyball.m_Sm_XRL>0.0){
							c_Game_Volleyball.m_Sm_XRL=0.0;
						}
						if(c_Game_Volleyball.m_Sm_XRL>-10.0){
							c_Game_Volleyball.m_Sm_XRL=c_Game_Volleyball.m_Sm_XRL-1.0;
						}
						c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL+c_Game_Volleyball.m_Sm_XRL;
					}
					if(c_Game_Volleyball.m_X_RL<-30.0){
						c_Game_Volleyball.m_X_RL=-30.0;
						c_Game_Volleyball.m_Sm_XRL=0.0;
					}
					if(c_Game_Volleyball.m_Anim_PRL==1){
						c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
						c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
						if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
							c_Game_Volleyball.m_Frame_RL=9;
						}
						if(c_Game_Volleyball.m_Y_RL<=300.0){
							c_Game_Volleyball.m_Frame_RL=10;
						}
						if(c_Game_Volleyball.m_Y_RL>309.0){
							c_Game_Volleyball.m_Frame_RL=11;
						}
						if(c_Game_Volleyball.m_Y_RL>=323.0){
							c_Game_Volleyball.m_Frame_RL=0;
							c_Game_Volleyball.m_Y_RL=309.0;
							c_Game_Volleyball.m_Sm_YRL=0.0;
							c_Game_Volleyball.m_Anim_PRL=0;
						}
					}else{
						if(c_Game_Volleyball.m_X_RL>-30.0){
							c_Game_Volleyball.m_Frame_RL=c_Game_Volleyball.m_Frame_RL-1;
							if(c_Game_Volleyball.m_Frame_RL<1){
								c_Game_Volleyball.m_Frame_RL=8;
							}
							if(c_Game_Volleyball.m_Frame_RL>8){
								c_Game_Volleyball.m_Frame_RL=1;
							}
						}else{
							c_Game_Volleyball.m_Frame_RL=0;
						}
					}
				}else{
					if(t_28==2){
						if(c_Game_Volleyball.m_X_RL<349.0){
							if(c_Game_Volleyball.m_Sm_XRL<0.0){
								c_Game_Volleyball.m_Sm_XRL=0.0;
							}
							if(c_Game_Volleyball.m_Sm_XRL<10.0){
								c_Game_Volleyball.m_Sm_XRL=c_Game_Volleyball.m_Sm_XRL+1.0;
							}
							c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL+c_Game_Volleyball.m_Sm_XRL;
						}
						if(c_Game_Volleyball.m_X_RL>348.0){
							c_Game_Volleyball.m_X_RL=348.0;
							c_Game_Volleyball.m_Sm_XRL=0.0;
						}
						if(c_Game_Volleyball.m_Anim_PRL==1){
							c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
							c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
							if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
								c_Game_Volleyball.m_Frame_RL=9;
							}
							if(c_Game_Volleyball.m_Y_RL<=300.0){
								c_Game_Volleyball.m_Frame_RL=10;
							}
							if(c_Game_Volleyball.m_Y_RL>309.0){
								c_Game_Volleyball.m_Frame_RL=11;
							}
							if(c_Game_Volleyball.m_Y_RL>=323.0){
								c_Game_Volleyball.m_Frame_RL=0;
								c_Game_Volleyball.m_Y_RL=309.0;
								c_Game_Volleyball.m_Sm_YRL=0.0;
								c_Game_Volleyball.m_Anim_PRL=0;
							}
						}else{
							if(c_Game_Volleyball.m_X_RL<348.0){
								c_Game_Volleyball.m_Frame_RL=c_Game_Volleyball.m_Frame_RL+1;
								if(c_Game_Volleyball.m_Frame_RL<1){
									c_Game_Volleyball.m_Frame_RL=8;
								}
								if(c_Game_Volleyball.m_Frame_RL>8){
									c_Game_Volleyball.m_Frame_RL=1;
								}
							}else{
								c_Game_Volleyball.m_Frame_RL=0;
							}
						}
					}
				}
			}
			if(c_Game_Volleyball.m_Zad_NachG>0){
				c_Game_Volleyball.m_Zad_NachG=c_Game_Volleyball.m_Zad_NachG-1;
			}
			if(c_Game_Volleyball.m_Zad_NachG<=0){
				if(c_Game_Volleyball.m_X_Bomb<400.0 || c_Game_Volleyball.m_Y_Bomb<(c_Game_Volleyball.m_Nach_DV)){
					if(c_Game_Volleyball.m_Slojno==3){
						if(c_Game_Volleyball.m_X_RP<593.0){
							c_Game_Volleyball.m_Anim_DRP=2;
						}
						if(c_Game_Volleyball.m_X_RP>607.0){
							c_Game_Volleyball.m_Anim_DRP=1;
						}
						if(c_Game_Volleyball.m_X_RP>=593.0 && c_Game_Volleyball.m_X_RP<=607.0){
							c_Game_Volleyball.m_Anim_DRP=0;
						}
					}
				}else{
					if(c_Game_Volleyball.m_X_Bomb<500.0){
						if(c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RP-10.0){
							c_Game_Volleyball.m_Anim_DRP=1;
						}
						if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RP+10.0){
							c_Game_Volleyball.m_Anim_DRP=2;
						}
						if(c_Game_Volleyball.m_Y_Bomb>200.0 && c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RP-10.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RP+10.0 && c_Game_Volleyball.m_Anim_PRP==0){
							c_Game_Volleyball.m_Anim_PRP=1;
							c_Game_Volleyball.m_Sm_YRP=-7.0;
						}
					}
					if(c_Game_Volleyball.m_X_Bomb>=500.0){
						if(c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RP-25.0){
							c_Game_Volleyball.m_Anim_DRP=1;
						}
						if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RP-10.0){
							c_Game_Volleyball.m_Anim_DRP=2;
						}
						if(c_Game_Volleyball.m_Y_Bomb>200.0 && c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RP-35.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RP+35.0 && c_Game_Volleyball.m_Anim_PRP==0){
							if(c_Game_Volleyball.m_Sm_XB>=0.0){
								if(c_Game_Volleyball.m_Sm_XRP>=0.0){
									if(c_Game_Volleyball.m_Y_Bomb>225.0){
										c_Game_Volleyball.m_Anim_PRP=1;
										c_Game_Volleyball.m_Sm_YRP=-7.0;
									}
									if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RP-25.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RP-5.0){
										c_Game_Volleyball.m_Anim_PRP=1;
										c_Game_Volleyball.m_Sm_YRP=-7.0;
									}
								}else{
									if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RP-25.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RP-5.0){
										if(bb_math_Abs2(c_Game_Volleyball.m_Sm_YB)<4.0){
											c_Game_Volleyball.m_Anim_PRP=1;
											c_Game_Volleyball.m_Sm_YRP=-7.0;
										}
									}
								}
							}else{
								if(c_Game_Volleyball.m_Sm_XRP<=0.0){
									if(c_Game_Volleyball.m_Y_Bomb>225.0){
										c_Game_Volleyball.m_Anim_PRP=1;
										c_Game_Volleyball.m_Sm_YRP=-7.0;
									}
									if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RP-25.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RP-5.0){
										c_Game_Volleyball.m_Anim_PRP=1;
										c_Game_Volleyball.m_Sm_YRP=-7.0;
									}
								}else{
									if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RP-10.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RP+10.0){
										if(bb_math_Abs2(c_Game_Volleyball.m_Sm_YB)<4.0){
											c_Game_Volleyball.m_Anim_PRP=1;
											c_Game_Volleyball.m_Sm_YRP=-7.0;
										}
									}
								}
							}
						}
					}
				}
			}
			var t_29=c_Game_Volleyball.m_Anim_DRP;
			if(t_29==0){
				c_Game_Volleyball.m_Sm_XRP=0.0;
				c_Game_Volleyball.m_Frame_RP=0;
				if(c_Game_Volleyball.m_Anim_PRP==1){
					c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
					c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
					if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
						c_Game_Volleyball.m_Frame_RP=9;
					}
					if(c_Game_Volleyball.m_Y_RP<=300.0){
						c_Game_Volleyball.m_Frame_RP=10;
					}
					if(c_Game_Volleyball.m_Y_RP>309.0){
						c_Game_Volleyball.m_Frame_RP=11;
					}
					if(c_Game_Volleyball.m_Y_RP>=323.0){
						c_Game_Volleyball.m_Frame_RP=0;
						c_Game_Volleyball.m_Y_RP=309.0;
						c_Game_Volleyball.m_Sm_YRP=0.0;
						c_Game_Volleyball.m_Anim_PRP=0;
					}
				}
			}else{
				if(t_29==1){
					if(c_Game_Volleyball.m_X_RP>454.0){
						if(c_Game_Volleyball.m_Sm_XRP>0.0){
							c_Game_Volleyball.m_Sm_XRP=0.0;
						}
						if(c_Game_Volleyball.m_Sm_XRP>(0-c_Game_Volleyball.m_Max_SK)){
							c_Game_Volleyball.m_Sm_XRP=c_Game_Volleyball.m_Sm_XRP-1.0;
						}
						c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP+c_Game_Volleyball.m_Sm_XRP;
					}
					if(c_Game_Volleyball.m_X_RP<454.0){
						c_Game_Volleyball.m_X_RP=454.0;
						c_Game_Volleyball.m_Sm_XRP=0.0;
					}
					if(c_Game_Volleyball.m_Anim_PRP==1){
						c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
						c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
						if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
							c_Game_Volleyball.m_Frame_RP=9;
						}
						if(c_Game_Volleyball.m_Y_RP<=300.0){
							c_Game_Volleyball.m_Frame_RP=10;
						}
						if(c_Game_Volleyball.m_Y_RP>309.0){
							c_Game_Volleyball.m_Frame_RP=11;
						}
						if(c_Game_Volleyball.m_Y_RP>=323.0){
							c_Game_Volleyball.m_Frame_RP=0;
							c_Game_Volleyball.m_Y_RP=309.0;
							c_Game_Volleyball.m_Sm_YRP=0.0;
							c_Game_Volleyball.m_Anim_PRP=0;
						}
					}else{
						if(c_Game_Volleyball.m_X_RP>454.0){
							c_Game_Volleyball.m_Frame_RP=c_Game_Volleyball.m_Frame_RP+1;
							if(c_Game_Volleyball.m_Frame_RP<1){
								c_Game_Volleyball.m_Frame_RP=8;
							}
							if(c_Game_Volleyball.m_Frame_RP>8){
								c_Game_Volleyball.m_Frame_RP=1;
							}
						}else{
							c_Game_Volleyball.m_Frame_RP=0;
						}
					}
				}else{
					if(t_29==2){
						if(c_Game_Volleyball.m_X_RP<831.0){
							if(c_Game_Volleyball.m_Sm_XRP<0.0){
								c_Game_Volleyball.m_Sm_XRP=0.0;
							}
							if(c_Game_Volleyball.m_Sm_XRP<(c_Game_Volleyball.m_Max_SK)){
								c_Game_Volleyball.m_Sm_XRP=c_Game_Volleyball.m_Sm_XRP+1.0;
							}
							c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP+c_Game_Volleyball.m_Sm_XRP;
						}
						if(c_Game_Volleyball.m_X_RP>831.0){
							c_Game_Volleyball.m_X_RP=831.0;
							c_Game_Volleyball.m_Sm_XRP=0.0;
						}
						if(c_Game_Volleyball.m_Anim_PRP==1){
							c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
							c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
							if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
								c_Game_Volleyball.m_Frame_RP=9;
							}
							if(c_Game_Volleyball.m_Y_RP<=300.0){
								c_Game_Volleyball.m_Frame_RP=10;
							}
							if(c_Game_Volleyball.m_Y_RP>309.0){
								c_Game_Volleyball.m_Frame_RP=11;
							}
							if(c_Game_Volleyball.m_Y_RP>=323.0){
								c_Game_Volleyball.m_Frame_RP=0;
								c_Game_Volleyball.m_Y_RP=309.0;
								c_Game_Volleyball.m_Sm_YRP=0.0;
								c_Game_Volleyball.m_Anim_PRP=0;
							}
						}else{
							if(c_Game_Volleyball.m_X_RP<831.0){
								c_Game_Volleyball.m_Frame_RP=c_Game_Volleyball.m_Frame_RP-1;
								if(c_Game_Volleyball.m_Frame_RP<1){
									c_Game_Volleyball.m_Frame_RP=8;
								}
								if(c_Game_Volleyball.m_Frame_RP>8){
									c_Game_Volleyball.m_Frame_RP=1;
								}
							}else{
								c_Game_Volleyball.m_Frame_RP=0;
							}
						}
					}
				}
			}
		}else{
			if(t_26==2){
				var t_30=c_Game_Volleyball.m_Upravlenie;
				if(t_30==1){
					for(var t_Co4=0;t_Co4<=10;t_Co4=t_Co4+1){
						if(bb_input_TouchDown(t_Co4)==1 && bb_input_TouchX(t_Co4)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co4)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co4)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co4)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
							if((c_Game_Volleyball.m_X_RP-2.0)*c_Game_Volleyball.m_RX_Ekr>bb_input_TouchX(t_Co4)){
								c_Game_Volleyball.m_Anim_DRP=1;
							}
							if((c_Game_Volleyball.m_X_RP+2.0)*c_Game_Volleyball.m_RX_Ekr<bb_input_TouchX(t_Co4)){
								c_Game_Volleyball.m_Anim_DRP=2;
							}
							t_KasanieP=1;
						}
						if(bb_input_TouchHit(t_Co4)==1 && bb_input_TouchX(t_Co4)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co4)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co4)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co4)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
							c_Game_Volleyball.m_Anim_PRP=1;
							c_Game_Volleyball.m_Sm_YRP=-7.0;
						}
						if(((bb_input_KeyHit(32))!=0) && c_Game_Volleyball.m_Anim_PRP==0){
							c_Game_Volleyball.m_Anim_PRP=1;
							c_Game_Volleyball.m_Sm_YRP=-7.0;
						}
					}
				}else{
					if(t_30==2){
						if(bb_input_AccelX()<-0.04){
							c_Game_Volleyball.m_Anim_DRP=1;
						}
						if(bb_input_AccelX()>0.04){
							c_Game_Volleyball.m_Anim_DRP=2;
						}
						for(var t_Co5=0;t_Co5<=10;t_Co5=t_Co5+1){
							if(bb_input_TouchHit(t_Co5)==1 && bb_input_TouchX(t_Co5)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co5)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co5)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co5)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
								c_Game_Volleyball.m_Anim_PRP=1;
								c_Game_Volleyball.m_Sm_YRP=-7.0;
							}
						}
					}else{
						if(t_30==3){
							for(var t_Co6=0;t_Co6<=10;t_Co6=t_Co6+1){
								if(bb_input_TouchDown(t_Co6)==1 && bb_input_TouchX(t_Co6)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co6)<600.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co6)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co6)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
									c_Game_Volleyball.m_Anim_DRP=1;
									t_KasanieP=1;
								}
								if(bb_input_TouchDown(t_Co6)==1 && bb_input_TouchX(t_Co6)>600.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co6)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co6)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co6)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
									c_Game_Volleyball.m_Anim_DRP=2;
									t_KasanieP=1;
								}
								if(bb_input_TouchHit(t_Co6)==1 && bb_input_TouchX(t_Co6)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co6)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co6)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co6)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
									c_Game_Volleyball.m_Anim_PRP=1;
									c_Game_Volleyball.m_Sm_YRP=-7.0;
								}
								if(((bb_input_KeyHit(32))!=0) && c_Game_Volleyball.m_Anim_PRP==0){
									c_Game_Volleyball.m_Anim_PRP=1;
									c_Game_Volleyball.m_Sm_YRP=-7.0;
								}
							}
						}
					}
				}
				var t_31=c_Game_Volleyball.m_Anim_DRP;
				if(t_31==0){
					c_Game_Volleyball.m_Sm_XRP=0.0;
					c_Game_Volleyball.m_Frame_RP=0;
					if(c_Game_Volleyball.m_Anim_PRP==1){
						c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
						c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
						if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
							c_Game_Volleyball.m_Frame_RP=9;
						}
						if(c_Game_Volleyball.m_Y_RP<=300.0){
							c_Game_Volleyball.m_Frame_RP=10;
						}
						if(c_Game_Volleyball.m_Y_RP>309.0){
							c_Game_Volleyball.m_Frame_RP=11;
						}
						if(c_Game_Volleyball.m_Y_RP>=323.0){
							c_Game_Volleyball.m_Frame_RP=0;
							c_Game_Volleyball.m_Y_RP=309.0;
							c_Game_Volleyball.m_Sm_YRP=0.0;
							c_Game_Volleyball.m_Anim_PRP=0;
						}
					}
				}else{
					if(t_31==1){
						if(c_Game_Volleyball.m_X_RP>454.0){
							if(c_Game_Volleyball.m_Sm_XRP>0.0){
								c_Game_Volleyball.m_Sm_XRP=0.0;
							}
							if(c_Game_Volleyball.m_Sm_XRP>-10.0){
								c_Game_Volleyball.m_Sm_XRP=c_Game_Volleyball.m_Sm_XRP-1.0;
							}
							c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP+c_Game_Volleyball.m_Sm_XRP;
						}
						if(c_Game_Volleyball.m_X_RP<454.0){
							c_Game_Volleyball.m_X_RP=454.0;
							c_Game_Volleyball.m_Sm_XRP=0.0;
						}
						if(c_Game_Volleyball.m_Anim_PRP==1){
							c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
							c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
							if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
								c_Game_Volleyball.m_Frame_RP=9;
							}
							if(c_Game_Volleyball.m_Y_RP<=300.0){
								c_Game_Volleyball.m_Frame_RP=10;
							}
							if(c_Game_Volleyball.m_Y_RP>309.0){
								c_Game_Volleyball.m_Frame_RP=11;
							}
							if(c_Game_Volleyball.m_Y_RP>=323.0){
								c_Game_Volleyball.m_Frame_RP=0;
								c_Game_Volleyball.m_Y_RP=309.0;
								c_Game_Volleyball.m_Sm_YRP=0.0;
								c_Game_Volleyball.m_Anim_PRP=0;
							}
						}else{
							if(c_Game_Volleyball.m_X_RP>454.0){
								c_Game_Volleyball.m_Frame_RP=c_Game_Volleyball.m_Frame_RP+1;
								if(c_Game_Volleyball.m_Frame_RP<1){
									c_Game_Volleyball.m_Frame_RP=8;
								}
								if(c_Game_Volleyball.m_Frame_RP>8){
									c_Game_Volleyball.m_Frame_RP=1;
								}
							}else{
								c_Game_Volleyball.m_Frame_RP=0;
							}
						}
					}else{
						if(t_31==2){
							if(c_Game_Volleyball.m_X_RP<831.0){
								if(c_Game_Volleyball.m_Sm_XRP<0.0){
									c_Game_Volleyball.m_Sm_XRP=0.0;
								}
								if(c_Game_Volleyball.m_Sm_XRP<10.0){
									c_Game_Volleyball.m_Sm_XRP=c_Game_Volleyball.m_Sm_XRP+1.0;
								}
								c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP+c_Game_Volleyball.m_Sm_XRP;
							}
							if(c_Game_Volleyball.m_X_RP>831.0){
								c_Game_Volleyball.m_X_RP=831.0;
								c_Game_Volleyball.m_Sm_XRP=0.0;
							}
							if(c_Game_Volleyball.m_Anim_PRP==1){
								c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
								c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
								if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
									c_Game_Volleyball.m_Frame_RP=9;
								}
								if(c_Game_Volleyball.m_Y_RP<=300.0){
									c_Game_Volleyball.m_Frame_RP=10;
								}
								if(c_Game_Volleyball.m_Y_RP>309.0){
									c_Game_Volleyball.m_Frame_RP=11;
								}
								if(c_Game_Volleyball.m_Y_RP>=323.0){
									c_Game_Volleyball.m_Frame_RP=0;
									c_Game_Volleyball.m_Y_RP=309.0;
									c_Game_Volleyball.m_Sm_YRP=0.0;
									c_Game_Volleyball.m_Anim_PRP=0;
								}
							}else{
								if(c_Game_Volleyball.m_X_RP<831.0){
									c_Game_Volleyball.m_Frame_RP=c_Game_Volleyball.m_Frame_RP-1;
									if(c_Game_Volleyball.m_Frame_RP<1){
										c_Game_Volleyball.m_Frame_RP=8;
									}
									if(c_Game_Volleyball.m_Frame_RP>8){
										c_Game_Volleyball.m_Frame_RP=1;
									}
								}else{
									c_Game_Volleyball.m_Frame_RP=0;
								}
							}
						}
					}
				}
				if(c_Game_Volleyball.m_Zad_NachG>0){
					c_Game_Volleyball.m_Zad_NachG=c_Game_Volleyball.m_Zad_NachG-1;
				}
				if(c_Game_Volleyball.m_Zad_NachG<=0){
					if(c_Game_Volleyball.m_X_Bomb>400.0 || c_Game_Volleyball.m_Y_Bomb<(c_Game_Volleyball.m_Nach_DV)){
						if(c_Game_Volleyball.m_Slojno==3){
							if(c_Game_Volleyball.m_X_RL<193.0){
								c_Game_Volleyball.m_Anim_DRL=2;
							}
							if(c_Game_Volleyball.m_X_RL>207.0){
								c_Game_Volleyball.m_Anim_DRL=1;
							}
							if(c_Game_Volleyball.m_X_RL>=193.0 && c_Game_Volleyball.m_X_RL<=207.0){
								c_Game_Volleyball.m_Anim_DRL=0;
							}
						}
					}else{
						if(c_Game_Volleyball.m_X_Bomb>300.0){
							if(c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RL-10.0){
								c_Game_Volleyball.m_Anim_DRL=1;
							}
							if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RL+10.0){
								c_Game_Volleyball.m_Anim_DRL=2;
							}
							if(c_Game_Volleyball.m_Y_Bomb>200.0 && c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RL-10.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RL+10.0 && c_Game_Volleyball.m_Anim_PRL==0){
								c_Game_Volleyball.m_Anim_PRL=1;
								c_Game_Volleyball.m_Sm_YRL=-7.0;
							}
						}
						if(c_Game_Volleyball.m_X_Bomb<=300.0){
							if(c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RL+10.0){
								c_Game_Volleyball.m_Anim_DRL=1;
							}
							if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RL+25.0){
								c_Game_Volleyball.m_Anim_DRL=2;
							}
							if(c_Game_Volleyball.m_Y_Bomb>200.0 && c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RL-35.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RL+35.0 && c_Game_Volleyball.m_Anim_PRL==0){
								if(c_Game_Volleyball.m_Sm_XB<=0.0){
									if(c_Game_Volleyball.m_Sm_XRL<=0.0){
										if(c_Game_Volleyball.m_Y_Bomb>225.0){
											c_Game_Volleyball.m_Anim_PRL=1;
											c_Game_Volleyball.m_Sm_YRL=-7.0;
										}
										if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RL+5.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RL+25.0){
											c_Game_Volleyball.m_Anim_PRL=1;
											c_Game_Volleyball.m_Sm_YRL=-7.0;
										}
									}else{
										if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RL+5.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RL+25.0){
											if(bb_math_Abs2(c_Game_Volleyball.m_Sm_YB)<4.0){
												c_Game_Volleyball.m_Anim_PRL=1;
												c_Game_Volleyball.m_Sm_YRL=-7.0;
											}
										}
									}
								}else{
									if(c_Game_Volleyball.m_Sm_XRL>=0.0){
										if(c_Game_Volleyball.m_Y_Bomb>225.0){
											c_Game_Volleyball.m_Anim_PRL=1;
											c_Game_Volleyball.m_Sm_YRL=-7.0;
										}
										if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RL+5.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RL+25.0){
											c_Game_Volleyball.m_Anim_PRL=1;
											c_Game_Volleyball.m_Sm_YRL=-7.0;
										}
									}else{
										if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RL-10.0 && c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RL+10.0){
											if(bb_math_Abs2(c_Game_Volleyball.m_Sm_YB)<4.0){
												c_Game_Volleyball.m_Anim_PRL=1;
												c_Game_Volleyball.m_Sm_YRL=-7.0;
											}
										}
									}
								}
							}
						}
					}
				}
				var t_32=c_Game_Volleyball.m_Anim_DRL;
				if(t_32==0){
					c_Game_Volleyball.m_Sm_XRL=0.0;
					c_Game_Volleyball.m_Frame_RL=0;
					if(c_Game_Volleyball.m_Anim_PRL==1){
						c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
						c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
						if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
							c_Game_Volleyball.m_Frame_RL=9;
						}
						if(c_Game_Volleyball.m_Y_RL<=300.0){
							c_Game_Volleyball.m_Frame_RL=10;
						}
						if(c_Game_Volleyball.m_Y_RL>309.0){
							c_Game_Volleyball.m_Frame_RL=11;
						}
						if(c_Game_Volleyball.m_Y_RL>=323.0){
							c_Game_Volleyball.m_Frame_RL=0;
							c_Game_Volleyball.m_Y_RL=309.0;
							c_Game_Volleyball.m_Sm_YRL=0.0;
							c_Game_Volleyball.m_Anim_PRL=0;
						}
					}
				}else{
					if(t_32==1){
						if(c_Game_Volleyball.m_X_RL>-30.0){
							if(c_Game_Volleyball.m_Sm_XRL>0.0){
								c_Game_Volleyball.m_Sm_XRL=0.0;
							}
							if(c_Game_Volleyball.m_Sm_XRL>(0-c_Game_Volleyball.m_Max_SK)){
								c_Game_Volleyball.m_Sm_XRL=c_Game_Volleyball.m_Sm_XRL-1.0;
							}
							c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL+c_Game_Volleyball.m_Sm_XRL;
						}
						if(c_Game_Volleyball.m_X_RL<-30.0){
							c_Game_Volleyball.m_X_RL=-30.0;
							c_Game_Volleyball.m_Sm_XRL=0.0;
						}
						if(c_Game_Volleyball.m_Anim_PRL==1){
							c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
							c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
							if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
								c_Game_Volleyball.m_Frame_RL=9;
							}
							if(c_Game_Volleyball.m_Y_RL<=300.0){
								c_Game_Volleyball.m_Frame_RL=10;
							}
							if(c_Game_Volleyball.m_Y_RL>309.0){
								c_Game_Volleyball.m_Frame_RL=11;
							}
							if(c_Game_Volleyball.m_Y_RL>=323.0){
								c_Game_Volleyball.m_Frame_RL=0;
								c_Game_Volleyball.m_Y_RL=309.0;
								c_Game_Volleyball.m_Sm_YRL=0.0;
								c_Game_Volleyball.m_Anim_PRL=0;
							}
						}else{
							if(c_Game_Volleyball.m_X_RL>-30.0){
								c_Game_Volleyball.m_Frame_RL=c_Game_Volleyball.m_Frame_RL-1;
								if(c_Game_Volleyball.m_Frame_RL<1){
									c_Game_Volleyball.m_Frame_RL=8;
								}
								if(c_Game_Volleyball.m_Frame_RL>8){
									c_Game_Volleyball.m_Frame_RL=1;
								}
							}else{
								c_Game_Volleyball.m_Frame_RL=0;
							}
						}
					}else{
						if(t_32==2){
							if(c_Game_Volleyball.m_X_RL<349.0){
								if(c_Game_Volleyball.m_Sm_XRL<0.0){
									c_Game_Volleyball.m_Sm_XRL=0.0;
								}
								if(c_Game_Volleyball.m_Sm_XRL<(c_Game_Volleyball.m_Max_SK)){
									c_Game_Volleyball.m_Sm_XRL=c_Game_Volleyball.m_Sm_XRL+1.0;
								}
								c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL+c_Game_Volleyball.m_Sm_XRL;
							}
							if(c_Game_Volleyball.m_X_RL>349.0){
								c_Game_Volleyball.m_X_RL=349.0;
								c_Game_Volleyball.m_Sm_XRL=0.0;
							}
							if(c_Game_Volleyball.m_Anim_PRL==1){
								c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
								c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
								if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
									c_Game_Volleyball.m_Frame_RL=9;
								}
								if(c_Game_Volleyball.m_Y_RL<=300.0){
									c_Game_Volleyball.m_Frame_RL=10;
								}
								if(c_Game_Volleyball.m_Y_RL>309.0){
									c_Game_Volleyball.m_Frame_RL=11;
								}
								if(c_Game_Volleyball.m_Y_RL>=323.0){
									c_Game_Volleyball.m_Frame_RL=0;
									c_Game_Volleyball.m_Y_RL=309.0;
									c_Game_Volleyball.m_Sm_YRL=0.0;
									c_Game_Volleyball.m_Anim_PRL=0;
								}
							}else{
								if(c_Game_Volleyball.m_X_RL<831.0){
									c_Game_Volleyball.m_Frame_RL=c_Game_Volleyball.m_Frame_RL-1;
									if(c_Game_Volleyball.m_Frame_RL<1){
										c_Game_Volleyball.m_Frame_RL=8;
									}
									if(c_Game_Volleyball.m_Frame_RL>8){
										c_Game_Volleyball.m_Frame_RL=1;
									}
								}else{
									c_Game_Volleyball.m_Frame_RL=0;
								}
							}
						}
					}
				}
			}else{
				if(t_26==3){
					var t_33=c_Game_Volleyball.m_Upravlenie;
					if(t_33==1){
						for(var t_Co7=0;t_Co7<=10;t_Co7=t_Co7+1){
							if(bb_input_TouchDown(t_Co7)==1 && bb_input_TouchX(t_Co7)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co7)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co7)>200.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co7)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
								if((c_Game_Volleyball.m_X_RL-2.0)*c_Game_Volleyball.m_RX_Ekr>bb_input_TouchX(t_Co7)){
									c_Game_Volleyball.m_Anim_DRL=1;
								}
								if((c_Game_Volleyball.m_X_RL+2.0)*c_Game_Volleyball.m_RX_Ekr<bb_input_TouchX(t_Co7)){
									c_Game_Volleyball.m_Anim_DRL=2;
								}
								t_KasanieL=1;
							}
							if(bb_input_TouchHit(t_Co7)==1 && bb_input_TouchX(t_Co7)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co7)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co7)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co7)<200.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
								c_Game_Volleyball.m_Anim_PRL=1;
								c_Game_Volleyball.m_Sm_YRL=-7.0;
							}
							if(((bb_input_KeyHit(32))!=0) && c_Game_Volleyball.m_Anim_PRL==0){
								c_Game_Volleyball.m_Anim_PRL=1;
								c_Game_Volleyball.m_Sm_YRL=-7.0;
							}
						}
					}else{
						if(t_33==3){
							for(var t_Co8=0;t_Co8<=10;t_Co8=t_Co8+1){
								if(bb_input_TouchDown(t_Co8)==1 && bb_input_TouchX(t_Co8)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co8)<200.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co8)>200.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co8)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
									c_Game_Volleyball.m_Anim_DRL=1;
									t_KasanieL=1;
								}
								if(bb_input_TouchDown(t_Co8)==1 && bb_input_TouchX(t_Co8)>200.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co8)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co8)>200.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co8)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
									c_Game_Volleyball.m_Anim_DRL=2;
									t_KasanieL=1;
								}
								if(bb_input_TouchHit(t_Co8)==1 && bb_input_TouchX(t_Co8)>0.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co8)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co8)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co8)<200.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRL==0){
									c_Game_Volleyball.m_Anim_PRL=1;
									c_Game_Volleyball.m_Sm_YRL=-7.0;
								}
								if(((bb_input_KeyHit(32))!=0) && c_Game_Volleyball.m_Anim_PRL==0){
									c_Game_Volleyball.m_Anim_PRL=1;
									c_Game_Volleyball.m_Sm_YRL=-7.0;
								}
							}
						}
					}
					var t_34=c_Game_Volleyball.m_Anim_DRL;
					if(t_34==0){
						c_Game_Volleyball.m_Sm_XRL=0.0;
						c_Game_Volleyball.m_Frame_RL=0;
						if(c_Game_Volleyball.m_Anim_PRL==1){
							c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
							c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
							if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
								c_Game_Volleyball.m_Frame_RL=9;
							}
							if(c_Game_Volleyball.m_Y_RL<=300.0){
								c_Game_Volleyball.m_Frame_RL=10;
							}
							if(c_Game_Volleyball.m_Y_RL>309.0){
								c_Game_Volleyball.m_Frame_RL=11;
							}
							if(c_Game_Volleyball.m_Y_RL>=323.0){
								c_Game_Volleyball.m_Frame_RL=0;
								c_Game_Volleyball.m_Y_RL=309.0;
								c_Game_Volleyball.m_Sm_YRL=0.0;
								c_Game_Volleyball.m_Anim_PRL=0;
							}
						}
					}else{
						if(t_34==1){
							if(c_Game_Volleyball.m_X_RL>-30.0){
								if(c_Game_Volleyball.m_Sm_XRL>0.0){
									c_Game_Volleyball.m_Sm_XRL=0.0;
								}
								if(c_Game_Volleyball.m_Sm_XRL>-10.0){
									c_Game_Volleyball.m_Sm_XRL=c_Game_Volleyball.m_Sm_XRL-1.0;
								}
								c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL+c_Game_Volleyball.m_Sm_XRL;
							}
							if(c_Game_Volleyball.m_X_RL<-30.0){
								c_Game_Volleyball.m_X_RL=-30.0;
								c_Game_Volleyball.m_Sm_XRL=0.0;
							}
							if(c_Game_Volleyball.m_Anim_PRL==1){
								c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
								c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
								if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
									c_Game_Volleyball.m_Frame_RL=9;
								}
								if(c_Game_Volleyball.m_Y_RL<=300.0){
									c_Game_Volleyball.m_Frame_RL=10;
								}
								if(c_Game_Volleyball.m_Y_RL>309.0){
									c_Game_Volleyball.m_Frame_RL=11;
								}
								if(c_Game_Volleyball.m_Y_RL>=323.0){
									c_Game_Volleyball.m_Frame_RL=0;
									c_Game_Volleyball.m_Y_RL=309.0;
									c_Game_Volleyball.m_Sm_YRL=0.0;
									c_Game_Volleyball.m_Anim_PRL=0;
								}
							}else{
								if(c_Game_Volleyball.m_X_RL>-30.0){
									c_Game_Volleyball.m_Frame_RL=c_Game_Volleyball.m_Frame_RL-1;
									if(c_Game_Volleyball.m_Frame_RL<1){
										c_Game_Volleyball.m_Frame_RL=8;
									}
									if(c_Game_Volleyball.m_Frame_RL>8){
										c_Game_Volleyball.m_Frame_RL=1;
									}
								}else{
									c_Game_Volleyball.m_Frame_RL=0;
								}
							}
						}else{
							if(t_34==2){
								if(c_Game_Volleyball.m_X_RL<349.0){
									if(c_Game_Volleyball.m_Sm_XRL<0.0){
										c_Game_Volleyball.m_Sm_XRL=0.0;
									}
									if(c_Game_Volleyball.m_Sm_XRL<10.0){
										c_Game_Volleyball.m_Sm_XRL=c_Game_Volleyball.m_Sm_XRL+1.0;
									}
									c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL+c_Game_Volleyball.m_Sm_XRL;
								}
								if(c_Game_Volleyball.m_X_RL>348.0){
									c_Game_Volleyball.m_X_RL=348.0;
									c_Game_Volleyball.m_Sm_XRL=0.0;
								}
								if(c_Game_Volleyball.m_Anim_PRL==1){
									c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
									c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
									if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
										c_Game_Volleyball.m_Frame_RL=9;
									}
									if(c_Game_Volleyball.m_Y_RL<=300.0){
										c_Game_Volleyball.m_Frame_RL=10;
									}
									if(c_Game_Volleyball.m_Y_RL>309.0){
										c_Game_Volleyball.m_Frame_RL=11;
									}
									if(c_Game_Volleyball.m_Y_RL>=323.0){
										c_Game_Volleyball.m_Frame_RL=0;
										c_Game_Volleyball.m_Y_RL=309.0;
										c_Game_Volleyball.m_Sm_YRL=0.0;
										c_Game_Volleyball.m_Anim_PRL=0;
									}
								}else{
									if(c_Game_Volleyball.m_X_RL<348.0){
										c_Game_Volleyball.m_Frame_RL=c_Game_Volleyball.m_Frame_RL+1;
										if(c_Game_Volleyball.m_Frame_RL<1){
											c_Game_Volleyball.m_Frame_RL=8;
										}
										if(c_Game_Volleyball.m_Frame_RL>8){
											c_Game_Volleyball.m_Frame_RL=1;
										}
									}else{
										c_Game_Volleyball.m_Frame_RL=0;
									}
								}
							}
						}
					}
					var t_35=c_Game_Volleyball.m_Upravlenie;
					if(t_35==1){
						for(var t_Co9=0;t_Co9<=10;t_Co9=t_Co9+1){
							if(bb_input_TouchDown(t_Co9)==1 && bb_input_TouchX(t_Co9)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co9)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co9)>200.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co9)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
								if((c_Game_Volleyball.m_X_RP-2.0)*c_Game_Volleyball.m_RX_Ekr>bb_input_TouchX(t_Co9)){
									c_Game_Volleyball.m_Anim_DRP=1;
								}
								if((c_Game_Volleyball.m_X_RP+2.0)*c_Game_Volleyball.m_RX_Ekr<bb_input_TouchX(t_Co9)){
									c_Game_Volleyball.m_Anim_DRP=2;
								}
								t_KasanieP=1;
							}
							if(bb_input_TouchHit(t_Co9)==1 && bb_input_TouchX(t_Co9)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co9)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co9)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co9)<200.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
								c_Game_Volleyball.m_Anim_PRP=1;
								c_Game_Volleyball.m_Sm_YRP=-7.0;
							}
							if(((bb_input_KeyHit(32))!=0) && c_Game_Volleyball.m_Anim_PRP==0){
								c_Game_Volleyball.m_Anim_PRP=1;
								c_Game_Volleyball.m_Sm_YRP=-7.0;
							}
						}
					}else{
						if(t_35==3){
							for(var t_Co10=0;t_Co10<=10;t_Co10=t_Co10+1){
								if(bb_input_TouchDown(t_Co10)==1 && bb_input_TouchX(t_Co10)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co10)<600.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co10)>200.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co10)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
									c_Game_Volleyball.m_Anim_DRP=1;
									t_KasanieP=1;
								}
								if(bb_input_TouchDown(t_Co10)==1 && bb_input_TouchX(t_Co10)>600.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co10)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co10)>200.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co10)<480.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
									c_Game_Volleyball.m_Anim_DRP=2;
									t_KasanieP=1;
								}
								if(bb_input_TouchHit(t_Co10)==1 && bb_input_TouchX(t_Co10)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co10)<800.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co10)>0.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co10)<200.0*c_Game_Volleyball.m_RY_Ekr && c_Game_Volleyball.m_Anim_PRP==0){
									c_Game_Volleyball.m_Anim_PRP=1;
									c_Game_Volleyball.m_Sm_YRP=-7.0;
								}
								if(((bb_input_KeyHit(32))!=0) && c_Game_Volleyball.m_Anim_PRP==0){
									c_Game_Volleyball.m_Anim_PRP=1;
									c_Game_Volleyball.m_Sm_YRP=-7.0;
								}
							}
						}
					}
					var t_36=c_Game_Volleyball.m_Anim_DRP;
					if(t_36==0){
						c_Game_Volleyball.m_Sm_XRP=0.0;
						c_Game_Volleyball.m_Frame_RP=0;
						if(c_Game_Volleyball.m_Anim_PRP==1){
							c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
							c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
							if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
								c_Game_Volleyball.m_Frame_RP=9;
							}
							if(c_Game_Volleyball.m_Y_RP<=300.0){
								c_Game_Volleyball.m_Frame_RP=10;
							}
							if(c_Game_Volleyball.m_Y_RP>309.0){
								c_Game_Volleyball.m_Frame_RP=11;
							}
							if(c_Game_Volleyball.m_Y_RP>=323.0){
								c_Game_Volleyball.m_Frame_RP=0;
								c_Game_Volleyball.m_Y_RP=309.0;
								c_Game_Volleyball.m_Sm_YRP=0.0;
								c_Game_Volleyball.m_Anim_PRP=0;
							}
						}
					}else{
						if(t_36==1){
							if(c_Game_Volleyball.m_X_RP>454.0){
								if(c_Game_Volleyball.m_Sm_XRP>0.0){
									c_Game_Volleyball.m_Sm_XRP=0.0;
								}
								if(c_Game_Volleyball.m_Sm_XRP>-10.0){
									c_Game_Volleyball.m_Sm_XRP=c_Game_Volleyball.m_Sm_XRP-1.0;
								}
								c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP+c_Game_Volleyball.m_Sm_XRP;
							}
							if(c_Game_Volleyball.m_X_RP<454.0){
								c_Game_Volleyball.m_X_RP=454.0;
								c_Game_Volleyball.m_Sm_XRP=0.0;
							}
							if(c_Game_Volleyball.m_Anim_PRP==1){
								c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
								c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
								if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
									c_Game_Volleyball.m_Frame_RP=9;
								}
								if(c_Game_Volleyball.m_Y_RP<=300.0){
									c_Game_Volleyball.m_Frame_RP=10;
								}
								if(c_Game_Volleyball.m_Y_RP>309.0){
									c_Game_Volleyball.m_Frame_RP=11;
								}
								if(c_Game_Volleyball.m_Y_RP>=323.0){
									c_Game_Volleyball.m_Frame_RP=0;
									c_Game_Volleyball.m_Y_RP=309.0;
									c_Game_Volleyball.m_Sm_YRP=0.0;
									c_Game_Volleyball.m_Anim_PRP=0;
								}
							}else{
								if(c_Game_Volleyball.m_X_RP>454.0){
									c_Game_Volleyball.m_Frame_RP=c_Game_Volleyball.m_Frame_RP+1;
									if(c_Game_Volleyball.m_Frame_RP<1){
										c_Game_Volleyball.m_Frame_RP=8;
									}
									if(c_Game_Volleyball.m_Frame_RP>8){
										c_Game_Volleyball.m_Frame_RP=1;
									}
								}else{
									c_Game_Volleyball.m_Frame_RP=0;
								}
							}
						}else{
							if(t_36==2){
								if(c_Game_Volleyball.m_X_RP<831.0){
									if(c_Game_Volleyball.m_Sm_XRP<0.0){
										c_Game_Volleyball.m_Sm_XRP=0.0;
									}
									if(c_Game_Volleyball.m_Sm_XRP<10.0){
										c_Game_Volleyball.m_Sm_XRP=c_Game_Volleyball.m_Sm_XRP+1.0;
									}
									c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP+c_Game_Volleyball.m_Sm_XRP;
								}
								if(c_Game_Volleyball.m_X_RP>831.0){
									c_Game_Volleyball.m_X_RP=831.0;
									c_Game_Volleyball.m_Sm_XRP=0.0;
								}
								if(c_Game_Volleyball.m_Anim_PRP==1){
									c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
									c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
									if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
										c_Game_Volleyball.m_Frame_RP=9;
									}
									if(c_Game_Volleyball.m_Y_RP<=300.0){
										c_Game_Volleyball.m_Frame_RP=10;
									}
									if(c_Game_Volleyball.m_Y_RP>309.0){
										c_Game_Volleyball.m_Frame_RP=11;
									}
									if(c_Game_Volleyball.m_Y_RP>=323.0){
										c_Game_Volleyball.m_Frame_RP=0;
										c_Game_Volleyball.m_Y_RP=309.0;
										c_Game_Volleyball.m_Sm_YRP=0.0;
										c_Game_Volleyball.m_Anim_PRP=0;
									}
								}else{
									if(c_Game_Volleyball.m_X_RP<831.0){
										c_Game_Volleyball.m_Frame_RP=c_Game_Volleyball.m_Frame_RP-1;
										if(c_Game_Volleyball.m_Frame_RP<1){
											c_Game_Volleyball.m_Frame_RP=8;
										}
										if(c_Game_Volleyball.m_Frame_RP>8){
											c_Game_Volleyball.m_Frame_RP=1;
										}
									}else{
										c_Game_Volleyball.m_Frame_RP=0;
									}
								}
							}
						}
					}
				}
			}
		}
		if(c_Game_Volleyball.m_Anim_PRL==0){
			if(c_Game_Volleyball.m_Y_RL>309.0){
				c_Game_Volleyball.m_Y_RL=309.0;
			}
		}
		if(c_Game_Volleyball.m_Anim_PRP==0){
			if(c_Game_Volleyball.m_Y_RP>309.0){
				c_Game_Volleyball.m_Y_RP=309.0;
			}
		}
		if(c_Game_Volleyball.m_Grav!=0.0){
			if(c_Game_Volleyball.m_Zad_Sek>0){
				c_Game_Volleyball.m_Zad_Sek=c_Game_Volleyball.m_Zad_Sek-1;
			}
			if(c_Game_Volleyball.m_Zad_Sek<=0){
				c_Game_Volleyball.m_Timer_B=c_Game_Volleyball.m_Timer_B-1;
				c_Game_Volleyball.m_Zad_Sek=40;
				if(c_Game_Volleyball.m_Timer_B<0){
					c_Game_Volleyball.m_Timer_B=0;
				}
			}
		}
		var t_37=c_Game_Volleyball.m_Anim_Bomb;
		if(t_37==0){
			c_Game_Volleyball.m_Frame_Bomb=c_Game_Volleyball.m_Frame_Bomb+1;
			if(c_Game_Volleyball.m_Frame_Bomb>4){
				c_Game_Volleyball.m_Frame_Bomb=0;
			}
		}else{
			if(t_37==1){
				c_Game_Volleyball.m_Frame_Bomb=c_Game_Volleyball.m_Frame_Bomb+c_Game_Volleyball.m_SV_Bomb;
				if(c_Game_Volleyball.m_Frame_Bomb>35){
					c_Game_Volleyball.m_Frame_Bomb=c_Game_Volleyball.m_Frame_Bomb-36;
				}
			}else{
				if(t_37==2){
					c_Game_Volleyball.m_Frame_Bomb=c_Game_Volleyball.m_Frame_Bomb-c_Game_Volleyball.m_SV_Bomb;
					if(c_Game_Volleyball.m_Frame_Bomb<0){
						c_Game_Volleyball.m_Frame_Bomb=c_Game_Volleyball.m_Frame_Bomb+36;
					}
				}
			}
		}
		var t_RastL=((bb_math_Abs2(Math.sqrt((c_Game_Volleyball.m_X_RL-c_Game_Volleyball.m_X_Bomb)*(c_Game_Volleyball.m_X_RL-c_Game_Volleyball.m_X_Bomb)+(c_Game_Volleyball.m_Y_RL-c_Game_Volleyball.m_Y_Bomb)*(c_Game_Volleyball.m_Y_RL-c_Game_Volleyball.m_Y_Bomb))))|0);
		if(t_RastL<74){
			if(c_Game_Volleyball.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Udar,2,0);
			}
			if(c_Game_Volleyball.m_Flag_Vibro==1){
				diddy.startVibrate(50);
			}
			c_Game_Volleyball.m_Kol_UL=c_Game_Volleyball.m_Kol_UL+1;
			c_Game_Volleyball.m_Kol_UP=0;
			c_Game_Volleyball.m_Grav=0.1;
			c_Game_Volleyball.m_Anim_Bomb=((bb_random_Rnd2(1.0,3.0))|0);
			c_Game_Volleyball.m_SV_Bomb=((bb_random_Rnd2(1.0,5.0))|0);
			c_Game_Volleyball.m_Sm_YB=bb_math_Abs2(c_Game_Volleyball.m_Sm_YB);
			var t_UgolStolkL=(Math.atan2(c_Game_Volleyball.m_Y_RL-c_Game_Volleyball.m_Y_Bomb,c_Game_Volleyball.m_X_RL-c_Game_Volleyball.m_X_Bomb)*R2D);
			var t_MoveDist1L=(74-t_RastL)*(c_Game_Volleyball.m_MassaRL/(c_Game_Volleyball.m_MassaB+c_Game_Volleyball.m_MassaRL));
			var t_MoveDist2L=(74-t_RastL)*(c_Game_Volleyball.m_MassaB/(c_Game_Volleyball.m_MassaB+c_Game_Volleyball.m_MassaRL));
			c_Game_Volleyball.m_X_Bomb=c_Game_Volleyball.m_X_Bomb+t_MoveDist1L*Math.cos((t_UgolStolkL+180.0)*D2R);
			c_Game_Volleyball.m_Y_Bomb=c_Game_Volleyball.m_Y_Bomb+t_MoveDist1L*Math.sin((t_UgolStolkL+180.0)*D2R);
			c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL+t_MoveDist2L*Math.cos((t_UgolStolkL)*D2R);
			c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+t_MoveDist2L*Math.sin((t_UgolStolkL)*D2R);
			var t_nXL=Math.cos((t_UgolStolkL)*D2R);
			var t_nYL=Math.sin((t_UgolStolkL)*D2R);
			c_Game_Volleyball.m_Sm_XRL=c_Game_Volleyball.m_Sm_XRL*0.6;
			c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL*0.6;
			var t_a1L=c_Game_Volleyball.m_Sm_XB*t_nXL+c_Game_Volleyball.m_Sm_YB*t_nYL;
			var t_a2L=c_Game_Volleyball.m_Sm_XRL*t_nXL+c_Game_Volleyball.m_Sm_YRL*t_nYL;
			var t_OptimisedL=2.0*(t_a1L-t_a2L)/(c_Game_Volleyball.m_MassaB+c_Game_Volleyball.m_MassaRL);
			c_Game_Volleyball.m_Sm_XB=c_Game_Volleyball.m_Sm_XB-t_OptimisedL*c_Game_Volleyball.m_MassaRL*t_nXL;
			c_Game_Volleyball.m_Sm_YB=c_Game_Volleyball.m_Sm_YB-t_OptimisedL*c_Game_Volleyball.m_MassaRL*t_nYL;
			if(c_Game_Volleyball.m_Sm_XB>8.0){
				c_Game_Volleyball.m_Sm_XB=8.0;
			}
			if(c_Game_Volleyball.m_Sm_XB<-8.0){
				c_Game_Volleyball.m_Sm_XB=-8.0;
			}
			if(c_Game_Volleyball.m_Sm_YB>8.0){
				c_Game_Volleyball.m_Sm_YB=8.0;
			}
			if(c_Game_Volleyball.m_Sm_YB<-8.0){
				c_Game_Volleyball.m_Sm_YB=-8.0;
			}
			c_Game_Volleyball.m_Sm_XRL=0.0;
			c_Game_Volleyball.m_Sm_YRL=0.0;
		}
		var t_RastP=((bb_math_Abs2(Math.sqrt((c_Game_Volleyball.m_X_RP-c_Game_Volleyball.m_X_Bomb)*(c_Game_Volleyball.m_X_RP-c_Game_Volleyball.m_X_Bomb)+(c_Game_Volleyball.m_Y_RP-c_Game_Volleyball.m_Y_Bomb)*(c_Game_Volleyball.m_Y_RP-c_Game_Volleyball.m_Y_Bomb))))|0);
		if(t_RastP<74){
			if(c_Game_Volleyball.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Udar,2,0);
			}
			if(c_Game_Volleyball.m_Flag_Vibro==1){
				diddy.startVibrate(50);
			}
			c_Game_Volleyball.m_Kol_UP=c_Game_Volleyball.m_Kol_UP+1;
			c_Game_Volleyball.m_Kol_UL=0;
			c_Game_Volleyball.m_Grav=0.1;
			c_Game_Volleyball.m_Anim_Bomb=((bb_random_Rnd2(1.0,3.0))|0);
			c_Game_Volleyball.m_SV_Bomb=((bb_random_Rnd2(1.0,5.0))|0);
			c_Game_Volleyball.m_Sm_YB=bb_math_Abs2(c_Game_Volleyball.m_Sm_YB);
			var t_UgolStolkP=(Math.atan2(c_Game_Volleyball.m_Y_RP-c_Game_Volleyball.m_Y_Bomb,c_Game_Volleyball.m_X_RP-c_Game_Volleyball.m_X_Bomb)*R2D);
			var t_MoveDist1P=(74-t_RastP)*(c_Game_Volleyball.m_MassaRP/(c_Game_Volleyball.m_MassaB+c_Game_Volleyball.m_MassaRP));
			var t_MoveDist2P=(74-t_RastP)*(c_Game_Volleyball.m_MassaB/(c_Game_Volleyball.m_MassaB+c_Game_Volleyball.m_MassaRP));
			c_Game_Volleyball.m_X_Bomb=c_Game_Volleyball.m_X_Bomb+t_MoveDist1P*Math.cos((t_UgolStolkP+180.0)*D2R);
			c_Game_Volleyball.m_Y_Bomb=c_Game_Volleyball.m_Y_Bomb+t_MoveDist1P*Math.sin((t_UgolStolkP+180.0)*D2R);
			c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP+t_MoveDist2P*Math.cos((t_UgolStolkP)*D2R);
			c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+t_MoveDist2P*Math.sin((t_UgolStolkP)*D2R);
			var t_nXP=Math.cos((t_UgolStolkP)*D2R);
			var t_nYP=Math.sin((t_UgolStolkP)*D2R);
			c_Game_Volleyball.m_Sm_XRP=c_Game_Volleyball.m_Sm_XRP*0.6;
			c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP*0.6;
			var t_a1P=c_Game_Volleyball.m_Sm_XB*t_nXP+c_Game_Volleyball.m_Sm_YB*t_nYP;
			var t_a2P=c_Game_Volleyball.m_Sm_XRP*t_nXP+c_Game_Volleyball.m_Sm_YRP*t_nYP;
			var t_OptimisedP=2.0*(t_a1P-t_a2P)/(c_Game_Volleyball.m_MassaB+c_Game_Volleyball.m_MassaRP);
			c_Game_Volleyball.m_Sm_XB=c_Game_Volleyball.m_Sm_XB-t_OptimisedP*c_Game_Volleyball.m_MassaRP*t_nXP;
			c_Game_Volleyball.m_Sm_YB=c_Game_Volleyball.m_Sm_YB-t_OptimisedP*c_Game_Volleyball.m_MassaRP*t_nYP;
			if(c_Game_Volleyball.m_Sm_XB>8.0){
				c_Game_Volleyball.m_Sm_XB=8.0;
			}
			if(c_Game_Volleyball.m_Sm_XB<-8.0){
				c_Game_Volleyball.m_Sm_XB=-8.0;
			}
			if(c_Game_Volleyball.m_Sm_YB>8.0){
				c_Game_Volleyball.m_Sm_YB=8.0;
			}
			if(c_Game_Volleyball.m_Sm_YB<-8.0){
				c_Game_Volleyball.m_Sm_YB=-8.0;
			}
			c_Game_Volleyball.m_Sm_XRP=0.0;
			c_Game_Volleyball.m_Sm_YRP=0.0;
		}
		if(c_Game_Volleyball.m_X_Bomb<=25.0 || c_Game_Volleyball.m_X_Bomb>=775.0){
			if(c_Game_Volleyball.m_Flag_Sound==1){
				bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Otskok,5,0);
			}
			if(c_Game_Volleyball.m_X_Bomb<25.0){
				c_Game_Volleyball.m_X_Bomb=25.0;
				c_Game_Volleyball.m_Kol_UP=0;
			}
			if(c_Game_Volleyball.m_X_Bomb>775.0){
				c_Game_Volleyball.m_X_Bomb=775.0;
				c_Game_Volleyball.m_Kol_UL=0;
			}
			c_Game_Volleyball.m_Sm_XB=0.0-c_Game_Volleyball.m_Sm_XB*0.7;
			c_Game_Volleyball.m_Anim_Bomb=((bb_random_Rnd2(1.0,3.0))|0);
			c_Game_Volleyball.m_SV_Bomb=((bb_random_Rnd2(1.0,3.0))|0);
		}
		var t_RastS=((bb_math_Abs2(Math.sqrt((400.0-c_Game_Volleyball.m_X_Bomb)*(400.0-c_Game_Volleyball.m_X_Bomb)+(222.0-c_Game_Volleyball.m_Y_Bomb)*(222.0-c_Game_Volleyball.m_Y_Bomb))))|0);
		if(c_Game_Volleyball.m_Y_Bomb>222.0){
			if(c_Game_Volleyball.m_X_Bomb>365.0 && c_Game_Volleyball.m_X_Bomb<435.0){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Razriad,4,0);
				}
				c_Game_Volleyball.m_Flag_Razriad=1;
				if(c_Game_Volleyball.m_X_Bomb<=400.0){
					c_Game_Volleyball.m_X_Bomb=365.0;
				}else{
					c_Game_Volleyball.m_X_Bomb=435.0;
				}
				c_Game_Volleyball.m_Sm_XB=0.0-c_Game_Volleyball.m_Sm_XB;
				c_Game_Volleyball.m_Anim_Bomb=((bb_random_Rnd2(1.0,3.0))|0);
				c_Game_Volleyball.m_SV_Bomb=((bb_random_Rnd2(1.0,3.0))|0);
			}
		}else{
			if(t_RastS<36){
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Razriad,4,0);
				}
				c_Game_Volleyball.m_Flag_Razriad=1;
				var t_UgolStolkS=(Math.atan2(222.0-c_Game_Volleyball.m_Y_Bomb,400.0-c_Game_Volleyball.m_X_Bomb)*R2D);
				var t_MoveDist1S=(36-t_RastS)*(5000.0/(c_Game_Volleyball.m_MassaB+5000.0));
				var t_MoveDist2S=(36-t_RastS)*(c_Game_Volleyball.m_MassaB/(c_Game_Volleyball.m_MassaB+5000.0));
				c_Game_Volleyball.m_X_Bomb=c_Game_Volleyball.m_X_Bomb+t_MoveDist1S*Math.cos((t_UgolStolkS+180.0)*D2R);
				c_Game_Volleyball.m_Y_Bomb=c_Game_Volleyball.m_Y_Bomb+t_MoveDist1S*Math.sin((t_UgolStolkS+180.0)*D2R);
				var t_nXS=Math.cos((t_UgolStolkS)*D2R);
				var t_nYS=Math.sin((t_UgolStolkS)*D2R);
				var t_a1S=c_Game_Volleyball.m_Sm_XB*t_nXS+c_Game_Volleyball.m_Sm_YB*t_nYS;
				var t_a2S=0.0*t_nXS+0.0*t_nYS;
				var t_OptimisedS=2.0*(t_a1S-t_a2S)/(c_Game_Volleyball.m_MassaB+5000.0);
				c_Game_Volleyball.m_Sm_XB=c_Game_Volleyball.m_Sm_XB-t_OptimisedS*5000.0*t_nXS;
				c_Game_Volleyball.m_Sm_YB=c_Game_Volleyball.m_Sm_YB-t_OptimisedS*5000.0*t_nYS;
				if(c_Game_Volleyball.m_Sm_XB>8.0){
					c_Game_Volleyball.m_Sm_XB=8.0;
				}
				if(c_Game_Volleyball.m_Sm_XB<-8.0){
					c_Game_Volleyball.m_Sm_XB=-8.0;
				}
				if(c_Game_Volleyball.m_Sm_YB>8.0){
					c_Game_Volleyball.m_Sm_YB=8.0;
				}
				if(c_Game_Volleyball.m_Sm_YB<-8.0){
					c_Game_Volleyball.m_Sm_YB=-8.0;
				}
			}
		}
		if(c_Game_Volleyball.m_Y_Bomb>=345.0 || c_Game_Volleyball.m_Timer_B==0 || c_Game_Volleyball.m_Kol_UL>3 || c_Game_Volleyball.m_Kol_UP>3){
			c_Game_Volleyball.m_Flag_Game=1;
			c_Game_Volleyball.m_Alpha_IndL=0.0;
			c_Game_Volleyball.m_Alpha_IndP=0.0;
			if(c_Game_Volleyball.m_Arsenal>0){
				c_Game_Volleyball.m_Arsenal=c_Game_Volleyball.m_Arsenal-1;
			}
			var t_38=c_Game_Volleyball.m_Poz_Player;
			if(t_38==1){
				if(c_Game_Volleyball.m_X_Bomb<=400.0){
					c_Game_Volleyball.m_TRez_B=c_Game_Volleyball.m_TRez_B+1;
				}else{
					c_Game_Volleyball.m_TRez_P=c_Game_Volleyball.m_TRez_P+1;
				}
			}else{
				if(t_38==2){
					if(c_Game_Volleyball.m_X_Bomb<=400.0){
						c_Game_Volleyball.m_TRez_P=c_Game_Volleyball.m_TRez_P+1;
					}else{
						c_Game_Volleyball.m_TRez_B=c_Game_Volleyball.m_TRez_B+1;
					}
				}else{
					if(t_38==3){
						if(c_Game_Volleyball.m_X_Bomb<=400.0){
							c_Game_Volleyball.m_Rez_PI=c_Game_Volleyball.m_Rez_PI+1;
						}else{
							c_Game_Volleyball.m_Rez_LI=c_Game_Volleyball.m_Rez_LI+1;
						}
					}
				}
			}
		}
		if(c_Game_Volleyball.m_Grav!=0.0){
			if(c_Game_Volleyball.m_Y_Bomb<=150.0){
				c_Game_Volleyball.m_Grav=bb_math_Abs2(c_Game_Volleyball.m_Y_Bomb-150.0)/1500.0+0.1;
			}else{
				c_Game_Volleyball.m_Grav=0.1;
			}
		}
		c_Game_Volleyball.m_Sm_YB=c_Game_Volleyball.m_Sm_YB+c_Game_Volleyball.m_Grav;
		c_Game_Volleyball.m_X_Bomb=c_Game_Volleyball.m_X_Bomb+c_Game_Volleyball.m_Sm_XB;
		c_Game_Volleyball.m_Y_Bomb=c_Game_Volleyball.m_Y_Bomb+c_Game_Volleyball.m_Sm_YB;
		if(t_KasanieL==1 && c_Game_Volleyball.m_Alpha_IndL>0.0){
			c_Game_Volleyball.m_Alpha_IndL=c_Game_Volleyball.m_Alpha_IndL-0.02;
		}
		if(t_KasanieL==0 && c_Game_Volleyball.m_Alpha_IndL<0.5){
			c_Game_Volleyball.m_Alpha_IndL=c_Game_Volleyball.m_Alpha_IndL+0.02;
		}
		if(c_Game_Volleyball.m_Alpha_IndL<0.0){
			c_Game_Volleyball.m_Alpha_IndL=0.0;
		}
		if(c_Game_Volleyball.m_Alpha_IndL>0.5){
			c_Game_Volleyball.m_Alpha_IndL=0.5;
		}
		if(t_KasanieP==1 && c_Game_Volleyball.m_Alpha_IndP>0.0){
			c_Game_Volleyball.m_Alpha_IndP=c_Game_Volleyball.m_Alpha_IndP-0.02;
		}
		if(t_KasanieP==0 && c_Game_Volleyball.m_Alpha_IndP<0.5){
			c_Game_Volleyball.m_Alpha_IndP=c_Game_Volleyball.m_Alpha_IndP+0.02;
		}
		if(c_Game_Volleyball.m_Alpha_IndP<0.0){
			c_Game_Volleyball.m_Alpha_IndP=0.0;
		}
		if(c_Game_Volleyball.m_Alpha_IndP>0.5){
			c_Game_Volleyball.m_Alpha_IndP=0.5;
		}
	}else{
		if(t_25==1){
			if(c_Game_Volleyball.m_Vzriv_C==0){
				c_Game_Volleyball.m_Nach_Vzriv();
				if(c_Game_Volleyball.m_Flag_Sound==1){
					bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Bomb,3,0);
				}
				if(c_Game_Volleyball.m_Flag_Vibro==1){
					diddy.startVibrate(100);
				}
				if(c_Game_Volleyball.m_X_Bomb>400.0){
					c_Game_Volleyball.m_Frame_RP=11;
					if(c_Game_Volleyball.m_X_Bomb<=c_Game_Volleyball.m_X_RP){
						c_Game_Volleyball.m_Sm_XRP=15.0;
					}else{
						c_Game_Volleyball.m_Sm_XRP=-15.0;
					}
				}else{
					c_Game_Volleyball.m_Frame_RL=11;
					if(c_Game_Volleyball.m_X_Bomb>=c_Game_Volleyball.m_X_RL){
						c_Game_Volleyball.m_Sm_XRL=-15.0;
					}else{
						c_Game_Volleyball.m_Sm_XRL=15.0;
					}
				}
			}else{
				if(c_Game_Volleyball.m_X_Bomb>400.0){
					if(c_Game_Volleyball.m_Anim_PRL==1){
						c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+c_Game_Volleyball.m_Sm_YRL*4.0;
						c_Game_Volleyball.m_Sm_YRL=c_Game_Volleyball.m_Sm_YRL+1.0;
						if(c_Game_Volleyball.m_Y_RL>300.0 && c_Game_Volleyball.m_Y_RL<309.0){
							c_Game_Volleyball.m_Frame_RL=9;
						}
						if(c_Game_Volleyball.m_Y_RL<=300.0){
							c_Game_Volleyball.m_Frame_RL=10;
						}
						if(c_Game_Volleyball.m_Y_RL>309.0){
							c_Game_Volleyball.m_Frame_RL=11;
						}
						if(c_Game_Volleyball.m_Y_RL>=323.0){
							c_Game_Volleyball.m_Frame_RL=0;
							c_Game_Volleyball.m_Y_RL=309.0;
							c_Game_Volleyball.m_Sm_YRL=0.0;
							c_Game_Volleyball.m_Anim_PRL=0;
						}
					}
					if(c_Game_Volleyball.m_Y_RP<323.0){
						c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+3.0;
					}
					if(c_Game_Volleyball.m_X_RP<900.0){
						c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP+c_Game_Volleyball.m_Sm_XRP;
						c_Game_Volleyball.m_U_RP=c_Game_Volleyball.m_U_RP-20;
						if(c_Game_Volleyball.m_U_RP<=0){
							c_Game_Volleyball.m_U_RP=360;
						}
					}
					if(c_Game_Volleyball.m_X_RP<454.0){
						c_Game_Volleyball.m_Sm_XRP=15.0;
					}
				}else{
					if(c_Game_Volleyball.m_Anim_PRP==1){
						c_Game_Volleyball.m_Y_RP=c_Game_Volleyball.m_Y_RP+c_Game_Volleyball.m_Sm_YRP*4.0;
						c_Game_Volleyball.m_Sm_YRP=c_Game_Volleyball.m_Sm_YRP+1.0;
						if(c_Game_Volleyball.m_Y_RP>300.0 && c_Game_Volleyball.m_Y_RP<309.0){
							c_Game_Volleyball.m_Frame_RP=9;
						}
						if(c_Game_Volleyball.m_Y_RP<=300.0){
							c_Game_Volleyball.m_Frame_RP=10;
						}
						if(c_Game_Volleyball.m_Y_RP>309.0){
							c_Game_Volleyball.m_Frame_RP=11;
						}
						if(c_Game_Volleyball.m_Y_RP>=323.0){
							c_Game_Volleyball.m_Frame_RP=0;
							c_Game_Volleyball.m_Y_RP=309.0;
							c_Game_Volleyball.m_Sm_YRP=0.0;
							c_Game_Volleyball.m_Anim_PRP=0;
						}
					}
					if(c_Game_Volleyball.m_Y_RL<323.0){
						c_Game_Volleyball.m_Y_RL=c_Game_Volleyball.m_Y_RL+3.0;
					}
					if(c_Game_Volleyball.m_X_RL>-100.0){
						c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL+c_Game_Volleyball.m_Sm_XRL;
						c_Game_Volleyball.m_U_RL=c_Game_Volleyball.m_U_RL+20;
						if(c_Game_Volleyball.m_U_RL>=360){
							c_Game_Volleyball.m_U_RL=0;
						}
					}
					if(c_Game_Volleyball.m_X_RL>349.0){
						c_Game_Volleyball.m_Sm_XRL=-15.0;
					}
				}
				c_Game_Volleyball.m_Raschet_Vzriv();
				if(c_Game_Volleyball.m_Vzriv_C==0){
					if(c_Game_Volleyball.m_Arsenal>0){
						c_Game_Volleyball.m_Flag_Game=2;
						c_Game_Volleyball.m_Anim_DRL=0;
						c_Game_Volleyball.m_Anim_PRL=0;
						c_Game_Volleyball.m_Frame_RL=0;
						c_Game_Volleyball.m_Y_RL=309.0;
						c_Game_Volleyball.m_Sm_XRL=0.0;
						c_Game_Volleyball.m_Sm_YRL=0.0;
						c_Game_Volleyball.m_U_RL=0;
						c_Game_Volleyball.m_Anim_PRP=0;
						c_Game_Volleyball.m_Anim_DRP=0;
						c_Game_Volleyball.m_Frame_RP=0;
						c_Game_Volleyball.m_Y_RP=309.0;
						c_Game_Volleyball.m_Sm_XRP=0.0;
						c_Game_Volleyball.m_Sm_YRP=0.0;
						c_Game_Volleyball.m_U_RP=0;
						c_Game_Volleyball.m_Kol_UL=0;
						c_Game_Volleyball.m_Kol_UP=0;
						c_Game_Volleyball.m_Grav=0.0;
						c_Game_Volleyball.m_Anim_Bomb=0;
						c_Game_Volleyball.m_Frame_Bomb=0;
						c_Game_Volleyball.m_Sm_XB=0.0;
						c_Game_Volleyball.m_Sm_YB=0.0;
						if(c_Game_Volleyball.m_X_Bomb>400.0){
							if(c_Game_Volleyball.m_Poz_Player==2){
								c_Game_Volleyball.m_Zad_NachG=40;
							}
							c_Game_Volleyball.m_X_Bomb=200.0;
						}else{
							if(c_Game_Volleyball.m_Poz_Player==1){
								c_Game_Volleyball.m_Zad_NachG=40;
							}
							c_Game_Volleyball.m_X_Bomb=600.0;
						}
						c_Game_Volleyball.m_Y_Bomb=220.0;
						c_Game_Volleyball.m_Zad_Sek=40;
						c_Game_Volleyball.m_Timer_B=c_Game_Volleyball.m_Nach_TB;
					}else{
						if(c_Game_Volleyball.m_Rekord_Player[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]==0 && c_Game_Volleyball.m_Rekord_Bot[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]==0){
							c_Game_Volleyball.m_Rekord_Player[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]=c_Game_Volleyball.m_TRez_P;
							c_Game_Volleyball.m_Rekord_Bot[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]=c_Game_Volleyball.m_TRez_B;
						}else{
							if(c_Game_Volleyball.m_TRez_P-c_Game_Volleyball.m_TRez_B>c_Game_Volleyball.m_Rekord_Player[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]-c_Game_Volleyball.m_Rekord_Bot[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]){
								c_Game_Volleyball.m_Rekord_Player[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]=c_Game_Volleyball.m_TRez_P;
								c_Game_Volleyball.m_Rekord_Bot[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]=c_Game_Volleyball.m_TRez_B;
							}else{
								if(c_Game_Volleyball.m_TRez_P-c_Game_Volleyball.m_TRez_B==c_Game_Volleyball.m_Rekord_Player[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]-c_Game_Volleyball.m_Rekord_Bot[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]){
									if(c_Game_Volleyball.m_TRez_P>c_Game_Volleyball.m_Rekord_Player[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]){
										c_Game_Volleyball.m_Rekord_Player[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]=c_Game_Volleyball.m_TRez_P;
										c_Game_Volleyball.m_Rekord_Bot[((c_Game_Volleyball.m_Kol_Bomb/5)|0)+(c_Game_Volleyball.m_Slojno*5-5)]=c_Game_Volleyball.m_TRez_B;
									}
								}
							}
						}
						if(c_Game_Volleyball.m_Poz_Player!=3){
							c_Game_Volleyball.m_SaveDan();
						}
						c_Game_Volleyball.m_Flag_Game=3;
					}
				}
			}
		}else{
			if(t_25==2){
				if(c_Game_Volleyball.m_X_RL>=193.0 && c_Game_Volleyball.m_X_RL<=207.0 && c_Game_Volleyball.m_X_RP>=593.0 && c_Game_Volleyball.m_X_RP<=607.0){
					c_Game_Volleyball.m_Flag_Game=0;
				}
				if(c_Game_Volleyball.m_X_RL>=193.0 && c_Game_Volleyball.m_X_RL<=207.0){
					c_Game_Volleyball.m_Frame_RL=0;
				}
				if(c_Game_Volleyball.m_X_RL<193.0){
					c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL+10.0;
					c_Game_Volleyball.m_Frame_RL=c_Game_Volleyball.m_Frame_RL+1;
					if(c_Game_Volleyball.m_Frame_RL>8){
						c_Game_Volleyball.m_Frame_RL=1;
					}
				}
				if(c_Game_Volleyball.m_X_RL>207.0){
					c_Game_Volleyball.m_X_RL=c_Game_Volleyball.m_X_RL-10.0;
					c_Game_Volleyball.m_Frame_RL=c_Game_Volleyball.m_Frame_RL-1;
					if(c_Game_Volleyball.m_Frame_RL<1){
						c_Game_Volleyball.m_Frame_RL=8;
					}
				}
				if(c_Game_Volleyball.m_X_RP>=593.0 && c_Game_Volleyball.m_X_RP<=607.0){
					c_Game_Volleyball.m_Frame_RP=0;
				}
				if(c_Game_Volleyball.m_X_RP<593.0){
					c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP+10.0;
					c_Game_Volleyball.m_Frame_RP=c_Game_Volleyball.m_Frame_RP-1;
					if(c_Game_Volleyball.m_Frame_RP<1){
						c_Game_Volleyball.m_Frame_RP=8;
					}
				}
				if(c_Game_Volleyball.m_X_RP>607.0){
					c_Game_Volleyball.m_X_RP=c_Game_Volleyball.m_X_RP-10.0;
					c_Game_Volleyball.m_Frame_RP=c_Game_Volleyball.m_Frame_RP+1;
					if(c_Game_Volleyball.m_Frame_RP>8){
						c_Game_Volleyball.m_Frame_RP=1;
					}
				}
			}else{
				if(t_25==3){
					for(var t_Co11=0;t_Co11<=10;t_Co11=t_Co11+1){
						if(bb_input_TouchDown(t_Co11)==1 && bb_input_TouchX(t_Co11)>150.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co11)<650.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co11)>100.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co11)<230.0*c_Game_Volleyball.m_RY_Ekr){
							c_Game_Volleyball.m_Regim=6;
							c_Game_Volleyball.m_Proz_Screen=1.0;
						}
					}
				}else{
					if(t_25==4){
						for(var t_Co12=0;t_Co12<=10;t_Co12=t_Co12+1){
							if(bb_input_TouchDown(t_Co12)==1 && bb_input_TouchX(t_Co12)>100.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co12)<400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co12)>100.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co12)<300.0*c_Game_Volleyball.m_RY_Ekr){
								if(c_Game_Volleyball.m_Flag_Sound==1){
									bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
								}
								c_Game_Volleyball.m_Regim=6;
								c_Game_Volleyball.m_Proz_Screen=1.0;
							}
							if(bb_input_TouchDown(t_Co12)==1 && bb_input_TouchX(t_Co12)>400.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchX(t_Co12)<700.0*c_Game_Volleyball.m_RX_Ekr && bb_input_TouchY(t_Co12)>100.0*c_Game_Volleyball.m_RY_Ekr && bb_input_TouchY(t_Co12)<300.0*c_Game_Volleyball.m_RY_Ekr){
								if(c_Game_Volleyball.m_Flag_Sound==1){
									bb_audio_PlaySound(c_Game_Volleyball.m_Zv_Click,1,0);
								}
								c_Game_Volleyball.m_Flag_Game=0;
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
c_Game_Volleyball.m_Update_EndGame=function(){
	c_Game_Volleyball.m_Proz_Screen=c_Game_Volleyball.m_Proz_Screen-0.03;
	if(c_Game_Volleyball.m_Proz_Screen<=0.0){
		c_Game_Volleyball.m_Proz_Screen=0.0;
		c_Game_Volleyball.m_Regim=1;
	}
	for(var t_C=0;t_C<=19;t_C=t_C+1){
		if(c_Game_Volleyball.m_Fire1_Y[t_C]<=150.0){
			c_Game_Volleyball.m_Fire1_X[t_C]=(c_Game_Volleyball.m_X_NachF1)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Fire1_Y[t_C]=310.0+bb_random_Rnd2(1.0,10.0);
			c_Game_Volleyball.m_Fire1_R[t_C]=0.6;
			c_Game_Volleyball.m_Fire1_A[t_C]=1.0;
		}else{
			c_Game_Volleyball.m_Fire1_Y[t_C]=c_Game_Volleyball.m_Fire1_Y[t_C]-(bb_math_Abs2(c_Game_Volleyball.m_Fire1_Y[t_C])+100.0)/100.0;
			c_Game_Volleyball.m_Fire1_R[t_C]=c_Game_Volleyball.m_Fire1_R[t_C]-0.005;
			c_Game_Volleyball.m_Fire1_A[t_C]=c_Game_Volleyball.m_Fire1_A[t_C]-0.02;
			if(c_Game_Volleyball.m_Fire1_A[t_C]<0.0){
				c_Game_Volleyball.m_Fire1_A[t_C]=0.0;
			}
		}
		if(c_Game_Volleyball.m_Fire2_Y[t_C]<=150.0){
			c_Game_Volleyball.m_Fire2_X[t_C]=(c_Game_Volleyball.m_X_NachF2)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Fire2_Y[t_C]=310.0+bb_random_Rnd2(1.0,10.0);
			c_Game_Volleyball.m_Fire2_R[t_C]=0.6;
			c_Game_Volleyball.m_Fire2_A[t_C]=1.0;
		}else{
			c_Game_Volleyball.m_Fire2_Y[t_C]=c_Game_Volleyball.m_Fire2_Y[t_C]-(bb_math_Abs2(c_Game_Volleyball.m_Fire2_Y[t_C])+100.0)/100.0;
			c_Game_Volleyball.m_Fire2_R[t_C]=c_Game_Volleyball.m_Fire2_R[t_C]-0.005;
			c_Game_Volleyball.m_Fire2_A[t_C]=c_Game_Volleyball.m_Fire2_A[t_C]-0.02;
			if(c_Game_Volleyball.m_Fire2_A[t_C]<0.0){
				c_Game_Volleyball.m_Fire2_A[t_C]=0.0;
			}
		}
	}
	for(var t_C2=0;t_C2<=19;t_C2=t_C2+1){
		if(c_Game_Volleyball.m_Smok1_Y[t_C2]<=-50.0){
			c_Game_Volleyball.m_Smok1_X[t_C2]=(c_Game_Volleyball.m_X_NachF1)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Smok1_Y[t_C2]=310.0-bb_random_Rnd2(1.0,20.0);
			c_Game_Volleyball.m_Smok1_R[t_C2]=0.5;
			c_Game_Volleyball.m_Smok1_A[t_C2]=1.0;
		}
		c_Game_Volleyball.m_Smok1_Y[t_C2]=c_Game_Volleyball.m_Smok1_Y[t_C2]-150.0/bb_random_Rnd2(80.0,100.0);
		c_Game_Volleyball.m_Smok1_X[t_C2]=c_Game_Volleyball.m_Smok1_X[t_C2]+bb_random_Rnd2(-5.0,5.0)/5.0;
		c_Game_Volleyball.m_Smok1_R[t_C2]=c_Game_Volleyball.m_Smok1_R[t_C2]+0.003;
		if(c_Game_Volleyball.m_Smok1_A[t_C2]>0.0){
			c_Game_Volleyball.m_Smok1_A[t_C2]=c_Game_Volleyball.m_Smok1_A[t_C2]-0.002;
		}
		if(c_Game_Volleyball.m_Smok2_Y[t_C2]<=-50.0){
			c_Game_Volleyball.m_Smok2_X[t_C2]=(c_Game_Volleyball.m_X_NachF2)+bb_random_Rnd2(1.0,25.0);
			c_Game_Volleyball.m_Smok2_Y[t_C2]=310.0-bb_random_Rnd2(1.0,20.0);
			c_Game_Volleyball.m_Smok2_R[t_C2]=0.5;
			c_Game_Volleyball.m_Smok2_A[t_C2]=1.0;
		}
		c_Game_Volleyball.m_Smok2_Y[t_C2]=c_Game_Volleyball.m_Smok2_Y[t_C2]-150.0/bb_random_Rnd2(80.0,100.0);
		c_Game_Volleyball.m_Smok2_X[t_C2]=c_Game_Volleyball.m_Smok2_X[t_C2]+bb_random_Rnd2(-5.0,5.0)/5.0;
		c_Game_Volleyball.m_Smok2_R[t_C2]=c_Game_Volleyball.m_Smok2_R[t_C2]+0.003;
		if(c_Game_Volleyball.m_Smok2_A[t_C2]>0.0){
			c_Game_Volleyball.m_Smok2_A[t_C2]=c_Game_Volleyball.m_Smok2_A[t_C2]-0.002;
		}
	}
	return 0;
}
c_Game_Volleyball.prototype.p_OnUpdate=function(){
	var t_1=c_Game_Volleyball.m_Regim;
	if(t_1==0){
		c_Game_Volleyball.m_Update_Zastavka();
	}else{
		if(t_1==1){
			c_Game_Volleyball.m_Update_GlMeny();
		}else{
			if(t_1==2){
				c_Game_Volleyball.m_Update_Settings();
			}else{
				if(t_1==3){
					c_Game_Volleyball.m_Update_Help();
				}else{
					if(t_1==4){
						c_Game_Volleyball.m_Update_NachGame();
					}else{
						if(t_1==5){
							c_Game_Volleyball.m_Update_Game();
						}else{
							if(t_1==6){
								c_Game_Volleyball.m_Update_EndGame();
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
c_Game_Volleyball.m_Vizual_Zastavka=function(){
	if(c_Game_Volleyball.m_Progrev_On>10 && c_Game_Volleyball.m_Progrev_On<18){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Zastavka,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Loading,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_EkNast,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Play,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Settings,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Help,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra1[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Off,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_On,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_5,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_10,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_15,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_20,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_25,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Easy,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Medium,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Hard,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Slider,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Arrows,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Accelerometer,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Left,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Right,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_2Play,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind1,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind2,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind3,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_15s,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_30s,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_45s,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_60s,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_75s,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_90s,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_DT,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Nebo,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_EkHelp,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Razriad,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_UkB,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Quit,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Tap,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Bomb[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Bomb[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Bomb[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Bomb[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Bomb[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[3],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[4],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[5],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[6],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[7],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[8],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[9],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[10],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[11],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[12],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[13],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[14],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[15],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[16],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[17],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[18],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[19],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[20],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[21],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[22],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[23],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[24],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[25],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[26],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[27],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[28],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[29],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[30],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[31],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[32],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[33],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[34],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[35],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Lost,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Won,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Draw,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fire,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Smok,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobT,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombT,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Vzriv[0],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Vzriv[1],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Vzriv[2],0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Vvzriv,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_More_Games,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon_Space,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon_Gora,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Ruin,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Space,0.0,0.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Mountain,0.0,0.0,0);
	}
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Loading,308.0,422.0,0);
	return 0;
}
c_Game_Volleyball.m_Vizual_GlMeny=function(){
	if(c_Game_Volleyball.m_Flag_End==1){
		bb_graphics_SetAlpha(0.3);
	}
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Play,308.0,173.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Settings,240.0,247.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Help,307.0,325.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_EkNast,0.0,(c_Game_Volleyball.m_Y_Ekran),0);
	bb_graphics_SetAlpha(1.0);
	if(c_Game_Volleyball.m_Flag_End==1){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Quit,200.0,50.0,0);
	}
	if(c_Game_Volleyball.m_Flag_Help==1){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_EkHelp,43.0,(c_Game_Volleyball.m_Y_Ekran+23),0);
	}else{
		var t_4=c_Game_Volleyball.m_Kol_Bomb;
		if(t_4==5){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_5,118.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
		}else{
			if(t_4==10){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_10,170.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
			}else{
				if(t_4==15){
					bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_15,237.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
				}else{
					if(t_4==20){
						bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_20,304.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
					}else{
						if(t_4==25){
							bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_25,371.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
						}
					}
				}
			}
		}
		var t_5=c_Game_Volleyball.m_Slojno;
		if(t_5==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Easy,483.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
		}else{
			if(t_5==2){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Medium,562.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
			}else{
				if(t_5==3){
					bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Hard,678.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
				}
			}
		}
		var t_6=c_Game_Volleyball.m_Nach_TB;
		if(t_6==15){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_15s,98.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
		}else{
			if(t_6==30){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_30s,154.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
			}else{
				if(t_6==45){
					bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_45s,210.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
				}else{
					if(t_6==60){
						bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_60s,267.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
					}else{
						if(t_6==75){
							bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_75s,323.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
						}else{
							if(t_6==90){
								bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_90s,379.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
							}
						}
					}
				}
			}
		}
		var t_7=c_Game_Volleyball.m_Poz_Player;
		if(t_7==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Left,533.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
		}else{
			if(t_7==2){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Right,611.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
			}
		}
		var t_8=c_Game_Volleyball.m_Flag_Sound;
		if(t_8==0){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Off,149.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
		}else{
			if(t_8==1){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_On,149.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
			}
		}
		var t_9=c_Game_Volleyball.m_Flag_Music;
		if(t_9==0){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Off,324.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
		}else{
			if(t_9==1){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_On,324.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
			}
		}
		var t_10=c_Game_Volleyball.m_Flag_Fon;
		if(t_10==0){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Ruin,473.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
		}else{
			if(t_10==1){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Space,543.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
			}else{
				if(t_10==2){
					bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Mountain,627.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
				}
			}
		}
	}
	return 0;
}
c_Game_Volleyball.m_Vizual_Settings=function(){
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Play,308.0,173.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Settings,240.0,247.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Help,307.0,325.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_EkNast,0.0,(c_Game_Volleyball.m_Y_Ekran),0);
	var t_13=c_Game_Volleyball.m_Kol_Bomb;
	if(t_13==5){
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_5,118.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
	}else{
		if(t_13==10){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_10,170.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
		}else{
			if(t_13==15){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_15,237.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
			}else{
				if(t_13==20){
					bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_20,304.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
				}else{
					if(t_13==25){
						bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_25,371.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
					}
				}
			}
		}
	}
	var t_14=c_Game_Volleyball.m_Slojno;
	if(t_14==1){
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Easy,483.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
	}else{
		if(t_14==2){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Medium,562.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
		}else{
			if(t_14==3){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Hard,678.0,(c_Game_Volleyball.m_Y_Ekran+147),0);
			}
		}
	}
	var t_15=c_Game_Volleyball.m_Nach_TB;
	if(t_15==15){
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_15s,98.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
	}else{
		if(t_15==30){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_30s,154.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
		}else{
			if(t_15==45){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_45s,210.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
			}else{
				if(t_15==60){
					bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_60s,267.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
				}else{
					if(t_15==75){
						bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_75s,323.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
					}else{
						if(t_15==90){
							bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_90s,379.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
						}
					}
				}
			}
		}
	}
	var t_16=c_Game_Volleyball.m_Poz_Player;
	if(t_16==1){
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Left,533.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
	}else{
		if(t_16==2){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Right,611.0,(c_Game_Volleyball.m_Y_Ekran+222),0);
		}
	}
	var t_17=c_Game_Volleyball.m_Flag_Sound;
	if(t_17==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Off,149.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
	}else{
		if(t_17==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_On,149.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
		}
	}
	var t_18=c_Game_Volleyball.m_Flag_Music;
	if(t_18==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Off,324.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
	}else{
		if(t_18==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_On,324.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
		}
	}
	var t_19=c_Game_Volleyball.m_Flag_Fon;
	if(t_19==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Ruin,473.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
	}else{
		if(t_19==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Space,543.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
		}else{
			if(t_19==2){
				bb_graphics_DrawImage(c_Game_Volleyball.m_ImT_Mountain,627.0,(c_Game_Volleyball.m_Y_Ekran+297),0);
			}
		}
	}
	return 0;
}
c_Game_Volleyball.m_Vizual_Help=function(){
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Play,308.0,173.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Settings,240.0,247.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Help,307.0,325.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_EkNast,0.0,(c_Game_Volleyball.m_Y_Ekran),0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_EkHelp,43.0,(c_Game_Volleyball.m_Y_Ekran+23),0);
	return 0;
}
c_Game_Volleyball.m_Vizual_NachGame=function(){
	var t_21=c_Game_Volleyball.m_Flag_Fon;
	if(t_21==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Nebo,0.0,0.0,0);
		for(var t_C=0;t_C<=19;t_C=t_C+1){
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Fire1_A[t_C]);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Fire,c_Game_Volleyball.m_Fire1_X[t_C],c_Game_Volleyball.m_Fire1_Y[t_C],(t_C*15),c_Game_Volleyball.m_Fire1_R[t_C],c_Game_Volleyball.m_Fire1_R[t_C],0);
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Fire2_A[t_C]);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Fire,c_Game_Volleyball.m_Fire2_X[t_C],c_Game_Volleyball.m_Fire2_Y[t_C],(t_C*15),c_Game_Volleyball.m_Fire2_R[t_C],c_Game_Volleyball.m_Fire2_R[t_C],0);
		}
		bb_graphics_SetAlpha(1.0);
		for(var t_C2=0;t_C2<=19;t_C2=t_C2+1){
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Smok1_A[t_C2]);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Smok,c_Game_Volleyball.m_Smok1_X[t_C2],c_Game_Volleyball.m_Smok1_Y[t_C2],(t_C2*15),c_Game_Volleyball.m_Smok1_R[t_C2],c_Game_Volleyball.m_Smok1_R[t_C2],0);
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Smok2_A[t_C2]);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Smok,c_Game_Volleyball.m_Smok2_X[t_C2],c_Game_Volleyball.m_Smok2_Y[t_C2],(t_C2*15),c_Game_Volleyball.m_Smok2_R[t_C2],c_Game_Volleyball.m_Smok2_R[t_C2],0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon,0.0,126.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[9],384.0,206.0,0);
	}else{
		if(t_21==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon_Space,0.0,0.0,0);
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[9],384.0,206.0,0);
		}else{
			if(t_21==2){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon_Gora,0.0,0.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[9],384.0,206.0,0);
			}
		}
	}
	bb_graphics_SetAlpha(0.6);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobT,c_Game_Volleyball.m_X_RL,367.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobT,c_Game_Volleyball.m_X_RP,367.0,0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[c_Game_Volleyball.m_Frame_RL],c_Game_Volleyball.m_X_RL,c_Game_Volleyball.m_Y_RL,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[c_Game_Volleyball.m_Frame_RP],c_Game_Volleyball.m_X_RP,c_Game_Volleyball.m_Y_RP,0);
	bb_graphics_SetAlpha(0.6);
	if(c_Game_Volleyball.m_Flag_Game==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombT,c_Game_Volleyball.m_X_Bomb,367.0,0);
	}
	bb_graphics_SetAlpha(1.0);
	var t_22=c_Game_Volleyball.m_Anim_Bomb;
	if(t_22==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Bomb[c_Game_Volleyball.m_Frame_Bomb],c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0);
	}else{
		if(t_22==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[c_Game_Volleyball.m_Frame_Bomb],c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0);
		}else{
			if(t_22==2){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[c_Game_Volleyball.m_Frame_Bomb],c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0);
			}
		}
	}
	bb_graphics_SetAlpha(0.9);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_DT,388.0,5.0,0);
	var t_23=c_Game_Volleyball.m_Poz_Player;
	if(t_23==1){
		var t_D_TRez_P=((Math.floor((c_Game_Volleyball.m_TRez_P/10)|0))|0);
		var t_E_TRez_P=c_Game_Volleyball.m_TRez_P-t_D_TRez_P*10;
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_P],338.0,5.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_P],363.0,5.0,0);
		var t_D_TRez_B=((Math.floor((c_Game_Volleyball.m_TRez_B/10)|0))|0);
		var t_E_TRez_B=c_Game_Volleyball.m_TRez_B-t_D_TRez_B*10;
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_B],413.0,5.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_B],438.0,5.0,0);
	}else{
		if(t_23==2){
			var t_D_TRez_B2=((Math.floor((c_Game_Volleyball.m_TRez_B/10)|0))|0);
			var t_E_TRez_B2=c_Game_Volleyball.m_TRez_B-t_D_TRez_B2*10;
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_B2],338.0,5.0,0);
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_B2],363.0,5.0,0);
			var t_D_TRez_P2=((Math.floor((c_Game_Volleyball.m_TRez_P/10)|0))|0);
			var t_E_TRez_P2=c_Game_Volleyball.m_TRez_P-t_D_TRez_P2*10;
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_P2],413.0,5.0,0);
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_P2],438.0,5.0,0);
		}else{
			if(t_23==3){
				var t_D_Rez_LI=((Math.floor((c_Game_Volleyball.m_Rez_LI/10)|0))|0);
				var t_E_Rez_LI=c_Game_Volleyball.m_Rez_LI-t_D_Rez_LI*10;
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Rez_LI],338.0,5.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Rez_LI],363.0,5.0,0);
				var t_D_Rez_PI=((Math.floor((c_Game_Volleyball.m_Rez_PI/10)|0))|0);
				var t_E_Rez_PI=c_Game_Volleyball.m_Rez_PI-t_D_Rez_PI*10;
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Rez_PI],413.0,5.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Rez_PI],438.0,5.0,0);
			}
		}
	}
	bb_graphics_SetAlpha(1.0);
	var t_D_Arsenal=((Math.floor((c_Game_Volleyball.m_Arsenal/10)|0))|0);
	var t_E_Arsenal=c_Game_Volleyball.m_Arsenal-t_D_Arsenal*10;
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Arsenal],632.0,428.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Arsenal],657.0,428.0,0);
	var t_D_Timer_B=((Math.floor((c_Game_Volleyball.m_Timer_B/10)|0))|0);
	var t_E_Timer_B=c_Game_Volleyball.m_Timer_B-t_D_Timer_B*10;
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Timer_B],732.0,428.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Timer_B],757.0,428.0,0);
	bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Play,308.0,173.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Settings,240.0,247.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Help,307.0,325.0,0);
	bb_graphics_SetAlpha(1.0);
	return 0;
}
c_Game_Volleyball.m_Vizual_Game=function(){
	var t_39=c_Game_Volleyball.m_Flag_Fon;
	if(t_39==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Nebo,0.0,0.0,0);
		for(var t_C=0;t_C<=19;t_C=t_C+1){
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Fire1_A[t_C]);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Fire,c_Game_Volleyball.m_Fire1_X[t_C],c_Game_Volleyball.m_Fire1_Y[t_C],(t_C*15),c_Game_Volleyball.m_Fire1_R[t_C],c_Game_Volleyball.m_Fire1_R[t_C],0);
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Fire2_A[t_C]);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Fire,c_Game_Volleyball.m_Fire2_X[t_C],c_Game_Volleyball.m_Fire2_Y[t_C],(t_C*15),c_Game_Volleyball.m_Fire2_R[t_C],c_Game_Volleyball.m_Fire2_R[t_C],0);
		}
		bb_graphics_SetAlpha(1.0);
		for(var t_C2=0;t_C2<=19;t_C2=t_C2+1){
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Smok1_A[t_C2]);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Smok,c_Game_Volleyball.m_Smok1_X[t_C2],c_Game_Volleyball.m_Smok1_Y[t_C2],(t_C2*15),c_Game_Volleyball.m_Smok1_R[t_C2],c_Game_Volleyball.m_Smok1_R[t_C2],0);
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Smok2_A[t_C2]);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Smok,c_Game_Volleyball.m_Smok2_X[t_C2],c_Game_Volleyball.m_Smok2_Y[t_C2],(t_C2*15),c_Game_Volleyball.m_Smok2_R[t_C2],c_Game_Volleyball.m_Smok2_R[t_C2],0);
		}
		bb_graphics_SetAlpha(1.0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon,0.0,126.0,0);
	}else{
		if(t_39==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon_Space,0.0,0.0,0);
		}else{
			if(t_39==2){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon_Gora,0.0,0.0,0);
			}
		}
	}
	bb_graphics_SetAlpha(0.6);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobT,c_Game_Volleyball.m_X_RL,367.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobT,c_Game_Volleyball.m_X_RP,367.0,0);
	if(c_Game_Volleyball.m_Flag_Game==0 || c_Game_Volleyball.m_Flag_Game==4){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombT,c_Game_Volleyball.m_X_Bomb,367.0,0);
	}
	bb_graphics_SetAlpha(1.0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[c_Game_Volleyball.m_Frame_Setka],384.0,206.0,0);
	if(c_Game_Volleyball.m_Flag_Razriad==1){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Razriad,384.0,206.0,0);
		c_Game_Volleyball.m_Flag_Razriad=0;
	}
	bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_RobL[c_Game_Volleyball.m_Frame_RL],c_Game_Volleyball.m_X_RL,c_Game_Volleyball.m_Y_RL,(c_Game_Volleyball.m_U_RL),1.0,1.0,0);
	bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_RobP[c_Game_Volleyball.m_Frame_RP],c_Game_Volleyball.m_X_RP,c_Game_Volleyball.m_Y_RP,(c_Game_Volleyball.m_U_RP),1.0,1.0,0);
	if(c_Game_Volleyball.m_Flag_Game==0 || c_Game_Volleyball.m_Flag_Game==4){
		var t_40=c_Game_Volleyball.m_Anim_Bomb;
		if(t_40==0){
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Bomb[c_Game_Volleyball.m_Frame_Bomb],c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0);
		}else{
			if(t_40==1){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[c_Game_Volleyball.m_Frame_Bomb],c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0);
			}else{
				if(t_40==2){
					bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[c_Game_Volleyball.m_Frame_Bomb],c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0);
				}
			}
		}
	}
	var t_41=c_Game_Volleyball.m_Poz_Player;
	if(t_41==1){
		bb_graphics_SetAlpha(c_Game_Volleyball.m_Alpha_IndL);
		var t_42=c_Game_Volleyball.m_Upravlenie;
		if(t_42==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind2,6.0,346.0,0);
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind3,700.0,10.0,0);
		}else{
			if(t_42==3){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind1,6.0,346.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind3,700.0,10.0,0);
			}
		}
		bb_graphics_SetAlpha(1.0);
	}else{
		if(t_41==2){
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Alpha_IndP);
			var t_43=c_Game_Volleyball.m_Upravlenie;
			if(t_43==1){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind2,414.0,346.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind3,20.0,10.0,0);
			}else{
				if(t_43==3){
					bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind1,414.0,346.0,0);
					bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind3,20.0,10.0,0);
				}
			}
			bb_graphics_SetAlpha(1.0);
		}else{
			if(t_41==3){
				bb_graphics_SetAlpha(c_Game_Volleyball.m_Alpha_IndL);
				var t_44=c_Game_Volleyball.m_Upravlenie;
				if(t_44==1){
					bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind2,6.0,346.0,0);
					bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind3,20.0,10.0,0);
				}else{
					if(t_44==3){
						bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind1,6.0,346.0,0);
						bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind3,20.0,10.0,0);
					}
				}
				bb_graphics_SetAlpha(1.0);
				bb_graphics_SetAlpha(c_Game_Volleyball.m_Alpha_IndP);
				var t_45=c_Game_Volleyball.m_Upravlenie;
				if(t_45==1){
					bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind2,414.0,346.0,0);
					bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind3,700.0,10.0,0);
				}else{
					if(t_45==3){
						bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind1,414.0,346.0,0);
						bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Ind3,700.0,10.0,0);
					}
				}
				bb_graphics_SetAlpha(1.0);
			}
		}
	}
	bb_graphics_SetAlpha(0.9);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_DT,388.0,5.0,0);
	var t_46=c_Game_Volleyball.m_Poz_Player;
	if(t_46==1){
		var t_D_TRez_P=((Math.floor((c_Game_Volleyball.m_TRez_P/10)|0))|0);
		var t_E_TRez_P=c_Game_Volleyball.m_TRez_P-t_D_TRez_P*10;
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_P],338.0,5.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_P],363.0,5.0,0);
		var t_D_TRez_B=((Math.floor((c_Game_Volleyball.m_TRez_B/10)|0))|0);
		var t_E_TRez_B=c_Game_Volleyball.m_TRez_B-t_D_TRez_B*10;
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_B],413.0,5.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_B],438.0,5.0,0);
	}else{
		if(t_46==2){
			var t_D_TRez_B2=((Math.floor((c_Game_Volleyball.m_TRez_B/10)|0))|0);
			var t_E_TRez_B2=c_Game_Volleyball.m_TRez_B-t_D_TRez_B2*10;
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_B2],338.0,5.0,0);
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_B2],363.0,5.0,0);
			var t_D_TRez_P2=((Math.floor((c_Game_Volleyball.m_TRez_P/10)|0))|0);
			var t_E_TRez_P2=c_Game_Volleyball.m_TRez_P-t_D_TRez_P2*10;
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_P2],413.0,5.0,0);
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_P2],438.0,5.0,0);
		}else{
			if(t_46==3){
				var t_D_Rez_LI=((Math.floor((c_Game_Volleyball.m_Rez_LI/10)|0))|0);
				var t_E_Rez_LI=c_Game_Volleyball.m_Rez_LI-t_D_Rez_LI*10;
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Rez_LI],338.0,5.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Rez_LI],363.0,5.0,0);
				var t_D_Rez_PI=((Math.floor((c_Game_Volleyball.m_Rez_PI/10)|0))|0);
				var t_E_Rez_PI=c_Game_Volleyball.m_Rez_PI-t_D_Rez_PI*10;
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Rez_PI],413.0,5.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Rez_PI],438.0,5.0,0);
			}
		}
	}
	bb_graphics_SetAlpha(1.0);
	var t_D_Arsenal=((Math.floor((c_Game_Volleyball.m_Arsenal/10)|0))|0);
	var t_E_Arsenal=c_Game_Volleyball.m_Arsenal-t_D_Arsenal*10;
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Arsenal],632.0,428.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Arsenal],657.0,428.0,0);
	var t_D_Timer_B=((Math.floor((c_Game_Volleyball.m_Timer_B/10)|0))|0);
	var t_E_Timer_B=c_Game_Volleyball.m_Timer_B-t_D_Timer_B*10;
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Timer_B],732.0,428.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Timer_B],757.0,428.0,0);
	if(c_Game_Volleyball.m_Y_Bomb<-20.0){
		bb_graphics_SetAlpha(0.9);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_UkB,c_Game_Volleyball.m_X_Bomb,0.0,0);
		bb_graphics_SetAlpha(1.0);
	}
	if(c_Game_Volleyball.m_Vzriv_C>0){
		for(var t_Nv=0;t_Nv<=149;t_Nv=t_Nv+1){
			if(c_Game_Volleyball.m_Vzriv_Y[t_Nv]<380.0){
				bb_graphics_SetAlpha(c_Game_Volleyball.m_Vzriv_A[t_Nv]);
				bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Vzriv[((c_Game_Volleyball.m_Vzriv_NC[t_Nv])|0)],c_Game_Volleyball.m_Vzriv_X[t_Nv],c_Game_Volleyball.m_Vzriv_Y[t_Nv],c_Game_Volleyball.m_Vzriv_TU[t_Nv],c_Game_Volleyball.m_Vzriv_R[t_Nv],c_Game_Volleyball.m_Vzriv_R[t_Nv],0);
				bb_graphics_SetAlpha(1.0);
			}
		}
		if(c_Game_Volleyball.m_Vzriv_C>96){
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Vvzriv,c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0.0,2.5,2.5,0);
		}
	}
	if(c_Game_Volleyball.m_Flag_Game==3){
		if(c_Game_Volleyball.m_Poz_Player<3){
			if(c_Game_Volleyball.m_TRez_P>c_Game_Volleyball.m_TRez_B){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Won,178.0,55.0,0);
			}
			if(c_Game_Volleyball.m_TRez_P<c_Game_Volleyball.m_TRez_B){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Lost,186.0,55.0,0);
			}
			if(c_Game_Volleyball.m_TRez_P==c_Game_Volleyball.m_TRez_B){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Draw,258.0,55.0,0);
			}
		}
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Tap,163.0,155.0,0);
	}
	if(c_Game_Volleyball.m_Flag_Game==4){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Quit,200.0,50.0,0);
	}
	return 0;
}
c_Game_Volleyball.m_Vizual_EndGame=function(){
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Zastavka,0.0,0.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Play,308.0,173.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Settings,240.0,247.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Help,307.0,325.0,0);
	bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen);
	var t_47=c_Game_Volleyball.m_Flag_Fon;
	if(t_47==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Nebo,0.0,0.0,0);
		for(var t_C=0;t_C<=19;t_C=t_C+1){
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen*c_Game_Volleyball.m_Fire1_A[t_C]/2.0);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Fire,c_Game_Volleyball.m_Fire1_X[t_C],c_Game_Volleyball.m_Fire1_Y[t_C],(t_C*15),c_Game_Volleyball.m_Fire1_R[t_C],c_Game_Volleyball.m_Fire1_R[t_C],0);
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen*c_Game_Volleyball.m_Fire2_A[t_C]/2.0);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Fire,c_Game_Volleyball.m_Fire2_X[t_C],c_Game_Volleyball.m_Fire2_Y[t_C],(t_C*15),c_Game_Volleyball.m_Fire2_R[t_C],c_Game_Volleyball.m_Fire2_R[t_C],0);
		}
		bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen);
		for(var t_C2=0;t_C2<=19;t_C2=t_C2+1){
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen*c_Game_Volleyball.m_Smok1_A[t_C2]/2.0);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Smok,c_Game_Volleyball.m_Smok1_X[t_C2],c_Game_Volleyball.m_Smok1_Y[t_C2],(t_C2*15),c_Game_Volleyball.m_Smok1_R[t_C2],c_Game_Volleyball.m_Smok1_R[t_C2],0);
			bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen*c_Game_Volleyball.m_Smok2_A[t_C2]/2.0);
			bb_graphics_DrawImage2(c_Game_Volleyball.m_Im_Smok,c_Game_Volleyball.m_Smok2_X[t_C2],c_Game_Volleyball.m_Smok2_Y[t_C2],(t_C2*15),c_Game_Volleyball.m_Smok2_R[t_C2],c_Game_Volleyball.m_Smok2_R[t_C2],0);
		}
		bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon,0.0,126.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[9],384.0,206.0,0);
	}else{
		if(t_47==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon_Space,0.0,0.0,0);
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[9],384.0,206.0,0);
		}else{
			if(t_47==2){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Fon_Gora,0.0,0.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Setka[9],384.0,206.0,0);
			}
		}
	}
	bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen*0.6);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobT,c_Game_Volleyball.m_X_RL,367.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobT,c_Game_Volleyball.m_X_RP,367.0,0);
	bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobL[c_Game_Volleyball.m_Frame_RL],c_Game_Volleyball.m_X_RL,c_Game_Volleyball.m_Y_RL,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_RobP[c_Game_Volleyball.m_Frame_RP],c_Game_Volleyball.m_X_RP,c_Game_Volleyball.m_Y_RP,0);
	bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen*0.6);
	if(c_Game_Volleyball.m_Flag_Game==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombT,c_Game_Volleyball.m_X_Bomb,367.0,0);
	}
	bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen);
	var t_48=c_Game_Volleyball.m_Anim_Bomb;
	if(t_48==0){
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Bomb[c_Game_Volleyball.m_Frame_Bomb],c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0);
	}else{
		if(t_48==1){
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[c_Game_Volleyball.m_Frame_Bomb],c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0);
		}else{
			if(t_48==2){
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_BombL[c_Game_Volleyball.m_Frame_Bomb],c_Game_Volleyball.m_X_Bomb,c_Game_Volleyball.m_Y_Bomb,0);
			}
		}
	}
	bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen*0.9);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_DT,388.0,5.0,0);
	var t_49=c_Game_Volleyball.m_Poz_Player;
	if(t_49==1){
		var t_D_TRez_P=((Math.floor((c_Game_Volleyball.m_TRez_P/10)|0))|0);
		var t_E_TRez_P=c_Game_Volleyball.m_TRez_P-t_D_TRez_P*10;
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_P],338.0,5.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_P],363.0,5.0,0);
		var t_D_TRez_B=((Math.floor((c_Game_Volleyball.m_TRez_B/10)|0))|0);
		var t_E_TRez_B=c_Game_Volleyball.m_TRez_B-t_D_TRez_B*10;
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_B],413.0,5.0,0);
		bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_B],438.0,5.0,0);
	}else{
		if(t_49==2){
			var t_D_TRez_B2=((Math.floor((c_Game_Volleyball.m_TRez_B/10)|0))|0);
			var t_E_TRez_B2=c_Game_Volleyball.m_TRez_B-t_D_TRez_B2*10;
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_B2],338.0,5.0,0);
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_B2],363.0,5.0,0);
			var t_D_TRez_P2=((Math.floor((c_Game_Volleyball.m_TRez_P/10)|0))|0);
			var t_E_TRez_P2=c_Game_Volleyball.m_TRez_P-t_D_TRez_P2*10;
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_TRez_P2],413.0,5.0,0);
			bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_TRez_P2],438.0,5.0,0);
		}else{
			if(t_49==3){
				var t_D_Rez_LI=((Math.floor((c_Game_Volleyball.m_Rez_LI/10)|0))|0);
				var t_E_Rez_LI=c_Game_Volleyball.m_Rez_LI-t_D_Rez_LI*10;
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Rez_LI],338.0,5.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Rez_LI],363.0,5.0,0);
				var t_D_Rez_PI=((Math.floor((c_Game_Volleyball.m_Rez_PI/10)|0))|0);
				var t_E_Rez_PI=c_Game_Volleyball.m_Rez_PI-t_D_Rez_PI*10;
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Rez_PI],413.0,5.0,0);
				bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Rez_PI],438.0,5.0,0);
			}
		}
	}
	bb_graphics_SetAlpha(c_Game_Volleyball.m_Proz_Screen);
	var t_D_Arsenal=((Math.floor((c_Game_Volleyball.m_Arsenal/10)|0))|0);
	var t_E_Arsenal=c_Game_Volleyball.m_Arsenal-t_D_Arsenal*10;
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Arsenal],632.0,428.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Arsenal],657.0,428.0,0);
	var t_D_Timer_B=((Math.floor((c_Game_Volleyball.m_Timer_B/10)|0))|0);
	var t_E_Timer_B=c_Game_Volleyball.m_Timer_B-t_D_Timer_B*10;
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_D_Timer_B],732.0,428.0,0);
	bb_graphics_DrawImage(c_Game_Volleyball.m_Im_Cifra2[t_E_Timer_B],757.0,428.0,0);
	bb_graphics_SetAlpha(1.0);
	return 0;
}
c_Game_Volleyball.prototype.p_OnRender=function(){
	bb_graphics_PushMatrix();
	bb_graphics_Scale(c_Game_Volleyball.m_RX_Ekr,c_Game_Volleyball.m_RY_Ekr);
	bb_graphics_Cls(10.0,10.0,10.0);
	var t_2=c_Game_Volleyball.m_Regim;
	if(t_2==0){
		c_Game_Volleyball.m_Vizual_Zastavka();
	}else{
		if(t_2==1){
			c_Game_Volleyball.m_Vizual_GlMeny();
		}else{
			if(t_2==2){
				c_Game_Volleyball.m_Vizual_Settings();
			}else{
				if(t_2==3){
					c_Game_Volleyball.m_Vizual_Help();
				}else{
					if(t_2==4){
						c_Game_Volleyball.m_Vizual_NachGame();
					}else{
						if(t_2==5){
							c_Game_Volleyball.m_Vizual_Game();
						}else{
							if(t_2==6){
								c_Game_Volleyball.m_Vizual_EndGame();
							}
						}
					}
				}
			}
		}
	}
	bb_graphics_PopMatrix();
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	this.m__graphics=(new gxtkGraphics);
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	bb_graphics_SetFont(null);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app_ValidateDeviceWindow(false);
	bb_app_EnumDisplayModes();
	bb_app__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	bb_app_ValidateDeviceWindow(true);
	this.m__input.p_BeginUpdate();
	bb_app__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	bb_app_ValidateDeviceWindow(true);
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics_BeginRender();
	}
	if(t_mode==2){
		bb_app__app.p_OnLoading();
	}else{
		bb_app__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics_EndRender();
	}
	this.m__graphics.EndRender();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	this.m__input.p_KeyEvent(t_event,t_data);
	if(t_event!=1){
		return;
	}
	var t_1=t_data;
	if(t_1==432){
		bb_app__app.p_OnClose();
	}else{
		if(t_1==416){
			bb_app__app.p_OnBack();
		}
	}
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	this.m__graphics.DiscardGraphics();
}
c_GameDelegate.prototype.FileDropEvent=function(t_filename){
	bb_app__app.p_OnFileDrop(t_filename);
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	c_Game_Volleyball.m_new.call(new c_Game_Volleyball);
	return 0;
}
function c_ConstInfo(){
	Object.call(this);
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	return this;
}
c_Stack.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push(t_values[t_offset+t_i]);
	}
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
}
c_Stack.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_FieldInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__type=null;
}
c_FieldInfo.m_new=function(t_name,t_attrs,t_type){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__type=t_type;
	return this;
}
c_FieldInfo.m_new2=function(){
	return this;
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	return this;
}
c_Stack2.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push4(t_values[t_offset+t_i]);
	}
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
}
c_Stack2.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_GlobalInfo(){
	Object.call(this);
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	return this;
}
c_Stack3.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack3.prototype.p_Push7=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push7(t_values[t_offset+t_i]);
	}
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
}
c_Stack3.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_MethodInfo(){
	Object.call(this);
	this.m__name="";
	this.m__attrs=0;
	this.m__retType=null;
	this.m__argTypes=[];
}
c_MethodInfo.m_new=function(t_name,t_attrs,t_retType,t_argTypes){
	this.m__name=t_name;
	this.m__attrs=t_attrs;
	this.m__retType=t_retType;
	this.m__argTypes=t_argTypes;
	return this;
}
c_MethodInfo.m_new2=function(){
	return this;
}
function c_Stack4(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack4.m_new=function(){
	return this;
}
c_Stack4.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack4.prototype.p_Push10=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack4.prototype.p_Push11=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push10(t_values[t_offset+t_i]);
	}
}
c_Stack4.prototype.p_Push12=function(t_values,t_offset){
	this.p_Push11(t_values,t_offset,t_values.length-t_offset);
}
c_Stack4.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	return this;
}
c_Stack5.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack5.prototype.p_Push13=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack5.prototype.p_Push14=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push13(t_values[t_offset+t_i]);
	}
}
c_Stack5.prototype.p_Push15=function(t_values,t_offset){
	this.p_Push14(t_values,t_offset,t_values.length-t_offset);
}
c_Stack5.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_R18(){
	c_FieldInfo.call(this);
}
c_R18.prototype=extend_class(c_FieldInfo);
c_R18.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__boolClass);
	return this;
}
function c_R20(){
	c_MethodInfo.call(this);
}
c_R20.prototype=extend_class(c_MethodInfo);
c_R20.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToBool",0,bb_reflection__boolClass,[]);
	return this;
}
function c_R21(){
	c_MethodInfo.call(this);
}
c_R21.prototype=extend_class(c_MethodInfo);
c_R21.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[1]]);
	return this;
}
function c_R19(){
	c_FunctionInfo.call(this);
}
c_R19.prototype=extend_class(c_FunctionInfo);
c_R19.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[1],[bb_reflection__boolClass]);
	return this;
}
function c_R22(){
	c_FunctionInfo.call(this);
}
c_R22.prototype=extend_class(c_FunctionInfo);
c_R22.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[1],[]);
	return this;
}
function c_R24(){
	c_FieldInfo.call(this);
}
c_R24.prototype=extend_class(c_FieldInfo);
c_R24.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__intClass);
	return this;
}
function c_R27(){
	c_MethodInfo.call(this);
}
c_R27.prototype=extend_class(c_MethodInfo);
c_R27.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToInt",0,bb_reflection__intClass,[]);
	return this;
}
function c_R28(){
	c_MethodInfo.call(this);
}
c_R28.prototype=extend_class(c_MethodInfo);
c_R28.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToFloat",0,bb_reflection__floatClass,[]);
	return this;
}
function c_R29(){
	c_MethodInfo.call(this);
}
c_R29.prototype=extend_class(c_MethodInfo);
c_R29.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[]);
	return this;
}
function c_R30(){
	c_MethodInfo.call(this);
}
c_R30.prototype=extend_class(c_MethodInfo);
c_R30.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[2]]);
	return this;
}
function c_R31(){
	c_MethodInfo.call(this);
}
c_R31.prototype=extend_class(c_MethodInfo);
c_R31.m_new=function(){
	c_MethodInfo.m_new.call(this,"Compare",0,bb_reflection__intClass,[bb_reflection__classes[2]]);
	return this;
}
function c_R25(){
	c_FunctionInfo.call(this);
}
c_R25.prototype=extend_class(c_FunctionInfo);
c_R25.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[2],[bb_reflection__intClass]);
	return this;
}
function c_R26(){
	c_FunctionInfo.call(this);
}
c_R26.prototype=extend_class(c_FunctionInfo);
c_R26.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[2],[bb_reflection__floatClass]);
	return this;
}
function c_R32(){
	c_FunctionInfo.call(this);
}
c_R32.prototype=extend_class(c_FunctionInfo);
c_R32.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[2],[]);
	return this;
}
function c_R34(){
	c_FieldInfo.call(this);
}
c_R34.prototype=extend_class(c_FieldInfo);
c_R34.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__floatClass);
	return this;
}
function c_R37(){
	c_MethodInfo.call(this);
}
c_R37.prototype=extend_class(c_MethodInfo);
c_R37.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToInt",0,bb_reflection__intClass,[]);
	return this;
}
function c_R38(){
	c_MethodInfo.call(this);
}
c_R38.prototype=extend_class(c_MethodInfo);
c_R38.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToFloat",0,bb_reflection__floatClass,[]);
	return this;
}
function c_R39(){
	c_MethodInfo.call(this);
}
c_R39.prototype=extend_class(c_MethodInfo);
c_R39.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[]);
	return this;
}
function c_R40(){
	c_MethodInfo.call(this);
}
c_R40.prototype=extend_class(c_MethodInfo);
c_R40.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[3]]);
	return this;
}
function c_R41(){
	c_MethodInfo.call(this);
}
c_R41.prototype=extend_class(c_MethodInfo);
c_R41.m_new=function(){
	c_MethodInfo.m_new.call(this,"Compare",0,bb_reflection__intClass,[bb_reflection__classes[3]]);
	return this;
}
function c_R35(){
	c_FunctionInfo.call(this);
}
c_R35.prototype=extend_class(c_FunctionInfo);
c_R35.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[3],[bb_reflection__intClass]);
	return this;
}
function c_R36(){
	c_FunctionInfo.call(this);
}
c_R36.prototype=extend_class(c_FunctionInfo);
c_R36.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[3],[bb_reflection__floatClass]);
	return this;
}
function c_R42(){
	c_FunctionInfo.call(this);
}
c_R42.prototype=extend_class(c_FunctionInfo);
c_R42.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[3],[]);
	return this;
}
function c_R44(){
	c_FieldInfo.call(this);
}
c_R44.prototype=extend_class(c_FieldInfo);
c_R44.m_new=function(){
	c_FieldInfo.m_new.call(this,"value",0,bb_reflection__stringClass);
	return this;
}
function c_R48(){
	c_MethodInfo.call(this);
}
c_R48.prototype=extend_class(c_MethodInfo);
c_R48.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[]);
	return this;
}
function c_R49(){
	c_MethodInfo.call(this);
}
c_R49.prototype=extend_class(c_MethodInfo);
c_R49.m_new=function(){
	c_MethodInfo.m_new.call(this,"Equals",0,bb_reflection__boolClass,[bb_reflection__classes[4]]);
	return this;
}
function c_R50(){
	c_MethodInfo.call(this);
}
c_R50.prototype=extend_class(c_MethodInfo);
c_R50.m_new=function(){
	c_MethodInfo.m_new.call(this,"Compare",0,bb_reflection__intClass,[bb_reflection__classes[4]]);
	return this;
}
function c_R45(){
	c_FunctionInfo.call(this);
}
c_R45.prototype=extend_class(c_FunctionInfo);
c_R45.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[4],[bb_reflection__intClass]);
	return this;
}
function c_R46(){
	c_FunctionInfo.call(this);
}
c_R46.prototype=extend_class(c_FunctionInfo);
c_R46.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[4],[bb_reflection__floatClass]);
	return this;
}
function c_R47(){
	c_FunctionInfo.call(this);
}
c_R47.prototype=extend_class(c_FunctionInfo);
c_R47.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[4],[bb_reflection__stringClass]);
	return this;
}
function c_R51(){
	c_FunctionInfo.call(this);
}
c_R51.prototype=extend_class(c_FunctionInfo);
c_R51.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[4],[]);
	return this;
}
function c_R54(){
	c_FieldInfo.call(this);
}
c_R54.prototype=extend_class(c_FieldInfo);
c_R54.m_new=function(){
	c_FieldInfo.m_new.call(this,"message",2,bb_reflection__stringClass);
	return this;
}
function c_R55(){
	c_FieldInfo.call(this);
}
c_R55.prototype=extend_class(c_FieldInfo);
c_R55.m_new=function(){
	c_FieldInfo.m_new.call(this,"cause",2,bb_reflection__classes[5]);
	return this;
}
function c_R56(){
	c_FieldInfo.call(this);
}
c_R56.prototype=extend_class(c_FieldInfo);
c_R56.m_new=function(){
	c_FieldInfo.m_new.call(this,"type",2,bb_reflection__stringClass);
	return this;
}
function c_R57(){
	c_FieldInfo.call(this);
}
c_R57.prototype=extend_class(c_FieldInfo);
c_R57.m_new=function(){
	c_FieldInfo.m_new.call(this,"fullType",2,bb_reflection__stringClass);
	return this;
}
function c_R58(){
	c_MethodInfo.call(this);
}
c_R58.prototype=extend_class(c_MethodInfo);
c_R58.m_new=function(){
	c_MethodInfo.m_new.call(this,"Message",8,bb_reflection__stringClass,[]);
	return this;
}
function c_R59(){
	c_MethodInfo.call(this);
}
c_R59.prototype=extend_class(c_MethodInfo);
c_R59.m_new=function(){
	c_MethodInfo.m_new.call(this,"Message",8,null,[bb_reflection__stringClass]);
	return this;
}
function c_R60(){
	c_MethodInfo.call(this);
}
c_R60.prototype=extend_class(c_MethodInfo);
c_R60.m_new=function(){
	c_MethodInfo.m_new.call(this,"Cause",8,bb_reflection__classes[5],[]);
	return this;
}
function c_R61(){
	c_MethodInfo.call(this);
}
c_R61.prototype=extend_class(c_MethodInfo);
c_R61.m_new=function(){
	c_MethodInfo.m_new.call(this,"Cause",8,null,[bb_reflection__classes[5]]);
	return this;
}
function c_R62(){
	c_MethodInfo.call(this);
}
c_R62.prototype=extend_class(c_MethodInfo);
c_R62.m_new=function(){
	c_MethodInfo.m_new.call(this,"Type",8,bb_reflection__stringClass,[]);
	return this;
}
function c_R63(){
	c_MethodInfo.call(this);
}
c_R63.prototype=extend_class(c_MethodInfo);
c_R63.m_new=function(){
	c_MethodInfo.m_new.call(this,"FullType",8,bb_reflection__stringClass,[]);
	return this;
}
function c_R65(){
	c_MethodInfo.call(this);
}
c_R65.prototype=extend_class(c_MethodInfo);
c_R65.m_new=function(){
	c_MethodInfo.m_new.call(this,"ToString",0,bb_reflection__stringClass,[bb_reflection__boolClass]);
	return this;
}
function c_R64(){
	c_FunctionInfo.call(this);
}
c_R64.prototype=extend_class(c_FunctionInfo);
c_R64.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[6],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R67(){
	c_FunctionInfo.call(this);
}
c_R67.prototype=extend_class(c_FunctionInfo);
c_R67.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[7],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R69(){
	c_FunctionInfo.call(this);
}
c_R69.prototype=extend_class(c_FunctionInfo);
c_R69.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[8],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R71(){
	c_FunctionInfo.call(this);
}
c_R71.prototype=extend_class(c_FunctionInfo);
c_R71.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[9],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R73(){
	c_FunctionInfo.call(this);
}
c_R73.prototype=extend_class(c_FunctionInfo);
c_R73.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[10],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R75(){
	c_FunctionInfo.call(this);
}
c_R75.prototype=extend_class(c_FunctionInfo);
c_R75.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[11],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R77(){
	c_FunctionInfo.call(this);
}
c_R77.prototype=extend_class(c_FunctionInfo);
c_R77.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[12],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_R79(){
	c_FunctionInfo.call(this);
}
c_R79.prototype=extend_class(c_FunctionInfo);
c_R79.m_new=function(){
	c_FunctionInfo.m_new.call(this,"new",0,bb_reflection__classes[13],[bb_reflection__stringClass,bb_reflection__classes[5]]);
	return this;
}
function c_UnknownClass(){
	c_ClassInfo.call(this);
}
c_UnknownClass.prototype=extend_class(c_ClassInfo);
c_UnknownClass.m_new=function(){
	c_ClassInfo.m_new.call(this,"?",0,null,[]);
	return this;
}
var bb_reflection__unknownClass=null;
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	bb_graphics_device=t_dev;
	return 0;
}
function c_Font(){
	Object.call(this);
	this.m__pages=[];
	this.m__pageCount=0;
	this.m__firstChar=0;
	this.m__height=.0;
	this.m__charMap=c_IntMap.m_new.call(new c_IntMap);
}
c_Font.m_new=function(t_pages,t_pageCount,t_chars,t_firstChar,t_height){
	this.m__pages=t_pages;
	this.m__pageCount=t_pageCount;
	this.m__firstChar=t_firstChar;
	this.m__height=t_height;
	this.m__charMap=t_chars;
	return this;
}
c_Font.m_new2=function(){
	return this;
}
c_Font.m_Load=function(t_path,t_firstChar,t_numChars,t_padded){
	var t_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	var t__pages=new_object_array(1);
	t__pages[0]=t_image;
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	var t__pageCount=1;
	if(!((t_image)!=null)){
		return null;
	}
	var t_cellWidth=((t_image.p_Width()/t_numChars)|0);
	var t_cellHeight=t_image.p_Height();
	var t_glyphX=0;
	var t_glyphY=0;
	var t_glyphWidth=t_cellWidth;
	var t_glyphHeight=t_cellHeight;
	if(t_padded==true){
		t_glyphX+=1;
		t_glyphY+=1;
		t_glyphWidth-=2;
		t_glyphHeight-=2;
	}
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		var t_y=((t_i/t_w)|0);
		var t_x=t_i % t_w;
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		t__charMap.p_Add(t_firstChar+t_i,t_glyph);
	}
	return c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
}
c_Font.m_Load2=function(t_path,t_cellWidth,t_cellHeight,t_glyphX,t_glyphY,t_glyphWidth,t_glyphHeight,t_firstChar,t_numChars){
	var t_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	var t__pages=new_object_array(1);
	t__pages[0]=t_image;
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	var t__pageCount=1;
	if(!((t_image)!=null)){
		return null;
	}
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		var t_y=((t_i/t_w)|0);
		var t_x=t_i % t_w;
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		t__charMap.p_Add(t_firstChar+t_i,t_glyph);
	}
	return c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
}
c_Font.m_Load3=function(t_url,t_flags){
	var t_iniText="";
	var t_pageNum=0;
	var t_idnum=0;
	var t_tmpChar=null;
	var t_plLen=0;
	var t_lines=[];
	var t_filename="";
	var t_lineHeight=0;
	var t__pages=[];
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	var t__pageCount=0;
	var t_path="";
	if(t_url.indexOf("/",0)>-1){
		var t_pl=t_url.split("/");
		t_plLen=t_pl.length;
		for(var t_pi=0;t_pi<=t_plLen-2;t_pi=t_pi+1){
			t_path=t_path+t_pl[t_pi]+"/";
		}
	}
	if(t_url.indexOf(".txt",0)>0 || t_url.indexOf(".fnt",0)>0){
		t_iniText=bb_app_LoadString(t_url);
	}
	t_lines=t_iniText.split(String.fromCharCode(13)+String.fromCharCode(10));
	if(t_lines.length<2){
		t_lines=t_iniText.split(String.fromCharCode(10));
	}
	var t_=t_lines;
	var t_2=0;
	while(t_2<t_.length){
		var t_line=t_[t_2];
		t_2=t_2+1;
		t_line=string_trim(t_line);
		if(string_startswith(t_line,"info") || t_line==""){
			continue;
		}
		if(string_startswith(t_line,"padding")){
			continue;
		}
		if(string_startswith(t_line,"common")){
			var t_commondata=t_line.split(String.fromCharCode(32));
			var t_3=t_commondata;
			var t_4=0;
			while(t_4<t_3.length){
				var t_common=t_3[t_4];
				t_4=t_4+1;
				if(string_startswith(t_common,"lineHeight=")){
					var t_lnh=t_common.split("=");
					t_lnh[1]=string_trim(t_lnh[1]);
					t_lineHeight=parseInt((t_lnh[1]),10);
				}
				if(string_startswith(t_common,"pages=")){
					var t_lnh2=t_common.split("=");
					t_lnh2[1]=string_trim(t_lnh2[1]);
					t__pageCount=parseInt((t_lnh2[1]),10);
					t__pages=new_object_array(t__pageCount);
				}
			}
		}
		if(string_startswith(t_line,"page")){
			var t_pagedata=t_line.split(String.fromCharCode(32));
			var t_5=t_pagedata;
			var t_6=0;
			while(t_6<t_5.length){
				var t_data=t_5[t_6];
				t_6=t_6+1;
				if(string_startswith(t_data,"file=")){
					var t_fn=t_data.split("=");
					t_fn[1]=string_trim(t_fn[1]);
					t_filename=t_fn[1];
					if(t_filename.charCodeAt(0)==34){
						t_filename=t_filename.slice(1,t_filename.length-1);
					}
					t_filename=t_path+string_trim(t_filename);
					t__pages[t_pageNum]=bb_graphics_LoadImage(t_filename,1,t_flags);
					t_pageNum=t_pageNum+1;
				}
			}
		}
		if(string_startswith(t_line,"chars")){
			continue;
		}
		if(string_startswith(t_line,"char")){
			t_tmpChar=c_Glyph.m_new2.call(new c_Glyph);
			var t_linedata=t_line.split(String.fromCharCode(32));
			var t_7=t_linedata;
			var t_8=0;
			while(t_8<t_7.length){
				var t_data2=t_7[t_8];
				t_8=t_8+1;
				if(string_startswith(t_data2,"id=")){
					var t_idc=t_data2.split("=");
					t_idc[1]=string_trim(t_idc[1]);
					t_tmpChar.m_id=parseInt((t_idc[1]),10);
				}
				if(string_startswith(t_data2,"x=")){
					var t_xc=t_data2.split("=");
					t_xc[1]=string_trim(t_xc[1]);
					t_tmpChar.m_x=parseInt((t_xc[1]),10);
				}
				if(string_startswith(t_data2,"y=")){
					var t_yc=t_data2.split("=");
					t_yc[1]=string_trim(t_yc[1]);
					t_tmpChar.m_y=parseInt((t_yc[1]),10);
				}
				if(string_startswith(t_data2,"width=")){
					var t_wc=t_data2.split("=");
					t_wc[1]=string_trim(t_wc[1]);
					t_tmpChar.m_width=parseInt((t_wc[1]),10);
				}
				if(string_startswith(t_data2,"height=")){
					var t_hc=t_data2.split("=");
					t_hc[1]=string_trim(t_hc[1]);
					t_tmpChar.m_height=parseInt((t_hc[1]),10);
				}
				if(string_startswith(t_data2,"xoffset=")){
					var t_xoc=t_data2.split("=");
					t_xoc[1]=string_trim(t_xoc[1]);
					t_tmpChar.m_xoff=parseInt((t_xoc[1]),10);
				}
				if(string_startswith(t_data2,"yoffset=")){
					var t_yoc=t_data2.split("=");
					t_yoc[1]=string_trim(t_yoc[1]);
					t_tmpChar.m_yoff=parseInt((t_yoc[1]),10);
				}
				if(string_startswith(t_data2,"xadvance=")){
					var t_advc=t_data2.split("=");
					t_advc[1]=string_trim(t_advc[1]);
					t_tmpChar.m_advance=parseInt((t_advc[1]),10);
				}
				if(string_startswith(t_data2,"page=")){
					var t_advc2=t_data2.split("=");
					t_advc2[1]=string_trim(t_advc2[1]);
					t_tmpChar.m_page=parseInt((t_advc2[1]),10);
				}
			}
			t__charMap.p_Add(t_tmpChar.m_id,t_tmpChar);
		}
		continue;
	}
	return c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,-1,(t_lineHeight));
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	if((this.m_matDirty)!=0){
		bb_graphics_renderDevice.SetMatrix(bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty);
		this.m_matDirty=0;
	}
	return 0;
}
var bb_graphics_context=null;
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	this.m_tx=t_tx;
	this.m_ty=t_ty;
	this.m_flags=this.m_flags&-2;
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	this.m_flags=t_iflags;
	if((this.m_flags&2)!=0){
		var t_=this.m_frames;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			t_f.m_x+=1;
		}
		this.m_width-=2;
	}
	if((this.m_flags&4)!=0){
		var t_3=this.m_frames;
		var t_4=0;
		while(t_4<t_3.length){
			var t_f2=t_3[t_4];
			t_4=t_4+1;
			t_f2.m_y+=1;
		}
		this.m_height-=2;
	}
	if((this.m_flags&1)!=0){
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	if(this.m_frames.length==1 && this.m_frames[0].m_x==0 && this.m_frames[0].m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		this.m_flags|=65536;
	}
	return 0;
}
c_Image.prototype.p_Init2=function(t_surf,t_nframes,t_iflags){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	this.m_height=this.m_surface.Height();
	this.m_frames=new_object_array(t_nframes);
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Init3=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_source=t_src;
	this.m_width=t_iwidth;
	this.m_height=t_iheight;
	this.m_frames=new_object_array(t_nframes);
	var t_ix=t_x;
	var t_iy=t_y;
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		if(t_ix+this.m_width>t_srcw){
			t_ix=0;
			t_iy+=this.m_height;
		}
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			error("Image frame outside surface");
		}
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		t_ix+=this.m_width;
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Width=function(){
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	return this.m_height;
}
c_Image.prototype.p_GrabImage=function(t_x,t_y,t_width,t_height,t_nframes,t_flags){
	if(this.m_frames.length!=1){
		return null;
	}
	return (c_Image.m_new.call(new c_Image)).p_Init3(this.m_surface,t_x,t_y,t_width,t_height,t_nframes,t_flags,this,this.m_frames[0].m_x,this.m_frames[0].m_y,this.m_width,this.m_height);
}
function bb_data_FixDataPath(t_path){
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		return t_path;
	}
	return "cerberus://data/"+t_path;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Frame.m_new2=function(){
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init2(t_surf,t_frameCount,t_flags);
	}else{
		bb_lang_DebugLog("Error - Unable to load image: "+t_path);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init3(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
	}else{
		bb_lang_DebugLog("Error - Unable to load image: "+t_path);
	}
	return null;
}
function c_Glyph(){
	Object.call(this);
	this.m_page=0;
	this.m_id=0;
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
	this.m_height=0;
	this.m_advance=0;
	this.m_xoff=0;
	this.m_yoff=0;
}
c_Glyph.m_new=function(t_page,t_id,t_x,t_y,t_width,t_height,t_advance){
	this.m_page=t_page;
	this.m_id=t_id;
	this.m_x=t_x;
	this.m_y=t_y;
	this.m_width=t_width;
	this.m_height=t_height;
	this.m_advance=t_advance;
	this.m_xoff=0;
	this.m_yoff=0;
	return this;
}
c_Glyph.m_new2=function(){
	return this;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Compare5=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight2(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft2(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map2.prototype.p_Add=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare5(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return false;
			}
		}
	}
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup2(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_IntMap(){
	c_Map2.call(this);
}
c_IntMap.prototype=extend_class(c_Map2);
c_IntMap.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare5=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Node2(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
function bb_app_LoadString(t_path){
	return bb_app__game.LoadString(bb_data_FixDataPath(t_path));
}
function bb_graphics_SetFont(t_font){
	if(!((t_font)!=null)){
		if(!((bb_graphics_context.m_defaultFont)!=null)){
			bb_graphics_context.m_defaultFont=c_Font.m_Load("mojo_font.png",32,96,true);
		}
		t_font=bb_graphics_context.m_defaultFont;
	}
	bb_graphics_context.m_font=t_font;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	bb_audio_device=t_dev;
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__mouseZ=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__joyStates[t_i]=c_JoyState.m_new.call(new c_JoyState);
	}
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		return;
	}
	this.m__keyHit[t_key]+=1;
	this.m__keyHitQueue[this.m__keyHitPut]=t_key;
	this.m__keyHitPut+=1;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		var t_state=this.m__joyStates[t_i];
		if(!BBGame.Game().PollJoystick(t_i,t_state.m_joyx,t_state.m_joyy,t_state.m_joyz,t_state.m_buttons)){
			break;
		}
		for(var t_j=0;t_j<32;t_j=t_j+1){
			var t_key=256+t_i*32+t_j;
			if(t_state.m_buttons[t_j]){
				if(!this.m__keyDown[t_key]){
					this.m__keyDown[t_key]=true;
					this.p_PutKeyHit(t_key);
				}
			}else{
				this.m__keyDown[t_key]=false;
			}
		}
	}
}
c_InputDevice.prototype.p_EndUpdate=function(){
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		this.m__keyHit[this.m__keyHitQueue[t_i]]=0;
	}
	this.m__keyHitPut=0;
	this.m__charGet=0;
	this.m__charPut=0;
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	var t_1=t_event;
	if(t_1==1){
		if(!this.m__keyDown[t_data]){
			this.m__keyDown[t_data]=true;
			this.p_PutKeyHit(t_data);
			if(t_data==1){
				this.m__keyDown[384]=true;
				this.p_PutKeyHit(384);
			}else{
				if(t_data==384){
					this.m__keyDown[1]=true;
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		if(t_1==2){
			if(this.m__keyDown[t_data]){
				this.m__keyDown[t_data]=false;
				if(t_data==1){
					this.m__keyDown[384]=false;
				}else{
					if(t_data==384){
						this.m__keyDown[1]=false;
					}
				}
			}
		}else{
			if(t_1==3){
				if(this.m__charPut<this.m__charQueue.length){
					this.m__charQueue[this.m__charPut]=t_data;
					this.m__charPut+=1;
				}
			}
		}
	}
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_2=t_event;
	if(t_2==4){
		this.p_KeyEvent(1,1+t_data);
	}else{
		if(t_2==5){
			this.p_KeyEvent(2,1+t_data);
			return;
		}else{
			if(t_2==6){
			}else{
				return;
			}
		}
	}
	this.m__mouseX=t_x;
	this.m__mouseY=t_y;
	this.m__mouseZ=t_z;
	this.m__touchX[0]=t_x;
	this.m__touchY[0]=t_y;
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	var t_3=t_event;
	if(t_3==7){
		this.p_KeyEvent(1,384+t_data);
	}else{
		if(t_3==8){
			this.p_KeyEvent(2,384+t_data);
			return;
		}else{
			if(t_3==9){
			}else{
				return;
			}
		}
	}
	this.m__touchX[t_data]=t_x;
	this.m__touchY[t_data]=t_y;
	if(t_data==0){
		this.m__mouseX=t_x;
		this.m__mouseY=t_y;
	}
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_4=t_event;
	if(t_4==10){
	}else{
		return;
	}
	this.m__accelX=t_x;
	this.m__accelY=t_y;
	this.m__accelZ=t_z;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyHit[t_key];
	}
	return 0;
}
c_InputDevice.prototype.p_TouchX=function(t_index){
	if(t_index>=0 && t_index<32){
		return this.m__touchX[t_index];
	}
	return 0.0;
}
c_InputDevice.prototype.p_TouchY=function(t_index){
	if(t_index>=0 && t_index<32){
		return this.m__touchY[t_index];
	}
	return 0.0;
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyDown[t_key];
	}
	return false;
}
c_InputDevice.prototype.p_AccelX=function(){
	return this.m__accelX;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	bb_input_device=t_dev;
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
var bb_app__devWinWidth=0;
var bb_app__devWinHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	var t_winW=bb_app__game.GetDeviceWindowWidth();
	var t_winH=bb_app__game.GetDeviceWindowHeight();
	var t_w=bb_app__game.GetDeviceWidth();
	var t_h=bb_app__game.GetDeviceHeight();
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight && t_winW==bb_app__devWinWidth && t_winH==bb_app__devWinHeight){
		return;
	}
	bb_app__devWidth=t_w;
	bb_app__devHeight=t_h;
	bb_app__devWinWidth=t_winW;
	bb_app__devWinHeight=t_winH;
	if(t_notifyApp){
		bb_app__app.p_OnResize();
	}
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	this.m__width=t_width;
	this.m__height=t_height;
	return this;
}
c_DisplayMode.m_new2=function(){
	return this;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare5=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare5(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map3.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight3(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft3(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map3.prototype.p_Set2=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare5(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map3.prototype.p_Insert=function(t_key,t_value){
	return this.p_Set2(t_key,t_value);
}
function c_IntMap2(){
	c_Map3.call(this);
}
c_IntMap2.prototype=extend_class(c_Map3);
c_IntMap2.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_IntMap2.prototype.p_Compare5=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Stack6(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack6.m_new=function(){
	return this;
}
c_Stack6.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack6.prototype.p_Push16=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack6.prototype.p_Push17=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push16(t_values[t_offset+t_i]);
	}
}
c_Stack6.prototype.p_Push18=function(t_values,t_offset){
	this.p_Push17(t_values,t_offset,t_values.length-t_offset);
}
c_Stack6.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Node3(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	var t_modes=bb_app__game.GetDisplayModes();
	var t_mmap=c_IntMap2.m_new.call(new c_IntMap2);
	var t_mstack=c_Stack6.m_new.call(new c_Stack6);
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		var t_w=t_modes[t_i].width;
		var t_h=t_modes[t_i].height;
		var t_size=t_w<<16|t_h;
		if(t_mmap.p_Contains2(t_size)){
		}else{
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,t_modes[t_i].width,t_modes[t_i].height);
			t_mmap.p_Insert(t_size,t_mode);
			t_mstack.p_Push16(t_mode);
		}
	}
	bb_app__displayModes=t_mstack.p_ToArray();
	var t_mode2=bb_app__game.GetDesktopMode();
	if((t_mode2)!=null){
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,t_mode2.width,t_mode2.height);
	}else{
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics_context.m_ix=t_ix;
	bb_graphics_context.m_iy=t_iy;
	bb_graphics_context.m_jx=t_jx;
	bb_graphics_context.m_jy=t_jy;
	bb_graphics_context.m_tx=t_tx;
	bb_graphics_context.m_ty=t_ty;
	bb_graphics_context.m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	bb_graphics_context.m_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	bb_graphics_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	bb_graphics_context.m_color_r=t_r;
	bb_graphics_context.m_color_g=t_g;
	bb_graphics_context.m_color_b=t_b;
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_SetColor2(t_rgb){
	bb_graphics_context.m_color_r=(t_rgb>>16&255);
	bb_graphics_context.m_color_g=(t_rgb>>8&255);
	bb_graphics_context.m_color_b=(t_rgb&255);
	bb_graphics_renderDevice.SetColor(bb_graphics_context.m_color_r,bb_graphics_context.m_color_g,bb_graphics_context.m_color_b);
	return 0;
}
function c_Color(){
	Object.call(this);
	this.m_r=0;
	this.m_g=0;
	this.m_b=0;
}
function bb_graphics_SetColor3(t_col){
	bb_graphics_context.m_color_r=(t_col.m_r);
	bb_graphics_context.m_color_g=(t_col.m_g);
	bb_graphics_context.m_color_b=(t_col.m_b);
	bb_graphics_renderDevice.SetColor(bb_graphics_context.m_color_r,bb_graphics_context.m_color_g,bb_graphics_context.m_color_b);
	bb_graphics_renderDevice.SetAlpha(bb_graphics_context.m_alpha);
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	bb_graphics_context.m_alpha=t_alpha;
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	bb_graphics_context.m_blend=t_blend;
	bb_graphics_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics_context.m_scissor_x=t_x;
	bb_graphics_context.m_scissor_y=t_y;
	bb_graphics_context.m_scissor_width=t_width;
	bb_graphics_context.m_scissor_height=t_height;
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_device;
	bb_graphics_context.m_matrixSp=0;
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	error("");
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (bb_random_Seed>>8&16777215)/16777216.0;
}
function bb_random_Rnd2(t_low,t_high){
	return bb_random_Rnd3(t_high-t_low)+t_low;
}
function bb_random_Rnd3(t_range){
	return bb_random_Rnd()*t_range;
}
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
c_Sound.m_new=function(t_sample){
	this.m_sample=t_sample;
	return this;
}
c_Sound.m_new2=function(){
	return this;
}
function bb_audio_LoadSound(t_path){
	var t_sample=bb_audio_device.LoadSample(bb_data_FixDataPath(t_path));
	if((t_sample)!=null){
		return c_Sound.m_new.call(new c_Sound,t_sample);
	}
	return null;
}
function bb_app_LoadState(){
	return bb_app__game.LoadState();
}
function bb_app_SaveState(t_state){
	bb_app__game.SaveState(t_state);
}
function bb_functions_Mid(t_str,t_pos,t_size){
	if(t_pos>t_str.length){
		return "";
	}
	t_pos-=1;
	if(t_size<0){
		return t_str.slice(t_pos);
	}
	if(t_pos<0){
		t_size=t_size+t_pos;
		t_pos=0;
	}
	if(t_pos+t_size>t_str.length){
		t_size=t_str.length-t_pos;
	}
	return t_str.slice(t_pos,t_pos+t_size);
}
function bb_audio_PlayMusic(t_path,t_flags){
	return bb_audio_device.PlayMusic(bb_data_FixDataPath(t_path),t_flags);
}
function bb_math_Abs(t_x){
	if(t_x>=0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Abs2(t_x){
	if(t_x>=0.0){
		return t_x;
	}
	return -t_x;
}
function bb_input_TouchHit(t_index){
	return bb_input_device.p_KeyHit(384+t_index);
}
function bb_input_TouchX(t_index){
	return bb_input_device.p_TouchX(t_index);
}
function bb_input_TouchY(t_index){
	return bb_input_device.p_TouchY(t_index);
}
function bb_audio_PlaySound(t_sound,t_channel,t_flags){
	if(((t_sound)!=null) && ((t_sound.m_sample)!=null)){
		bb_audio_device.PlaySample(t_sound.m_sample,t_channel,t_flags);
	}
	return 0;
}
function bb_audio_StopMusic(){
	bb_audio_device.StopMusic();
	return 0;
}
function bb_input_KeyHit(t_key){
	return bb_input_device.p_KeyHit(t_key);
}
function bb_input_TouchDown(t_index){
	return ((bb_input_device.p_KeyDown(384+t_index))?1:0);
}
function bb_input_AccelX(){
	return bb_input_device.p_AccelX();
}
function bb_graphics_PushMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp;
	if(t_sp==bb_graphics_context.m_matrixStack.length){
		bb_graphics_context.m_matrixStack=resize_number_array(bb_graphics_context.m_matrixStack,t_sp*2);
	}
	bb_graphics_context.m_matrixStack[t_sp+0]=bb_graphics_context.m_ix;
	bb_graphics_context.m_matrixStack[t_sp+1]=bb_graphics_context.m_iy;
	bb_graphics_context.m_matrixStack[t_sp+2]=bb_graphics_context.m_jx;
	bb_graphics_context.m_matrixStack[t_sp+3]=bb_graphics_context.m_jy;
	bb_graphics_context.m_matrixStack[t_sp+4]=bb_graphics_context.m_tx;
	bb_graphics_context.m_matrixStack[t_sp+5]=bb_graphics_context.m_ty;
	bb_graphics_context.m_matrixSp=t_sp+6;
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*bb_graphics_context.m_ix+t_iy*bb_graphics_context.m_jx;
	var t_iy2=t_ix*bb_graphics_context.m_iy+t_iy*bb_graphics_context.m_jy;
	var t_jx2=t_jx*bb_graphics_context.m_ix+t_jy*bb_graphics_context.m_jx;
	var t_jy2=t_jx*bb_graphics_context.m_iy+t_jy*bb_graphics_context.m_jy;
	var t_tx2=t_tx*bb_graphics_context.m_ix+t_ty*bb_graphics_context.m_jx+bb_graphics_context.m_tx;
	var t_ty2=t_tx*bb_graphics_context.m_iy+t_ty*bb_graphics_context.m_jy+bb_graphics_context.m_ty;
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	return 0;
}
function bb_graphics_Transform2(t_m){
	bb_graphics_Transform(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_Cls2(t_col){
	bb_graphics_renderDevice.Cls((t_col.m_r),(t_col.m_g),(t_col.m_b));
	return 0;
}
function bb_graphics_Cls3(t_rgb){
	var t_r=t_rgb>>16&255;
	var t_g=t_rgb>>8&255;
	var t_b=t_rgb&255;
	bb_graphics_renderDevice.Cls((t_r),(t_g),(t_b));
	return 0;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	return 0;
}
function bb_graphics_Rotate(t_angle){
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics_PopMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.m_matrixStack[t_sp+0],bb_graphics_context.m_matrixStack[t_sp+1],bb_graphics_context.m_matrixStack[t_sp+2],bb_graphics_context.m_matrixStack[t_sp+3],bb_graphics_context.m_matrixStack[t_sp+4],bb_graphics_context.m_matrixStack[t_sp+5]);
	bb_graphics_context.m_matrixSp=t_sp;
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,0.0,0.0);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function bbInit(){
	bb_reflection__classesMap=null;
	bb_reflection__classes=[];
	bb_reflection__getClass=null;
	bb_reflection__boolClass=null;
	bb_reflection__intClass=null;
	bb_reflection__floatClass=null;
	bb_reflection__stringClass=null;
	bb_reflection__functions=[];
	bb_reflection__init=bb_reflection___init();
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_reflection__unknownClass=(c_UnknownClass.m_new.call(new c_UnknownClass));
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__devWinWidth=0;
	bb_app__devWinHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_app__updateRate=0;
	c_Game_Volleyball.m_RX_Ekr=.0;
	c_Game_Volleyball.m_RY_Ekr=.0;
	bb_random_Seed=1234;
	c_Game_Volleyball.m_Flag_End=0;
	c_Game_Volleyball.m_MassaRL=.0;
	c_Game_Volleyball.m_MassaRP=.0;
	c_Game_Volleyball.m_MassaB=.0;
	c_Game_Volleyball.m_SV_Bomb=0;
	c_Game_Volleyball.m_Grav=.0;
	c_Game_Volleyball.m_Y_Ekran=0;
	c_Game_Volleyball.m_X_NachF1=0;
	c_Game_Volleyball.m_Smok1_X=new_number_array(20);
	c_Game_Volleyball.m_Smok1_Y=new_number_array(20);
	c_Game_Volleyball.m_Smok1_R=new_number_array(20);
	c_Game_Volleyball.m_Smok1_A=new_number_array(20);
	c_Game_Volleyball.m_X_NachF2=0;
	c_Game_Volleyball.m_Smok2_X=new_number_array(20);
	c_Game_Volleyball.m_Smok2_Y=new_number_array(20);
	c_Game_Volleyball.m_Smok2_R=new_number_array(20);
	c_Game_Volleyball.m_Smok2_A=new_number_array(20);
	c_Game_Volleyball.m_Fire1_X=new_number_array(20);
	c_Game_Volleyball.m_Fire1_Y=new_number_array(20);
	c_Game_Volleyball.m_Fire1_R=new_number_array(20);
	c_Game_Volleyball.m_Fire1_A=new_number_array(20);
	c_Game_Volleyball.m_Fire2_X=new_number_array(20);
	c_Game_Volleyball.m_Fire2_Y=new_number_array(20);
	c_Game_Volleyball.m_Fire2_R=new_number_array(20);
	c_Game_Volleyball.m_Fire2_A=new_number_array(20);
	c_Game_Volleyball.m_Rekord_Player=new_number_array(16);
	c_Game_Volleyball.m_Rekord_Bot=new_number_array(16);
	c_Game_Volleyball.m_Atlas_Image1=null;
	c_Game_Volleyball.m_Atlas_Image2=null;
	c_Game_Volleyball.m_Atlas_Image3=null;
	c_Game_Volleyball.m_Atlas_Image4=null;
	c_Game_Volleyball.m_Atlas_Image5=null;
	c_Game_Volleyball.m_Atlas_Image6=null;
	c_Game_Volleyball.m_Atlas_Image7=null;
	c_Game_Volleyball.m_Im_Zastavka=null;
	c_Game_Volleyball.m_Im_Loading=null;
	c_Game_Volleyball.m_Im_EkNast=null;
	c_Game_Volleyball.m_Im_Play=null;
	c_Game_Volleyball.m_Im_Settings=null;
	c_Game_Volleyball.m_Im_Help=null;
	c_Game_Volleyball.m_Im_Cifra1=new_object_array(10);
	c_Game_Volleyball.m_ImT_Off=null;
	c_Game_Volleyball.m_ImT_On=null;
	c_Game_Volleyball.m_ImT_5=null;
	c_Game_Volleyball.m_ImT_10=null;
	c_Game_Volleyball.m_ImT_15=null;
	c_Game_Volleyball.m_ImT_20=null;
	c_Game_Volleyball.m_ImT_25=null;
	c_Game_Volleyball.m_ImT_Easy=null;
	c_Game_Volleyball.m_ImT_Medium=null;
	c_Game_Volleyball.m_ImT_Hard=null;
	c_Game_Volleyball.m_ImT_Slider=null;
	c_Game_Volleyball.m_ImT_Arrows=null;
	c_Game_Volleyball.m_ImT_Accelerometer=null;
	c_Game_Volleyball.m_ImT_Left=null;
	c_Game_Volleyball.m_ImT_Right=null;
	c_Game_Volleyball.m_ImT_2Play=null;
	c_Game_Volleyball.m_Im_Ind1=null;
	c_Game_Volleyball.m_Im_Ind2=null;
	c_Game_Volleyball.m_Im_Ind3=null;
	c_Game_Volleyball.m_Im_Cifra2=new_object_array(10);
	c_Game_Volleyball.m_Im_DT=null;
	c_Game_Volleyball.m_ImT_15s=null;
	c_Game_Volleyball.m_ImT_30s=null;
	c_Game_Volleyball.m_ImT_45s=null;
	c_Game_Volleyball.m_ImT_60s=null;
	c_Game_Volleyball.m_ImT_75s=null;
	c_Game_Volleyball.m_ImT_90s=null;
	c_Game_Volleyball.m_ImT_Ruin=null;
	c_Game_Volleyball.m_ImT_Space=null;
	c_Game_Volleyball.m_ImT_Mountain=null;
	c_Game_Volleyball.m_Im_Fon=null;
	c_Game_Volleyball.m_Im_Nebo=null;
	c_Game_Volleyball.m_Im_EkHelp=null;
	c_Game_Volleyball.m_Im_UkB=null;
	c_Game_Volleyball.m_Im_RobL=new_object_array(12);
	c_Game_Volleyball.m_Im_RobP=new_object_array(12);
	c_Game_Volleyball.m_Im_Quit=null;
	c_Game_Volleyball.m_Im_Tap=null;
	c_Game_Volleyball.m_Im_More_Games=null;
	c_Game_Volleyball.m_Im_Bomb=new_object_array(5);
	c_Game_Volleyball.m_Im_BombL=new_object_array(36);
	c_Game_Volleyball.m_Im_Lost=null;
	c_Game_Volleyball.m_Im_Won=null;
	c_Game_Volleyball.m_Im_Draw=null;
	c_Game_Volleyball.m_Im_Fire=null;
	c_Game_Volleyball.m_Im_Smok=null;
	c_Game_Volleyball.m_Im_RobT=null;
	c_Game_Volleyball.m_Im_BombT=null;
	c_Game_Volleyball.m_Im_Vzriv=new_object_array(3);
	c_Game_Volleyball.m_Im_Vvzriv=null;
	c_Game_Volleyball.m_Im_Setka=new_object_array(10);
	c_Game_Volleyball.m_Im_Razriad=null;
	c_Game_Volleyball.m_Im_Fon_Space=null;
	c_Game_Volleyball.m_Im_Fon_Gora=null;
	c_Game_Volleyball.m_Zv_Click=null;
	c_Game_Volleyball.m_Zv_Udar=null;
	c_Game_Volleyball.m_Zv_Bomb=null;
	c_Game_Volleyball.m_Zv_Razriad=null;
	c_Game_Volleyball.m_Zv_Otskok=null;
	c_Game_Volleyball.m_Kol_Bomb=0;
	c_Game_Volleyball.m_Slojno=0;
	c_Game_Volleyball.m_Nach_TB=0;
	c_Game_Volleyball.m_Poz_Player=0;
	c_Game_Volleyball.m_Flag_Sound=0;
	c_Game_Volleyball.m_Flag_Music=0;
	c_Game_Volleyball.m_Flag_Fon=0;
	c_Game_Volleyball.m_Regim=0;
	c_Game_Volleyball.m_Progrev_On=0;
	c_Game_Volleyball.m_Proz_Screen=.0;
	c_Game_Volleyball.m_Flag_Help=0;
	c_Game_Volleyball.m_X_Bomb=.0;
	c_Game_Volleyball.m_Anim_DRL=0;
	c_Game_Volleyball.m_Anim_PRL=0;
	c_Game_Volleyball.m_Frame_RL=0;
	c_Game_Volleyball.m_X_RL=.0;
	c_Game_Volleyball.m_Y_RL=.0;
	c_Game_Volleyball.m_Sm_XRL=.0;
	c_Game_Volleyball.m_Sm_YRL=.0;
	c_Game_Volleyball.m_U_RL=0;
	c_Game_Volleyball.m_Anim_PRP=0;
	c_Game_Volleyball.m_Anim_DRP=0;
	c_Game_Volleyball.m_Frame_RP=0;
	c_Game_Volleyball.m_X_RP=.0;
	c_Game_Volleyball.m_Y_RP=.0;
	c_Game_Volleyball.m_Sm_XRP=.0;
	c_Game_Volleyball.m_Sm_YRP=.0;
	c_Game_Volleyball.m_U_RP=0;
	c_Game_Volleyball.m_Kol_UL=0;
	c_Game_Volleyball.m_Kol_UP=0;
	c_Game_Volleyball.m_Anim_Bomb=0;
	c_Game_Volleyball.m_Frame_Bomb=0;
	c_Game_Volleyball.m_Sm_XB=.0;
	c_Game_Volleyball.m_Sm_YB=.0;
	c_Game_Volleyball.m_Y_Bomb=.0;
	c_Game_Volleyball.m_Arsenal=0;
	c_Game_Volleyball.m_Zad_Sek=0;
	c_Game_Volleyball.m_Timer_B=0;
	c_Game_Volleyball.m_TRez_P=0;
	c_Game_Volleyball.m_TRez_B=0;
	c_Game_Volleyball.m_Rez_LI=0;
	c_Game_Volleyball.m_Rez_PI=0;
	c_Game_Volleyball.m_Nach_DV=0;
	c_Game_Volleyball.m_Max_SK=0;
	c_Game_Volleyball.m_Flag_Game=0;
	c_Game_Volleyball.m_Napr_Setka=0;
	c_Game_Volleyball.m_Frame_Setka=0;
	c_Game_Volleyball.m_Upravlenie=0;
	c_Game_Volleyball.m_Zad_NachG=0;
	c_Game_Volleyball.m_Flag_Vibro=0;
	c_Game_Volleyball.m_Flag_Razriad=0;
	c_Game_Volleyball.m_Alpha_IndL=.0;
	c_Game_Volleyball.m_Alpha_IndP=.0;
	c_Game_Volleyball.m_Vzriv_C=0;
	c_Game_Volleyball.m_Vzriv_NC=new_number_array(150);
	c_Game_Volleyball.m_Vzriv_X=new_number_array(150);
	c_Game_Volleyball.m_Vzriv_Y=new_number_array(150);
	c_Game_Volleyball.m_Vzriv_SmX=new_number_array(150);
	c_Game_Volleyball.m_Vzriv_SmY=new_number_array(150);
	c_Game_Volleyball.m_Vzriv_R=new_number_array(150);
	c_Game_Volleyball.m_Vzriv_A=new_number_array(150);
	c_Game_Volleyball.m_Vzriv_TU=new_number_array(150);
	c_Game_Volleyball.m_Vzriv_UP=new_number_array(150);
}
//${TRANSCODE_END}
