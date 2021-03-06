'use strict';
//#1:根据商品码得到已购买商品信息数组,计划用时8分钟，实际用时7分钟
function getItemArray(inputArray){
    var AllItems = loadAllItems();
    var itemArray=new Array();
    var k=0;
    for(var i=0;i<inputArray.length;i++){
        for(var j=0;j<AllItems.length;j++){
            if(inputArray[i]==AllItems[j].barcode){
                //k=k++;            //这样k++语句不会运行
                itemArray[k]=AllItems[j];
                k++;       //k放最前面数组就从序号1开始的
            }
        }
    }
    return itemArray;
}
//#2: 将count属性添加到已购买商品信息数组的元素中得到新数组，计划用时15分钟，实际用时13分钟
function getCount(itemArray){
    var itemArray_addCount=new Array();
    for(var i=0;i<itemArray.length;i++){
        var isInPreArr=0;    //放最外层循环，不然会一直等于1
        for(var j=itemArray_addCount.length-1;j>=0;j--){
            if(itemArray[i].barcode==itemArray_addCount[j].barcode){
                itemArray_addCount[j].count++;
                isInPreArr=1;
            }
        }
        if(isInPreArr!=1){
            var length_now=itemArray_addCount.length;  //先将当前数组的长度存起来再使用
            itemArray_addCount.push(itemArray[i]);
            itemArray_addCount[length_now].count=1;
        }

    }
    return itemArray_addCount;
}
//#3: 计算小计,计划用时3分钟，实际用时4分钟
function getCost(itemArray_addCount){
    var itemArray_addCost=itemArray_addCount;
    var cost=0;
    for(var i=0;i<itemArray_addCost.length;i++){
        cost=itemArray_addCost[i].price*itemArray_addCost[i].count;
        itemArray_addCost[i].cost=cost.toFixed(2);  //将小计保留两位小数
    }
    return itemArray_addCost;
}
//#4:计算总计,计划用时3分钟，实际用时2分钟
function getCostSum(itemArray_addCost){
    var costSum=0;
    for(var i=0;i<itemArray_addCost.length;i++){
        costSum+=parseFloat(itemArray_addCost[i].cost);  //将小计变为浮点型再计算
    }
    costSum=costSum.toFixed(2);    //将总计保留两位小数
    return costSum;
}
//#5:打印结果,计划用时8分钟，实际用时2分钟
function printReceipt(itemArray) {
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
    //return result;
    console.log(result);
}
var inputArray = [   //将const改为var
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
];
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}
var itemArray=getItemArray(inputArray);
printReceipt(itemArray);

