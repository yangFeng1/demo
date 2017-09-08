var classDetialsWin;
var chnSetWin;
var recordParamSetWin;
var liveParamSetWin;
var logoSubParamSetWin;
var monPerformanceWin;
var serverLogWin;
var mcuLogWin;
var onlineInfoWin;
var alterPwWin;
var autoTrackerWin;
var BLTSetWin;
var viscaSetWin;
var audioParamSetWin;
var rmingFileWaitFlags;

(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;
	
        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
        
        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else  {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
}(this));

function showNavBar(ac)
{
	var curUserType = getCookie("curUserType");
	if(ac == "sd")
	if(curUserType == "guest")
	{
		//document.getElementById("navBarDivId").innerHTML = '<ul><li style="left:25%;"><a class="active" href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li style="left:25%;"><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li> <li style="left:25%;"><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li></ul>';
		window.location.href = "watchLive.html";
	}
	else if(curUserType == "standard user")
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li style="left:15%;"><a class="active" href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li style="left:15%;"><a href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li style="left:15%;"><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li style="left:15%;"><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li></ul>';
	}
	else
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li><a class="active" href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li><a href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li><li><a href="/kl_web/sysManage.html" class="styleMenu" id = "system_manage">'+langController.language.strings["systemManagement"]+'</a></li><li><a href="/kl_web/devManage.html" class="styleMenu" id = "dev_manage">'+langController.language.strings["deviceManagement"]+'</a></li></ul>';
	}
	else if(ac == "re")
	if(curUserType == "guest")
	{
		window.location.href = "watchLive.html";
	}
	else if(curUserType == "standard user")
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li style="left:15%;"><a  href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li style="left:15%;"><a  class="active" href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li style="left:15%;"><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li style="left:15%;"><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li></ul>';
	}
	else
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li><a href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li><a  class="active" href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li><li><a href="/kl_web/sysManage.html" class="styleMenu" id = "system_manage">'+langController.language.strings["systemManagement"]+'</a></li><li><a href="/kl_web/devManage.html" class="styleMenu" id = "dev_manage">'+langController.language.strings["deviceManagement"]+'</a></li></ul>';
	}
	else if(ac == "watchLive")
	if(curUserType == "guest")
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li style="left:25%;"><a class="active" href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li> <li style="left:25%;"><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li></ul>';
	}
	else if(curUserType == "standard user")
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li style="left:15%;"><a  href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li style="left:15%;"><a href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li style="left:15%;"><a  class="active" href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li style="left:15%;"><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li></ul>';
	}
	else
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li><a href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li><a href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li><a  class="active" href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li><li><a href="/kl_web/sysManage.html" class="styleMenu" id = "system_manage">'+langController.language.strings["systemManagement"]+'</a></li><li><a href="/kl_web/devManage.html" class="styleMenu" id = "dev_manage">'+langController.language.strings["deviceManagement"]+'</a></li></ul>';
	}
	else if(ac == "us")
	if(curUserType == "guest")
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li style="left:25%;"><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li> <li style="left:25%;"><a class="active"  href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li></ul>';
	}
	else if(curUserType == "standard user")
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li style="left:15%;"><a href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li style="left:15%;"><a href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li style="left:15%;"><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li style="left:15%;"><a  class="active" href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li></ul>';
	}
	else
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li><a href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li><a href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li><a  class="active" href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li><li><a href="/kl_web/sysManage.html" class="styleMenu" id = "system_manage">'+langController.language.strings["systemManagement"]+'</a></li><li><a href="/kl_web/devManage.html" class="styleMenu" id = "dev_manage">'+langController.language.strings["deviceManagement"]+'</a></li></ul>';
	}
	else if(ac == "sy")
	if(curUserType == "guest")
	{
		window.location.href = "watchLive.html";
	}
	else if(curUserType == "standard user")
	{
		window.location.href = "sdManage.html";
	}
	else
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li><a href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li><a href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li><li><a  class="active" href="/kl_web/sysManage.html" class="styleMenu" id = "system_manage">'+langController.language.strings["systemManagement"]+'</a></li><li><a href="/kl_web/devManage.html" class="styleMenu" id = "dev_manage">'+langController.language.strings["deviceManagement"]+'</a></li></ul>';
	}
	else if(ac == "de")
	if(curUserType == "guest")
	{
		window.location.href = "watchLive.html";
	}
	else if(curUserType == "standard user")
	{
		window.location.href = "sdManage.html";
	}
	else
	{
		document.getElementById("navBarDivId").innerHTML = '<ul><li><a href="/kl_web/sdManage.html" class="styleMenu" id = "sd_manage">'+langController.language.strings["directorManagement"]+'</a></li><li><a href="/kl_web/recordManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["recordManagement"]+'</a></li><li><a href="/kl_web/watchLive.html" class="styleMenu" id = "">'+langController.language.strings["watchLive"]+'</a></li><li><a href="/kl_web/userManage.html" class="styleMenu" id = "record_manage">'+langController.language.strings["userManagement"]+'</a></li><li><a href="/kl_web/sysManage.html" class="styleMenu" id = "system_manage">'+langController.language.strings["systemManagement"]+'</a></li><li><a  class="active" href="/kl_web/devManage.html" class="styleMenu" id = "dev_manage">'+langController.language.strings["deviceManagement"]+'</a></li></ul>';
	}

}

function getBrowser()
{
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串	
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器

    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器

    if (userAgent.indexOf("Chrome") > -1){
	  return "Chrome";
 	}
    
	if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    
	if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

function getUrlParamz( name )                    
{                                               
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );     
	var results = regex.exec(decodeURI(window.location.href) );
	if( results == null )           
		return "";              
	else                                  
		return unescape( results[1] );
}        

var userName = "";
var password = "";
var uuid 	 = "";
function user_not_login()
{
	userName = getCookie("userName");
	password = getCookie("password");
	uuid = getCookie("uuid");

	if(userName == null || userName == "" || password == null || password == "")
	{
		window.location.href = "logIn.html";
		return true;
	}
	return false;
}

function ChannelDoubleClick(id)
{
	if( id == "11_player") id = 1;
	if( id == "22_player") id = 2;
	if( id == "33_player") id = 3;
	if( id == "44_player") id = 4;
	if( id == "55_player") id = 5;
	if( id == "66_player") id = 6;
	if( id == "77_player") id = 7;
	
	klWebPlayerMouseDoubleClick(id,10,10);
}

function klWebPlayerMouseDoubleClick(id,x,y)
{
	if(id == 0)
	{
		if(window.location.href.indexOf("sdFilmFullScreen.html") >= 0)
		{
			window.location.href = "sdManage.html";
		}
		else
		{
			window.location.href = "sdFilmFullScreen.html";
		}
		return;
	}
	if(id <= 0) return;
	
	if( user_not_login() ) return;	

	var xmlHttp = getXmlHttp();
	var cmd = "mainChn["+id+"]"
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				//film_view_area_updata = 3;
				if(xmlHttp.responseText.indexOf("mainChn")>=0)
				{
					document.getElementById("chn1Id").style.backgroundColor='#999999';		
					document.getElementById("chn2Id").style.backgroundColor='#999999';	
					document.getElementById("chn3Id").style.backgroundColor='#999999';	
					document.getElementById("chn4Id").style.backgroundColor='#999999';
					var chn5 = document.getElementById("chn5Id");
					if(chn5 != undefined && chn5 != null)
						chn5.style.backgroundColor='#999999';
					var chn6 = document.getElementById("chn6Id");
					if(chn6 != undefined && chn6 != null)
						chn6.style.backgroundColor='#999999';
					var chn7 = document.getElementById("chn7Id");
					if(chn7 != undefined && chn7 != null)
						chn7.style.backgroundColor='#999999';
					
					document.getElementById("chn"+id+"Id").style.backgroundColor='#FF4500';	
				}	
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}                      
		}
	}
	xmlHttp.send();
}


var volT=0;
var volM=0;
var volS=0;
var volST=0;
var timeN=0;
function volumeAreaUpdata()
{
	var bgcolor;
	var volume = getPcmLVolume(0);

	if(timeN > 10)	
	{
		volT=0;
		volM=0;
		volS=0;
		timeN=0;
		volST=0;
	}

	volT += volume;
	timeN++;
	volM = volT/timeN;
	volST += Math.abs(volume - volM);
	volS = volST/timeN;

	volume = volS;

	
	//alert(volume +" "+ timeN);
	//alert(volM +"   "+volume+ "  "+volS);
	
	//volume = Math.floor(Math.random() * 100);
	var cheight;
	var colorTable = new Array("#00FF00","#04FF00","#08FF00","#0DFF00","#11FF00","#15FF00","#1AFF00","#1EFF00","#22FF00","#26FF00",
			"#2BFF00","#2FFF00","#33FF00","#37FF00","#3BFF00","#40FF00","#44FF00","#48FF00","#4CFF00","#51FF00",
			"#55FF00","#59FF00","#5EFF00","#62FF00","#66FF00","#6AFF00","#6EFF00","#73FF00","#77FF00","#7BFF00",
			"#80FF00","#84FF00","#88FF00","#8CFF00","#91FF00","#95FF00","#99FF00","#9DFF00","#A1FF00","#A6FF00",
			"#AAFF00","#AEFF00","#B2FF00","#B7FF00","#BBFF00","#BFFF00","#C3FF00","#C8FF00","#CCFF00","#D0FF00",
			"#D4FF00","#D9FF00","#DDFF00","#E1FF00","#E6FF00","#EAFF00","#EEFF00","#F2FF00","#F6FF00","#FBFF00",
			"#FFFF00","#FFFB00","#FFF700","#FFF200","#FFEE00","#FFEA00","#FFE500","#FFE100","#FFDD00","#FFD900",
			"#FFD500","#FFD000","#FFCC00","#FFC800","#FFC300","#FFBF00","#FFBB00","#FFB700","#FFB300","#FFAE00",
			"#FFAA00","#FFA600","#FFA200","#FF9D00","#FF9900","#FF9500","#FF9100","#FF8C00","#FF8800","#FF8400",
			"#FF8000","#FF7B00","#FF7700","#FF7300","#FF6E00","#FF6A00","#FF6600","#FF6200","#FF5E00","#FF5900",
			"#FF5500","#FF5100");
	var htmlArr = new Array();
	htmlArr.push('<table width="12px" border="0" cellspacing="0" cellpadding="0" rules="none">');
	for(var i = 0;i < 100;i++)
	{
		bgcolor = colorTable[100-i];	
	
		if(volume < (100 - i))
		{
			bgcolor = "#999999";
		}
		
		if(i%2 == 0)
		{
			cheight = "4px";
		}
		else
		{
			cheight = "4px";
		}
		if(i == 0 || i == 1)
		{
			cheight = "4px";
		}
		htmlArr.push('<tr height="'+cheight+'" bgcolor="'+bgcolor+'">');
		htmlArr.push('<td></td>');
		htmlArr.push('</tr>');
	}
	htmlArr.push('</table>');
	document.getElementById("volumeShowId").innerHTML = htmlArr.join('');
	
	setTimeout("volumeAreaUpdata()",100);
}

function parse_recordTopic(msg)
{
	if(msg.indexOf("startRecord") >= 0 || msg.indexOf("continueRecord") >= 0)
	{					
		document.getElementById("startRecordBtId").src=langController.language.image["startRecordD"];
		document.getElementById("pauseRecordBtId").src=langController.language.image["pauseRecordU"];
		//document.getElementById("stopRecordBtId").src=langController.language.image["stopRecordU"];
		
		document.getElementById("stopRecordBtId").src = isGeneratingTailer ? langController.language.image["stopRecordD"] : langController.language.image["stopRecordU"];		
	}
	else if(msg.indexOf("pauseRecord") >= 0)
	{
		document.getElementById("startRecordBtId").src=langController.language.image["startRecordU"];
		document.getElementById("pauseRecordBtId").src=langController.language.image["pauseRecordD"];
		document.getElementById("stopRecordBtId").src=langController.language.image["stopRecordU"];		
	}
	else if(msg.indexOf("stopRecord") >= 0)
	{
		document.getElementById("startRecordBtId").src=langController.language.image["startRecordU"];
		document.getElementById("pauseRecordBtId").src=langController.language.image["pauseRecordU"];
		document.getElementById("stopRecordBtId").src=langController.language.image["stopRecordU"];	
		isGeneratingTailer = false;
	}
}

var record_area_update = 0;
var record_area_times = 5;
function recordAreaUpdata()
{	
	record_area_update++;
	if( record_area_update > record_area_times )
	{		
		setTimeout("recordAreaUpdata()",2000);
		return;
	}
		
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/GetRecordTopic",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{	
				parse_recordTopic(xmlHttp.responseText);
			}
		}
	}
	xmlHttp.send();
	setTimeout("recordAreaUpdata()",2000);
}

