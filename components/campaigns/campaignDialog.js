import React from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';

const CampaignDialog = (props) => {
  const { data, visibleDialog, onHide, dialogFooter, submitted, onInputChange } = props
  return (
    <div>
      <Dialog
        visible={visibleDialog}
        style={{ width: '450px' }}
        header="Campaign Details"
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
        <div className="field">
          <label htmlFor="DM_username">DM Username</label>
          <InputText id="DM_username" value={data.DM_username} onChange={(e) => onInputChange(e, 'DM_username')} required className={classNames({ 'p-invalid': submitted && !data.DM_username })} />
          {submitted && !data.DM_username && <small className="p-invalid">DM is required.</small>}
        </div>
        <div className="grid">
        <div className="field col-6">
          <label htmlFor="world">World</label>
          <InputText id="world" value={data.world} onChange={(e) => onInputChange(e, 'world')} required  />
        </div>
        <div className="field col-6">
          <label htmlFor="system">System</label>
          <InputText id="system" value={data.system} onChange={(e) => onInputChange(e, 'system')} required  />
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

export default CampaignDialog