/** Comments
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-01-16 14:04:42
 * @modify date 2023-01-19 12:11:19
 * @desc [description]
 */
//#region Imports
import React, { useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import AdventureDialog from './AdventureDialog';
// * Services
// import { AdventureService } from '../../services/adventureService';
import data from '../../data/adventures.json'
//#endregion


const AdventuresTable = (props) => {
  let emptyAdventure = {
    id: null,
    name: '',
    sessionCount: 0,
    description: ''
  }

  //#region //* State
  const { adventureName } = props;
  const [adventures, setAdventures] = useState([]);
  const [adventure, setAdventure] = useState(emptyAdventure);
  const [visibleDialog, setVisibleDialog] = useState(false);
  // const [globalFilter, setGlobalFilter] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  //#endregion

  //#region //* Effects
  useEffect(() => {
    // const adventureService = new AdventureService();
    // adventuretService.getAdventures().then((data) => setAdventures(data));
    setAdventures(data);
  }, []);
  //#endregion

  //#region //* Handler Functions
  const openNew = () => {
    setAdventure(emptyAdventure);
    setSubmitted(false);
    setVisibleDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setVisibleDialog(false);
  };
  const saveAdventure = () => {
    setSubmitted(true);

    if (adventure.name.trim()) {
      let _adventures = [...adventures];
      let _adventure = { ...adventure };
      if (adventure.id) {
        const index = findIndexById(adventure.id);

        _adventures[index] = _adventure;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Adventure Updated', life: 3000 });
      } else {
        _adventure.id = createId();
        _adventure.image = 'adventure-placeholder.svg';
        _adventures.push(_adventure);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Adventure Created', life: 3000 });
      }

      setAdventures(_adventures);
      setVisibleDialog(false);
      setAdventure(emptyAdventure);
    }
  };
  const editRecord = (record) => {
    setAdventure({ ...record });
    setVisibleDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-primary mr-2"
          onClick={() => editRecord(rowData)}
          style={{ height: '2.25rem', width: '2.25rem' }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteRecord(rowData)}
          style={{ height: '2.25rem', width: '2.25rem' }}
        />
      </>
    );
  };
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Adventures for <span className='adventure-badge adventure'>{adventureName}</span></h5>
      {/* <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span> */}
      <span>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={() => openNew()} />
      </span>
    </div>
  );
  const dialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveAdventure} />
    </>
  );
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < adventures.length; i++) {
      if (adventures[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };
  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _adventure = { ...adventure };
    _adventure[`${name}`] = val;

    setAdventure(_adventure);
  };
  //#endregion

  return (
    <div className='grid card ml-3'>
      <div className='col-12'>
        <Toast ref={toast} />
        <DataTable
          value={adventures}
          ref={dt}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          className="datatable-responsive"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} adventures"
          // globalFilter={globalFilter}
          emptyMessage="No adventures found."
          header={header}
          responsiveLayout="scroll"
          size="small"
        >
          <Column field="name" header="Name" sortable body={data.name} headerStyle={{ maxWidth: '10rem' }}></Column>
          <Column field="description" header="Description" sortable body={data.description} headerStyle={{ minWidth: '15rem' }}></Column>
          <Column field="sessionCount" header="Session Count" sortable body={data.sessionCount} headerStyle={{ minWidth: '5rem' }}></Column>
          <Column body={actionBodyTemplate} headerStyle={{ minWidth: '7rem' }}></Column>

        </DataTable>

        <AdventureDialog
          data={adventure}
          visibleDialog={visibleDialog}
          onHide={hideDialog}
          dialogFooter={dialogFooter}
          submitted={submitted}
          onInputChange={onInputChange}
        />
      </div>
    </div>
  )
}

export default AdventuresTable