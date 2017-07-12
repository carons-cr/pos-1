'use strict';
//#1:得到已购买商品数组,计划用时8分钟，实际用时7分钟
function getItemArray(inputArray){
    var AllItems = loadAllItems();
    var itemArray=new Array();
    var k=0;
    for(var i=0;i<inputArray.length;i++){
       for(var j=0;j<AllItems.length;j++){
          if(inputArray[i]==AllItems[j].barcode){
            k=k++;
            itemArray[k]=AllItems[j];
          }
       }
    }
    return itemArray;
}
//#2: 将count属性添加到商品数组的对象中得到新数组，计划用时15分钟，实际用时13分钟
function getCount(itemArray){
    var itemArray_addCount=new Array();
    itemArray_addCount[0]=itemArray[0];
    itemArray_addCount[0].count=1;
    var isInPreArr=0;
    for(var i=0;i<itemArray.length;i++){
        for(var j=itemArray_addCount.length-1;j>=0;j--){
            if(itemArray[i].barcode==itemArray_addCount[j].barcode){
                itemArray_addCount[j].count++;
                isInPreArr=1;
            }
        }
        if(isInPreArr!=1){
            itemArray_addCount[itemArray_addCount.length]=itemArray[i];
            itemArray_addCount[itemArray_addCount.length].count=1;
        }

    }
    return itemArray_addCount;
}
//#3: 计算小计,计划用时3分钟，实际用时4分钟
function getCost(itemArray_addCount){
    var itemArray_addCost=itemArray_addCount;
    for(var i=0;i<itemArray_addCost.length;i++){
        itemArray_addCost[i].cost=itemArray_addCost[i].price*itemArray_addCost[i].count;
    }
    return itemArray_addCost;
}
//#4:计算总计,计划用时3分钟，实际用时2分钟
function getCostSum(itemArray_addCost){
    var costSum=0;
    for(var i=0;i<itemArray_addCost.length;i++){
        costSum+=itemArray_addCost[i].cost;
    }
    return costSum;
}
//#5:打印结果,计划用时8分钟，实际用时2分钟
function printReceipt(inputArray) {
  var itemArray=getItemArray(inputArray);
  var itemArray_addCount=getCount(itemArray);
  var itemArray_addCost=getCost(itemArray_addCount);
  var result;
  var str1="***<没钱赚商店>收据***\n";
  var str2="";
  for(var i=0;i<itemArray_addCost.length;i++){
    str2+="名称："+itemArray_addCost[i].name+"，数量："+itemArray_addCost[i].count
        +itemArray_addCost[i].unit+"，单价："+itemArray_addCost[i].price+"(元)，"
        +itemArray_addCost[i].cost+"(元)，\n";
  }
  var str3="----------------------\n"+"总计："
      +getCostSum(itemArray_addCost)+"(元)，\n"
      +"**********************";
    result=str1+str2+str3;

  console.log(result);
}
