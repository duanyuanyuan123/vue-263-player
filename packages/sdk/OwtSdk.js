// Copyright (C) <2018> Intel Corporation

const sdkVersion = '4.1';
function isFirefox() {
  return window.navigator.userAgent.match("Firefox") !== null;
}
function isChrome() {
  return window.navigator.userAgent.match('Chrome') !== null;
}
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
}
function isEdge() {
  return window.navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) !== null;
}
function createUuid() {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
} // Returns system information.
// Format: {sdk:{version:**, type:**}, runtime:{version:**, name:**}, os:{version:**, name:**}};

function sysInfo() {
  var info = Object.create({});
  info.sdk = {
    version: sdkVersion,
    type: 'JavaScript'
  }; // Runtime info.

  var userAgent = navigator.userAgent;
  var firefoxRegex = /Firefox\/([0-9\.]+)/;
  var chromeRegex = /Chrome\/([0-9\.]+)/;
  var edgeRegex = /Edge\/([0-9\.]+)/;
  var safariVersionRegex = /Version\/([0-9\.]+) Safari/;
  var result = chromeRegex.exec(userAgent);

  if (result) {
    info.runtime = {
      name: 'Chrome',
      version: result[1]
    };
  } else if (result = firefoxRegex.exec(userAgent)) {
    info.runtime = {
      name: 'Firefox',
      version: result[1]
    };
  } else if (result = edgeRegex.exec(userAgent)) {
    info.runtime = {
      name: 'Edge',
      version: result[1]
    };
  } else if (isSafari()) {
    result = safariVersionRegex.exec(userAgent);
    info.runtime = {
      name: 'Safari'
    };
    info.runtime.version = result ? result[1] : 'Unknown';
  } else {
    info.runtime = {
      name: 'Unknown',
      version: 'Unknown'
    };
  } // OS info.


  var windowsRegex = /Windows NT ([0-9\.]+)/;
  var macRegex = /Intel Mac OS X ([0-9_\.]+)/;
  var iPhoneRegex = /iPhone OS ([0-9_\.]+)/;
  var linuxRegex = /X11; Linux/;
  var androidRegex = /Android( ([0-9\.]+))?/;
  var chromiumOsRegex = /CrOS/;

  if (result = windowsRegex.exec(userAgent)) {
    info.os = {
      name: 'Windows NT',
      version: result[1]
    };
  } else if (result = macRegex.exec(userAgent)) {
    info.os = {
      name: 'Mac OS X',
      version: result[1].replace(/_/g, '.')
    };
  } else if (result = iPhoneRegex.exec(userAgent)) {
    info.os = {
      name: 'iPhone OS',
      version: result[1].replace(/_/g, '.')
    };
  } else if (result = linuxRegex.exec(userAgent)) {
    info.os = {
      name: 'Linux',
      version: 'Unknown'
    };
  } else if (result = androidRegex.exec(userAgent)) {
    info.os = {
      name: 'Android',
      version: result[1] || 'Unknown'
    };
  } else if (result = chromiumOsRegex.exec(userAgent)) {
    info.os = {
      name: 'Chrome OS',
      version: 'Unknown'
    };
  } else {
    info.os = {
      name: 'Unknown',
      version: 'Unknown'
    };
  }

  info.capabilities = {
    continualIceGathering: false,
    unifiedPlan: false,
    streamRemovable: info.runtime.name !== 'Firefox'
  };
  return info;
}

// MIT License
//
// Copyright (c) 2012 Universidad Politécnica de Madrid
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
// This file is borrowed from lynckia/licode with some modifications.

/*global console*/

/*
 * API to write logs based on traditional logging mechanisms: debug, trace, info, warning, error
 */
var Logger = function () {

  var DEBUG = 0,
      TRACE = 1,
      INFO = 2,
      WARNING = 3,
      ERROR = 4,
      NONE = 5;

  var noOp = function () {}; // |that| is the object to be returned.


  var that = {
    DEBUG: DEBUG,
    TRACE: TRACE,
    INFO: INFO,
    WARNING: WARNING,
    ERROR: ERROR,
    NONE: NONE
  };
  that.log = window.console.log.bind(window.console);

  var bindType = function (type) {
    if (typeof window.console[type] === 'function') {
      return window.console[type].bind(window.console);
    } else {
      return window.console.log.bind(window.console);
    }
  };

  var setLogLevel = function (level) {
    if (level <= DEBUG) {
      that.debug = bindType('log');
    } else {
      that.debug = noOp;
    }

    if (level <= TRACE) {
      that.trace = bindType('trace');
    } else {
      that.trace = noOp;
    }

    if (level <= INFO) {
      that.info = bindType('info');
    } else {
      that.info = noOp;
    }

    if (level <= WARNING) {
      that.warning = bindType('warn');
    } else {
      that.warning = noOp;
    }

    if (level <= ERROR) {
      that.error = bindType('error');
    } else {
      that.error = noOp;
    }
  };

  setLogLevel(DEBUG); // Default level is debug.

  that.setLogLevel = setLogLevel;
  return that;
}();

// Copyright (C) <2018> Intel Corporation
/**
 * Source info about an audio track. Values: 'mic', 'screen-cast', 'file', 'mixed'.
 * @memberOf Oms.Base
 * @readonly
 * @enum {string}
 */

const AudioSourceInfo = {
  MIC: 'mic',
  SCREENCAST: 'screen-cast',
  FILE: 'file',
  MIXED: 'mixed'
};
/**
 * Source info about a video track. Values: 'camera', 'screen-cast', 'file', 'mixed'.
 * @memberOf Oms.Base
 * @readonly
 * @enum {string}
 */

const VideoSourceInfo = {
  CAMERA: 'camera',
  SCREENCAST: 'screen-cast',
  FILE: 'file',
  MIXED: 'mixed'
};
/**
 * Kind of a track. Values: 'audio' for audio track, 'video' for video track, 'av' for both audio and video tracks.
 * @memberOf Oms.Base
 * @readonly
 * @enum {string}
 */

const TrackKind = {
  /**
   * Audio tracks.
   * @type string
   */
  AUDIO: 'audio',

  /**
   * Video tracks.
   * @type string
   */
  VIDEO: 'video',

  /**
   * Both audio and video tracks.
   * @type string
   */
  AUDIO_AND_VIDEO: 'av'
};
/**
 * @class Resolution
 * @memberOf Oms.Base
 * @classDesc The Resolution defines the size of a rectangle.
 * @constructor
 * @param {number} width
 * @param {number} height
 */

class Resolution {
  constructor(width, height) {
    /**
     * @member {number} width
     * @instance
     * @memberof Oms.Base.Resolution
     */
    this.width = width;
    /**
     * @member {number} height
     * @instance
     * @memberof Oms.Base.Resolution
     */

    this.height = height;
  }

}

// Copyright (C) <2018> Intel Corporation
/**
 * @class AudioTrackConstraints
 * @classDesc Constraints for creating an audio MediaStreamTrack.
 * @memberof Oms.Base
 * @constructor
 * @param {Oms.Base.AudioSourceInfo} source Source info of this audio track.
 */

class AudioTrackConstraints {
  constructor(source) {
    if (!Object.values(AudioSourceInfo).some(v => v === source)) {
      throw new TypeError('Invalid source.');
    }
    /**
     * @member {string} source
     * @memberof Oms.Base.AudioTrackConstraints
     * @desc Values could be "mic", "screen-cast", "file" or "mixed".
     * @instance
     */


    this.source = source;
    /**
     * @member {string} deviceId
     * @memberof Oms.Base.AudioTrackConstraints
     * @desc Do not provide deviceId if source is not "mic".
     * @instance
     * @see https://w3c.github.io/mediacapture-main/#def-constraint-deviceId
     */

    this.deviceId = undefined;
  }

}
/**
 * @class VideoTrackConstraints
 * @classDesc Constraints for creating a video MediaStreamTrack.
 * @memberof Oms.Base
 * @constructor
 * @param {Oms.Base.VideoSourceInfo} source Source info of this video track.
 */

class VideoTrackConstraints {
  constructor(source) {
    if (!Object.values(VideoSourceInfo).some(v => v === source)) {
      throw new TypeError('Invalid source.');
    }
    /**
     * @member {string} source
     * @memberof Oms.Base.VideoTrackConstraints
     * @desc Values could be "camera", "screen-cast", "file" or "mixed".
     * @instance
     */


    this.source = source;
    /**
     * @member {string} deviceId
     * @memberof Oms.Base.VideoTrackConstraints
     * @desc Do not provide deviceId if source is not "camera".
     * @instance
     * @see https://w3c.github.io/mediacapture-main/#def-constraint-deviceId
     */

    this.deviceId = undefined;
    /**
     * @member {Oms.Base.Resolution} resolution
     * @memberof Oms.Base.VideoTrackConstraints
     * @instance
     */

    this.resolution = undefined;
    /**
     * @member {number} frameRate
     * @memberof Oms.Base.VideoTrackConstraints
     * @instance
     */

    this.frameRate = undefined;
  }

}
/**
 * @class StreamConstraints
 * @classDesc Constraints for creating a MediaStream from screen mic and camera.
 * @memberof Oms.Base
 * @constructor
 * @param {?Oms.Base.AudioTrackConstraints} audioConstraints
 * @param {?Oms.Base.VideoTrackConstraints} videoConstraints
 * @param {?string} extensionId The ID of Chrome screen sharing extension.
 */

class StreamConstraints {
  constructor(audioConstraints = false, videoConstraints = false) {
    /**
     * @member {Oms.Base.MediaStreamTrackDeviceConstraintsForAudio} audio
     * @memberof Oms.Base.MediaStreamDeviceConstraints
     * @instance
     */
    this.audio = audioConstraints;
    /**
     * @member {Oms.Base.MediaStreamTrackDeviceConstraintsForVideo} Video
     * @memberof Oms.Base.MediaStreamDeviceConstraints
     * @instance
     */

    this.video = videoConstraints;
    /**
     * @member {string} extensionId
     * @memberof Oms.Base.MediaStreamDeviceConstraints
     * @desc The ID of Chrome Extension for screen sharing.
     * @instance
     */
  }

}

function isVideoConstrainsForScreenCast(constraints) {
  return typeof constraints.video === 'object' && constraints.video.source === VideoSourceInfo.SCREENCAST;
}
/**
 * @class MediaStreamFactory
 * @classDesc A factory to create MediaStream. You can also create MediaStream by yourself.
 * @memberof Oms.Base
 */


class MediaStreamFactory {
  /**
   * @function createMediaStream
   * @static
   * @desc Create a MediaStream with given constraints. If you want to create a MediaStream for screen cast, please make sure both audio and video's source are "screen-cast".
   * @memberof Oms.Base.MediaStreamFactory
   * @returns {Promise<MediaStream, Error>} Return a promise that is resolved when stream is successfully created, or rejected if one of the following error happened:
   * - One or more parameters cannot be satisfied.
   * - Specified device is busy.
   * - Cannot obtain necessary permission or operation is canceled by user.
   * - Video source is screen cast, while audio source is not.
   * - Audio source is screen cast, while video source is disabled.
   * @param {Oms.Base.StreamConstraints} constraints
   */
  static createMediaStream(constraints) {
    if (typeof constraints !== 'object' || !constraints.audio && !constraints.video) {
      return Promise.reject(new TypeError('Invalid constrains'));
    }

    if (!isVideoConstrainsForScreenCast(constraints) && typeof constraints.audio === 'object' && constraints.audio.source === AudioSourceInfo.SCREENCAST) {
      return Promise.reject(new TypeError('Cannot share screen without video.'));
    }

    if (isVideoConstrainsForScreenCast(constraints) && !isChrome() && !isFirefox()) {
      return Promise.reject(new TypeError('Screen sharing only supports Chrome and Firefox.'));
    }

    if (isVideoConstrainsForScreenCast(constraints) && typeof constraints.audio === 'object' && constraints.audio.source !== AudioSourceInfo.SCREENCAST) {
      return Promise.reject(new TypeError('Cannot capture video from screen cast while capture audio from' + ' other source.'));
    } // Check and convert constraints.


    if (!constraints.audio && !constraints.video) {
      return Promise.reject(new TypeError('At least one of audio and video must be requested.'));
    }

    const mediaConstraints = Object.create({});

    if (typeof constraints.audio === 'object' && constraints.audio.source === AudioSourceInfo.MIC) {
      mediaConstraints.audio = Object.create({});

      if (isEdge()) {
        mediaConstraints.audio.deviceId = constraints.audio.deviceId;
      } else {
        mediaConstraints.audio.deviceId = {
          exact: constraints.audio.deviceId
        };
      }
    } else {
      if (constraints.audio.source === AudioSourceInfo.SCREENCAST) {
        mediaConstraints.audio = true;
      } else {
        mediaConstraints.audio = constraints.audio;
      }
    }

    if (typeof constraints.video === 'object') {
      mediaConstraints.video = Object.create({});

      if (typeof constraints.video.frameRate === 'number') {
        mediaConstraints.video.frameRate = constraints.video.frameRate;
      }

      if (constraints.video.resolution && constraints.video.resolution.width && constraints.video.resolution.height) {
        if (constraints.video.source === VideoSourceInfo.SCREENCAST) {
          mediaConstraints.video.width = constraints.video.resolution.width;
          mediaConstraints.video.height = constraints.video.resolution.height;
        } else {
          mediaConstraints.video.width = Object.create({});
          mediaConstraints.video.width.exact = constraints.video.resolution.width;
          mediaConstraints.video.height = Object.create({});
          mediaConstraints.video.height.exact = constraints.video.resolution.height;
        }
      }

      if (typeof constraints.video.deviceId === 'string') {
        mediaConstraints.video.deviceId = {
          exact: constraints.video.deviceId
        };
      }

      if (isFirefox() && constraints.video.source === VideoSourceInfo.SCREENCAST) {
        mediaConstraints.video.mediaSource = 'screen';
      }
    } else {
      mediaConstraints.video = constraints.video;
    }

    if (isVideoConstrainsForScreenCast(constraints)) {
      // navigator.mediaDevices.getDisplayMedia(mediaConstraints).then()
      return navigator.mediaDevices.getDisplayMedia(mediaConstraints).then(stream => {
        return stream;
      }).catch(err => {
        return {
          code: 1,
          info: err
        };
      });
    } else {
      return navigator.mediaDevices.getUserMedia(mediaConstraints);
    } //     if (typeof constraints !== 'object' || (!constraints.audio && !
    //         constraints.video)) {
    //       return Promise.reject(new TypeError('Invalid constrains'));
    //     }
    //     if (!isVideoConstrainsForScreenCast(constraints) && (typeof constraints.audio ===
    //         'object') && constraints.audio.source === MediaFormatModule.AudioSourceInfo
    //       .SCREENCAST) {
    //       return Promise.reject(new TypeError('Cannot share screen without video.'));
    //     }
    //     if (isVideoConstrainsForScreenCast(constraints) && !utils.isChrome() && !utils
    //       .isFirefox()) {
    //       return Promise.reject(new TypeError(
    //         'Screen sharing only supports Chrome and Firefox.'));
    //     }
    //     if (isVideoConstrainsForScreenCast(constraints) && typeof constraints.audio ===
    //       'object' && constraints.audio.source !== MediaFormatModule.AudioSourceInfo
    //       .SCREENCAST) {
    //       return Promise.reject(new TypeError(
    //         'Cannot capture video  from screen cast while capture audio from other source.'
    //       ));
    //     };
    //     // Screen sharing on Chrome does not work with the latest constraints format.
    //     if (isVideoConstrainsForScreenCast(constraints) && utils.isChrome()) {
    //       if (!constraints.extensionId) {
    //         return Promise.reject(new TypeError(
    //           'Extension ID must be specified for screen sharing on Chrome.'));
    //       }
    //      // 'tab'
    //       const desktopCaptureSources = ['screen', 'window'];
    //       // if (constraints.audio) {
    //       //   desktopCaptureSources.push('audio');
    //       // }
    //       return new Promise((resolve, reject) => {
    //         chrome.runtime.sendMessage(constraints.extensionId, {
    //           getStream: desktopCaptureSources
    //         }, function(response) {
    //           console.log(response);
    //           if (response === undefined) {
    //             return reject(new Error(chrome.runtime.lastError.message));
    //           }
    //           if (constraints.audio && typeof response.options !==
    //             'object') {
    //             Logger.warning(
    //               'Desktop sharing with audio requires the latest Chrome extension. Your audio constraints will be ignored.'
    //             );
    //           }
    //           const mediaConstraints = Object.create({});
    //           if (constraints.audio && (typeof response.options ===
    //               'object')) {
    //             if (response.options.canRequestAudioTrack) {
    //               mediaConstraints.audio = {
    //                 mandatory: {
    //                   chromeMediaSource: 'desktop',
    //                   chromeMediaSourceId: response.streamId
    //                 }
    //               }
    //             } else {
    //               Logger.warning(
    //                 'Sharing screen with audio was not selected by user.'
    //               );
    //             }
    //           }
    //           mediaConstraints.video = Object.create({});
    //           mediaConstraints.video.mandatory = Object.create({});
    //           mediaConstraints.video.mandatory.chromeMediaSource =
    //             'desktop';
    //           mediaConstraints.video.mandatory.chromeMediaSourceId =
    //             response.streamId;
    //           // Transform new constraint format to the old style. Because chromeMediaSource only supported in the old style, and mix new and old style will result type error: "Cannot use both optional/mandatory and specific or advanced constraints.".
    //           if (constraints.video.resolution) {
    //             mediaConstraints.video.mandatory.maxHeight =
    //               mediaConstraints.video.mandatory.minHeight =
    //               constraints.video.resolution.height;
    //             mediaConstraints.video.mandatory.maxWidth =
    //               mediaConstraints.video.mandatory.minWidth =
    //               constraints.video.resolution.width;
    //           }
    //           if (constraints.video.frameRate) {
    //             mediaConstraints.video.mandatory.minFrameRate = constraints.video.frameRate;
    //             mediaConstraints.video.mandatory.maxFrameRate =
    //               constraints.video.frameRate;
    //           }
    //           resolve(navigator.mediaDevices.getUserMedia(
    //             mediaConstraints));
    //         });
    //       })
    //     } else {
    //       if (!constraints.audio && !constraints.video) {
    //         return Promise.reject(new TypeError(
    //           'At least one of audio and video must be requested.'));
    //       }
    //       const mediaConstraints = Object.create({});
    //       if (typeof constraints.audio === 'object' && constraints.audio.source ===
    //         MediaFormatModule.AudioSourceInfo.MIC) {
    //         mediaConstraints.audio = Object.create({});
    //         if (utils.isEdge()) {
    //           mediaConstraints.audio.deviceId = constraints.audio.deviceId;
    //         } else {
    //           mediaConstraints.audio.deviceId = {
    //             exact: constraints.audio.deviceId
    //           };
    //         }
    //       } else {
    //         mediaConstraints.audio = constraints.audio;
    //       }
    //       if (typeof constraints.audio === 'object' && constraints.audio.source ===
    //         MediaFormatModule.AudioSourceInfo.SCREENCAST) {
    //         Logger.warning(
    //           'Screen sharing with audio is not supported in Firefox.');
    //         mediaConstraints.audio = false;
    //       }
    //       if (typeof constraints.video === 'object') {
    //         mediaConstraints.video = Object.create({});
    //         if (typeof constraints.video.frameRate === 'number') {
    //           mediaConstraints.video.frameRate = constraints.video.frameRate;
    //         }
    //         if (constraints.video.resolution && constraints.video.resolution.width &&
    //           constraints.video.resolution.height) {
    //           mediaConstraints.video.width = Object.create({});
    //           mediaConstraints.video.width.exact = constraints.video.resolution.width;
    //           mediaConstraints.video.height = Object.create({});
    //           mediaConstraints.video.height.exact = constraints.video.resolution.height;
    //         }
    //         if (typeof constraints.video.deviceId === 'string') {
    //           mediaConstraints.video.deviceId = { exact: constraints.video.deviceId };
    //         }
    //         if (utils.isFirefox() && constraints.video.source ===
    //           MediaFormatModule.VideoSourceInfo.SCREENCAST) {
    //           mediaConstraints.video.mediaSource = 'screen';
    //         }
    //       } else {
    //         mediaConstraints.video = constraints.video;
    //       }
    //       return navigator.mediaDevices.getUserMedia(mediaConstraints);
    //     }

  }

}

// MIT License
/**
 * @class EventDispatcher
 * @classDesc A shim for EventTarget. Might be changed to EventTarget later.
 * @memberof Oms.Base
 * @hideconstructor
 */

const EventDispatcher = function () {
  // Private vars
  const spec = {};
  spec.dispatcher = {};
  spec.dispatcher.eventListeners = {};
  /**
   * @function addEventListener
   * @desc This function registers a callback function as a handler for the corresponding event. It's shortened form is on(eventType, listener). See the event description in the following table.<br>
   * @instance
   * @memberof Oms.Base.EventDispatcher
   * @param {string} eventType Event string.
   * @param {function} listener Callback function.
   */

  this.addEventListener = function (eventType, listener) {
    if (spec.dispatcher.eventListeners[eventType] === undefined) {
      spec.dispatcher.eventListeners[eventType] = [];
    }

    spec.dispatcher.eventListeners[eventType].push(listener);
  };
  /**
   * @function removeEventListener
   * @desc This function removes a registered event listener.
   * @instance
   * @memberof Oms.Base.EventDispatcher
   * @param {string} eventType Event string.
   * @param {function} listener Callback function.
   */


  this.removeEventListener = function (eventType, listener) {
    if (!spec.dispatcher.eventListeners[eventType]) {
      return;
    }

    var index = spec.dispatcher.eventListeners[eventType].indexOf(listener);

    if (index !== -1) {
      spec.dispatcher.eventListeners[eventType].splice(index, 1);
    }
  };
  /**
   * @function clearEventListener
   * @desc This function removes all event listeners for one type.
   * @instance
   * @memberof Oms.Base.EventDispatcher
   * @param {string} eventType Event string.
   */


  this.clearEventListener = function (eventType) {
    spec.dispatcher.eventListeners[eventType] = [];
  }; // It dispatch a new event to the event listeners, based on the type
  // of event. All events are intended to be LicodeEvents.


  this.dispatchEvent = function (event) {
    if (!spec.dispatcher.eventListeners[event.type]) {
      return;
    }

    spec.dispatcher.eventListeners[event.type].map(function (listener) {
      listener(event);
    });
  };
};
/**
 * @class OmsEvent
 * @classDesc Class OmsEvent represents a generic Event in the library.
 * @memberof Oms.Base
 * @hideconstructor
 */

class OmsEvent {
  constructor(type) {
    this.type = type;
  }

}
/**
 * @class MessageEvent
 * @classDesc Class MessageEvent represents a message Event in the library.
 * @memberof Oms.Base
 * @hideconstructor
 */

class MessageEvent extends OmsEvent {
  constructor(type, init) {
    super(type);
    /**
     * @member {string} origin
     * @instance
     * @memberof Oms.Base.MessageEvent
     * @desc ID of the remote endpoint who published this stream.
     */

    this.origin = init.origin;
    /**
     * @member {string} message
     * @instance
     * @memberof Oms.Base.MessageEvent
     */

    this.message = init.message;
    /**
     * @member {string} to
     * @instance
     * @memberof Oms.Base.MessageEvent
     * @desc Values could be "all", "me" in conference mode, or undefined in P2P mode..
     */

    this.to = init.to;
  }

}
/**
 * @class ErrorEvent
 * @classDesc Class ErrorEvent represents an error Event in the library.
 * @memberof Oms.Base
 * @hideconstructor
 */

class ErrorEvent extends OmsEvent {
  constructor(type, init) {
    super(type);
    /**
     * @member {Error} error
     * @instance
     * @memberof Oms.Base.ErrorEvent
     */

    this.error = init.error;
  }

}
/**
 * @class MuteEvent
 * @classDesc Class MuteEvent represents a mute or unmute event.
 * @memberof Oms.Base
 * @hideconstructor
 */

class MuteEvent extends OmsEvent {
  constructor(type, init) {
    super(type);
    /**
     * @member {Oms.Base.TrackKind} kind
     * @instance
     * @memberof Oms.Base.MuteEvent
     */

    this.kind = init.kind;
  }

}
/*v4.0修改：添加房间状态改变监听*/

/**
 * @class roomStatusEvent
 * @classDesc Class roomStatusEvent represents a inactive or active event.
 * @memberof Oms.Base
 * @hideconstructor
 */

class roomStatusEvent extends OmsEvent {
  constructor(type, init) {
    super(type);
    /**
     * @member {Oms.Base.TrackKind} kind
     * @instance
     * @memberof Oms.Base.MuteEvent
     */

    this.roomStatus = init.data;
  }

}
/**v4.0修改：添加被主持人请出会议监听exitRoomEvent**/

class exitRoomEvent extends OmsEvent {
  constructor(type, init) {
    super(type);
    /**
     * @member {Oms.Base.TrackKind} kind
     * @instance
     * @memberof Oms.Base.MuteEvent
     */

    this.origin = init.origin;
    this.participant = init.participant;
  }

}
/**v1.3修改：添加录制消息recordMsgEvent**/

