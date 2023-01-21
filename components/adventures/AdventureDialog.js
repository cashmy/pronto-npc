import React from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';

const AdventureDialog = (props) => {
  const { data, visibleDialog, onHide, dialogFooter, submitted, onInputChange } = props

  return (
    <div>
      <Dialog
        visible={visibleDialog}
        style={{ width: '450px' }}
        header="Adventure Details"
        modal
        className="p-fluid"
        footer={dialogFooter}
        onHide={onHide}
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={data.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !data.name })} />
          {submitted && !data.name && <small className="p-invalid">Name is required.</small>}
        </div>

        <div className="grid">
        <div className="field col-6">
          <label htmlFor="sessionCount">Sessions</label>
          <InputNumber id="sessionCount" value={data.sessionCount} onChange={(e) => onInputChange(e, 'sessionCount')} required  />
        </div>

        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" value={data.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
        </div>
      </Dialog>
    </div>
  )
}


export default AdventureDialog