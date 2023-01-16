/*
should i use ebent handler as prop or the ref to canvas?
*/

function ExportButton({onExport}) {
  

  return (
    <button onClick={onExport}>Export</button>
  )
}

export default ExportButton