function getXmlHttp()
{
	if(window.XMLHttpRequest)
	{
		return new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function startRecord()
{
	if( user_not_login() ) return;	

	var xmlHttp = getXmlHttp();
	
	if(document.getElementById("pauseRecordBtId").src.indexOf("pause1.png")>=0)
	{
		var cmd = "continueRecord";
		xmlHttp.open("POST","/action/SetRecordTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	}
	else
	{	
		var cmd = "startRecord";
		xmlHttp.open("POST","/action/SetRecordTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	}
	
	
	xmlHttp.onreadystatechange=function()
	{		
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{				
				parse_recordTopic(xmlHttp.responseText);
				if(xmlHttp.responseText.indexOf( "<startRecord>")>=0 || xmlHttp.responseText.indexOf("<continueRecord>")>=0)
				{	
				}	 
				else if(xmlHttp.responseText.indexOf("<No Permission>")>=0)
				{
					alert(langController.language.strings["noPermission"]);
				}
				else if(xmlHttp.responseText.indexOf("<Disk Not Found>")>=0)
				{
					alert("硬盘空间不够！");
				}
			}
		}
	}
	xmlHttp.send();
}

var isGeneratingTailer = false;
function stopRecord()
{
	if( user_not_login() ) return;	

	var xmlHttp = getXmlHttp();
	
	var cmd = "stopRecord";
	xmlHttp.open("POST","/action/SetRecordTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);	
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{				
				parse_recordTopic(xmlHttp.responseText);
				if(xmlHttp.responseText.indexOf( "<stopRecord>") >= 0)
				{					
				}    
				else if(xmlHttp.responseText.indexOf( "<No Permission>")>=0)
				{
					alert(langController.language.strings["noPermission"]);
				}else{
					record_area_times = record_area_update + 20;
					isGeneratingTailer = true;
					document.getElementById("stopRecordBtId").src=langController.language.image["stopRecordD"];
				}
			}
		}
	}
    xmlHttp.send();
}

function pauseRecord()
{
	if( user_not_login() ) return;	
	
	//if(document.getElementById("startRecordBtId").src.indexOf("start1.png")>=0 && document.getElementById("stopRecordBtId").src.indexOf("stop1.png")>=0)
	if(isGeneratingTailer)
	{
		return;
	}

	var xmlHttp = getXmlHttp();
	
	var cmd = "pauseRecord";
	xmlHttp.open("POST","/action/SetRecordTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{				
				parse_recordTopic(xmlHttp.responseText);
				if(xmlHttp.responseText.indexOf("<pauseRecord>")>=0)
				{	
				}
				else if(xmlHttp.responseText.indexOf( "<No Permission>")>=0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

var live_area_updata = 0;
function liveAreaUpdata()
{
	live_area_updata++;
	if( live_area_updata > 5 )
	{
		setTimeout("liveAreaUpdata()",2000);
		return;
	}
	
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/GetLiveTopic",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText == "<liveTopic[startLive]>")
				{
					updataLiveStateToStart();
				}
				else if(xmlHttp.responseText == "<liveTopic[stopLive]>")
				{
					updataLiveStateToStop();
				}
			}
		}
	}
	xmlHttp.send();
	setTimeout("liveAreaUpdata()",2000);
}

function updataLiveStateToStart()
{
	document.getElementById("startLiveBtId").src=langController.language.image["startLiveD"];
	document.getElementById("stopLiveBtId").src=langController.language.image["stopLiveU"];
}

function updataLiveStateToStop()
{
	document.getElementById("startLiveBtId").src=langController.language.image["startLiveU"];
	document.getElementById("stopLiveBtId").src=langController.language.image["stopLiveU"];
}


function startLive()
{
	if( user_not_login() ) return;	

	var xmlHttp = getXmlHttp();
	var cmd = "startLive";
	xmlHttp.open("POST","/action/SetLiveTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf( "<startLive>") >= 0)
				{
					start_live_time_s 	= getLocalTime();
					stop_live_time_s 	= 0;
					updataLiveStateToStart();
				}			
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

function stopLive()
{
	if( user_not_login() ) return;	

	var xmlHttp = getXmlHttp();
	
	var cmd = "stopLive";
	xmlHttp.open("POST","/action/SetLiveTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf( "<stopLive>") >= 0)
                {
					start_live_time_s 	= 0;
					stop_live_time_s 	= getLocalTime();
					live_time_from_server = 0;
					updataLiveStateToStop();
                }
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
                {
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

var subtitle_logo_area_update = 0;
function subtitleLogoAreaUpdata()
{
	subtitle_logo_area_update++;
	if( subtitle_logo_area_update > 5 )
	{
		setTimeout("subtitleLogoAreaUpdata()",2000);
		return;
	}
	
	var xmlHttp = getXmlHttp();
	
	xmlHttp.open("POST","/GetSubTitleAndLogoTopic",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf("subtitle[true")>=0)
				{
					document.getElementById("muteSubtitleBtId").src=langController.language.image["openSubD"];			
				}
				else if(xmlHttp.responseText.indexOf("subtitle[false")>=0)
				{
					document.getElementById("muteSubtitleBtId").src=langController.language.image["openSubU"];
				}

				if(xmlHttp.responseText.indexOf("logo[true")>=0)
				{
					document.getElementById("muteLogoBtId").src=langController.language.image["openLogoD"];
				}
				else if(xmlHttp.responseText.indexOf("logo[false")>=0)
				{
					document.getElementById("muteLogoBtId").src=langController.language.image["openLogoU"];
				}
			}
		}
	}	
	xmlHttp.send();
	setTimeout("subtitleLogoAreaUpdata()",2000);
}

function muteSubtitle()
{
	if( user_not_login() ) return;	
	
	var cmd;
	var str = document.getElementById("muteSubtitleBtId").src;
	if(str.indexOf("caption.png")>=0)
	{
		cmd = "subtitle[true]";
	}
	else cmd = "subtitle[false]";

	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetSubTitleAndLogoTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{				
				if(xmlHttp.responseText.indexOf("subtitle[true")>=0)
				{
					document.getElementById("muteSubtitleBtId").src=langController.language.image["openSubD"];
				}
				else if(xmlHttp.responseText.indexOf("subtitle[false")>=0) 
				{
					document.getElementById("muteSubtitleBtId").src=langController.language.image["openSubU"];
				}
				else if(xmlHttp.responseText.indexOf("<No Permission>")>=0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

function muteLogo()
{
	if( user_not_login() ) return;	
	
	var cmd;
	var str = document.getElementById("muteLogoBtId").src;
	if(str.indexOf("logo.png")>=0)
	{
		cmd = "logo[true]";
	}
	else cmd = "logo[false]";
	
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetSubTitleAndLogoTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf("logo[true")>=0)
				{
					document.getElementById("muteLogoBtId").src=langController.language.image["openLogoD"];
				}
				else if(xmlHttp.responseText.indexOf("logo[false")>=0)
				{
					document.getElementById("muteLogoBtId").src=langController.language.image["openLogoU"];				
				}
				else if(xmlHttp.responseText.indexOf("<No Permission>") >=0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

var duration_time = 0;
var film_view_area_updata = 0;
function filmViewAreaUpdata()
{
	film_view_area_updata++;
	if( film_view_area_updata > 5/* && document.getElementById("ptzAutoRadId").checked == false */)
	{		
		setTimeout("filmViewAreaUpdata()",2000);
		return;
	}
	
	var posStart = 0;
	
	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/GetFilmViewTopic",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				document.getElementById("pipBtId").src="pic/layout-pip.png";
				document.getElementById("tileBtId").src="pic/layout-tile.png";
				document.getElementById("lrBtId").src="pic/layout-lr.png";
				document.getElementById("fullBtId").src="pic/layout-full.png";
				document.getElementById("pipPos1BtId").src="pic/right-top.png";
				document.getElementById("pipSize1BtId").src="pic/size-one.png";
				document.getElementById("pipPos2BtId").src="pic/left-top.png";
				document.getElementById("pipSize2BtId").src="pic/size-two.png";
				document.getElementById("pipPos3BtId").src="pic/left-bottom.png";
				document.getElementById("pipSize3BtId").src="pic/size-three.png";
				document.getElementById("pipPos4BtId").src="pic/right-bottom.png";
				document.getElementById("pipSize4BtId").src="pic/size-four.png";
				
				document.getElementById("chn1SubBtId").src=langController.language.image["fuU"];
				document.getElementById("chn2SubBtId").src=langController.language.image["fuU"];
				document.getElementById("chn3SubBtId").src=langController.language.image["fuU"];
				document.getElementById("chn4SubBtId").src=langController.language.image["fuU"];
				var chn5 = document.getElementById("chn5SubBtId");
				if(chn5 != undefined && chn5 != null)
					chn5.src=langController.language.image["fuU"];

				var chn6 = document.getElementById("chn6SubBtId");
				if(chn6 != undefined && chn6 != null)
					chn6.src=langController.language.image["fuU"];
				
				var chn7 = document.getElementById("chn7SubBtId");
				if(chn7 != undefined && chn7 != null)
					chn7.src=langController.language.image["fuU"];

				document.getElementById("pushRBtId").src="pic/qieru-overlap.png";
				document.getElementById("pushLBtId").src="pic/qieru-blinds.png";
				document.getElementById("pushLeftBtId").src="pic/qieru-left.png";
				document.getElementById("pushRightBtId").src="pic/qieru-right.png";
				document.getElementById("pushUBtId").src="pic/qieru-bottom.png";
				document.getElementById("pushDBtId").src="pic/qieru-top.png";
				document.getElementById("pushRTBtId").src="pic/qieru-left-bottom.png";
				document.getElementById("pushRBBtId").src="pic/qieru-left-top.png";
				document.getElementById("pushLTBtId").src="pic/qieru-right-bottom.png";
				document.getElementById("pushLBBtId").src="pic/qieru-right-top.png";

				document.getElementById("chn1Id").style.backgroundColor='#999999';
				document.getElementById("chn2Id").style.backgroundColor='#999999';
				document.getElementById("chn3Id").style.backgroundColor='#999999';
				document.getElementById("chn4Id").style.backgroundColor='#999999';
				chn5 = document.getElementById("chn5Id");
				if(chn5 != undefined && chn5 != null)
					chn5.style.backgroundColor='#999999';
				chn6 = document.getElementById("chn6Id");
				if(chn6 != undefined && chn6 != null)
					chn6.style.backgroundColor='#999999';
				chn7 = document.getElementById("chn7Id");
				if(chn7 != undefined && chn7 != null)
					chn7.style.backgroundColor='#999999';


				var openPip = 0;	
				if(xmlHttp.responseText.indexOf("mainChn[1]")>=0)
				{
					document.getElementById("chn1Id").style.backgroundColor='#FF4500';		
				}
				else if(xmlHttp.responseText.indexOf("mainChn[2]")>=0)
				{
					document.getElementById("chn2Id").style.backgroundColor='#FF4500';	
				}
				else if(xmlHttp.responseText.indexOf("mainChn[3]")>=0)
				{
					document.getElementById("chn3Id").style.backgroundColor='#FF4500';	
				}
				else if(xmlHttp.responseText.indexOf("mainChn[4]")>=0)
				{
					document.getElementById("chn4Id").style.backgroundColor='#FF4500';	
				}
				else if(xmlHttp.responseText.indexOf("mainChn[5]")>=0)
				{
					document.getElementById("chn5Id").style.backgroundColor='#FF4500';	
				}
				else if(xmlHttp.responseText.indexOf("mainChn[6]")>=0)
				{
					document.getElementById("chn6Id").style.backgroundColor='#FF4500';	
				}
				else if(xmlHttp.responseText.indexOf("mainChn[7]")>=0)
				{
					document.getElementById("chn7Id").style.backgroundColor='#FF4500';	
				}
				
				if(xmlHttp.responseText.indexOf("subChn[1]")>=0)
				{
					document.getElementById("chn1SubBtId").src=langController.language.image["fuD"];		
				}
				else if(xmlHttp.responseText.indexOf("subChn[2]")>=0)
				{
					document.getElementById("chn2SubBtId").src=langController.language.image["fuD"];
				}
				else if(xmlHttp.responseText.indexOf("subChn[3]")>=0)
				{
					document.getElementById("chn3SubBtId").src=langController.language.image["fuD"];	
				}
				else if(xmlHttp.responseText.indexOf("subChn[4]")>=0)
				{
					document.getElementById("chn4SubBtId").src=langController.language.image["fuD"];
				}
				else if(xmlHttp.responseText.indexOf("subChn[5]")>=0)
				{
					document.getElementById("chn5SubBtId").src=langController.language.image["fuD"];
				}
				else if(xmlHttp.responseText.indexOf("subChn[6]")>=0)
				{
					document.getElementById("chn6SubBtId").src=langController.language.image["fuD"];
				}
				else if(xmlHttp.responseText.indexOf("subChn[7]")>=0)
				{
					document.getElementById("chn7SubBtId").src=langController.language.image["fuD"];
				}

				if((posStart = xmlHttp.responseText.indexOf("pipView"))>=0)
				{
					var str = xmlHttp.responseText;
					document.getElementById("pipBtId").src="pic/layout-pip1.png";	

					posStart += 8;
					var posEnd = str.indexOf(",",posStart);
					var x = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					var y = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					var w = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf("]",posStart);
					var h = parseInt(str.substring(posStart,posEnd));
					//alert(x+" "+y+" "+w+" "+h);

					if(x > 960 || 960-x < x+w-960)//r
					{
						if(y > 540 || 540-y < y+h-540)//d
						{
							document.getElementById("pipPos4BtId").src="pic/right-bottom1.png";
						}
						else //u
						{
							document.getElementById("pipPos1BtId").src="pic/right-top1.png";
						}
					}
					else//l
					{
						if(y > 540 || 540-y < y+h-540)//d
						{
							document.getElementById("pipPos3BtId").src="pic/left-bottom1.png";
						}
						else //u
						{
							document.getElementById("pipPos2BtId").src="pic/left-top1.png";
						}
					}
					if(w <= 320)
					{
						document.getElementById("pipSize1BtId").src="pic/size-one1.png";
					}
					else if(w <= 480)
					{
						document.getElementById("pipSize2BtId").src="pic/size-two1.png";
					}
					else if(w <= 640)
					{
						document.getElementById("pipSize3BtId").src="pic/size-three1.png";
					}
					else 
					{
						document.getElementById("pipSize4BtId").src="pic/size-four1.png";
					}
					openPip = 1;	
				}
				else if(xmlHttp.responseText.indexOf("fullView")>=0)
				{
					document.getElementById("fullBtId").src="pic/layout-full1.png";	
					openPip = 1;	
				}
				else if(xmlHttp.responseText.indexOf("tileViewKR")>=0)
				{
					document.getElementById("tileBtId").src="pic/layout-tile1.png";	
					openPip = 1;
				}
				else if(xmlHttp.responseText.indexOf("lrView")>=0)
				{
					document.getElementById("lrBtId").src="pic/layout-lr1.png";	
					openPip = 1;
				}
				var openPush = 0;
				if(xmlHttp.responseText.indexOf("effects[type[0]")>=0)
				{
				}
				else if(xmlHttp.responseText.indexOf("effects[type[1]")>=0)
				{
					document.getElementById("pushLeftBtId").src="pic/qieru-left1.png";
					openPush = 1;
				}
				else if(xmlHttp.responseText.indexOf("effects[type[2]")>=0)
				{
					document.getElementById("pushRightBtId").src="pic/qieru-right1.png";
					openPush = 1;
				}
				else if(xmlHttp.responseText.indexOf("effects[type[3]")>=0)
				{
					document.getElementById("pushUBtId").src="pic/qieru-bottom1.png";
					openPush = 1;
				}
				else if(xmlHttp.responseText.indexOf("effects[type[4]")>=0)
				{
					document.getElementById("pushDBtId").src="pic/qieru-top1.png";
					openPush = 1;
				}
				else if(xmlHttp.responseText.indexOf("effects[type[5]")>=0)
				{
					document.getElementById("pushRTBtId").src="pic/qieru-left-bottom1.png";
					openPush = 1;
				}
				else if(xmlHttp.responseText.indexOf("effects[type[6]")>=0)
				{
					document.getElementById("pushRBBtId").src="pic/qieru-left-top1.png";
					openPush = 1;
				}
				else if(xmlHttp.responseText.indexOf("effects[type[7]")>=0)
				{
					document.getElementById("pushLTBtId").src="pic/qieru-right-bottom1.png";
					openPush = 1;
				}
				else if(xmlHttp.responseText.indexOf("effects[type[8]")>=0)
				{
					document.getElementById("pushLBBtId").src="pic/qieru-right-top1.png";
					openPush = 1;
				}
				else if(xmlHttp.responseText.indexOf("effects[type[9]")>=0)
				{
					document.getElementById("pushRBtId").src="pic/qieru-overlap1.png";
					openPush = 1;
				}
				else if(xmlHttp.responseText.indexOf("effects[type[10]")>=0)
				{
					document.getElementById("pushLBtId").src="pic/qieru-blinds1.png";
					openPush = 1;
				}
				if((posStart = xmlHttp.responseText.indexOf("durTime"))>=0)
				{
					var str = xmlHttp.responseText;
					
					posStart += 8;
					var posEnd = str.indexOf("]",posStart);
					var x = parseInt(str.substring(posStart,posEnd));
					var dur_select = document.getElementById("durationId");
					//if(dur_select.name == "durationNameToChange"){
					if( duration_time == 0 || duration_time != x)
					{
						dur_select.options[0].selected = true;
						if( x == 500 )  dur_select.options[0].selected = true;
						if( x == 1000 ) dur_select.options[1].selected = true;
						if( x == 1500 ) dur_select.options[2].selected = true;
						if( x == 2000 ) dur_select.options[3].selected = true;
					}
					posStart = posEnd+1;
				}
				if(openPip == 1 && openPush == 1)
				{
					//document.getElementById("openTexTxtId").innerHTML= langController.language.strings["enableLayoutCutEffects"];
				}
				else if(openPip == 1)
				{
					//document.getElementById("openTexTxtId").innerHTML=langController.language.strings["enableLayoutEffects"];
				}
				else if(openPush == 1)
				{
					//document.getElementById("openTexTxtId").innerHTML=langController.language.strings["enableTransitionEffects"];
				}

				var str = xmlHttp.responseText;
				if((posStart = str.indexOf("colorKey"))>=0)
				{
					posStart += 9;
					if( (posStart = str.indexOf("start", posStart)) >= 0 )
					{
						posStart += 6;
						var posEnd = str.indexOf("]",posStart);
						var start = str.substring(posStart,posEnd);
						var colorKey = document.getElementById("startColorKeyId");	
						if(start.indexOf("true") >= 0)
						{
							colorKey.src = langController.language.image["colorkey1"];	
							//colorKey.checked = true;
							//colorKey.style.backgroundColor = "#FF4500";
						}
						else
						{
							colorKey.src = langController.language.image["colorkey"];	
							//colorKey.checked = false;
							//colorKey.style.backgroundColor = "#CCCCCC";
						}
					}
				} 

			}
			else
			{
				//alert("1234");
			}    
		}
	}
	xmlHttp.send();
	setTimeout("filmViewAreaUpdata()",2000);
}

function onDurationCover()
{
	var dur_select = document.getElementById("durationId");
	dur_select.name = "durationNameNoChange";
}

function onDurationOut()
{	
	var dur_select = document.getElementById("durationId");
	dur_select.name = "durationNameToChange";
}

function onPushViewDuration()
{	
	var type = 0;
	if(document.getElementById("pushRBtId").src.indexOf("qieru-overlap1.png")>=0) 		type = 9;
	if(document.getElementById("pushLBtId").src.indexOf("qieru-blinds1.png")>=0) 		type = 10;
	if(document.getElementById("pushLeftBtId").src.indexOf("qieru-left1.png")>=0) 		type = 1;
	if(document.getElementById("pushRightBtId").src.indexOf("qieru-right1.png")>=0) 	type = 2;
	if(document.getElementById("pushUBtId").src.indexOf("qieru-bottom1.png")>=0) 		type = 3;
	if(document.getElementById("pushDBtId").src.indexOf("qieru-top1.png")>=0) 			type = 4;
	if(document.getElementById("pushRTBtId").src.indexOf("qieru-left-bottom1.png")>=0) 	type = 5;
	if(document.getElementById("pushRBBtId").src.indexOf("qieru-left-top1.png")>=0) 	type = 6;
	if(document.getElementById("pushLTBtId").src.indexOf("qieru-right-bottom1.png")>=0) type = 7;
	if(document.getElementById("pushLBBtId").src.indexOf("qieru-right-top1.png")>=0) 	type = 8;
		
	onPushView(type + 20);	
}

function onPushView(type)
{
	if( user_not_login() ) return;	
	
	var cmd;
	if( type > 20 )
	{
		type = type - 20;
	}
	else if( (type == 9 && document.getElementById("pushRBtId").src.indexOf("pic/qieru-overlap1.png")>=0) ||
		(type == 10 && document.getElementById("pushLBtId").src.indexOf("pic/qieru-blinds1.png")>=0) ||
		(type == 1 && document.getElementById("pushLeftBtId").src.indexOf("pic/qieru-left1.png")>=0) ||
		(type == 2 && document.getElementById("pushRightBtId").src.indexOf("pic/qieru-right1.png")>=0) ||
		(type == 3 && document.getElementById("pushUBtId").src.indexOf("pic/qieru-bottom1.png")>=0) ||
		(type == 4 && document.getElementById("pushDBtId").src.indexOf("pic/qieru-top1.png")>=0) ||
		(type == 5 && document.getElementById("pushRTBtId").src.indexOf("pic/qieru-left-bottom1.png")>=0) ||
		(type == 6 && document.getElementById("pushRBBtId").src.indexOf("pic/qieru-left-top1.png")>=0) ||
		(type == 7 && document.getElementById("pushLTBtId").src.indexOf("pic/qieru-right-bottom1.png")>=0) ||
		(type == 8 && document.getElementById("pushLBBtId").src.indexOf("pic/qieru-right-top1.png")>=0))
	{
		type = 0;
	}
	var dur_select = document.getElementById("durationId");	
	cmd = "effects[type["+type+"],durTime[" + dur_select.value + "]]";
	
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
        xmlHttp.onreadystatechange=function()
        {
                if(xmlHttp.readyState==4)
                {
					if(xmlHttp.status==200)
					{						
						var startPos;
						if((startPos = xmlHttp.responseText.indexOf("effects[type["))>=0)
						{
							startPos += 13;
							document.getElementById("pushRBtId").src="pic/qieru-overlap.png";
							document.getElementById("pushLBtId").src="pic/qieru-blinds.png";
							document.getElementById("pushLeftBtId").src="pic/qieru-left.png";
							document.getElementById("pushRightBtId").src="pic/qieru-right.png";
							document.getElementById("pushUBtId").src="pic/qieru-bottom.png";
							document.getElementById("pushDBtId").src="pic/qieru-top.png";
							document.getElementById("pushRTBtId").src="pic/qieru-left-bottom.png";
							document.getElementById("pushRBBtId").src="pic/qieru-left-top.png";
							document.getElementById("pushLTBtId").src="pic/qieru-right-bottom.png";
							document.getElementById("pushLBBtId").src="pic/qieru-right-top.png";
		
							var stopPos = xmlHttp.responseText.indexOf("]",startPos);
							var pushIndex = xmlHttp.responseText.substring(startPos, stopPos);
							
							if(pushIndex == "1")
							{
								document.getElementById("pushLeftBtId").src="pic/qieru-left1.png";
							}
							else if(pushIndex == "2")
							{
								document.getElementById("pushRightBtId").src="pic/qieru-right1.png";
							}
							else if(pushIndex == "3")
							{
								document.getElementById("pushUBtId").src="pic/qieru-bottom1.png";
							}
							else if(pushIndex == "4")
							{
								document.getElementById("pushDBtId").src="pic/qieru-top1.png";
							}
							else if(pushIndex == "5")
							{
								document.getElementById("pushRTBtId").src="pic/qieru-left-bottom1.png";
							}
							else if(pushIndex == "6")
							{
								document.getElementById("pushRBBtId").src="pic/qieru-left-top1.png";
							}
							else if(pushIndex == "7")
							{
								document.getElementById("pushLTBtId").src="pic/qieru-right-bottom1.png";
							}
							else if(pushIndex == "8")
							{
								document.getElementById("pushLBBtId").src="pic/qieru-right-top1.png";
							}
							else if(pushIndex == "9")
							{
								document.getElementById("pushRBtId").src="pic/qieru-overlap1.png";
							}
							else if(pushIndex == "10")
							{
								document.getElementById("pushLBtId").src="pic/qieru-blinds1.png";
							}
		
						}
						else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
						{
							alert(langController.language.strings["noPermission"]);
						}
					}
                }
        }

      	xmlHttp.send();

}

function onPip()
{
	if( user_not_login() ) return;	

	var cmd;
	if(document.getElementById("pipBtId").src.indexOf("pic/layout-pip1.png") >= 0)
	{
		cmd = "mainChn";
	}
	else
	{
		var i;
		for(i = 1;i <= 7; i++)
		{
			var ss = document.getElementById("chn"+i+"SubBtId");
			if(ss != null && ss.src.indexOf(langController.language.image["fuD"]) >= 0)
			{
				break;
			}
		}
		if(i == 8)
		{
			alert(langController.language.strings["pleaseFu"]);
			return;
		}
		cmd = "pipView[1600,0,320,180]";
	}

	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf("layout[none]")>=0)
				{
					resetLayoutPic();
				}
				else if(xmlHttp.responseText.indexOf("pipView")>=0)
				{
					resetLayoutPic();
					document.getElementById("pipBtId").src="pic/layout-pip1.png";
					document.getElementById("pipPos1BtId").src="pic/right-top1.png";
					document.getElementById("pipSize1BtId").src="pic/size-one1.png";
				}
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}

	xmlHttp.send();
}

function onTile()
{
	if( user_not_login() ) return;	

	var cmd;
	if(document.getElementById("tileBtId").src.indexOf("pic/layout-tile1.png") >= 0)
	{
		cmd = "mainChn";
	}
	else
	{
		var i;
		for(i = 1;i <= 7; i++)
		{
			var ss = document.getElementById("chn"+i+"SubBtId");
			if(ss != null && ss.src.indexOf(langController.language.image["fuD"]) >= 0)
			{
				break;
			}
		}
		if(i == 8)
		{
			alert(langController.language.strings["pleaseFu"]);
			return;
		}
		cmd = "tileViewKR";
	}

	var xmlHttp = getXmlHttp();
	
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf("layout[none]")>=0)
				{
					resetLayoutPic();
				}
				else if(xmlHttp.responseText.indexOf("tileViewKR")>=0)
				{
					resetLayoutPic();
					document.getElementById("tileBtId").src="pic/layout-tile1.png";						
				}				
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

function onPipPos(n)
{
	if( user_not_login() ) return;	

	var str = document.getElementById("pipBtId").src;
	var posStart = 0;
	var x=0;
	var y=0;
	var w=0;
	var h=0;
	if(str.indexOf("pic/layout-pip.png")>=0)return;
	
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/GetFilmViewTopic",false);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if((posStart = xmlHttp.responseText.indexOf("pipView"))>=0)
				{
					str = xmlHttp.responseText;
					posStart += 8;
					var posEnd = str.indexOf(",",posStart);
					x = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					y = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					w = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf("]",posStart);
					h = parseInt(str.substring(posStart,posEnd));
				}
			}
		}
	}
	xmlHttp.send();

	var cmd;
	if(n==1)
		cmd="pipView["+(1920-w)+",0,"+w+","+h+"]";
	if(n==2)
		cmd="pipView[0,0,"+w+","+h+"]";
	if(n==3)
		cmd="pipView[0,"+(1080-h)+","+w+","+h+"]";
	if(n==4)
		cmd="pipView["+(1920-w)+","+(1080-h)+","+w+","+h+"]";

	xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if((posStart = xmlHttp.responseText.indexOf("pipView"))>=0)
				{
					str = xmlHttp.responseText;
					document.getElementById("pipPos1BtId").src="pic/right-top.png";
					document.getElementById("pipPos2BtId").src="pic/left-top.png";
					document.getElementById("pipPos3BtId").src="pic/left-bottom.png";
					document.getElementById("pipPos4BtId").src="pic/right-bottom.png";

					posStart += 8;
					var posEnd = str.indexOf(",",posStart);
					x = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					y = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					w = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf("]",posStart);
					h = parseInt(str.substring(posStart,posEnd));

					if(x > 960 || 960-x < x+w-960)//r
					{
						if(y > 540 || 540-y < y+h-540)//d
						{
							document.getElementById("pipPos4BtId").src="pic/right-bottom1.png";
						}
						else //u
						{
							document.getElementById("pipPos1BtId").src="pic/right-top1.png";
						}
					}
					else//l
					{
						if(y > 540 || 540-y < y+h-540)//d
						{
							document.getElementById("pipPos3BtId").src="pic/left-bottom1.png";
						}
						else //u
						{
							document.getElementById("pipPos2BtId").src="pic/left-top1.png";
						}
					}					
				}				
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
                	alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

function onPipSize(n)
{
	if( user_not_login() ) return;	
	
	var str = document.getElementById("pipBtId").src;
	var cmd;
	var posStart = 0;
	var x=0;
	var y=0;
	var w=0;
	var h=0;
	if(str.indexOf("pic/layout-pip.png")>=0)return;
	
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/GetFilmViewTopic",false);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if((posStart = xmlHttp.responseText.indexOf("pipView"))>=0)
				{
					str = xmlHttp.responseText;
					posStart += 8;
					var posEnd = str.indexOf(",",posStart);
					x = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					y = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					w = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf("]",posStart);
					h = parseInt(str.substring(posStart,posEnd));
				}
			}
		}
	}
	xmlHttp.send();

	if(x > 960 || 960-x < x+w-960)//r
        {
		if(y > 540 || 540-y < y+h-540)//d 4
		{
			if(n == 1)
				cmd = "pipView[1600,900,320,180]";
			else if (n == 2)
				cmd = "pipView[1440,810,480,270]";
			else if (n == 3)
				cmd = "pipView[1280,720,640,360]";
			else if (n == 4)
				cmd = "pipView[960,540,960,540]";

		}
		else //u 1
		{
			if(n == 1)
				cmd = "pipView[1600,0,320,180]";
			else if (n == 2)
				cmd = "pipView[1440,0,480,270]";
			else if (n == 3)
				cmd = "pipView[1280,0,640,360]";
			else if (n == 4)
				cmd = "pipView[960,0,960,540]";
		}
	}
	else//l
	{
		if(y > 540 || 540-y < y+h-540)//d 3
		{
			if(n == 1)
				cmd = "pipView[0,900,320,180]";
			else if (n == 2)
				cmd = "pipView[0,810,480,270]";
			else if (n == 3)
				cmd = "pipView[0,720,640,360]";
			else if (n == 4)
				cmd = "pipView[0,540,960,540]";
		}
		else //u 2
		{
			if(n == 1)
				cmd = "pipView[0,0,320,180]";
			else if (n == 2)
				cmd = "pipView[0,0,480,270]";
			else if (n == 3)
				cmd = "pipView[0,0,640,360]";
			else if (n == 4)
				cmd = "pipView[0,0,960,540]";

		}
	}
	
	xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if((posStart = xmlHttp.responseText.indexOf("pipView"))>=0)
				{
					str = xmlHttp.responseText;
					document.getElementById("pipSize1BtId").src="pic/size-one.png";
					document.getElementById("pipSize2BtId").src="pic/size-two.png";
					document.getElementById("pipSize3BtId").src="pic/size-three.png";
					document.getElementById("pipSize4BtId").src="pic/size-four.png";

					posStart += 8;
					var posEnd = str.indexOf(",",posStart);
					x = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					y = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf(",",posStart);
					w = parseInt(str.substring(posStart,posEnd));
					posStart = posEnd+1;
					posEnd = str.indexOf("]",posStart);
					h = parseInt(str.substring(posStart,posEnd));
					if(w <= 320)
					{
						document.getElementById("pipSize1BtId").src="pic/size-one1.png";
					}
					else if(w <= 480)
					{
						document.getElementById("pipSize2BtId").src="pic/size-two1.png";
					}
					else if(w <= 640)
					{
						document.getElementById("pipSize3BtId").src="pic/size-three1.png";
					}
					else
					{
						document.getElementById("pipSize4BtId").src="pic/size-four1.png";
					}
				}				
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	
	xmlHttp.send();
}

