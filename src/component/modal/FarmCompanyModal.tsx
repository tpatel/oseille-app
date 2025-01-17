import { Flex, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { FarmInput, updateFarm } from '../../backend';
import { EMPTY_FARM } from '../../utils/defaults';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { MyModal } from './MyModal';

interface FarmCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const configSchema = z.object({
  siret: z.string(),
  naf: z.string(),
  tva: z.string(),
});

export function FarmCompanyModal({ isOpen, onClose }: FarmCompanyModalProps) {
  const { farm } = useRouteLoaderData('farm') as any;

  const { say } = useSideKick();
  const cancelRef = useRef<any>();

  const { register, handleSubmit, reset, formState } = useForm<FarmInput>({
    resolver: zodResolver(configSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  const onSubmit = (e: FarmInput) => {
    farm &&
      updateFarm({ ...farm, ...e })
        .then(() =>
          say({
            sentence: `Les informations professionnelles ont bien été enregistrées`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .then(onClose)
        .catch(console.error);
  };

  useEffect(() => {
    if (farm) reset(farm);
  }, [farm]);

  return (
    <MyModal
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Mon entreprise"
      disabled={!formState.isDirty}
    >
      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="siret"
        >
          SIRET
        </FormLabel>
        <Input
          placeholder={'SIRET'}
          {...register('siret')}
        />
      </Flex>

      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="naf"
        >
          NAF
        </FormLabel>
        <Input
          placeholder={'NAF'}
          {...register('naf')}
        />
      </Flex>

      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="tva"
        >
          N° TVA
        </FormLabel>
        <Input
          placeholder={'N° TVA'}
          {...register('tva')}
        />
      </Flex>
    </MyModal>
  );
}
