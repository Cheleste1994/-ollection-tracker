'use client';

import { TagRes } from '@/api/query/tag';
import { capitalize } from '@/utils/capitalize';
import { SchemaItem } from '@/utils/yup/schemaItem';
import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react';
import { BadgePlus } from 'lucide-react';
import {
  memo,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';

type ItemsTagsProp = {
  initialTags: TagRes[] | undefined;
  selectTags: Map<string, TagRes>;
  setSelectsTags: Dispatch<SetStateAction<Map<string, TagRes>>>
};

export default memo(function AutocompleteTags({
  initialTags,
  selectTags,
  setSelectsTags
}: ItemsTagsProp) {
  const ref = useRef<HTMLInputElement | null>(null);

  const selectedTags = useCallback(
    () =>
      [...selectTags.values()].map(({ id, name }) => (
        <Chip
          size="sm"
          color="success"
          key={id}
          className={'cursor-pointer'}
          onClick={() =>
            setSelectsTags((state) => {
              const nextState = new Map(state);
              nextState.delete(id);
              return nextState;
            })
          }
        >
          {name}
        </Chip>
      )),
    [selectTags, setSelectsTags]
  );

  const handleClickAddTags = () => {
    setSelectsTags((state) => {
      const nextState = new Map(state);
      const value = ref.current?.value;

      if (
        value &&
        !initialTags?.find(
          ({ name }) => value.toLowerCase() === name.toLocaleLowerCase()
        )
      ) {
        nextState.set(value, { id: value, name: value });
      }
      return nextState;
    });
  };

  return (
        <Autocomplete
          size={'sm'}
          defaultItems={initialTags}
          label="Select tags"
          variant={'bordered'}
          onKeyDown={(e: any) => e.continuePropagation()}
          multiple={true}
          description={
            <div className="flex flex-wrap gap-2">{selectedTags()}</div>
          }
          ref={ref}
          onSelectionChange={(key) => {
            setSelectsTags((state) => {
              const nextState = new Map(state);
              const tag = initialTags?.find(({ id }) => id === key);
              tag && nextState.set(tag.id, tag);
              return nextState;
            });
          }}
          disabledKeys={[...selectTags.keys()]}
          allowsCustomValue
          required={false}
          endContent={
            <BadgePlus
              strokeWidth={2.5}
              size={20}
              className="cursor-pointer mr-1"
              onClick={handleClickAddTags}
            />
          }
        >
          {({ id, name }) => (
            <AutocompleteItem key={id}>{capitalize(name)}</AutocompleteItem>
          )}
        </Autocomplete>


  );
});