class recordMsgEvent extends OmsEvent {
  constructor(type, data) {
    super(type);
    this.recordMsg = data;
  }

}
/**v4.0修改：添加ice状态改变监听**/

class iceStatusEvent extends OmsEvent {
  constructor(type, stauts) {
    super(type);
    this.iceStatus = stauts;
  }

}

// Copyright (C) <2018> Intel Corporation

function isAllowedValue(obj, allowedValues) {
  return allowedValues.some(ele => {
    return ele === obj;
  });
}
/*v4.0添加*/

/**
 * @class StreamStatusInfo
 * @memberOf Oms.Base
 * @classDesc Information of a stream's Status.
 * @constructor
 * @description Audio Status info or video Status info could be undefined if a stream does not have audio/video track.
 * @param {?string} audioSourceInfo Audio Status info. Accepted values are: "active", "inactive"
 * @param {?string} videoSourceInfo Video Status info. Accepted values are: "active", "inactive"
 */


class StreamStatusInfo {
  constructor(audioActive, videoActive) {
    //v4.0修改：存在没有音频和视频的状态
    if (audioActive) {
      if (!isAllowedValue(audioActive, ["active", "inactive"])) {
        throw new TypeError('Incorrect value for audioActive');
      }
    }

    if (videoActive) {
      if (!isAllowedValue(videoActive, ["active", "inactive"])) {
        throw new TypeError('Incorrect value for videoActive');
      }
    }

    this.audio = audioActive;
    this.video = videoActive;
  }

}
/**
 * @class StreamSourceInfo
 * @memberOf Oms.Base
 * @classDesc Information of a stream's source.
 * @constructor
 * @description Audio source info or video source info could be undefined if a stream does not have audio/video track.
 * @param {?string} audioSourceInfo Audio source info. Accepted values are: "mic", "screen-cast", "file", "mixed" or undefined.
 * @param {?string} videoSourceInfo Video source info. Accepted values are: "camera", "screen-cast", "file", "mixed" or undefined.
 */

class StreamSourceInfo {
  constructor(audioSourceInfo, videoSourceInfo) {
    if (!isAllowedValue(audioSourceInfo, [undefined, 'mic', 'screen-cast', 'file', 'mixed'])) {
      throw new TypeError('Incorrect value for audioSourceInfo');
    }

    if (!isAllowedValue(videoSourceInfo, [undefined, 'camera', 'screen-cast', 'file', 'encoded-file', 'raw-file', 'mixed'])) {
      throw new TypeError('Incorrect value for videoSourceInfo');
    }

    this.audio = audioSourceInfo;
    this.video = videoSourceInfo;
  }

}
/**
 * @class Stream
 * @memberOf Oms.Base
 * @classDesc Base class of streams.
 * @extends Oms.Base.EventDispatcher
 * @hideconstructor
 */

class Stream extends EventDispatcher {
  constructor(stream, sourceInfo, attributes, StreamStatusInfo, userInfo) {
    super();

    if (stream && !(stream instanceof MediaStream) || typeof sourceInfo !== 'object') {
      throw new TypeError('Invalid stream or sourceInfo.');
    }

    if (stream && (stream.getAudioTracks().length > 0 && !sourceInfo.audio || stream.getVideoTracks().length > 0 && !sourceInfo.video)) {
      throw new TypeError('Missing audio source info or video source info.');
    }
    /**
     * @member {?MediaStream} mediaStream
     * @instance
     * @memberof Oms.Base.Stream
     * @see {@link https://www.w3.org/TR/mediacapture-streams/#mediastream|MediaStream API of Media Capture and Streams}.
     */


    Object.defineProperty(this, 'mediaStream', {
      configurable: false,
      writable: true,
      value: stream
    });
    /**
     * @member {Oms.Base.StreamSourceInfo} source
     * @instance
     * @memberof Oms.Base.Stream
     * @desc Source info of a stream.
     */

    Object.defineProperty(this, 'source', {
      configurable: false,
      writable: false,
      value: sourceInfo
    });
    /**
     * @member {object} attributes
     * @instance
     * @memberof Oms.Base.Stream
     * @desc Custom attributes of a stream.
     */

    Object.defineProperty(this, 'attributes', {
      configurable: true,
      writable: false,
      value: attributes
    });
    /*v4.0添加*/

    Object.defineProperty(this, 'mediaStatus', {
      configurable: false,
      writable: false,
      value: StreamStatusInfo
    });
    /*v4.0添加*/

    Object.defineProperty(this, 'userInfo', {
      configurable: false,
      writable: false,
      value: userInfo
    });
  }

}
/**
 * @class LocalStream
 * @classDesc Stream captured from current endpoint.
 * @memberOf Oms.Base
 * @extends Oms.Base.Stream
 * @constructor
 * @param {MediaStream} stream Underlying MediaStream.
 * @param {Oms.Base.StreamSourceInfo} sourceInfo Information about stream's source.
 * @param {object} attributes Custom attributes of the stream.
 */

class LocalStream extends Stream {
  constructor(stream, sourceInfo, attributes) {
    if (!(stream instanceof MediaStream)) {
      throw new TypeError('Invalid stream.');
    }

    super(stream, sourceInfo, attributes);
    /**
     * @member {string} id
     * @instance
     * @memberof Oms.Base.LocalStream
     */

    Object.defineProperty(this, 'id', {
      configurable: false,
      writable: false,
      value: createUuid()
    });
  }

}
/**
 * @class RemoteStream
 * @classDesc Stream sent from a remote endpoint.
 * Events:
 *
 * | Event Name      | Argument Type    | Fired when         |
 * | ----------------| ---------------- | ------------------ |
 * | ended           | Event            | Stream is ended.   |
 * | updated         | Event            | Stream is updated. |
 *
 * @memberOf Oms.Base
 * @extends Oms.Base.Stream
 * @hideconstructor
 */

class RemoteStream extends Stream {
  constructor(id, origin, stream, sourceInfo, attributes, StreamStatusInfo, userInfo) {
    super(stream, sourceInfo, attributes, StreamStatusInfo, userInfo);
    /**
     * @member {string} id
     * @instance
     * @memberof Oms.Base.RemoteStream
     */

    /*v40修改了configurable和writable的值*/

    Object.defineProperty(this, 'id', {
      configurable: true,
      writable: true,
      value: id ? id : createUuid()
    });
    /**
     * @member {string} origin
     * @instance
     * @memberof Oms.Base.RemoteStream
     * @desc ID of the remote endpoint who published this stream.
     */

    Object.defineProperty(this, 'origin', {
      configurable: false,
      writable: false,
      value: origin
    });
    /**
     * @member {Oms.Base.PublicationSettings} settings
     * @instance
     * @memberof Oms.Base.RemoteStream
     * @desc Original settings for publishing this stream. This property is only valid in conference mode.
     */

    this.settings = undefined;
    /**
     * @member {Oms.Conference.SubscriptionCapabilities} capabilities
     * @instance
     * @memberof Oms.Base.RemoteStream
     * @desc Capabilities remote endpoint provides for subscription. This property is only valid in conference mode.
     */

    this.capabilities = undefined;
  }

}
/**
 * @class StreamEvent
 * @classDesc Event for Stream.
 * @extends Oms.Base.OmsEvent
 * @memberof Oms.Base
 * @hideconstructor
 */

class StreamEvent extends OmsEvent {
  constructor(type, init) {
    super(type);
    /**
     * @member {Oms.Base.Stream} stream
     * @instance
     * @memberof Oms.Base.StreamEvent
     */

    this.stream = init.stream;
  }

}
/*v4.0添加 音频状态改变***/

class StreamAudioEvent extends OmsEvent {
  constructor(type, init) {
    super(type);
    /**
     * @member {Oms.Base.Stream} stream
     * @instance
     * @memberof Oms.Base.StreamAudioEvent
     */

    this.info = init.info;
  }

}

// Copyright (C) <2018> Intel Corporation

var base = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AudioTrackConstraints: AudioTrackConstraints,
  VideoTrackConstraints: VideoTrackConstraints,
  StreamConstraints: StreamConstraints,
  MediaStreamFactory: MediaStreamFactory,
  StreamStatusInfo: StreamStatusInfo,
  StreamSourceInfo: StreamSourceInfo,
  Stream: Stream,
  LocalStream: LocalStream,
  RemoteStream: RemoteStream,
  StreamEvent: StreamEvent,
  StreamAudioEvent: StreamAudioEvent,
  AudioSourceInfo: AudioSourceInfo,
  VideoSourceInfo: VideoSourceInfo,
  TrackKind: TrackKind,
  Resolution: Resolution
});

// Copyright (C) <2018> Intel Corporation
/**
 * @class AudioPublicationSettings
 * @memberOf Oms.Base
 * @classDesc The audio settings of a publication.
 * @hideconstructor
 */

class AudioPublicationSettings {
  constructor(codec) {
    /**
     * @member {?Oms.Base.AudioCodecParameters} codec
     * @instance
     * @memberof Oms.Base.AudioPublicationSettings
     */
    this.codec = codec;
  }

}
/**
 * @class VideoPublicationSettings
 * @memberOf Oms.Base
 * @classDesc The video settings of a publication.
 * @hideconstructor
 */

class VideoPublicationSettings {
  constructor(codec, resolution, frameRate, bitrate, keyFrameInterval) {
    /**
     * @member {?Oms.Base.VideoCodecParameters} codec
     * @instance
     * @memberof Oms.Base.VideoPublicationSettings
     */
    this.codec = codec,
    /**
     * @member {?Oms.Base.Resolution} resolution
     * @instance
     * @memberof Oms.Base.VideoPublicationSettings
     */
    this.resolution = resolution;
    /**
     * @member {?number} frameRates
     * @instance
     * @memberof Oms.Base.VideoPublicationSettings
     */

    this.frameRate = frameRate;
    /**
     * @member {?number} bitrate
     * @instance
     * @memberof Oms.Base.VideoPublicationSettings
     */

    this.bitrate = bitrate;
    /**
     * @member {?number} keyFrameIntervals
     * @instance
     * @memberof Oms.Base.VideoPublicationSettings
     */

    this.keyFrameInterval = keyFrameInterval;
  }

}
/**
 * @class PublicationSettings
 * @memberOf Oms.Base
 * @classDesc The settings of a publication.
 * @hideconstructor
 */

class PublicationSettings {
  constructor(audio, video) {
    /**
     * @member {Oms.Base.AudioPublicationSettings} audio
     * @instance
     * @memberof Oms.Base.PublicationSettings
     */
    this.audio = audio;
    /**
     * @member {Oms.Base.VideoPublicationSettings} video
     * @instance
     * @memberof Oms.Base.PublicationSettings
     */

    this.video = video;
  }

}
/**
 * @class Publication
 * @memberOf Oms.Base
 * @classDesc Publication represents a sender for publishing a stream. It handles the actions on a LocalStream published to a conference.
 * Events:
 *
 * | Event Name      | Argument Type    | Fired when       |
 * | ----------------| ---------------- | ---------------- |
 * | ended           | Event            | Publication is ended. |
 * | mute            | MuteEvent        | Publication is muted. Client stopped sending audio and/or video data to remote endpoint. |
 * | unmute          | MuteEvent        | Publication is unmuted. Client continued sending audio and/or video data to remote endpoint. |
 *
 * @hideconstructor
 */

class Publication extends EventDispatcher {
  constructor(id, stop, getStats, mute, unmute, getSenders, addTrack) {
    super();
    /**
     * @member {string} id
     * @instance
     * @memberof Oms.Base.Publication
     */

    Object.defineProperty(this, 'id', {
      configurable: false,
      writable: false,
      value: id ? id : createUuid()
    });
    /**
     * @function stop
     * @instance
     * @desc Stop certain publication. Once a subscription is stopped, it cannot be recovered.
     * @memberof Oms.Base.Publication
     * @returns {undefined}
     */

    this.stop = stop;
    /**
     * @function getStats
     * @instance
     * @desc Get stats of underlying PeerConnection.
     * @memberof Oms.Base.Publication
     * @returns {Promise<RTCStatsReport, Error>}
     */

    this.getStats = getStats;
    /**
     * @function mute
     * @instance
     * @desc Stop sending data to remote endpoint.
     * @memberof Oms.Base.Publication
     * @param {Oms.Base.TrackKind } kind Kind of tracks to be muted.
     * @returns {Promise<undefined, Error>}
     */

    this.mute = mute;
    /**
     * @function unmute
     * @instance
     * @desc Continue sending data to remote endpoint.
     * @memberof Oms.Base.Publication
     * @param {Oms.Base.TrackKind } kind Kind of tracks to be unmuted.
     * @returns {Promise<undefined, Error>}
     */

    this.unmute = unmute; //v4.0修改

    /**
     * @function getSenders
     * @instance
     * @desc Continue sending data to remote endpoint.
     * @memberof Oms.Base.Publication
     * @param {Oms.Base.TrackKind } kind Kind of tracks to be unmuted.
     * @returns {Promise<undefined, Error>}
     */

    this.getSenders = getSenders; //v4.0修改

    /**
     * @function addTrack
     * @instance
     * @desc Continue sending data to remote endpoint.
     * @memberof Oms.Base.Publication
     * @param {Oms.Base.TrackKind } kind Kind of tracks to be unmuted.
     * @returns {Promise<undefined, Error>}
     */

    this.addTrack = addTrack;
  }

}

/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

function maybeSetOpusOptions(sdp, params) {
  // Set Opus in Stereo, if stereo is true, unset it, if stereo is false, and
  // do nothing if otherwise.
  if (params.opusStereo === 'true') {
    sdp = setCodecParam(sdp, 'opus/48000', 'stereo', '1');
  } else if (params.opusStereo === 'false') {
    sdp = removeCodecParam(sdp, 'opus/48000', 'stereo');
  } // Set Opus FEC, if opusfec is true, unset it, if opusfec is false, and
  // do nothing if otherwise.


  if (params.opusFec === 'true') {
    sdp = setCodecParam(sdp, 'opus/48000', 'useinbandfec', '1');
  } else if (params.opusFec === 'false') {
    sdp = removeCodecParam(sdp, 'opus/48000', 'useinbandfec');
  } // Set Opus DTX, if opusdtx is true, unset it, if opusdtx is false, and
  // do nothing if otherwise.


  if (params.opusDtx === 'true') {
    sdp = setCodecParam(sdp, 'opus/48000', 'usedtx', '1');
  } else if (params.opusDtx === 'false') {
    sdp = removeCodecParam(sdp, 'opus/48000', 'usedtx');
  } // Set Opus maxplaybackrate, if requested.


  if (params.opusMaxPbr) {
    sdp = setCodecParam(sdp, 'opus/48000', 'maxplaybackrate', params.opusMaxPbr);
  }
  /*set maxaveragebitrate , if requested.*/


  if (params.opusMaxAb) {
    sdp = setCodecParam(sdp, 'opus/48000', 'maxaveragebitrate', params.opusMaxAb);
  } //set x-google-max-bitrate , if requested.


  if (params.opusMaxb) {
    sdp = setCodecParam(sdp, 'opus/48000', 'x-google-max-bitrate', params.opusMaxb);
  } //x-google-min-bitrate


  if (params.opusMinb) {
    sdp = setCodecParam(sdp, 'opus/48000', 'x-google-min-bitrate', params.opusMinb);
  } //x-google-start-bitrate


  if (params.opusStartb) {
    sdp = setCodecParam(sdp, 'opus/48000', 'x-google-start-bitrate', params.opusStartb);
  }

  if (params.opusMaxPlaybackrate) {
    sdp = setCodecParam(sdp, 'opus/48000', 'maxplaybackrate', params.opusMaxPlaybackrate);
  }

  return sdp;
}
// is specified. We'll also add a x-google-min-bitrate value, since the max
// must be >= the min.

function maybeSetVideoSendInitialBitRate(sdp, params) {
  var initialBitrate = parseInt(params.videoSendInitialBitrate);

  if (!initialBitrate) {
    return sdp;
  } // Validate the initial bitrate value.


  var maxBitrate = parseInt(initialBitrate);
  var bitrate = parseInt(params.videoSendBitrate);

  if (bitrate) {
    if (initialBitrate > bitrate) {
      Logger.debug('Clamping initial bitrate to max bitrate of ' + bitrate + ' kbps.');
      initialBitrate = bitrate;
      params.videoSendInitialBitrate = initialBitrate;
    }

    maxBitrate = bitrate;
  }

  var sdpLines = sdp.split('\r\n'); // Search for m line.

  var mLineIndex = findLine(sdpLines, 'm=', 'video');

  if (mLineIndex === null) {
    Logger.debug('Failed to find video m-line');
    return sdp;
  } // Figure out the first codec payload type on the m=video SDP line.


  var videoMLine = sdpLines[mLineIndex];
  var pattern = new RegExp('m=video\\s\\d+\\s[A-Z/]+\\s');
  var sendPayloadType = videoMLine.split(pattern)[1].split(' ')[0];
  var fmtpLine = sdpLines[findLine(sdpLines, 'a=rtpmap', sendPayloadType)];
  var codecName = fmtpLine.split('a=rtpmap:' + sendPayloadType)[1].split('/')[0]; // Use codec from params if specified via URL param, otherwise use from SDP.

  var codec = params.videoSendCodec || codecName;
  console.log(codec); //   console.log(params.videoSendInitialBitrate.toString());
  // console.log(bitrate);
  // console.log(maxBitrate);

  sdp = setCodecParam(sdp, codec, 'x-google-min-bitrate', params.videoSendInitialBitrate);
  sdp = setCodecParam(sdp, codec, 'x-google-max-bitrate', maxBitrate);
  sdp = setCodecParam(sdp, codec, 'x-google-start-bitrate', '2048');
  return sdp;
}


function setCodecParam(sdp, codec, param, value) {
  var sdpLines = sdp.split('\r\n'); // SDPs sent from MCU use \n as line break.

  if (sdpLines.length <= 1) {
    sdpLines = sdp.split('\n');
  }

  var fmtpLineIndex = findFmtpLine(sdpLines, codec);
  var fmtpObj = {};

  if (fmtpLineIndex === null) {
    var index = findLine(sdpLines, 'a=rtpmap', codec);

    if (index === null) {
      return sdp;
    }

    var payload = getCodecPayloadTypeFromLine(sdpLines[index]);
    fmtpObj.pt = payload.toString();
    fmtpObj.params = {};
    fmtpObj.params[param] = value;
    sdpLines.splice(index + 1, 0, writeFmtpLine(fmtpObj));
  } else {
    fmtpObj = parseFmtpLine(sdpLines[fmtpLineIndex]);
    fmtpObj.params[param] = value;
    sdpLines[fmtpLineIndex] = writeFmtpLine(fmtpObj);
  }

  sdp = sdpLines.join('\r\n');
  return sdp;
}
function setAudioNack(sdp) {
  var sdpLines = sdp.split('\r\n'); // SDPs sent from MCU use \n as line break.

  if (sdpLines.length <= 1) {
    sdpLines = sdp.split('\n');
  }
  var fmtpLineIndex = findFmtpLine(sdpLines, 'opus/48000');

  if (fmtpLineIndex) {
    var index = findLine(sdpLines, 'a=rtpmap', 'opus/48000');

    if (index === null) {
      return sdp;
    }

    var payload = getCodecPayloadTypeFromLine(sdpLines[index]);
    sdpLines.splice(fmtpLineIndex, 0, 'a=rtcp-fb:' + payload.toString() + ' ' + 'nack');
  }
  return sdpLines.join('\r\n');
}

function removeCodecParam(sdp, codec, param) {
  var sdpLines = sdp.split('\r\n');
  var fmtpLineIndex = findFmtpLine(sdpLines, codec);

  if (fmtpLineIndex === null) {
    return sdp;
  }

  var map = parseFmtpLine(sdpLines[fmtpLineIndex]);
  delete map.params[param];
  var newLine = writeFmtpLine(map);

  if (newLine === null) {
    sdpLines.splice(fmtpLineIndex, 1);
  } else {
    sdpLines[fmtpLineIndex] = newLine;
  }

  sdp = sdpLines.join('\r\n');
  return sdp;
} // Split an fmtp line into an object including 'pt' and 'params'.


function parseFmtpLine(fmtpLine) {
  var fmtpObj = {};
  var spacePos = fmtpLine.indexOf(' ');
  var keyValues = fmtpLine.substring(spacePos + 1).split(';');
  var pattern = new RegExp('a=fmtp:(\\d+)');
  var result = fmtpLine.match(pattern);

  if (result && result.length === 2) {
    fmtpObj.pt = result[1];
  } else {
    return null;
  }

  var params = {};

  for (var i = 0; i < keyValues.length; ++i) {
    var pair = keyValues[i].split('=');

    if (pair.length === 2) {
      params[pair[0]] = pair[1];
    }
  }

  fmtpObj.params = params;
  return fmtpObj;
} // Generate an fmtp line from an object including 'pt' and 'params'.


function writeFmtpLine(fmtpObj) {
  if (!fmtpObj.hasOwnProperty('pt') || !fmtpObj.hasOwnProperty('params')) {
    return null;
  }

  var pt = fmtpObj.pt;
  var params = fmtpObj.params;
  var keyValues = [];
  var i = 0;

  for (var key in params) {
    keyValues[i] = key + '=' + params[key];
    ++i;
  }

  if (i === 0) {
    return null;
  }

  return 'a=fmtp:' + pt.toString() + ' ' + keyValues.join(';');
} // Find fmtp attribute for |codec| in |sdpLines|.


function findFmtpLine(sdpLines, codec) {
  // Find payload of codec.
  var payload = getCodecPayloadType(sdpLines, codec); // Find the payload in fmtp line.

  return payload ? findLine(sdpLines, 'a=fmtp:' + payload.toString()) : null;
} // Find the line in sdpLines that starts with |prefix|, and, if specified,
// contains |substr| (case-insensitive search).


function findLine(sdpLines, prefix, substr) {
  return findLineInRange(sdpLines, 0, -1, prefix, substr);
} // Find the line in sdpLines[startLine...endLine - 1] that starts with |prefix|
// and, if specified, contains |substr| (case-insensitive search).


function findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
  var realEndLine = endLine !== -1 ? endLine : sdpLines.length;

  for (var i = startLine; i < realEndLine; ++i) {
    if (sdpLines[i].indexOf(prefix) === 0) {
      if (!substr || sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
        return i;
      }
    }
  }

  return null;
} // Gets the codec payload type from sdp lines.


function getCodecPayloadType(sdpLines, codec) {
  var index = findLine(sdpLines, 'a=rtpmap', codec);
  return index ? getCodecPayloadTypeFromLine(sdpLines[index]) : null;
} // Gets the codec payload type from an a=rtpmap:X line.


function getCodecPayloadTypeFromLine(sdpLine) {
  var pattern = new RegExp('a=rtpmap:(\\d+) [a-zA-Z0-9-]+\\/\\d+');
  var result = sdpLine.match(pattern);
  return result && result.length === 2 ? result[1] : null;
} // Returns a new m= line with the specified codec as the first one.
/* Below are newly added functions */
// Following codecs will not be removed from SDP event they are not in the
// user-specified codec list.


const audioCodecWhiteList = ['CN', 'telephone-event'];
const videoCodecWhiteList = ['red', 'ulpfec']; // Returns a new m= line with the specified codec order.

function setCodecOrder(mLine, payloads) {
  var elements = mLine.split(' '); // Just copy the first three parameters; codec order starts on fourth.

  var newLine = elements.slice(0, 3); // Concat payload types.

  newLine = newLine.concat(payloads);
  return newLine.join(' ');
} // Append RTX payloads for existing payloads.


function appendRtxPayloads(sdpLines, payloads) {
  for (const payload of payloads) {
    const index = findLine(sdpLines, 'a=fmtp', 'apt=' + payload);

    if (index !== null) {
      const fmtpLine = parseFmtpLine(sdpLines[index]);
      payloads.push(fmtpLine.pt);
    }
  }

  return payloads;
} // Remove a codec with all its associated a lines.


function removeCodecFramALine(sdpLines, payload) {
  const pattern = new RegExp('a=(rtpmap|rtcp-fb|fmtp):' + payload + '\\s');

  for (let i = sdpLines.length - 1; i > 0; i--) {
    if (sdpLines[i].match(pattern)) {
      sdpLines.splice(i, 1);
    }
  }

  return sdpLines;
} // Reorder codecs in m-line according the order of |codecs|. Remove codecs from
// m-line if it is not present in |codecs|
// The format of |codec| is 'NAME/RATE', e.g. 'opus/48000'.