function onLr()
{
	if( user_not_login() ) return;	
	
	var cmd;
	if(document.getElementById("lrBtId").src.indexOf("pic/layout-lr1.png") >= 0)
	{
		cmd = "mainChn";
	}
	else
	{
		var i;
		for(i = 1;i <= 7; i++)
		{
			var ss = document.getElementById("chn"+i+"SubBtId");
			if(ss != null && ss.src.indexOf(langController.language.image["fuD"]) >= 0)
			{
				break;
			}
		}
		if(i == 8)
		{
			alert(langController.language.strings["pleaseFu"]);
			return;
		}
		cmd = "lrView"
	}

	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf("layout[none]")>=0)
				{
					resetLayoutPic();
				}
				else if(xmlHttp.responseText.indexOf("lrView")>=0)
				{
					resetLayoutPic();
					document.getElementById("lrBtId").src="pic/layout-lr1.png";	
				}
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

function resetLayoutPic()
{
	document.getElementById("pipBtId").src="pic/layout-pip.png";
	document.getElementById("tileBtId").src="pic/layout-tile.png";
	document.getElementById("lrBtId").src="pic/layout-lr.png";
	document.getElementById("fullBtId").src="pic/layout-full.png";
	document.getElementById("pipPos1BtId").src="pic/right-top.png";
	document.getElementById("pipSize1BtId").src="pic/size-one.png";
	document.getElementById("pipPos2BtId").src="pic/left-top.png";
	document.getElementById("pipSize2BtId").src="pic/size-two.png";
	document.getElementById("pipPos3BtId").src="pic/left-bottom.png";
	document.getElementById("pipSize3BtId").src="pic/size-three.png";
	document.getElementById("pipPos4BtId").src="pic/right-bottom.png";
	document.getElementById("pipSize4BtId").src="pic/size-four.png";
}

function onFull()
{
	if( user_not_login() ) return;	

	var cmd;
	if(document.getElementById("fullBtId").src.indexOf("pic/layout-full1.png") >= 0)
	{
		cmd = "mainChn";
	}
	else
	{
		cmd = "fullView"
	}

	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf("layout[none]")>=0)
				{
					resetLayoutPic();
				}
				else if(xmlHttp.responseText.indexOf("fullView")>=0)
				{
					resetLayoutPic();
					document.getElementById("fullBtId").src="pic/layout-full1.png";	
				}				
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{					
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

function exchangeBtFlash()
{
	document.getElementById("exchangeBtId").src="pic/switch.png";
}

function onExchange()
{
	if( user_not_login() ) return;	

	if(document.getElementById("pipBtId").src.indexOf("pic/layout-pip.png") >=0 && 
		document.getElementById("tileBtId").src.indexOf("pic/layout-tile.png") >=0 && 
		document.getElementById("lrBtId").src.indexOf("pic/layout-lr.png") >=0 && 
		document.getElementById("fullBtId").src.indexOf("pic/layout-full.png") >= 0)
	{
		return;
	}	
	
	var cmd = "exchange";
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf("mainChn")>=0)
				{
					document.getElementById("exchangeBtId").src="pic/switch.png";
					setTimeout("exchangeBtFlash()",300);
				}
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();
}

function onFu(chnId)
{
	if(chnId > 4 && getDevType().indexOf("KL_DEV_3_1_MODE") >= 0)
	{
		return;
	}
	else if(chnId > 4 && getDevType().indexOf("KL_DEV_SJ_3_1_MODE") >= 0)
	{
		return;
	}
	else if(chnId > 5 && getDevType().indexOf("KL_DEV_3_1_1_MODE") >= 0)
	{
		return;
	}
	if( user_not_login() ) return;	

	var cmd;
	if(document.getElementById("chn"+chnId+"SubBtId").src.indexOf(langController.language.image["fuD"]) >= 0)
	{
		cmd = "subChn[0]";
	}
	else
	{
		cmd = "subChn["+chnId+"]";
	}

	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf("subChn")>=0)
				{
					document.getElementById("chn1SubBtId").src=langController.language.image["fuU"];	
					document.getElementById("chn2SubBtId").src=langController.language.image["fuU"];	
					document.getElementById("chn3SubBtId").src=langController.language.image["fuU"];	
					document.getElementById("chn4SubBtId").src=langController.language.image["fuU"];
					document.getElementById("chn5SubBtId").src=langController.language.image["fuU"];	
					document.getElementById("chn6SubBtId").src=langController.language.image["fuU"];	
					document.getElementById("chn7SubBtId").src=langController.language.image["fuU"];	
					if( cmd != "subChn[0]" ){
						document.getElementById("chn"+chnId+"SubBtId").src=langController.language.image["fuD"];
					}
				}	
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}                      
		}
	}
	xmlHttp.send();
}

function sdLoad(loading)
{
	if(loading == 1)
	{
		var msgw,msgh,bordercolor;
		msgw=200;//提示窗口的宽度 
		msgh=100;//提示窗口的高度 
		titleheight=25; //提示窗口标题高度 
		bordercolor="#336699";//提示窗口的边框颜色 
		titlecolor="#99CCFF";//提示窗口的标题颜色 
		var sWidth,sHeight;
		sWidth=screen.width;//获取窗口宽度 
		sHeight=screen.height;//获取屏幕高度 
		bgObjRmFileWait=document.createElement("div");//关键在这里，原理：在body中创建一个div，并将其宽度与高度设置为覆盖整个窗体，如此一来就无法对其它窗口时行操作 
		bgObjRmFileWait.setAttribute('id','bgDiv');
		bgObjRmFileWait.setAttribute("align","center");
		bgObjRmFileWait.style.position="absolute";
		bgObjRmFileWait.style.top= "2%";
		bgObjRmFileWait.style.background="#000";
		bgObjRmFileWait.style.filter="alpha(Opacity=60)";
		bgObjRmFileWait.style.opacity="0.6";
		bgObjRmFileWait.style.left=(sWidth-1312)/2*100/sWidth+"%";;
		bgObjRmFileWait.style.width=1306 + "px";
		bgObjRmFileWait.style.height=850 + "px";
		bgObjRmFileWait.style.zIndex = "10000";
		document.body.appendChild(bgObjRmFileWait);//设置完此div后将其显示出来 
		msgObjRmFileWait=document.createElement('div');//创建一个消息窗口 
		msgObjRmFileWait.setAttribute("id","msgDiv");
		msgObjRmFileWait.setAttribute("align","center");
		msgObjRmFileWait.style.background="#535353";
		msgObjRmFileWait.style.border="1px solid " + bordercolor;
		msgObjRmFileWait.style.position = "absolute";
		msgObjRmFileWait.style.left = (sWidth-msgw)/2*100/sWidth+"%";
		msgObjRmFileWait.style.top = (sHeight-msgh-100)/2*100/sHeight+"%";
		msgObjRmFileWait.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
		msgObjRmFileWait.style.width = msgw+"px";
		msgObjRmFileWait.style.height = msgh+"px";
		msgObjRmFileWait.style.zIndex = "10001";
		msgObjRmFileWait.innerHTML =
			'<div align="center"> '+langController.language.strings["loadingWait"]+'\
			</div>';
		document.body.appendChild(msgObjRmFileWait);//设置完此div后将其显示出来 
	}
	else
	{
		document.body.removeChild(msgObjRmFileWait);
		document.body.removeChild(bgObjRmFileWait);
	}
}

