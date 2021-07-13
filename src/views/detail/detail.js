/*
 * 1. 定义类
 * 2. 将 detailHome 中网络请求来的数据封装为对象，便于使用
 */
export class DetailGoodsInfo {
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.discountBgColor = itemInfo.discountBgColor;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}
export class ShopInfo {
    constructor(ShopInfo){
        this.logo = ShopInfo.shopLogo;
        this.name = ShopInfo.name;
        this.fans = ShopInfo.cFans;
        this.sells = ShopInfo.cSells;
        this.score = ShopInfo.score;
        this.goodsCount = ShopInfo.cGoods;
    }
}

export class GoodsList {
    constructor(detailInfo){
        this.key = detailInfo.detailImage[0].key;
        this.list = detailInfo.detailImage[0].list;
        this.desc = detailInfo.desc;
    }
}

export class itemParams {
    constructor(itemParams){
        this.key = itemParams.info.key;
        this.set = itemParams.info.set;
        this.disclaimer = itemParams.rule.disclaimer;
        this.rulekey = itemParams.rule.key;
        this.tables = itemParams.rule.tables[0];
    }
}

export class comment {
    constructor(rate){
        this.cRate = rate.cRate;
        this.list = rate.list;
    }
}

export class recommendlist{
    constructor(data){
        this.currentTime = data.context.currentTime;
        this.isEnd = data.isEnd;
        this.list = data.list;
    }
}

export class addShopCar{
    constructor(skuInfo, shopName, uesrId){
        this.defaultPrice = skuInfo.defaultPrice;
        this.colorName = skuInfo.props[0].label;
        this.colorList = skuInfo.props[0].list;
        this.size = skuInfo.props[1].label;
        this.sizeList = skuInfo.props[1].list;
        this.skus = skuInfo.skus;
        this.title = skuInfo.title;
        this.totalStock = skuInfo.totalStock;
        this.shopName = shopName;
        this.uesrId = uesrId;
    }
}


