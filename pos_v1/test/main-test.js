'use strict';

describe('pos', () => {

    it('should return ags_addCount in there the barcode of tags is the only one and contain count', () => {
        const tags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2.5',
            'ITEM000005',
            'ITEM000005-2',
        ];

        const actualResult=getTags_addCount(tags);

        let expectResult = [
            {barcode:'ITEM000001',count:5},
            {barcode:'ITEM000003',count:2.5},
            {barcode:'ITEM000005',count:3},
        ];

        expect(actualResult).toEqual(expectResult);
    });

    it('should return tags_addCost2 it equals tags_addCount contain cost and discount', () => {
        const tags_addCount=[
          {barcode:'ITEM000001',count:5},
          {barcode:'ITEM000003',count:2.5},
          {barcode:'ITEM000005',count:3},
        ];
        const allItems=loadAllItems();
        const promotions=loadPromotions();

        const actualResult=getTags_addCost2(tags_addCount,allItems,promotions);

        let expectResult = [
            {barcode:'ITEM000001',count:5,cost:'15.00',discount_cost:'12.00'},
            {barcode:'ITEM000003',count:2.5,cost:'37.50',discount_cost:'37.50'},
            {barcode:'ITEM000005',count:3,cost:'13.50',discount_cost:'9.00'},
        ];

        expect(actualResult).toEqual(expectResult);
    });

  it('should return sum_discount_cost', () => {
    const tags_addCost2=[
      {barcode:'ITEM000001',count:5,cost:'15.00',discount_cost:'12.00'},
      {barcode:'ITEM000003',count:2.5,cost:'37.50',discount_cost:'37.50'},
      {barcode:'ITEM000005',count:3,cost:'13.50',discount_cost:'9.00'},
    ];

    const actualResult=getSum_discount_cost(tags_addCost2);

    let expectResult = '58.50';

    expect(actualResult).toEqual(expectResult);
  });

  it('should return savingMoney', () => {
    const tags_addCost2=[
      {barcode:'ITEM000001',count:5,cost:'15.00',discount_cost:'12.00'},
      {barcode:'ITEM000003',count:2.5,cost:'37.50',discount_cost:'37.50'},
      {barcode:'ITEM000005',count:3,cost:'13.50',discount_cost:'9.00'},
    ];

    const actualResult=getSavingMoney(tags_addCost2);

    let expectResult = '7.50';

    expect(actualResult).toEqual(expectResult);
  });

   it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