function fshSdLoad()
{
	sdLoad(0);
	document.getElementById("overLoadId").innerHTML= "";
}

var chn_name_updata = 0;
function chnNameUpdata()
{	
	chn_name_updata++;
	if( chn_name_updata > 5 )
	{
		setTimeout("chnNameUpdata()",2000);
		return;
	}	
	
	document.onkeydown = function (e) 
	{
		var ev = window.event || e;
		var code = ev.keyCode || ev.which;
		if (!window.event.ctrlKey && code == 116) 
		{
			ev.keyCode ? ev.keyCode = 0 : ev.which = 0;
			cancelBubble = true;
			return false;
		}
	}

	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/GetChnSynTopic",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				//<chnSynTopic[chnName[name1,name2,name2,name4]]>				
				if(xmlHttp.responseText.indexOf("chnName")>=0)
				{
					var str = xmlHttp.responseText;
					var startPos = str.indexOf("chnName[")+8;
					var endPos = str.indexOf(",",startPos);
					var endListPos = str.indexOf("]",startPos);
					var i = 0;
					document.getElementById("chn5TxtId").innerHTML = "";
					document.getElementById("chn6TxtId").innerHTML = "";
					document.getElementById("teacherRaId").disabled = true;
					document.getElementById("studentRaId").disabled = true;
					document.getElementById("fullRaId").disabled = true;
					while(1)
					{
						if(i != 0)
						{
							var name = str.substring(startPos,endPos);
							document.getElementById("chn"+i+"TxtId").innerHTML = langController.language.strings[name];						
								
							if(document.getElementById("chn"+i+"TxtId").innerHTML == langController.language.strings["teacher"])
								document.getElementById("teacherRaId").disabled = false;
							else if(document.getElementById("chn"+i+"TxtId").innerHTML == langController.language.strings["student"])
								document.getElementById("studentRaId").disabled = false;
							else if(document.getElementById("chn"+i+"TxtId").innerHTML == langController.language.strings["board"])
								document.getElementById("fullRaId").disabled = false;
						}
						startPos = endPos+1;
						if(endPos >= endListPos)
							break;
						endPos = str.indexOf(",",startPos);
						if(endPos < 0)
						{
							endPos = endListPos;
						}
						i++;
					}			
				}
			}
		}
	}
	xmlHttp.send();
	setTimeout("chnNameUpdata()",2000);
}

function parse_sysTimeTopic(sys_time_topic)
{
	//<sysTimeTopic[sysTime[20150408 06:29:23.7124]]>
	var year 	= sys_time_topic.substring(22,26);
	var month 	= sys_time_topic.substring(26,28);
	var day 	= sys_time_topic.substring(28,30);
	var time 	= sys_time_topic.substring(31,39);
	if( sys_time_topic.indexOf("sysTimeTopic") >= 0 )
	{
		if(langController.language.lang == "zh-cn")
		{
			document.getElementById("sysDateTimeTxtId").innerHTML = year + "年" + month +"月" + day +"日 " + time;
		}
		else
		{
			document.getElementById("sysDateTimeTxtId").innerHTML = year + " " + month +" " + day + "  " + time;
		}
	}
}

function getsysDataTime()
{
	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/SysDateTimeUpdata",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				parse_sysTimeTopic(xmlHttp.responseText);
			}
			else
			{
			}
		}
	}
	xmlHttp.send();
}

function sysDateTimeUpdata()
{
	getsysDataTime();

	setTimeout("sysDateTimeUpdata()",1000);
}

function getLocalTime()
{
	var localDate = new Date();   
	var time_ms = localDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
	var local_time_s = time_ms/1000;
	
	return local_time_s;
}

function displayTime(id, time2display)
{
	var date = new Date(1970,0,1);
	date.setSeconds(time2display);
	
	var record_time = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
	
	var time_div = document.getElementById(id);
	if( time_div != null )
	{
		time_div.innerHTML = record_time;
		time_div.style.color = "#000000";
	}
}

function convertHHMMSS2Seconds(hhmmss)
{
	var h = parseInt(hhmmss.substring(0, 2));
	var m = parseInt(hhmmss.substring(3, 5));
	var s = parseInt(hhmmss.substring(6, 8));
	
	return h*3600 + m*60 + s;
}

function parse_recordTimeTopic(record_time_topic)
{
	//<recordTimeTopic[recordTime[00:00:00]]>
	if(record_time_topic.indexOf("recordTimeTopic")>=0)
	{
		var time = record_time_topic.substring(28,36);
		var color = "#FFFFFF";
		if( time == "00:00:00") {
			time  = "";			
		}
		document.getElementById("recordTimeTxtId").innerHTML 	= time;
		document.getElementById("recordTimeTxtId").style.color 	= color;
	}
}

var record_time_updata = 0;	
function recordTimeUpdata()
{
	return;
	
	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/RecordTimeUpdata",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				parse_recordTimeTopic(xmlHttp.responseText);
				//<recordTimeTopic[recordTime[00:00:00]]>			
			}
		}
	}
	xmlHttp.send();
	
	//if( record_time_updata <= 5 )
	//{
		setTimeout("recordTimeUpdata()",1000);		
	//}
}

var live_time_from_server 	= 0;
var start_live_time_s 		= 0;
var stop_live_time_s 		= 0;
function liveTimeUpdataLocal()
{					
	if( document.getElementById("startLiveBtId").src.indexOf(langController.language.image["startLiveD"]) >= 0 && start_live_time_s == 0 )
	{		
		start_live_time_s 	= getLocalTime();
		stop_live_time_s 	= 0;
	}
	if( document.getElementById("startLiveBtId").src.indexOf(langController.language.image["startLiveU"]) >= 0 && stop_live_time_s == 0 )
	{		
		start_live_time_s 	= 0;
		stop_live_time_s 	= getLocalTime();
		live_time_from_server = 0;
	}

	
	if( live_time_from_server != 0 && start_live_time_s == 0 )
	{
		start_live_time_s = getLocalTime();
	}
	
	if( start_live_time_s == 0 && live_time_from_server == 0 ) 
	{
		displayTime("liveTimeTxtId", 0);
		setTimeout("liveTimeUpdataLocal()",1000); 
		return;
	}
	
	var cur_time_s = getLocalTime();		
	var live_time_s = cur_time_s - start_live_time_s + live_time_from_server;	
	if( stop_live_time_s != 0 )
		live_time_s = 0;

	displayTime("liveTimeTxtId",live_time_s);	
	
	setTimeout("liveTimeUpdataLocal()",500);
	
	return;
}

function parse_liveTimeTopic(live_time_topic)
{
	//<liveTimeTopic[liveTime[00:00:00]]>
	if(live_time_topic.indexOf("liveTimeTopic")>=0)
	{
		var time  = live_time_topic.substring(24,32);
		var color = "#FFFFFF";
		if( time == "00:00:00") {
			time  = "";	
			if( document.getElementById("startLiveBtId").src.indexOf(langController.language.image["startLiveD"]) >= 0 )	
			{
				live_area_updata = 3;
			}
		}
		document.getElementById("liveTimeTxtId").innerHTML		= time;
		document.getElementById("liveTimeTxtId").style.color 	= color;				
	}
}

var live_time_updata = 0;
function liveTimeUpdata()
{	
	return;
	
	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/LiveTimeUpdata",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				parse_liveTimeTopic(xmlHttp.responseText);
				//<liveTimeTopic[liveTime[00:00:00]]>	
			}
			else
			{
			}
		}
	}
	xmlHttp.send();
	
	//if( live_time_updata <= 5 ){
		setTimeout("liveTimeUpdata()",1000);
	//}
}

var disksize_times = 0;
function parse_diskSizeTopic(msg)
{
	disksize_times++;
	if(　disksize_times > 3 && disksize_times % 60 != 0 ) return;//每分钟更新一次
	initRecordFileBitrate();
	
	//<diskSizeTopic[diskSize[total,free]]>  MB
	//msg = "<diskSizeTopic[diskSize[0,0]]>";
	var totalBitrates = g_bitrate0 + g_bitrate1 + g_bitrate2 + g_bitrate3 + g_bitrate4 + g_bitrate5 + g_bitrate6;
	if(msg.indexOf("diskSizeTopic") >= 0)
	{
		var totalDiskSize = msg.substring(msg.indexOf("diskSize[") + 9, msg.indexOf(","));
		var freeDiskFree  = msg.substring(msg.indexOf(",") + 1, msg.indexOf("]"));
		var freeGB 		  = (parseInt(freeDiskFree)/1024).toFixed(2);
		var totalGB 	  = (parseInt(totalDiskSize)/1024).toFixed(2);
		var diskObj 	  = document.getElementById("diskSizeTxtId");
		var duraObj 	  = document.getElementById("diskTimeToRecordTxtId");
		var info 		  = freeGB + " GB / " + totalGB + " GB";
		var duration 	  = (parseInt(freeDiskFree)*1024)/(totalBitrates/8)/3600;
		if(freeGB < 10)
		{
			diskObj.style.color = "red";
			diskObj.innerHTML 	= info + langController.language.strings["diskTooS"];
		}
		else
		{
			//diskObj.style.color = "white";
			diskObj.innerHTML 	= info;
		}
		
		var hour = " 小时";
		if( getLanguage().indexOf("en") > -1 ){ hour = "　Hours"; }
		duraObj.innerHTML = duration.toFixed(2) + hour;
		
		if(totalGB == 0)
		{
			diskWarning();
		}
	}
}

function diskSizeUpdata()
{
	return;
	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/DiskSizeUpdata",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				parse_diskSizeTopic(xmlHttp.responseText);				
			}
			else
			{
			}
		}
	}
	xmlHttp.send();
	setTimeout("diskSizeUpdata()",10000);
}

function diskWarning()
{
	var url = "diskWarning.html";
	var name;
	var iWidth = 480;
	var iHeight = 280;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	diskWaringWin = window.open(url,name,'height='+(iHeight+1)+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
	diskWaringWin.focus();
}

var g_bitrate0 = 0, g_bitrate1 = 0, g_bitrate2 = 0, g_bitrate3 = 0, g_bitrate4 = 0, g_bitrate5 = 0, g_bitrate6 = 0, g_bitrate7;
function initRecordFileBitrate()
{
	g_bitrate0 = 0; g_bitrate1 = 0; g_bitrate2 = 0; g_bitrate3 = 0; g_bitrate4 = 0; g_bitrate5 = 0; g_bitrate6 = 0;
	var chnNum = 0;
	var dev = getDevType();
	if((dev.indexOf("KL_DEV_4_1_1_MODE")>=0) || (dev.indexOf("KL_DEV_5_1_MODE")>=0))
	{
		chnNum = 7;
	}
	else if((dev.indexOf("KL_DEV_3_1_1_MODE")>=0) || (dev.indexOf("KL_DEV_4_1_MODE")>=0))
	{
		chnNum = 6;
	}
	else if( dev.indexOf("KL_DEV_5_1_1_MODE")>=0 )
	{
		chnNum = 8;
	}
	else
	{
		chnNum = 5;
	}

	g_bitrate0 = getRecordFileBitrate(0);
	g_bitrate1 = getRecordFileBitrate(1);
	g_bitrate2 = getRecordFileBitrate(2);
	g_bitrate3 = getRecordFileBitrate(3);
	g_bitrate4 = getRecordFileBitrate(4);

	if(chnNum > 5 )	g_bitrate5 = getRecordFileBitrate(5);
	if(chnNum > 6 ) g_bitrate6 = getRecordFileBitrate(6);
	if(chnNum > 7 ) g_bitrate7 = getRecordFileBitrate(7);
}

/*function setbitrate(id)
{
	if(id == 0) g_bitrate0 = getRecordFileBitrate(0);
	if(id == 1) g_bitrate0 = getRecordFileBitrate(1);
	if(id == 2) g_bitrate0 = getRecordFileBitrate(2);
	if(id == 3) g_bitrate0 = getRecordFileBitrate(3);
	if(id == 4) g_bitrate0 = getRecordFileBitrate(4);
	if(id == 5) g_bitrate0 = getRecordFileBitrate(5);
	if(id == 6) g_bitrate0 = getRecordFileBitrate(6);
}*/

function getRecordFileBitrate(id)
{
	var bitrate = 0;
	var xmlHttp = getXmlHttp();	
	var cmd ="channel"+id+"Topic";
	xmlHttp.open("POST","/action/GetChannelTopic?cmd="+encodeURIComponent(cmd),false);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			var startPos = str.indexOf(cmd) + cmd.length + 1;
			var enable = false;
			if(xmlHttp.status==200)
			{
				var subStartPos = 0;
				var subEndPos = 0;
				if((subStartPos = str.indexOf("fileEnable",startPos)) >= 0)
				{
					subStartPos += 11;
					subEndPos = str.indexOf("]",subStartPos);
					enable = (str.substring(subStartPos,subEndPos) == "true");
				}
				startPos = subEndPos + 2;				
				if((subStartPos = str.indexOf("fileBitrate",startPos)) >= 0)
				{
					subStartPos += 12;
					subEndPos = str.indexOf("]",subStartPos);
					var temp = str.substring(subStartPos,subEndPos - 4);
					bitrate = enable ? parseInt(temp) : 0;
				}
			}
		}
	}
	
	xmlHttp.send();
	
	return bitrate;
}

function parse_recordBaseInfoTopic(msg)
{
	if(msg.indexOf("recordBaseInfoTopic")>=0)
	{
		//<recordBaseInfoTopic[recordBaseInfo[classTopic:no,speaker:no,videoInfo:1920*1080@30,audioInfo:48000@2,fileBitrate:4000Kbps]]>
		var startInd = msg.indexOf("classTopic:")+11;	
		document.getElementById("classTopicTxtId").innerHTML= msg.substring(startInd,msg.indexOf(",",startInd));
		startInd = msg.indexOf("speaker:")+8;	
		document.getElementById("speakerTxtId").innerHTML= msg.substring(startInd,msg.indexOf(",",startInd));
		startInd = msg.indexOf("videoInfo:")+10;	
		document.getElementById("videoInfoTxtId").innerHTML= msg.substring(startInd,msg.indexOf(",",startInd));
		startInd = msg.indexOf("audioInfo:")+10;	
		var audioInfo =  msg.substring(startInd,msg.indexOf(",",startInd));
		var tmp = audioInfo.substring(0,audioInfo.indexOf("@")) + "Hz";
		if( audioInfo.substring(audioInfo.indexOf("@")+1) == "1")
		tmp += langController.language.strings["mono"];
		else tmp += langController.language.strings["stereo"];
		document.getElementById("audioInfoTxtId").innerHTML= tmp;
		startInd = msg.indexOf("fileBitrate:")+12;	
		document.getElementById("fileBitrateTxtId").innerHTML= msg.substring(startInd,msg.indexOf("K",startInd)) + " Kbps";
	}
}

function recordBaseInfoUpdata()
{
	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/RecordBaseInfoUpdata",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				parse_recordBaseInfoTopic(xmlHttp.responseText);
			}
			else
			{
			}
		}
	}
	xmlHttp.send();
	//setTimeout("recordBaseInfoUpdata()",20000);
}

function getCharCount(str,c)
{
	var num = 0 ;
	var i;
	for (i = 0; i < str.length; i++)
	{ 
		var z = str.charAt(i);
		if (z == c)
		{
			num += 1;
		}
	}
	return num;
}

function recordFileDetail(dirname)
{
	//dirname=encodeURIComponent(dirname);
	var url="classDetials.html?dirname="+dirname;
	var name;
	var iWidth=900;
	var iHeight=530;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	classDetailsWin = window.open(url,name,'height='+(iHeight+1)+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
	classDetailsWin.focus();
}

function getFileDetailNew(dirname)
{        
	var school;
	var address;
	var grade;
	var speaker;
	var topic;
	var overview;
	var strStartTime;
	var strStopTime;
 
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/GetRecordFileClassInfo?cmd="+encodeURIComponent(dirname),false);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			if(xmlHttp.status==200)
			{
				var startPos = 0;
				var endPos;
				if((startPos = str.indexOf("school",startPos)) >= 0)
				{
					startPos += 7;
					endPos = str.indexOf("\n",startPos);
					school = str.substring(startPos,endPos);
				}
				startPos = endPos+1;
				if((startPos = str.indexOf("address",startPos)) >= 0)
				{
					startPos += 8;
					endPos = str.indexOf("\n",startPos);
					address = str.substring(startPos,endPos);
				}
				startPos = endPos+1;
				if((startPos = str.indexOf("grade",startPos)) >= 0)
				{
					startPos += 6;
					endPos = str.indexOf("\n",startPos);
					grade = str.substring(startPos,endPos);
				}
				startPos = endPos+1;
				if((startPos = str.indexOf("speaker",startPos)) >= 0)
				{
					startPos += 8;
					endPos = str.indexOf("\n",startPos);
					speaker = str.substring(startPos,endPos);
				}
				startPos = endPos+1;
				if((startPos = str.indexOf("topic",startPos)) >= 0)
				{
					startPos += 6;
					endPos = str.indexOf("\n",startPos);
					topic = str.substring(startPos,endPos);
				}
				startPos = endPos+1;
				if((startPos = str.indexOf("overview",startPos)) >= 0)
				{
					startPos += 9;
					endPos = str.indexOf("startRecordTime",startPos);
					overview = str.substring(startPos,endPos);
				}
				startPos = endPos-16;
				if((startPos = str.indexOf("startRecordTime",startPos)) >= 0)
				{
					startPos += 16;
					endPos = str.indexOf(".",startPos);
					var start = str.substring(startPos,endPos);
					//20160310 20:23:53
					strStartTime = start.substring(0,4) +"-"+start.substring(4,6)+"-"+start.substring(6);
				}
				startPos = endPos+1;
				if((startPos = str.indexOf("stopRecordTime",startPos)) >= 0)
				{
					startPos += 15;
					endPos = str.indexOf(".",startPos);
					var stop = str.substring(startPos,endPos);
					strStopTime = stop.substring(0,4) +"-"+stop.substring(4,6)+"-"+stop.substring(6);
				}
			}
		}
	}
	xmlHttp.send();
	
	return [school,address,grade,speaker,topic,strStartTime,strStopTime,overview];
}

