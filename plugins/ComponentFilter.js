var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = function(eVar){

	return {
		files: {},
		eVar: eVar,
		getComponentToExclude:function() {	
		  return this.eVar&&this.eVar.component ? this.eVar.component.split(","):[];
		},
		getComponentToClean:function() {
		  if(this.eVar&&this.eVar.component){
		  	var cList=this.eVar.component.split(",");
		  	var dList=[];
		  	cList.forEach(function(f,i){
		  		dList.push('build/**/'+f+'.*');
		  	})
		  	return dList
		  }else{
		  	return ['build']
		  }
		},
		gethtmlEntryPlugin:function(){
		   	var htmlEntryPlugin=[];
			var _this=this;
			_this.files.forEach(function(f,i) {
				var fileProp=_this.getFileProp(f);
				if(fileProp.fileType=='ejs'){
					htmlEntryPlugin.push(new HtmlWebpackPlugin({
						filename: 'html/'+fileProp.componentName+'.html',
						template: f,
						inject:false
					}))
				}
		    })
		    return htmlEntryPlugin;
		},
		getCleanFilesList:function(){
		   	var excludeFiles=[];
		   	var _this=this;
			_this.files.forEach(function(f,i) {
				var fileProp=_this.getFileProp(f);
				if(fileProp.fileType!='ts'){
					excludeFiles.push(fileProp.componentName+""+fileProp.fileType+".js");
				}
		    })
		    return excludeFiles;
		},
		getFileProp:function(f){
			var pathSplit=f.split(path.sep);
			var componentName=pathSplit[pathSplit.length-2];
			var fileType=path.extname(path.basename(f)).replace(".","");
			return {fileType:fileType,componentName:componentName}
		},
		getEntryFilesList:function(){
			var inputFiles={};
			var _this=this;
			_this.files.forEach(function(f,i) {
				var fileProp=_this.getFileProp(f);
				fileProp.fileType=fileProp.fileType=='ts'?'':fileProp.fileType;
				inputFiles[fileProp.componentName+""+fileProp.fileType]=f.replace(/src/, './src')
		    })
		    return inputFiles;
		},
		ignoreFunc:function(file, stats) {
		  // `file` is the path to the file, and `stats` is an `fs.Stats`
		  // object returned from `fs.lstat()`.
		  var excludeComp=this.getComponentToExclude();
		  return ((stats.isDirectory() && path.basename(file) == "assests")||(excludeComp.length && stats.isDirectory() && excludeComp.indexOf(path.basename(file))==-1))
		}
	}
};