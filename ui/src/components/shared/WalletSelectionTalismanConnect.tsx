import { Button, ChakraProps, Text, ThemingProps, useDisclosure } from '@chakra-ui/react';
import { useTalismanConnect } from '@/providers/TalismanConnectProvider.tsx';
import { WalletSelect } from '@talismn/connect-components';
import { Props, useTypink } from 'typink';

interface WalletSelectionTalismanConnectButtonProps extends Props {
  buttonProps?: ChakraProps & ThemingProps<'Button'>;
}

export function WalletSelectionTalismanConnect({ buttonProps = {} }: WalletSelectionTalismanConnectButtonProps) {
  const { appName } = useTypink();
  const { isOpen, onOpen } = useDisclosure();
  const { connectWallet } = useTalismanConnect();

  return (
    <WalletSelect
      dappName={appName}
      open={isOpen}
      triggerComponent={
        <Button variant='outline' onClick={onOpen} {...buttonProps}>
          Connect Wallet
        </Button>
      }
      header={<Text>Connect to your wallet</Text>}
      showAccountsList={true}
      onWalletSelected={connectWallet}
    />
  );
}
