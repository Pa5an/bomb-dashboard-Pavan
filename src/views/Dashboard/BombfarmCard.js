import React, { useMemo } from 'react';
// import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles'; 
import {Button, Card, CardContent, Typography, Grid} from '@material-ui/core';

import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useBank from '../../hooks/useBank';
import useEarnings from '../../hooks/useEarnings';
import useStakedBalance from '../../hooks/useStakedBalance';
import useShareStats from '../../hooks/usebShareStats';
import useStatsForPool from '../../hooks/useStatsForPool';

import { getDisplayBalance } from '../../utils/formatBalance';

import TokenSymbol from '../../components/TokenSymbol';

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

const BombFarmCard = ({bombFinance, bombStats}) => {
    const classes = useStyles();
//   const bombFinance = useBombFinance();
//   const bombStats = useBombStats();
  const boardroomEarnings = useEarningsOnBoardroom();
//   const bombStats = useBombStats();
  const tShareStats = useShareStats();
  
  const BSHARE__BANK_ID = 'BshareBnbLPBShareRewardPool';
  const bShareBank = useBank(BSHARE__BANK_ID);
  const bShareStatsOnPool = useStatsForPool(bShareBank);
  const bShareStakedBalance = useStakedBalance(bShareBank.contract, bShareBank.poolId);
  const bShareTokenPriceInDollars = useStakedTokenPriceInDollars(bShareBank.depositTokenName, bShareBank.depositToken);
  const bShareEarnings = useEarnings(bShareBank.contract, bShareBank.earnTokenName, bShareBank.poolId);
  const bShareEarnedTokenPriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const bShareEarnedInDollars = (Number(bShareEarnedTokenPriceInDollars) * Number(getDisplayBalance(bShareEarnings))).toFixed(2);

  const bShareStakeEarnedInDollars = (
    Number(bShareTokenPriceInDollars || null) * Number(getDisplayBalance(bShareStakedBalance, bShareBank.depositToken.decimal))
  ).toFixed(2);


  const BBOMB__BANK_ID = 'BombBtcbLPBShareRewardPool';
  const bBombBank = useBank(BBOMB__BANK_ID);
  const bBombStatsOnPool = useStatsForPool(bBombBank);
  const bBombStakedBalance = useStakedBalance(bBombBank.contract, bBombBank.poolId);
  const bBombTokenPriceInDollars = useStakedTokenPriceInDollars(bBombBank.depositTokenName, bBombBank.depositToken);
  const bBombEarnings = useEarnings(bBombBank.contract, bBombBank.earnTokenName, bBombBank.poolId);
  const bBombEarnedTokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bBombEarnedInDollars = (Number(bBombEarnedTokenPriceInDollars) * Number(getDisplayBalance(bBombEarnings))).toFixed(2);

  const bBombStakeEarnedInDollars = (
    Number(bBombTokenPriceInDollars || null) * Number(getDisplayBalance(bBombStakedBalance, bBombBank.depositToken.decimal))
  ).toFixed(2);

  return (
    <Card >
        <CardContent style={{ textAlign: 'center' }}>
        <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={8} md={8} lg={8}>
                    <Typography variant="body1" style={{textAlign: 'left'}}>
                        <span style={{ fontWeight: 'bold' }}>
                            BOMB Farm
                        </span> <br />
                        Stake your LP tokens in our farm to start earning $BSHARE
                    </Typography>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} style={{textAlign: 'right'}}>
                    <Button>
                        Claim All
                    </Button>
                    </Grid>

                {/* BOMB-BTCB */}
                <Grid item xs={12} md={12} lg={12}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={8} md={8} lg={8} >
                            <Grid container justify="left" style={{Align: 'left'}}>
                                <Grid item xs md lg style={{textAlign: 'right'}}>
                                <TokenSymbol size={20} symbol="BOMB" />
                                </Grid>
                                <Grid item xs md lg>
                                <Typography variant="body1" style={{textAlign: 'left', font: 'larger'}}>
                                    BOMB-BTCB &nbsp;
                                    <span style={{ fill: 'green', color: 'white' }}>
                                        recommended
                                    </span>
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3} style={{textAlign: 'right'}}>
                        <Typography variant="body1" gutterBottom>
                            TVL: ${bBombStatsOnPool?.TVL || '---'}
                        </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            
                <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
                <Typography variant="body2" gutterBottom>
                    Daily Returns: <br/>
                    <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                    {bBombBank.closedForStaking ? '0.00' : bBombStatsOnPool?.dailyAPR}%
                    </span>
                </Typography>
                </Grid>
                <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
                <Typography variant="body2" gutterBottom>
                    Your Stake: <br/>
                    {/* <TokenSymbol size={32} symbol="BNT" /> */}
                    <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                    {getDisplayBalance(bBombStakedBalance, bBombBank.depositToken.decimal)}
                    </span> <br/>
                    <span style={{fontSize: 'large'}}>
                    =${bBombStakeEarnedInDollars}
                    </span>
                </Typography>
                </Grid>
                <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
                <Typography variant="body2" gutterBottom>
                    Earned: <br/>
                    {/* <TokenSymbol size={32} symbol="BNT" /> */}
                    <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                    {getDisplayBalance(bBombEarnings)}
                    </span> <br/>
                    <span style={{fontSize: 'large'}}>
                    =${bBombEarnedInDollars}
                    </span>
                </Typography>
                </Grid>
                <Grid item xs={3} md={3} lg={3} style={{textAlign: 'center'}}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={12} md={4} lg={4}>
                        <Button >
                            Deposit
                        </Button>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                        <Button>
                            Withdraw
                        </Button>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                        <Button >
                            Claim Rewards
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>

                {/* BSHARE-BNB */}
                <Grid item xs={12} md={12} lg={12}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={8} md={8} lg={8} >
                            <Grid container justify="left" style={{Align: 'left'}}>
                                <Grid item xs md lg style={{textAlign: 'right'}}>
                                <TokenSymbol size={20} symbol="BOMB" />
                                </Grid>
                                <Grid item xs md lg>
                                <Typography variant="body1" style={{textAlign: 'left', font: 'larger'}}>
                                    BSHARE-BNB &nbsp;
                                    <span style={{ fill: 'green', color: 'white' }}>
                                        recommended
                                    </span>
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3} style={{textAlign: 'right'}}>
                        <Typography variant="body1" gutterBottom>
                            TVL: ${bShareStatsOnPool?.TVL || '---'}
                        </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            
                <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
                <Typography variant="body2" gutterBottom>
                    Daily Returns: <br/>
                    <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                    {bShareBank.closedForStaking ? '0.00' : bShareStatsOnPool?.dailyAPR}%
                    </span>
                </Typography>
                </Grid>
                <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
                <Typography variant="body2" gutterBottom>
                    Your Stake: <br/>
                    {/* <TokenSymbol size={32} symbol="BNT" /> */}
                    <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                    {getDisplayBalance(bShareStakedBalance, bShareBank.depositToken.decimal)}
                    </span> <br/>
                    <span style={{fontSize: 'large'}}>
                    =${bShareStakeEarnedInDollars}
                    </span>
                </Typography>
                </Grid>
                <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
                <Typography variant="body2" gutterBottom>
                    Earned: <br/>
                    {/* <TokenSymbol size={32} symbol="BNT" /> */}
                    <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                    {getDisplayBalance(bShareEarnings)}
                    </span> <br/>
                    <span style={{fontSize: 'large'}}>
                    =${bShareEarnedInDollars}
                    </span>
                </Typography>
                </Grid>
                <Grid item xs={3} md={3} lg={3} style={{textAlign: 'center'}}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={12} md={4} lg={4}>
                        <Button >
                            Deposit
                        </Button>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                        <Button>
                            Withdraw
                        </Button>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                        <Button >
                            Claim Rewards
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        </Grid>
        </Grid>

        </CardContent>
    </Card>
  );
};

export default BombFarmCard;
