WebMidi.enable().then(() => {

  const activeNotes = new Set()

  WebMidi.inputs.forEach((input) => {
    input.addListener('noteon', 'all', (event) => {
      activeNotes.add(`${event.note.name}${event.note.accidental}`.replace('undefined', ''))
      detectChord()
    })
  })


  WebMidi.inputs.forEach((input) => {
    input.addListener('noteoff', 'all', (event) => {
      activeNotes.delete(`${event.note.name}${event.note.accidental}`.replace('undefined', ''))
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
      notes.includes('C') &&
      notes.includes('E') &&
      notes.includes('G')
    ) {
      return 'C Major'
    }

    if (
      notes.includes('C') &&
      notes.includes('D#') &&
      notes.includes('G')
    ) {
      return 'C Minor'
    }

    /* return 'Unknown' */
  }
}).catch((error) => {
  console.error('Web MIDI could not be enabled:', error)
})