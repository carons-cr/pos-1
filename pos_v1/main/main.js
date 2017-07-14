'use strict';
/*#1： 将商品码数组去重得到添加数量的新数组,计划用时5分钟,实际用时6分钟,
实际用时36分钟，原因是一直在改进，让代码尽量简单点
 input:
 tags     [String]
 output:
 tags_addCount    [{tag String,count int}]*/
function getTags_addCount(tags){
    var tags_addCount=new Array();
    var newTags=[];
    for(var i=0;i<tags.length;i++){
        var addLength=tags[i].indexOf('-');  //细节错误！是tags[i]，不是tags！！！
        var isInPreArr=0;
        newTags[i]={};
        if(addLength>0){
            newTags[i].barcode=tags[i].substring(0,addLength);
            newTags[i].count=parseFloat(tags[i].substring(addLength+1));
        }else{
            newTags[i].barcode=tags[i];
            newTags[i].count=1;
        }
        for (var j=0; j<tags_addCount.length;j++) {
            if (newTags[i].barcode==tags_addCount[j].barcode) {
                tags_addCount[j].count+=newTags[i].count;
                isInPreArr = 1;
            }
        }
        if (isInPreArr!= 1) {
            tags_addCount.push({barcode:newTags[i].barcode, count:newTags[i].count});
        }
    }
    return tags_addCount;
}
/*#2: 根据包含数量的商品码数组和全部商品信息数组得到添加小计和折扣后
 的小计的商品码数组，计划用时8分钟，实际用时19分钟，原因是发现按原本思路写有点不太好看，想改思路，
 改了一点，然而到最后，，还是没换，想起不能违背tasking。。。
 input:，
 tags_addCount    [{tag String,count int}]
 allItems     [{barcode Sting,name String,unit String,price float}]
 output:
 tags_addCost2    [{tag String,count int,cost float,discount_cost float}]*/
function getTags_addCost2(tags_addCount,allItems,promotions){
    var tags_addCost2=new Array();
    for(var i=0;i<tags_addCount.length;i++){
        for(var j=0;j<allItems.length;j++){
            if(tags_addCount[i].barcode==allItems[j].barcode){
                tags_addCost2[i]=tags_addCount[i];
                tags_addCost2[i].cost=(parseFloat(tags_addCost2[i].count)*parseFloat(allItems[j].price)).toFixed(2);
                tags_addCost2[i].discount_cost=parseFloat(tags_addCost2[i].count)*parseFloat(allItems[j].price);
                //细节错误！括号在price后面，不在前面！！！
                for(var k=0;k<promotions.length;k++){
                    if(promotions[k].type=='BUY_TWO_GET_ONE_FREE'){
                        for(var h=0;h<promotions[k].barcodes.length;h++){
                            if((tags_addCount[i].barcode==promotions[k].barcodes[h])&&(tags_addCount[i].count>=3)){
                                tags_addCost2[i].discount_cost-=parseFloat(allItems[j].price);
                            }
                        }
                    }
                }
                tags_addCost2[i].discount_cost=(tags_addCost2[i].discount_cost).toFixed(2);
            }
        }
    }
    return tags_addCost2;
}
/*#3: 根据包含数量，小计，折扣后小计的商品数组得到总计，计划用时3分钟,实际用时5分钟
 input:
 tags_addCost2    [{tag String,count float,cost float,discount_cost float}]
 output:Sum     float*/
function getSum_discount_cost(tags_addCost2){
    var discount_costSum=0;
    for(var i=0;i<tags_addCost2.length;i++){
        discount_costSum+=parseFloat(tags_addCost2[i].discount_cost);  //将小计变为浮点型再计算
    }
    discount_costSum=discount_costSum.toFixed(2);    //将总计保留两位小数
    return discount_costSum;
}
/*#4: 根据包含数量，小计，折扣后小计的商品数组得到节省的钱，计划用时3分钟,实际用时3分钟*/
function getSavingMoney(tags_addCost2){
    var SavingMoney=0;
    for(var i=0;i<tags_addCost2.length;i++){
        SavingMoney+=parseFloat(tags_addCost2[i].cost)
            -parseFloat(tags_addCost2[i].discount_cost);  //将小计变为浮点型再计算
    }
    SavingMoney=SavingMoney.toFixed(2);    //将总计保留两位小数
    return SavingMoney;
}
/*#5: 根据全部商品信息数组，包含数量，小计，折扣后小计的商品数组，总计，节省的钱*/
function printReceipt(tags) {
    var tags_addCount=getTags_addCount(tags);
    var allItems=loadAllItems();
    var promotions=loadPromotions();
    var tags_addCost2=getTags_addCost2(tags_addCount,allItems,promotions);
    var result;
    var str1='***<没钱赚商店>收据***\n';
    var str2='';
    for(var i=0;i<tags_addCost2.length;i++){
        for(var j=0;j<allItems.length;j++){
            if(tags_addCost2[i].barcode==allItems[j].barcode){
                str2+='名称：'+allItems[j].name+'，数量：'+tags_addCost2[i].count
                    +allItems[j].unit+'，单价：'+allItems[j].price+'(元)，'
                    +tags_addCost2[i].discount_cost+'(元)，\n';
            }
        }
    }
    var str3='----------------------\n'+'总计：'+getSum_discount_cost(tags_addCost2)+'(元)，\n'
        +'节省：'+getSavingMoney(tags_addCost2)+'\n**********************';
    result=str1+str2+str3;
    //return result;
    console.log(result);
}
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

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}

printReceipt(tags);