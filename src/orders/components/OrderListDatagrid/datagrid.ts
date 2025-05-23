// @ts-strict-ignore
import {
  dateCell,
  moneyCell,
  pillCell,
  readonlyTextCell,
  textCell,
} from "@dashboard/components/Datagrid/customCells/cells";
import { GetCellContentOpts } from "@dashboard/components/Datagrid/Datagrid";
import { AvailableColumn } from "@dashboard/components/Datagrid/types";
import { OrderChargeStatusEnum, OrderListQuery } from "@dashboard/graphql";
import {
  getStatusColor,
  transformChargedStatus,
  transformOrderStatus,
  transformPaymentStatus,
} from "@dashboard/misc";
import { OrderListUrlSortField } from "@dashboard/orders/urls";
import { RelayToFlat, Sort } from "@dashboard/types";
import { getColumnSortDirectionIcon } from "@dashboard/utils/columns/getColumnSortDirectionIcon";
import { GridCell, Item, TextCell } from "@glideapps/glide-data-grid";
import { DefaultTheme, useTheme } from "@saleor/macaw-ui-next";
import { IntlShape, useIntl } from "react-intl";

import { columnsMessages } from "./messages";

export const orderListStaticColumnAdapter = (
  emptyColumn: AvailableColumn,
  intl: IntlShape,
  sort: Sort<OrderListUrlSortField>,
) =>
  [
    emptyColumn,
    {
      id: "number",
      title: intl.formatMessage(columnsMessages.number),
      width: 100,
    },
    {
      id: "date",
      title: intl.formatMessage(columnsMessages.date),
      width: 300,
    },
    {
      id: "customer",
      title: intl.formatMessage(columnsMessages.customer),
      width: 200,
    },
    {
      id: "payment",
      title: intl.formatMessage(columnsMessages.payment),
      width: 200,
    },
    {
      id: "status",
      title: intl.formatMessage(columnsMessages.status),
      width: 200,
    },
    {
      id: "total",
      title: intl.formatMessage(columnsMessages.total),
      width: 150,
    },
    {
      id: "channel",
      title: intl.formatMessage(columnsMessages.channel),
      width: 200,
    },
  ].map(column => ({
    ...column,
    icon: getColumnSortDirectionIcon(sort, column.id),
  }));

interface GetCellContentProps {
  columns: AvailableColumn[];
  orders: RelayToFlat<OrderListQuery["orders"]>;
}

function getDatagridRowDataIndex(row, removeArray) {
  return row + removeArray.filter(r => r <= row).length;
}

export const useGetCellContent = ({ columns, orders }: GetCellContentProps) => {
  const intl = useIntl();
  const { theme } = useTheme();

  return ([column, row]: Item, { added, removed }: GetCellContentOpts): GridCell => {
    const columnId = columns[column]?.id;
    const rowData = added.includes(row) ? undefined : orders[getDatagridRowDataIndex(row, removed)];

    if (!columnId || !rowData) {
      return readonlyTextCell("");
    }

    switch (columnId) {
      case "number":
        return readonlyTextCell(rowData.number);
      case "date":
        return getDateCellContent(rowData);
      case "customer":
        return getCustomerCellContent(rowData);
      case "payment":
        return getPaymentCellContent(intl, theme, rowData);
      case "status":
        return getStatusCellContent(intl, theme, rowData);
      case "total":
        return getTotalCellContent(rowData);
      case "channel":
        return getChannelCellContent(rowData);
      default:
        return textCell("");
    }
  };
};

const COMMON_CELL_PROPS: Partial<GridCell> = { cursor: "pointer" };

export function getDateCellContent(rowData: RelayToFlat<OrderListQuery["orders"]>[number]) {
  return dateCell(rowData?.created, COMMON_CELL_PROPS);
}

export function getCustomerCellContent(
  rowData: RelayToFlat<OrderListQuery["orders"]>[number],
): TextCell {
  if (rowData?.billingAddress?.firstName && rowData?.billingAddress?.lastName) {
    return readonlyTextCell(
      `${rowData.billingAddress.firstName} ${rowData.billingAddress.lastName}`,
    );
  }

  if (rowData?.userEmail) {
    return readonlyTextCell(rowData.userEmail);
  }

  return readonlyTextCell("-");
}

export function getStatusCellContent(
  intl: IntlShape,
  currentTheme: DefaultTheme,
  rowData: RelayToFlat<OrderListQuery["orders"]>[number],
) {
  const orderStatus = transformOrderStatus(rowData.status, intl);

  if (orderStatus) {
    const color = getStatusColor({
      status: orderStatus.status,
      currentTheme,
    });

    return pillCell(orderStatus.localized, color, COMMON_CELL_PROPS);
  }

  return readonlyTextCell("-");
}

const higherPriorityChargeStatuses = [OrderChargeStatusEnum.OVERCHARGED];

export function getPaymentCellContent(
  intl: IntlShape,
  currentTheme: DefaultTheme,
  rowData: RelayToFlat<OrderListQuery["orders"]>[number],
) {
  if (higherPriorityChargeStatuses.includes(rowData.chargeStatus)) {
    const { localized, status } = transformChargedStatus(rowData.chargeStatus, intl);

    const color = getStatusColor({
      status,
      currentTheme,
    });

    return pillCell(localized, color, COMMON_CELL_PROPS);
  }

  const paymentStatus = transformPaymentStatus(rowData.paymentStatus, intl);

  if (paymentStatus) {
    const color = getStatusColor({
      status: paymentStatus.status,
      currentTheme,
    });

    return pillCell(paymentStatus.localized, color, COMMON_CELL_PROPS);
  }

  return readonlyTextCell("-");
}

export function getTotalCellContent(rowData: RelayToFlat<OrderListQuery["orders"]>[number]) {
  if (rowData?.total?.gross) {
    return moneyCell(rowData.total.gross.amount, rowData.total.gross.currency, COMMON_CELL_PROPS);
  }

  return readonlyTextCell("-");
}

export function getChannelCellContent(
  rowData: RelayToFlat<OrderListQuery["orders"]>[number],
): TextCell {
  if (rowData?.channel?.name) {
    return readonlyTextCell(rowData.channel.name);
  }

  return readonlyTextCell("-");
}
