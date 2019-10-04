const NotepadAsync = require('../src/NotepadAsync');
const PRIORITY_TYPES = require('./constants');
const initialNotes = require('./db');

const { getNotes, addNotes, delNotes } = require('../src/api');

// getNotes().then(console.log)

//  =================== get=========================  //
test(' get notes', async () => {
  const init = await getNotes();
  const notepad = new NotepadAsync(init);
  expect(notepad._notes).toEqual(initialNotes);
});

//  =================== save =========================  //
describe('save note', () => {
  beforeAll(() => {
    console.log('test save note start ');
  });

  test(' save note', () => {
    let target, title, body, priority;

    const notepad = new NotepadAsync();
    ({ title, body, priority } = initialNotes[4]);
    target = {
      title,
      body,
      priority
    };
    //  чтобы исключить сравнение по id
    expect(
      notepad.saveNote(target).then(note => {
        ({ title, body, priority } = note);
        const sourse = {
          title,
          body,
          priority
        };
        return sourse;
      })
    ).resolves.toEqual(target);
  });

  afterAll(() => {
    getNotes().then(data => {
      if (data.length > 0) {
        const { id } = data[data.length - 1];
        delNotes(id);
      }
    });
  });
});
//  =================== delete =========================  //
describe('delete note', () => {
    beforeAll(() => {
      // console.log('test delete note start ');
      const note = {
        title: 'wait',
        body: 'qweqwe',
        priority: 0
      };
      addNotes(note).then(() => {
          console.log('test delete note start ');
      })
    });

    test(' delete note', () => {
//
      const notepad = new NotepadAsync(initialNotes);
      ({ id } = notepad._notes[notepad._notes.length - 1]);
      // console.log(notepad._notes[notepad._notes.length - 1]);
      target = {
        id
      };
// //
//       expect(
//         notepad.deleteNote(target).then()
//       ).resolves.toEqual(initialNotes[5]);
    });
});
