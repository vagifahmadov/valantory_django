// timer
function back_page(){
    window.location.href="/"
}
var seconds = 0;
function countdown() {
  seconds = 29;
  tick();
}
var countTimeOut;
function tick() {
  var counter = document.getElementById("countdown");
  seconds--;
  counter.innerHTML ="0:" + (seconds < 10 ? "0" : "") + String(seconds);
  if (seconds > 0) {
    countTimeOut = setTimeout(tick, 1000);
    if (seconds < 10){
        counter.classList.add("blink_timeout");
        counter.style.color = '#ce4975';
    }else{
        counter.classList.remove("blink_timeout");
        counter.style.color = '#042B8C';
    }
    // console.log(`time is:`+seconds);
  } else {
    document.getElementById("countdown").innerHTML = "0:00";
    back_page();
  }
}

countdown();

function getLocalIP(callback) {
    const pc = new RTCPeerConnection({iceServers: []});
    pc.createDataChannel("");
    
    pc.onicecandidate = (event) => {
        if (!event.candidate) {
            return;
        }
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
        const ipMatch = ipRegex.exec(event.candidate.candidate);
        if (ipMatch) {
            callback(ipMatch[1]);
            pc.close();
        }
    };
    
    pc.createOffer()
    .then(offer => pc.setLocalDescription(offer))
    .catch(err => console.error("Error creating offer:", err));
}

function stopStream(stream, video){
    video.srcObject = null;
    stream.getTracks().forEach(track => track.stop());
}

function startStream(stream, video){
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    stream_g = stream;
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    // CAMERA ERROR
                    $(".snapshot").hide();
                    Swal.fire({
                        icon: "error",
                        title: "Xəta!",
                        text: "Kamera qoşulmayıb?",
                        footer: '<h7 class="small_text">Kameranın qoşulmasından, kameranın başqa səhifə və tətbiqdə açıq qalmaması və ya kameraya icazənin verilməsindən əmin olun.</h7>'
                        }
                    ).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            back_page();
                        } else if(result.dismiss === Swal.DismissReason.cancel){
                            console.log("canceled in");
                        }
                    }
                );
            }
        );
    }
}

function capture() {        
  var canvas = document.getElementById('canvas');     
  var video = document.getElementById('video');
  canvas.width = 550;
  canvas.height = 500;
  canvas.getContext('2d').drawImage(video, 0, 0, 550,500);  
  resultb64=canvas.toDataURL();
  // document.getElementById("printresult").innerHTML = canvas.toDataURL();
  capture_img(resultb64);
}
// document.getElementById("printresult").innerHTML = resultb64;

// request pin
function send_img_pin(img, pin){
  // service api
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/pin", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken")); // For Django CSRF protection
  xhr.onload = function () {
      console.log("Loading...");
      // $(".bg_progress").show();
      // $(".progress_ex").show();
      loading_mode_on();
  };
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // check PIN
          Swal.fire({
              customClass: {
                  confirmButton: 'btn btn-primary'
              },
              title: "Təsdiq edildi!",
              text: "Girisiniz cixisiniz FIN-le qeyde alindi",
              icon: "success"
          }).then(()=>{
              // $(".bg_progress").hide();
              // $(".progress_ex").hide();
              loading_mode_off();
              back_page();
          });
          // check PIN
      }
      video;
  };
  const data = JSON.stringify({
      b64img: img,
      ip: ip_addr,
      pin: pin
  });
  
  xhr.send(data);
}

