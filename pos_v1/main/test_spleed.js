/**
 * Created by cr on 7/14/17.
 */
var tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
];
function getResult(tags){
    var result=new Array();
    var newTags=new Array();
    for(var i=0;i<tags.length;i++){
        newTags[i]={};
        var tag_length=tags[i].indexOf('-');
        var isInPreArr=0;
        if(tag_length!=-1){
            newTags[i].barcode=tags[i].substring(0,tag_length);
            newTags[i].count=parseFloat(tags[i].substring(tag_length+1));
        }else{
            newTags[i].barcode=tags[i];
            newTags[i].count=parseFloat(1);
        }
        for(var j=0;j<result.length;j++){
            if(newTags[i].barcode==result[j].barcode){
                result[j].count+=newTags[i].count;
                isInPreArr=1;
            }
        }
        if(isInPreArr!=1){
            var result_length=result.length;
            result[result_length]={};
            result[result_length].barcode=newTags[i].barcode;
            result[j].count=newTags[i].count;
        }
    }
    //console.log(result[1].count);
    return result;
}

function test(tags){
    var result=getResult(tags);
    for(var i=0;i<result.length;i++){
        console.log(result[i].barcode);
        console.log(result[i].count);
    }
}
test(tags);