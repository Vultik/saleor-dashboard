// @ts-strict-ignore
import { QueryResult } from "@apollo/client";
import {
  getReferenceAttributeEntityTypeFromAttribute,
  mergeAttributeValues,
} from "@dashboard/attributes/utils/data";
import { TopNav } from "@dashboard/components/AppLayout/TopNav";
import AssignAttributeValueDialog from "@dashboard/components/AssignAttributeValueDialog";
import { Container } from "@dashboard/components/AssignContainerDialog";
import {
  AttributeInput,
  Attributes,
  VariantAttributeScope,
} from "@dashboard/components/Attributes";
import CardSpacer from "@dashboard/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@dashboard/components/ConfirmButton";
import Grid from "@dashboard/components/Grid";
import { DetailPageLayout } from "@dashboard/components/Layouts";
import { Metadata } from "@dashboard/components/Metadata";
import { Savebar } from "@dashboard/components/Savebar";
import {
  ProductErrorWithAttributesFragment,
  ProductVariantCreateDataQuery,
  SearchAttributeValuesQuery,
  SearchCategoriesQuery,
  SearchCollectionsQuery,
  SearchPagesQuery,
  SearchProductsQuery,
  SearchWarehousesQuery,
} from "@dashboard/graphql";
import { SubmitPromise } from "@dashboard/hooks/useForm";
import useNavigator from "@dashboard/hooks/useNavigator";
import { ProductDetailsChannelsAvailabilityCard } from "@dashboard/products/components/ProductVariantChannels/ChannelsAvailabilityCard";
import { productUrl } from "@dashboard/products/urls";
import { FetchMoreProps, RelayToFlat, ReorderAction } from "@dashboard/types";
import { mapEdgesToItems } from "@dashboard/utils/maps";
import React from "react";
import { defineMessages, useIntl } from "react-intl";

import { ProductShipping } from "../ProductShipping";
import { ProductStocks } from "../ProductStocks";
import { useManageChannels } from "../ProductVariantChannels/useManageChannels";
import { VariantChannelsDialog } from "../ProductVariantChannels/VariantChannelsDialog";
import ProductVariantCheckoutSettings from "../ProductVariantCheckoutSettings/ProductVariantCheckoutSettings";
import ProductVariantName from "../ProductVariantName";
import ProductVariantNavigation from "../ProductVariantNavigation";
import { ProductVariantPrice } from "../ProductVariantPrice";
import ProductVariantCreateForm, {
  ProductVariantCreateData,
  ProductVariantCreateHandlers,
} from "./form";

const messages = defineMessages({
  attributesHeader: {
    id: "f3B4tc",
    defaultMessage: "Variant Attributes",
    description: "attributes, section header",
  },
  attributesSelectionHeader: {
    id: "o6260f",
    defaultMessage: "Variant Selection Attributes",
    description: "attributes, section header",
  },
  deleteVariant: {
    id: "7hNjaI",
    defaultMessage: "Delete Variant",
    description: "button",
  },
  saveVariant: {
    id: "U9CIo7",
    defaultMessage: "Save variant",
    description: "button",
  },
  pricingCardSubtitle: {
    id: "sw8Wl2",
    defaultMessage:
      "There is no channel to define prices for. You need to first add variant to channels to define prices.",
    description: "variant pricing section subtitle",
  },
});