function reorderCodecs(sdp, type, codecs) {
  if (!codecs || codecs.length === 0) {
    return sdp;
  }

  codecs = type === 'audio' ? codecs.concat(audioCodecWhiteList) : codecs.concat(videoCodecWhiteList);
  var sdpLines = sdp.split('\r\n'); // Search for m line.

  var mLineIndex = findLine(sdpLines, 'm=', type);

  if (mLineIndex === null) {
    return sdp;
  }

  let originPayloads = sdpLines[mLineIndex].split(' ');
  originPayloads.splice(0, 3); // If the codec is available, set it as the default in m line.

  var payloads = [];

  for (const codec of codecs) {
    for (var i = 0; i < sdpLines.length; i++) {
      var index = findLineInRange(sdpLines, i, -1, 'a=rtpmap', codec);

      if (index !== null) {
        const payload = getCodecPayloadTypeFromLine(sdpLines[index]);

        if (payload) {
          payloads.push(payload);
          i = index;
        }
      }
    }
  }

  payloads = appendRtxPayloads(sdpLines, payloads);
  sdpLines[mLineIndex] = setCodecOrder(sdpLines[mLineIndex], payloads); // Remove a lines.

  for (const payload of originPayloads) {
    if (payloads.indexOf(payload) === -1) {
      sdpLines = removeCodecFramALine(sdpLines, payload);
    }
  }

  sdp = sdpLines.join('\r\n');
  return sdp;
}
function setMaxBitrate(sdp, encodingParametersList) {
  console.log(encodingParametersList);

  for (const encodingParameters of encodingParametersList) {
    if (encodingParameters.maxBitrate) {
      sdp = setCodecParam(sdp, encodingParameters.codec.name, 'x-google-max-bitrate', encodingParameters.maxBitrate.toString());
    }
  }

  return sdp;
}
function getRomoteAddr(sdp) {
  var sdpLines = sdp.split('\r\n');
  sdpLines.forEach(line => {
    if (~line.indexOf("a=candidate")) {
      var parts = line.split(' ');
      if (parts[4].substring(0, 3) == "172" || parts[4].substring(0, 7) == "192.168" || parts[4].substring(0, 3) == "IP4") return;
      var userdispatchIp = document.getElementById('userDispatchIp');
      var remoteIp = document.getElementById('remoteIp');

      if (userdispatchIp && !remoteIp) {
        // 创建p节点
        var para = document.createElement("p");
        para.setAttribute("id", "remoteIp"); //设置属性type为text
        // 创建文本节点

        var node = document.createTextNode(`webrtc ip:${parts[4]}`); // 把文本节点添加到p节点里

        para.appendChild(node);
        userdispatchIp.appendChild(para);
      }
    }
  });
}

// Copyright (C) <2018> Intel Corporation
const sysInfo$1 = sysInfo();

// Copyright (C) <2018> Intel Corporation
const sysInfo$2 = sysInfo();
const supportsPlanB = isSafari() ? true : false;
const supportsUnifiedPlan = isSafari() ? false : true;

// Copyright (C) <2018> Intel Corporation

class ConferenceError extends Error {
  constructor(message) {
    super(message);
  }

}

// MIT License

const Base64 = function () {
  var END_OF_INPUT, base64Chars, reverseBase64Chars, base64Str, base64Count, i, setBase64Str, readBase64, encodeBase64, readReverseBase64, ntos, decodeBase64;
  END_OF_INPUT = -1;
  base64Chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];
  reverseBase64Chars = [];

  for (i = 0; i < base64Chars.length; i = i + 1) {
    reverseBase64Chars[base64Chars[i]] = i;
  }

  setBase64Str = function (str) {
    base64Str = str;
    base64Count = 0;
  };

  readBase64 = function () {
    var c;

    if (!base64Str) {
      return END_OF_INPUT;
    }

    if (base64Count >= base64Str.length) {
      return END_OF_INPUT;
    }

    c = base64Str.charCodeAt(base64Count) & 0xff;
    base64Count = base64Count + 1;
    return c;
  };

  encodeBase64 = function (str) {
    var result, inBuffer, done;
    setBase64Str(str);
    result = '';
    inBuffer = new Array(3);
    done = false;

    while (!done && (inBuffer[0] = readBase64()) !== END_OF_INPUT) {
      inBuffer[1] = readBase64();
      inBuffer[2] = readBase64();
      result = result + base64Chars[inBuffer[0] >> 2];

      if (inBuffer[1] !== END_OF_INPUT) {
        result = result + base64Chars[inBuffer[0] << 4 & 0x30 | inBuffer[1] >> 4];

        if (inBuffer[2] !== END_OF_INPUT) {
          result = result + base64Chars[inBuffer[1] << 2 & 0x3c | inBuffer[2] >> 6];
          result = result + base64Chars[inBuffer[2] & 0x3F];
        } else {
          result = result + base64Chars[inBuffer[1] << 2 & 0x3c];
          result = result + '=';
          done = true;
        }
      } else {
        result = result + base64Chars[inBuffer[0] << 4 & 0x30];
        result = result + '=';
        result = result + '=';
        done = true;
      }
    }

    return result;
  };

  readReverseBase64 = function () {
    if (!base64Str) {
      return END_OF_INPUT;
    }

    while (true) {
      if (base64Count >= base64Str.length) {
        return END_OF_INPUT;
      }

      var nextCharacter = base64Str.charAt(base64Count);
      base64Count = base64Count + 1;

      if (reverseBase64Chars[nextCharacter]) {
        return reverseBase64Chars[nextCharacter];
      }

      if (nextCharacter === 'A') {
        return 0;
      }
    }
  };

  ntos = function (n) {
    n = n.toString(16);

    if (n.length === 1) {
      n = "0" + n;
    }

    n = "%" + n;
    return unescape(n);
  };

  decodeBase64 = function (str) {
    var result, inBuffer, done;
    setBase64Str(str);
    result = "";
    inBuffer = new Array(4);
    done = false;

    while (!done && (inBuffer[0] = readReverseBase64()) !== END_OF_INPUT && (inBuffer[1] = readReverseBase64()) !== END_OF_INPUT) {
      inBuffer[2] = readReverseBase64();
      inBuffer[3] = readReverseBase64();
      result = result + ntos(inBuffer[0] << 2 & 0xff | inBuffer[1] >> 4);

      if (inBuffer[2] !== END_OF_INPUT) {
        result += ntos(inBuffer[1] << 4 & 0xff | inBuffer[2] >> 2);

        if (inBuffer[3] !== END_OF_INPUT) {
          result = result + ntos(inBuffer[2] << 6 & 0xff | inBuffer[3]);
        } else {
          done = true;
        }
      } else {
        done = true;
      }
    }

    return result;
  };

  return {
    encodeBase64: encodeBase64,
    decodeBase64: decodeBase64
  };
}();

// Copyright (C) <2018> Intel Corporation

function handleResponse(status, data, resolve, reject) {
  if (status === 'ok' || status === 'success') {
    resolve(data);
  } else if (status === 'error') {
    console.log(data);
    reject(data);
  } else {
    Logger.error('MCU returns unknown ack.');
  }
}
const MAX_TRIALS = 10;
/**
 * @class SioSignaling
 * @classdesc Socket.IO signaling channel for ConferenceClient. It is not recommended to directly access this class.
 * @memberof Oms.Conference
 * @extends Oms.Base.EventDispatcher
 * @constructor
 * @param {?Object } sioConfig Configuration for Socket.IO options.
 * @see https://socket.io/docs/client-api/#io-url-options
 */

class SioSignaling extends EventDispatcher {
  constructor() {
    super();
    this._socket = null;
    this._loggedIn = false;
    this._reconnectTimes = 0;
    this._reconnectionTicket = null;
    this._refreshReconnectionTicket = null;
  }
  /***连接socket***/


  connect(host, isSecured, loginInfo) {
    return new Promise((resolve, reject) => {
      var opts = {
        'reconnection': true,
        'reconnectionAttempts': MAX_TRIALS,
        // 'reconnectionDelay':2000,
        'force new connection': true,
        // 'timeout':5000,
        //  'pingInterval': 25000,
        'transports': ['websocket', 'polling']
      };
      this._socket = io(host, opts); //console.log(this._socket);

      this._socket.on('connect', () => {
        console.log("连接成功");
      });
      /**v4.0修改：添加'room','drop',recording*/


      ['participant', 'text', 'stream', 'progress', 'room', 'drop', 'recording'].forEach(notification => {
        this._socket.on(notification, data => {
          this.dispatchEvent(new MessageEvent('data', {
            message: {
              notification: notification,
              data: data
            }
          }));
        });
      });

      this._socket.on('reconnecting', () => {
        console.log(this._reconnectTimes);
        this._reconnectTimes++;
      });

      this._socket.on('reconnect_failed', event => {
        if (this._reconnectTimes >= MAX_TRIALS) {
          this.dispatchEvent(new OmsEvent('reconnect_failed'));
          this.dispatchEvent(new OmsEvent('disconnect'));
        }
      });

      this._socket.on('drop', () => {
        this._reconnectTimes = MAX_TRIALS;
      });

      this._socket.on('disconnect', msg => {
        console.debug(msg);

        this._clearReconnectionTask();

        if (this._reconnectTimes >= MAX_TRIALS) {
          this._loggedIn = false;
          this.dispatchEvent(new OmsEvent('disconnect'));
        }
      });

      this._socket.on('error', function (data) {
        console.debug(data + ' - error');
      });

      this._socket.on('connect_error', err => {
        console.debug(err);
        console.debug(`连接超时`);
      });

      this._socket.on('connect_timeout', timeout => {
        console.debug(timeout);
        console.debug(`连接超时`);
      });

      this._socket.emit('login', loginInfo, (status, data) => {
        if (status === 'ok') {
          this._loggedIn = true; // this._reconnectionTicket = data.reconnectionTicket;

          this._onReconnectionTicket(data.reconnectionTicket);

          this._socket.on('connect', () => {
            // re-login with reconnection ticket.
            this._socket.emit('relogin', this._reconnectionTicket, async (status, data) => {
              if (status === 'ok') {
                this._reconnectTimes = 0;

                this._onReconnectionTicket(data);
                /**V40修改：重连成功**/


                this.dispatchEvent(new OmsEvent('owt_reconnect_success'));
              } else {
                await this.dispatchEvent(new OmsEvent('disconnect'));
              }
            });
          });
        } //连接后返回的状态


        handleResponse(status, data, resolve, reject);
      });
    });
  }
  /**断开连接**/


  disconnect() {
    this._reconnectTimes = MAX_TRIALS;

    if (!this._socket || this._socket.disconnected) {
      if (this._socket && this._socket.disconnected) {
        this._socket.close();
      }

      console.log(this._reconnectTimes);
      return Promise.resolve(new ConferenceError('Portal is not connected.'));
    }

    return new Promise((resolve, reject) => {
      this._socket.emit('logout', (status, data) => {
        // Maximize the reconnect times to disable reconnection.
        this._reconnectTimes = MAX_TRIALS;

        this._socket.disconnect();

        handleResponse(status, data, resolve, reject);
      });
    });
  }
  /**
   * @function send
   * @instance
   * @desc Send data to portal.
   * @memberof Oms.Conference.SioSignaling
   * @return {Promise<Object, Error>} Return a promise resolved with the data returned by portal. Or return a promise rejected with a newly created Oms.Error if failed to send the message.
   * @param {string} requestName Name defined in client-server protocol.
   * @param {string} requestData Data format is defined in client-server protocol.
   * @private.
   */


  send(requestName, requestData) {
    return new Promise((resolve, reject) => {
      this._socket.emit(requestName, requestData, (status, data) => {
        //console.log(data);
        handleResponse(status, data, resolve, reject);
      });
    });
  }
  /**
   * @function _onReconnectionTicket
   * @instance
   * @desc Parse reconnection ticket and schedule ticket refreshing.
   * @memberof Owt.Conference.SioSignaling
   * @private.
   */


  _onReconnectionTicket(ticketString) {
    this._reconnectionTicket = ticketString;
    const ticket = JSON.parse(Base64.decodeBase64(ticketString));
    console.log(ticket); // Refresh ticket 1 min or 10 seconds before it expires.

    const now = Date.now();
    const millisecondsInOneMinute = 60 * 1000;
    const millisecondsInTenSeconds = 10 * 1000;

    if (ticket.notAfter <= now - millisecondsInTenSeconds) {
      Logger.warning('Reconnection ticket expires too soon.');
      return;
    }

    let refreshAfter = ticket.notAfter - now - millisecondsInOneMinute;

    if (refreshAfter < 0) {
      refreshAfter = ticket.notAfter - now - millisecondsInTenSeconds;
    }

    this._clearReconnectionTask();

    this._refreshReconnectionTicket = setTimeout(() => {
      this._socket.emit('refreshReconnectionTicket', (status, data) => {
        if (status !== 'ok') {
          Logger.warning('Failed to refresh reconnection ticket.');
          return;
        }

        this._onReconnectionTicket(data);
      });
    }, refreshAfter);
  }

  _clearReconnectionTask() {
    clearTimeout(this._refreshReconnectionTicket);
    this._refreshReconnectionTicket = null;
  }

}

// Copyright (C) <2018> Intel Corporation
/**
 * @class Participant
 * @memberOf Oms.Conference
 * @classDesc The Participant defines a participant in a conference.
 * Events:
 *
 * | Event Name      | Argument Type      | Fired when       |
 * | ----------------| ------------------ | ---------------- |
 * | left            | Oms.Base.OmsEvent  | The participant left the conference. |
 *
 * @extends Oms.Base.EventDispatcher
 * @hideconstructor
 */


class Participant extends EventDispatcher {
  constructor(id, role, userId, platform, ptid) {
    super();
    /**
     * @member {string} id
     * @instance
     * @memberof Oms.Conference.Participant
     * @desc The ID of the participant. It varies when a single user join different conferences.
     */

    Object.defineProperty(this, 'id', {
      configurable: false,
      writable: false,
      value: id
    });
    /**
     * @member {string} role
     * @instance
     * @memberof Oms.Conference.Participant
     */

    Object.defineProperty(this, 'role', {
      configurable: false,
      writable: false,
      value: role
    });
    /**
     * @member {string} userId
     * @instance
     * @memberof Oms.Conference.Participant
     * @desc The user ID of the participant. It can be integrated into existing account management system.
     */

    Object.defineProperty(this, 'userId', {
      configurable: false,
      writable: false,
      value: userId
    });
    /**v4.0修改：添加platfrorm字段*/

    /**
    * @member {string} platform
    * @instance
    * @memberof Oms.Conference.Participant
    * @desc The platform of the participant. 
    */

    Object.defineProperty(this, 'platform', {
      configurable: false,
      writable: false,
      value: platform
    });
    /**
    * @member {string} ptid
    * @instance
    * @memberof Oms.Conference.Participant
    * @desc The platform of the participant. 
    */

    Object.defineProperty(this, 'ptid', {
      configurable: false,
      writable: false,
      value: ptid
    });
  }

}

// Copyright (C) <2018> Intel Corporation
/**
 * @class ConferenceInfo
 * @classDesc Information for a conference.
 * @memberOf Oms.Conference
 * @hideconstructor
 */

class ConferenceInfo {
  constructor(id, participants, remoteStreams, myInfo) {
    /**
     * @member {string} id
     * @instance
     * @memberof Oms.Conference.ConferenceInfo
     * @desc Conference ID.
     */
    this.id = id;
    /**
     * @member {Array<Oms.Conference.Participant>} participants
     * @instance
     * @memberof Oms.Conference.ConferenceInfo
     * @desc Participants in the conference.
     */

    this.participants = participants;
    /**
     * @member {Array<Oms.Base.RemoteStream>} remoteStreams
     * @instance
     * @memberof Oms.Conference.ConferenceInfo
     * @desc Streams published by participants. It also includes streams published by current user.
     */

    this.remoteStreams = remoteStreams;
    /**
     * @member {Oms.Base.Participant} self
     * @instance
     * @memberof Oms.Conference.ConferenceInfo
     */

    this.self = myInfo;
  }

}

// Copyright (C) <2018> Intel Corporation
/**
 * @class AudioCodecParameters
 * @memberOf Oms.Base
 * @classDesc Codec parameters for an audio track.
 * @hideconstructor
 */

class AudioCodecParameters {
  constructor(name, channelCount, clockRate) {
    /**
     * @member {string} name
     * @memberof Oms.Base.AudioCodecParameters
     * @instance
     * @desc Name of a codec. Please a value in Oms.Base.AudioCodec. However, some functions do not support all the values in Oms.Base.AudioCodec.
     */
    this.name = name;
    /**
     * @member {?number} channelCount
     * @memberof Oms.Base.AudioCodecParameters
     * @instance
     * @desc Numbers of channels for an audio track.
     */

    this.channelCount = channelCount;
    /**
     * @member {?number} clockRate
     * @memberof Oms.Base.AudioCodecParameters
     * @instance
     * @desc The codec clock rate expressed in Hertz.
     */

    this.clockRate = clockRate;
  }

}
/**
 * @class VideoCodecParameters
 * @memberOf Oms.Base
 * @classDesc Codec parameters for a video track.
 * @hideconstructor
 */

class VideoCodecParameters {
  constructor(name, profile) {
    /**
     * @member {string} name
     * @memberof Oms.Base.VideoCodecParameters
     * @instance
     * @desc Name of a codec. Please a value in Oms.Base.AudioCodec. However, some functions do not support all the values in Oms.Base.AudioCodec.
     */
    this.name = name;
    /**
     * @member {?string} profile
     * @memberof Oms.Base.VideoCodecParameters
     * @instance
     * @desc The profile of a codec. Profile may not apply to all codecs.
     */

    this.profile = profile;
  }

}

// Copyright (C) <2018> Intel Corporation
/**
 * @class AudioSubscriptionCapabilities
 * @memberOf Oms.Conference
 * @classDesc Represents the audio capability for subscription.
 * @hideconstructor
 */

class AudioSubscriptionCapabilities {
  constructor(codecs) {
    /**
     * @member {Array.<Oms.Base.AudioCodecParameters>} codecs
     * @instance
     * @memberof Oms.Conference.AudioSubscriptionCapabilities
     */
    this.codecs = codecs;
  }

}
/**
 * @class VideoSubscriptionCapabilities
 * @memberOf Oms.Conference
 * @classDesc Represents the video capability for subscription.
 * @hideconstructor
 */

class VideoSubscriptionCapabilities {
  constructor(codecs, resolutions, frameRates, bitrateMultipliers, keyFrameIntervals) {
    /**
     * @member {Array.<Oms.Base.VideoCodecParameters>} codecs
     * @instance
     * @memberof Oms.Conference.VideoSubscriptionCapabilities
     */
    this.codecs = codecs;
    /**
     * @member {Array.<Oms.Base.Resolution>} resolution
     * @instance
     * @memberof Oms.Conference.VideoSubscriptionCapabilities
     */

    this.resolutions = resolutions;
    /**
     * @member {Array.<number>} frameRates
     * @instance
     * @memberof Oms.Conference.VideoSubscriptionCapabilities
     */

    this.frameRates = frameRates;
    /**
     * @member {Array.<number>} bitrateMultipliers
     * @instance
     * @memberof Oms.Conference.VideoSubscriptionCapabilities
     */

    this.bitrateMultipliers = bitrateMultipliers;
    /**
     * @member {Array.<number>} keyFrameIntervals
     * @instance
     * @memberof Oms.Conference.VideoSubscriptionCapabilities
     */

    this.keyFrameIntervals = keyFrameIntervals;
  }

}
/**
 * @class SubscriptionCapabilities
 * @memberOf Oms.Conference
 * @classDesc Represents the capability for subscription.
 * @hideconstructor
 */

class SubscriptionCapabilities {
  constructor(audio, video) {
    /**
     * @member {?AudioSubscriptionCapabilities} audio
     * @instance
     * @memberof Oms.Conference.SubscriptionCapabilities
     */
    this.audio = audio;
    /**
     * @member {?VideoSubscriptionCapabilities} video
     * @instance
     * @memberof Oms.Conference.SubscriptionCapabilities
     */

    this.video = video;
  }

}
/**
 * @class Subscription
 * @memberof Oms.Conference
 * @classDesc Subscription is a receiver for receiving a stream.
 * Events:
 *
 * | Event Name      | Argument Type    | Fired when       |
 * | ----------------| ---------------- | ---------------- |
 * | ended           | Event            | Subscription is ended. |
 * | mute            | MuteEvent        | Publication is muted. Remote side stopped sending audio and/or video data. |
 * | unmute          | MuteEvent        | Publication is unmuted. Remote side continued sending audio and/or video data. |
 *
 * @extends Oms.Base.EventDispatcher
 * @hideconstructor
 */

class Subscription extends EventDispatcher {
  constructor(id, stop, getStats, mute, unmute, applyOptions, getReceivers, getContributingSources, getSynchronizationSources) {
    super();

    if (!id) {
      throw new TypeError('ID cannot be null or undefined.');
    }
    /**
     * @member {string} id
     * @instance
     * @memberof Oms.Conference.Subscription
     */


    Object.defineProperty(this, 'id', {
      configurable: true,
      writable: false,
      value: id
    });
    /**
     * @function stop
     * @instance
     * @desc Stop certain subscription. Once a subscription is stopped, it cannot be recovered.
     * @memberof Oms.Conference.Subscription
     * @returns {undefined}
     */

    this.stop = stop;
    /**
     * @function getStats
     * @instance
     * @desc Get stats of underlying PeerConnection.
     * @memberof Oms.Conference.Subscription
     * @returns {Promise<RTCStatsReport, Error>}
     */

    this.getStats = getStats;
    /**
     * @function mute
     * @instance
     * @desc Stop reeving data from remote endpoint.
     * @memberof Oms.Conference.Subscription
     * @param {Oms.Base.TrackKind } kind Kind of tracks to be muted.
     * @returns {Promise<undefined, Error>}
     */

    this.mute = mute;
    /**
     * @function unmute
     * @instance
     * @desc Continue reeving data from remote endpoint.
     * @memberof Oms.Conference.Subscription
     * @param {Oms.Base.TrackKind } kind Kind of tracks to be unmuted.
     * @returns {Promise<undefined, Error>}
     */

    this.unmute = unmute;
    /**
     * @function applyOptions
     * @instance
     * @desc Update subscription with given options.
     * @memberof Oms.Conference.Subscription
     * @param {Oms.Conference.SubscriptionUpdateOptions } options Subscription update options.
     * @returns {Promise<undefined, Error>}
     */

    this.applyOptions = applyOptions;
    /**
     * @function getReceivers
     * @instance
     * @desc Get stats of underlying PeerConnection.
     * @memberof Oms.Conference.Subscription
     * @returns {Promise<RTCStatsReport, Error>}
     */

    this.getReceivers = getReceivers;
    /**
     * @function getContributingSources
     * @instance
     * @desc Get stats of underlying PeerConnection.
     * @memberof Oms.Conference.Subscription
     * @returns {Promise<RTCStatsReport, Error>}
     */

    this.getContributingSources = getContributingSources;
    /**
     * @function getSynchronizationSources
     * @instance
     * @desc Get stats of underlying PeerConnection.
     * @memberof Oms.Conference.Subscription
     * @returns {Promise<RTCStatsReport, Error>}
     */

    this.getSynchronizationSources = getSynchronizationSources;
  }

}

// Copyright (C) <2018> Intel Corporation
class ConferencePeerConnectionChannel extends EventDispatcher {
  constructor(config, signaling) {
    super();
    this._config = config;
    this._options = null;
    this._signaling = signaling;
    this._pc = null;
    this._internalId = null; // It's publication ID or subscription ID.

    this._pendingCandidates = [];
    this._subscribePromise = null;
    this._publishPromise = null;
    this._subscribedStream = null;
    this._publishedStream = null;
    this.publishTracks = [];
    this._publication = null;
    this._subscription = null; // Timer for PeerConnection disconnected. Will stop connection after timer.

    this._disconnectTimer = null;
    this._ended = false;
  }

  onMessage(notification, message) {
    switch (notification) {
      case 'progress':
        if (message.status === 'soac') this._sdpHandler(message.data);else if (message.status === 'ready') this._readyHandler();else if (message.status === 'error') this._errorHandler(message.data);
        break;

      case 'stream':
        this._onStreamEvent(message);

        break;

      default:
        Logger.warning('Unknown notification from MCU.');
    }
  }

