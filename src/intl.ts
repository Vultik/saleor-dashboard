import { defineMessages, IntlShape } from "react-intl";

export const commonMessages = defineMessages({
  availability: {
    id: "hOxIeP",
    defaultMessage: "Availability",
  },
  products: {
    id: "7NFfmz",
    defaultMessage: "Products",
  },
  chooseFile: {
    id: "eWcvOc",
    defaultMessage: "Choose file",
    description: "button",
  },
  channel: {
    id: "KeO51o",
    defaultMessage: "Channel",
  },
  dashboard: {
    id: "hzSNj4",
    defaultMessage: "Dashboard",
  },
  demo: {
    id: "i0AcKY",
    defaultMessage:
      "Just to let you know... You're in demo mode. You can play around with the dashboard but can't save changes.",
    description: "notification message after log in",
  },
  description: {
    id: "Q8Qw5B",
    defaultMessage: "Description",
  },
  descriptionOptional: {
    id: "bZenNC",
    defaultMessage: "Description (optional)",
  },
  discounts: {
    id: "n+Gwbu",
    defaultMessage: "Discounts",
  },
  drafts: {
    id: "2atspc",
    defaultMessage: "Drafts",
  },
  email: {
    id: "hJZwTS",
    defaultMessage: "Email address",
  },
  endDate: {
    id: "T4GOiX",
    defaultMessage: "End Date",
  },
  endHour: {
    id: "juBV+h",
    defaultMessage: "End Hour",
  },
  error: {
    id: "KN7zKn",
    defaultMessage: "Error",
  },
  firstName: {
    id: "Q6wcZ5",
    defaultMessage: "First Name",
  },
  generalInformations: {
    id: "pkUbrL",
    defaultMessage: "General Information",
  },

  insufficientPermissions: {
    id: "DOkfyZ",
    defaultMessage: "Insufficient permissions",
  },
  lastName: {
    id: "aheQdn",
    defaultMessage: "Last Name",
  },
  limitReached: {
    id: "8oIbMI",
    defaultMessage: "Reached limit for this plan",
  },
  name: {
    id: "HAlOn1",
    defaultMessage: "Name",
  },
  no: {
    id: "oUWADl",
    defaultMessage: "No",
  },
  optionalField: {
    id: "lzdvwp",
    defaultMessage: "Optional",
    description: "field is optional",
  },
  properties: {
    id: "aI80kg",
    defaultMessage: "Properties",
  },
  readOnly: {
    id: "kFYlu2",
    defaultMessage: "Saleor runs in read-only mode. Changes not saved.",
  },
  requiredField: {
    id: "TKmub+",
    defaultMessage: "This field is required",
  },
  savedChanges: {
    id: "rqiCWU",
    defaultMessage: "Saved changes",
  },
  selected: {
    id: "byP6IC",
    defaultMessage: "Selected",
  },
  sessionExpired: {
    id: "Fvvgoi",
    defaultMessage: "Your session has expired. Please log in again to continue.",
  },
  somethingWentWrong: {
    id: "LVa5ew",
    defaultMessage: "Saleor ran into an unexpected problem",
  },
  defaultErrorTitle: {
    id: "JqiqNj",
    defaultMessage: "Something went wrong",
  },
  update: {
    defaultMessage: "Update",
    id: "BWpuKl",
  },
  startDate: {
    id: "QirE3M",
    defaultMessage: "Start Date",
  },
  startHour: {
    id: "tWbE34",
    defaultMessage: "Start Hour",
  },
  status: {
    id: "tzMNF3",
    defaultMessage: "Status",
  },
  paymentStatus: {
    id: "6D+yYX",
    defaultMessage: "Payment status",
  },
  summary: {
    id: "RrCui3",
    defaultMessage: "Summary",
  },
  type: {
    defaultMessage: "Type",
    id: "+U6ozc",
  },
  translationAttributes: {
    id: "+xTpT1",
    defaultMessage: "Attributes",
  },
  unauthorizedDashboardAccess: {
    id: "MKtgZB",
    defaultMessage: "Only staff users can access the dashboard",
  },
  uploadImage: {
    id: "Lx1ima",
    defaultMessage: "Upload image",
    description: "button",
  },
  yes: {
    id: "a5msuh",
    defaultMessage: "Yes",
  },
  date: {
    id: "P7PLVj",
    defaultMessage: "Date",
  },
  time: {
    id: "u3sYPH",
    defaultMessage: "Time",
    description: "independent of any particular day, eg. 11:35",
  },
  cannotFullfillUnpaidOrder: {
    id: "o8f4Sg",
    defaultMessage: "Can’t fulfill until payment is captured",
    description: "disabled option description",
  },
  deprecated: {
    id: "z9c6/C",
    defaultMessage: "Deprecated",
  },
  pspReference: {
    defaultMessage: "PSP Reference",
    id: "kMziE/",
  },
  pspReferenceOptional: {
    defaultMessage: "PSP Reference (optional)",
    id: "GJwcSd",
  },
  settings: {
    id: "D3idYv",
    defaultMessage: "Settings",
  },
  noOfRows: {
    id: "2HfSiT",
    defaultMessage: "No. of rows",
    description: "pagination",
  },
  product: {
    defaultMessage: "Product",
    id: "x/ZVlU",
  },
  metadata: {
    defaultMessage: "Metadata",
    id: "8Q504V",
  },
  viewMetadata: {
    defaultMessage: "View metadata",
    id: "E/yzIO",
  },
  loading: {
    defaultMessage: "Loading...",
    id: "gjBiyj",
  },
  orderLine: {
    defaultMessage: "Order line",
    id: "BalldE",
  },
});

