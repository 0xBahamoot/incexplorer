export const getTokenIcon = (token: string) => {
    try {
        let name = token.replace('p', '').toUpperCase();
        return `https://statics.incognito.org/cmc/symbols/128x128/${name}.png`;
    } catch (error) {
        return 'https://incscan.io/static/default_token_icon.png';
    }
};