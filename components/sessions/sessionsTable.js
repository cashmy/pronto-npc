/** Comments
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-01-16 14:04:42
 * @modify date 2023-01-19 12:11:27
 * @desc [description]
 */
//#region Imports
import React, { useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
// * Services
// import { CampaignService } from '../../services/campaignService';
import data from '../../data/sessions.json'
//#endregion


const SessionsTable = (props) => {
  //#region //* State
  const { adventureName } = props;
  const [campaigns, setCampaigns] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
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
      <h5 className="m-0">Sessions for <span className='campaign-badge session'>{adventureName}</span></h5>
      {/* <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span> */}
      <span>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={() => openNew()} />
      </span>
    </div>
  );

  //#endregion

  return (
    <div className='grid card mr-2'>
      <div className='col-12'>
        <DataTable
          value={campaigns}
          ref={dt}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          className="datatable-responsive"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} adventures"
          globalFilter={globalFilter}
          emptyMessage="No adventures found."
          header={header}
          responsiveLayout="scroll"
          size="small"
        >
          <Column field="name" header="Name" sortable body={data.name} headerStyle={{ minWidth: '5rem' }}></Column>
          <Column field="description" header="Description" sortable body={data.description} headerStyle={{ minWidth: '20rem' }}></Column>
          <Column field="sessionDate" header="Date" sortable body={data.sessionDate} headerStyle={{ minWidth: '7rem' }}></Column>
          <Column body={actionBodyTemplate} headerStyle={{ minWidth: '7rem' }}></Column>

        </DataTable>
      </div>
    </div>
  )
}

export default SessionsTable