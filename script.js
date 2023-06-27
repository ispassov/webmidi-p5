WebMidi.enable()
  .then(onEnabled)
  .catch(err => alert(err))

function onEnabled() {
  if (WebMidi.inputs.length < 1) {
    console.log('No device detected.')
  } else {s
    console.log(WebMidi.inputs[0])
  }

  WebMidi.inputs[0].channels[1].addListener('noteon', e => {
    console.log(e.velocity)
    console.log(e.note.identifier)
  })
}