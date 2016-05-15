// SETUP ===============================================
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

var start_timestamp;
var final_transcript = '';
var recognizing = false;

// For calculating the rate of word input
var eventCount = 0
var previusTimestamp = 0
var paceTotal = 0.0

// STARTING =============================================
function startRecording() {
  recognizing = true
  final_transcript = '';

  recognition.start();

  // Set the time stamp
  start_timestamp = event.timeStamp;
}


// ENDING ===============================================
function stopRecording() {
  recognition.stop();
}


// RECOGNITION EVENTS ===================================

recognition.onstart = function(event) {
  console.log("Starting Recognition");
}

recognition.onresult = function(event) {
  var interim_transcript = '';

  paceTotal += (eventCount == 0) ? event.timeStamp : (previusTimestamp - event.timeStamp)

  previusTimestamp = event.timeStamp
  eventCount += 1

  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  console.log("Current word pace: " + Math.abs(paceTotal / eventCount));

  if (interim_transcript.length > 0) {
    console.log("INTERIM TRANSCRIPT");
    console.log("Output: " + interim_transcript);
  }

  if (final_transcript.length > 0) {
    console.log("RECORDING FINISHED");
    console.log("Output: " + final_transcript);
  }
}
