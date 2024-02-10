module.exports = class SpotifyAPI {
    constructor() {
        this.clientID = process.env.SPOTIFY_CLIENT_ID;
        this.clientSecret = process.env.SPOTIFY_SECRET;
        this.market = process.env.SPOTIFY_MARKET;
        this.accessToken = null;
    }

    async requestAccessToken() {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + Buffer.from(this.clientID + ":" + this.clientSecret).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials"
        });
        const json = await response.json();
        this.accessToken = json.access_token;
    }

    async spotify(url) {
        await this.requestAccessToken();
        const trackID = url.split('track/')[1].split('&')[0].split('?')[0];
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackID}?market=${this.market}`, {
            headers: {
                "Authorization": "Bearer " + this.accessToken
            }
        });
        const json = await response.json();
        return json;
    }
}