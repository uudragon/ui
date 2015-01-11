//控件配置
var p_serverIp = "124.205.241.254";
var p_serverPort = 1202;
var p_agentNumber = "1001";
var p_agentName = "zhang";
var p_extension = "881";
var p_agentGroup = 4;
var p_agentLevel = 1;

//软电话配置
var p_pbxURI = "192.168.0.186:5060";
var p_phonePassword = "t2";

//拨号数字面板配置	
var dialPad=
new Ext.Window({border:false,hideBorders:true,layout:'fit',title:'',width:170,resizeable:false,closeAction:'hide',items:[
	{layout:'form',bodyStyle:'background:#dfe8f6; padding:2px;',layout:'form',buttonAlign:'center',labelAlign:'right',autoHeight:true,labelWidth:30,items:[
		{xtype:'textfield',id:'dialBox',fieldLabel:'号码',name:'number',width:100}
		,{layout:'column',bodyStyle:'background:#dfe8f6;',border:false,layout:'column',buttonAlign:'center',labelAlign:'right',autoWidth:true,autoHeight:true,items:[
			{layout:'form',bodyStyle:'background:#dfe8f6;',border:false,layout:'form',buttonAlign:'center',labelAlign:'right',autoHeight:true,columnWidth:'.33',items:[
				{xtype:'button',text:'1',width:50,handler:function(){addDigitDialBox("1");}}
				,{xtype:'button',text:'4',width:50,handler:function(){addDigitDialBox("4");}}
				,{xtype:'button',text:'7',width:50,handler:function(){addDigitDialBox("7");}}
				,{xtype:'button',text:'*',width:50,handler:function(){addDigitDialBox("*");}}
			]}
			,{layout:'form',bodyStyle:'background:#dfe8f6;',border:false,layout:'form',buttonAlign:'center',labelAlign:'right',autoHeight:true,columnWidth:'.33',items:[
				{xtype:'button',text:'2',width:50,handler:function(){addDigitDialBox("2");}}
				,{xtype:'button',text:'5',width:50,handler:function(){addDigitDialBox("5");}}
				,{xtype:'button',text:'8',width:50,handler:function(){addDigitDialBox("8");}}
				,{xtype:'button',text:'0',width:50,handler:function(){addDigitDialBox("0");}}
			]}
			,{layout:'form',bodyStyle:'background:#dfe8f6;',border:false,layout:'form',buttonAlign:'center',labelAlign:'right',autoHeight:true,columnWidth:'.33',items:[
				{xtype:'button',text:'3',width:50,handler:function(){addDigitDialBox("3");}}
				,{xtype:'button',text:'6',width:50,handler:function(){addDigitDialBox("6");}}
				,{xtype:'button',text:'9',width:50,handler:function(){addDigitDialBox("9");}}
				,{xtype:'button',text:'#',width:50,handler:function(){addDigitDialBox("#");}}
			]}
		]}
		,{layout:'column',bodyStyle:'background:#dfe8f6;',border:false,layout:'column',buttonAlign:'center',labelAlign:'right',autoWidth:true,autoHeight:true,items:[
			{layout:'form',bodyStyle:'background:#dfe8f6;',border:false,layout:'form',buttonAlign:'center',labelAlign:'right',autoHeight:true,columnWidth:'.65',items:[
				{xtype:'button',text:'拨号',id:'btnDialPadAction',width:100,handler:function(){actionDialBox(this);}}
			]}
			,{layout:'form',bodyStyle:'background:#dfe8f6;',border:false,layout:'form',buttonAlign:'center',labelAlign:'right',autoHeight:true,columnWidth:'.34',items:[
				{xtype:'button',text:'回删',width:50,handler:function(){delDigitDialBox();}}
			]}
		]}
	]}
]})

//配置
var gPhoneId = 1;
var gPhoneRegisted = false;
var gIvrRegisted = false;
var gPhoneHold = false;
var gIvrBusy = true;
var gIvrState = -2;
function actionDialBox(obj) {
	var obj=Ext.getCmp("dialBox");
	var val = obj.getValue();
	obj.findParentByType("window").callbackFunc(val);
}
function addDigitDialBox(digit) {
	var obj=Ext.getCmp("dialBox");
	obj.setValue(obj.getValue()+digit);
	//if (dialPad.sendDtmf && phone.State==5)
	//	phone.SendDtmfString(digit);
}
function delDigitDialBox() {
	var obj=Ext.getCmp("dialBox");
	var val = obj.getValue();
	val = val.substring(0,val.length-1);
	obj.setValue(val);
}

function getIvrServerAddress() {
	return p_serverIp;
}
function getIvrServerPort() {
	return p_serverPort;	
}
function getPhoneServerURI() {
	return p_pbxURI;
}
function getPhoneAccount() {
	return p_extension;
}
function getPhonePassword() {
	return p_phonePassword;
}
function getAgentNumber() {
	return p_agentNumber;
}
function getAgentGroup() {
	return p_agentGroup;
}
function getAgentLevel() {
	return p_agentLevel;
}
function getAgentName() {
	return p_agentName;
}
function showDialPad(x, y, title, callback, sendDtmf) {
	var obj=Ext.getCmp("dialBox");
	obj.setValue("");
	dialPad.setPosition(x,y);
	dialPad.setTitle(title);
	dialPad.callbackFunc = callback;
	Ext.getCmp("btnDialPadAction").setText(title);
	dialPad.sendDtmf = sendDtmf;
	dialPad.show();
}

