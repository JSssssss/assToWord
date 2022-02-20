/**
 * Created by JS-3 on 2017/8/18.
 */
var startDownload = function (data, filename) {
	var blob = new Blob([data], { type: 'application/octet-stream' });
	var url = window.URL.createObjectURL(blob);
	var saveas = document.createElement('a');
	saveas.href = url;
	saveas.style.display = 'none';
	document.body.appendChild(saveas);
	saveas.download = filename;
	saveas.click();
	setTimeout(function () { saveas.parentNode.removeChild(saveas); }, 1000);
	document.addEventListener('unload', function () { window.URL.revokeObjectURL(url); });
};
var config = [];
window.addEventListener('load', function () {
	var upload = document.querySelector('#file');
	upload.addEventListener('change', function () {
		var files = upload.files;
		function readAndPreview(file) {
			if (/\.(ass)$/i.test(file.name) ) {			// 确保 `file.name` 符合我们要求的扩展名
				var reader = new FileReader();
				reader.addEventListener("load", function () {
					var obj = {};
					obj.name = file.name.replace(/\.ass$/, '');


					lines = matchAgain(reader.result,/(?=Dialogue).*/)				
					var outputStr = ''					
					for(l in lines){
						var line = lines[l]
						var time= matchAgain(line,/\d+:\d+:\d+/)[0]
						var sentence = matchAgain(line,/(?<=,,)[^\d].*/)[0].replace(/ /g,'')
						var words = sentence.split('')
						for(w in words){
							var word = words[w]
							var finalWord = word + time + ' '
							outputStr += finalWord
						}
					}
					startDownload('\ufeff' + outputStr, obj.name + '.txt');


				}, false);
				reader.readAsText(file);
			}else swal('请选择扩展名为“*.ass”的文件！')
		}
		if (files) {
			[].forEach.call(files, readAndPreview);
		}
		//upload.value = '';
	});
//点击事件
	document.onclick = function(e){
		var evt = e || window.event;
		var target = evt.target || evt.srcElement;
	};
});
//从一行中提取数字
var matchAgain = function (text,regex) {
	var reg = new RegExp(regex,"gi");
	return text.toString().match(reg)||0;
};
//
var ifSame = document.getElementById('ifSame');
// Handle keyboard controls
var keysDown = {};
var swErr = function(){
	swal({
		title: "目前这玩意还不能上下选择",
		text: "这个框框一会会自己关闭",
		timer: 1500,
		button: "关！",
		icon: "error"
	});
};