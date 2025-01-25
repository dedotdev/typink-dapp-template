import { createContext, useContext } from 'react';
import { Props } from '@/types.ts';
import { ContractId } from 'contracts/deployments.ts';
import { GreeterContractApi } from 'contracts/types/greeter';
import { Psp22ContractApi } from 'contracts/types/psp22';
import { Contract } from 'dedot/contracts';
import { useContract } from 'typink';

interface AppContextProps {
  greeterContract?: Contract<GreeterContractApi>;
  psp22Contract?: Contract<Psp22ContractApi>;
}

const AppContext = createContext<AppContextProps>({} as any);

export const useApp = () => {
  return useContext(AppContext);
};

export function AppProvider({ children }: Props) {
  const { contract: greeterContract } = useContract<GreeterContractApi>(ContractId.GREETER);
  const { contract: psp22Contract } = useContract<Psp22ContractApi>(ContractId.PSP22);

  return <AppContext.Provider value={{ greeterContract, psp22Contract }}>{children}</AppContext.Provider>;
}
