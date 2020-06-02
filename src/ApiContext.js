
import React from 'react'

export default React.createContext({
  notes: [],
  folders: [
    {name:'Important', id:'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1'},
    {name:'Super', id:'b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1'},
    {name:'Spangley', id:'b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1'}
  ],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})