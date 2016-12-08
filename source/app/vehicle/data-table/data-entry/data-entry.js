import React, { PropTypes } from 'react'

import Fueling from '../../../models/fueling'
import Maintenance from '../../../models/maintenance'
import FuelingEditor from './fueling-editor'
import MaintenanceEditor from './maintenance-editor'

function getEditorCtrl(editor, onCreateFueling, onCreateMaintenance, onClose) {
  switch(editor) {
    case Fueling:
      return <FuelingEditor onCreate={onCreateFueling} onClose={onClose} />

    case Maintenance:
      return <MaintenanceEditor onCreate={onCreateMaintenance} onClose={onClose} />
  }
}

const DataEntry = ({
    editor,
    onAddFueling,
    onSaveFueling,
    onAddMaintenance,
    onSaveMaintenance,
    onClose,
  }) => {
  const editorCtrl = getEditorCtrl(editor, onSaveFueling, onSaveMaintenance, onClose)
  return (
    <div>
      <div className="buttons">
        <button type="button" className="btn btn-default" onClick={onAddFueling}>
          <i className="fa fa-tachometer"></i> Add fueling
        </button>
        <button type="button" className="btn btn-default" onClick={onAddMaintenance}>
          <i className="fa fa-wrench"></i> Add maintenance
        </button>
      </div>
      { editorCtrl }
    </div>
  )
}

DataEntry.propTypes = {
  editor: PropTypes.any,
  onAddFueling: PropTypes.func,
  onSaveFueling: PropTypes.func,
  onAddMaintenance: PropTypes.func,
  onSaveMaintenance: PropTypes.func,
  onClose: PropTypes.func,
}

export default DataEntry
