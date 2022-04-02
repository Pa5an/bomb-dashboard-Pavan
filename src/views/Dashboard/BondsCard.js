import React, { useMemo, useCallback } from 'react';
// import {Link} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Typography, Grid} from '@material-ui/core';

import CustomButton from './components/Button';

import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useBondStats from '../../hooks/useBondStats';
import {useTransactionAdder} from '../../state/transactions/hooks';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';

import { getDisplayBalance } from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../bomb-finance/constants';

import TokenSymbol from '../../components/TokenSymbol';
// import {getDisplayBalance} from '../../utils/formatBalance';


const BondsCard = ({bombFinance, bombStats}) => {
  const boardroomStakedBalance = useStakedBalanceOnBoardroom();
  const boardroomEarnings = useEarningsOnBoardroom();
  const bondStat = useBondStats();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const cashPrice = useCashPriceInLastTWAP();
  const bondsPurchasable = useBondsPurchasable();
  const addTransaction = useTransactionAdder();



  const totalStaked = useTotalStakedOnBoardroom();


  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);


    const boardroomStakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
  const boardroomTokenPriceInDollars = useMemo(
    () =>
    boardroomStakedTokenPriceInDollars
        ? (Number(boardroomStakedTokenPriceInDollars) * Number(getDisplayBalance(boardroomStakedBalance))).toFixed(2).toString()
        : null,
    [boardroomStakedTokenPriceInDollars, boardroomStakedBalance],
  );
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const boardroomEarnedInDollars = (Number(bombPriceInDollars) * Number(getDisplayBalance(boardroomEarnings))).toFixed(2);


  const handleBuyBonds = useCallback(
    async (amount) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, {summary: `Redeem ${amount} BBOND`});
    },
    [bombFinance, addTransaction],
  );

  return (
    <Card >
                          <CardContent style={{ textAlign: 'center' }}>
                            <Grid container justify="center" spacing={2}>
                              <Grid item xs={12} md={12} lg={12}>
                                <Grid container justify="center" spacing={1}>
                                  <Grid item xs={1} md={1} lg={1}>
                                    <TokenSymbol size={45} symbol="BOMB" />
                                  </Grid>
                                  <Grid item xs={11} md={11} lg={11}>
                                    <Typography variant="body1" style={{textAlign: 'left'}}>
                                      Bonds <br/>
                                      <span style={{ size: '' }}>
                                        BBOND can be purchased only on contradiction period, when TWAP of BOMB is below 1
                                      </span>
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
                                <Typography variant="body2" gutterBottom>
                                  Current Price: (Bomb)^2 <br/>
                                  <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                                   1000 BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB
                                  </span>
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={3} lg={3} style={{textAlign: 'left'}}>
                                <Typography variant="body2" gutterBottom>
                                  Available to Stake: <br/>
                                </Typography>
                                  <Grid container justify="center" spacing={2}>
                                      <Grid item xs={1} md={1} lg={1}>
                                        <TokenSymbol size={32} symbol="BOMB" />
                                      </Grid>
                                      <Grid item xs={11} md={11} lg={11}>
                                        <Typography variant="body1" style={{textAlign: 'left'}}>
                                          <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                                           {getDisplayBalance(bondBalance)} BBOND
                                          </span>
                                        </Typography>
                                      </Grid>
                                    </Grid>
                              </Grid>
                              
                              <Grid item xs={3} md={3} lg={3} style={{textAlign: 'left'}}>
                                <Grid container justify="center" spacing={1}>
                                  <Grid item xs={12} md={8} lg={8}>
                                    <Typography variant="body2" gutterBottom>
                                      <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                                        Purchase BBond
                                      </span> <br/>
                                      Bomb is over peg
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={4} lg={4} style={{textAlign: 'right'}}>
                                    <CustomButton
                                     action="Purchase"
                                     fromToken={bombFinance.BOMB}
                                     buttonDesc="Purchase"
                                     priceDesc={
                                       !isBondPurchasable
                                         ? 'BOMB is over peg'
                                         : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
                                     }
                                     onExchange={handleBuyBonds}
                                     disabled={!bondStat || isBondRedeemable}
                                     />
                                  </Grid>

                                  <Grid item xs={12} md={8} lg={8}>
                                    <Typography variant="body2" gutterBottom>
                                      <span style={{ fontWeight: 'bold', fontSize: 'larger'}}>
                                        Reedem BBond
                                      </span>
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={4} lg={4}>
                                    <CustomButton
                                      action="Redeem"
                                      fromToken={bombFinance.BBOND}
                                      buttonDesc="Reedem"
                                      priceDesc={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
                                      onExchange={handleRedeemBonds}
                                      disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                                      disabledDescription={!isBondRedeemable ? `Reedem` : null}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
  );
};

export default BondsCard;
