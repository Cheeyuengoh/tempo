module.exports = class Music {
    constructor({url, title, duration, requestedBy}) {
        this.url = url;
        this.title = title;
        this.duration = duration;
        this.requestedBy = requestedBy;
    }
}