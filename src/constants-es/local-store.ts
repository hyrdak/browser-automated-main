export enum LocalStoreKey {
    statusColor = '__statusColor__',
    statusGroupBy = '__statusGroupBy__',
    status = '__status__',
    AuthLocalStoreKey = '__admin_cnw__',
    RefreshTokenLocalStoreKey = '__refresh_token_cnw__',
    UserLocalStoreKey = '__user_cnw__',
    CompanyLocalStoreKey = '__company_cnw__',
    PreviousUrl = '__previous_url__',
    error = '__error__',
    globalList = '__global_list__',
    dynamicMenus = '__dynamic_menus__',
    expiredTimeConfig = '__expired_time_config__'
}

export enum GlobalList {
    Platforms = 'listPlatform'
}

export enum Settings {
    Settings = 'settings'
}

export enum StatusGroupBy {
    Shipments = 'shipment_statuses',
    Orders = 'order_statuses',
    PurchaseOrders = 'purchase_order_statuses',
    OrderItems = 'order_item_statuses',
    PurchaseOrderItems = 'purchase_order_item_statuses',
    Payments = 'po_payment_statuses',
    Paychecks = 'paycheck_statuses',
    OrderAddressVerifies = 'order_address_verify_statuses',
    Designs = 'design_statuses',
    CustomerTypes = 'customer_types',
    DesignImport = 'design_import_requests',
    DesignImportDetail = 'design_import_request_details',
    PaymentMethod = 'payment_methods',
    DesignTypes = 'design_types',
    DesignSource = 'design_sources',
    DesignPaid = 'design_paid_statuses',
    Stock = 'stock_statuses',
    PaygateAccounts = 'paygate_accounts',
    PaygateBankAccount = 'paygate_bank_accounts',
    PaygateCards = 'paygate_cards',
    PaygateBankAccountTransactions = 'paygate_bank_account_transactions',
    PaygateCardTransactions = 'paygate_card_transactions',
    OrderShippingMethods = 'order_shipping_methods',
    SoPaymentStatus = 'so_payment_statuses',
    DownloadCenters = 'download_centers',
    ImportCenters = 'import_centers'
}