export const errorMessages = defineMessages({
  imgageUploadErrorTitle: {
    id: "Yo2kC+",
    defaultMessage: "Couldn't process image",
  },
  imageUploadErrorText: {
    id: "JiVwOU",
    defaultMessage:
      "There was a problem with the file you uploaded as an image and it couldn't be used. Please try a different file.",
  },
  preorderEndDateInFutureErrorText: {
    id: "6QjMei",
    defaultMessage: "Preorder end time needs to be set in the future",
  },
  baseCodeErrorMessage: {
    id: "7+GBlj",
    defaultMessage: "Error code {errorCode} {fieldError}",
  },
  voucherCodesErrorMessage: {
    id: "2dgbGR",
    defaultMessage: "Those codes already exist",
  },
  voucherCodeErrorMessage: {
    id: "WY3IXU",
    defaultMessage: "This code already exists",
  },
  codeErrorFieldMessage: {
    id: "Qox+kb",
    defaultMessage: "on field {fieldName}",
  },
});

export const buttonMessages = defineMessages({
  accept: {
    id: "skPoVe",
    defaultMessage: "Accept",
    description: "button",
  },
  add: {
    id: "BJtUQI",
    defaultMessage: "Add",
    description: "button",
  },
  approve: {
    id: "59XppT",
    defaultMessage: "Approve",
    description: "button",
  },
  apply: {
    defaultMessage: "Apply",
    id: "iBW3rG",
    description: "button",
  },
  assign: {
    id: "oiuwOl",
    defaultMessage: "Assign",
    description: "button",
  },
  activate: {
    id: "+b3KCV",
    defaultMessage: "Activate",
    description: "button",
  },
  deactivate: {
    id: "gygOA1",
    defaultMessage: "Deactivate",
    description: "button",
  },
  back: {
    id: "0OfZJA",
    defaultMessage: "Back",
    description: "button",
  },
  cancel: {
    id: "9uNz+T",
    defaultMessage: "Cancel",
    description: "button",
  },
  clear: {
    id: "2FQsYj",
    defaultMessage: "Clear",
    description: "button",
  },
  confirm: {
    id: "DJFPzq",
    defaultMessage: "Confirm",
    description: "button",
  },
  continue: {
    id: "Rjs1CD",
    defaultMessage: "Continue",
    description: "button",
  },
  create: {
    id: "H5NKfr",
    defaultMessage: "Create",
    description: "button",
  },
  delete: {
    id: "ufmuTp",
    defaultMessage: "Delete",
    description: "button",
  },
  done: {
    id: "eOrLzG",
    defaultMessage: "Done",
    description: "button",
  },
  edit: {
    id: "Ja7gHc",
    defaultMessage: "Edit",
    description: "button",
  },
  manage: {
    id: "IbVKSH",
    defaultMessage: "Manage",
    description: "button",
  },
  nextStep: {
    id: "wlQTfb",
    defaultMessage: "Next",
    description: "go to next step, button",
  },
  ok: {
    id: "s9sOcC",
    defaultMessage: "OK",
    description: "button",
  },
  remove: {
    id: "bu/fC1",
    defaultMessage: "Remove",
    description: "button",
  },
  reset: {
    defaultMessage: "Reset",
    id: "TOMgXz",
    description: "button",
  },
  save: {
    id: "RaycYK",
    defaultMessage: "Save",
    description: "button",
  },
  select: {
    id: "a+x05s",
    defaultMessage: "Select",
    description: "select option, button",
  },
  selectAll: {
    id: "rfvBAF",
    defaultMessage: "Select All",
    description: "select all options, button",
  },
  send: {
    id: "hqVMLQ",
    defaultMessage: "Send",
    description: "button",
  },
  show: {
    id: "/8/Ffn",
    defaultMessage: "Show",
    description: "button",
  },
  undo: {
    id: "vN3qdA",
    defaultMessage: "Undo",
    description: "button",
  },
  install: {
    id: "KDvRBi",
    defaultMessage: "Install",
    description: "button",
  },
  retry: {
    id: "KMxiiF",
    defaultMessage: "Retry",
    description: "button",
  },
  close: {
    id: "rbrahO",
    defaultMessage: "Close",
  },
  proceed: {
    id: "VNX4fn",
    defaultMessage: "Proceed",
  },
  noPermission: {
    id: "ORQvOg",
    defaultMessage: "You don't have permission to perform this action",
  },
});

