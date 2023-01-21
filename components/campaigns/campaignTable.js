/** Comments
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-01-16 14:04:42
 * @modify date 2023-01-19 14:40:28
 * @desc [description]
 */
//#region Imports
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import CampaignDialog from './campaignDialog';
// * Services
// import { CampaignService } from '../../services/campaignService';
import data from '../../data/campaigns.json';
import DeleteDialog from '../deleteDialog';
//#endregion

const CampaignTable = () => {
  let emptyCampaign = {
    id: null,
    name: '',
    DM_username: '',
    world: '',
    system: '',
    description: ''
  }

  //#region //* State
  const [campaigns, setCampaigns] = useState([]);
  const [campaign, setCampaign] = useState(emptyCampaign);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // const [globalFilter, setGlobalFilter] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  //#endregion

  //#region //* Effects
  useEffect(() => {
    // const campaignService = new CampaignService();
    // campaigntService.getCampaigns().then((data) => setCampaigns(data));
    setCampaigns(data);
  }, []);
  //#endregion

  //#region //* Handler Functions
  const openNew = () => {
    setCampaign(emptyCampaign);
    setSubmitted(false);
    setVisibleDialog(true);
  };
  const confirmDeleteRecord = (record) => {
    setCampaign(record)
    setShowDeleteDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setVisibleDialog(false);
  };
  const hideDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  const deleteRecord = () => {
    console.log({campaign})
    let _campaigns = campaigns.filter((val) => val.id !== campaign.id);
    console.log({_campaigns})
    setCampaigns(_campaigns);
    setShowDeleteDialog(false);
    setCampaign(emptyCampaign);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'campaign Deleted', life: 3000 });
  };
  const saveCampaign = () => {
    setSubmitted(true);

    if (campaign.name.trim()) {
      let _campaigns = [...campaigns];
      let _campaign = { ...campaign };
      if (campaign.id) {
        const index = findIndexById(campaign.id);

        _campaigns[index] = _campaign;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Campaign Updated', life: 3000 });
      } else {
        _campaign.id = createId();
        _campaign.image = 'campaign-placeholder.svg';
        _campaigns.push(_campaign);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Campaign Created', life: 3000 });
      }

      setCampaigns(_campaigns);
      setVisibleDialog(false);
      setCampaign(emptyCampaign);
    }
  };

  const editRecord = (record) => {
    setCampaign({ ...record });
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

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < campaigns.length; i++) {
      if (campaigns[i].id === id) {
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
    let _campaign = { ...campaign };
    _campaign[`${name}`] = val;

    setCampaign(_campaign);
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Campaigns</h5>
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
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveCampaign} />
    </>
  );
  const deleteDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteRecord} />
    </>
  );

  //#endregion

  return (
    <div className='grid card'>
      <div className='col-12'>
        <Toast ref={toast} />
        <DataTable
          value={campaigns}
          ref={dt}
          dataKey="id"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          className="datatable-responsive"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} campaigns"
          // globalFilter={globalFilter}
          emptyMessage="No campaigns found."
          header={header}
          responsiveLayout="scroll"
          size="small"
          resizableColumns
        >
          <Column field="name" header="Name" sortable body={data.name} headerStyle={{ minWidth: '10rem' }}></Column>
          <Column field="DM_username" header="DM" sortable body={data.DM_username} headerStyle={{ minWidth: '10rem' }}></Column>
          <Column body={actionBodyTemplate} headerStyle={{ minWidth: '7rem' }}></Column>
        </DataTable>

        <CampaignDialog
          data={campaign}
          visibleDialog={visibleDialog}
          onHide={hideDialog}
          dialogFooter={dialogFooter}
          submitted={submitted}
          onInputChange={onInputChange}
        />
        <DeleteDialog
          data={campaign}
          visibleDialog={showDeleteDialog}
          onHide={hideDialog}
          dialogFooter={deleteDialogFooter}
        />
      </div>
    </div>
  )
}

export default CampaignTable