function calcDuration(start, stop)
{
	var date1 = new Date(start.replace(/-/g,"/"));
	var date2 = new Date(stop.replace(/-/g,"/"));
	var date3 = date2.getTime()-date1.getTime();  //时间差的毫秒数


	//计算出相差天数
	var days = Math.floor(date3/(24*3600*1000));

	//计算出小时数

	var leave1 = date3%(24*3600*1000);    //计算天数后剩余的毫秒数
	var hours = Math.floor(leave1/(3600*1000));
	//计算相差分钟数
	var leave2 = leave1%(3600*1000);        //计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2/(60*1000));
	//计算相差秒数
	var leave3 = leave2%(60*1000);      //计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3/1000);
	var hh = days*24+hours
	if(hh >= 0 && hh < 10)
	{
		durTime = "0"+hh+":";
	}
	else
	{
		durTime = hh+":";
	}

	if(minutes >= 0 && minutes < 10)
	{
		durTime += "0"+minutes+":";
	}
	else 
		durTime += minutes+":";

	if(seconds >= 0 && seconds < 10)
	{
		durTime += "0"+seconds;
	}
	else 
		durTime += seconds;
	
	return durTime;
}

function find(str,cha,num)
{
	var x=str.indexOf(cha);
	for(var i=1;i<num;i++)
	{
		x=str.indexOf(cha,x+1);
	}
	return x;
}

var _show_file_name = "no";
function playFile(fileName)
{
	fileName=decodeURIComponent(fileName);
	_show_file_name = fileName;
	showPPTIndex();

	var ff = fileName.substring(fileName.indexOf("/")+1);
	document.getElementById("playFileNameTxtId").innerHTML = ff.substring(find(ff,"_",8)+1);
	var serverIp = location.href.substring(7,location.href.indexOf("/",7));
	var url = "http://"+serverIp+":9090/record/"+encodeURIComponent(fileName);
	document.getElementById("videoViewId").innerHTML = '<video id="videoPlayId" width="804" height="452" autoplay="autoplay" src='+url+' controls="controls"></video>';
	document.getElementById("showMediaInfoId").style.display="block";
}

function downloadFile(url)
{  
	const downloadAble = 'download' in document.createElement('a');

	if(downloadAble == true)
	{
		const a = document.createElement('a');
		a.setAttribute('href', url);
		a.setAttribute('download', url.substring( url.lastIndexOf("/")+1 ));
		a.click();
	}
	else
	{
		var elemIF = document.createElement("iframe");  
		elemIF.src = url;
		elemIF.style.display = "none";  
		document.body.appendChild(elemIF); 
	}
}  

function setPos(pos)
{
	var video = document.getElementById("videoPlayId");
	video.currentTime=pos;
}

function showPPTIndex()
{
	document.getElementById("showpptIndexId").disabled = "disabled";
	document.getElementById("showpptIndexId").style.background = "#737373";	
	document.getElementById("showpptIndexId").value=langController.language.strings["pptindex"];
	
	return getMediaIndex(_show_file_name);
}

function updateMediaInfoLang()
{
	document.getElementById("creationTimeId").innerHTML=langController.language.strings["creationTime"];
	document.getElementById("durationTimeId").innerHTML=langController.language.strings["durationTime"];
	document.getElementById("fileBitratesId").innerHTML=langController.language.strings["fileBitrates"];
	document.getElementById("videoCodecId").innerHTML=langController.language.strings["videoCodec"];
	document.getElementById("resolutionId").innerHTML=langController.language.strings["resolution"];
	document.getElementById("fpsId").innerHTML=langController.language.strings["fps"];
	document.getElementById("audioCodecId").innerHTML=langController.language.strings["audioCodec"];
	document.getElementById("audioSampleId").innerHTML=langController.language.strings["audioSample"];
	document.getElementById("audioChnId").innerHTML=langController.language.strings["audioChn"];
}

function genMediaInfoHtml()
{
	var tmp =  '<table width="550" height="270" border="0" cellpadding="0" cellspacing="0">';
		tmp+=  '<tr><td width="120" height="30"><div align="right" id="creationTimeId">创建时间:</div></td><td width="100"></td><td width="220"><div align="left" id="creationTimeTxtId"></div></td></tr>';	
		tmp+=  '<tr><td height="30"><div align="right" id="durationTimeId">文件时长:</div></td><td width="100"></td><td><div align="left" id="durationTxtId"></div></td></tr>';
		tmp+=  '<tr><td height="30"><div align="right" id="fileBitratesId">文件码率:</div></td><td width="100"></td><td><div align="left" id="bitrateTxtId"></div></td></tr>';
		tmp+=  '<tr><td height="30"><div align="right" id="videoCodecId">视频编码:</div></td><td width="100"></td><td><div align="left" id="vencTxtId"></div></td></tr>';
		tmp+=  '<tr><td height="30"><div align="right" id="resolutionId">视频分辨率:</div></td><td width="100"></td><td><div align="left" id="vrTxtId"></div></td></tr>';
		tmp+=  '<tr><td height="30"><div align="right" id="fpsId">视频帧率:</div></td><td width="100"></td><td><div align="left" id="fpsTxtId"></div></td></tr>';
		tmp+=  '<tr><td height="30"><div align="right" id="audioCodecId">音频编码:</div></td><td width="100"></td><td><div align="left" id="aencTxtId"></div></td></tr>';
		tmp+=  '<tr><td height="30"><div align="right" id="audioSampleId">音频采样:</div></td><td width="100"></td><td><div align="left" id="sampleTxtId"></div></td></tr>';
		tmp+=  '<tr><td><div align="right" id="audioChnId">音频声道:</div></td><td width="100"></td><td><div align="left" id="chnTxtId"></div></td></tr></table>';;
		
		return tmp;
}

function showMediaInfoNoWindow()
{
	var tmp = genMediaInfoHtml();
	document.getElementById("fileIndexId").innerHTML = tmp;	
	updateMediaInfoLang();
	
	document.getElementById("showpptIndexId").value = langController.language.strings["mediainfo"];
	
	getMediaInfo(_show_file_name);
}

function showMediaInfo(filename)
{
	filename = decodeURIComponent(filename);
	if(filename == "no") filename = _show_file_name;
	if(filename == "no") return;
	var url="mediaInfo.html?filename="+encodeURIComponent(filename);
	var name;
	var iWidth=680;
	var iHeight=360;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	mediainfoWin = window.open(url,name,'height='+(iHeight+1)+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
	mediainfoWin.focus();
}

function timeFilter(seconds)
{
	var sec = seconds % 60;
	var min = Math.floor(seconds / 60);
	var hour = Math.floor(min / 60);
	min = min % 60;
		
	return ("00" + hour).slice(-2) + ":" + 
	       ("00" + min).slice(-2) + ":" + 
		   ("00" + sec).slice(-2);
}

function getMediaIndex(fileName)
{
	if( user_not_login() ) return;	
		
	path = fileName.substring(0,fileName.lastIndexOf("/")+1);
	var cmd = "getMediaIndex["+path+"]";
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetFileListTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			if(xmlHttp.status==200)
			{	
				var index = '<table width="500" height="270" border="0" cellpadding="0" cellspacing="0">';
				var startPos=1,endPos;		
				var index_count = 0;
				while( (endPos = str.indexOf("\r",startPos)) >=0 )
				{				
					var ind = str.substring(startPos,endPos);					
					var start = ind.indexOf(" ",0);
					var pos = ind.substring(0, start);//alert(pos + " " + parseInt(pos));					
					var title = index_count + 1 + ".  [" + timeFilter(parseInt(pos)) + "]  " + ind.substring(start+1,ind.length);
					
					index += '<tr><td width="260" height="30" ><div align="left" id="creationTimeId" ><a href="#" onclick="setPos(' + pos + ')">' + title + '</div></td></tr>';
					
					startPos = endPos+2;
					index_count ++;
				}				
				for( var i = index_count; i < 9; ++i )
				{
					index += '<tr><td width="260" height="30"><div align="left" id="creationTimeId" ><a href="#"></div></td></tr>';
				}
				index += "</table>";
				
				document.getElementById("fileIndexId").innerHTML = index;	
				if( index_count == 0 )
				{
					showMediaInfoNoWindow();
				}
			}
		}
	}
	xmlHttp.send();
}

function getMediaInfo(fileName)
{
	if( user_not_login() ) return;	
	
	var xmlHttp = getXmlHttp();	
	var cmd = "getMediaInfo["+fileName+"]";
	xmlHttp.open("POST","/action/SetFileListTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			//<creationTime[2016-03-16 12:23:35],duration[00:34:34.67],bitrate[4323 bk/s],video[h264 (High),1920x1080,30 fps],audio[aac,48000 Hz,stereo]>
			if(xmlHttp.status==200)
			{
				var startPos=0,endPos;
				if( (startPos = str.indexOf("creationTime[",startPos)) >=0 )
				{
					startPos += 13;
					endPos = str.indexOf("]",startPos);
					document.getElementById("creationTimeTxtId").innerHTML = str.substring(startPos,endPos);
					startPos = endPos+1;
				}
				if( (startPos = str.indexOf("duration[",startPos)) >=0 )
				{
					startPos += 9;
					endPos = str.indexOf("]",startPos);
					document.getElementById("durationTxtId").innerHTML = str.substring(startPos,endPos);
					startPos = endPos+1;
				}
				if( (startPos = str.indexOf("bitrate[",startPos)) >=0 )
				{
					startPos += 8;
					endPos = str.indexOf("]",startPos);
					document.getElementById("bitrateTxtId").innerHTML = str.substring(startPos,endPos);
					startPos = endPos+1;
				}	
				if( (startPos = str.indexOf("video[",startPos)) >=0 )
				{
					startPos += 6;
					endPos = str.indexOf(",",startPos);
					document.getElementById("vencTxtId").innerHTML = str.substring(startPos,endPos);

					startPos = endPos+1;
					endPos = str.indexOf(",",startPos);
					document.getElementById("vrTxtId").innerHTML = str.substring(startPos,endPos);

					startPos = endPos+1;
					endPos = str.indexOf("]",startPos);
					document.getElementById("fpsTxtId").innerHTML = str.substring(startPos,endPos);
					startPos = endPos+1;
				}
				if( (startPos = str.indexOf("audio[",startPos)) >=0 )
				{
					startPos += 6;
					endPos = str.indexOf(",",startPos);
					document.getElementById("aencTxtId").innerHTML = str.substring(startPos,endPos);

					startPos = endPos+1;
					endPos = str.indexOf(",",startPos);
					document.getElementById("sampleTxtId").innerHTML = str.substring(startPos,endPos);

					startPos = endPos+1;
					endPos = str.indexOf("]",startPos);
					document.getElementById("chnTxtId").innerHTML = str.substring(startPos,endPos);
				}
			}
		}
	}
	xmlHttp.send();
}

function ckBoxAClassfile(dirName,dirNameList)
{	
	if(document.getElementById("ckBoxAClass"+dirName.substring(0,24)+"Id").checked == true)
	{
		ckBoxDirNameArry.put(dirName,new Map());
		var n = 1;

		var fileStartPos = 0;
		var fileEndPos;
		fileStartPos = dirNameList.indexOf("[",fileStartPos)+1;
		while(true)
		{
			var obj = document.getElementById("ckBoxAfile"+dirName.substring(0,24)+"Id"+n++);
			if(obj != null)
			{
				obj.checked = true;
			}

			fileEndPos = dirNameList.indexOf("=",fileStartPos);
			var fileName = dirNameList.substring(fileStartPos,fileEndPos);
			ckBoxDirNameArry.get(dirName).put(dirName+"/"+fileName,dirName);
			fileStartPos = dirNameList.indexOf(",",fileEndPos);
			if(fileStartPos < 0)
				break;
			fileStartPos += 1;
		}
	}
	else
	{		
		ckBoxDirNameArry.remove(dirName);
		var n = 1;
		while(true)
		{
			var obj = document.getElementById("ckBoxAfile"+dirName.substring(0,24)+"Id"+n++);
			if(obj == null)break;
			obj.checked = false;
		}

	}
	
}

function ckBoxAfile(dirName,fileName,fileNum,indx)
{
	if(document.getElementById("ckBoxAfile"+dirName.substring(0,24)+"Id"+indx).checked == true)
	{
		document.getElementById("ckBoxAClass"+dirName.substring(0,24)+"Id").checked = true;
		if(ckBoxDirNameArry.get(dirName) == undefined)
		{
			ckBoxDirNameArry.put(dirName,new Map());
		}
		ckBoxDirNameArry.get(dirName).put(fileName,dirName);
	}
	else
	{
		var tmp = ckBoxDirNameArry.get(dirName);
		tmp.remove(fileName);
		if(tmp.isEmpty())
		{
			document.getElementById("ckBoxAClass"+dirName.substring(0,24)+"Id").checked = false;
		}		
	}
}

function checkOpenClassDirStatus(idd)
{
	var objd = document.getElementById("openDirInput"+idd+"Id");
	if(objd.src.indexOf("image/dirD.png")>=0)
	{
		document.getElementById("classFileList"+idd+"Id").innerHTML = "";
		objd.src = "image/dirU.png";
		return true;
	}
	
	objd.src = "image/dirD.png";
	
	return false;
}

function classDirHeadHtml()
{
	var strHtml = ' \
		   <div align="center" style="color:#000000; font-size:15px;font-weight:400"> \
		   <table width="640" height="25" border="0" cellpadding="0" cellspacing="0" \
		   style="border-top:0px;border-bottom:0px;border-left:0px;border-right:0px;"> \
		   <tr> \
		   <td width="285" bgcolor="#737373"><div align="center">'+langController.language.strings["fileName"]+'</div></td> \
		   <td width="104" bgcolor="#737373"><div align="center" >'+langController.language.strings["fileSize"]+'</div></td> \
		   <td width="145" bgcolor="#737373"><div align="center">'+langController.language.strings["fileType"]+'</div></td> \
		   <td width="75" bgcolor="#737373"><div align="center">'+langController.language.strings["operating"]+'</div></td> \
		   </tr> \
		   </table> \
		   </div> \
		   ';
		   
	return strHtml;
}

function fileHeadHtml()
{
	return '<div align="center" style="color:#000000; font-size:15px;font-weight:400"><table width="640" height="25" border="0" cellpadding="0" cellspacing="0" style="border-top:0px;border-bottom:0px;border-left:0px;border-right:0px;"> <tr>';
}

function processClassFiles(dirNameList)
{	
	var dirName = dirNameList.substring(0,dirNameList.indexOf("["));
	var fileNameArr = new Array();
	var fileSizeArr = new Array();
	var fileStartPos = dirNameList.indexOf("[")+1;
	var fileEndPos = 0;
	var fileSizeEndPos = 0;
	var fileNum = 0;
	while(true)
	{
		fileEndPos = dirNameList.indexOf("=",fileStartPos);
		fileNameArr[fileNum] = dirNameList.substring(fileStartPos,fileEndPos);
		fileSizeEndPos = dirNameList.indexOf(",",fileEndPos);
		if(fileSizeEndPos == -1)
			fileSizeEndPos = dirNameList.length-1;
		var size = parseInt(dirNameList.substring(fileEndPos+1,fileSizeEndPos));
		if(size > 1073741824)
		{
			size = size/1073741824;
			fileSizeArr[fileNum++] = size.toFixed(2)+"GB";
		}
		else if(size > 1048576)
		{
			size = size/1048576;
			fileSizeArr[fileNum++] = size.toFixed(2)+"MB";
		}
		else if(size > 1024)
		{
			size = size/1024;
			fileSizeArr[fileNum++] = size.toFixed(2)+"KB";
		}
		else
		{
			fileSizeArr[fileNum++] = size+"B";
		}

		fileStartPos = fileSizeEndPos+1;
		if(fileStartPos >= dirNameList.length)
			break;
	}

	var i = 0;
	var len = fileNameArr.length;
	var j, d,g;
	for (; i < len; i++) {
		for (j = 0; j < len; j++) {
			if (fileNameArr[i] < fileNameArr[j]) {
				d = fileSizeArr[j];
				fileSizeArr[j] = fileSizeArr[i];
				fileSizeArr[i] = d;

				g = fileNameArr[j];
				fileNameArr[j] = fileNameArr[i];
				fileNameArr[i] = g;
			}
		}
	}

	return [dirName, fileNameArr, fileSizeArr];
}