  publish(stream, options) {
    if (options === undefined) {
      options = {
        audio: !!stream.mediaStream.getAudioTracks(),
        video: !!stream.mediaStream.getVideoTracks()
      };
    }

    if (typeof options !== 'object') {
      return Promise.reject(new TypeError('Options should be an object.'));
    }

    if (options.audio === undefined) {
      options.audio = !!stream.mediaStream.getAudioTracks();
    }

    if (options.video === undefined) {
      options.video = !!stream.mediaStream.getVideoTracks();
    } // if (
    //   //修改火狐浏览器屏幕共享报错问题，原因是火狐浏览器的mediastream的audiostrack的lengent等于0
    //   // !!options.audio === !stream.mediaStream.getAudioTracks().length || !!
    //   options.video === !stream.mediaStream.getVideoTracks().length) {
    //   return Promise.reject(new ConferenceError(
    //     'options.audio/video is inconsistent with tracks presented in the MediaStream.'
    //   ));
    // }
    // if ((options.audio === false || options.audio === null) &&
    //   (options.video === false || options.video === null)) {
    //   return Promise.reject(new ConferenceError(
    //     'Cannot publish a stream without audio and video.'));
    // }


    if (typeof options.audio === 'object') {
      if (!Array.isArray(options.audio)) {
        return Promise.reject(new TypeError('options.audio should be a boolean or an array.'));
      }

      for (const parameters of options.audio) {
        if (!parameters.codec || typeof parameters.codec.name !== 'string' || parameters.maxBitrate !== undefined && typeof parameters.maxBitrate !== 'number') {
          return Promise.reject(new TypeError('options.audio has incorrect parameters.'));
        }
      }
    }

    if (typeof options.video === 'object') {
      if (!Array.isArray(options.video)) {
        return Promise.reject(new TypeError('options.video should be a boolean or an array.'));
      }

      for (const parameters of options.video) {
        if (!parameters.codec || typeof parameters.codec.name !== 'string' || parameters.maxBitrate !== undefined && typeof parameters.maxBitrate !== 'number' || parameters.codec.profile !== undefined && typeof parameters.codec.profile !== 'string') {
          return Promise.reject(new TypeError('options.video has incorrect parameters.'));
        }
      }
    }

    this._options = options;
    const mediaOptions = {};

    this._createPeerConnection();

    if (stream.mediaStream.getAudioTracks().length > 0 && options.audio !== false && options.audio !== null) {
      if (stream.mediaStream.getAudioTracks().length > 1) {
        Logger.warning('Publishing a stream with multiple audio tracks is not fully supported.');
      }

      if (typeof options.audio !== 'boolean' && typeof options.audio !== 'object') {
        return Promise.reject(new ConferenceError('Type of audio options should be boolean or an object.'));
      }

      mediaOptions.audio = {};
      mediaOptions.audio.source = stream.source.audio;

      for (const track of stream.mediaStream.getAudioTracks()) {
        var sender = this._pc.addTrack(track, stream.mediaStream); // this.publishTracks.push(sender)

      }
    } else {
      mediaOptions.audio = false;
    }

    if (stream.mediaStream.getVideoTracks().length > 0 && options.video !== false && options.video !== null) {
      if (stream.mediaStream.getVideoTracks().length > 1) {
        Logger.warning('Publishing a stream with multiple video tracks is not fully supported.');
      }

      mediaOptions.video = {};
      mediaOptions.video.source = stream.source.video; //v40修改，兼容<chrome56版本

      const trackSettings = stream.mediaStream.getVideoTracks()[0].getSettings ? stream.mediaStream.getVideoTracks()[0].getSettings() : {
        width: 1280,
        height: 720,
        frameRate: 30
      };
      mediaOptions.video.parameters = {
        resolution: {
          width: trackSettings.width,
          height: trackSettings.height
        },
        framerate: trackSettings.frameRate
      };

      for (const track of stream.mediaStream.getVideoTracks()) {
        var sender = this._pc.addTrack(track, stream.mediaStream); // this.publishTracks.push(sender);

      }
    } else {
      mediaOptions.video = false;
    }

    this._publishedStream = stream;

    this._signaling.sendSignalingMessage('publish', {
      media: mediaOptions,
      attributes: stream.attributes
    }).then(data => {
      const messageEvent = new MessageEvent('id', {
        message: data.id,
        origin: this._remoteId
      });
      this.dispatchEvent(messageEvent);
      this._internalId = data.id;
      const offerOptions = {
        offerToReceiveAudio: false,
        offerToReceiveVideo: false
      };

      if (typeof this._pc.addTransceiver === 'function') {
        // |direction| seems not working on Safari.
        if (mediaOptions.audio && stream.mediaStream.getAudioTracks() > 0) {
          const audioTransceiver = this._pc.addTransceiver('audio', {
            direction: 'sendonly'
          });
        }

        if (mediaOptions.video && stream.mediaStream.getVideoTracks() > 0) {
          const videoTransceiver = this._pc.addTransceiver('video', {
            direction: 'sendonly'
          });
        }
      }

      let localDesc; //网络会议4.0修改添加

      offerOptions.iceRestart = true;

      this._pc.createOffer(offerOptions).then(desc => {
        if (options) {
          desc.sdp = this._setRtpReceiverOptions(desc.sdp, options);
        }

        return desc;
      }).then(desc => {
        localDesc = desc;
        return this._pc.setLocalDescription(desc);
      }).then(() => {
        this._signaling.sendSignalingMessage('soac', {
          id: this._internalId,
          signaling: localDesc
        });
      }).catch(e => {
        Logger.error('Failed to create offer or set SDP. Message: ' + e.message);

        this._unpublish();

        this._rejectPromise(e);

        this._fireEndedEventOnPublicationOrSubscription();
      });
    }).catch(e => {
      this._unpublish();

      this._rejectPromise(e);

      this._fireEndedEventOnPublicationOrSubscription();
    });

    return new Promise((resolve, reject) => {
      this._publishPromise = {
        resolve: resolve,
        reject: reject
      }; //  this._readyHandler();
    });
  }

  subscribe(stream, options) {
    if (options === undefined) {
      options = {
        audio: !!stream.capabilities.audio,
        video: !!stream.capabilities.video
      };
    }

    if (typeof options !== 'object') {
      return Promise.reject(new TypeError('Options should be an object.'));
    }

    if (options.audio === undefined) {
      options.audio = !!stream.capabilities.audio;
    }

    if (options.video === undefined) {
      options.video = !!stream.capabilities.video;
    }

    if (options.audio !== undefined && typeof options.audio !== 'object' && typeof options.audio !== 'boolean' && options.audio !== null || options.video !== undefined && typeof options.video !== 'object' && typeof options.video !== 'boolean' && options.video !== null) {
      return Promise.reject(new TypeError('Invalid options type.'));
    }

    if (options.audio && !stream.capabilities.audio || options.video && !stream.capabilities.video) {
      return Promise.reject(new ConferenceError('options.audio/video cannot be true or an object if there is no audio/video track in remote stream.'));
    }

    if (options.audio === false && options.video === false) {
      return Promise.reject(new ConferenceError('Cannot subscribe a stream without audio and video.'));
    }

    this._options = options;
    const mediaOptions = {};

    if (options.audio) {
      if (typeof options.audio === 'object' && Array.isArray(options.audio.codecs)) {
        if (options.audio.codecs.length === 0) {
          return Promise.reject(new TypeError('Audio codec cannot be an empty array.'));
        }
      }

      mediaOptions.audio = {};
      mediaOptions.audio.from = stream.id;
    } else {
      mediaOptions.audio = false;
    }

    if (options.video) {
      if (typeof options.video === 'object' && Array.isArray(options.video.codecs)) {
        if (options.video.codecs.length === 0) {
          return Promise.reject(new TypeError('Video codec cannot be an empty array.'));
        }
      }

      mediaOptions.video = {};
      mediaOptions.video.from = stream.id;

      if (options.video.resolution || options.video.frameRate || options.video.bitrateMultiplier && options.video.bitrateMultiplier !== 1 || options.video.keyFrameInterval) {
        mediaOptions.video.parameters = {
          resolution: options.video.resolution,
          framerate: options.video.frameRate,
          bitrate: options.video.bitrateMultiplier ? 'x' + options.video.bitrateMultiplier.toString() : undefined,
          keyFrameInterval: options.video.keyFrameInterval
        };
      }
    } else {
      mediaOptions.video = false;
    }

    this._subscribedStream = stream;

    this._signaling.sendSignalingMessage('subscribe', {
      media: mediaOptions
    }).then(data => {
      const messageEvent = new MessageEvent('id', {
        message: data.id,
        origin: this._remoteId
      });
      this.dispatchEvent(messageEvent);
      this._internalId = data.id;

      this._createPeerConnection();

      const offerOptions = {
        offerToReceiveAudio: !!options.audio,
        offerToReceiveVideo: !!options.video
      };

      if (typeof this._pc.addTransceiver === 'function') {
        // |direction| seems not working on Safari.
        if (mediaOptions.audio) {
          const audioTransceiver = this._pc.addTransceiver('audio', {
            direction: 'recvonly'
          });
        }

        if (mediaOptions.video) {
          const videoTransceiver = this._pc.addTransceiver('video', {
            direction: 'recvonly'
          });

          console.log(videoTransceiver);

          videoTransceiver.receiver.track.onended = function (status) {
            console.log(status);
          };

          videoTransceiver.receiver.track.onunmuted = function (status) {
            console.log(status);
          };

          videoTransceiver.receiver.track.onmute = function (status) {
            console.log(status);
          };
        }
      } //网络会议4.0修改
      //   offerOptions.iceRestart = true;


      this._pc.createOffer(offerOptions).then(desc => {
        if (options) {
          desc.sdp = this._setRtpReceiverOptions(desc.sdp, options);
        }

        this._pc.setLocalDescription(desc).then(() => {
          this._signaling.sendSignalingMessage('soac', {
            id: this._internalId,
            signaling: desc
          });
        }, function (errorMessage) {
          this._signaling.sendSignalingMessage('soac', {
            id: this._internalId,
            signaling: desc
          });

          Logger.error('Set local description failed. Message: ' + JSON.stringify(errorMessage));
        });
      }, function (error) {
        Logger.error('Create offer failed. Error info: ' + JSON.stringify(error));
      }).catch(e => {
        Logger.error('Failed to create offer or set SDP. Message: ' + e.message);

        this._unsubscribe();

        this._rejectPromise(e);

        this._fireEndedEventOnPublicationOrSubscription();
      });
    }).catch(e => {
      this._unsubscribe();

      this._rejectPromise(e);

      this._fireEndedEventOnPublicationOrSubscription();
    });

    return new Promise((resolve, reject) => {
      this._subscribePromise = {
        resolve: resolve,
        reject: reject
      };
    });
  }

  _unpublish() {
    this._signaling.sendSignalingMessage('unpublish', {
      id: this._internalId
    }).catch(e => {
      Logger.warning('MCU returns negative ack for unpublishing, ' + e);
    });

    if (this._pc && this._pc.signalingState !== 'closed') {
      this._pc.close();
    }
  }

  _unsubscribe() {
    this._signaling.sendSignalingMessage('unsubscribe', {
      id: this._internalId
    }).catch(e => {
      Logger.warning('MCU returns negative ack for unsubscribing, ' + e);
    });

    if (this._pc && this._pc.signalingState !== 'closed') {
      this._pc.close();
    }
  }

  _muteOrUnmute(isMute, isPub, trackKind) {
    const eventName = isPub ? 'stream-control' : 'subscription-control';
    const operation = isMute ? 'pause' : 'play';
    return this._signaling.sendSignalingMessage(eventName, {
      id: this._internalId,
      operation: operation,
      data: trackKind
    }).then(() => {
      if (!isPub) {
        const muteEventName = isMute ? 'mute' : 'unmute';

        this._subscription.dispatchEvent(new MuteEvent(muteEventName, {
          kind: trackKind
        }));
      }
    });
  }

  _applyOptions(options) {
    if (typeof options !== 'object' || typeof options.video !== 'object') {
      return Promise.reject(new ConferenceError('Options should be an object.'));
    }

    const videoOptions = {};
    videoOptions.resolution = options.video.resolution;
    videoOptions.framerate = options.video.frameRate;
    videoOptions.bitrate = options.video.bitrateMultiplier ? 'x' + options.video.bitrateMultiplier.toString() : undefined;
    videoOptions.keyFrameInterval = options.video.keyFrameInterval;
    return this._signaling.sendSignalingMessage('subscription-control', {
      id: this._internalId,
      operation: 'update',
      data: {
        video: {
          parameters: videoOptions
        }
      }
    }).then();
  }

  _onRemoteStreamAdded(event) {
    Logger.debug('Remote stream added.');

    if (this._subscribedStream) {
      this._subscribedStream.mediaStream = event.streams[0];
    } else {
      // This is not expected path. However, this is going to happen on Safari
      // because it does not support setting direction of transceiver.
      Logger.warning('Received remote stream without subscription.');
    }
  }

  _onLocalIceCandidate(event) {
    if (event.candidate) {
      if (this._pc.signalingState !== 'stable') {
        this._pendingCandidates.push(event.candidate);
      } else {
        this._sendCandidate(event.candidate);
      }
    } else {
      setTimeout(() => {
        this._sendSDP();
      }, 1500);
    }
  } //v4.0修改


  _iceChangeStatus(status) {
    const iceStatusEvent$1 = new iceStatusEvent('iceStatusChange', {
      data: status
    });

    if (this._subscription) {
      console.log(status);

      this._subscription.dispatchEvent(iceStatusEvent$1);
    }
  } //网络会议4.修改


  _fireEndedEventOnPublicationOrSubscription() {
    if (this._ended) {
      return;
    }

    this._ended = true;
    const event = new OmsEvent('ended');

    if (this._publication) {
      this._publication.dispatchEvent(event);

      this._publication.stop();
    } else if (this._subscription) {
      this._subscription.dispatchEvent(event);

      this._subscription.stop();
    }
  }

  _rejectPromise(error) {
    if (!error) {
      const error = new ConferenceError('Connection failed or closed.');
    } // Rejecting corresponding promise if publishing and subscribing is ongoing.


    if (this._publishPromise) {
      this._publishPromise.reject(error);

      this._publishPromise = undefined;
    } else if (this._subscribePromise) {
      this._subscribePromise.reject(error);

      this._subscribePromise = undefined;
    }
  } //v4.0修改：将event.currentTarget.iceConnectionState状态改成event.currentTarget.connectionState


  _onIceConnectionStateChange(event) {
    console.log(event.currentTarget.connectionState);
    if (!event || !event.currentTarget) return;
    Logger.debug('ICE connection state changed to ' + event.currentTarget.iceConnectionState); //v4.0添加ice改变监听

    this._iceChangeStatus(event.currentTarget.connectionState);

    if (event.currentTarget.connectionState === 'closed' || event.currentTarget.connectionState === 'failed') {
      // this._pc.createOffer({ iceRestart: true })
      //     .then(this.pc.setLocalDescription)
      //     .then(sendOfferToServer);
      // this._rejectPromise(new ConferenceError('ICE connection failed or closed.'));
      //   Fire ended event if publication or subscription exists.
      this._fireEndedEventOnPublicationOrSubscription();
    }
  }

  _sendSDP() {
    this._signaling.sendSignalingMessage('soac', {
      id: this._internalId,
      signaling: this._pc.currentLocalDescription
    });
  }

  _sendCandidate(candidate) {
    this._signaling.sendSignalingMessage('soac', {
      id: this._internalId,
      signaling: {
        type: 'candidate',
        candidate: {
          candidate: 'a=' + candidate.candidate,
          sdpMid: candidate.sdpMid,
          sdpMLineIndex: candidate.sdpMLineIndex
        }
      }
    }).catch(err => {
      console.log(err);
    });
  }

  _createPeerConnection() {
    const pcConfiguration = this._config.rtcConfiguration || {};

    if (isChrome()) {
      pcConfiguration.sdpSemantics = 'unified-plan';
    }
    this._pc = new RTCPeerConnection(pcConfiguration, {
      optional: [{
        RtpDataChannels: true
      }]
    });

    this._pc.onicecandidate = event => {
      this._onLocalIceCandidate.apply(this, [event]);
    };

    this._pc.ontrack = event => {
      this._onRemoteStreamAdded.apply(this, [event]);
    }; //v4.0修改
    // this._pc.oniceconnectionstatechange = (event) => {
    //   this._onIceConnectionStateChange.apply(this, [event]);
    // };


    this._pc.onconnectionstatechange = event => {
      this._onIceConnectionStateChange.apply(this, [event]);
    };

    this._pc.onnegotiationneeded = event => {
      console.log(event);
    };

    this._pc.addEventListener("icecandidateerror", event => {
      console.log(event);

      if (event.errorCode === 701) {
        reportConnectFail(event.url, event.errorText);
      }
    });
  }

  _getStats() {
    if (this._pc) {
      return this._pc.getStats();
    } else {
      return Promise.reject(new ConferenceError('PeerConnection is not available.'));
    }
  }

  _getSenders() {
    if (this._pc) {
      return this._pc.getSenders();
    } else {
      return Promise.reject(new ConferenceError('PeerConnection is not available.'));
    }
  }

  _getReceivers() {
    if (this._pc) {
      return this._pc.getReceivers();
    } else {
      return Promise.reject(new ConferenceError('PeerConnection is not available.'));
    }
  }

  _getContributingSources() {
    if (this._pc) {
      return this._pc.getContributingSources();
    } else {
      return Promise.reject(new ConferenceError('PeerConnection is not available.'));
    }
  }

  _getSynchronizationSources() {
    if (this._pc) {
      return this._pc.getContributingSources();
    } else {
      return Promise.reject(new ConferenceError('PeerConnection is not available.'));
    }
  }

  _addTrack(track) {
    if (this._pc) {
      return this._pc.addTrack(track);
    } else {
      return Promise.reject(new ConferenceError('PeerConnection is not available.'));
    }
  }

  _readyHandler() {
    if (this._subscribePromise) {
      this._subscription = new Subscription(this._internalId, () => {
        this._unsubscribe();
      }, () => this._getStats(), trackKind => this._muteOrUnmute(true, false, trackKind), trackKind => this._muteOrUnmute(false, false, trackKind), options => this._applyOptions(options), () => this._getReceivers(), () => this._getContributingSources(), () => this._getSynchronizationSources()); // Fire subscription's ended event when associated stream is ended.

      this._subscribedStream.addEventListener('ended', () => {
        this._subscription.dispatchEvent('ended', new OmsEvent('ended'));
      });

      this._subscribePromise.resolve(this._subscription);
    } else if (this._publishPromise) {
      this._publication = new Publication(this._internalId, () => {
        this._unpublish();

        return Promise.resolve();
      }, () => this._getStats(), trackKind => this._muteOrUnmute(true, true, trackKind), trackKind => this._muteOrUnmute(false, true, trackKind), () => this._getSenders(), track => this._addTrack(track));

      this._publishPromise.resolve(this._publication); // Do not fire publication's ended event when associated stream is ended.
      // It may still sending silence or black frames.
      // Refer to https://w3c.github.io/webrtc-pc/#rtcrtpsender-interface.

    }

    this._publishPromise = null;
    this._subscribePromise = null;
  }

  _sdpHandler(sdp) {
    if (sdp.type === 'answer') {
      if ((this._publication || this._publishPromise) && this._options) {
        //v40修改
        if (this._publishedStream && this._publishedStream.source.video == "screen-cast") {
          sdp.sdp = maybeSetVideoSendInitialBitRate(sdp.sdp, {
            videoSendInitialBitrate: 3900,
            videoSendBitrate: 3972
          });
        } else {
          sdp.sdp = this._setRtpSenderOptions(sdp.sdp, this._options);
        }
      } //v4.2修改 ：subscribe answer set audio nack
      // if((this._subscription || this._subscribePromise) && this._options){
      //     sdp.sdp = SdpUtils.setRemoteAudioTransportCC(sdp.sdp);
      //     sdp.sdp = SdpUtils.setAudioNack(sdp.sdp);
      // }


      this._pc.setRemoteDescription(sdp).then(() => {
        getRomoteAddr(sdp.sdp);

        if (this._pendingCandidates.length > 0) {
          for (const candidate of this._pendingCandidates) {
            this._sendCandidate(candidate);
          }
        }
      }, err => {
        console.log(err);
      }, error => {
        Logger.error('Set remote description failed: ' + error);

        this._rejectPromise(error);

        this._fireEndedEventOnPublicationOrSubscription();
      }).catch(err => {
        console.log(err);
      });
    }
  }

  _errorHandler(errorMessage) {
    const p = this._publishPromise || this._subscribePromise;

    if (p) {
      p.reject(new ConferenceError(errorMessage));
      return;
    }

    const dispatcher = this._publication || this._subscription;

    if (!dispatcher) {
      Logger.warning('Neither publication nor subscription is available.');
      return;
    }

    const error = new ConferenceError(errorMessage);
    const errorEvent = new ErrorEvent('error', {
      error: error
    });
    dispatcher.dispatchEvent(errorEvent);
  }

  _setCodecOrder(sdp, options) {
    if (this._publication || this._publishPromise) {
      if (options.audio) {
        const audioCodecNames = Array.from(options.audio, encodingParameters => encodingParameters.codec.name);
        console.log(audioCodecNames);
        sdp = reorderCodecs(sdp, 'audio', audioCodecNames);
      }

      if (options.video) {
        const videoCodecNames = Array.from(options.video, encodingParameters => encodingParameters.codec.name);
        sdp = reorderCodecs(sdp, 'video', videoCodecNames); // sdp =  this._setRtpSenderOptions(sdp,options);
        // sdp = SdpUtils.preferBitRate(sdp,4096,'video');
        //v40修改

        if (this._publishedStream && this._publishedStream.source.video == "screen-cast") {
          sdp = maybeSetVideoSendInitialBitRate(sdp, {
            videoSendInitialBitrate: 3900,
            videoSendBitrate: 3972
          });
        } else {
          sdp = this._setRtpSenderOptions(sdp, options);
        }
      }
    } else {
      if (options.audio && options.audio.codecs) {
        const audioCodecNames = Array.from(options.audio.codecs, codec => codec.name);
        sdp = reorderCodecs(sdp, 'audio', audioCodecNames);
      }

      if (options.video && options.video.codecs) {
        const videoCodecNames = Array.from(options.video.codecs, codec => codec.name);
        sdp = reorderCodecs(sdp, 'video', videoCodecNames);
      }
      /*v4.2修改：添加订阅offer audio nack*/


      sdp = setAudioNack(sdp); // sdp = SdpUtils.maybeSetOpusOptions(sdp, {opusStereo:'true'});
    }

    return sdp;
  }

  _setMaxBitrate(sdp, options) {
    if (typeof options.audio === 'object') {
      sdp = setMaxBitrate(sdp, options.audio);
    }

    if (typeof options.video === 'object') {
      sdp = setMaxBitrate(sdp, options.video); // sdp = SdpUtils.maybeSetVideoSendBitRate(sdp,{videoSendBitrate:1500});
      //videoSendInitialBitrate= maxBitrate
      //videoSendBitrate= minBitrate

      sdp = maybeSetVideoSendInitialBitRate(sdp, {
        videoSendInitialBitrate: 2500,
        videoSendBitrate: 2048
      }); // sdp = SdpUtils.maybeSetOpusOptions(sdp, {opusDtx:"true"});
      //  sdp = SdpUtils.maybeSetOpusOptions(sdp, {opusMaxAb:12000,opusMaxb:100,opusMinb:50,opusStartb:50,opusMaxPlaybackrate:16000,opusStereo:'true'});

      sdp = maybeSetOpusOptions(sdp, {
        opusMaxAb: 20000,
        opusMaxPlaybackrate: 16000
      });
      sdp = setAudioNack(sdp);
    }

    return sdp;
  }

  _setRtpSenderOptions(sdp, options) {
    sdp = this._setMaxBitrate(sdp, options); //网络会议4.0添加
    // sdp = SdpUtils.preferBitRate(sdp,2048,'video');
    // sdp =  SdpUtils.preferTIAS(sdp,24000000,'video');
    // console.log(sdp);

    return sdp;
  }

  _setRtpReceiverOptions(sdp, options) {
    sdp = this._setCodecOrder(sdp, options);
    return sdp;
  } // Handle stream event sent from MCU. Some stream events should be publication event or subscription event. It will be handled here.


  _onStreamEvent(message) {
    let eventTarget;

    if (this._publication && message.id === this._publication.id) {
      eventTarget = this._publication;
    } else if (this._subscribedStream && message.id === this._subscribedStream.id) {
      eventTarget = this._subscription;
    }

    if (!eventTarget) {
      return;
    }

    let trackKind;

    if (message.data.field === 'audio.status') {
      trackKind = TrackKind.AUDIO;
    } else if (message.data.field === 'video.status') {
      trackKind = TrackKind.VIDEO;
    } else {
      Logger.warning('Invalid data field for stream update info.');
    }

    if (message.data.value === 'active') {
      eventTarget.dispatchEvent(new MuteEvent('unmute', {
        kind: trackKind
      }));
    } else if (message.data.value === 'inactive') {
      eventTarget.dispatchEvent(new MuteEvent('mute', {
        kind: trackKind
      }));
    } else {
      Logger.warning('Invalid data value for stream update info.');
    }
  }

}

// Copyright (C) <2018> Intel Corporation

function extractBitrateMultiplier(input) {
  if (typeof input !== 'string' || !input.startsWith('x')) {
    L.Logger.warning('Invalid bitrate multiplier input.');
    return 0;
  }

  return Number.parseFloat(input.replace(/^x/, ''));
}

function sortNumbers(x, y) {
  return x - y;
}

function sortResolutions(x, y) {
  if (x.width !== y.width) {
    return x.width - y.width;
  } else {
    return x.height - y.height;
  }
}

