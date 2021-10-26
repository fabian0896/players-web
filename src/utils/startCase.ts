const startCase = (text: string = '') => {
  const words = text.split(' ');
  const cammelWords = words.map(word => word.charAt(0).toUpperCase() + word.substring(1));
  return cammelWords.join(' ');
}

export default startCase;
