const getMediaID_url = "https://graph.facebook.com/";
const getMediaID_ID = "lardigfotografera"
const getMediaData_fields = "/feed?fields=id,attachments,actions" 
const apiAccessToken = "&access_token=EAAJZAz3fh9SgBAJIIIqZBHoUl5zc88AryTWhM6s3oaW1PYYiG7eG36n59SpZBGvhojvZAGZAgPMBRTxaXh11uUyrDaLBEbrRmpr2zsqZC1c9MwMEZCUIT7TZAF21BmofhTprxXoNBBDVbTjMUvExQRejuOXpZBIb5SSlZCZA0tnEs1iCAZDZD"

window.onload = function sendRequest() {
	let url = `${getMediaID_url}${getMediaID_ID}${getMediaData_fields}${apiAccessToken}`;
	//console.log(url)
	fetch(url)
	.then(response => {
		console.log(response)
		if (response.status === 200 && response.ok === true) {
			console.log('FETCH URL, STATUS 200, ALLT OK!')
		} else {
			console.log('KOLLA apiAccessToken')
		}
		
		return response.json();
	})
	.then(data => {
		// console.log('DATA: ', data);
		let idCount = 0;
		let ourFBphotoList = [];
		let targetDiv = document.getElementById("fbPinkPosts");
		targetDiv.innerHTML = '';
		let count = 1;
		let limit = 5;

		data.data.forEach(post => {
			// console.log('POST: ', post)
			// attachments.data[0].media.image.src 
			// attachments.data[0].type
			
			if ( post.attachments.data[0].type === "photo" && count <= limit ) {
				count++
				idCount++
				// console.log('WE HAVE A Photo!')
				// console.log('Fetching ID[' + idCount + '] form FACEBOOK: ', post.id,);
				// console.log('Type: ', post.type);
				// console.log('Name: ', post.attachments.data[0].description);
				ourFBphotoList.push(post.attachments.data[0].description);
				// console.log('Caption: ', post.caption);
				// console.log('Created: ', post.created_time);
				// console.log('Full picture: ', post.full_picture);
				// console.log('Permalink: ', post.permalink_url);
				// console.log('Message: ', post.message);
				// console.log('Message Tags: ', post.message_tags);
				// console.log('With Tags: ', post.with_tags);
				// console.log('-------------------------------');
				

				let	divCreate = document.createElement("div");
				divCreate.id = "fbPinkPostID"+idCount;
				divCreate.className = "fbPinkPostDiv";       
				
				let mediaElementIMG = document.createElement('img');
				mediaElementIMG.src = post.attachments.data[0].media.image.src;
				mediaElementIMG.id = "fbPinkPostImg"+idCount;
				mediaElementIMG.className = "fbPinkPostImg";

				let paraName  = document.createElement("p");
				paraName.className = "fbPinkPostName";
				paraName.innerHTML = post.attachments.data[0].description;
				if ( paraName.innerHTML === "undefined" ) {
					paraName.innerHTML = ""; // tar bort undefined från titel
				}


				// document.getElementById här nedan är det som sätter ordningen i HTML / DOM träd.
				document.getElementById("fbPinkPosts").appendChild(divCreate); 
				document.getElementById("fbPinkPostID"+idCount).appendChild(mediaElementIMG); 
				document.getElementById("fbPinkPostID"+idCount).appendChild(paraName);

			} else {
				return;
			}
		})
		
		console.log('THIS IS THE ID COUNT FROM sendRequest', idCount);
		console.log('All media ID has arrived now!');
		console.log(ourFBphotoList)
		console.log(limit)
	})
	
}