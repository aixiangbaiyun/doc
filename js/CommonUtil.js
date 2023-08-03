//---------------------------------ajax util----------------------------------------------------------------------------
var project = "/cloud";
var servletPattern = "/services";
var apiList = [
		{"loginService" : ['checkLogin', 'updateLoginInfo', 'insertLoginInfo', 'findLoginInfo']}
];

var json = {};
function callApi(apiName, requestJson){
	var deferTemp = $.Deferred();
	var path = project + servletPattern + getPath(apiName);
	$.ajax({
	    url: path,
	    data: JSON.stringify(requestJson),
	    type: "POST",
	    contentType: "application/json",// 请求头
	    dataType: "json",// 指定返回数据类型
	    async: true,
	    cache:false,
	    success: function(data) {
	        // data = jQuery.parseJSON(data);  //dataType指明了返回数据为json类型，故不需要再反序列化
	    	deferTemp.resolve(data);
	    },
	    error: function (error) {
            save("status", error.status);
			window.location.href = "/cloud/html/error.html";
        }
	});
	return deferTemp;
}

// 做成请求url
function getPath(inputApiName){
	var front = "";
	var after = "";
	for (var i = 0; i < apiList.length; i++) {
		var services = apiList[i];
		for (var key in services) {
			front = "/"+key;
			var value = services[key];
			for (var j = 0; j < value.length; j++) {
				if (value[j] == inputApiName) {
					after = "/" + inputApiName+"/";
					break;
				}
			}
		}
	}
	return front + after;
}

//---------------------------------session setting----------------------------------------------------------------------
//保存数据 
function save(key,value){  
    //sessionstorage页面关闭后就清除掉了，localstorage不会
    window.sessionStorage.setItem(key,value);
}

//查找数据  
function get(key){  
    return window.sessionStorage.getItem(key);  
}

//移除数据
function remove(key){
	return window.sessionStorage.removeItem();
}

//清空数据  
function clear(){  
    window.sessionStorage.clear();
}
//---------------------------------date format--------------------------------------------------------------------------
function dateFormat(date, split1, split2, split3){
	return dateFormat_YYYYMMDD(date, split1) + split2 + dateFormat_HHMMSS(date, split3);
}

function dateFormat_YYYYMMDD(date, split){
	return date.getFullYear() + split
		+ addLeadingZero(date.getMonth() + 1) + split
		+ addLeadingZero(date.getDate());
}

function dateFormat_HHMMSS(date, split){
	return addLeadingZero(date.getHours()) + split
		+ addLeadingZero(date.getMinutes()) + split
		+ addLeadingZero(date.getSeconds());
}


function addLeadingZero(number) {
	return number < 10 ? '0' + number : number;
}

//---------------------------------file down util-----------------------------------------------------------------------
function download(dataStr, fileName) {
	var blob = new Blob([dataStr.replace(/\r/g, "")], {type: "text/plain; charset=UTF-8"});
	var doc = window.document;
	var element = doc.createElementNS("http://www.w3.org/1999/xhtml","a");
	var hrefStr = window.URL.createObjectURL(blob);
	setTimeout(function () {
		element.href = hrefStr;
		element.download = fileName;
		element.click();
		window.URL.revokeObjectURL(hrefStr);
	})
}

