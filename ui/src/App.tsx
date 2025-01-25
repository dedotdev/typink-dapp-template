import { Box, Divider, Flex } from '@chakra-ui/react';
import GreetBoard from '@/components/GreeterBoard.tsx';
import Psp22Board from '@/components/Psp22Board.tsx';
import BalanceInsufficientAlert from '@/components/shared/BalanceInsufficientAlert.tsx';
import MainFooter from '@/components/shared/MainFooter';
import MainHeader from '@/components/shared/MainHeader';

function App() {
  return (
    <Flex direction='column' minHeight='100vh'>
      <MainHeader />
      <Box maxWidth='container.lg' mx='auto' my={4} px={4} flex={1} w='full'>
        <BalanceInsufficientAlert />

        <Box mt={8} mx={{ base: 0, md: 32 }}>
          <GreetBoard />
          <Divider my={4} />
          <Psp22Board />
        </Box>
      </Box>
      <MainFooter />
    </Flex>
  );
}

export default App;
