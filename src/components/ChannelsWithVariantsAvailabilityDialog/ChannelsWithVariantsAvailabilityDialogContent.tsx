import placeholderImage from "@assets/images/placeholder255x255.png";
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  makeStyles,
  Typography
} from "@material-ui/core";
import { ChannelData } from "@saleor/channels/utils";
import IconChevronDown from "@saleor/icons/ChevronDown";
import Label from "@saleor/orders/components/OrderHistory/Label";
import { getById } from "@saleor/orders/components/OrderReturnPage/utils";
import { ProductDetails_product_variants } from "@saleor/products/types/ProductDetails";
import { ChannelsWithVariantsData } from "@saleor/products/views/ProductUpdate/types";
import map from "lodash-es/map";
import React, { ChangeEvent } from "react";
import { defineMessages, useIntl } from "react-intl";

import ControlledCheckbox from "../ControlledCheckbox";
import Avatar from "../TableCellAvatar/Avatar";

const useStyles = makeStyles(
  theme => ({
    variantContainer: {
      padding: theme.spacing(2, 0, 2, 4)
    },
    channelContainer: {
      width: "100%"
    },
    channelCheckboxContainer: {
      width: "100%",
      padding: theme.spacing(3, 0)
    },
    channelTitleContainer: {
      display: "flex",
      flexDirection: "column"
    },
    variantTitleContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  }),
  { name: "ChannelsWithVariantsAvailabilityDialogContent" }
);

const useExpanderStyles = makeStyles(
  () => ({
    expanded: {},
    root: {
      boxShadow: "none",

      "&:before": {
        content: "none"
      },

      "&$expanded": {
        margin: 0,
        border: "none"
      }
    }
  }),
  { name: "ChannelsWithVariantsAvailabilityExpander" }
);

const useSummaryStyles = makeStyles(
  theme => ({
    expanded: {},
    root: {
      width: "100%",
      border: "none",
      height: theme.spacing(10),
      paddingRight: theme.spacing(1.5),
      padding: 0,
      margin: 0,
      minHeight: 0,

      "&$expanded": {
        minHeight: 0
      }
    },
    content: {
      margin: 0,

      "&$expanded": {
        margin: 0
      }
    }
  }),
  { name: "ChannelsWithVariantsAvailabilityChannelSummary" }
);

const messages = defineMessages({
  variantsSelectedLabel: {
    defaultMessage: "{variantsAmount} variants selected",
    description: "variants selected label"
  }
});

interface ChannelsWithVariantsAvailabilityDialogContentProps {
  addVariantToChannel: (channelId: string, variantId: string) => void;
  removeVariantFromChannel: (channelId: string, variantId: string) => void;
  channelsWithVariants: ChannelsWithVariantsData;
  toggleAllChannelVariants: (channelId: string) => () => void;
  isChannelSelected: (channelId: string) => boolean;
  channels: ChannelData[];
  allVariants: ProductDetails_product_variants[];
}

const ChannelsWithVariantsAvailabilityDialogContent: React.FC<ChannelsWithVariantsAvailabilityDialogContentProps> = ({
  channelsWithVariants,
  addVariantToChannel,
  removeVariantFromChannel,
  toggleAllChannelVariants,
  isChannelSelected,
  channels,
  allVariants
}) => {
  const intl = useIntl();
  const classes = useStyles({});
  const expanderClasses = useExpanderStyles({});
  const summaryClasses = useSummaryStyles({});

  const handleVariantChange = (channelId: string, variantId: string) => (
    event: ChangeEvent<any>
  ) =>
    event.target.value
      ? addVariantToChannel(channelId, variantId)
      : removeVariantFromChannel(channelId, variantId);

  return (
    <>
      {map(channelsWithVariants, ({ selectedVariantsIds }, channelId) => {
        const { name } = channels.find(getById(channelId));

        const isVariantSelected = (variantId: string) =>
          selectedVariantsIds.includes(variantId);

        const getVariantThumbnailSrc = (variantId: string) =>
          allVariants.find(getById(variantId)).media[0]?.url ||
          placeholderImage;

        return (
          <ExpansionPanel classes={expanderClasses}>
            <ExpansionPanelSummary
              expandIcon={<IconChevronDown />}
              classes={summaryClasses}
            >
              <div
                className={classes.channelContainer}
                // stop expander when selecting & deselecting channel
                onClick={event => event.stopPropagation()}
              >
                <div className={classes.channelCheckboxContainer}>
                  <ControlledCheckbox
                    checked={isChannelSelected(channelId)}
                    name={name}
                    label={
                      <div className={classes.channelTitleContainer}>
                        <Typography>{name}</Typography>
                        <Label
                          text={intl.formatMessage(
                            messages.variantsSelectedLabel,
                            {
                              variantsAmount: selectedVariantsIds.length
                            }
                          )}
                        />
                      </div>
                    }
                    onChange={toggleAllChannelVariants(channelId)}
                  />
                </div>
                <Divider />
              </div>
            </ExpansionPanelSummary>
            {allVariants.map(({ id: variantId, name }) => (
              <>
                <div
                  key={variantId}
                  className={classes.variantContainer}
                  data-test-id="channel-row"
                >
                  <ControlledCheckbox
                    checked={isVariantSelected(variantId)}
                    name={name}
                    label={
                      <div className={classes.variantTitleContainer}>
                        <Avatar thumbnail={getVariantThumbnailSrc(variantId)} />
                        <Typography>{name}</Typography>
                      </div>
                    }
                    onChange={handleVariantChange(channelId, variantId)}
                  />
                </div>
                <Divider />
              </>
            ))}
          </ExpansionPanel>
        );
      })}
    </>
  );
};

export default ChannelsWithVariantsAvailabilityDialogContent;