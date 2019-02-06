#!/usr/bin/env node

if (!process.env.LYRICVIEW_API_KEY) {
    console.error("Please specify environment variable LYRICVIEW_API_KEY which is a Genius API Client Access Token.\nYou can get one from https://genius.com/api-clients");
    process.exit(1);
}

var lyricist = new (require('lyricist'))(process.env.LYRICVIEW_API_KEY);
var genius = new (require('genius-api'))(process.env.LYRICVIEW_API_KEY);

var track = process.argv.slice(2).join(" ");
if (track.length == 0) {
    console.log("Usage: lyricview <search terms>");
    process.exit();
}

genius.search(track).then(res => {
    lyricist.song(res.hits[0].result.id, {fetchLyrics: true}).then(res => {
        console.log("Showing lyrics of " + res.title + " by " + res.primary_artist.name + ":\n\n" + res.lyrics);
    })
})