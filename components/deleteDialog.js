import React from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const DeleteDialog = (props) => {
  const { data, visibleDialog, onHide, dialogFooter } = props;

  return (
    <Dialog
      visible={visibleDialog}
      style={{ width: '450px' }}
      header="Confirm"
      modal
      footer={dialogFooter}
      onHide={onHide}
    >
      <div className="flex align-items-center justify-content-center">
        <Button
          icon="pi pi-exclamation-triangle"
          className="mr-3 p-button-rounded p-button-warning"
          style={{ height: '2.25rem', width: '2.25rem' }} 
        />
        {/* <i className="pi pi-exclamation-triangle mr-3" style={{ color: 'warning', fontSize: '2rem' }} /> */}
        <span>
          Are you sure you want to delete <b>{data.name}</b>?
        </span>
      </div>
    </Dialog>
  )
}

export default DeleteDialog