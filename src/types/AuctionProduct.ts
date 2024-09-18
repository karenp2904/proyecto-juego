export default interface AuctionProduct {
    idAuction:string,
    idProduct: string;
    name: string;
    description: string;
    imageUrl: string;
    initialAmount?:number;
    currentBid: number;
    buyNowPrice: number;
    auctionEndTime: number;
}