import { Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useSubConnectV2 } from '@/providers/SubConnectV2Provider.tsx';
import { shortenAddress } from '@/utils/string.ts';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { formatBalance, useBalances, useTypink } from 'typink';

function ConnectedWallet() {
  const { wallet } = useSubConnectV2();
  if (!wallet) return null;

  return (
    <Flex align='center' gap={3} flex={1} justify='center' pb={2}>
      <Box dangerouslySetInnerHTML={{ __html: wallet?.icon }} width={6} />
      <Text fontWeight='600' fontSize='14'>
        {wallet?.label}
      </Text>
    </Flex>
  );
}

export function AccountSelectionSubConnectV2() {
  const { wallet, connectedAccount, setConnectedAccount, signOut } = useSubConnectV2();
  const { network } = useTypink();

  const accounts = useMemo(
    () => (wallet?.accounts || []).map((a) => ({ address: a.address, name: a.uns?.name })),
    [wallet],
  );
  const addresses = useMemo(() => accounts.map((a) => a.address), [accounts]);
  const balances = useBalances(addresses);

  useEffect(() => {
    if (connectedAccount && accounts.map((one) => one.address).includes(connectedAccount.address)) {
      return;
    }

    setConnectedAccount(accounts[0]);
  }, [accounts]);

  if (!connectedAccount) {
    return <></>;
  }

  const { name, address } = connectedAccount;

  return (
    <Box>
      <Menu autoSelect={false}>
        <MenuButton as={Button} variant='outline' rightIcon={<ChevronDownIcon boxSize='5' />}>
          <Flex align='center' gap={2}>
            <Text fontWeight='semi-bold' fontSize='md'>
              {name}
            </Text>
            <Text fontSize='sm' fontWeight='400'>
              ({shortenAddress(address)})
            </Text>
          </Flex>
        </MenuButton>

        <MenuList>
          <ConnectedWallet />

          {accounts.map((one) => (
            <MenuItem
              backgroundColor={one.address === address ? 'gray.200' : ''}
              gap={2}
              key={one.address}
              onClick={() => setConnectedAccount(one)}>
              <Flex direction='column'>
                <Text fontWeight='500'>{one.name}</Text>

                <Text fontSize='xs'>Address: {shortenAddress(one.address)}</Text>
                <Text fontSize='xs'>Balance: {formatBalance(balances[one.address]?.free, network)}</Text>
              </Flex>
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem onClick={signOut} color='red.500'>
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
