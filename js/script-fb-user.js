const getMediaID_url = "https://graph.facebook.com/";
const getMediaID_ID = "3361209413916801"
const getMediaData_fields = "?fields=id,name,posts{id,type,name,caption,created_time,full_picture,permalink_url,message,message_tags,with_tags}"
const apiAccessToken = "&access_token=EAAJZAz3fh9SgBAOijGB39ZA0bIAqeQ1ZCV18fu1oZBCWMyWEEyNnr3v9TUPzTgfFgLSZCD3yVL3DTwAxAgAQUIxZA4qpr2n6waSlMY42feNki4RuZAVZBnXMiuu1zXeGNC00rtdga6C6QT9ljY8fmHrzRZAF8dtxVl4vnpQsD8qvp1gZDZD"

window.onload = function sendRequest() {
	let url = `${getMediaID_url}${getMediaID_ID}${getMediaData_fields}${apiAccessToken}`;
	//console.log(url)
	fetch(url)
	.then(response => {
		console.log(response)
		return response.json();
	})
	.then(data => {
        console.log(data);
		let idCount = 0;
		let ourFBphotoList = [];
		let targetDiv = document.getElementById("fbPinkPosts");
        targetDiv.innerHTML = '';
        let count = 1;
        let limit = 3;

		data.posts.data.forEach(post => {
			if (post.type === "photo" && count <= limit) {
                count++
                idCount++
                console.log('WE HAVE A Photo!')
                console.log('Fetching ID[' + idCount + '] form FACEBOOK: ', post.id,);
                console.log('Type: ', post.type);
                console.log('Name: ', post.name);
                ourFBphotoList.push(post.name);
                console.log('Caption: ', post.caption);
                console.log('Created: ', post.created_time);
                console.log('Full picture: ', post.full_picture);
                console.log('Permalink: ', post.permalink_url);
                console.log('Message: ', post.message);
                console.log('Message Tags: ', post.message_tags);
                console.log('With Tags: ', post.with_tags);
                console.log('-------------------------------');

                let	divCreate = document.createElement("div");
                divCreate.id = "fbPinkPostID"+idCount;
                divCreate.className = "fbPinkPostDiv";       
                
                let mediaElementIMG = document.createElement('img');
                mediaElementIMG.src = post.full_picture;
                mediaElementIMG.id = "fbPinkPostImg"+idCount;
                mediaElementIMG.className = "fbPinkPostImg";

                let paraName  = document.createElement("p");
                paraName.className = "fbPinkPostName";
                paraName.innerHTML = post.name;

                let paraCreated  = document.createElement("p");
                paraCreated.className = "fbPinkPostCreated";
                let created = post.created_time;
                let createdDate = created.slice(0,10);
                let createdTime = created.slice(11,19);
                paraCreated.innerHTML = createdDate + ' ' +createdTime;

                // document.getElementById här nedan är det som sätter ordningen i HTML / DOM träd.
                document.getElementById("fbPinkPosts").appendChild(divCreate); 
                document.getElementById("fbPinkPostID"+idCount).appendChild(mediaElementIMG); 
                document.getElementById("fbPinkPostID"+idCount).appendChild(paraName);
                document.getElementById("fbPinkPostID"+idCount).appendChild(paraCreated); 
                // document.getElementById("fbPinkPostID"+idCount).appendChild(likeNshare); 

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