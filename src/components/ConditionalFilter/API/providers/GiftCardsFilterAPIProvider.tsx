import { ApolloClient, useApolloClient } from "@apollo/client";

import { FilterContainer, FilterElement } from "../../FilterElement";
import { FilterAPIProvider } from "../FilterAPIProvider";
import {
  BooleanValuesHandler,
  CurrencyHandler,
  CustomerHandler,
  GiftCardTagsHandler,
  Handler,
  ProductsHandler,
} from "../Handler";
import { getFilterElement } from "../utils";

const createAPIHandler = (
  selectedRow: FilterElement,
  client: ApolloClient<unknown>,
  inputValue: string,
): Handler => {
  const rowType = selectedRow.rowType();

  if (rowType === "currency") {
    return new CurrencyHandler(client, inputValue);
  }

  if (rowType === "products") {
    return new ProductsHandler(client, inputValue);
  }

  if (rowType === "tags") {
    return new GiftCardTagsHandler(client, inputValue);
  }

  if (rowType === "usedBy") {
    return new CustomerHandler(client, inputValue);
  }

  if (rowType === "isActive") {
    return new BooleanValuesHandler([
      {
        label: "Yes",
        value: "true",
        type: rowType,
        slug: "true",
      },
      {
        label: "No",
        value: "false",
        type: rowType,
        slug: "false",
      },
    ]);
  }

  throw new Error(`Unknown filter element: "${rowType}"`);
};

export const useGiftCardsFiltersAPIProvider = (): FilterAPIProvider => {
  const client = useApolloClient();

  const fetchRightOptions = async (
    position: string,
    value: FilterContainer,
    inputValue: string,
  ) => {
    const index = parseInt(position, 10);
    const filterElement = getFilterElement(value, index);

    const handler = createAPIHandler(filterElement, client, inputValue);

    return handler.fetch();
  };

  const fetchAttributeOptions = async () => {
    return [];
  };

  return {
    fetchRightOptions,
    fetchAttributeOptions,
  };
};
