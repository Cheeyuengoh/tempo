module.exports = class Music {
    constructor({ url, title, duration, requestedBy }) {
        this.url = url;
        this.title = title;
        this.duration = duration;
        this.requestedBy = requestedBy;
    }

    getDurationString() {
        const minutes = Math.floor(this.duration / 60);
        const seconds = this.duration - (minutes * 60);
        return minutes + ":" + seconds;
    }

    getRequestedByUsername() {
        return this.requestedBy.username;
    }
}