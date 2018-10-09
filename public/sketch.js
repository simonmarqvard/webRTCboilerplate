let socket = io();

window.addEventListener('load', initialize())



function initialize() {


  //what info do we want from camera
  let constraints = {
    audio: false,
    video: true
  };


  let video;

  //Prompt user for permission, get stream
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      video = document.querySelector(".thevideo")
      //attach stream to video object
      video.srcObject = stream
      //wait for stream to load enough to play
      video.onloadedmetadata = function(e) {
        video.play();
      }

    })
    .catch(function(err) {
      alert(err);
    })

}

socket.on('connect', () => {
  console.log("connected to server")
})

window.addEventListener('click', (e) => {
  socket.emit('data', {
    x: e.screenX,
    y: e.screenY
  })
})

socket.on('returnData', (message) => {
  console.log(message)
})


socket.on('disconnect', () => {
  console.log("user disconnected ")
})
