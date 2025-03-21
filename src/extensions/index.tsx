import { AppListUrlQueryParams } from "@dashboard/apps/urls";
import { AppListView } from "@dashboard/apps/views";
import { Route } from "@dashboard/components/Router";
import { WindowTitle } from "@dashboard/components/WindowTitle";
import { exploreExtensionsPath, installedExtensionsPath } from "@dashboard/extensions/urls";
import { ExploreExtensions } from "@dashboard/extensions/views/ExploreExtensions";
import { useFlag } from "@dashboard/featureFlags";
import useNavigator from "@dashboard/hooks/useNavigator";
import { sectionNames } from "@dashboard/intl";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Switch } from "react-router-dom";

const ExploreExtensionsView = () => {
  return <ExploreExtensions />;
};

const InstalledExtensionsView = () => {
  const qs = parseQs(location.search.substr(1));
  const params: AppListUrlQueryParams = qs;

  return <AppListView params={params} showAvailableApps={false} />;
};

export const ExtensionsSection = () => {
  const intl = useIntl();
  const navigate = useNavigator();
  const { enabled: isExtensionsEnabled } = useFlag("extensions");

  if (!isExtensionsEnabled) {
    navigate("/", { replace: true });

    return <>Redirecting...</>;
  }

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.extensions)} />
      <Switch>
        <Route exact path={exploreExtensionsPath} component={ExploreExtensionsView} />
        <Route exact path={installedExtensionsPath} component={InstalledExtensionsView} />
      </Switch>
    </>
  );
};
