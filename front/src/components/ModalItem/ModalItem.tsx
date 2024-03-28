'use client';

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Image,
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Chip,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useRegisterUserByToken } from '@/hooks/useRegisterUserByToken';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import schema, { SchemaItem } from '@/utils/yup/schemaItem';
import InputUpload from '../InputUpload/InputUpload';
import NextImage from 'next/image';
import { UPLOAD_ITEMS } from '@/api/mutation/upload';
import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_ITEM,
  CREATE_ITEM_CONTAINER,
  ITEMS_DELETE,
} from '@/api/mutation/item';
import { useFilesDownload } from '@/hooks/useFilesDownload';
import { GET_CATEGORY } from '@/api/query/category';
import { capitalize } from '@/utils/capitalize';
import { GET_TAGS, TagRes } from '@/api/query/tag';
import AutocompleteTags from './AutocompleteTags';
import { StatusItem } from '@/types/items';

type ModalItemProps = {} & ReturnType<typeof useDisclosure>;

export default function ModalItem({
  isOpen,
  onClose,
  onOpenChange,
}: ModalItemProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SchemaItem>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [isClickUpload, setIsClickUpload] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [selectTags, setSelectsTags] = useState<Map<string, TagRes>>(new Map());

  const { data: dataCategory } = useQuery(GET_CATEGORY);
  const { data: dataTags } = useQuery(GET_TAGS);

  const [createItemContainer, { data: dataContainer }] = useMutation(
    CREATE_ITEM_CONTAINER
  );
  const [createItem] = useMutation(CREATE_ITEM);
  const [uploadItem, { data: dataImage }] = useMutation(UPLOAD_ITEMS);

  const { urlBase64, loading: isLoadingFile } = useFilesDownload<string>(
    dataImage?.uploadItem.image
  );

  const categoryMemo = useMemo(() => dataCategory?.category, [dataCategory]);
  const tagsMemo = useMemo(() => dataTags?.tags, [dataTags]);

  const [deleteItems] = useMutation(ITEMS_DELETE);

  const handleCreate = useCallback(() => {
    if (isOpen) {
      createItemContainer({
        variables: {
          dto: {},
        },
      });
    } else {
      dataContainer?.createItemContainer.id &&
        deleteItems({
          variables: {
            itemIds: [dataContainer.createItemContainer.id],
          },
        });
    }
  }, [isOpen, dataContainer, deleteItems, createItemContainer]);

  useEffect(() => {
    handleCreate();
  }, [isOpen]);

  const onSubmit = async ({ name, description, category }: SchemaItem) => {
    try {
      const data = await createItem({
        variables: {
          dto: {
            name,
            description,
            image: urlBase64?.id,
            status: StatusItem.ACTIVE,
            tags: [...selectTags.values()].map(({ name }) => name),
            category: dataCategory?.category.find(({ id }) => id === category)
              ?.name,
          },
        },
      });

      toast.success('Item added to the collection');
      onClose();
    } catch {
      toast.warning('This items is already registered');
    }
  };

  const handleInputUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoadingImage(() => true);
    const { validity, files } = e.target;
    try {
      if (validity.valid && files && dataContainer?.createItemContainer.id) {
        const { data } = await uploadItem({
          variables: {
            file: files[0],
            itemId: dataContainer.createItemContainer.id,
          },
        });

        data && toast.success('Image uploaded');
      }
    } catch {
      toast.error('Failed to load image');
    }

    setIsLoadingImage(() => false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        scrollBehavior={'normal'}
        classNames={{
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
          base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Add New Item
              </ModalHeader>
              <ModalBody>
                <Accordion>
                  <AccordionItem
                    key="image"
                    aria-label="image"
                    title="Add Image"
                  >
                    <Image
                      isZoomed
                      width={300}
                      height={200}
                      classNames={{
                        wrapper:
                          'bg-bg dark:bg-slate-800 mx-auto cursor-pointer',
                      }}
                      alt="Image"
                      src={urlBase64?.file || ''}
                      isLoading={isLoadingImage || isLoadingFile}
                      onClick={() => setIsClickUpload(true)}
                    />
                  </AccordionItem>
                </Accordion>

                <Controller
                  name="name"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      label="Name"
                      variant="bordered"
                      isInvalid={!!errors.name?.message}
                      errorMessage={errors.name?.message}
                      className="w-full"
                      autoFocus
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="description"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      variant="bordered"
                      placeholder="Enter your description"
                      disableAnimation
                      disableAutosize
                      classNames={{
                        input: 'resize-y min-h-[100px]',
                      }}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="category"
                  defaultValue={''}
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      size={'sm'}
                      defaultItems={categoryMemo}
                      label="Select an category"
                      variant={'bordered'}
                      onKeyDown={(e: any) => e.continuePropagation()}
                      {...field}
                      onSelectionChange={field.onChange}
                    >
                      {({ id, name }) => (
                        <AutocompleteItem key={id}>
                          {capitalize(name)}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />

                <AutocompleteTags
                  initialTags={tagsMemo}
                  selectTags={selectTags}
                  setSelectsTags={setSelectsTags}
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
              <InputUpload
                isClick={isClickUpload}
                setIsClickUpload={setIsClickUpload}
                handleInputUpload={handleInputUpload}
              />
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