function convertToPublicationSettings(mediaInfo) {
  let audio, audioCodec, video, videoCodec, resolution, framerate, bitrate, keyFrameInterval;

  if (mediaInfo.audio) {
    if (mediaInfo.audio.format) {
      audioCodec = new AudioCodecParameters(mediaInfo.audio.format.codec, mediaInfo.audio.format.channelNum, mediaInfo.audio.format.sampleRate);
    }

    audio = new AudioPublicationSettings(audioCodec);
  }

  if (mediaInfo.video) {
    if (mediaInfo.video.format) {
      videoCodec = new VideoCodecParameters(mediaInfo.video.format.codec, mediaInfo.video.format.profile);
    }

    if (mediaInfo.video.parameters) {
      if (mediaInfo.video.parameters.resolution) {
        resolution = new Resolution(mediaInfo.video.parameters.resolution.width, mediaInfo.video.parameters.resolution.height);
      }

      framerate = mediaInfo.video.parameters.framerate;
      bitrate = mediaInfo.video.parameters.bitrate * 1000;
      keyFrameInterval = mediaInfo.video.parameters.keyFrameInterval;
    }

    video = new VideoPublicationSettings(videoCodec, resolution, framerate, bitrate, keyFrameInterval);
  }

  return new PublicationSettings(audio, video);
}
function convertToSubscriptionCapabilities(mediaInfo) {
  let audio, video;

  if (mediaInfo.audio) {
    const audioCodecs = [];

    if (mediaInfo.audio && mediaInfo.audio.format) {
      audioCodecs.push(new AudioCodecParameters(mediaInfo.audio.format.codec, mediaInfo.audio.format.channelNum, mediaInfo.audio.format.sampleRate));
    }

    if (mediaInfo.audio && mediaInfo.audio.optional && mediaInfo.audio.optional.format) {
      for (const audioCodecInfo of mediaInfo.audio.optional.format) {
        const audioCodec = new AudioCodecParameters(audioCodecInfo.codec, audioCodecInfo.channelNum, audioCodecInfo.sampleRate);
        audioCodecs.push(audioCodec);
      }
    }

    audioCodecs.sort();
    audio = new AudioSubscriptionCapabilities(audioCodecs);
  }

  if (mediaInfo.video) {
    const videoCodecs = [];

    if (mediaInfo.video && mediaInfo.video.format) {
      videoCodecs.push(new VideoCodecParameters(mediaInfo.video.format.codec, mediaInfo.video.format.profile));
    }

    if (mediaInfo.video && mediaInfo.video.optional && mediaInfo.video.optional.format) {
      for (const videoCodecInfo of mediaInfo.video.optional.format) {
        const videoCodec = new VideoCodecParameters(videoCodecInfo.codec, videoCodecInfo.profile);
        videoCodecs.push(videoCodec);
      }
    }

    videoCodecs.sort();
    const resolutions = Array.from(mediaInfo.video.optional.parameters.resolution, r => new Resolution(r.width, r.height));

    if (mediaInfo.video && mediaInfo.video.parameters && mediaInfo.video.parameters.resolution) {
      resolutions.push(new Resolution(mediaInfo.video.parameters.resolution.width, mediaInfo.video.parameters.resolution.height));
    }

    resolutions.sort(sortResolutions);
    const bitrates = Array.from(mediaInfo.video.optional.parameters.bitrate, bitrate => extractBitrateMultiplier(bitrate));
    bitrates.push(1.0);
    bitrates.sort(sortNumbers);
    const frameRates = JSON.parse(JSON.stringify(mediaInfo.video.optional.parameters.framerate));

    if (mediaInfo.video && mediaInfo.video.parameters && mediaInfo.video.parameters.framerate) {
      frameRates.push(mediaInfo.video.parameters.framerate);
    }

    frameRates.sort(sortNumbers);
    const keyFrameIntervals = JSON.parse(JSON.stringify(mediaInfo.video.optional.parameters.keyFrameInterval));

    if (mediaInfo.video && mediaInfo.video.parameters && mediaInfo.video.parameters.keyFrameInterval) {
      keyFrameIntervals.push(mediaInfo.video.parameters.keyFrameInterval);
    }

    keyFrameIntervals.sort(sortNumbers);
    video = new VideoSubscriptionCapabilities(videoCodecs, resolutions, frameRates, bitrates, keyFrameIntervals);
  }

  return new SubscriptionCapabilities(audio, video);
}

// Copyright (C) <2018> Intel Corporation
/**
 * @class RemoteMixedStream
 * @classDesc Mixed stream from conference server.
 * Events:
 *
 * | Event Name             | Argument Type    | Fired when       |
 * | -----------------------| ---------------- | ---------------- |
 * | activeaudioinputchange | Event            | Audio activeness of input stream(of the mixed stream) is changed. |
 * | layoutchange           | Event            | Video's layout has been changed. It usually happens when a new video is mixed into the target mixed stream or an existing video has been removed from mixed stream. |
 *
 * @memberOf Oms.Conference
 * @extends Oms.Base.RemoteStream
 * @hideconstructor
 */

class RemoteMixedStream extends RemoteStream {
  constructor(info) {
    if (info.type !== 'mixed') {
      throw new TypeError('Not a mixed stream');
    }

    super(info.id, undefined, undefined, new StreamSourceInfo('mixed', 'mixed'));
    this.settings = convertToPublicationSettings(info.media);
    this.capabilities = new convertToSubscriptionCapabilities(info.media);
  }

}
/**
 * @class ActiveAudioInputChangeEvent
 * @classDesc Class ActiveInputChangeEvent represents an active audio input change event.
 * @memberof Oms.Conference
 * @hideconstructor
 */

class ActiveAudioInputChangeEvent extends OmsEvent {
  constructor(type, init) {
    super(type);
    /**
     * @member {string} activeAudioInputStreamId
     * @instance
     * @memberof Oms.Conference.ActiveAudioInputChangeEvent
     * @desc The ID of input stream(of the mixed stream) whose audio is active.
     */

    this.activeAudioInputStreamId = init.activeAudioInputStreamId;
  }

}
/**
 * @class LayoutChangeEvent
 * @classDesc Class LayoutChangeEvent represents an video layout change event.
 * @memberof Oms.Conference
 * @hideconstructor
 */

class LayoutChangeEvent extends OmsEvent {
  constructor(type, init) {
    super(type);
    /**
     * @member {object} layout
     * @instance
     * @memberof Oms.Conference.LayoutChangeEvent
     * @desc Current video's layout. It's an array of map which maps each stream to a region.
     */

    this.layout = init.layout;
  }

}

// Copyright (C) <2018> Intel Corporation
const SignalingState = {
  READY: 1,
  CONNECTING: 2,
  CONNECTED: 3
};
const protocolVersion = '1.0';
/**
 * @class ParticipantEvent
 * @classDesc Class ParticipantEvent represents a participant event.
   @extends Oms.Base.OmsEvent
 * @memberof Oms.Conference
 * @hideconstructor
 */

const ParticipantEvent = function (type, init) {
  const that = new OmsEvent(type, init);
  /**
   * @member {Oms.Conference.Participant} participant
   * @instance
   * @memberof Oms.Conference.ParticipantEvent
   */

  that.participant = init.participant;
  return that;
};
/**
 * @class ConferenceClient
 * @classdesc The ConferenceClient handles PeerConnections between client and server. For conference controlling, please refer to REST API guide.
 * Events:
 *
 * | Event Name            | Argument Type                    | Fired when       |
 * | --------------------- | ---------------------------------| ---------------- |
 * | streamadded           | Oms.Base.StreamEvent             | A new stream is available in the conference. |
 * | participantjoined     | Oms.Conference.ParticipantEvent  | A new participant joined the conference. |
 * | messagereceived       | Oms.Base.MessageEvent            | A new message is received. |
 * | serverdisconnected    | Oms.Base.OmsEvent                | Disconnected from conference server. |
 *
 * @memberof Oms.Conference
 * @extends Oms.Base.EventDispatcher
 * @constructor
 * @param {?Oms.Conference.ConferenceClientConfiguration } config Configuration for ConferenceClient.
 * @param {?Oms.Conference.SioSignaling } signalingImpl Signaling channel implementation for ConferenceClient. SDK uses default signaling channel implementation if this parameter is undefined. Currently, a Socket.IO signaling channel implementation was provided as ics.conference.SioSignaling. However, it is not recommended to directly access signaling channel or customize signaling channel for ConferenceClient as this time.
 */

const ConferenceClient = function (config, signalingImpl) {
  Object.setPrototypeOf(this, new EventDispatcher());
  config = config || {};
  const self = this;
  let signalingState = SignalingState.READY;
  const signaling = signalingImpl ? signalingImpl : new SioSignaling();
  let me;
  let room;
  let remoteStreams = new Map(); // Key is stream ID, value is a RemoteStream.

  const participants = new Map(); // Key is participant ID, value is a Participant object.

  const publishChannels = new Map(); // Key is MediaStream's ID, value is pc channel.

  const channels = new Map(); // Key is channel's internal ID, value is channel.

  function onSignalingMessage(notification, data) {
    if (notification === 'soac' || notification === 'progress') {
      if (!channels.has(data.id)) {
        Logger.warning('Cannot find a channel for incoming data.');
        return;
      }

      channels.get(data.id).onMessage(notification, data);
    } else if (notification === 'stream') {
      if (data.status === 'add') {
        fireStreamAdded(data.data);
      } else if (data.status === 'remove') {
        fireStreamRemoved(data);
      } else if (data.status === 'update') {
        // Broadcast audio/video update status to channel so specific events can be fired on publication or subscription.
        if (data.data.field === 'audio.status' || data.data.field === 'video.status') {
          // console.log(data);
          changeAudioStatus(data); //           channels.forEach(c => {
          //             c.onMessage(notification, data);
          //           });
        } else if (data.data.field === 'activeInput') {
          fireActiveAudioInputChange(data);
        } else if (data.data.field === 'video.layout') {
          fireLayoutChange(data);
        } else if (data.data.field === '.') {
          updateRemoteStream(data.data.value);
        } else {
          Logger.warning('Unknown stream event from MCU.');
        }
      }
    } else if (notification === 'text') {
      //console.log(data);
      fireMessageReceived(data);
    } else if (notification === 'participant') {
      fireParticipantEvent(data);
      /*v4.0修改：添加room*/
    } else if (notification == 'room') {
      fireRoomStatusChange(data);
      /*v4.0修改：添加drop,，被主持人请出会议*/
    } else if (notification == 'drop') {
      exitRoomEvent$1(data); //v1.3添加录制提示
    } else if (notification == 'recording') {
      console.log(data);
      recordMsgEvent$1(data);
    }
  }
  signaling.addEventListener('data', event => {
    onSignalingMessage(event.message.notification, event.message.data);
  });
  signaling.addEventListener('disconnect', () => {
    clean();
    signalingState = SignalingState.READY;
    self.dispatchEvent(new OmsEvent('serverdisconnected'));
  }); //v4.0修改

  signaling.addEventListener('reconnect_failed', () => {
    self.dispatchEvent(new OmsEvent('recollectfailed'));
  }); //v4.0修改

  signaling.addEventListener('owt_reconnect_success', () => {
    // console.log('owt_reconnect_success');
    self.dispatchEvent(new OmsEvent('owt_reconnect_success'));
  });

  function fireParticipantEvent(data) {
    if (data.action === 'join') {
      data = data.data; // v4.0修改：在参会者信息中添加platform字段

      const participant = new Participant(data.id, data.role, data.user, data.platform, data.ptid);
      participants.set(data.id, participant);
      const event = new ParticipantEvent('participantjoined', {
        participant: participant
      });
      self.dispatchEvent(event);
    } else if (data.action === 'leave') {
      const participantId = data.data;

      if (!participants.has(participantId)) {
        Logger.warning('Received leave message from MCU for an unknown participant.');
        return;
      }

      const participant = participants.get(participantId);
      participants.delete(participantId);
      participant.dispatchEvent(new OmsEvent('left'));
    }
  }

  function fireMessageReceived(data) {
    const messageEvent = new MessageEvent('messagereceived', {
      message: data.message,
      origin: data.from,
      to: data.to
    });
    self.dispatchEvent(messageEvent);
  }

  function fireStreamAdded(info) {
    const stream = createRemoteStream(info);
    remoteStreams.set(stream.id, stream);
    const streamEvent = new StreamEvent('streamadded', {
      stream: stream
    });
    self.dispatchEvent(streamEvent);
  }

  function fireStreamRemoved(info) {
    if (!remoteStreams.has(info.id)) {
      Logger.warning('Cannot find specific remote stream.');
      return;
    }

    const stream = remoteStreams.get(info.id);
    const streamEvent = new OmsEvent('ended');
    remoteStreams.delete(stream.id);
    stream.dispatchEvent(streamEvent);
  } //v4.0添加:change audio status(active/inactive)


  function changeAudioStatus(info) {
    if (!remoteStreams.has(info.id)) {
      Logger.warning('Cannot find specific remote stream.');
      return;
    }

    const stream = remoteStreams.get(info.id);
    const streamEvent = new StreamAudioEvent('audiostatuschange', {
      info: info
    });
    self.dispatchEvent(streamEvent);
  }

  function fireActiveAudioInputChange(info) {
    if (!remoteStreams.has(info.id)) {
      Logger.warning('Cannot find specific remote stream.');
      return;
    }

    const stream = remoteStreams.get(info.id);
    const streamEvent = new ActiveAudioInputChangeEvent('activeaudioinputchange', {
      activeAudioInputStreamId: info.data.value
    });
    stream.dispatchEvent(streamEvent);
  }

  function fireLayoutChange(info) {
    if (!remoteStreams.has(info.id)) {
      Logger.warning('Cannot find specific remote stream.');
      return;
    }

    const stream = remoteStreams.get(info.id);
    const streamEvent = new LayoutChangeEvent('layoutchange', {
      layout: info.data.value
    });
    stream.dispatchEvent(streamEvent);
  }
  /**v4.0添加，房间状态改变消息*/


  function fireRoomStatusChange(info) {
    const roomStatusEvent$1 = new roomStatusEvent('roomstatuschange', {
      data: info
    });
    self.dispatchEvent(roomStatusEvent$1);
  }

  function updateRemoteStream(streamInfo) {
    if (!remoteStreams.has(streamInfo.id)) {
      Logger.warning('Cannot find specific remote stream.');
      return;
    }

    const stream = remoteStreams.get(streamInfo.id);
    stream.settings = convertToPublicationSettings(streamInfo.media);
    stream.capabilities = convertToSubscriptionCapabilities(streamInfo.media);
    const streamEvent = new OmsEvent('updated');
    stream.dispatchEvent(streamEvent);
  }
  /**v4.0修改：被主持人请出会议**/


  function exitRoomEvent$1(info) {
    const exitRoomEvent$1 = new exitRoomEvent('exitRoom', info);
    self.dispatchEvent(exitRoomEvent$1);
  }

  function recordMsgEvent$1(info) {
    const recordMsgEvent$1 = new recordMsgEvent('recording', info);
    self.dispatchEvent(recordMsgEvent$1);
  }

  function createRemoteStream(streamInfo) {
    if (streamInfo.type === 'mixed') {
      return new RemoteMixedStream(streamInfo);
    } else {
      let audioSourceInfo, videoSourceInfo, audioActive, videoActive;

      if (streamInfo.media.audio) {
        audioSourceInfo = streamInfo.media.audio.source;
        audioActive = streamInfo.media.audio.status;
      }

      if (streamInfo.media.video) {
        videoSourceInfo = streamInfo.media.video.source;
        videoActive = streamInfo.media.video.status;
      }
      /*v4.0修改，添加mediaStatus:
      new StreamModule.StreamStatusInfo(audioActive, videoActive)*/

      /*在remoteStream中添加StreamStatusInfo**/


      const stream = new RemoteStream(streamInfo.id, streamInfo.info.owner, undefined, new StreamSourceInfo(audioSourceInfo, videoSourceInfo), streamInfo.info.attributes, new StreamStatusInfo(audioActive, videoActive), streamInfo.info.user);
      /*v4.0修改*/

      if (streamInfo.shareInfo) {
        stream.shareInfo = streamInfo.shareInfo;
      }
      stream.settings = convertToPublicationSettings(streamInfo.media);
      stream.capabilities = convertToSubscriptionCapabilities(streamInfo.media);
      return stream;
    }
  }

  function sendSignalingMessage(type, message) {
    return signaling.send(type, message);
  }

  function createPeerConnectionChannel() {
    // Construct an signaling sender/receiver for ConferencePeerConnection.
    const signalingForChannel = Object.create(EventDispatcher);
    signalingForChannel.sendSignalingMessage = sendSignalingMessage;
    const pcc = new ConferencePeerConnectionChannel(config, signalingForChannel);
    pcc.addEventListener('id', messageEvent => {
      channels.set(messageEvent.message, pcc);
    });
    return pcc;
  }

  function clean() {
    participants.clear();
    remoteStreams.clear();
  }

  Object.defineProperty(this, 'info', {
    configurable: false,
    get: () => {
      if (!room) {
        return null;
      }

      return new ConferenceInfo(room.id, Array.from(participants, x => x[1]), Array.from(remoteStreams, x => x[1]), me);
    }
  });
  /**
   * @function join
   * @instance
   * @desc Join a conference.
   * @memberof Oms.Conference.ConferenceClient
   * @returns {Promise<ConferenceInfo, Error>} Return a promise resolved with current conference's information if successfully join the conference. Or return a promise rejected with a newly created Oms.Error if failed to join the conference.
   * @param {string} token Token is issued by conference server(nuve).
   */

  this.join = function (tokenString) {
    return new Promise((resolve, reject) => {
      const token = JSON.parse(Base64.decodeBase64(tokenString));
      const isSecured = token.secure === true;
      let host = token.host;

      if (typeof host !== 'string') {
        reject(new ConferenceError('Invalid host.'));
        return;
      }

      if (host.indexOf('http') === -1) {
        host = isSecured ? 'https://' + host : 'http://' + host;
        var userdispatchIp = document.getElementById('userDispatchIp');

        if (userdispatchIp) {
          // 创建p节点
          var para = document.createElement("p"); // 创建文本节点

          var node = document.createTextNode(`protal ip:${host}`); // 把文本节点添加到p节点里

          para.appendChild(node);
          userdispatchIp.appendChild(para);
        }
      }

      if (signalingState !== SignalingState.READY) {
        reject(new ConferenceError('connection state invalid'));
        return;
      }

      signalingState = SignalingState.CONNECTING;
      const loginInfo = {
        token: tokenString,
        userAgent: sysInfo(),
        protocol: protocolVersion
      };
      signaling.connect(host, isSecured, loginInfo).then(resp => {
        signalingState = SignalingState.CONNECTED;
        room = resp.room; //participants  streams views

        if (room.streams !== undefined) {
          for (const st of room.streams) {
            if (st.type === 'mixed') {
              st.viewport = st.info.label;
            }

            remoteStreams.set(st.id, createRemoteStream(st));
          }
        }

        if (resp.room && resp.room.participants !== undefined) {
          for (const p of resp.room.participants) {
            //v4.0修改：添加platform字段
            participants.set(p.id, new Participant(p.id, p.role, p.user, p.platform, p.ptid));

            if (p.id === resp.id) {
              me = participants.get(p.id);
            }
          }
        }

        resolve(new ConferenceInfo(resp.room.id, Array.from(participants.values()), Array.from(remoteStreams.values()), me));
      }, e => {
        signalingState = SignalingState.READY;
        reject(new ConferenceError(e));
      });
    });
  };
  /**
   * @function publish
   * @memberof Oms.Conference.ConferenceClient
   * @instance
   * @desc Publish a LocalStream to conference server. Other participants will be able to subscribe this stream when it is successfully published.
   * @param {Oms.Base.LocalStream} stream The stream to be published.
   * @param {Oms.Base.PublishOptions} options Options for publication.
   * @returns {Promise<Publication, Error>} Returned promise will be resolved with a newly created Publication once specific stream is successfully published, or rejected with a newly created Error if stream is invalid or options cannot be satisfied. Successfully published means PeerConnection is established and server is able to process media data.
   */


  this.publish = function (stream, options) {
    if (!(stream instanceof LocalStream)) {
      return Promise.reject(new ConferenceError('Invalid stream.'));
    }

    if (publishChannels.has(stream.mediaStream.id)) {
      return Promise.reject(new ConferenceError('Cannot publish a published stream.'));
    }

    const channel = createPeerConnectionChannel();
    return channel.publish(stream, options);
  };
  /**
   * @function subscribe
   * @memberof Oms.Conference.ConferenceClient
   * @instance
   * @desc Subscribe a RemoteStream from conference server.
   * @param {Oms.Base.RemoteStream} stream The stream to be subscribed.
   * @param {Oms.Conference.SubscribeOptions} options Options for subscription.
   * @returns {Promise<Subscription, Error>} Returned promise will be resolved with a newly created Subscription once specific stream is successfully subscribed, or rejected with a newly created Error if stream is invalid or options cannot be satisfied. Successfully subscribed means PeerConnection is established and server was started to send media data.
   */


  this.subscribe = function (stream, options) {
    if (!(stream instanceof RemoteStream)) {
      return Promise.reject(new ConferenceError('Invalid stream.'));
    }

    const channel = createPeerConnectionChannel();
    return channel.subscribe(stream, options);
  };

  this.replaceTrack = function (track, status) {
    const channel = createPeerConnectionChannel();
    return channel.replaceTrack(track, status);
  };
  /**
   * @function send
   * @memberof Oms.Conference.ConferenceClient
   * @instance
   * @desc Send a text message to a participant or all participants.
   * @param {string} message Message to be sent.
   * @param {string} participantId Receiver of this message. Message will be sent to all participants if participantId is undefined.
   * @returns {Promise<void, Error>} Returned promise will be resolved when conference server received certain message.
   */


  this.send = function (message, participantId) {
    if (participantId === undefined) {
      participantId = 'all';
    } //加类型


    return sendSignalingMessage('text', {
      to: participantId,
      message: message,
      type: 'binary'
    });
  };
  /**
   * @function leave
   * @memberOf Oms.Conference.ConferenceClient
   * @instance
   * @desc Leave a conference.
   * @returns {Promise<void, Error>} Returned promise will be resolved with undefined once the connection is disconnected.
   */


  this.leave = function () {
    return signaling.disconnect().then(() => {
      clean();
      signalingState = SignalingState.READY;
    });
  };
};

// Copyright (C) <2018> Intel Corporation

var conference = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ConferenceClient: ConferenceClient,
  SioSignaling: SioSignaling
});

// Copyright (C) <2018> Intel Corporation
/**
 * Base objects for both P2P and conference.
 * @namespace Oms.Base
 */

const Base = base;
/**
 * WebRTC connections with conference server.
 * @namespace Oms.Conference
 */

const Conference = conference;

// SPDX-License-Identifier: Apache-2.0

const sdkVersion$1 = '4.1';
function isSafari$1() {
  return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
}
// Format: {sdk:{version:**, type:**}, runtime:{version:**, name:**}, os:{version:**, name:**}};

function sysInfo$3() {
  var info = Object.create({});
  info.sdk = {
    version: sdkVersion$1,
    type: 'JavaScript'
  }; // Runtime info.

  var userAgent = navigator.userAgent;
  var firefoxRegex = /Firefox\/([0-9\.]+)/;
  var chromeRegex = /Chrome\/([0-9\.]+)/;
  var edgeRegex = /Edge\/([0-9\.]+)/;
  var safariVersionRegex = /Version\/([0-9\.]+) Safari/;
  var result = chromeRegex.exec(userAgent);

  if (result) {
    info.runtime = {
      name: 'Chrome',
      version: result[1].split('.')[0]
    };
  } else if (result = firefoxRegex.exec(userAgent)) {
    info.runtime = {
      name: 'Firefox',
      version: result[1]
    };
  } else if (result = edgeRegex.exec(userAgent)) {
    info.runtime = {
      name: 'Edge',
      version: result[1]
    };
  } else if (isSafari$1()) {
    result = safariVersionRegex.exec(userAgent);
    info.runtime = {
      name: 'Safari'
    };
    info.runtime.version = result ? result[1] : 'Unknown';
  } else {
    info.runtime = {
      name: 'Unknown',
      version: 'Unknown'
    };
  } // OS info.


  var windowsRegex = /Windows NT ([0-9\.]+)/;
  var macRegex = /Intel Mac OS X ([0-9_\.]+)/;
  var iPhoneRegex = /iPhone OS ([0-9_\.]+)/;
  var linuxRegex = /X11; Linux/;
  var androidRegex = /Android( ([0-9\.]+))?/;
  var chromiumOsRegex = /CrOS/;

  if (result = windowsRegex.exec(userAgent)) {
    info.os = {
      name: 'windows',
      version: result[1]
    };
  } else if (result = macRegex.exec(userAgent)) {
    info.os = {
      name: 'mac',
      version: result[1].replace(/_/g, '.')
    };
  } else if (result = iPhoneRegex.exec(userAgent)) {
    info.os = {
      name: 'iPhone OS',
      version: result[1].replace(/_/g, '.')
    };
  } else if (result = linuxRegex.exec(userAgent)) {
    info.os = {
      name: 'Linux',
      version: 'Unknown'
    };
  } else if (result = androidRegex.exec(userAgent)) {
    info.os = {
      name: 'Android',
      version: result[1] || 'Unknown'
    };
  } else if (result = chromiumOsRegex.exec(userAgent)) {
    info.os = {
      name: 'Chrome OS',
      version: 'Unknown'
    };
  } else {
    info.os = {
      name: 'Unknown',
      version: 'Unknown'
    };
  }

  info.capabilities = {
    continualIceGathering: false,
    unifiedPlan: false,
    streamRemovable: info.runtime.name !== 'Firefox'
  };
  return info;
}

if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
  // Firefox 38+ seems having support of enumerateDevicesx
  navigator.enumerateDevices = function (callback) {
    navigator.mediaDevices.enumerateDevices().then(callback);
  };
}

