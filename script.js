WebMidi.enable().then(() => {

  const activeNotes = new Set()

  WebMidi.inputs.forEach((input) => {
    input.addListener('noteon', 'all', (event) => {
      activeNotes.add(event.note.name)
      detectChord()
      console.log(activeNotes)
    })
  })


  WebMidi.inputs.forEach((input) => {
    input.addListener('noteoff', 'all', (event) => {
      activeNotes.delete(event.note.name)
      detectChord()
    })
  })

  function detectChord() {
    const activeNotesArray = Array.from(activeNotes)
    if (activeNotesArray.length >= 3) {
      const chordName = getChordName(activeNotesArray)
      console.log('Detected Chord:', chordName)
    }
  }

  function getChordName(notes) {
    if (
      notes.includes('C') /* C */ &&
      notes.includes('E') /* E */ &&
      notes.includes('G') /* G */
    ) {
      return 'C Major'
    }

    if (
      notes.includes(60) /* C */ &&
      notes.includes(63) /* E */ &&
      notes.includes(67) /* G */
    ) {
      return 'C Minor'
    }

    return 'Unknown'
  }
}).catch((error) => {
  console.error('Web MIDI could not be enabled:', error)
})