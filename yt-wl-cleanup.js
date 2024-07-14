// Execute script in devtools console on youtube.com/playlist?list=WL
// Watch Later page loads 100 videos by default
// Script stops at last rendered video
// Scroll down to load more before executing

var counter = 0;
var refreshId = setInterval(function remove() {
    // Channels to be removed from Watch Later
	// NOTE: must be exact match, check for leading/trailing whitespace
	let channelsToRemove = ['penguinz0', 'Cr1tiKaL Stream ', 'Philip DeFranco'];
	console.log(counter);
	if(counter >= document.getElementsByTagName('ytd-playlist-video-renderer').length) {
		console.log("Reached end of rendered videos on page");
		clearInterval(refreshId);
	}
	let video = document.getElementsByTagName('ytd-playlist-video-renderer')[counter];
	let channelname = video
		.querySelector('#channel-name')
		.querySelector(".ytd-channel-name")
		.querySelector(".ytd-channel-name")
		.querySelector(".ytd-channel-name")
		.title;
	if(channelname == null || channelname == undefined){
		console.error("channelname undefined for video at index " + counter);
		counter++;
		clearInterval(refreshId);
	}

	if(channelsToRemove.indexOf(channelname) >= 0){
		// Open action menu for video
		video.querySelector('#primary button[aria-label="Action menu"]').click();

		var things = document.evaluate(
			'//span[contains(text(),"Remove from")]',
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
		for (var i = 0; i < things.snapshotLength; i++) 
		{
			things.snapshotItem(i).click();
		}
		console.log("removed " + video.querySelector('#video-title').innerText + " from " + channelname);
	} else {
		// channelname not part of the list
		console.log("not removed");
		counter++;
	}
}, 500);