function checkDeviceSupport(callback) {
  var MediaDevices = [];
  var isHTTPs = location.protocol === 'https:';
  var canEnumerate = false;

  if (typeof MediaStreamTrack !== 'undefined' && 'getSources' in MediaStreamTrack) {
    canEnumerate = true;
  } else if (navigator.mediaDevices && !!navigator.mediaDevices.enumerateDevices) {
    canEnumerate = true;
  }

  var hasMicrophone = false;
  var hasWebcam = false;
  var isMicrophoneAlreadyCaptured = false;
  var isWebcamAlreadyCaptured = false;

  if (!canEnumerate) {
    return;
  }

  if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
    navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
  }

  if (!navigator.enumerateDevices && navigator.enumerateDevices) {
    navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
  }

  if (!navigator.enumerateDevices) {
    if (callback) {
      callback();
    }

    return;
  }

  MediaDevices = [];
  navigator.enumerateDevices(function (devices) {
    devices.forEach(function (_device) {
      var device = {};

      for (var d in _device) {
        device[d] = _device[d];
      }

      if (device.kind === 'audio') {
        device.kind = 'audioinput';
      }

      if (device.kind === 'video') {
        device.kind = 'videoinput';
      }

      var skip;
      MediaDevices.forEach(function (d) {
        if (d.id === device.id && d.kind === device.kind) {
          skip = true;
        }
      });

      if (skip) {
        return;
      }

      if (!device.deviceId) {
        device.deviceId = device.id;
      }

      if (!device.id) {
        device.id = device.deviceId;
      }

      if (!device.label) {
        device.label = 'Please invoke getUserMedia once.';

        if (!isHTTPs) {
          device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
        }
      } else {
        if (device.kind === 'videoinput' && !isWebcamAlreadyCaptured) {
          isWebcamAlreadyCaptured = true;
        }

        if (device.kind === 'audioinput' && !isMicrophoneAlreadyCaptured) {
          isMicrophoneAlreadyCaptured = true;
        }
      }

      if (device.kind === 'audioinput') {
        hasMicrophone = true;
      }

      if (device.kind === 'videoinput') {
        hasWebcam = true;
      } // there is no 'videoouput' in the spec.


      MediaDevices.push(device);
    });

    if (callback) {
      callback(hasWebcam, hasMicrophone, isMicrophoneAlreadyCaptured, isWebcamAlreadyCaptured);
    }
  });
}

// import {webrtc} from './webrtc'
//1.      入会前-设置页面
// a.     音/视频设备默认选择：系统默认设备。 (其实就是设备第一个)
//
// b.     当用户修改了音视频设备选项，立即生效，并保存在配置文件内，供下次启动时调用。
//
// c.     切换音/视频设备，实时生效，实时预览出切换后的设备的音量条/视频画面。
//
// d.     拔掉的设备，在列表内消失，列表内默认选中的设备实时恢复到系统默认设备，实时预览出切换后的设备的音量条、视频画面。
//
// e.     设备可识别，由于故障、系统禁用、调用失败等，保留在列表内可见但不可选（disable状态），设备名称后面备注（不可用）。
//
// f.      新插入的音/视频设备，按照系统的设备顺序，更新到相应的设备列表内，为可选状态。
//
// g.     设备由正常状态，由于各种因素变成不可用状态（前一条的不可用），列表内默认选中的设备实时恢复到系统默认设备，实时预览出切换后的设备的音量条、视频画面。
//
// h.     设备由不可用状态，由于各种因素变成正常状态，列表内此设备，实时变更为可选状态，去掉后面备注文字（不可用）。
//
// i.      当选择为默认设备时，系统的默认设备（由于插拔外接设备等原因）发生了变化，列表内还是选择系统默认设备项，实际使用的设备与系统默认设备切换后的保持一致，实时预览出切换后的设备的音量条、视频画面。
//
// j.      会前和会中的音/视频设备选择和参数设置，使用同一份配置文件。
//一、初始化：无可用设备：显示无 隐藏生意进度条
// 1：浏览器禁止:label为空，
// 2：设备被占用，电脑隐私设置设备禁止等label有值，这时disabled：true。默认为true不可用状态。
//3:VideoInputList，AudioInputList中有可以设备，选择第一个可以设备作为默认设备，length为0或者disabled都为true，同一
const SetUp = function () {
  this.AudioInputList = [];
  this.AudioOutPutList = [];
  this.VideoInputList = [];
  this.audio = null; // this.webrtc = new webrtc();

  this.Stream = {
    audioStream: null,
    videoStream: null,
    isUpdateVideo: false,
    isUpdateAudio: false,
    isCancelSetStream: false
  };

  this.updateDeviceList = async () => {
    if (this.Stream.isCancelSetStream) {
      return;
    }

    let deviceInfos = await navigator.mediaDevices.enumerateDevices();
    this.AudioInputList = [];
    this.AudioOutPutList = [];
    this.VideoInputList = [];
    deviceInfos.forEach((deviceInfo, index) => {
      if (deviceInfo.kind == 'audioinput' && deviceInfo.label) {
        this.AudioInputList.push({
          deviceId: deviceInfo.id || deviceInfo.deviceId,
          label: deviceInfo.label,
          kind: 'audioinput',
          disabled: false
        });
      } else if (deviceInfo.kind == 'audiooutput' && deviceInfo.label) {
        this.AudioOutPutList.push({
          deviceId: deviceInfo.id || deviceInfo.deviceId,
          label: deviceInfo.label,
          kind: 'audiooutput',
          disabled: false
        });
      } else if (deviceInfo.kind == 'videoinput' && deviceInfo.label) {
        this.VideoInputList.push({
          deviceId: deviceInfo.id || deviceInfo.deviceId,
          label: deviceInfo.label ? deviceInfo.label : deviceInfo.id || deviceInfo.deviceId,
          kind: 'videoinput',
          disabled: false
        });
      }
    });
  };
  /**updateDeviceStatus:更新列表设置的状态：可用/不可用
   *  disabled:false
   * **/


  this.updateDeviceStatus = async () => {
    if (this.Stream.isCancelSetStream) {
      return;
    }

    for (let i = 0; i < this.VideoInputList.length; i++) {
      let streamInfo = await this.getVideoMediaStream({
        deviceId: this.VideoInputList[i].deviceId
      });

      if (!streamInfo.code) {
        this.VideoInputList[i].disabled = false;
      }
    }

    for (let i = 0; i < this.AudioInputList.length; i++) {
      let streamInfo = await this.getAudioMediaStream({
        deviceId: this.AudioInputList[i].deviceId
      });

      if (!streamInfo.code) {
        this.AudioInputList[i].disabled = false;
      }
    }
  };
  /**排序：返回列表第一个可用设备**/


  this.firstUsableDevice = () => {
    var isUsableVideo = false,
        isUsableAudioInput = false,
        isUsableAudioOutput = false;
    var firstUsableDevice = {
      videoInputInfo: '',
      audioInputInfo: '',
      audioOutputInfo: ''
    };
    this.VideoInputList.forEach(videoInput => {
      if (!videoInput.disabled && !isUsableVideo) {
        isUsableVideo = true;
        firstUsableDevice.videoInputInfo = videoInput;
      }
    });
    this.AudioInputList.forEach(audioInput => {
      if (!audioInput.disabled && !isUsableAudioInput) {
        isUsableAudioInput = true;
        firstUsableDevice.audioInputInfo = audioInput;
      }
    });
    this.AudioOutPutList.forEach(audioOutPut => {
      if (!audioOutPut.disabled && !isUsableAudioOutput) {
        isUsableAudioOutput = true;
        firstUsableDevice.audioOutputInfo = audioOutPut;
      }
    });
    console.log(firstUsableDevice);
    return firstUsableDevice;
  };
  /**isVideoUsableDevice：判断是否存在当前设备，并且如果存在当前所选的设备是否可用
   * 参数：deviceId
   * **/


  this.isVideoUsableDevice = deviceId => {
    if (this.Stream.isCancelSetStream) {
      return;
    }

    let curVideoDevice = this.VideoInputList.filter(videoInput => {
      if (videoInput.deviceId == deviceId) {
        return videoInput;
      }
    });

    if (curVideoDevice.length != 0 && !curVideoDevice.disabled) {
      return true;
    } else {
      return false;
    }
  };
  /**isVideoUsableDevice：判断是否存在当前设备，并且如果存在当前所选的设备是否可用
   * 参数：deviceId
   * **/


  this.isAudioUsableDevice = deviceId => {
    if (this.Stream.isCancelSetStream) {
      return;
    }

    let curAudioDevice = this.AudioInputList.filter(audioInput => {
      if (audioInput.deviceId == deviceId) {
        return audioInput;
      }
    });

    if (curAudioDevice.length != 0 && !curAudioDevice.disabled) {
      return true;
    } else {
      return false;
    }
  };
  /*获取媒体信息错误处理：
      *    NotAllowedError：当用户拒绝（或者之前拒绝过）摄像头或者麦克风的使用，用户自己操作摄像头和麦克风禁止，点击浏览器的权限设置
      *    NotReadableError:被占用、设置在电脑设置中关闭
      *    NotFoundError:没有设备,当你通过约束请求一个视频轨道但是用户没有摄像头的时候，这个错误就会出现。还有，当你请求一个音频/麦克风轨道的时候，但是电脑/设备并没有声卡或者录音设备被系统禁用的时候也会出现这个错误。但是这种情况比较罕见。
      *
      */

  /**
   * 获取audioStream：
   *     参数：config 值为：deviceId: (1)选择的设置deviceId (2)初始化默认AudioInputList的第一位。
   * **/


  this.getAudioMediaStream = async config => {
    if (this.Stream.audioStream) {
      this.trackStop(1);
      this.Stream.audioStream = null;
    }

    if (this.Stream.isCancelSetStream) {
      let errInfo = {
        code: 1,
        msg: '改设置已被取消'
      };
      return errInfo;
    }
    let deviceId = config && config.deviceId ? config.deviceId : this.AudioInputList[0] && this.AudioInputList[0].deviceId ? this.AudioInputList[0].deviceId : '';
    let audioConfig = {
      audio: {
        deviceId: deviceId
      }
    };
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia(audioConfig).then(stream => {
        if (this.Stream.isCancelSetStream) {
          this.trackStop(1);
          resolve({
            code: 1,
            msg: '改设置已被取消'
          });
          return;
        }
        this.Stream.audioStream = stream;
        resolve(stream);
      }).catch(err => {
        let errInfo = {
          code: 1,
          msg: err
        };

        if (err.name == 'NotReadableError') {
          errInfo.msg = err;
        } else if (err.name == 'NotAllowedError') {
          errInfo.msg = err;
        } else if (err.name == 'NotFoundError') {
          errInfo.msg = err;
        }

        resolve(errInfo);
      });
    });
  };
  /**
   * 获取VideoStream：
   *     参数：config 值为：deviceId: (1)选择的设置deviceId (2)初始化默认VideoInputList的第一位。
   * 返回：
   *    成功： 返回videoStream
   *    失败： 返回错误信息
   * **/
  // this.getVideoMediaStream = async(config) =>{
  //     if(this.Stream.videoStream){
  //         this.trackStop(0);
  //         this.Stream.videoStream = null
  //     };
  //     if(this.Stream.isCancelSetStream){let errInfo = {
  //       code:1,
  //       msg:'该设置已被取消'
  //     }; return errInfo}
  //     if(config && config.deviceId){
  //     var  deviceId = {
  //        deviceId: config && config.deviceId ? config.deviceId:this.VideoInputList[0].deviceId,
  //     }}else {
  //       deviceId = true
  //     }
  //     let videoConfig =  {
  //         video:deviceId,
  //         aspectRatio:1.7777777778
  //     };
  //   return new Promise((resolve,reject)=>{
  //         navigator.mediaDevices.getUserMedia(videoConfig).then(async(stream)=>{
  //             this.Stream.videoStream = stream;
  //             this.Stream.videoStream = await this.webrtc.setVideoConstraints(stream,0);
  //             console.log(this.Stream.isCancelSetStream);
  //             if(this.Stream.isCancelSetStream){
  //                 await this.trackStop(0);
  //                 resolve({
  //                         code:1,
  //                         msg:'改设置已被取消'
  //                 });
  //                 return
  //             }
  //             resolve(this.Stream.videoStream)
  //         }).catch(err=>{
  //             let errInfo = {
  //                 code:1,
  //                 msg:err
  //             };
  //             if(err.name == 'NotReadableError'){
  //                 errInfo.msg = CONFERENCEMEET.DEVICE_OCCUPY
  //             }else if(err.name == 'NotAllowedError'){
  //                 errInfo.msg = CONFERENCEMEET.DEVICE_REJECE
  //             }else if(err.name == 'NotFoundError'){
  //                 errInfo.msg = CONFERENCEMEET.DEVICE_NOFOUND
  //             }
  //             resolve(errInfo)
  //         })
  //     })
  // };

  /**切换扬声器changeAudioDestination
   *      参数：videoElement   sinkId
   * ***/


  this.changeAudioDestination = (sinkId, src) => {
    if (!this.audio) {
      this.audio = new Audio();
    }

    return new Promise(async (resolve, reject) => {
      this.audio.src = src;
      this.audio.loop = true;

      if (sinkId) {
        this.audio.setSinkId(sinkId);
      }
      this.audio.play();
    });
  };
  /*停止音频活动*/


  this.stopAudioDestination = () => {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  };
  /**track stop video and audio
   * type:0(video) 1（audio） 2（all）
   * */


  this.trackStop = async type => {
    if (this.Stream.videoStream && (type == 0 || type == 2)) {
      for (var i = 0; i < this.Stream.videoStream.getVideoTracks().length; i++) {
        this.Stream.videoStream.getVideoTracks()[i].stop();
        this.Stream.videoStream.removeTrack(this.Stream.videoStream.getVideoTracks()[i]);
        console.log(11111);
      }
      this.Stream.videoStream = null;
    }

    if (this.Stream.audioStream && (type == 1 || type == 2)) {
      for (var i = 0; i < this.Stream.audioStream.getAudioTracks().length; i++) {
        this.Stream.audioStream.getAudioTracks()[i].stop();
        this.Stream.audioStream.removeTrack(this.Stream.audioStream.getAudioTracks()[i]);
      }
      this.Stream.audioStream = null;
    }
  };
};

