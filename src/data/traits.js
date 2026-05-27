const TRAITS = {
  bg: ['Forest','Swamp','Night','Sunset','Deep Sea','Jungle'],
  eyes: ['Regular','Laser','Heart','Star','Sleepy','Wide'],
  hat: ['None','Crown','Cap','Bandana','Wizard','Helmet'],
  vibe: ['Chill','Hyped','Rare','Legendary','Cool','Fresh'],
};

export function getNFTTraits(id) {
  const seed = id || 1;
  return {
    bg:   TRAITS.bg[seed % TRAITS.bg.length],
    eyes: TRAITS.eyes[seed % TRAITS.eyes.length],
    hat:  TRAITS.hat[seed % TRAITS.hat.length],
    vibe: TRAITS.vibe[seed % TRAITS.vibe.length],
  };
}
