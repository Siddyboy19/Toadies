const NFT_DATA = Array.from({ length: 57 }, (_, i) => ({
  id: i + 1,
  name: `Toadie #${String(i + 1).padStart(4, '0')}`,
  src: `/nfts/${i + 1}.png`,
  rarity: i < 3 ? 'Legendary' : i < 12 ? 'Epic' : i < 28 ? 'Rare' : 'Common',
}));

export default NFT_DATA;
