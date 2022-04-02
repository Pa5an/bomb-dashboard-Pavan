import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
// import styled from 'styled-components';
// import Spacer from '../../components/Spacer';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';
import MetamaskFox from '../../assets/img/metamask-fox.svg';

// import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import BoardRoomCard from './BoardroomCard';

import { roundAndFormatNumber } from '../../0x';

// import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useBombStats from '../../hooks/useBombStats';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import useBombFinance from '../../hooks/useBombFinance';
// import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';



// import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';

// import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
// import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
// import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import ProgressCountdown from './components/ProgressCountdown';
import TokenSymbol from '../../components/TokenSymbol';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet'

import HomeImage from '../../assets/img/background.jpg';
import BombFarmCard from './BombfarmCard';
import BondsCard from './BondsCard';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const TITLE = 'bomb.money | Boardroom'

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      // height: '90px',
    },
  },
  right: {
    marginLeft: 'auto'
  },
  left: {
    marginRight: 'auto'
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBombFinance();
  const currentEpoch = useCurrentEpoch();
  
  const { to } = useTreasuryAllocationTimes();

  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );


  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  // TO_DO
  const liveTWAP = -1
  const tvl = -1
  const lastEpochTWAP = -1
  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      {!!account ? (
        <>
          <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
            Dashboard
          </Typography>
        
          <Box mt={10}>

          <Typography color="textPrimary" align="center" variant="h5" gutterBottom>
            Bomb finance Summary
          </Typography>

            <Grid container justify="center" spacing={3} mt={10}>
              
              <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12} md={3} lg={3}>
                        <Typography variant="h6" gutterBottom>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                          Current Supply
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                          Total Supply
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3} lg={3}>
                        <Typography variant="body1" gutterBottom>
                          Price
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                          {/* Metamask */}
                        </Typography>
                      </Grid>

                      {/* $BOMB */}
                      <Grid item xs={12} md={3} lg={3}>
                        <Typography variant="h6" gutterBottom>
                          $BOMB
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(bombCirculatingSupply, 2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(bombTotalSupply, 2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3} lg={3}>
                        <Typography variant="body1" gutterBottom>
                        {bombPriceInDollars ? '$' + bombPriceInDollars : '$-.----'} <br />
                        {bombPriceInBNB ? bombPriceInBNB : '-.----'} BTC
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                        <Button
                          onClick={() => {
                            bombFinance.watchAssetInMetamask('BOMB');
                          }}
                        >
                          {' '}
                          <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
                      </Button>
                        </Typography>
                      </Grid>

                      {/* $BSHARE */}
                      <Grid item xs={12} md={3} lg={3}>
                        <Typography variant="h6" gutterBottom>
                          $BSHARE
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(bShareCirculatingSupply, 2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(bShareTotalSupply, 2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3} lg={3}>
                        <Typography variant="body1" gutterBottom>
                        {bSharePriceInDollars ? '$' + bSharePriceInDollars : '$-.----'} <br />
                        {bSharePriceInBNB ? bSharePriceInBNB : '-.----'} BTC
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                        <Button
                          onClick={() => {
                            bombFinance.watchAssetInMetamask('BSHARE');
                          }}
                        >
                          {' '}
                          <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
                      </Button>
                        </Typography>
                      </Grid>

                      {/* $BBOND */}
                      <Grid item xs={12} md={3} lg={3}>
                        <Typography variant="h6" gutterBottom>
                          $BBOND
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(tBondCirculatingSupply, 2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                        {roundAndFormatNumber(tBondTotalSupply, 2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3} lg={3}>
                        <Typography variant="body1" gutterBottom>
                        {tBondPriceInDollars ? '$' + tBondPriceInDollars : '$-.----'} <br />
                        {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTC
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="body1" gutterBottom>
                        <Button
                          onClick={() => {
                            bombFinance.watchAssetInMetamask('BBOND');
                          }}
                        >
                          {' '}
                          <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
                      </Button>
                        </Typography>
                      </Grid>

                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12} md={12} lg={12}>
                        <Typography >
                           Current Epoch <br/>
                           {Number(currentEpoch)}
                          </Typography>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
                         <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Next Epoch in</Typography>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <Typography variant='body2'>
                          <br/>
                          Live TWAP: <span style={{ color: 'green' }}>{roundAndFormatNumber(liveTWAP, 2)}</span> <br />
                          TVL: <span style={{ color: 'green' }}>{roundAndFormatNumber(tvl, 2)}</span> <br />
                          Last Epoch TWAP: <span style={{ color: 'green' }}>{roundAndFormatNumber(lastEpochTWAP, 2)}</span> <br />
                        </Typography>
                      </Grid>
                    </Grid>

                  </CardContent>
                </Card>
              </Grid>
              
              {/* TO-DO */}
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12} md={6} lg={6}>
                        <Typography variant='overline'>
                          <span style={{ color: '#f9d749' }}>
                            Bomb: <span style={{ color: 'green' }}>{roundAndFormatNumber(-1, 2)}</span>
                          </span> <br />
                          <span style={{ color: '#f9d749' }}>
                            BShare: <span style={{ color: 'green' }}>{roundAndFormatNumber(-1, 2)}</span>
                          </span> <br />
                          <span style={{ color: '#f9d749' }}>
                            BBond: <span style={{ color: 'green' }}>{roundAndFormatNumber(-1, 2)}</span>
                          </span> <br />

                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <Typography variant='overline'>
                          <span style={{ color: '#f9d749' }}>
                            Bomb-BTCB: <span style={{ color: 'green' }}>{roundAndFormatNumber(-1, 2)}</span>
                          </span> <br />
                          <span style={{ color: '#f9d749' }}>
                            BShare-BNT: <span style={{ color: 'green' }}>{roundAndFormatNumber(-1, 2)}</span>
                          </span> <br />
                          <span style={{ color: '#f9d749' }}>
                            Others: <span style={{ color: 'green' }}>{roundAndFormatNumber(-1, 2)}</span>
                          </span> <br />
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
            </Grid>
            
          </Box>

          <Box mt={10}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12} md={8} lg={8}>
                <Card className={classes.gridItem}>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Grid container justify="center" spacing={2}>
                      {/* <Grid item xs md lg>
                      </Grid> */}
                      <Grid item xs={12} md={12} lg={12}>
                        <Box display="flex" justifyContent="flex-end">
                          <Typography variant="overline" gutterBottom>
                              Read Investment Stratergy &gt;
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item justify="right" xs={12} md={12} lg={12}>
                        <Button >
                            <Typography variant="h6" gutterBottom>
                              Invest Now
                            </Typography>
                        </Button>
                      </Grid>
                      <Grid item justify="right" xs={12} md={6} lg={6}>
                        <Button >
                            <Typography variant="h6" gutterBottom>
                              Chat in Discord
                            </Typography>
                        </Button>
                      </Grid>
                      <Grid item justify="right" xs={12} md={6} lg={6}>
                        <Button >
                            <Typography variant="h6" gutterBottom>
                              Read Docs
                            </Typography>
                        </Button>
                      </Grid>
                      <Grid item justify="right" xs={12} md={12} lg={12}>
                        <BoardRoomCard bombFinance={bombFinance} bombStats={bombStats} />
                    </Grid>
                  </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4} lg={4}>
                <Card className={classes.gridItem}>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Latest News
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <BombFarmCard bombFinance={bombFinance} bombStats={bombStats}/>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <BondsCard bombFinance={bombFinance} bombStats={bombStats}/>
              </Grid>

            </Grid>
          </Box>
          

        </>

      ) : (
        <UnlockWallet />
      )}
    </Page >
  );
};

// const StyledBoardroom = styled.div`
//   align-items: center;
//   display: flex;
//   flex-direction: column;
//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const StyledCardsWrapper = styled.div`
//   display: flex;
//   width: 600px;
//   @media (max-width: 768px) {
//     width: 100%;
//     flex-flow: column nowrap;
//     align-items: center;
//   }
// `;

// const StyledCardWrapper = styled.div`
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   @media (max-width: 768px) {
//     width: 80%;
//   }
// `;

export default Dashboard;
