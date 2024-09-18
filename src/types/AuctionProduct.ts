export default interface AuctionProduct {
    idAuction:string,
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    currentBid: number;
    buyNowPrice: number;
    auctionEndTime: number;
}