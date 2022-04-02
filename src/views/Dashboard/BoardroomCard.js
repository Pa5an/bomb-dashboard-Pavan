import React, { useMemo } from 'react';
// import {Link} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Typography, Grid} from '@material-ui/core';

import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import { getDisplayBalance } from '../../utils/formatBalance';
import useBank from '../../hooks/useBank';
import useEarnings from '../../hooks/useEarnings';
import useStakedBalance from '../../hooks/useStakedBalance';
import useStatsForPool from '../../hooks/useStatsForPool';

import TokenSymbol from '../../components/TokenSymbol';

const BoardRoomCard = ({bombFinance, bombStats}) => {
  const boardroomEarnings = useEarningsOnBoardroom();

  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const boardroomEarnedInDollars = (Number(bombPriceInDollars) * Number(getDisplayBalance(boardroomEarnings))).toFixed(2);

  const bomb__BANK_ID = 'BombBtcbLPBShareRewardPool';
  const bombBank = useBank(bomb__BANK_ID);
  const bombStatsOnPool = useStatsForPool(bombBank);
  const bombStakedBalance = useStakedBalance(bombBank.contract, bombBank.poolId);
  const bombTokenPriceInDollars = useStakedTokenPriceInDollars(bombBank.depositTokenName, bombBank.depositToken);
  const bombEarnings = useEarnings(bombBank.contract, bombBank.earnTokenName, bombBank.poolId);
  const bombEarnedTokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombEarnedInDollars = (Number(bombEarnedTokenPriceInDollars) * Number(getDisplayBalance(bombEarnings))).toFixed(2);

  const bombStakeEarnedInDollars = (
    Number(bombTokenPriceInDollars || null) * Number(getDisplayBalance(bombStakedBalance, bombBank.depositToken.decimal))
  ).toFixed(2);

  return (
    <Card >
      <CardContent style={{ textAlign: 'center' }}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={1} md={1} lg={1}>
                <TokenSymbol size={32} symbol="BOMB" />
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant="body1" style={{textAlign: 'left'}}>
                  Boardroom <br/>
                  <span style={{ size: '' }}>
                    Stake BSHARE and earn BOMB every epoch
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3} style={{textAlign: 'right'}}>
                <Typography variant="body1" gutterBottom>
                  TVL: ${bombStatsOnPool?.TVL || '---'}
                </Typography>
              </Grid>
            </Grid>
            
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{textAlign: 'right'}}>
            Total Staked: {getDisplayBalance(bombStakedBalance, bombBank.depositToken.decimal)}
          </Grid>
          <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
            <Typography variant="body2" gutterBottom>
              Daily Returns: <br/>
              <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
              {bombBank.closedForStaking ? '0.00' : bombStatsOnPool?.dailyAPR}%
              </span>
            </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
            <Typography variant="body2" gutterBottom>
              Your Stake: <br/>
              {/* <TokenSymbol size={32} symbol="BNT" /> */}
              <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
              {getDisplayBalance(bombStakedBalance, bombBank.depositToken.decimal)}
              </span> <br/>
              <span style={{fontSize: 'large'}}>
                =${bombStakeEarnedInDollars}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
            <Typography variant="body2" gutterBottom>
              Earned: <br/>
              {/* <TokenSymbol size={32} symbol="BNT" /> */}
              <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                {getDisplayBalance(bombEarnings)}
              </span> <br/>
              <span style={{fontSize: 'large'}}>
                =${bombEarnedInDollars}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3} style={{textAlign: 'center'}}>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={12} md={6} lg={6}>
                <Button >
                  Deposit
                </Button>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Button>
                  Withdraw
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Button >
                  Claim Rewards
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BoardRoomCard;
