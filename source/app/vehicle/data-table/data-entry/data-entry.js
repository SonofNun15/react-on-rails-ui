import React, { PropTypes } from 'react'

import Fueling from '../../../models/fueling'
import Maintenance from '../../../models/maintenance'
import FuelingEditor from '../fueling/fueling-editor'
import MaintenanceEditor from '../maintenance/maintenance-editor'

function getEditorCtrl(editor, onCreateFueling, onCreateMaintenance, onClose, onError) {
  switch(editor) {
    case Fueling:
      return <FuelingEditor onSave={onCreateFueling} onClose={onClose} onError={onError} />

    case Maintenance:
      return <MaintenanceEditor onSave={onCreateMaintenance} onClose={onClose} onError={onError} />
  }
}

const DataEntry = ({
    editor,
    onAddFueling,
    onSaveFueling,
    onAddMaintenance,
    onSaveMaintenance,
    onClose,
    onError,
  }) => {
  const editorCtrl = getEditorCtrl(editor, onSaveFueling, onSaveMaintenance, onClose, onError)
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
  onError: PropTypes.func,
}

export default DataEntry