var phoneTbar = new Ext.Toolbar({
	renderTo:'toolbarDiv',
	height:62,
	items:[
			'<div style="text-align:center;padding-left:10px"><img src="/callcenter/ctiControls/images/telephone.png" width="32px" height="32px"/></div>','<div id="pStatus" style="width:80;text-align:center;">未注册</div>',
			'-',
			{
				id:'btnIdle',
				text:'空闲',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
				width:40,
				icon:'/callcenter/ctiControls/images/idle.png',
				listeners:{ 
					"click":function(){ 
						ivrSetBusy(false);
					} 
				}					
			},
			{
				id:'btnBusy',
                text:'置忙',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
				width:40,
				icon:'/callcenter/ctiControls/images/busy.png',
				listeners:{ 
					"click":function(){ 
						ivrSetBusy(true);
					} 
				}					
			},
			'-',
			{
				id:'btnPhoneDial',
                text:'拨号',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
				width:40,
				icon:'/callcenter/ctiControls/images/dial.png',
				listeners:{ 
					"click":function(){ 
						showDialPad(200,80,"拨号",function(exten){phoneDial(exten)}, true);
					} 
				} 					
			},
			{
				id:'btnPhoneAccept',
                text:'接听',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
                hidden: true,
				width:40,
				icon:'/callcenter/ctiControls/images/accept.png',
				listeners:{ 
					"click":function(){ 
						phoneAccept();
					} 
				} 
			},
			{
				id:'btnPhoneHangup',
                text:'挂机',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
				width:40,
				hidden:true,
				icon:'/callcenter/ctiControls/images/hangup.png',
				listeners:{ 
					"click":function(){ 
						phoneHangup();
					} 
				} 					
			},
			{
				id:'btnPhoneTransfer',
                text:'转接',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
				width:40,
				icon:'/callcenter/ctiControls/images/transfer.png',
				listeners:{ 
					"click":function(){ 
						showDialPad(330,80,"转接给",function(exten){phoneTransfer(exten)});
					} 
				} 										
			},
			{
				id:'btnPhoneConf',
                text:'三方',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
				width:40,
				icon:'/callcenter/ctiControls/images/conf.png',
				listeners:{ 
					"click":function(){ 
						showDialPad(370,80,"邀请三方",function(exten){phoneConf(exten)});
					} 
				} 										
			},
			{
				id:'btnPhoneHold',
                text:'保持',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
				width:40,
				icon:'/callcenter/ctiControls/images/hold.png',
				listeners:{ 
					"click":function(){ 
						phoneHold();
					} 
				} 					
			},
			{
				id:'btnPhoneIntercept',
                text:'抢接',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
				width:40,
				icon:'/callcenter/ctiControls/images/intercept.png',
				listeners:{ 
					"click":function(){ 
						phoneIntercept();
					} 
				}
			},
			{
				id:'btnPhoneMonit',
                text:'监听',
				cls:'x-btn-text-icon',
                iconAlign: 'top',
                scale: 'large',
				width:40,
				icon:'/callcenter/ctiControls/images/monit.png',
				hidden:true
			}
]});


var ivr=document.getElementById("SpzcIvrObject");
var phone=null;
var gRemoteNumber = "";
function getStrStatus() {
	gIvrState = ivr.MyState;
	if (gIvrState == 2) return "空闲";
	if (gIvrState == 3) return "摘机";
	if (gIvrState == 4) return "通话中";
	if (gIvrState == 5) return "暂停";
	if (gIvrState == 6) return "振铃中";
	if (gIvrState == 7) return "通话保持";
	if (gIvrState == 8) return "外拨通话";
	if (gIvrState == 9) return "正在监听";
	if (gIvrState == 10) return "已强插";
	if (gIvrState == 11) return "话后处理";
	if (gIvrState == 12) return "正在外拨";
	if (gIvrState == 13) return "三方振铃";
}
function getRemoteURI() {
	return gRemoteNumber;
}
function setLocalHold(bHold) {
	var btn = Ext.getCmp("btnPhoneHold");
	if (bHold)
		btn.setText("解除");
	else
		btn.setText("保持");
}