// Helper function to get CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
          cookie = cookie.trim();
          if (cookie.startsWith(name + '=')) {
              cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

// request capture
function capture_img(img){
  // service api
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/capture", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken")); // For Django CSRF protection
  xhr.onload = function () {
      console.log("Loading...");
      // $(".bg_progress").show();
      // $(".progress_ex").show();
      loading_mode_on();
  };
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // $(".bg_progress").hide();
          // $(".progress_ex").hide();
          loading_mode_off();
          // start alert swift double alert
          const swalWithBootstrapButtons = Swal.mixin({
              buttonsStyling: true
              });
              swalWithBootstrapButtons.fire({
                  // customClass: {
                  //     confirmButton: "btn btn-success",
                  //     cancelButton: "btn btn-danger"
                  // },
                  title: "Məmmədqulu",
                  text: "Əgər şəkildəki sizsinizsə təsdiqləyin.",
                  icon: "warning",
                  showCancelButton: true,
                  showDenyButton: true,
                  confirmButtonText: "Bəli bu mənəm",
                  cancelButtonText: "Yenidən cəhd",
                  denyButtonText: "FIN ilə qeydiyyat",
                  customClass: {
                      cancelButton: 'btn btn-danger',
                      confirmButton: 'btn btn-success',
                      denyButton: 'btn btn-primary'
                  },
                  reverseButtons: true
              }).then((result) => {    
              if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire({
                      customClass: {
                          confirmButton: 'btn btn-primary'
                      },
                      title: "Təsdiq edildi!",
                      text: "Girisiniz cixisiniz qeyde alindi",
                      icon: "success"
                  }).then(()=>{
                      // $(".bg_progress").hide();
                      // $(".progress_ex").hide();
                      loading_mode_off();
                      back_page();
                  });
              } else if (result.dismiss === Swal.DismissReason.deny){
                  // var video = document.querySelector("#video");
                  stopStream(stream_g, video);
                  console.log(Swal.DismissReason, result);
                  swalWithBootstrapButtons.fire({
                      showConfirmButton: true,
                      confirmButtonText: "Təsdiq et",
                      showCancelButton: true,
                      cancelButtonText: "Bağla",
                      customClass: {
                          confirmButton: 'btn btn-primary',
                      },
                      title: "FİN ilə qeydiyyat",
                      text: "FİN-i daxil edin.",
                      width: "800px",
                      input: "text",
                      inputAttributes: {
                          autocapitalize: "off",
                          maxlength: 7
                      },
                      inputValidator: (value) => {
                          if (!value || value.length < 7 ||  /[^a-zA-Z0-9\-\/]/.test( value )) {
                              return "FİN-i daxil edin (7 hərf-rəqəm simvolundan ibarətdir).";
                          }
                      },
                      inputPlaceholder: "FİN kod",
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      // height: "700px",
                      // icon: "question",
                      html: `<div class="content" id="pin_video">
                                  <center class="bg_video"> 
                                      <div id="container">
                                      <video width="550" height="500" autoplay="true" id="videoPin">
                                      </video>
                                      </div>
                                      <canvas id="canvas" style="overflow:auto"></canvas>
                                  </center>
                              </div>`
                  }).then((result)=>{
                      if(result.isConfirmed){
                          // checkif submited
                          var pin = $("#swal2-input").val();
                          console.log("OMG!! ur pin is: "+pin);
                          send_img_pin(img, pin);
                          // checkif submited
                      }else if (result.isDismissed){
                          // if clicked close
                          console.log("away!!");
                          // $(".bg_progress").hide();
                          // $(".progress_ex").hide();
                          loading_mode_off();
                          startStream(stream_g, video);
                          seconds=29
                          countdown();
                      }
                  });
                  var video_pin = document.querySelector("#videoPin");
                  startStream(stream_g, video_pin);
              }else if(result){
                  // if tryed again
                  // $(".bg_progress").hide();
                  // $(".progress_ex").hide();
                  loading_mode_off();
                  // console.log("remaning secound:"+seconds);
                  seconds = 29;
                  countdown();
                  // console.log("remaning secound:"+seconds);
              }
              }
          );
          
      }
      video;
  };
  const data = JSON.stringify({
      b64img: img,
      ip: ip_addr
  });
  
  xhr.send(data);
};

function stopCountdown() {
  clearTimeout(countTimeOut);
  console.log("Countdown stopped.");
}


function loading_mode_off(){
  $(".bg_progress").hide();
  $(".progress_ex").hide();
  $("#countdown").show();
  // countdown();
  console.log("loading mode OFF");
}

function loading_mode_on(){
  $(".bg_progress").show();
  $(".progress_ex").show();
  $("#countdown").hide();
  stopCountdown();
  console.log("loading mode ON");
}