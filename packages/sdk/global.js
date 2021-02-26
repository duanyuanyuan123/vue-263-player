export const getParameter = name => {
  try {
    let result = location.search.match(
      new RegExp("[\\?\\&]" + name + "=([^\\&]+)", "i")
    );
    if (result && result.length && result.length > 1) {
      return decodeURIComponent(result[1].replace(/\+/g, " "));
    }
  } catch (e) {
    return "";
  }
  return "";
};

export const uuid = (len, radix) => {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join("");
};

/*设置全屏*/
export function fullScreen(element) {
  console.log(`全屏`);
  // var element = document.getElementById(`${element}`);
  var element = document.body;
  if (element.requestFullscreen) {
      element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
  }
}
/*退出全屏*/
export async function exitFullscreen() {
  console.log(`退出全屏`);
  if (document.exitFullscreen) {
        return new Promise((resolve,reject)=>{
             document.exitFullscreen()
              .then(() => console.log("Document Exited form Full screen mode"))
            .catch((err) => { reject()
              })
         })
    
  } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  }
}
/*判断是否全屏*/
export  function checkFull() {
  var isFull = document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement;
//  document.fullScreen ||  window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled || document.mozIsFullScreen;
// if(isChrome()){
  //     if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
  //         isFull = true
  //     } else {
  //         isFull = false
  //     }
  // }else{
  //     if (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width) {
  //         isFull = true
  //     } else {
  //         isFull = false
  //     }
  // }
  console.log(isFull);
  if (isFull === undefined || isFull == null) {
    console.log('非全屏状态')
    isFull = false;
  }else{
    isFull = true;
  }
  return isFull;
}