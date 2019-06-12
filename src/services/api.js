import util from 'ser/util'

var fileImageTypes = {
    'excel': ['xls', 'xlsx'],
    'music': ['mp3', 'wma', 'wav', 'mod', 'ogg', 'm4a'],
    'pdf': ['pdf'],
    'photo': ['bmp', 'gif', 'jpeg', 'jpg', 'svg', 'png', 'psd'],
    'ppt': ['ppt', 'pptx'],
    'txt': ['txt', 'key'],
    'video': ['rm', 'rmvb', 'wmv', 'avi', 'mp4', '3gp', 'mkv', 'flv', 'mov', 'mpg'],
    'word': ['doc', 'docx', 'wps'],
    'zip': ['zip', 'rar', '7z'],
    'unknow': ['file'],
    'folder': ['folder']
}
var fileImages = {};
var fileTypeImages = {};
for(var fext in fileImageTypes){
    fileImages[fext] = 'static/fileImages/' + fext + '.png';
    var arr = fileImageTypes[fext];
    if(arr.length > 0){
        for(var i = 0; i < arr.length; i++){
            fileTypeImages[arr[i]] = fext;
        }
    }
}

function getFileImages(ext) {
    var type = fileTypeImages[ext];
    if (type) {
        return fileImages[type];
    } else {
        return fileImages['unknow'];
    }
}

module.exports = {
    getRecentUsedFiles(success, error){
        app.linkplugin.ajax({
            url: window.env.diskOpenApiUri + 'file/share/list',
            data: {
                by: window.userInfo.userId
            },
            success: function(res){
                try {
                    var files = res.rows;
                    util.each(files, function(f){
                        f.iconPath = getFileImages(f.type == 'D' ? 'folder' : f.extension);
                    })
                    success(files);
                } catch(e){
                    console.log(e);
                    error(window.i18n.ErrorData);
                }
            },
            error: function(){
                error(window.i18n.ErrorLoadData);
            }
        })
    }
}