interface ProductVariantCreatePageProps {
  productId: string;
  defaultVariantId?: string;
  disabled: boolean;
  errors: ProductErrorWithAttributesFragment[];
  header: string;
  product: ProductVariantCreateDataQuery["product"];
  saveButtonBarState: ConfirmButtonTransitionState;
  weightUnit: string;
  referencePages?: RelayToFlat<SearchPagesQuery["search"]>;
  referenceProducts?: RelayToFlat<SearchProductsQuery["search"]>;
  referenceCategories?: RelayToFlat<SearchCategoriesQuery["search"]>;
  referenceCollections?: RelayToFlat<SearchCollectionsQuery["search"]>;
  attributeValues: RelayToFlat<SearchAttributeValuesQuery["attribute"]["choices"]>;
  onSubmit: (data: ProductVariantCreateData) => SubmitPromise;
  onVariantClick: (variantId: string) => void;
  onVariantReorder: ReorderAction;
  onWarehouseConfigure: () => void;
  assignReferencesAttributeId?: string;
  onAssignReferencesClick: (attribute: AttributeInput) => void;
  fetchReferencePages?: (data: string) => void;
  fetchReferenceProducts?: (data: string) => void;
  fetchAttributeValues: (query: string, attributeId: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchMoreReferenceProducts?: FetchMoreProps;
  fetchMoreAttributeValues?: FetchMoreProps;
  onCloseDialog: () => void;
  onAttributeSelectBlur: () => void;
  fetchMoreWarehouses: () => void;
  searchWarehousesResult: QueryResult<SearchWarehousesQuery>;
}

const ProductVariantCreatePage: React.FC<ProductVariantCreatePageProps> = ({
  productId,
  defaultVariantId,
  disabled,
  errors: apiErrors,
  header,
  product,
  saveButtonBarState,
  weightUnit,
  referencePages = [],
  referenceProducts = [],
  referenceCategories = [],
  referenceCollections = [],
  attributeValues,
  onSubmit,
  onVariantReorder,
  onWarehouseConfigure,
  assignReferencesAttributeId,
  onAssignReferencesClick,
  fetchReferencePages,
  fetchReferenceProducts,
  fetchAttributeValues,
  fetchMoreReferencePages,
  fetchMoreReferenceProducts,
  fetchMoreAttributeValues,
  onCloseDialog,
  onAttributeSelectBlur,
  fetchMoreWarehouses,
  searchWarehousesResult,
}) => {
  const intl = useIntl();
  const navigate = useNavigator();
  const { isOpen: isManageChannelsModalOpen, toggle: toggleManageChannels } = useManageChannels();
  const canOpenAssignReferencesAttributeDialog = !!assignReferencesAttributeId;
  const handleAssignReferenceAttribute = (
    attributeValues: Container[],
    data: ProductVariantCreateData,
    handlers: ProductVariantCreateHandlers,
  ) => {
    handlers.selectAttributeReference(
      assignReferencesAttributeId,
      mergeAttributeValues(
        assignReferencesAttributeId,
        attributeValues.map(({ id }) => id),
        data.attributes,
      ),
    );
    handlers.selectAttributeReferenceMetadata(
      assignReferencesAttributeId,
      attributeValues.map(({ id, name }) => ({ value: id, label: name })),
    );
    onCloseDialog();
  };

  return (
    <ProductVariantCreateForm
      product={product}
      onSubmit={onSubmit}
      referencePages={referencePages}
      referenceProducts={referenceProducts}
      fetchReferencePages={fetchReferencePages}
      fetchMoreReferencePages={fetchMoreReferencePages}
      fetchReferenceProducts={fetchReferenceProducts}
      fetchMoreReferenceProducts={fetchMoreReferenceProducts}
      assignReferencesAttributeId={assignReferencesAttributeId}
      disabled={disabled}
    >
      {({
        change,
        data,
        validationErrors,
        handlers,
        submit,
        isSaveDisabled,
        attributeRichTextGetters,
      }) => {
        const errors = [...apiErrors, ...validationErrors];

        return (
          <DetailPageLayout gridTemplateColumns={1}>
            <TopNav href={productUrl(productId)} title={header} />
            <DetailPageLayout.Content>
              <Grid variant="inverted">
                <div>
                  <ProductVariantNavigation
                    fallbackThumbnail={product?.thumbnail?.url}
                    variants={product?.variants}
                    productId={productId}
                    defaultVariantId={defaultVariantId}
                    onReorder={onVariantReorder}
                    isCreate={true}
                  />
                </div>
                <div>
                  <ProductVariantName value={data.variantName} onChange={change} errors={errors} />
                  <CardSpacer />
                  <ProductDetailsChannelsAvailabilityCard
                    disabled={disabled}
                    listings={data.channelListings}
                    product={product}
                    onManageClick={toggleManageChannels}
                  />
                  <Attributes
                    title={intl.formatMessage(messages.attributesHeader)}
                    attributes={data.attributes.filter(
                      attribute =>
                        attribute.data.variantAttributeScope ===
                        VariantAttributeScope.NOT_VARIANT_SELECTION,
                    )}
                    attributeValues={attributeValues}
                    loading={disabled}
                    disabled={disabled}
                    errors={errors}
                    onChange={handlers.selectAttribute}
                    onMultiChange={handlers.selectAttributeMultiple}
                    onFileChange={handlers.selectAttributeFile}
                    onReferencesRemove={handlers.selectAttributeReference}
                    onReferencesAddClick={onAssignReferencesClick}
                    onReferencesReorder={handlers.reorderAttributeValue}
                    fetchAttributeValues={fetchAttributeValues}
                    fetchMoreAttributeValues={fetchMoreAttributeValues}
                    onAttributeSelectBlur={onAttributeSelectBlur}
                    richTextGetters={attributeRichTextGetters}
                  />
                  <CardSpacer />
                  <Attributes
                    title={intl.formatMessage(messages.attributesSelectionHeader)}
                    attributes={data.attributes.filter(
                      attribute =>
                        attribute.data.variantAttributeScope ===
                        VariantAttributeScope.VARIANT_SELECTION,
                    )}
                    attributeValues={attributeValues}
                    loading={disabled}
                    disabled={disabled}
                    errors={errors}
                    onChange={handlers.selectAttribute}
                    onMultiChange={handlers.selectAttributeMultiple}
                    onFileChange={handlers.selectAttributeFile}
                    onReferencesRemove={handlers.selectAttributeReference}
                    onReferencesAddClick={onAssignReferencesClick}
                    onReferencesReorder={handlers.reorderAttributeValue}
                    fetchAttributeValues={fetchAttributeValues}
                    fetchMoreAttributeValues={fetchMoreAttributeValues}
                    onAttributeSelectBlur={onAttributeSelectBlur}
                    richTextGetters={attributeRichTextGetters}
                  />
                  <CardSpacer />
                  <ProductVariantCheckoutSettings
                    data={data}
                    disabled={disabled}
                    errors={errors}
                    onChange={change}
                  />
                  <CardSpacer />
                  <ProductShipping
                    data={data}
                    disabled={disabled}
                    errors={errors}
                    weightUnit={weightUnit}
                    onChange={change}
                  />
                  <CardSpacer />
                  <ProductVariantPrice
                    disabled={!product}
                    productVariantChannelListings={data.channelListings.map(channel => ({
                      ...channel.data,
                      ...channel.value,
                    }))}
                    errors={errors}
                    loading={!product}
                    onChange={handlers.changeChannels}
                  />
                  <CardSpacer />
                  <ProductStocks
                    data={data}
                    warehouses={mapEdgesToItems(searchWarehousesResult?.data?.search) ?? []}
                    fetchMoreWarehouses={fetchMoreWarehouses}
                    hasMoreWarehouses={searchWarehousesResult?.data?.search?.pageInfo?.hasNextPage}
                    disabled={disabled}
                    hasVariants={true}
                    onFormDataChange={change}
                    errors={errors}
                    stocks={data.stocks}
                    onChange={handlers.changeStock}
                    onWarehouseStockAdd={handlers.addStock}
                    onWarehouseStockDelete={handlers.deleteStock}
                    onWarehouseConfigure={onWarehouseConfigure}
                    isCreate={true}
                  />
                  <CardSpacer />
                  <Metadata data={data} onChange={handlers.changeMetadata} />
                </div>
              </Grid>
              <Savebar>
                <Savebar.Spacer />
                <Savebar.CancelButton onClick={() => navigate(productUrl(productId))} />
                <Savebar.ConfirmButton
                  transitionState={saveButtonBarState}
                  onClick={submit}
                  disabled={isSaveDisabled}
                >
                  {intl.formatMessage(messages.saveVariant)}
                </Savebar.ConfirmButton>
              </Savebar>
              {canOpenAssignReferencesAttributeDialog && (
                <AssignAttributeValueDialog
                  entityType={getReferenceAttributeEntityTypeFromAttribute(
                    assignReferencesAttributeId,
                    data.attributes,
                  )}
                  confirmButtonState={"default"}
                  products={referenceProducts}
                  pages={referencePages}
                  collections={referenceCollections}
                  categories={referenceCategories}
                  attribute={data.attributes.find(({ id }) => id === assignReferencesAttributeId)}
                  hasMore={handlers.fetchMoreReferences?.hasMore}
                  open={canOpenAssignReferencesAttributeDialog}
                  onFetch={handlers.fetchReferences}
                  onFetchMore={handlers.fetchMoreReferences?.onFetchMore}
                  loading={handlers.fetchMoreReferences?.loading}
                  onClose={onCloseDialog}
                  onSubmit={attributeValues =>
                    handleAssignReferenceAttribute(attributeValues, data, handlers)
                  }
                />
              )}
              {product && (
                <VariantChannelsDialog
                  channelListings={product.channelListings}
                  selectedChannelListings={data.channelListings}
                  open={isManageChannelsModalOpen}
                  onClose={toggleManageChannels}
                  onConfirm={handlers.updateChannels}
                />
              )}
            </DetailPageLayout.Content>
          </DetailPageLayout>
        );
      }}
    </ProductVariantCreateForm>
  );
};

ProductVariantCreatePage.displayName = "ProductVariantCreatePage";
export default ProductVariantCreatePage;
