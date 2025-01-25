import { Button, ChakraProps, ThemingProps } from '@chakra-ui/react';
import { useSubConnectV2 } from '@/providers/SubConnectV2Provider.tsx';
import { Props } from 'typink';

interface WalletSelectionSubConnectV2ButtonProps extends Props {
  buttonProps?: ChakraProps & ThemingProps<'Button'>;
}

export function WalletSelectionSubConnectV2({ buttonProps = {} }: WalletSelectionSubConnectV2ButtonProps) {
  const { connectWallet } = useSubConnectV2();

  return (
    <Button variant='outline' onClick={() => connectWallet()} {...buttonProps}>
      Connect Wallet
    </Button>
  );
}
