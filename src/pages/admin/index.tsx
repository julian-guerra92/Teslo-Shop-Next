
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
   AccessTimeOutlined,
   AttachMoneyOutlined,
   CancelPresentationOutlined,
   CategoryOutlined,
   CreditCardOffOutlined,
   CreditCardOutlined,
   DashboardOutlined,
   GroupOutlined,
   ProductionQuantityLimitsOutlined
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin';
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {

   const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
      refreshInterval: 30 * 1000
   })

   const [refreshIn, setrefreshIn] = useState(30);

   useEffect(() => {
      const interval = setInterval(() => {
         console.log('Tick');
         setrefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   if (!error && !data) return <></>;

   if (error) {
      console.log(error);
      return <Typography>Erro Loading Information</Typography>
   }

   const {
      numberOfOrders,
      paidOrders,
      notPaidOrders,
      numbersOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory
   } = data!;

   return (
      <AdminLayout
         title='Dashboard'
         subTitle='General Statistics'
         icon={<DashboardOutlined />}
      >
         <Grid container spacing={2}>
            <SummaryTile
               title={numberOfOrders}
               subTitle="Total Orders"
               icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 50 }} />}
            />
            <SummaryTile
               title={paidOrders}
               subTitle="Paid Orders"
               icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 50 }} />}
            />
            <SummaryTile
               title={notPaidOrders}
               subTitle="Pending Orders"
               icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 50 }} />}
            />
            <SummaryTile
               title={numbersOfClients}
               subTitle="Total Clients"
               icon={<GroupOutlined color='primary' sx={{ fontSize: 50 }} />}
            />
            <SummaryTile
               title={numberOfProducts}
               subTitle="Total Products"
               icon={<CategoryOutlined color='warning' sx={{ fontSize: 50 }} />}
            />
            <SummaryTile
               title={productsWithNoInventory}
               subTitle="Out of Stock"
               icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 50 }} />}
            />
            <SummaryTile
               title={lowInventory}
               subTitle="Low Inventory"
               icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 50 }} />}
            />
            <SummaryTile
               title={refreshIn}
               subTitle="Update in:"
               icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 50 }} />}
            />
         </Grid>
      </AdminLayout>
   )
}

export default DashboardPage