export const sectionNames = defineMessages({
  catalog: {
    id: "P5HhQl",
    defaultMessage: "Catalog",
    description: "catalog section name",
  },
  search: {
    id: "PeMebc",
    defaultMessage: "Search",
    description: "search section name",
  },
  allSearchResults: {
    id: "a0TDWs",
    defaultMessage: "All Search Results",
    description: "search section name",
  },
  modeling: {
    id: "NVp0fa",
    defaultMessage: "Modeling",
    description: "modeling section name",
  },
  models: {
    id: "GFioCC",
    defaultMessage: "Models",
    description: "models section name",
  },
  structures: {
    id: "21cJ+Z",
    defaultMessage: "Structures",
    description: "structures section name",
  },
  apps: {
    id: "9q562c",
    defaultMessage: "Apps",
    description: "apps section name",
  },
  appExtensions: {
    id: "Y7UlMR",
    defaultMessage: "Apps",
    description: "app extensions subsection",
  },
  attributes: {
    id: "l2oVCF",
    defaultMessage: "Attributes",
    description: "attributes section name",
  },
  categories: {
    id: "sK1FPw",
    defaultMessage: "Categories",
    description: "categories section name",
  },
  channels: {
    id: "NlSJMM",
    defaultMessage: "Channels",
    description: "channels section name",
  },
  collections: {
    id: "NNT3Lp",
    defaultMessage: "Collections",
    description: "collections section name",
  },
  configuration: {
    id: "xfGZsi",
    defaultMessage: "Configuration",
    description: "configuration section name",
  },
  customers: {
    id: "McN+wq",
    defaultMessage: "Customers",
    description: "customers section name",
  },
  draftOrders: {
    id: "ytKTTO",
    defaultMessage: "Drafts",
    description: "draft orders section name",
  },
  exchangeRates: {
    id: "j0ugM4",
    defaultMessage: "Exchange Rates",
    description: "Manage and Update your warehouse information",
  },
  giftCards: {
    id: "HSmg1/",
    defaultMessage: "Gift Cards",
    description: "gift cards section name",
  },
  home: {
    id: "4JW9iJ",
    defaultMessage: "Home",
    description: "home section name",
  },
  navigation: {
    id: "9C7PZE",
    defaultMessage: "Navigation",
    description: "navigation section name",
  },
  orders: {
    id: "Ta9j04",
    defaultMessage: "Orders",
    description: "orders section name",
  },
  fulfillment: {
    id: "9XYfOt",
    defaultMessage: "Fulfillment",
    description: "fulfillment section name",
  },
  modelTypes: {
    id: "Gbhrqd",
    defaultMessage: "Model Types",
    description: "model types section name",
  },
  content: {
    id: "NelCIl",
    defaultMessage: "Content",
    description: "content section name",
  },
  permissionGroups: {
    id: "DNTxWr",
    defaultMessage: "Permission Groups",
    description: "permission groups section name",
  },
  plugins: {
    id: "WhvuCb",
    defaultMessage: "Plugins",
    description: "plugins section name",
  },
  productTypes: {
    id: "YQ3EXR",
    defaultMessage: "Product Types",
    description: "product types section name",
  },
  products: {
    id: "K8xNLe",
    defaultMessage: "Products",
    description: "products section name",
  },
  sales: {
    id: "kJQczl",
    defaultMessage: "Sales",
    description: "sales section name",
  },
  serviceAccounts: {
    id: "8xsKUv",
    defaultMessage: "Service Accounts",
    description: "service accounts section name",
  },
  shipping: {
    id: "D9ie4n",
    defaultMessage: "Shipping Methods",
    description: "shipping section name",
  },
  shippingZones: {
    id: "V1MytH",
    defaultMessage: "Shipping Zones",
    description: "shipping zones section name",
  },
  siteSettings: {
    id: "viFkCw",
    defaultMessage: "Site Settings",
    description: "site settings section name",
  },
  staff: {
    id: "AQFMYU",
    defaultMessage: "Staff Members",
    description: "staff section name",
  },
  taxes: {
    id: "5elC9k",
    defaultMessage: "Taxes",
    description: "taxes section name",
  },
  translations: {
    id: "5fCMUI",
    defaultMessage: "Translations",
    description: "translations section name",
  },
  variants: {
    id: "8GC/ah",
    defaultMessage: "Variants",
    description: "variants section name",
  },
  vouchers: {
    id: "iUy2dx",
    defaultMessage: "Vouchers",
    description: "vouchers section name",
  },
  promotions: {
    id: "bHG5/d",
    defaultMessage: "Promotions",
    description: "promotions section name",
  },
  warehouses: {
    id: "ycMLN9",
    defaultMessage: "Warehouses",
    description: "warehouses section name",
  },
  webhooksAndEvents: {
    id: "BFR6CF",
    defaultMessage: "Webhooks & Events",
    description: "webhooks and events section name",
  },
  extensions: {
    id: "fkoxZY",
    defaultMessage: "Extensions",
    description: "extensions section name",
  },
  exploreExtensions: {
    id: "033/zW",
    defaultMessage: "Explore",
    description: "explore extensions section name",
  },
  installedExtensions: {
    id: "RiQ0v1",
    defaultMessage: "Installed",
    description: "installed extensions section name",
  },
});

