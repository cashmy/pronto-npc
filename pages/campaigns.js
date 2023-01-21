import React from 'react';
import Link from 'next/link';
import CampaignTable from '@/components/campaigns/campaignTable';
import AdventuresTable from '@/components/adventures/adventuresTable';
import SessionsTable from '@/components/sessions/sessionsTable';
import TimelineDemo from '@/components/timeline/timeline';
// import styles from '../styles/campaign.module.css';
// import '../styles/primeflex.module.css';

const Campaigns = () => {
  return (

    <div className="grid">
      <div className="card col-12"><h3>Campaign Manager</h3></div>
      <div className="gird col-9">
        <div className="grid col-12">
          <div className="col-5">
            <CampaignTable />
          </div>
          <div className="col-7">
            <AdventuresTable campaignName="Rogues Guild" />
          </div>
        </div>
        <div className="col-12">
          <SessionsTable adventureName="Mother Knows Best" />
        </div>
      </div>
      <div className="card col-3 mt-2">
        <TimelineDemo  />
      </div>
    </div>

  );
};

export default Campaigns;