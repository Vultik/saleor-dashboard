import { AppPageNav } from "@dashboard/apps/components/AppPage/AppPageNav";
import { AppUrls } from "@dashboard/apps/urls";
import { useFlag } from "@dashboard/featureFlags";
import { AppQuery } from "@dashboard/graphql";
import React from "react";

import HeaderOptions from "./HeaderOptions";

interface HeaderProps {
  data: AppQuery["app"];
  onAppActivateOpen: () => void;
  onAppDeactivateOpen: () => void;
  onAppDeleteOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({
  data,
  onAppActivateOpen,
  onAppDeactivateOpen,
  onAppDeleteOpen,
}) => {
  const { enabled: isExtensionsEnabled } = useFlag("extensions");
  const getBackButtonUrl = () => {
    /**
     * App is null with first render so fallback with HTML-safe fallback
     */
    if (!data?.id) {
      return "#";
    }

    const isAppActive = data.isActive;

    return isAppActive
      ? AppUrls.resolveAppUrl(data.id)
      : AppUrls.resolveAppListUrl(undefined, isExtensionsEnabled);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <AppPageNav
        name={data.name}
        supportUrl={data.supportUrl}
        homepageUrl={data.homepageUrl}
        author={data.author}
        appLogoUrl={data.brand?.logo.default}
        appId={data.id}
        goBackUrl={getBackButtonUrl()}
        showMangeAppButton={false}
      />

      <HeaderOptions
        isActive={!!data.isActive}
        onAppActivateOpen={onAppActivateOpen}
        onAppDeactivateOpen={onAppDeactivateOpen}
        onAppDeleteOpen={onAppDeleteOpen}
      />
    </>
  );
};

export default Header;