export const commonStatusMessages = defineMessages({
  active: {
    id: "c24hjq",
    defaultMessage: "Active",
    description: "status",
  },
  notActive: {
    id: "NwQXZp",
    defaultMessage: "Not active",
    description: "status",
  },
  cancelled: {
    id: "dOQB9o",
    defaultMessage: "Cancelled",
    description: "payment status",
  },
  disabled: {
    id: "tthToS",
    defaultMessage: "Disabled",
  },
  deactivated: {
    id: "pGwvpX",
    defaultMessage: "Deactivated",
    description: "status",
  },
});

export const orderStatusMessages = defineMessages({
  draft: {
    id: "toDL5R",
    defaultMessage: "Draft",
    description: "order status",
  },
  fulfilled: {
    id: "pkjXPD",
    defaultMessage: "Fulfilled",
    description: "order status",
  },
  partiallyFulfilled: {
    id: "PbqNhi",
    defaultMessage: "Partially fulfilled",
    description: "order status",
  },
  partiallyReturned: {
    id: "26BKkX",
    defaultMessage: "Partially returned",
    description: "order status",
  },
  readyToCapture: {
    id: "rqtV5d",
    defaultMessage: "Ready to capture",
    description: "order status",
  },
  readyToFulfill: {
    id: "oLMXDv",
    defaultMessage: "Ready to fulfill",
    description: "order status",
  },
  returned: {
    id: "4Dc2j0",
    defaultMessage: "Returned",
    description: "order status",
  },
  unconfirmed: {
    id: "+x84Ji",
    defaultMessage: "Unconfirmed",
    description: "order status",
  },
  unfulfilled: {
    id: "oB0y5Y",
    defaultMessage: "Unfulfilled",
    description: "order status",
  },
});

export const paymentStatusMessages = defineMessages({
  paid: {
    id: "2pw5dQ",
    defaultMessage: "Fully paid",
    description: "payment status",
  },
  partiallyPaid: {
    id: "INNPVX",
    defaultMessage: "Partially paid",
    description: "payment status",
  },
  partiallyRefunded: {
    id: "OGemtu",
    defaultMessage: "Partially refunded",
    description: "payment status",
  },
  refunded: {
    id: "XJSRDK",
    defaultMessage: "Fully refunded",
    description: "payment status",
  },
  unpaid: {
    id: "FBtqtl",
    defaultMessage: "Unpaid",
    description: "payment status",
  },
  pending: {
    id: "hLUYBt",
    defaultMessage: "Pending",
    description: "payment status",
  },
  refused: {
    id: "nwnwJ0",
    defaultMessage: "Refused",
    description: "payment status",
  },
});

export function translateBoolean(value: boolean, intl: IntlShape): string {
  return value ? intl.formatMessage(commonMessages.yes) : intl.formatMessage(commonMessages.no);
}
