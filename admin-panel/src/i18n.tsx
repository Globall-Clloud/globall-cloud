import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ku: {
    translation: {
      dashboard: 'داشبۆرد',
      customers: 'کڕیارەکان',
      shipments: 'بارەکان',
      payments: 'پارەدانەکان',
      reports: 'ڕاپۆرتەکان',
      warehouse: 'کۆگاکان',
      staff: 'کارمەندەکان',
      settings: 'ڕێکخستنەکان',
      logout: 'دەرچوون',
      welcome: 'بەخێرگەیشتی',
      totalCustomers: 'کۆی کڕیارەکان',
      activeShipments: 'بارەی چالاک',
      monthlyRevenue: 'داهاتی مانگانە',
      growth: 'گەشەکردن',
      addCustomer: 'کڕیاری نوێ',
      editCustomer: 'دەستکاری کڕیار',
      deleteCustomer: 'سڕینەوەی کڕیار',
      addShipment: 'بارە نوێ',
      searchPlaceholder: 'گەڕان...',
      action: 'کردار',
      status: 'دۆخ',
      date: 'بەرواری',
      name: 'ناو',
      phone: 'ژمارە',
      email: 'ئیمەیل',
      location: 'شوێن',
      price: 'نرخ',
      weight: 'کێشە',
      tracking: 'شوێنکەوتن',
      password: 'وشەی نهێنی',
      loginButton: 'چوونەژوورەوە',
      loginSubtitle: 'سیستەمی بەڕێوەبردنی لۆجستیک',
      phoneRequired: 'تکایە ژمارەی مۆبایل بنووسە',
      passwordRequired: 'تکایە وشەی نهێنی بنووسە',
      loginFailed: 'چوونەژوورەوە سەرکەوتوو نەبوو',
      networkError: 'پەیوەندی بە سێرڤەرەوە نەکرا'
    }
  },
  ar: {
    translation: {
      dashboard: 'لوحة التحكم',
      customers: 'العملاء',
      shipments: 'الشحنات',
      payments: 'المدفوعات',
      reports: 'التقارير',
      warehouse: 'المستودعات',
      staff: 'الموظفون',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      welcome: 'مرحبا',
      totalCustomers: 'إجمالي العملاء',
      activeShipments: 'الشحنات النشطة',
      monthlyRevenue: 'الإيرادات الشهرية',
      growth: 'النمو',
      addCustomer: 'إضافة عميل',
      editCustomer: 'تعديل العميل',
      deleteCustomer: 'حذف العميل',
      addShipment: 'إضافة شحنة',
      searchPlaceholder: 'بحث...',
      action: 'إجراء',
      status: 'الحالة',
      date: 'التاريخ',
      name: 'الاسم',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      location: 'الموقع',
      price: 'السعر',
      weight: 'الوزن',
      tracking: 'التتبع',
      password: 'كلمة المرور',
      loginButton: 'تسجيل الدخول',
      loginSubtitle: 'نظام إدارة الخدمات اللوجستية',
      phoneRequired: 'الرجاء إدخال رقم الهاتف',
      passwordRequired: 'الرجاء إدخال كلمة المرور',
      loginFailed: 'فشل تسجيل الدخول',
      networkError: 'تعذر الاتصال بالخادم'
    }
  },
  en: {
    translation: {
      dashboard: 'Dashboard',
      customers: 'Customers',
      shipments: 'Shipments',
      payments: 'Payments',
      reports: 'Reports',
      warehouse: 'Warehouses',
      staff: 'Staff',
      settings: 'Settings',
      logout: 'Logout',
      welcome: 'Welcome',
      totalCustomers: 'Total Customers',
      activeShipments: 'Active Shipments',
      monthlyRevenue: 'Monthly Revenue',
      growth: 'Growth',
      addCustomer: 'Add Customer',
      editCustomer: 'Edit Customer',
      deleteCustomer: 'Delete Customer',
      addShipment: 'Add Shipment',
      searchPlaceholder: 'Search...',
      action: 'Action',
      status: 'Status',
      date: 'Date',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      location: 'Location',
      price: 'Price',
      weight: 'Weight',
      tracking: 'Tracking',
      password: 'Password',
      loginButton: 'Sign In',
      loginSubtitle: 'Logistics Management System',
      phoneRequired: 'Please enter your phone number',
      passwordRequired: 'Please enter your password',
      loginFailed: 'Login failed',
      networkError: 'Could not connect to the server'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ku',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
