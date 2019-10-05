const NotepadAsync = require('../src/NotepadAsync');
const PRIORITY_TYPES = require('./constants');
const initialNotes = require('./db');

const { getNotes, addNotes, delNotes } = require('../src/api');

//  =================== get=========================  //
describe('get notes', () => {
  beforeEach(() => {
    console.log('test get notes start ');
  });
  test(' get notes', async () => {
    const init = await getNotes();
    const notepad = new NotepadAsync(init);
    expect(notepad._notes).toEqual(initialNotes);
  });
});
//  =================== save =========================  //
describe('save note', () => {
  beforeEach(() => {
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

  afterEach(() => {
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
    beforeEach(() => {
      const note = {
        title: 'wait',
        body: 'qweqwe',
        priority: 0
      };
      addNotes(note).then(() => {
          console.log('test delete note start ');
      })
    });

    test(' delete note', async () => {
      const init = await getNotes();
      console.log(init);
      const length = init.length;
      const notepad = new NotepadAsync(init);
      ({ id } = notepad._notes[notepad._notes.length - 1]);
      console.log(id);
      expect(
        notepad.deleteNote(id).then(() => notepad._notes.length)
      ).resolves.toBe(length - 1);
    });
});