function openClassDir(idd,dirNameList)
{
	dirNameList = decodeURIComponent(dirNameList);
	if( checkOpenClassDirStatus(idd) ) return;
	
	var strHtml = classDirHeadHtml();

	var files = processClassFiles(dirNameList);	
	var dirName = files[0];
	var fileNameArr = files[1];
	var fileSizeArr = files[2];
	var fileNum = fileNameArr.length;
	
	var ckBoxStr = "";
	var playDisabledStr = 'disabled="disabled"';
	if(ifDisplayDirCheckbox(0))
	{
		ckBoxStr = 'style="display:none"';
		playDisabledStr = "";
	}
	
	var ckBoxFlags = 0;
	if(document.getElementById("ckBoxAClass"+idd+"Id").checked == true && ckBoxDirNameArry.get(dirName).isEmpty())
	{
		ckBoxFlags = 1;
	}
	else if(document.getElementById("ckBoxAClass"+idd+"Id").checked == true)
	{
		ckBoxFlags = 2;
	}


	for(var j = 0;j < fileNum;j++)
	{
		var checkedStr = "";
		
		var fileName = fileNameArr[j].substring(find(fileNameArr[j],"_",8)+1);
		var playFileName = dirName+"/"+fileNameArr[j];
		strHtml += fileHeadHtml();
		
		if(ckBoxStr == "")
		{
			if(ckBoxFlags == 1)
			{
				ckBoxDirNameArry.get(dirName).put(playFileName,dirName);	
				checkedStr = 'checked="checked"';
			}
			else if(ckBoxFlags == 2)
			{
				if(ckBoxDirNameArry.get(dirName).get(playFileName) != undefined)
				{
					checkedStr = 'checked="checked"';
				}
			}
			strHtml += ' \
			   <td width="40" bgcolor="#737373"><div align="left"> \
				<input value='+playFileName+' id="ckBoxAfile'+dirName.substring(0,24)+'Id'+(j+1)+'" type="checkbox" '+checkedStr+' \
				onclick="ckBoxAfile(\''+dirName+'\',\''+playFileName+'\',\''+fileNum+'\',\''+(j+1)+'\')"/>'+(j+1)+'</div></td> \
			   <td width="245" bgcolor="#737373"><div align="center">'+fileName+'</div></td>';
		}
		else
		{
			strHtml += ' \
			   <td width="20" bgcolor="#737373"><div align="center"><input type="checkbox" style="display:none"/>'+(j+1)+'</div></td> \
			   <td width="265" bgcolor="#737373"><div align="center">'+fileName+'</div></td>';
		}
		var fileType = ( (fileName.indexOf(".ts") >= 0) ? "TS" : "MP4" );
		var disableP = (fileType == "TS" ? "disabled=\"disabled\"" : "");
		strHtml += ' \
			   <td width="104" bgcolor="#737373"><div align="center">'+fileSizeArr[j]+'</div></td> \
			   <td width="145" bgcolor="#737373"><div align="center">'+fileType+'</div></td> \
			   <td width="82" bgcolor="#737373"><div align="center"> \
			   <input type="button" value='+langController.language.strings["info"]+' onclick="showMediaInfo(\''+encodeURIComponent(playFileName)+'\')" \
			   style="width:40px; height:20px; background-color:#636363;border:0px; border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;" /> \
			   <input type="button" '+playDisabledStr+' value='+langController.language.strings["play"]+' onclick="playFile(\''+encodeURIComponent(playFileName)+'\')" \
			   style="width:40px; height:20px; background-color:#636363;border:0px; \
			   border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;" '+disableP+' /></div></td> \
			   </tr> \
			   </table> \
			   </div>';
	}
	document.getElementById("classFileList"+idd+"Id").innerHTML = strHtml;
}

var vEditCkFileName;
var vrad;
function ckRadAFile(radId)
{
	if(document.getElementById(radId).checked == true)
	{
		vrad = radId;
		vEditCkFileName = document.getElementById(radId).value;
	}
	else
	{
		alert(2);
	}
}

function vEditOpenClassDir(idd,dirNameList)
{
	dirNameList = decodeURIComponent(dirNameList);
	if( checkOpenClassDirStatus(idd) ) return;	
	var strHtml = classDirHeadHtml();

	var files = processClassFiles(dirNameList);	
	var dirName = files[0];
	var fileNameArr = files[1];
	var fileSizeArr = files[2];
	var fileNum = fileNameArr.length;	

	var radioCkStr = "";
	for(var j = 0;j < fileNum;j++)
	{		
		var fileName = fileNameArr[j].substring(find(fileNameArr[j],"_",8)+1);
		var playFileName = dirName+"/"+fileNameArr[j];
		strHtml += fileHeadHtml();
		
		var radId = "radioAfile"+dirName.substring(0,24)+"Id"+(j+1);
		if(vrad == radId)
		{
			radioCkStr = 'checked="checked"';
		}
		else
		{
			radioCkStr = "";
		}
		var fileType = ( (fileName.indexOf(".ts") >= 0) ? "TS" : "MP4" );
		var disableP = (fileType == "TS" ? "disabled=\"disabled\"" : "");


		strHtml += ' \
			   <td width="40" bgcolor="#737373"><div align="left"> \
			   <input '+radioCkStr+' value='+playFileName+' name="vvvv" id='+radId+' type="radio" \
			   onclick="ckRadAFile(\''+radId+'\')" '+disableP+' />'+(j+1)+'</div></td> \
			   <td width="245" bgcolor="#737373"><div align="center">'+fileName+'</div></td>';
		
		strHtml += ' \
			   <td width="104" bgcolor="#737373"><div align="center">'+fileSizeArr[j]+'</div></td> \
			   <td width="145" bgcolor="#737373"><div align="center">'+fileType+'</div></td> \
			   <td width="75" bgcolor="#737373"><div align="center"> \
			   </div></td> \
			   </tr> \
			   </table> \
			   </div>';
	}
	document.getElementById("classFileList"+idd+"Id").innerHTML = strHtml;
}

function getSeachKeyword()
{
	var obj = document.getElementById("keyword");
	if( obj == undefined ) return "";
	
	var keyword = obj.value;
	
	while(keyword.indexOf("-") >= 0)
	{
		keyword = keyword.replace("-", "");
	}
	
	return keyword;
}

var _all_file_list = "";
function resetAllFileList()
{
	_all_file_list = "";
}

function getRecordFileListNew(i, list, type, vEdit)
{
	if(_all_file_list != "")
	{
		var dirNameArr = updateFileList(_all_file_list);
		getRecordFileListNew__(type,vEdit, dirNameArr);
		return _all_file_list; 
	}
	var str = "";
	var xmlHttp = getXmlHttp();	
	var cmd = "updata[" + i*100 + "," + (i*100 + 99) + "]";//alert(cmd);
	//var cmd = "updata[0,0]";//alert(cmd);
	xmlHttp.open("POST","/action/SetFileListTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd), true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState == 4)
		{
			//<dirName[film.mp4=100,sudent.mp4=100,vga.mp4=100,teacher.mp4:100,full.mp4:101],dirName[film.mp4:90,sudent.mp4:90,vga.mp4:91,teacher.mp4:92,full.mp4:91]>
			if( xmlHttp.status == 200 )
			{				
				str = xmlHttp.responseText;					
				if( str.length < 5 )
				{
					list = "<" + list + ">";
					_all_file_list = list;
					var dirNameArr = updateFileList(list);
					getRecordFileListNew__(type,vEdit, dirNameArr);
					
				}
				else
				{
					list += str.substring(1, str.length - 1) + ",";
					getRecordFileListNew(i+1, list, type, vEdit);
				}
			}
		}
	}
	xmlHttp.send();	
	
}

function updateFileList(str)
{
	var keyword = getSeachKeyword();
	
	if( user_not_login() ) return;	
	
	var dirNameArr = new Array();
	var dirNum = 0;
	
	//var str = getAllFileList();//alert(str);
	var strLen = str.length;
				
	if( str == "<>"){}
	else if( strLen > 2)
	{	
		var dirStartPos = 1;
		var dirEndPos = 0;
		while(true)
		{
			dirEndPos = str.indexOf("]",dirStartPos) + 1;	
			if(dirEndPos <= 0) break;
			
			var name = str.substring(dirStartPos,dirEndPos);							
			if( name.indexOf(keyword) != -1 ) dirNameArr[dirNum++] = name;
			dirStartPos = dirEndPos + 1;
			
			if(dirStartPos >= strLen) break;						
		}
	}
	
	return dirNameArr;
}

function sortFileList(dirNameArr, sortType)
{	
	if(sortType == "sortStartTime")
	{
		dirNameArr.sort(function(a,b){return a<b?1:-1});
	}
	else if(sortType == "sortSpeaker")
	{
		dirNameArr.sort(function(a,b)
				{
					var as = a.indexOf("_",a.indexOf("_")+1);
					var bs = b.indexOf("_",b.indexOf("_")+1);
					return a.substring(as)<b.substring(bs)?1:-1
				});
	}
	else if(sortType == "sortTopic")
	{
		dirNameArr.sort(function(a,b)
				{
					var as = a.indexOf("_",a.indexOf("_",a.indexOf("_")+1)+1);
					var bs = b.indexOf("_",b.indexOf("_",b.indexOf("_")+1)+1);
					return a.substring(as)<b.substring(bs)?1:-1
				});
	}	

	return dirNameArr;	
}

function calcPage(type, totalPageNum)
{
	if( totalPageNum == 0 ) return 0;
	
	if(type == -1)
	{
		page--;
	}
	else if(type == -2)
	{
		page++;
	}
	else if(type == -3)
	{
		page = totalPageNum;
	}
	else if(type == -4)
	{
	}
	else page = type;

	if(page <= 0)
	{
		page = 1;
	}
	else if(page > totalPageNum)
	{
		page = totalPageNum;
	}
	
	return page;
}

function updatePageStatus(page, dirNum, totalPageNum)
{
	var sel = document.getElementById("jumpPageSelId");
	sel.options.length = 0;
	if( totalPageNum >= 1 )
	{
		for(var i = 1;i <= totalPageNum;i++)
		{
			sel.options.add(new Option(i  +"",i + ""));	
		}
		sel.options[page-1].selected = true;
	}else{
		sel.options.add(new Option("0","0"));	
	}
	
	document.getElementById("totalClassNumTxtId").innerHTML = langController.language.strings["total"] + dirNum + langController.language.strings["lessons"];
	document.getElementById("pageTxtId").innerHTML = page + "/" + totalPageNum + langController.language.strings["page"];
}

function ifDisplayDirCheckbox(vEdit)
{
	var ckBoxStr = "";
	if( vEdit == 1 || document.getElementById("downloadCkBoxBtId") != null && document.getElementById("downloadCkBoxBtId").value != langController.language.strings["cancel"] )
	{
		ckBoxStr = 'style="display:none"';
	}
	
	return ckBoxStr;
}

function setTTTopic(cmd)
{
	if( user_not_login() ) return;	
	
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetTtTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf( "<No Permission>") >= 0)
				{				
					alert(langController.language.strings["noPermission"]);
				}
				window.close();
			}
		}
	}
	
	xmlHttp.send();				
}

var page;
function getRecordFileListNew__(type,vEdit, dirNameArr)
{
	if( user_not_login() ) return;	

	var sortType = "sortStartTime";
	var chooseall = false;
	var chooseallobj = document.getElementById("chooseAllBtId");
	if( chooseallobj ) chooseall = chooseallobj.checked;

	var dirNum = dirNameArr.length;
	var pageDirNum = 11;
	var totalPageNum = Math.ceil(dirNum/pageDirNum);
	page = calcPage(type, totalPageNum);
	dirNameArr = sortFileList(dirNameArr, sortType);
	var pagefiles = new Map();					
	var strHtml="";

	if( dirNum > 0 )
	{						
		var pageShowDirNum = (pageDirNum*page <= dirNum ? pageDirNum : dirNum%pageDirNum);
		var curStartDirInd = pageDirNum*(page-1);
		var ckBoxStr = ifDisplayDirCheckbox(vEdit);	
		for (var i = curStartDirInd; i < curStartDirInd+pageShowDirNum; i++) 
		{
			var dirName = dirNameArr[i].substring(0,dirNameArr[i].indexOf("["));
			//school,address,grade,speaker,topic,start,stop
			var info = getFileDetailNew(dirName);
			var durTime = calcDuration(info[5], info[6]);
			var idd = dirName.substring(0,24);

			var checkedStr = "";					
			if( ckBoxStr == "" && ckBoxDirNameArry.get(dirName) != undefined ) checkedStr = "checked";//当前页中已经被选中的文件
			if( chooseall ) checkedStr = "checked";
			
			if( chooseall && ckBoxStr == "" ) pagefiles.put(dirName, dirNameArr[i]);//记录全选时，当前页尚未被选中的文件
			
			strHtml += ' \
				<div align="center" style="color:#000000; font-size:13px;font-weight:200; margin-top:7px"> \
				<table width="640" height="60" border="0" cellpadding="0" cellspacing="0" bgcolor="#737373" \
					style="border-top:0px;border-bottom:0px;border-left:0px;border-right:0px;"> \
				<tr> \
				<td width="58"><div align="center"><input id="ckBoxAClass'+idd+'Id" \
				type="checkbox" ' + ckBoxStr + ' '+checkedStr + ' onclick="ckBoxAClassfile(\'' + dirName + '\',\'' + dirNameArr[i]+'\')"/> </div>'; 							
			
			
			strHtml += ' \
					<div align="center"><input type="image" id="openDirInput'+idd+'Id" src="image/dirU.png"';
			if(vEdit == 1)
			{
				strHtml += ' \
					   onclick="vEditOpenClassDir(\''+idd+'\',\''+encodeURIComponent(dirNameArr[i])+'\')"/></div></td>';

			}
			else
			{
				strHtml += ' \
					   onclick="openClassDir(\''+idd+'\',\''+encodeURIComponent(dirNameArr[i])+'\')"/></div></td>';
			}
			strHtml += ' \
				<td width="582"> \
				<div align="center"> \
				<table width="582" height="30" border="0" cellpadding="0" cellspacing="0"> \
				<tr> \
				<td width="82"><div align="left">'+langController.language.strings["recordTime"]+'</div></td> \
				<td width="146"><div align="left">'+info[5]+' </div></td> \
				<td width="147">&nbsp;</td> \
				<td width="84"><div align="center">'+langController.language.strings["classDur"]+'</div></td> \
				<td width="69"><div align="left">'+durTime+'</div></td> \
				<td width="54"><div align="center"> \
					<input type="button" value="'+langController.language.strings["details"]+'" style=" color:#000000;width:50px; height:20px; \
						background-color:#636363;border:0px;border-bottom-style:none;border-top-style:none; \
						border-left-style:none;border-right-style:none;" onclick="recordFileDetail(\''+encodeURIComponent(dirName)+'\')"/></div></td> \
				</tr> \
				</table> \
				</div> \
				<div align="center"> \
				<table width="582" height="30" border="0" cellpadding="0" cellspacing="0"> \
				<tr> \
				<td width="85"><div align="left">'+langController.language.strings["speakerTeacher"]+'</div></td> \
				<td width="107"><div align="left">'+info[3]+'</div></td> \
				<td width="71"><div align="left">'+langController.language.strings["topics"]+'</div></td> \
				<td width="116"><div align="left">'+info[4]+'</div></td> \
				<td width="48"><div align="left">'+langController.language.strings["address"]+'</div></td> \
				<td width="155"><div align="left">'+info[1]+'</div></td> \
				</tr> \
				</table> \
				</div> \
				</td> \
				</tr> \
				</table> \
				</div> \
			';
			strHtml += ' \
				<div align="center" id="classFileList'+idd+'Id"></div>';
		}							
	}				
	document.getElementById("fileListId").innerHTML = strHtml;
	updatePageStatus(page, dirNum, totalPageNum)
	
	pagefiles.each(function(key,value,index){ckBoxAClassfile(key, value);}); //全选时，把当前页尚未被选中的文件 添加到 待处理文件列表中
}

function jumpPage(videoEdit)
{
	var sel=document.getElementById("jumpPageSelId");
	var p = parseInt(sel.options[sel.selectedIndex].value); 
	
	var i = 0;
	var list = "";
	getRecordFileListNew(i, list, p, videoEdit);
}

