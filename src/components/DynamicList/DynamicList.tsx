import React from 'react';
import { areEqual, FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

export interface DynamicListProps<ItemType> {
  data?: null | ItemType[];
  ItemComponent: React.FC<ItemType>;
  SpinnerComponent?: React.FC;
  NoDataComponent?: React.FC;
  listConfig: {
    windowHeight: number;
    windowWidth: number;
    itemHeight: number;
    numItems: number;
    loadMoreItems: (
      startIndex: number,
      stopIndex: number,
    ) => Promise<void> | void;
    isItemLoaded: (index: number) => boolean;
  };
}

export const DynamicList = <ItemType,>({
  data,
  ItemComponent,
  SpinnerComponent,
  NoDataComponent,
  listConfig,
}: DynamicListProps<ItemType>): JSX.Element => {
  const {
    numItems,
    itemHeight,
    windowHeight,
    windowWidth,
    loadMoreItems,
    isItemLoaded,
  } = listConfig;

  const loadingSpinner: JSX.Element | false = data == null &&
    SpinnerComponent != null && <SpinnerComponent />;

  const emptyList: JSX.Element | false = data != null &&
    data.length === 0 &&
    NoDataComponent != null && <NoDataComponent />;

  const Row = React.memo(function Row(props: ListChildComponentProps) {
    const { index, style, data } = props;
    return (
      <div className="ListItem" style={style}>
        <ItemComponent {...data[index]} />
      </div>
    );
  }, areEqual);

  const virtualList: JSX.Element | false = data != null && (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={numItems}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          className="List"
          height={windowHeight}
          itemCount={numItems}
          itemSize={itemHeight}
          ref={ref}
          width={windowWidth}
          itemData={data}
          onItemsRendered={onItemsRendered}
        >
          {Row}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );

  return (
    <>
      {virtualList}
      {loadingSpinner}
      {emptyList}
    </>
  );
};