var layout = [
	{
		id: "1",
		primary: "default",
		region: [
			{
				id: "1",
				shape: "rectangle",
				area: {
					left: "0",
					top: "0",
					width: "1",
					height: "1"
				}
			}
		]
	},
	{
		id: "2",
		primary: "default",
		region: [
			{
				id: "1",
				shape: "rectangle",
				area: {
					left: "0",
					top: "1/4",
					width: "1/2",
					height: "1/2"
				}
			},
			{
				id: "2",
				shape: "rectangle",
				area: {
					left: "1/2",
					top: "1/4",
					width: "1/2",
					height: "1/2"
				}
			}
		]
	},
	{
		id: "3",
		primary: "default",
		region: [
			{
				id: "1",
				shape: "rectangle",
				area: {
					left: "1/4",
					top: "0",
					width: "1/2",
					height: "1/2"
				}
			},
			{
				id: "2",
				shape: "rectangle",
				area: {
					left: "0",
					top: "1/2",
					width: "1/2",
					height: "1/2"
				}
			},
			{
				id: "3",
				shape: "rectangle",
				area: {
					left: "1/2",
					top: "1/2",
					width: "1/2",
					height: "1/2"
				}
			}
		]
	},
	{
		id: "4",
		primary: "default",
		region: [
			{
				id: "1",
				shape: "rectangle",
				area: {
					left: "0",
					top: "0",
					width: "1/2",
					height: "1/2"
				}
			},
			{
				id: "2",
				shape: "rectangle",
				area: {
					left: "1/2",
					top: "0",
					width: "1/2",
					height: "1/2"
				}
			},
			{
				id: "3",
				shape: "rectangle",
				area: {
					left: "0",
					top: "1/2",
					width: "1/2",
					height: "1/2"
				}
			},
			{
				id: "4",
				shape: "rectangle",
				area: {
					left: "1/2",
					top: "1/2",
					width: "1/2",
					height: "1/2"
				}
			}
		]
	},
	{
		id: "5",
		primary: "default",
		region: [
			{
				id: "1",
				shape: "rectangle",
				area: {
					left: "0",
					top: "0",
					width: "2/3",
					height: "2/3"
				}
			},
			{
				id: "2",
				shape: "rectangle",
				area: {
					left: "2/3",
					top: "0",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "3",
				shape: "rectangle",
				area: {
					left: "2/3",
					top: "1/3",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "4",
				shape: "rectangle",
				area: {
					left: "0",
					top: "2/3",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "5",
				shape: "rectangle",
				area: {
					left: "1/3",
					top: "2/3",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "6",
				shape: "rectangle",
				area: {
					left: "2/3",
					top: "2/3",
					width: "1/3",
					height: "1/3"
				}
			}
		]
	},
	{
		id: "6",
		primary: "default",
		region: [
			{
				id: "1",
				shape: "rectangle",
				area: {
					left: "0",
					top: "0",
					width: "3/4",
					height: "3/4"
				}
			},
			{
				id: "2",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "0",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "3",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "1/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "4",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "5",
				shape: "rectangle",
				area: {
					left: "0",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "6",
				shape: "rectangle",
				area: {
					left: "1/4",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "7",
				shape: "rectangle",
				area: {
					left: "1/2",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "8",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			}
		]
	},
	{
		id: "7",
		primary: "default",
		region: [
			{
				id: "1",
				shape: "rectangle",
				area: {
					left: "0",
					top: "0",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "2",
				shape: "rectangle",
				area: {
					left: "1/3",
					top: "0",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "3",
				shape: "rectangle",
				area: {
					left: "2/3",
					top: "0",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "4",
				shape: "rectangle",
				area: {
					left: "0",
					top: "1/3",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "5",
				shape: "rectangle",
				area: {
					left: "1/3",
					top: "1/3",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "6",
				shape: "rectangle",
				area: {
					left: "2/3",
					top: "1/3",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "7",
				shape: "rectangle",
				area: {
					left: "0",
					top: "2/3",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "8",
				shape: "rectangle",
				area: {
					left: "1/3",
					top: "2/3",
					width: "1/3",
					height: "1/3"
				}
			},
			{
				id: "9",
				shape: "rectangle",
				area: {
					left: "2/3",
					top: "2/3",
					width: "1/3",
					height: "1/3"
				}
			}
		]
	},
	{
		id: "8",
		primary: "default",
		region: [
			{
				id: "1",
				shape: "rectangle",
				area: {
					left: "1/4",
					top: "1/4",
					width: "1/2",
					height: "1/2"
				}
			},
			{
				id: "2",
				shape: "rectangle",
				area: {
					left: "0",
					top: "0",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "3",
				shape: "rectangle",
				area: {
					left: "1/4",
					top: "0",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "4",
				shape: "rectangle",
				area: {
					left: "1/2",
					top: "0",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "5",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "0",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "6",
				shape: "rectangle",
				area: {
					left: "0",
					top: "1/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "7",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "1/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "8",
				shape: "rectangle",
				area: {
					left: "0",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "9",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "10",
				shape: "rectangle",
				area: {
					left: "0",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "11",
				shape: "rectangle",
				area: {
					left: "1/4",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "12",
				shape: "rectangle",
				area: {
					left: "1/2",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "13",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			}
		]
	},
	{
		id: "9",
		primary: "default",
		region: [
			{
				id: "1",
				shape: "rectangle",
				area: {
					left: "0",
					top: "0",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "2",
				shape: "rectangle",
				area: {
					left: "1/4",
					top: "0",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "3",
				shape: "rectangle",
				area: {
					left: "2/4",
					top: "0",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "4",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "0",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "5",
				shape: "rectangle",
				area: {
					left: "0",
					top: "1/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "6",
				shape: "rectangle",
				area: {
					left: "1/4",
					top: "1/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "7",
				shape: "rectangle",
				area: {
					left: "2/4",
					top: "1/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "8",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "1/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "9",
				shape: "rectangle",
				area: {
					left: "0",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "10",
				shape: "rectangle",
				area: {
					left: "1/4",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "11",
				shape: "rectangle",
				area: {
					left: "2/4",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "12",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "13",
				shape: "rectangle",
				area: {
					left: "0",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "14",
				shape: "rectangle",
				area: {
					left: "1/4",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "15",
				shape: "rectangle",
				area: {
					left: "2/4",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			},
			{
				id: "16",
				shape: "rectangle",
				area: {
					left: "3/4",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				}
			}
		]
	},
	{
		id: "10",
		primary: "default",
		region: [
			{
				area: {
					left: "0",
					top: "0",
					width: "1/2",
					height: "1/2"
				},
				id: "1",
				shape: "rectangle"
			},
			{
				area: {
					left: "1/2",
					top: "0",
					width: "1/2",
					height: "1/2"
				},
				id: "2",
				shape: "rectangle"
			},
			{
				area: {
					left: "0",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				},
				id: "3",
				shape: "rectangle"
			},
			{
				area: {
					left: "1/4",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				},
				id: "4",
				shape: "rectangle"
			},
			{
				area: {
					left: "1/2",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				},
				id: "5",
				shape: "rectangle"
			},
			{
				area: {
					left: "3/4",
					top: "1/2",
					width: "1/4",
					height: "1/4"
				},
				id: "6",
				shape: "rectangle"
			},
			{
				area: {
					left: "0",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				},
				id: "7",
				shape: "rectangle"
			},
			{
				area: {
					left: "1/4",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				},
				id: "8",
				shape: "rectangle"
			},
			{
				area: {
					left: "1/2",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				},
				id: "9",
				shape: "rectangle"
			},
			{
				area: {
					left: "3/4",
					top: "3/4",
					width: "1/4",
					height: "1/4"
				},
				id: "10",
				shape: "rectangle"
			}
		]
	},
	{
		id: "11",
		primary: "default",
		region: [
			{
				area: {
					left: "0",
					top: "3/28",
					width: "1/2",
					height: "1/2"
				},
				id: "1",
				shape: "rectangle"
			},
			{
				area: {
					left: "1/2",
					top: "3/28",
					width: "1/2",
					height: "1/2"
				},
				id: "2",
				shape: "rectangle"
			},
			{
				area: {
					left: "0",
					top: "17/28",
					width: "1/7",
					height: "1/7"
				},
				id: "3",
				shape: "rectangle"
			},
			{
				area: {
					left: "1/7",
					top: "17/28",
					width: "1/7",
					height: "1/7"
				},
				id: "4",
				shape: "rectangle"
			},
			{
				area: {
					left: "2/7",
					top: "17/28",
					width: "1/7",
					height: "1/7"
				},
				id: "5",
				shape: "rectangle"
			},
			{
				area: {
					left: "3/7",
					top: "17/28",
					width: "1/7",
					height: "1/7"
				},
				id: "6",
				shape: "rectangle"
			},
			{
				area: {
					left: "4/7",
					top: "17/28",
					width: "1/7",
					height: "1/7"
				},
				id: "7",
				shape: "rectangle"
			},
			{
				area: {
					left: "5/7",
					top: "17/28",
					width: "1/7",
					height: "1/7"
				},
				id: "8",
				shape: "rectangle"
			},
			{
				area: {
					left: "6/7",
					top: "17/28",
					width: "1/7",
					height: "1/7"
				},
				id: "9",
				shape: "rectangle"
			},
			{
				area: {
					left: "0",
					top: "21/28",
					width: "1/7",
					height: "1/7"
				},
				id: "10",
				shape: "rectangle"
			},
			{
				area: {
					left: "1/7",
					top: "21/28",
					width: "1/7",
					height: "1/7"
				},
				id: "11",
				shape: "rectangle"
			},
			{
				area: {
					left: "2/7",
					top: "21/28",
					width: "1/7",
					height: "1/7"
				},
				id: "12",
				shape: "rectangle"
			},
			{
				area: {
					left: "3/7",
					top: "21/28",
					width: "1/7",
					height: "1/7"
				},
				id: "13",
				shape: "rectangle"
			},
			{
				area: {
					left: "4/7",
					top: "21/28",
					width: "1/7",
					height: "1/7"
				},
				id: "14",
				shape: "rectangle"
			},
			{
				area: {
					left: "5/7",
					top: "21/28",
					width: "1/7",
					height: "1/7"
				},
				id: "15",
				shape: "rectangle"
			},
			{
				area: {
					left: "6/7",
					top: "21/28",
					width: "1/7",
					height: "1/7"
				},
				id: "16",
				shape: "rectangle"
			}
		]
	}
];
var videoDefaultLayout = {
	layout: layout
};

function webrtc() {
  /****封装ics的方法和属性****/

  /***(1)joinRoom:参数Token 返回：res：结果：remoteStreams participants 和id  ***/

  /**********/
  class WEBrtc extends EventDispatcher {
    constructor() {
      super();
      this.publishLocal = {
        publishStream: null,
        publication: null,
        isPublishIng: false,
        publishArray: [],
        errInfo: {
          video: null,
          audio: null
        }
      }, this.publishShare = {
        shareStream: null,
        publication: null,
        isPublishIng: false
      }, this.subscribeMixed = {
        mixedStream: null,
        subStream: null,
        isSubscribeIng: false,
        subscription: null,
        subscribeArray: []
      }, this.subscribeShare = {
        shareStream: null,
        subscription: null
      }, this.subscribeRemote = {
        remoteStream: null,
        subscription: null
      };
      this.conference = new Conference.ConferenceClient();
      this.analyser = null;
      this.microphone = null;
      this.audioContext = null; // this.streamadded = ()=>{};
      // this.streamended = ()=>{};
      // this.participantjoined = ()=>{};
      // this.participantleave= ()=>{};
      // this.messagereceived = ()=>{};
      // this.serverdisconnected =()=>{};
      // this.recollectfailed =()=>{};
      // this.subscribeMixended =()=>{};
      // this.publicLocalended = ()=>{};
      // this.subscribeMixerr = ()=>{};
      // this.subscribeShareended = ()=>{};
      // this.audiostatuschange =()=>{};
      // this.roomStatusChange =()=>{};
      // this.exitRoomEvent = ()=>{};
      // this.iceStatusChange = ()=>{};
      // this.eventListener();

      this.videoLayoutChange = () => {};

      this.voiceStimulationChange = () => {};

      this.constraints = {
        video: {},
        audio: {}
      };
      this.setInfo = {
        audio: true,
        video: true,
        isVideoSource: true,
        isAudioSource: true,
        isHangup: false
      };
      this.receiverCsrc = {
        audio: null,
        video: null,
        videoCsrc: [],
        //元数据
        allLayoutDataList: [],
        //从服务器获取的所有布局信息
        layoutId: null,
        startTime: null
      };
      this.setUp = new SetUp(); // this.setConfig();
    }

    init(token) {
      if (!this.conference) {
        this.conference = new Conference.ConferenceClient();
      }

      return new Promise((resolve, reject) => {
        this.conference.join(token).then(async currentConferenceMsg => {
          currentConferenceMsg.participants.forEach(participant => {
            participant.addEventListener('left', () => {
              this.participantleave(participant);
            });
          });
          resolve(currentConferenceMsg);
          let shareStream = currentConferenceMsg.remoteStreams.filter(shareStream => {
            if (shareStream.source.video == 'screen-cast') {
              return shareStream;
            }
          });

          if (shareStream.length != 0) {
            shareStream[0].addEventListener('ended', () => {
              this.streamended(shareStream[0]);
            });
          }
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      });
    }

    async createLoaclStream(cameraDevideId, micDeviceId) {
      this.setInfo.video = true;
      this.setInfo.audio = true;
      this.setTrackStop();
      await this.setUp.updateDeviceList();
      let audioInputList = this.setUp.AudioInputList,
          videoInputList = this.setUp.VideoInputList;
      var cameraDId = cameraDevideId != undefined ? cameraDevideId : true;
      var micDid = micDeviceId != undefined ? micDeviceId : true;
      /*创建系统默认视频流*/

      var localVideoStream = await this.createStream(cameraDId, null);

      if (localVideoStream && localVideoStream.code) {
        /*创建可用视频流*/
        if (videoInputList) {
          localVideoStream = await this.getUsableDevide(videoInputList, 'video');
          /**没有可用摄像头设备**/

          if (localVideoStream && localVideoStream.code) {
            this.publishLocal.errInfo.video = localVideoStream;
            /**存在可用设备**/
          } else {
            this.publishLocal.publishStream = localVideoStream;
          }
        }
      } else {
        this.publishLocal.publishStream = localVideoStream;
      }
      /**创建麦克风流**/


      var localAudioStream = await this.createStream(null, micDid);

      if (localAudioStream && localAudioStream.code) {
        this.publishLocal.errInfo.audio = localAudioStream;
      } else if (this.publishLocal.publishStream) {
        if (localAudioStream && localAudioStream.getAudioTracks) {
          this.publishLocal.publishStream = null;
          localVideoStream.addTrack(localAudioStream.getAudioTracks()[0]);
          this.publishLocal.publishStream = localVideoStream;
        }
      } else if (!this.publishLocal.publishStream) {
        this.publishLocal.publishStream = localAudioStream;
      }

      this.addEventTrackEnded();

      if (this.setInfo.isHangup) {
        this.setTrackStop();
        return;
      }
    }
    /**根据设备列表-寻找可用的媒体设备
     *  type: audio / video
     *  deviceList: audioDeviceList / videoDeviceList
     *  return promise
     * **/


    async getUsableDevide(deviceList, type) {
      return new Promise(async (resolve, reject) => {
        if (deviceList.length != 0) {
          for (const device of deviceList) {
            if (type == 'video') {
              var usableMediaStream = await this.createStream(device.deviceId, null);
            } else {
              var usableMediaStream = await this.createStream(null, device.deviceId);
            }

            if (usableMediaStream && !usableMediaStream.code) {
              break;
            }
          }

          resolve(usableMediaStream);
        } else {
          //没有可用设备返回code:1
          // 补充info信息
          resolve({
            code: 1,
            info: {
              name: 'NotAllowedError'
            }
          });
        }
      });
    }
    /****创建流***/


    setConfig(cameraDevideId, micDeviceId) {
      // optional: [
      //   //{sourceId: audio_source},
      //   {googAutoGainControl: false},
      //   {googAutoGainControl2: false},
      //   {googEchoCancellation: false},
      //   {googEchoCancellation2: false},
      //   {googNoiseSuppression: false},
      //   {googNoiseSuppression2: false},
      //   {googHighpassFilter: false},
      //   {googTypingNoiseDetection: false},
      //   {googAudioMirroring: false}
      // ]
      if (sysInfo$3().runtime.name == "Firefox" && Number(sysInfo$3().runtime.version) > 43 || sysInfo$3().runtime.name == "Edge" && Number(sysInfo$3().runtime.version) > 10527 || sysInfo$3().runtime.name == "Chrome" && Number(sysInfo$3().runtime.version) > 56) {
        if (cameraDevideId && this.setInfo.video) {
          this.constraints.video = {};
          this.constraints.video['deviceId'] = {
            'exact': cameraDevideId
          };
        } else if (!cameraDevideId && this.setInfo.video) {
          this.constraints.video = true;
        } else if (!this.setInfo.video) {
          this.constraints.video = false;
        }

        if (micDeviceId && this.setInfo.audio) {
          this.constraints.audio = {};
          this.constraints.audio = {
            'optional': [{
              sourceId: micDeviceId
            }]
          };
        } else if (!micDeviceId && this.setInfo.audio) {
          this.constraints.audio = {
            // optional: [
            //   {sampleRate:16000}
            //   //{sourceId: audio_source},
            //   // {googAutoGainControl: true},
            //   // {googAutoGainControl2: true},
            //   // {googEchoCancellation: true},
            //   // {googEchoCancellation2: true},
            //   // {googNoiseSuppression: true},
            //   // {googNoiseSuppression2: true},
            //   // {googHighpassFilter: true},
            //   // {googTypingNoiseDetection: true},
            //   // {googAudioMirroring: true}
            // ]
            sampleRate: 16000
          };
        } else if (!this.setInfo.audio) {
          this.constraints.audio = false;
        }

        return;
      } else if (sysInfo$3().runtime.name == "Chrome" && Number(sysInfo$3().runtime.version) > 56) {
        this.constraints.video = {
          mandatory: {
            sourceId: cameraDevideId
          },
          optional: [{
            minWidth: 320
          }, {
            minWidth: 640
          }, {
            minWidth: 1024
          }, {
            minWidth: 1280
          }]
        };
        this.constraints.audio = {
          mandatory: {
            sourceId: micDeviceId
          }
        };
      } else if (sysInfo$3().runtime.name == "Chrome" && Number(sysInfo$3().runtime.version) <= 56) {
        this.constraints.video = {
          width: 1280,
          heigth: 720,
          framerate: 30
        };
        this.constraints.audio = true;
      }
    }

    async createStream(cameraDevideId, micDeviceId) {
      if (this.setInfo.isHangup) return;
      await this.setConfig(cameraDevideId, micDeviceId);

      if (!this.constraints.audio && !this.constraints.video) {
        return new Promise((resolve, reject) => {
          resolve(false);
        });
      } else {
        var constraints = cameraDevideId ? {
          video: this.constraints.video
        } : {
          audio: this.constraints.audio
        };

        if (constraints.video && constraints.video.deviceId && constraints.video.deviceId.exact == true) {
          constraints.video = true;
        }
        return new Promise((resolve, reject) => {
          navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log(constraints);
            navigator.mediaDevices.getUserMedia(constraints).then(async mediaStream => {
              resolve(this.getMediaStreamSuccess(mediaStream));
            }).catch(err => {
              console.log(err);
              resolve({
                code: 1,
                info: err
              }); // resolve(this.getMediaStreamErr(err));
            });
          } else if (navigator.getMedia) {
            navigator.getMedia(constraints).then(async mediaStream => {
              resolve(this.getMediaStreamSuccess(mediaStream));
            }).catch(err => {
              resolve({
                code: 1,
                info: err
              });
            });
          } else {
            resolve({
              code: 1,
              info: '浏览器不支持'
            });
          }
        });
      }
    }

    async getMediaStreamSuccess(mediaStream) {
      const videotrack = mediaStream.getVideoTracks()[0];
      const audiotrack = mediaStream.getAudioTracks()[0];

      if (videotrack || audiotrack) {
        var mediaStreams = null;

        if (videotrack) {
          mediaStreams = await this.setVideoConstraints(mediaStream, 0);
        } // if(audiotrack){mediaStreams = await this.setAudioConstraints(mediaStream);}


        return mediaStream;
      } else {
        return mediaStream;
      }
    }
    /**
     * type:audio/video
     * **/


    async createVideoorAudioStream(deviceId, type, status) {
      if (this.setInfo.isHangup) return;
      await this.setUp.updateDeviceList();
      let InputList = type == 'video' ? this.setUp.VideoInputList : this.setUp.AudioInputList;
      return new Promise(async (resolve, reject) => {
        /*在设置页面：点击切换*/
        if (status == 'changeDevice') {
          if (type == 'video') {
            var newStream = await this.createStream(deviceId, null);
          } else {
            var newStream = await this.createStream(null, deviceId);
          }
        } else {
          var newStream = await this.getUsableDevide(InputList, type);
        }

        if (newStream && newStream.code) {
          reject(newStream);
          return;
        }

        if (this.publishLocal.publishStream) {
          if (type == 'video') {
            var oldStreamTrack = this.publishLocal.publishStream.getVideoTracks ? this.publishLocal.publishStream.getVideoTracks()[0] : false;
            var replaceStreamTrack = newStream.getVideoTracks()[0];
          } else {
            var oldStreamTrack = this.publishLocal.publishStream.getAudioTracks ? this.publishLocal.publishStream.getAudioTracks()[0] : false;
            var replaceStreamTrack = newStream.getAudioTracks()[0];
          }

          if (oldStreamTrack) {
            this.publishLocal.publishStream.removeTrack(oldStreamTrack);
            oldStreamTrack.stop();
          }

          this.publishLocal.publishStream.addTrack(replaceStreamTrack);
          resolve();
        } else {
          this.publishLocal.publishStream = newStream;
          resolve();
        }
      }); // return new Promise((resolve,reject)=>{
      //     navigator.mediaDevices.getUserMedia(container).then(async stream => {
      //         var newStream = stream;
      //         if(type == 'video'){
      //             newStream = await this.setVideoConstraints(stream,0);
      //             if(this.publishLocal.publishStream && this.publishLocal.publishStream.getAudioTracks()[0] && !this.publishLocal.publishStream.getVideoTracks()[0]){
      //                 this.publishLocal.publishStream.addTrack(stream.getVideoTracks()[0]);
      //                 resolve();
      //                 return;
      //             }else if(this.publishLocal.publishStream && this.publishLocal.publishStream.getVideoTracks()[0]){
      //                 let oldStreamTrack = this.publishLocal.publishStream.getVideoTracks()[0];
      //                 this.publishLocal.publishStream.removeTrack(oldStreamTrack);
      //                 oldStreamTrack.stop();
      //                 this.publishLocal.publishStream.addTrack(newStream.getVideoTracks()[0]);
      //                 resolve();
      //                 return;
      //             }else{
      //                 this.publishLocal.publishStream = newStream;
      //                 resolve();
      //                 return;
      //             }
      //         }else if(type == 'audio'){
      //             if(this.publishLocal.publishStream && this.publishLocal.publishStream.getVideoTracks()[0] && !this.publishLocal.publishStream.getAudioTracks()[0]){
      //                 this.publishLocal.publishStream.addTrack(stream.getAudioTracks()[0]);
      //                 resolve();
      //                 return;
      //             }else if(this.publishLocal.publishStream &&  this.publishLocal.publishStream.getAudioTracks()[0]){
      //                 let oldStreamTrack = this.publishLocal.publishStream.getAudioTracks()[0];
      //                 this.publishLocal.publishStream.removeTrack(oldStreamTrack);
      //                 oldStreamTrack.stop();
      //                 this.publishLocal.publishStream.addTrack(newStream.getAudioTracks()[0]);
      //                 resolve();
      //                 return;
      //             }else{
      //                 this.publishLocal.publishStream = newStream;
      //                 resolve();
      //                 return;
      //             }
      //         };
      //     }).catch(err=>{
      //       reject({code:1,info:err,type:type})
      //     })
      // })
    }

    async getMediaStreamErr(err) {
      await checkDeviceSupport((hasWebcam, hasMicrophone, isMicrophoneAlreadyCaptured, isWebcamAlreadyCaptured) => {
        this.setInfo.video = this.setInfo.video && hasWebcam && isWebcamAlreadyCaptured;
        this.setInfo.audio = this.setInfo.audio && hasMicrophone && isMicrophoneAlreadyCaptured;
      });
      /*获取媒体信息错误处理：
      *    NotAllowedError：当用户拒绝（或者之前拒绝过）摄像头或者麦克风的使用，用户自己操作摄像头和麦克风禁止，点击浏览器的权限设置
      *    NotReadableError:被占用、设置在电脑设置中关闭
      *    NotFoundError:没有设备,当你通过约束请求一个视频轨道但是用户没有摄像头的时候，这个错误就会出现。
      *    还有，当你请求一个音频/麦克风轨道的时候，但是电脑/设备并没有声卡或者录音设备被系统禁用的时候也会出现这个错误。但是这种情况比较罕见。
      * */

      if (err.name == 'NotFoundError' || err.name == 'NotAllowedError' || err.name == 'NotReadableError') {
        if (err.message == 'Could not start video source') {
          if (!this.setInfo.isVideoSource) {
            this.setInfo.video = false;
          }
          this.setInfo.isVideoSource = false;
        }

        if (err.message == 'Could not start audio source') {
          this.setInfo.audio = false;
        }

        console.log(this.setInfo);
        let mediaStream = await this.createStream(null, null);
        return mediaStream;
      } else if (err.name == 'OverconstrainedError' && !err.message) {
        let mediaStream = await this.createStream(null, null);
        return mediaStream;
      }
    }
    /*****发布本地流*****/


    _publishLocalStream() {

      return new Promise(async (resolve, reject) => {
        // if(this.publishLocal && this.publishLocal.publishStream && this.publishLocal.publishStream.getVideoTracks().length != 0 && this.publishLocal.publishStream.getVideoTracks()[0].readyState == "ended"){
        //   await this.createLoaclStream()
        // }

        /*******发布本地的流媒体****/
        if (this.publishLocal.publishStream) {
          let localStream = new Base.LocalStream(this.publishLocal.publishStream, new Base.StreamSourceInfo(Base.AudioSourceInfo.MIC, Base.VideoSourceInfo.CAMERA));
          let codec = sysInfo$3().runtime.name == "Firefox" ? 'vp8' : 'h264';
          const videoOptions = this.publishLocal.publishStream.getVideoTracks().length != 0 ?  [{
            codec: {
              name: codec,
              profile: ''
            },
            maxBitrate: 2000
          }] : false;
          this.conference.publish(localStream, {
            video:videoOptions
          }).then(async publication => {
            if (this.publishLocal.publication) {
              this.publishLocal.publication.stop();
            }

            this.publishLocal.publication = publication; // this.setDegradation(0,0);

            this.setVideoRtpParameters(0);
            publication.addEventListener('ended', info => {
              if (!this.publishLocal.isPublishIng) {
                this.publicLocalended(info);
              }
            });
            publication.addEventListener('error', error => {
              console.log(error);

              if (!this.publishLocal.isPublishIng) {
                this.publicLocalended(error);
              }
            });
            resolve(this.publishLocal.publication);
          }).catch(err => {
            reject(err);
          });
        } else {
          resolve(false);
        }
      });
    }
    /**发布本地流及错误处理**/


    publishLocalStream() {
      // if(this.publishLocal.isPublishIng || this.setInfo.isHangup){return}
      this.publishLocal.isPublishIng = true; // if(this.publishLocal.publication){this.publishLocal.publication.stop();this.publishLocal.publication = null};
      // var publishLocalTimer = null;

      return new Promise((resolve, reject) => {
        this._publishLocalStream().then(publication => {
          // this.publishLocal.publishArray.forEach(async(publication,index)=>{await publication.stop();this.publishLocal.publishArray.splice(index,1)})
          this.publishLocal.isPublishIng = false; //  this.publishLocal.publishArray.push(publication);clearTimeout(publishLocalTimer);

          resolve(publication);
        }).catch(err => {
          reject({
            code: 1,
            errInfo: '发布不成功'
          });
        }); // publishLocalTimer= setTimeout(()=>{
        //     console.log('10秒发布不成功');
        //     reject({code:1,errInfo:'timeOut'});
        //     this.publishLocal.isPublishIng = false;
        //     // if(!this.publishLocal.publication){
        //     //     this.publishLocalStream();
        //     //     clearTimeout(publishLocalTimer)
        //     // }
        // },10000);

      });
    }
    /**创建共享流*/


    async createShareStream(config) {
      let shareStream = await Base.MediaStreamFactory.createMediaStream(config);
      return new Promise(async (resolve, reject) => {
        if (!shareStream.code) {
          await this.setApplyConstraints(shareStream, {
            frameRate: {
              exact: 15
            }
          });
        }
        resolve(shareStream);
      });
    }
    /******发布屏幕共享流****/


    publishShareScreen(config) {
      return new Promise(async (resolve, reject) => {
        this.publishShare.isPublishIng = true;
        this.publishShare.shareStream = await this.createShareStream(config).catch(res => {
          return res;
        });

        if (this.publishShare.shareStream.code && sysInfo$3().os.name == 'mac') {
          this.publishShare.isPublishIng = false;
          resolve({
            code: 1
          });
          return;
        }

        this.publishShare.isPublishIng = false;
        let ScreenStream = new Base.LocalStream(this.publishShare.shareStream, new Base.StreamSourceInfo('screen-cast', 'screen-cast'));

        this.conference.publish(ScreenStream, {
          video: [{
            codec: {
              name: 'vp8',
              profile: ''
            },
            frameRate: 15,
            maxBitrate: 4096
          }]
        }).then(async publication => {
          this.publishShare.publication = publication;
          await this.setVideoRtpParameters(1);
          resolve(this.publishShare.publication); //发布结束

          publication.addEventListener('ended', stream => {
            console.log(`屏幕共享流结束：`);
            console.log(stream);
          });
        }).catch(err => {
          reject(err);
        });
      }, err => {
        reject(err);
        console.log('Failed to PUBLISH SCREENSHARESTREAM, ' + err);
      });
    }
    /*****订阅并渲染mixed****/


    _SubscribeMixStream(remoteStream, VideoSubscriptionConstraints) {

      return new Promise((resolve, reject) => {
        let codec = sysInfo$3().runtime.name == "Firefox" ? 'vp8' : 'h264';
        let subOptions = {
          video: VideoSubscriptionConstraints.video != undefined ? VideoSubscriptionConstraints.video : {
            codecs: [{
              name: codec
            }]
          },
          audio: VideoSubscriptionConstraints.audio != undefined ? VideoSubscriptionConstraints.audio :true
        }
        this.conference.subscribe(remoteStream,subOptions).then(async subscription => {
          /*****订阅成功*****/
          // console.log(subscription.getReceivers()[0].getParameters());
          // console.log(subscription.getReceivers()[0].getSynchronizationSources());
          // console.log(await subscription.getReceivers()[1].getStats());
          //                  console.log(subscription.getReceivers()[1].transport);
          //                    subscription.getReceivers()[1].transport.iceTransport.onselectedcandidatepairchange = function(err){
          //                    	console.log(err);
          //                    }
          //                  var Receiverstransport = subscription.getReceivers()[1].transport;
          //                  Receiverstransport.onstatechange = function(err){
          //                  	console.log(err);
          //                  }
          if (this.subscribeMixed.subscription) {
            this.subscribeMixed.subscription.stop();
          }

          remoteStream = Object.assign(remoteStream, {
            'mixedStream': remoteStream.mediaStream,
            'subscription': subscription
          });
          resolve(remoteStream);
          console.log(remoteStream.mixedStream.getVideoTracks()[0]); //                  remoteStream.mixedStream.getVideoTracks()[0].onmute = function(err){
          //                  	 console.log(11111111)
          //                  	 console.log(err)
          //                  }
          //					remoteStream.mixedStream.getVideoTracks()[0].addEventListener('mute',(err)=>{
          //						console.log(22222)
          //						console.log(err)
          //					});

          /*****监听远程流结束时触发****/

          subscription.addEventListener('ended', () => {
            if (!this.subscribeMixed.isSubscribeIng) {
              this.subscribeMixended(remoteStream);
            }
          });
          /*****监听远程流错误时触发****/

          subscription.addEventListener('error', err => {
            console.log(err);

            if (!this.subscribeMixed.isSubscribeIng) {
              this.subscribeMixended(remoteStream);
            }
          });
          /**监听ice失败**/

          subscription.addEventListener('iceStatusChange', data => {
            console.log(data);
            this.iceStatusChange(data.iceStatus);
          });
        }).catch(err => {
          reject(err);
          console.log(`订阅失败:${err}`);
        });
      });
    }

    SubscribeMixStream(remoteStream, VideoSubscriptionConstraints) {
      // if(this.subscribeMixed.isSubscribeIng){return}
      this.subscribeMixed.subStream = remoteStream;
      this.subscribeMixed.isSubscribeIng = true;
      return new Promise((resolve, reject) => {
        this._SubscribeMixStream(remoteStream,VideoSubscriptionConstraints).then(subscription => {
          this.subscribeMixed.subscription = subscription.subscription;
          this.subscribeMixed.mixedStream = subscription.mixedStream;
          this.subscribeMixed.isSubscribeIng = false; // this.subscribeMixed.subscribeArray.push(subscription);clearTimeout(subscribeMixTimer);

          resolve(subscription);
        }).catch(err => {
          reject({
            code: 1,
            info: err
          });
        }); //   subscribeMixTimer = setTimeout(()=>{
        //    reject({code:1,errInfo:'timeOut'});
        //   this.subscribeMixed.isSubscribeIng = false;
        //    clearTimeout(subscribeMixTimer)
        // },10000);

      });
    }
    /**订阅并渲染shareStream**/


    SubscribeShareStream(shareStream, VideoSubscriptionConstraints) {
      let VideoConstraints = VideoSubscriptionConstraints ? VideoSubscriptionConstraints : true; //订阅远程流

      return new Promise((resolve, reject) => {
        this.conference.subscribe(shareStream, {
          audio: false,
          video: VideoConstraints
        }).then(subscription => {
          /*****订阅成功*****/
          this.subscribeShare.subscription = subscription;
          shareStream = Object.assign(shareStream, {
            'streamsrc': shareStream.mediaStream,
            'subscription': subscription
          });
          resolve(shareStream);
          /*****监听远程流结束时触发****/

          subscription.addEventListener('ended', () => {
            this.subscribeShareended(shareStream);
          });
          /*****监听远程流结束时触发****/

          subscription.addEventListener('error', () => {
            this.subscribeShareended(shareStream);
          });
        }).catch(err => {
          reject(err);
          console.log(`订阅失败:${err}`);
        });
      });
    }
    /*订阅单路视频*/


    SubscribeOneVideo(stream, VideoSubscriptionConstraints) {
      let VideoConstraints = VideoSubscriptionConstraints ? VideoSubscriptionConstraints : true;
      return new Promise((resolve, reject) => {
        this.conference.subscribe(stream, {
          audio: false,
          video: VideoConstraints
        }).then(subscription => {
          /*****订阅成功*****/
          let remoteStream = Object.assign(stream, {
            'streamsrc': stream.mediaStream,
            'subscription': subscription
          });
          this.subscribeRemote.remoteStream = remoteStream;
          this.subscribeRemote.subscription = subscription;
          resolve(remoteStream);
          /*****监听远程流结束时触发****/

          subscription.addEventListener('ended', () => {
            this.subscribeRemoteended(remoteStream);
          });
        }).catch(err => {
          reject(err);
          console.log(`订阅单路视频失败:${err}`);
        });
      });
    }

    setAudioConstraints(mediaStream) {
      let audioTrack = mediaStream.getAudioTracks()[0];
      let Capabilities = audioTrack.getCapabilities();
      var constraints = {
        autoGainControl: false,
        echoCancellation: true,
        noiseSuppression: true // sampleRate:16000

      };
      return new Promise((resolve, reject) => {
        audioTrack.applyConstraints(constraints).then(res => {
          resolve(mediaStream);
          console.log(mediaStream.getAudioTracks()[0].getSettings()); // console.log(mediaStream.getAudioTracks()[0]);
        }).catch(e => {
          resolve(mediaStream);
        });
      });
    } //设置媒体video约束值：参数：mediaStream：媒体流
    // streamType： 0(混屏流) 1(共享流)
    //type:0（流畅优先） 1(质量优先)


    async setVideoConstraints(mediaStream, streamType, setResolution) {
      let videoTrack = mediaStream.getVideoTracks()[0];
      var constraints = null;

      if (sysInfo$3().runtime.name == "Firefox") {
        constraints = {
          width: {
            min: 640,
            ideal: 1280
          },
          height: {
            min: 360,
            ideal: 720
          },
          advanced: [{
            width: 1280,
            height: 720
          }, {
            aspectRatio: 1.7777777778
          }]
        };
      } else {
        if (!videoTrack.getCapabilities) return;

        if (!videoTrack.getCapabilities().width) {
          var Capabilities = {
            width: {
              max: 1280
            },
            height: {
              max: 720
            }
          };
        } else {
          var Capabilities = videoTrack.getCapabilities();
        }
        let frameRate = streamType == 0 ? 30 : 15;
        let resolution = {
          width: Capabilities.width.max > 1280 ? 1280 : Capabilities.width.max,
          height: Capabilities.height.max > 720 ? 720 : Capabilities.height.max
        };

        if (setResolution == '360p' && resolution.width > 640 && resolution.height > 360) {
          resolution.width = 640;
          resolution.height = 360;
        } else if (setResolution == '720p' && resolution.width > 1280 && resolution.height > 720) {
          resolution.width = 1280;
          resolution.height = 720;
        } else if (setResolution == '1080p' && resolution.width > 1920 && resolution.height > 1080) {
          resolution.width = 1920;
          resolution.height = 1080;
        }

        constraints = {
          width: {
            min: resolution.width,
            ideal: resolution.width,
            max: resolution.width
          },
          height: {
            min: resolution.width * 9 / 16,
            ideal: resolution.width * 9 / 16,
            max: resolution.width * 9 / 16
          },
          frameRate: {
            ideal: frameRate
          },
          advanced: [{
            frameRate: {
              ideal: frameRate
            }
          }],
          aspectRatio: 1.7777777778
        };
      }

      if (streamType == 0) {
        constraints['aspectRatio'] = 1.7777777778;
      }

      return await this.setApplyConstraints(mediaStream, constraints);
    }
    /**set applyConstraints**/


    setApplyConstraints(mediaStream, constraints) {
      let videoTrack = mediaStream.getVideoTracks()[0];
      return new Promise((resolve, reject) => {
        videoTrack.applyConstraints(constraints).then(res => {
          console.log(videsoTrack.getSettings());
          resolve(mediaStream);
        }).catch(e => {
          resolve(mediaStream);
        });
      });
    }
    /**设置清晰度和流畅优先
     * type:0(默认：流畅优先 maintain-framerate)   1:maintain-resolution(质量优先)
     * mediaType：0(发布本地流) 1(发布共享流)
     * id：publishid
     * **/


    setDegradation(type, mediaType) {
      let publication = mediaType == 0 ? this.publishLocal.publication : this.publishShare.publication;
      publication.getSenders().forEach(async sender => {
        if (sender.track.kind == 'video') {
          const params = sender.getParameters();
          console.log(params);
          let senderTrack = await sender.setParameters(params);
          console.log(sender.getParameters());
        }
      });
    }
    /**设置Video Parameters
     *   mediaType:0本地流 1共享流
     * */


    setVideoRtpParameters(mediaType) {
      let publication = mediaType == 0 ? this.publishLocal.publication : this.publishShare.publication;
      publication.getSenders().forEach(async sender => {
        if (sender.track.kind == 'video') {
          if (!sender.getParameters) return;
          const params = sender.getParameters();
          if (!params.encodings) return;
          params.encodings.forEach(encoding => {
            encoding.maxBitrate = mediaType == 0 ? 1500000 : 2000000;
            encoding.maxFramerate = mediaType == 0 ? 30 : 15;
          });
          await sender.setParameters(params);
        } else if (sender.track.kind == 'audio') {
          if (!sender.getParameters) return;
          var audioparams = sender.getParameters();
          console.log(audioparams);
        }
      });
    }
    /*获取发送的统计信息
    * 参数：publication*/


    async getSendStatus(publication) {
      let sendReport = [];
      let sendStatus = {
        audio: null,
        video: null
      }; //          console.log(publication);

      if (!publication || !publication.getStats) return;
      let satus = await publication.getStats();

      if (sysInfo$3().runtime.name == "Firefox") {
        for (const stat of satus.values()) {
          //              console.log(stat);
          switch (stat.type) {
            case "outbound-rtp":
              {
                //                  console.log(stat);
                if (stat.kind == 'video') {
                  sendStatus.video = stat;
                } else {
                  sendStatus.audio = stat;
                }

                break;
              }
          }
        }
      } else {
        satus.forEach(report => {
          sendReport.push(report);
        });
        sendReport.forEach(reportstats => {
          if (reportstats.mediaType && reportstats.mediaType == 'audio') {
            sendStatus.audio = reportstats;
          } else if (reportstats.mediaType && reportstats.mediaType == 'video') {
            sendStatus.video = reportstats;
          }
        });
      }

      return sendStatus;
    }
    /**
     *获取接收统计信息
     * 参数：subscription,streamTrack
     * **/


    async getReceiveStats(subscription) {
      let ReceiveReport = [];
      let ReceiveStats = {
        audio: null,
        video: null
      };
      if (!subscription || !subscription.getStats) return;
      let stats = await subscription.getStats(); //          console.log(stats.values())

      if (sysInfo$3().runtime.name == "Firefox") {
        for (const stat of stats.values()) {
          //             console.log(stat);
          switch (stat.type) {
            case "inbound-rtp":
              {
                //	                    console.log(stat);
                if (stat.kind == 'video') {
                  ReceiveStats.video = stat;
                } else {
                  ReceiveStats.audio = stat;
                }

                break;
              }
          }
        }
      } else {
        stats.forEach(report => {
          ReceiveReport.push(report);
        });
        ReceiveReport.forEach(reportstats => {
          if (reportstats.mediaType && reportstats.mediaType == 'audio') {
            ReceiveStats.audio = reportstats;
            ReceiveStats.audio.lostpacketrate = parseInt(reportstats.packetsLost / (reportstats.packetsLost + reportstats.packetsReceived) * 100); //	                    console.log(ReceiveStats.audio);
          } else if (reportstats.mediaType && reportstats.mediaType == 'video') {
            ReceiveStats.video = reportstats;
            ReceiveStats.video.lostpacketrate = parseInt(reportstats.packetsLost / (reportstats.packetsLost + reportstats.packetsReceived) * 100);
          }
        });
      } //          this.getReceiverCsrc();


      return ReceiveStats;
    }
    /**获取receiver  audio/video csrc
     * **/


    async getReceiverCsrc(timestamp) {
      window.requestAnimationFrame(this.getReceiverCsrc.bind(this));

      if (this.subscribeMixed.subscription) {
        if (this.subscribeMixed.subscription.getReceivers) {
          var ReceiversCsrc = this.subscribeMixed.subscription.getReceivers();
          ReceiversCsrc.forEach(async ReceiversCsrcInfo => {
            //解析audio 语音激励的值
            if (ReceiversCsrcInfo.track.kind == 'audio') {
              if (sysInfo$3().runtime.name == "Firefox") {
                var audioCsrc = ReceiversCsrcInfo.getContributingSources().sort((a, b) => {
                  var time1 = a['timestamp'];
                  var time2 = b['timestamp'];
                  return time2 - time1;
                }); //      					    console.log(ReceiversCsrcInfo.getParameters())
              } else {
                var audioCsrc = ReceiversCsrcInfo.getContributingSources().reverse();
              }
              var voiceStimulationInfo = []; //      					console.log(`audioCsrc是`)
              //							console.log(audioCsrc);

              var audioCsrcInfoData = audioCsrc.find(audioCsrcInfo => {
                return audioCsrcInfo.source != 0 && audioCsrcInfo.source <= 3;
              });
              if (!audioCsrcInfoData) return; //                          console.log('audioCsrc是')
              //      					console.log(audioCsrc);

              audioCsrc = audioCsrc.filter(info => {
                return info.timestamp == audioCsrcInfoData.timestamp;
              }); //      					console.log(audioCsrc);

              audioCsrc.forEach((audioCsrcInfo, index) => {
                if (index != 0) {
                  //获取语音激励值
                  var voiceStimulationNum = audioCsrc[0].source & 0xffffffff; //数组第一个值第一个字节表示语音激励数量

                  if (voiceStimulationNum && index <= voiceStimulationNum) {
                    voiceStimulationInfo.push({
                      ptid: audioCsrcInfo.source & 0x0000ffff,
                      voiceNum: audioCsrcInfo.source >> 16
                    });
                  }
                }
              });
              if (JSON.stringify(voiceStimulationInfo) === JSON.stringify(this.receiverCsrc.audio)) return;
              this.receiverCsrc.audio = voiceStimulationInfo; //      				   console.log(voiceStimulationInfo);

              this.voiceStimulationChange({
                data: voiceStimulationInfo
              }); //       				   console.log(voiceStimulationInfo);
              //      				   this.subscribeMixed.subscription.dispatchEvent(new EventModule.MessageEvent('voiceStimulationChange', {
              //				            message: {
              //				              data: voiceStimulationInfo
              //				            }
              //                         }))
              //解析video的值
            } else {
              if (sysInfo$3().runtime.name == "Firefox") {
                var videoCsrc = ReceiversCsrcInfo.getContributingSources().sort((a, b) => {
                  var time1 = a['timestamp'];
                  var time2 = b['timestamp'];
                  return time2 - time1;
                });
                return;
              } else if (sysInfo$3().runtime.name == "Safari") {
                var videoCsrc = ReceiversCsrcInfo.getContributingSources().reverse().sort((a, b) => {
                  var time1 = a['timestamp'];
                  var time2 = b['timestamp'];
                  return time2 - time1;
                });
              } else {
                var videoCsrc = ReceiversCsrcInfo.getContributingSources().reverse().sort((a, b) => {
                  var time1 = a['rtpTimestamp'];
                  var time2 = b['rtpTimestamp'];
                  return time2 - time1;
                });
              }

              var videoCsrcInfoData = videoCsrc.find(videoCsrcInfo => {
                return videoCsrcInfo.source <= 100;
              });
              if (!videoCsrcInfoData) return;

              if (sysInfo$3().runtime.name == "Safari") {
                videoCsrc = videoCsrc.filter(info => {
                  return info.timestamp == videoCsrcInfoData.timestamp;
                });
              } else {
                videoCsrc = videoCsrc.filter(info => {
                  return info.rtpTimestamp == videoCsrcInfoData.rtpTimestamp;
                });
              }

              if (videoCsrc.length != 0 && this.receiverCsrc.videoCsrc.length != 0 && videoCsrc[0].timestamp < this.receiverCsrc.videoCsrc[0].timestamp) return;
              this.receiverCsrc.videoCsrc = videoCsrc;
              var videoLayoutCsrcInfo = [];
              var temp_csrc = null;
              var layoutId = null;

              if (videoCsrc[0].source > 100) {
                if (videoCsrc[videoCsrc.length - 1].source < 100) {
                  videoCsrc.unshift(videoCsrc[videoCsrc.length - 1]);
                  videoCsrc.splice(videoCsrc.length, 1);
                }
              }

              if (videoCsrc[0].source == 0) {
                this.videoLayoutChange({
                  layoutList: [],
                  layoutId: layoutId
                });
                console.log(ReceiversCsrcInfo.getContributingSources());
              } else {
                videoCsrc.forEach((videoCsrcInfo, index) => {
                  layoutId = JSON.stringify(videoCsrc[0].source & 0x000000ff); //layoutid string

                  if (index != 0) {
                    if (index % 3 == 1) {
                      videoLayoutCsrcInfo.push(videoCsrcInfo.source & 0xfff);
                      videoLayoutCsrcInfo.push(videoCsrcInfo.source >> 12 & 0xfff);
                      temp_csrc = videoCsrcInfo.source >> 24 & 0xff;
                    } else if (index % 3 == 2) {
                      temp_csrc = (videoCsrcInfo.source & 0xf) << 8 | temp_csrc;
                      videoLayoutCsrcInfo.push(temp_csrc);
                      videoLayoutCsrcInfo.push(videoCsrcInfo.source >> 4 & 0xfff);
                      videoLayoutCsrcInfo.push(videoCsrcInfo.source >> 16 & 0xfff);
                      temp_csrc = videoCsrcInfo.source >> 28 & 0xf;
                    } else if (index % 3 == 0) {
                      temp_csrc = (videoCsrcInfo.source & 0xff) << 4 | temp_csrc;
                      videoLayoutCsrcInfo.push(temp_csrc);
                      videoLayoutCsrcInfo.push(videoCsrcInfo.source >> 8 & 0xfff);
                      videoLayoutCsrcInfo.push(videoCsrcInfo.source >> 20 & 0xfff);
                      temp_csrc = null;
                    }
                  }
                }); //	        				  this.receiverCsrc.videoLayoutCsrcInfo = videoLayoutCsrcInfo;
                //	        				  this.receiverCsrc.video = [];

                var receiverCsrcVideoInfo = [];
                videoLayoutCsrcInfo.forEach(LayoutInfo => {
                  if (LayoutInfo != 0) {
                    let ptid = parseInt((Array(12).join(0) + LayoutInfo.toString(2)).slice(-10), 2);
                    let fixed = (Array(12).join(0) + LayoutInfo.toString(2)).slice(-11, -10);
                    let exitCamera = (Array(12).join(0) + LayoutInfo.toString(2)).slice(-12, -11);

                    if (fixed == "0" && exitCamera == "0") {
                      ptid = -1;
                    }

                    receiverCsrcVideoInfo.push({
                      ptid: ptid,
                      fixed: fixed == "0" ? false : true,
                      exitCamera: exitCamera == "0" ? false : true
                    });
                  } else {
                    receiverCsrcVideoInfo.push({
                      ptid: -1,
                      fixed: false,
                      exitCamera: false
                    });
                  }
                }); //当布局和布局信息都相同时，返回。

                if (layoutId == this.receiverCsrc.layoutId && JSON.stringify(receiverCsrcVideoInfo) == JSON.stringify(this.receiverCsrc.video)) {
                  return;
                }
                console.log(videoLayoutCsrcInfo);
                console.log(videoCsrc);
                console.log(ReceiversCsrcInfo.getContributingSources());
                this.receiverCsrc.video = receiverCsrcVideoInfo; //对比解析后数据与前一次相同，返回

                this.receiverCsrc.layoutId = layoutId; //获取到csrc video解析后数据，根据布局ID在本地查找布局信息

                if (this.receiverCsrc.allLayoutDataList.length != 0) {
                  //根据布局id再所有布局里面查找当前布局
                  var curlayout = this.receiverCsrc.allLayoutDataList.find(layoutInfo => {
                    return layoutInfo.id == layoutId;
                  }); //没有在服务器中找到相关的布局，再本地查找

                  if (!curlayout) {
                    curlayout = videoDefaultLayout.layout.find(layoutInfo => {
                      return layoutInfo.id == layoutId;
                    });
                  }

                  if (curlayout) {
                    var layoutDataList = [];
                    curlayout = JSON.parse(JSON.stringify(curlayout));
                    curlayout.region.forEach((data, index) => {
                      if (this.receiverCsrc.video[index]) {
                        layoutDataList.push({
                          region: data,
                          ptid: this.receiverCsrc.video[index].ptid,
                          fixed: this.receiverCsrc.video[index].fixed,
                          exitCamera: this.receiverCsrc.video[index].exitCamera
                        }); //	                        			    this.receiverCsrc.video[index].region = data;
                      } else {
                        layoutDataList.push({
                          region: data,
                          ptid: -1,
                          fixed: false,
                          exitCamera: false
                        });
                      }
                    });
                  }
                }
              }

              console.log(layoutDataList);
              if (!layoutDataList) return;
              this.videoLayoutChange({
                layoutList: layoutDataList,
                layoutId: layoutId
              }); //      				  this.subscribeMixed.subscription.dispatchEvent(new EventModule.MessageEvent('layoutchange', {
              //				            message: {
              //				              layoutList: layoutDataList,
              //				              layoutId:layoutId
              //				            }
              //                        }))
            }
          });
        }
      }
    }
    /**获取接收端:video的丢包信息**/


    async getReceiveVideoPacketLostData(subscription) {
      let receiveStatus = await this.getReceiveStats(subscription);

      if (receiveStatus && receiveStatus.video) {
        // console.log(receiveStatus.video);
        let packetLost = Number(receiveStatus.video.googNacksSent) ? Number(receiveStatus.video.googNacksSent) : Number(receiveStatus.video.packetsLost);
        let packetLostTotal = Number(receiveStatus.video.packetsReceived) - Number(receiveStatus.video.packetsLost);
        packetLostTotal = packetLostTotal < 0 ? 0 : packetLostTotal;
        return {
          bytesReceived: receiveStatus.video.bytesReceived,
          packetLost: packetLost,
          packetLostTotal: packetLostTotal,
          height: parseInt(receiveStatus.video.googFrameHeightReceived),
          frameRate: parseInt(receiveStatus.video.googFrameRateDecoded || receiveStatus.video.framerateMean)
        };
      }
      return false;
    }
    /**获取发送端：video的信息**/


    async getSendVideoPacketLostData(publication) {
      let sendStatus = await this.getSendStatus(publication);

      if (sendStatus && sendStatus.video) {
        return {
          frameRate: parseInt(sendStatus.video.googFrameRateSent || sendStatus.video.framerateMean),
          bytesSent: sendStatus.video.bytesSent
        };
      }
      return false;
    }
    /**切换设备
     * publication: RTCPeerConnection
     *MediaStream
     * **/


    changeDevice(publication, MediaStream) {
      publication.getSenders().forEach(rtpSender => {
        if (rtpSender.track.kind == 'audio') {
          rtpSender.replaceTrack(MediaStream.getAudioTracks()[0]);
        } else if (rtpSender.track.kind == 'video') {
          rtpSender.replaceTrack(MediaStream.getVideoTracks()[0]);
        }
      });
    }
    /**track stop
     * **/


    setTrackStop() {
      if (this.publishLocal.publishStream && !this.publishLocal.publishStream.code) {
        var tracks = this.publishLocal.publishStream.getTracks();

        if (this.publishLocal.publishStream.getVideoTracks()[0]) {
          this.publishLocal.publishStream.getVideoTracks()[0].stop();
        }

        if (this.publishLocal.publishStream.getAudioTracks()[0]) {
          this.publishLocal.publishStream.getAudioTracks()[0].stop();
        }

        for (let i = 0; i < tracks.length; i++) {
          tracks[i].enabled = false;
          tracks[i].stop();
          this.publishLocal.publishStream.removeTrack(tracks[i]);
        }
        this.publishLocal.publishStream = null;
      }
    }
    /**监听audiotrack or videoTrack is ended*/


    addEventTrackEnded() {
      let audioTrack = this.publishLocal && this.publishLocal.publishStream && this.publishLocal.publishStream.getAudioTracks && this.publishLocal.publishStream.getAudioTracks()[0];
      let videoTrack = this.publishLocal && this.publishLocal.publishStream && this.publishLocal.publishStream.getVideoTracks && this.publishLocal.publishStream.getVideoTracks()[0];

      if (audioTrack) {
        audioTrack.addEventListener('ended', this.audioTrackEnded);
      }

      if (videoTrack) {
        videoTrack.addEventListener('ended', this.videoTrackEnded);
      }
    }
    /**取消怕发布**/


    cancelPublish() {
      if (this.publishLocal.publication) {
        this.publishLocal.publication.stop();
        this.publishLocal.publication = null;
      }
    }
    /*****监听方法:会议方面****/


    eventListener() {
      /********当一个流加入时触发********/
      this.conference.addEventListener('streamadded', async event => {
        var remoteStream = event.stream;
        this.streamadded(remoteStream);
        event.stream.addEventListener('ended', () => {
          this.streamended(event.stream);
        });
      });
      /******当一个参会人加入会议时触发*********/

      this.conference.addEventListener('participantjoined', event => {
        event.participant.addEventListener('left', () => {
          this.participantleave(event.participant);
        });
        this.participantjoined(event.participant);
      });
      /******当新消息被接合接收时触发********/

      this.conference.addEventListener('messagereceived', event => {
        // console.log(event);
        this.messagereceived(event);
      });
      /*********当与服务器断开连接时触发**********/

      this.conference.addEventListener('serverdisconnected', event => {
        console.log(event);
        this.recollectfailed(event);
      });
      /*********owt 重连成功时**********/

      this.conference.addEventListener('owt_reconnect_success', event => {
        console.log('owt_reconnect_success'); // this.subscribeMixed.subscription.stop();
        // if(this.subscribeMixed.subscription && this.subscribeMixed.subscription.clearEventListener){this.subscribeMixed.subscription.clearEventListener('ended')};
        // if(this.subscribeMixed.subscription && this.subscribeMixed.subscription.clearEventListener){this.subscribeMixed.subscription.clearEventListener('error')};
        // this.subscribeMixended(this.subscribeMixed.subStream);
      });
      this.conference.addEventListener('reconnect_failed', event => {
        this.recollectfailed(event);
      });
      this.conference.addEventListener('audiostatuschange', audioInfo => {
        this.audiostatuschange(audioInfo.info);
      });
      /**会议室静音/取消静音监听***/

      this.conference.addEventListener('roomstatuschange', data => {
        this.roomStatusChange(data);
      });
      /**被主持人请出会议*/

      this.conference.addEventListener('exitRoom', data => {
        console.log(data);
        this.exitRoomEvent(data);
      });
      this.conference.addEventListener('iceClose', data => {
        console.log(data);
      });
      this.conference.addEventListener('recording', data => {
        this.recordMsgEvent(data);
      });
    }

    findParticipant(participantList, stream) {
      return participantList.find(participant => {
        return participant.id == stream.origin;
      });
    }
    /*清除会议监听*/


    clearEventListener() {
      if (this.conference && this.conference.clearEventListener) {
        this.conference.clearEventListener('streamadded');
      }

      if (this.conference && this.conference.clearEventListener) {
        this.conference.clearEventListener('messagereceived');
      }

      if (this.conference && this.conference.clearEventListener) {
        this.conference.clearEventListener('serverdisconnected');
      }

      if (this.conference && this.conference.clearEventListener) {
        this.conference.clearEventListener('audiostatuschange');
      }

      if (this.conference && this.conference.clearEventListener) {
        this.conference.clearEventListener('roomstatuschange');
      }

      if (this.conference && this.conference.clearEventListener) {
        this.conference.clearEventListener('exitRoom');
      }

      if (this.conference && this.conference.clearEventListener) {
        this.conference.clearEventListener('iceClose');
      }

      if (this.publishLocal.publication && this.publishLocal.publication.clearEventListener) {
        this.publishLocal.publication.clearEventListener('ended');
      }

      if (this.publishLocal.publication && this.publishLocal.publication.clearEventListener) {
        this.publishLocal.publication.clearEventListener('error');
      }

      if (this.subscribeMixed.subscription && this.subscribeMixed.subscription.clearEventListener) {
        this.subscribeMixed.subscription.clearEventListener('ended');
      }

      if (this.subscribeMixed.subscription && this.subscribeMixed.subscription.clearEventListener) {
        this.subscribeMixed.subscription.clearEventListener('error');
      }

      if (this.subscribeRemote.subscription && this.subscribeRemote.subscription.clearEventListener) {
        this.subscribeRemote.subscription.clearEventListener('ended');
      }

      if (this.subscribeShare.subscription && this.subscribeShare.subscription.clearEventListener) {
        this.subscribeShare.subscription.clearEventListener('ended');
      }

      if (this.subscribeShare.subscription && this.subscribeShare.subscription.clearEventListener) {
        this.subscribeShare.subscription.clearEventListener('error');
      }

      if (this.publishShare.publication && this.publishShare.publication.clearEventListener) {
        this.publishShare.publication.clearEventListener('ended');
      }

      if (this.publishShare.publication && this.publishShare.publication.clearEventListener) {
        this.publishShare.publication.clearEventListener('error');
      }
    }
    /**去重allstream**/


    filterAllStreams(streamsList, addStream) {
      console.log(streamsList);
      var targetStream = streamsList.find(stream => {
        return stream.origin == addStream.origin;
      });

      if (targetStream) {
        targetStream = addStream;
      } else {
        streamsList.push(addStream);
      }
    }

    createAudioContext(stream) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
      var audioCtx = new window.AudioContext();
      var source = audioCtx.createMediaStreamSource(stream);
      var biquadFilter = audioCtx.createBiquadFilter();
      biquadFilter.frequency.value = 1000;
      biquadFilter.gain.value = 8;
      source.connect(biquadFilter);
      biquadFilter.connect(audioCtx.destination);

      if (audioCtx.resume) {
        audioCtx.resume();
      }
    }

  }

  return new WEBrtc();
}

export { webrtc };