function onAudioSet()
{
	if(getCookie("curUserType") == "standard user"){alert(langController.language.strings["noPermission"]); return;}
	
	var url="audioParamSet.html";
	var name;
	var iWidth=430;
	var iHeight=380;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	audioParamSetWin = window.open(url,name,'height='+(iHeight+20)+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
	audioParamSetWin.focus();
}

function onChnSet(id)
{
	if(getCookie("curUserType") == "standard user"){alert(langController.language.strings["noPermission"]); return;}
	
	if(id > 4 && getDevType().indexOf("KL_DEV_3_1_MODE") >= 0)
	{
		return;
	}
	else if(id > 4 && getDevType().indexOf("KL_DEV_SJ_3_1_MODE") >= 0)
	{
		return;
	}
	else if(id > 5 && getDevType().indexOf("KL_DEV_3_1_1_MODE") >= 0)
	{
		return;
	}
	
	if(document.getElementById("startRecordBtId").src.indexOf("start1.png")>=0 ||
       document.getElementById("pauseRecordBtId").src.indexOf("pause1.png")>=0 ||
       document.getElementById("startLiveBtId").src.indexOf("start1.png")>=0)
	{
		alert(langController.language.strings["stopRecordingAndLiving"]);
		return;
	}
	var curUserType = getCookie("curUserType");
	if(curUserType == "guest")
	{
		alert(langController.language.strings["noPermission"]);
		return;	
	}

	var url="chnSet.html?chnId="+id;
	var name;
	var iWidth=580;
	var iHeight=320;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	chnSetWin = window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
	var timer = setInterval(function ()
    {
        if (chnSetWin.closed)
        {
            clearInterval(timer);
			chn_name_updata = 0;
        }
    }, 500);
}

function onCancel()
{
	window.close();
}

function onRecordSet(html)
{
	//if(getCookie("curUserType") == "standard user") return;
	
	if(document.getElementById("startRecordBtId").src.indexOf("start1.png")>=0 || 
		document.getElementById("pauseRecordBtId").src.indexOf("pause1.png")>=0)
	{
		alert(langController.language.strings["stopRecordingAndLiving"]);
		return;
	}
	var curUserType = getCookie("curUserType");
	if(curUserType == "guest")
	{
		alert(langController.language.strings["noPermission"]);
		return;
	}

	var url="recordParamSet.html";
	if(html != undefined)　url = html;
	var name;
	var iWidth=900;
	var iHeight=700;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	recordParamSetWin = window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
	var timer = setInterval(function ()
    {
        if (recordParamSetWin.closed)
        {
            clearInterval(timer);
			disksize_times = 1;
			//record_baseinfo_updata = 0;
			//setTimeout("recordBaseInfoUpdata()",2000);
        }
    }, 500);
}

function onTrackerSet()
{
	if(getCookie("curUserType") == "standard user") {alert(langController.language.strings["noPermission"]); return;}
	
	if(document.getElementById("startRecordBtId").src.indexOf("start1.png")>=0 || 
		document.getElementById("pauseRecordBtId").src.indexOf("pause1.png")>=0 ||
		document.getElementById("startLiveBtId").src.indexOf("start1.png")>=0)
	{
		alert(langController.language.strings["stopRecordingAndLiving"]);
		return;
	}
	var curUserType = getCookie("curUserType");
	if(curUserType == "guest")
	{
		alert(langController.language.strings["noPermission"]);
		return;
	}

	var url="tracker.html";
	if( getLanguage().indexOf("en") > -1 ){
		url="tracker_en.html";
	}
	var name;
	var iWidth=940;
	var iHeight=880;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	autoTrackerWin = window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
	
	var timer = setInterval(function (){
		if (autoTrackerWin.closed)
		{
			clearInterval(timer);
			chn_name_updata = 0;
		}
	}, 500);
}

function onLiveSet()
{
	if(getCookie("curUserType") == "standard user") {alert(langController.language.strings["noPermission"]); return;}
	
	if(//document.getElementById("startRecordBtId").src.indexOf("start1.png")>=0 || 
	   //document.getElementById("pauseRecordBtId").src.indexOf("pause1.png")>=0 ||
	   document.getElementById("startLiveBtId").src.indexOf("start1.png")>=0)
	{
		alert(langController.language.strings["stopRecordingAndLiving"]);
		return;
	}
	var curUserType = getCookie("curUserType");
	if(curUserType == "guest")
	{
		alert(langController.language.strings["noPermission"]);
		return;
	}

	var url="liveParamSet.html";
	var name;
	var iWidth=910;
	var iHeight=690;
	var iTop = (window.screen.availHeight-60-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	liveParamSetWin = window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
}

var dev_type = "";
function getDevType()
{
	if( dev_type != "" ) return dev_type;
	
	var baseinfo = getServerBaseInfo();
	dev_type = baseinfo[9];
	
	return baseinfo[9];
}

function getServerBaseInfo()
{
	//getAllSdState();	
	var serverIp;
	var serverVersion;
	var aecVersion;
	var serverModel;
	var serverMac;
	var serverMcuVersion;
	var webPVersion;
	var subIp = "0";
	var subMac = "0";
	var devType = "KL_DEV_3_1_MODE";
	var expired;
	
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/GetServerBaseInfo",false);
	xmlHttp.onreadystatechange=function()
	{
	//<serverBaseInfoTopic[serverIp[192.168.1.24],serverVersion[3.0.0],serverModel[KL2000],serverMac[xx-xx-xx-xx-xx],serverMcuVersion[vx.x.x],webPVersion[v1.0.0],sysTime[20151015 12:45:01]]>
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;			

			if(xmlHttp.status==200)
			{
				var startPos = 0;
				var subStartPos = 0;
				var subEndPos = 0;
				if((subStartPos = str.indexOf("serverIp",startPos)) >= 0)
				{
					subStartPos += 9;
					subEndPos = str.indexOf("]",subStartPos);
					serverIp = str.substring(subStartPos,subEndPos);
				}
				startPos = subEndPos+2;
				if((subStartPos = str.indexOf("serverVersion",startPos)) >= 0)
				{
					subStartPos += 14;
					subEndPos = str.indexOf("]",subStartPos);
					serverVersion = str.substring(subStartPos,subEndPos);
				}
				startPos = subEndPos+2;
				if((subStartPos = str.indexOf("serverModel",startPos)) >= 0)
				{
					subStartPos += 12;
					subEndPos = str.indexOf("]",subStartPos);
					serverModel = str.substring(subStartPos,subEndPos);
				}
				startPos = subEndPos+2;
				if((subStartPos = str.indexOf("serverMac",startPos)) >= 0)
				{
					subStartPos += 10;
					subEndPos = str.indexOf("]",subStartPos);
					serverMac = str.substring(subStartPos,subEndPos);
				}
				startPos = subEndPos+2;
				if((subStartPos = str.indexOf("serverMcuVersion",startPos)) >= 0)
				{
					subStartPos += 17;
					subEndPos = str.indexOf("]",subStartPos);
					serverMcuVersion = str.substring(subStartPos,subEndPos);
				}
				startPos = subEndPos+2;
				if((subStartPos = str.indexOf("webPVersion",startPos)) >= 0)
				{
					subStartPos += 12;
					subEndPos = str.indexOf("]",subStartPos);
					webPVersion = str.substring(subStartPos,subEndPos);
				}
				startPos = subEndPos + 2;
				if((subStartPos = str.indexOf("devMode",startPos)) >= 0)
				{
					subStartPos += 8;
					subEndPos = str.indexOf("]",subStartPos);
					devType = str.substring(subStartPos,subEndPos);
				}
				if( devType != "KL_DEV_3_1_MODE" && devType != "KL_DEV_SJ_3_1_MODE")
				{
					startPos = subEndPos+2;
					if((subStartPos = str.indexOf("subIp",startPos)) >= 0)
					{
						subStartPos += 6;
						subEndPos = str.indexOf("]",subStartPos);
						subIp = str.substring(subStartPos,subEndPos);
					}
					startPos = subEndPos+2;
					if((subStartPos = str.indexOf("subMac",startPos)) >= 0)
					{
						subStartPos += 7;
						subEndPos = str.indexOf("]",subStartPos);
						subMac = str.substring(subStartPos,subEndPos);
					}
				}
				startPos = subEndPos+2;
				if((subStartPos = str.indexOf("aecVersion",startPos)) >= 0)
				{
					subStartPos += 11;
					subEndPos = str.indexOf("]",subStartPos);
					aecVersion = str.substring(subStartPos,subEndPos);
				}
				startPos = subEndPos+2;
				if((subStartPos = str.indexOf("expired",startPos)) >= 0)
				{
					subStartPos += 8;
					subEndPos = str.indexOf("]",subStartPos);
					expired = str.substring(subStartPos,subEndPos);
				}
			}
		}
	}
	xmlHttp.send();
	return [serverIp,serverVersion,serverModel,serverMac,serverMcuVersion,webPVersion,subIp,subMac,aecVersion,devType,expired];	
}

function onLogoSubSet()
{
	if(getCookie("curUserType") == "standard user") {alert(langController.language.strings["noPermission"]); return;}	

	var curUserType = getCookie("curUserType");
	if(curUserType == "guest")
	{			
		alert(langController.language.strings["noPermission"]);
		return;
	}

	var url="logoSubParamSet.html";
	var name;
	var iWidth=900;
	var iHeight=590;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	logoSubParamSetWin = window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
	var timer = setInterval(function ()
				{
					if (logoSubParamSetWin.closed)
					{
						clearInterval(timer);
						subtitle_logo_area_update = 0;
					}
				}, 500);
}

function reboot()
{
	var r = confirm(langController.language.strings["areYouSureYouWantToRestartTheRecordingService"]+"?")
	if (r == true)
	{
		var xmlHttp = getXmlHttp();
		var cmd = "reboot";
		xmlHttp.open("POST","/action/SetPowerManageTopic?cmd="+encodeURIComponent(cmd),true);
		xmlHttp.onreadystatechange=function()
		{
			if(xmlHttp.readyState == 4)
			{
				if(xmlHttp.status == 200)
				{
					var str = xmlHttp.responseText;
					if(str.indexOf("FAILED") >= 0)
					{
						alert(langController.language.strings["pleaseStopRecordingOrLive"]);
					}
					else
					{
						window.location.href = "logIn.html";
					}
				}
			}
		}
		xmlHttp.send();	
	}
}

function poweroff()
{
	var r = confirm(langController.language.strings["areYouSureYouWantToTurnOffRecordingServices"]+"?");
	if (r == true)
	{
		var xmlHttp = getXmlHttp();
		var cmd = "poweroff";
		xmlHttp.open("POST","/action/SetPowerManageTopic?cmd=" + encodeURIComponent(cmd),true);
		xmlHttp.onreadystatechange = function()
		{
			if(xmlHttp.readyState == 4)
			{
				if(xmlHttp.status == 200)
				{
					var str = xmlHttp.responseText;
					if(str.indexOf("FAILED") >= 0)
					{
						alert(langController.language.strings["pleaseStopRecordingOrLive"]);
					}
					else
					{
						window.location.href = "logIn.html";
					}								
					
				}
			}
		}
		xmlHttp.send();	
	}
}

function sleep()
{
	var toSleep = "你确定系统进入睡眠状态吗？";
	if( getLanguage().indexOf('en') >= 0 ){
		toSleep = "Are you sure to sleep? ";
	}
	var r = confirm(toSleep)
	if (r == true)
	{
		var xmlHttp = getXmlHttp();
		var cmd = "sleep";
		xmlHttp.open("POST","/action/SetPowerManageTopic?cmd=" + encodeURIComponent(cmd),true);
		xmlHttp.onreadystatechange=function()
		{
			if(xmlHttp.readyState == 4)
			{
				if(xmlHttp.status == 200)
				{
					var str = xmlHttp.responseText;
					if(str.indexOf("FAILED") >= 0)
					{
						alert(langController.language.strings["pleaseStopRecordingOrLive"]);
					}
					else
					{
						window.location.href = "logIn.html";
					}								
					
				}
			}
		}
		xmlHttp.send();	
	}
}

function sLoading(str) 
{ 
	var msgw,msgh,bordercolor; 
	msgw=400;//提示窗口的宽度 
	msgh=100;//提示窗口的高度 
	titleheight=25 //提示窗口标题高度 
	bordercolor="#336699";//提示窗口的边框颜色 
	titlecolor="#99CCFF";//提示窗口的标题颜色 
	var sWidth,sHeight; 
	sWidth=document.body.offsetWidth;//获取窗口宽度 
	sHeight=screen.height;//获取屏幕高度 
	var bgObj=document.createElement("div");//关键在这里，原理：在body中创建一个div，并将其宽度与高度设置为覆盖整个窗体，如此一来就无法对其它窗口时行操作 
	bgObj.setAttribute('id','bgDiv'); 
	bgObj.style.position="absolute"; 
	bgObj.style.top="0"; 
	bgObj.style.background="#777"; 
	bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; 
	bgObj.style.opacity="0.6"; 
	bgObj.style.left="0"; 
	bgObj.style.width=sWidth + "px"; 
	bgObj.style.height=sHeight + "px"; 
	bgObj.style.zIndex = "10000"; 
	document.body.appendChild(bgObj);//设置完此div后将其显示出来 
	var msgObj=document.createElement('div');//创建一个消息窗口 
	msgObj.setAttribute("id","msgDiv"); 
	msgObj.setAttribute("align","center"); 
	msgObj.style.background="white"; 
	msgObj.style.border="1px solid " + bordercolor; 
	msgObj.style.position = "absolute"; 
	msgObj.style.left = "50%"; 
	msgObj.style.top = "50%"; 
	msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif"; 
	msgObj.style.marginLeft = "-225px" ; 
	msgObj.style.marginTop = -75+document.documentElement.scrollTop+"px"; 
	msgObj.style.width = msgw+"px"; 
	msgObj.style.height = msgh+"px"; 
	msgObj.style.textAlign = "center"; 
	msgObj.style.lineHeight ="25px"; 
	msgObj.style.zIndex = "10001"; 
	var title=document.createElement("h4"); //创建一个标题，以备放置在消息层 
	title.setAttribute("id","msgTitle"); 
	title.setAttribute("align","right"); 
	title.style.margin="0"; 
	title.style.padding="3px"; 
	title.style.background=bordercolor; 
	title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);"; 
	title.style.opacity="0.75"; 
	title.style.border="1px solid " + bordercolor; 
	title.style.height="18px"; 
	title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif"; 
	title.style.color="white"; 
	title.style.cursor="pointer"; 
	title.innerHTML=""; 
	//title.onclick=function() 
	//{ 
	//	document.body.removeChild(bgObj);//移除覆盖整个窗口的div层 
	//	document.getElementById("msgDiv").removeChild(title);//移除标题 
	//	document.body.removeChild(msgObj);//移除消息层 

	//} 
	document.body.appendChild(msgObj); 
	document.getElementById("msgDiv").appendChild(title); 
	var txt=document.createElement("p"); 
	txt.style.margin="1em 0" 
	txt.setAttribute("id","msgTxt"); 
	txt.innerHTML=str; 
	document.getElementById("msgDiv").appendChild(txt); 
} 



function sAlert(str) 
{ 
	var msgw,msgh,bordercolor; 
	msgw=400;//提示窗口的宽度 
	msgh=100;//提示窗口的高度 
	titleheight=25 //提示窗口标题高度 
	bordercolor="#336699";//提示窗口的边框颜色 
	titlecolor="#99CCFF";//提示窗口的标题颜色 
	var sWidth,sHeight; 
	sWidth=document.body.offsetWidth;//获取窗口宽度 
	sHeight=screen.height;//获取屏幕高度 
	var bgObj=document.createElement("div");//关键在这里，原理：在body中创建一个div，并将其宽度与高度设置为覆盖整个窗体，如此一来就无法对其它窗口时行操作 
	bgObj.setAttribute('id','bgDiv'); 
	bgObj.style.position="absolute"; 
	bgObj.style.top="0"; 
	bgObj.style.background="#777"; 
	bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; 
	bgObj.style.opacity="0.6"; 
	bgObj.style.left="0"; 
	bgObj.style.width=sWidth + "px"; 
	bgObj.style.height=sHeight + "px"; 
	bgObj.style.zIndex = "10000"; 
	document.body.appendChild(bgObj);//设置完此div后将其显示出来 
	var msgObj=document.createElement('div');//创建一个消息窗口 
	msgObj.setAttribute("id","msgDiv"); 
	msgObj.setAttribute("align","center"); 
	msgObj.style.background="white"; 
	msgObj.style.border="1px solid " + bordercolor; 
	msgObj.style.position = "absolute"; 
	msgObj.style.left = "50%"; 
	msgObj.style.top = "50%"; 
	msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif"; 
	msgObj.style.marginLeft = "-225px" ; 
	msgObj.style.marginTop = -75+document.documentElement.scrollTop+"px"; 
	msgObj.style.width = msgw+"px"; 
	msgObj.style.height = msgh+"px"; 
	msgObj.style.textAlign = "center"; 
	msgObj.style.lineHeight ="25px"; 
	msgObj.style.zIndex = "10001"; 
	var title=document.createElement("h4"); //创建一个标题，以备放置在消息层 
	title.setAttribute("id","msgTitle"); 
	title.setAttribute("align","right"); 
	title.style.margin="0"; 
	title.style.padding="3px"; 
	title.style.background=bordercolor; 
	title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);"; 
	title.style.opacity="0.75"; 
	title.style.border="1px solid " + bordercolor; 
	title.style.height="18px"; 
	title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif"; 
	title.style.color="white"; 
	title.style.cursor="pointer"; 
	title.innerHTML="关闭"; 
	title.onclick=function() 
	{ 
		document.body.removeChild(bgObj);//移除覆盖整个窗口的div层 
		document.getElementById("msgDiv").removeChild(title);//移除标题 
		document.body.removeChild(msgObj);//移除消息层 

	} 
	document.body.appendChild(msgObj); 
	document.getElementById("msgDiv").appendChild(title); 
	var txt=document.createElement("p"); 
	txt.style.margin="1em 0" 
	txt.setAttribute("id","msgTxt"); 
	txt.innerHTML=str; 
	document.getElementById("msgDiv").appendChild(txt); 
} 

function mp4StreamProBar(obj,txtz,n)
{
	txtz.style.margin="1em 0"
	txtz.setAttribute("id","msgTxtz");
	txtz.innerHTML=langController.language.strings["streamingProcessing"];
	for(var i = 0; i < n; i++)
	{
        txtz.innerHTML +=".";
	}

	if(n == 10) n = 0;

	obj.appendChild(txtz);
	return setTimeout(function(){mp4StreamProBar(obj,txtz,n+1);},1000);
}


