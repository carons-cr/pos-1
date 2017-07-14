/**
 * Created by cr on 7/13/17.
 */
function getTag(number){
    var tag='';
    if(number%3==0){
        tag+='fizz';
    }
    if(number%5==0){
        tag+='buzz';
    }
    if(number%7==0){
        tag+='wizz';
    }
    return tag;
}
function fizzbuzzwizz(number){
    var result;
    if(number.toString().indexOf('3')!=-1){
        result='fizz';
    }else if(number%3==0||number%5==0||number%7==0){
        result=getTag(number);
    }else{
        result=number;
    }
    return result;
}