export enum AppPathPrefix {
  Admin = 'admin',
  Client = 'client',
  Public = '',
}

export enum SectionTypes {
  Card = 'card',
  Collapse = 'collapse',
}

export enum FieldTypes {
  Select = 'select',
  InputNumber = 'input-number',
  Input = 'input',
  UploadFile = 'upload-file',
  Radio = 'radio',
  DatePicker = 'date-picker',
  GroupField = 'group-field',
  List = 'list',
}

export enum SectionExtraInfo {
  Quote = 'quote',
}

export enum MimeTypes {
  ImageJpeg = 'image/jpeg',
  ImagePng = 'image/png',
  ApplicationPdf = 'application/pdf',
  ApplicationXml = 'application/xml',
  Doc = 'application/msword',
  Docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS = 'application/vnd.ms-excel',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export enum Currency {
  VietnamDong = 'VND',
}

export enum FirmUserPermissions {
  SubmitApplication = 'submit_application',
  CreateFinanceProfile = 'create_finance_profile',
  ViewFinanceProfile = 'view_finance_profile',
  UpdateFinanceProfile = 'update_finance_profile',
  SubmitFinanceProfile = 'submit_finance_profile',
  CreateFirmUser = 'create_firm_user',
  UpdateFirmUser = 'update_firm_user',
  ChangeChecker = 'change_checker',
  ManageTaxAccount = 'manage_tax_account',
  ViewFirmUsers = 'view_firm_users',
  ViewSuppliers = 'view_suppliers',
  InviteSuppliers = 'invite_suppliers',
  ViewScfInvoices = 'view_scf_invoices',
  ConfirmPaymentInvoices = 'confirm_payment_invoices',
  ViewDashboard = 'view_dashboard',
  SubmitDisbursement = 'submit_disbursement',
}

export enum FirmRole {
  LegalRepresentative = 'legal_representative',
  ChiefAccountant = 'chief_accountant',
  Other = 'other',
}

export enum FinanceProfileStatus {
  // Init
  Draft = 'draft',
  // Submitted
  New = 'new',
  // Admin approved
  Approved = 'approved',
  // Admin rejected
  Rejected = 'rejected',
  // Updated after admin rejected
  Updated = 'updated',
  // Funder verify profile after admin approved
  Verifying = 'verifying',
  // Funder return profile
  Returned = 'returned',
  // Updated after funder return profile
  UpdatedAfterReturn = 'updated_after_return',
  // Funder rejected profile
  RejectedAfterAddition = 'rejected_after_addition',
  // Funder approved profile
  FunderApproved = 'funder_approved',
  Signed = 'signed',
  Cancel = 'cancel',
  SubmitContractAddendum = 'submit_contract_addendum',
  RejectedContractAddendum = 'rejected_contract_addendum',
  ApprovedContractAddendum = 'approved_contract_addendum',
  CancelContractAddendum = 'cancel_contract_addendum',
  WaitingSubmitContractAddendum = 'waiting_submit_contract_addendum',
  SkipContractAddendum = 'skip_contract_addendum',
}

export enum FinanceProfileFormType {
  Create = 'create',
  Update = 'update',
  View = 'view',
}
export enum ChangeCheckerStatus {
  Waiting = 'waiting',
  Approved = 'approved',
  Rejected = 'rejected',
}
export enum CreditLimitStatus {
  Active = 'active',
  InActive = 'inactive',
  Stopped = 'stopped',
}
export enum FinanceProductType {
  ScfAnchor = 'scf_anchor',
  ScfSeller = 'scf_seller',
  WorkingCapital = 'working_capital',
}
export enum RequestDisbursementType {
  Scf = 'scf',
  WorkingCapital = 'working_capital',
}

export enum PurposesDisbursementType {
  BuyGoods = 'buy_goods',
  InvoiceFactoring = 'invoice_factoring',
  other = 'other',
}
export enum RequestDisbursementStatus {
  Waiting = 'waiting',
  Approved = 'approved',
  Rejected = 'rejected',
  Disbursed = 'disbursed',
}

export enum ConfirmPaymentStatus {
  NotConfirmed = 'not_confirmed', // chưa xác nhận, color: red
  Requested = 'requested', // đã gửi yêu cầu xác nhận, color: processing
  Confirmed = 'confirmed', // đã xác nhận thanh toán, color: cyan
}
export enum AnchorSellerConnectionStatus {
  NotOnboard = 'not_onboard',
  Invited = 'invited',
  Joined = 'joined',
  CancelInvitation = 'cancel_invitation',
}
export enum LoanStatus {
  PendingDisbursement = 'pending_disbursement', // Chờ giải ngân
  Disbursed = 'disbursed', // Đã giải ngân
  Overdue = 'overdue', // Đã quá hạn
  Settled = 'settled', // Đã tất toán
}
export enum ReceiveBankAccountType {
  ReceiveFromFunder = 'receive_from_funder',
  ReceiveFromAnchor = 'receive_from_anchor',
}