function mp4Stream(cmd) 
{ 
	if( user_not_login() ) return;	

	var msgw,msgh,bordercolor; 
	msgw=450;//提示窗口的宽度 
	msgh=130;//提示窗口的高度 
	titleheight=25 //提示窗口标题高度 
	bordercolor="#336699";//提示窗口的边框颜色 
	titlecolor="#99CCFF";//提示窗口的标题颜色 
	var sWidth,sHeight; 
	sWidth=document.body.offsetWidth;//获取窗口宽度 
	sHeight=screen.height;//获取屏幕高度 
	var bgObj=document.createElement("div");//关键在这里，原理：在body中创建一个div，并将其宽度与高度设置为覆盖整个窗体，如此一来就无法对其它窗口时行操作 
	bgObj.setAttribute('id','bgDiv'); 
	bgObj.style.position="absolute"; 
	bgObj.style.top="0"; 
	bgObj.style.background="#777"; 
	bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; 
	bgObj.style.opacity="0.6"; 
	bgObj.style.left="0"; 
	bgObj.style.width=sWidth + "px"; 
	bgObj.style.height=sHeight + "px"; 
	bgObj.style.zIndex = "10000"; 
	document.body.appendChild(bgObj);//设置完此div后将其显示出来 
	var msgObj=document.createElement('div');//创建一个消息窗口 
	msgObj.setAttribute("id","msgDiv"); 
	msgObj.setAttribute("align","center"); 
	msgObj.style.background="white"; 
	msgObj.style.border="1px solid " + bordercolor; 
	msgObj.style.position = "absolute"; 
	msgObj.style.left = "50%"; 
	msgObj.style.top = "50%"; 
	msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif"; 
	msgObj.style.marginLeft = "-225px" ; 
	msgObj.style.marginTop = -75+document.documentElement.scrollTop+"px"; 
	msgObj.style.width = msgw+"px"; 
	msgObj.style.height = msgh+"px"; 
	msgObj.style.textAlign = "center"; 
	msgObj.style.lineHeight ="25px"; 
	msgObj.style.zIndex = "10001"; 
	var title=document.createElement("h4"); //创建一个标题，以备放置在消息层 
	title.setAttribute("id","msgTitle"); 
	title.setAttribute("align","right"); 
	title.style.margin="0"; 
	title.style.padding="3px"; 
	title.style.background=bordercolor; 
	title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);"; 
	title.style.opacity="0.75"; 
	title.style.border="1px solid " + bordercolor; 
	title.style.height="18px"; 
	title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif"; 
	title.style.color="white"; 
	title.style.cursor="pointer"; 
	document.body.appendChild(msgObj); 
	document.getElementById("msgDiv").appendChild(title); 
	var txt=document.createElement("p"); 
	txt.style.margin="1em 0" 
	txt.setAttribute("id","msgTxt"); 
	txt.innerHTML=langController.language.strings["streamingProcess"]; 
	document.getElementById("msgDiv").appendChild(txt); 
	var txtz=document.createElement("p"); 
	var tt = mp4StreamProBar(msgObj,txtz,0);
	
	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/action/SetFileListTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				clearTimeout(tt);
				txt.innerHTML=langController.language.strings["streamingSuccess"];
				document.getElementById("msgDiv").appendChild(txt);
				txtz.innerHTML="";
				document.getElementById("msgDiv").appendChild(txtz);
		
				setTimeout(function(){document.body.removeChild(bgObj);document.getElementById("msgDiv").removeChild(title);document.body.removeChild(msgObj);location.replace("/kl_web/recordManageFlash.html");},1000);
			}
		}
		document.getElementById("updataStateTxtId").innerHTML="";
	}
	xmlHttp.send();
	
} 

function genVolumeDiv(color, width, func, i, magassag, margintop)
{
	var divstr = '<div  onmouseup="'+ func +　'(' + i + 	')" style="';
	if( color ) divstr += 'background-color:#FF4500;';
	if( width ) divstr += 'width:10px;';
				divstr += 'height:' + magassag + 'px;margin-top:' + margintop + 'px;" class="volumecontrollerbar"></div>';
		
	return divstr;
}

function drawcustomvolumecontroller(id, func, length,height,nowselected)
{
    document.getElementById(id).innerHTML = "";
	var color, width;
    for (i=0;i<length;i++){
        magassag = 20;//5 + Math.round((0.5)*(length - i)); 
        margintop = 8;//height-magassag;
        if (margintop <= 0) {margintop = 0;}		
		width = (i == 50);
        color = (i >= nowselected && nowselected != 50);
		
		document.getElementById(id).innerHTML = 
		document.getElementById(id).innerHTML + genVolumeDiv(color, width, func, i, magassag, margintop);
    } 
}

//length: how many bars
//height: height of the tallest bar
//nowselected: which bar is selected
function drawvolumecontroller(length,height,nowselected)
{
	drawcustomvolumecontroller("volumcontroller", "volumecontrolchanged", length, height, nowselected);    
}

function volumecontrolchanged(newvolume)
{
	if( user_not_login() ) return;	

    drawvolumecontroller(51,34,newvolume);
	var vol = (50-newvolume)*2;	
    document.getElementById("volumeindicator").innerHTML = vol;
	
	var xmlHttp = getXmlHttp();	
	var cmd = "vol["+vol+"]";
	xmlHttp.open("POST","/action/SetAudioCtrlTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText.indexOf("<No Permission>") >= 0) alert(langController.language.strings["noPermission"]);
			}
		}
	}
	xmlHttp.send();
}

var get_audio_vol = 0;
function getAudioVol()
{
	get_audio_vol++;
	if( get_audio_vol > 5 )
	{
		setTimeout("getAudioVol()",2000);
		return;
	}	
	
	var xmlHttp = getXmlHttp();	
	xmlHttp.open("POST","/GetAudioCtrlTopic",true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			//<audioCtrlTopic[vol[50],AGC[false]]>
			var str = xmlHttp.responseText;
			var startPos=0;
			var endPos;
			if(xmlHttp.status==200)
			{
				if((startPos = str.indexOf("vol[",startPos)) >= 0)
				{
					startPos += 4;
					endPos = str.indexOf("]",startPos);
					var vol = parseInt(str.substring(startPos,endPos));
					var newvolume = 50 - vol/2;
					drawvolumecontroller(51,34,newvolume);
					document.getElementById("volumeindicator").innerHTML = vol;
				}
			}                        
		}
	}
	xmlHttp.send();
	setTimeout("getAudioVol()",2000);
}	

function onSignalProp(id,cmd)
{
	if( user_not_login() ) return;	

	var xmlHttp = getXmlHttp();        
	xmlHttp.open("POST","/action/SetChannelTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&chnId="+id+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				if(xmlHttp.responseText == "<No Permission>")
				{
					alert(langController.language.strings["noPermission"]);
				}
			}

		}
	}
	xmlHttp.send();

}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{ 
		var c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1; 
			var c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) 
				c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return ""
}

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : "; expires="+exdate.toGMTString());
}

function chkIsLogIn(userName,password)
{
	var res = false;

	if(userName == null || userName == "" || password == null || password == "")
	{
		return res;
	}
	//var uuid1 = new Fingerprint({canvas: true}).get();
	//var uuid2 = new Fingerprint().get();
	var uuid = new Fingerprint({ie_activex: true}).get();
	//var uuid4 = 0;//new Fingerprint({ie_activex: true;canvas: true}).get();
	//alert(uuid1+" "+uuid2+" "+uuid+" "+uuid4);
	var xmlHttp = getXmlHttp();	
	var cmd = "isAlive";
	xmlHttp.open("POST","/action/UserManage?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),false);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			if(xmlHttp.status==200)
			{
				if(str.indexOf("Alive") < 0)
				{
					res = false;
				}
				else
				{
					res = true;
				}
			}
		}
	}
	xmlHttp.send();
	return res;
}

function logOut()
{
	if( user_not_login() ) return;	
	
	var xmlHttp = getXmlHttp();	
	var cmd = "logOut";
	xmlHttp.open("POST","/action/UserManage?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),false);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			if(xmlHttp.status==200)
			{
				if(str.indexOf("Alive") < 0)
				{
					window.location.href = "logIn.html";
				}
				else
				{
					window.location.href = "logIn.html";
				}
			}
		}
	}
	xmlHttp.send();

}

function logIn(name, pwd)
{
	userName = name;
	password = pwd;
	
	var curUserName = getCookie("userName");
	var curPassword = getCookie("password");
	
	//登录用户和当前用户是同一个,检测是否当前用户已经登录，如果已经登录直接跳到导播界面
	if(userName == curUserName && password == curPassword)
	{
		if(chkIsLogIn(userName,password))
		{
			window.location.href = "sdManage.html";
					
			return;
		}
	}
	//登录用户和当前用户不同，检测登录当前用户是否已经退出，如没有退出，退出已经登录的用户
	else
	{
		if(chkIsLogIn(curUserName,curPassword))
		{
			logOut();
		}
	}
	
	if(userName == "" || password == "")
	{
		alert(langController.language.strings["accountAndPasswordCannotBeEmpty"]);
		window.location.href = "logIn.html";
		return;
	}
	
		
	var uuid = new Fingerprint({ie_activex: true}).get();

	//var curUserType = getUserType();
	var pt;
	if(jscd.mobile == false)
		pt = "pc web"
	else
		pt = "mobile web"
	var cmd = "logIn["+jscd.os+" "+jscd.osVersion+","+pt+",ip]";
	
	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/UserManage?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),false);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			if(xmlHttp.status==200)
			{
				var curUserType = getUserTypeNew(userName, password);
				if(str.indexOf("Authorization failed") >= 0)
				{
					alert(langController.language.strings["userNameOrPsswordIsIncorrect"]);
					window.location.href = "logIn.html";
				}
				else if(str.indexOf("Illegal Operation") >= 0)
				{
					alert(langController.language.strings["userIsLoggedIn"]);
					window.location.href = "logIn.html";
				}
				else if(str.indexOf("Success") >= 0)
				{
					if(curUserType == "guest")
					{
						window.location.href = "watchLive.html";
					}
					else
					{
						window.location.href = "sdManage.html";
					}
					setCookie("curUserType",curUserType,3650);
					setCookie("userName",userName,3650);
					setCookie("password",password,3650);
					setCookie("uuid",uuid,3650);
				}
			}
		}
	}
	xmlHttp.send();
}

function sendHeart()
{
	if( user_not_login() ) return;	
	
	var xmlHttp = getXmlHttp();	
	var cmd = "sendHeart";
	xmlHttp.open("POST","/action/UserManage?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			if(xmlHttp.status==200)
			{
				if(str.indexOf("Alive") < 0) window.location.href = "logIn.html";
			}
		}
	}
	xmlHttp.send();
	setTimeout("sendHeart()",2000);
}

function showWelcomeuserName()
{
	var userName = getCookie("userName");
	document.getElementById("welcomeUserNameTxtId").innerHTML = "<strong>"+langController.language.strings["welcome"]+" "+userName+"</strong>";	
}

function getUserType()
{
	if( user_not_login() ) return;	
	
	return getUserTypeNew(userName, password);
}

function getUserTypeNew(user, pwd)
{
	var userType;
	var xmlHttp = getXmlHttp();	
	var cmd = "getUserType";
	xmlHttp.open("POST","/action/UserManage?userName="+encodeURIComponent(user)+"&password="+encodeURIComponent(pwd)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),false);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			if(xmlHttp.status==200)	userType = str.substring(3,str.length-1);
		}
	}
	xmlHttp.send();
	return userType;
}

function forceLogOut(userName)
{
	if( user_not_login() ) return;	
	var adminUserName = getCookie("userName");			
	var adminPassword = getCookie("password");			

	var xmlHttp = getXmlHttp();	
	var cmd = "forceLogOut["+userName+"]";
	xmlHttp.open("POST","/action/UserManage?userName="+encodeURIComponent(adminUserName)+"&password="+encodeURIComponent(adminPassword)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var str = xmlHttp.responseText;
			if(xmlHttp.status==200) window.location.href = "userManage.html";
		}
	}
	xmlHttp.send();
}

function alterPassword()
{
	var url="alterPw.html";
	var name;
	var iWidth=460;
	var iHeight=190;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	alterPwWin = window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
	alterPwWin.focus();
}

function get_appropriate_ws_url()
{
	var pcol;
	var u = document.URL;

	/*
	 * We open the websocket encrypted if this page came on an
	 * https:// url itself, otherwise unencrypted
	 */

	if (u.substring(0, 5) == "https") {
		pcol = "wss://";
		u = u.substr(8);
	} else {
		pcol = "ws://";
		if (u.substring(0, 4) == "http")
			u = u.substr(7);
	}

	u = u.split('/');

	/* + "/xxx" bit is for IE10 workaround */

	return pcol + u[0] + ":7681/xxx";
}

function ws_init()
{
	var socket_di;
	socket_di = new WebSocket(get_appropriate_ws_url(),"dumb-increment-protocol");
	
	try {
		socket_di.onopen = function() {} 

		socket_di.onmessage =function got_packet(msg) {
            
			if( msg.data.indexOf("recordTopic") >= 0 )
			{
				record_area_times = record_area_update + 20;		
				parse_recordTopic(msg.data);
			}else
			if( msg.data.indexOf("liveTopic") >= 0 )
			{
				live_area_updata = 3;
				live_time_updata = 0;
			}else
			if( msg.data.indexOf("subTitleAndLogoTopic") >= 0 )
			{
				subtitle_logo_area_update = 3;
			}else
			if( msg.data.indexOf("filmViewTopic") >= 0 )
			{
				film_view_area_updata = 3;
			}else
			if( msg.data.indexOf("audioCtrlTopic") >= 0 )
			{
				get_audio_vol = 3;
			}else
			if( msg.data.indexOf("ptzManageTopic") >= 0 )
			{
				ptz_mode_update = 3;
			}else
			if( msg.data.indexOf("chnSynTopic") >= 0 )
			{
				chn_name_updata = 3;
			}else
			if( msg.data.indexOf("sysTimeTopic") >= 0 )
			{
				var topics = new Array();
				topics = msg.data.split(";");
				for( i=0; i<topics.length; i++ ) 
				{ 
					if(topics[i].indexOf("sysTimeTopic") >= 0)
					{
						parse_sysTimeTopic(topics[i]);
					}
					if(topics[i].indexOf("recordTimeTopic") >= 0)
					{
						parse_recordTimeTopic(topics[i]);
					}
					if(topics[i].indexOf("liveTimeTopic") >= 0)
					{
						parse_liveTimeTopic(topics[i]);
					}
					if(topics[i].indexOf("diskSizeTopic") >= 0)
					{
						parse_diskSizeTopic(topics[i]);
					}
					if(topics[i].indexOf("recordBaseInfoTopic") >= 0)
					{
						parse_recordBaseInfoTopic(topics[i]);
					}
				} 
			}
		} 

		socket_di.onclose = function(){}
	} catch(exception) {
		alert('<p>Error' + exception);  
	}
}

/*function startColorKey()
{
	var cmd;
	var colorKey = document.getElementById("startColorKeyId");	
	if(colorKey.checked == false)
	{
		cmd = "startColorKey";	
	}
	else
	{
		cmd = "stopColorKey";	
	}

	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
				var posStart;
				var posEnd;
				var str = xmlHttp.responseText;
				if((posStart = str.indexOf("colorKey"))>=0)
				{
					posStart += 9;
					if( (posStart = str.indexOf("start", posStart)) >= 0 )
					{
						posStart += 6;
						var posEnd = str.indexOf("]",posStart);
						var start = str.substring(posStart,posEnd);
						if(start.indexOf("true") >= 0)
						{
							colorKey.checked = true;
							colorKey.style.backgroundColor = "#FF4500";
						}
						else
						{
							colorKey.checked = false;
							colorKey.style.backgroundColor = "#CCCCCC";
						}
					}
				}
				else if(xmlHttp.responseText.indexOf("<No Permission>") >= 0)
				{
					alert(langController.language.strings["noPermission"]);
				}
			}
		}
	}
	xmlHttp.send();	
}

function onColorKeyParam()
{
	var url="colorKeySettings.html";
	var name;
	var iWidth=600;
	var iHeight=250;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	chnSetWin = window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no');
}

function setColorKeyParam()
{
	var rMin = document.getElementById("rMinId").innerHTML;
	var rMax = document.getElementById("rMaxId").innerHTML;
	var gMin = document.getElementById("gMinId").innerHTML;
	var gMax = document.getElementById("gMaxId").innerHTML;
	var bMin = document.getElementById("bMinId").innerHTML;
	var bMax = document.getElementById("bMaxId").innerHTML;

	if(rMin == 999 || rMax == 999 || gMin == 999 || gMax == 999 || bMin == 999 || bMax == 999) return;

	var cmd = "setColorKeyParam[comp["+rMin+","+rMax+","+gMin+","+gMax+","+bMin+","+bMax+"]]";

	var xmlHttp = getXmlHttp();
	xmlHttp.open("POST","/action/SetFilmViewTopic?userName="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)+"&fingerId="+encodeURIComponent(uuid)+"&cmd="+encodeURIComponent(cmd),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.status==200)
			{
			}
		}
	}
	xmlHttp.send();
}

function initSlider(id, minId, maxId, start, end)
{
	var skipSlider = document.getElementById(id);
	
	noUiSlider.create(skipSlider, {
		start: [start, end],
		connect: true,
		range: {
			'min': 0,
			'max': 255
		}
	});

	
	var skipValues = [
		document.getElementById(minId),
		document.getElementById(maxId)
	];
	
	skipSlider.noUiSlider.on('update', function( values, handle ) {
		skipValues[handle].innerHTML = parseInt(values[handle]);

		setColorKeyParam();
	});
}
*/


