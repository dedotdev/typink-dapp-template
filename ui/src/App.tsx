import { Box, Flex } from '@chakra-ui/react';
import GreetBoard from '@/components/GreeterBoard.tsx';
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
        </Box>
      </Box>
      <MainFooter />
    </Flex>
  );
}

export default App;
