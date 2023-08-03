var user = '';
var password = '';
var response  = {};
//#button：id属性
function loginCheck(){
	// 获取input标签里面的值 by id
	user = $("#user").val();
	password = $("#password").val();
	var request={};
	request.resultDto={};
	request.requestCheckLoginDto={
			"userId":user,
			"password":password
	};
	
	$.when(callApi("checkLogin",request)).done(function(response){
		 var resultDto = response.resultDto;
	        
	        if (resultDto.resultCd == "9") {
	        	// 设置span/div显示
	        	$("#comfirm").show();
			}else {
				// 设置span/div隐藏
				$("#comfirm").hide();
				user = response.requestCheckLoginDto.userId;
				password = response.requestCheckLoginDto.password;
				save("user",user);
				save("pwd",password);
				window.location.href = "html/index.html";
			}
	});

}; 


