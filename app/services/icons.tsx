export const getTokenIcon = (token: string) => {
    try {
        let nane = token.replace('p', '').toLowerCase();
        return `https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color/${nane}@2x.png`;
    } catch (error) {
        return 'https://incscan.io/static/default_token_icon.png';
    }
};