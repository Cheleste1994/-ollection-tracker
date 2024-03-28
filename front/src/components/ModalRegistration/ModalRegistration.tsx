'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import { MailIcon, LockIcon } from 'lucide-react';
import { useRegisterUserByToken } from '@/hooks/useRegisterUserByToken';
import schema, { SchemaAuth } from '@/utils/yup/schemaValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ModalRegistrationProps = {} & ReturnType<typeof useDisclosure>;

export default function ModalRegistration({
  isOpen,
  onClose,
  onOpenChange,
}: ModalRegistrationProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SchemaAuth>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { createUser } = useRegisterUserByToken();

  const onSubmit = async (data: SchemaAuth) => {
    try {
      const result = await createUser(data);
      toast.success(`User ${result.data?.createUser.email} added`);
      onClose();
    } catch {
      toast.warning('This user is already registered');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Add New</ModalHeader>
              <ModalBody>
                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      label="Email"
                      variant="bordered"
                      isInvalid={!!errors.email?.message}
                      errorMessage={errors.email?.message}
                      description="We'll never share your email with anyone else."
                      className="w-full"
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Password"
                      variant="bordered"
                      isInvalid={!!errors.password?.message}
                      errorMessage={errors.password?.message}
                      description="Enter password"
                      {...field}
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      type="password"
                    />
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type={'submit'}>
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
