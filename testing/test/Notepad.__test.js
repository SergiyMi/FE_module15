const Notepad = require('../src/Notepad');
const initialNotes = require('./db');
const PRIORITY_TYPES = require('./constants');

//  =================== get=========================  //
test(' get notes', () => {
  const notepad = new Notepad(initialNotes);
  expect(notepad.notes).toEqual(initialNotes);
});

//  ==================== save ========================  //
test(' saveNote ', () => {
  const notepad = new Notepad();

  expect(notepad._notes).toEqual([]);

  notepad.saveNote(initialNotes[4]);
  expect(notepad._notes).toEqual([initialNotes[4]]);
});

//  ===================== find =======================  //
test(' findNoteById ', () => {
  const notepad = new Notepad(initialNotes);

  expect(notepad.findNoteById('id-50')).toBe(undefined);

  expect(notepad.findNoteById('id-5')).toEqual(initialNotes[4]);
});

//  ===================== delete =======================  //
test(' deleteNote ', () => {
  const notepad = new Notepad();
  notepad.saveNote(initialNotes[4]);

  expect(notepad._notes).toEqual([initialNotes[4]]);

  notepad.deleteNote('id-5');

  expect(notepad._notes).toEqual([]);
});

//  ==================== update Priority ========================  //
test(' updateNotePriority ', () => {
  const init = initialNotes.map(e => ({ ...{}, ...e }));
  // const init = initialNotes;

  const notepad = new Notepad(init);

  expect(notepad.updateNotePriority('id-50', PRIORITY_TYPES.HIGH)).toEqual(
    undefined
  );
  const target = {
    ...{},
    ...initialNotes[4]
  };
  target.priority = PRIORITY_TYPES.NORMAL;

  expect(notepad.updateNotePriority('id-5', PRIORITY_TYPES.NORMAL)).toEqual(
    target
  );
});

//  ==================== update Content ========================  //
test(' updateNoteContent ', () => {
  const init = initialNotes.map(e => ({ ...{}, ...e }));

  const notepad = new Notepad(init);
  expect(notepad.updateNoteContent('id-50', PRIORITY_TYPES.HIGH)).toEqual(
    undefined
  );
  const target = {
    ...{},
    ...initialNotes[4],
    ...{ title: 'BBB', body: 'Summer' }
  };

  expect(
    notepad.updateNoteContent('id-5', { title: 'BBB', body: 'Summer' })
  ).toEqual(target);
});

//  ===================== Query =======================  //
test(' filterNotesByQuery ', () => {
  const notepad = new Notepad(initialNotes);
  expect(notepad.filterNotesByQuery('Summer')).toEqual([]);
  const target = [initialNotes[3], initialNotes[4]];
  expect(notepad.filterNotesByQuery('Winter')).toEqual(target);
});

//  ==================== Priority ========================  //
test(' filterNotesByPriority ', () => {
  
  const notepad = new Notepad(initialNotes);
  
  expect(notepad.filterNotesByPriority(100)).toEqual([]);
  
  const target = [initialNotes[3], initialNotes[4]];
  
  expect(notepad.filterNotesByPriority(PRIORITY_TYPES.LOW)).toEqual(target);
});
