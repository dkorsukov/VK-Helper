window.addEventListener("load", () => {
	/* FOR TEXT CROSSING OUT */
	window.addEventListener("keydown", (evt) => {
		if (evt.ctrlKey && evt.altKey && evt.code === "BracketRight") {
			let focusedNode = document.getSelection().focusNode;

			if ( focusedNode.nodeType === 3 && focusedNode.parentNode.classList.contains("im-chat-input--text") ) {
				let selectedText = window.getSelection().toString();

				if ( selectedText.trim() ) {
					let crossedText = "&#0822;" + selectedText.split("").join("&#0822;") + "&#0822;",
							vkTextInput = focusedNode.parentNode;
							
					vkTextInput.textContent = vkTextInput.textContent.replace(selectedText, crossedText);
				}	
			}	
		}
	});
	
	/* FOR DOWNLOADING LAST OPENED IMAGE */
	window.addEventListener("keydown", (evt) => {
		if (evt.ctrlKey && evt.altKey && evt.code === "Quote") {
			let imageLayer = document.querySelector("#layer"),
					openedImage = imageLayer.querySelector("img");

			if (imageLayer && openedImage) {
				let request = new XMLHttpRequest();
				request.open("GET", openedImage.src, true);
				request.responseType = "blob";

				request.addEventListener("readystatechange", () => {
					if (request.readyState === 4) {
						if (request.status === 200) {
							let a = document.createElement("a");
							a.download = openedImage.src.split("/").reverse()[0];
							
							let blobURL = URL.createObjectURL(request.response);

							a.href = blobURL;
							a.dispatchEvent( new MouseEvent("click") );

							URL.revokeObjectURL(blobURL);
						}
					}
				});

				request.send();
			}		
		}
	});
});	