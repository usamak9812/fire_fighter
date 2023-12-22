Polymer("core-ajax",{url:"",handleAs:"",auto:false,params:"",response:null,error:null,loading:false,progress:null,method:"",headers:null,body:null,contentType:"application/x-www-form-urlencoded",withCredentials:false,xhrArgs:null,created:function(){this.progress={}},ready:function(){this.xhr=document.createElement("core-xhr")},receive:function(response,xhr){if(this.isSuccess(xhr)){this.processResponse(xhr)}else{this.processError(xhr)}this.complete(xhr)},isSuccess:function(xhr){var status=xhr.status||0;return status>=200&&status<300},processResponse:function(xhr){var response=this.evalResponse(xhr);if(xhr===this.activeRequest){this.response=response}this.fire("core-response",{response:response,xhr:xhr})},processError:function(xhr){var response=this.evalResponse(xhr);var error={statusCode:xhr.status,response:response};if(xhr===this.activeRequest){this.error=error}this.fire("core-error",{response:error,xhr:xhr})},processProgress:function(progress,xhr){if(xhr!==this.activeRequest){return}var progressProxy={lengthComputable:progress.lengthComputable,loaded:progress.loaded,total:progress.total};this.progress=progressProxy},complete:function(xhr){if(xhr===this.activeRequest){this.loading=false}this.fire("core-complete",{response:xhr.status,xhr:xhr})},evalResponse:function(xhr){return this[(this.handleAs||"text")+"Handler"](xhr)},xmlHandler:function(xhr){return xhr.responseXML},textHandler:function(xhr){return xhr.responseText},jsonHandler:function(xhr){var r=xhr.responseText;try{return JSON.parse(r)}catch(x){console.warn("core-ajax caught an exception trying to parse response as JSON:");console.warn("url:",this.url);console.warn(x);return r}},documentHandler:function(xhr){return xhr.response},blobHandler:function(xhr){return xhr.response},arraybufferHandler:function(xhr){return xhr.response},urlChanged:function(){if(!this.handleAs){var ext=String(this.url).split(".").pop();switch(ext){case"json":this.handleAs="json";break}}this.autoGo()},paramsChanged:function(){this.autoGo()},bodyChanged:function(){this.autoGo()},autoChanged:function(){this.autoGo()},autoGo:function(){if(this.auto){this.goJob=this.job(this.goJob,this.go,0)}},getParams:function(params){params=this.params||params;if(params&&typeof params=="string"){params=JSON.parse(params)}return params},go:function(){var args=this.xhrArgs||{};args.body=this.body||args.body;args.params=this.getParams(args.params);args.headers=this.headers||args.headers||{};if(args.headers&&typeof args.headers=="string"){args.headers=JSON.parse(args.headers)}var hasContentType=Object.keys(args.headers).some(function(header){return header.toLowerCase()==="content-type"});if(args.body instanceof FormData){delete args.headers["Content-Type"]}else if(!hasContentType&&this.contentType){args.headers["Content-Type"]=this.contentType}if(this.handleAs==="arraybuffer"||this.handleAs==="blob"||this.handleAs==="document"){args.responseType=this.handleAs}args.withCredentials=this.withCredentials;args.callback=this.receive.bind(this);args.url=this.url;args.method=this.method;this.response=this.error=this.progress=null;this.activeRequest=args.url&&this.xhr.request(args);if(this.activeRequest){this.loading=true;var activeRequest=this.activeRequest;if("onprogress"in activeRequest){this.activeRequest.addEventListener("progress",function(progress){this.processProgress(progress,activeRequest)}.bind(this),false)}else{this.progress={lengthComputable:false}}}return this.activeRequest},abort:function(){if(!this.activeRequest)return;this.activeRequest.abort();this.activeRequest=null;this.progress={};this.loading=false}});