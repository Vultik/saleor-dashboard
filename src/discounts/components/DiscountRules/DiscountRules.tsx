import { DashboardCard } from "@dashboard/components/Card";
import { ConfirmButtonTransitionState } from "@dashboard/components/ConfirmButton";
import { Rule } from "@dashboard/discounts/models";
import { useLabelMapsContext } from "@dashboard/discounts/views/DiscountDetails/context/context";
import { ChannelFragment, PromotionTypeEnum } from "@dashboard/graphql";
import { CommonError } from "@dashboard/utils/errors/common";
import React, { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { AddButton } from "./componenets/AddButton";
import { RuleDeleteModal } from "./componenets/RuleDeleteModal/RuleDeleteModal";
import { RuleForm } from "./componenets/RuleForm";
import { RuleFormModal } from "./componenets/RuleFormModal";
import { RulesList } from "./componenets/RulesList";
import { DiscountRulesContextProvider } from "./context";
import { useGraphQLPlayground } from "./hooks/useGraphQLPlayground";
import { messages } from "./messages";

export type DiscountRulesErrors<ErrorCode> = Array<CommonError<ErrorCode> & { index?: number }>;

interface DiscountRulesProps<ErrorCode> {
  disabled: boolean;
  discountType: PromotionTypeEnum;
  channels: ChannelFragment[];
  rules: Rule[];
  promotionId: string | null;
  errors: Array<CommonError<ErrorCode>>;
  deleteButtonState: ConfirmButtonTransitionState;
  getRuleConfirmButtonState: (ruleEditIndex: number | null) => ConfirmButtonTransitionState;
  onRuleSubmit: (data: Rule, ruleIndex: number | null) => void;
  onRuleDelete: (ruleIndex: number) => void;
}

export const DiscountRules = <ErrorCode,>({
  disabled,
  channels,
  rules,
  errors,
  getRuleConfirmButtonState,
  deleteButtonState,
  discountType,
  onRuleSubmit,
  onRuleDelete,
  promotionId,
}: DiscountRulesProps<ErrorCode>) => {
  const intl = useIntl();
  const { ruleConditionsValues } = useLabelMapsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ruleEditIndex, setRuleEditIndex] = useState<number | null>(null);
  const [ruleDeleteIndex, setRuleDeleteIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { opepnGrapQLPlayground } = useGraphQLPlayground();

  useEffect(() => {
    if (!isLoaded && !disabled) {
      setIsLoaded(true);
    }
  }, [disabled]);

  const ruleInitialValues = useMemo(() => {
    return ruleEditIndex !== null ? rules[ruleEditIndex] : null;
  }, [ruleEditIndex]);
  const handleRuleEdit = (editIndex: number) => {
    setRuleEditIndex(editIndex);
    setIsModalOpen(true);
  };
  const handleOpenRuleDeleteModal = (index: number) => {
    setRuleDeleteIndex(index);
  };
  const handleRuleModalClose = () => {
    setIsModalOpen(false);
    setRuleEditIndex(null);
  };
  const handleRuleModalSubmit = async (data: Rule) => {
    await onRuleSubmit(data, ruleEditIndex);
    handleRuleModalClose();
  };
  const handleRuleDelete = async () => {
    await onRuleDelete(ruleDeleteIndex!);
    setRuleDeleteIndex(null);
  };
  const handleOpenPlayground = () => {
    setIsModalOpen(false);
    opepnGrapQLPlayground(promotionId);
  };

  return (
    <DiscountRulesContextProvider
      discountType={discountType}
      channels={channels}
      disabled={disabled}
    >
      <DashboardCard marginBottom={20}>
        <DashboardCard.Header>
          <DashboardCard.Title>{intl.formatMessage(messages.title)}</DashboardCard.Title>
          <DashboardCard.Toolbar>
            <AddButton onClick={() => setIsModalOpen(true)} />
          </DashboardCard.Toolbar>
        </DashboardCard.Header>
        <DashboardCard.Content data-test-id="rule-list">
          <RulesList
            loading={!isLoaded || ruleConditionsValues.loading}
            rules={rules}
            onRuleEdit={handleRuleEdit}
            onRuleDelete={handleOpenRuleDeleteModal}
            errors={errors}
          />
        </DashboardCard.Content>

        {isModalOpen && (
          <RuleFormModal
            confimButtonState={getRuleConfirmButtonState(ruleEditIndex)}
            onClose={handleRuleModalClose}
            initialFormValues={ruleInitialValues}
            onSubmit={handleRuleModalSubmit}
          >
            <RuleForm errors={errors} openPlayground={handleOpenPlayground} />
          </RuleFormModal>
        )}
        <RuleDeleteModal
          open={ruleDeleteIndex !== null}
          onClose={() => setRuleDeleteIndex(null)}
          onSubmit={handleRuleDelete}
          confimButtonState={deleteButtonState}
        />
      </DashboardCard>
    </DiscountRulesContextProvider>
  );
};