function toolbarStatus() {
	gIvrState = ivr.MyState; 
	var text=document.getElementById("pStatus");
	
	var ivrRegisted = (gIvrState>=2);
	var ivrBusy = (gIvrState==5);
	//var phoneRegisted = phone.IsRegisted;
	//var phoneStatus = phone.State;
	var bBusy = Ext.getCmp("btnBusy");
	var bIdle = Ext.getCmp("btnIdle");
	var bDial = Ext.getCmp("btnPhoneDial");
	var bAccept = Ext.getCmp("btnPhoneAccept");
	var bTransfer = Ext.getCmp("btnPhoneTransfer");
	var bConf = Ext.getCmp("btnPhoneConf");
	var bHold = Ext.getCmp("btnPhoneHold");
	var bHangup = Ext.getCmp("btnPhoneHangup");
	var bMonit = Ext.getCmp("btnPhoneMonit");
	var bIntercept = Ext.getCmp("btnPhoneIntercept");
	
	//gPhoneRegisted = phoneRegisted;
	gIvrRegisted = ivrRegisted;
	//alert(ivr.MyState);
	//if (ivr.MyState>2) ivrRegisted = true;
	//if (ivr.MyState==5) ivrBusy = true;
		
	
	if (ivrRegisted) {
		if (ivrBusy) {
			bBusy.disable();
			bIdle.enable();
		} else {
			bBusy.enable();
			bIdle.disable();
		}
	} else {
		bBusy.disable();
		bIdle.disable();
	}
	//pStatus.innerText="1";
	registAll();
		
	
	//alert(gIvrState);
	if (gIvrState <2) { //未连接或未注册
		pStatus.innerText="未注册";
		bDial.disable();
		bAccept.disable();
		bTransfer.disable();
		bConf.disable();
		bHold.disable();
		bHangup.disable();
		bMonit.disable();
		bIntercept.disable();
		//console.log("======No Connection OR No Register"+gIvrState);
		return;
	} else if (gIvrState == 2) { //空闲
		pStatus.innerText=getPhoneAccount()+"\n（本机号码）"; //显示分机号码
		//pStatus.innerText="13911275013\n(北京)";
		gPhoneHold = false;
		setLocalHold(false);
		bDial.enable();
		bAccept.disable();
		bTransfer.disable();
		bConf.disable();
		bHold.disable();
		bHangup.disable();
		bMonit.enable();
		bIntercept.enable();			
	} else if (gIvrState == 3 || gIvrState == 5) { //摘机、暂停时不能使用
		pStatus.innerText=getPhoneAccount()+"\n（暂停）";
		bDial.disable();
		bAccept.disable();
		bTransfer.disable();
		bConf.disable();
		bHold.disable();
		bHangup.disable();
		bMonit.disable();
		bIntercept.disable();	
	} else if (gIvrState == 6 || gIvrState == 12 || gIvrState == 13 || gIvrState == 9 || gIvrState == 10 || gIvrState == 11) { //振铃、监听、强插等
		pStatus.innerText=getRemoteURI()+"\n（"+getStrStatus()+"）"; //显示来电号码
		bDial.disable();
		bAccept.disable();
		bTransfer.disable();
		bConf.disable();
		bHold.disable();
		bHangup.enable();
		bMonit.disable();
		bIntercept.disable();	
	} else if (gIvrState == 4 || gIvrState == 7 || gIvrState == 8) { //通话中、保持、外拨通话中
		pStatus.innerText=getRemoteURI()+"\n（"+getStrStatus()+"）"; 
		bDial.disable();
		bAccept.disable();
		bTransfer.enable();
		bConf.enable();
		bHold.enable();
		bHangup.enable();
		bMonit.disable();
		bIntercept.disable();	
	}
}

setInterval("toolbarStatus()", 1000);
function registIvr() {
	var ivrState = ivr.MyState;
	//console.log("============registIvr: ivrState:" + ivrState);
	if (ivrState <= -1) { //未连接
		ivrConnect();
	} else if (ivrState == 0 || ivrState == 1){ //已连接，未注册
		ivrLogin();
	}
}
function registAll() {
	if (!gIvrRegisted) {
		registIvr();
	}
	if (gIvrBusy && ivr.MyState!=5) {
		ivr.SSetBusy();
	}
}
function ivrSetBusy(bBusy) {
	//alert(bBusy);
	if (!bBusy) {
		gIvrBusy = false;
		ivr.SSetCancelBusy();
	} else {
		gIvrBusy = true;
		ivr.SSetBusy();
	}
}
function ivrConnect() {
	ivr.SInit(getIvrServerAddress(), getIvrServerPort());
	
	//console.log("============ivrConnect: ivrState:" + ivr.MyState);
	//ivr.SInit("192.168.0.193", "1202"); 
}
function ToConnectACD() {
 	registAll();
}
//注册
function ivrLogin(){
    ivr.SLogin(getAgentNumber(),getAgentName(),getPhoneAccount(),getAgentGroup(),getAgentLevel());
}
function phoneTransfer(exten) {
	ivr.STransferE(exten);
}
function phoneIntercept() {
	SPickCall();
}
function phoneDial(exten) {
	ivr.SDial(exten, "");
}
function phoneAccept() {
	phone.AcceptCall();
}
function phoneHangup() {
	phone.HangupCall();
}
function phoneConf(exten) {
	ivr.SConferenceE(exten);
}
function phoneHold() {
	if (!gPhoneHold) {
		ivr.SHold();
		setLocalHold(true);
		gPhoneHold = true;
	} else {
		ivr.SCancelHold();
		setLocalHold(false);
		gPhoneHold = false;
	}
}
