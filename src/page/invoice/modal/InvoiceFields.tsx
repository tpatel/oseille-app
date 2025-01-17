import { Box, Input, Text, Textarea } from '@chakra-ui/react';
import { Control, UseFormRegister } from 'react-hook-form';
import { InvoiceInfoInput } from '../../../backend';

interface InvoiceFieldsProps {
  control: Control<InvoiceInfoInput, any>;
  register: UseFormRegister<InvoiceInfoInput>;
}

export function InvoiceFields({ register, control }: InvoiceFieldsProps) {
  return (
    <>
      <Box p={1}>
        <Text>Date de facturation</Text>
        <Input
          type="date"
          {...register('createdAt')}
        />
      </Box>
      <Box p={1}>
        <Text>Notes</Text>
        <Textarea
          placeholder="Ristourne sur les aubergines"
          {...register('notes')}
        />
      </Box>
    </>
  );
}
