module.exports = class Music {
    constructor({ type, providedURL, resourceURL, title, duration, requestedBy }) {
        this.type = type;
        this.providedURL = providedURL;
        this.resourceURL = resourceURL;
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