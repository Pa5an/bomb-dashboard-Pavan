import React from 'react';
import styled from 'styled-components';

import {Button} from '@material-ui/core';

import useBombFinance from '../../../hooks/useBombFinance';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import ERC20 from '../../../bomb-finance/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, {ApprovalState} from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';

interface CustomButton {
  action: string;
  fromToken: ERC20;
  buttonDesc: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
  disabledDescription?: string;
}

const CustomButton: React.FC<CustomButton> = ({
  action,
  fromToken,
  buttonDesc,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
}) => {
  const catchError = useCatchError();
  const {
    contracts: {Treasury},
  } = useBombFinance();
  const [approveStatus, approve] = useApprove(fromToken, Treasury.address);

  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={buttonDesc}
    />,
  );
  return (
          <React.Fragment>
            {approveStatus !== ApprovalState.APPROVED && !disabled ? (
              <Button
                className="shinyButton"
                disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
                onClick={() => catchError(approve(), `Unable to approve ${buttonDesc}`)}
              >
                {buttonDesc}
              </Button>
            ) : (
              <Button
                className={disabled ? 'shinyButtonDisabled' : 'shinyButton'}
                onClick={onPresent}
                disabled={disabled}
              >
                {disabledDescription || action}
              </Button>
            )}
          </React.Fragment>
  );
};

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
`;


export default CustomButton;
