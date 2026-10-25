import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'ar';
export type ServiceKey = 'blood-work' | 'pressure-sugar' | 'heart-check' | 'medicines';

export type CareRequest = {
  id: string;
  service: ServiceKey;
  dateLabel: string;
  timeLabel: string;
  status: 'Confirmed' | 'On the way';
};

type SeniorCareContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  requests: CareRequest[];
  addRequest: (request: CareRequest) => void;
  cancelRequest: (id: string) => void;
  isLoaded: boolean;
};

export type Copy = {
  tabs: { home: string; visits: string; medicines: string; profile: string };
  home: {
    morning: string; greeting: string; question: string; careTitle: string; careText: string;
    whatNeed: string; nextVisit: string; seeAll: string; notifications: string; help: string;
    confirmed: string; nurseSarah: string; pressureSugar: string;
  };
  services: Record<ServiceKey, { title: string; subtitle: string }>;
  visits: {
    title: string; subtitle: string; upcoming: string; noVisits: string; noVisitsText: string;
    goHome: string; homeVisit: string; nurseSarah: string; confirmed: string; note: string;
  };
  medicines: {
    title: string; subtitle: string; progressOverline: string; progressTitle: string; progressText: string;
    today: string; taken: string; runningLow: string; refillText: string; add: string;
  };
  profile: {
    member: string; emergencyTitle: string; emergencyText: string; account: string; language: string;
    appLanguage: string; signInFamily: string; version: string;
    rows: Array<{ label: string; detail?: string }>;
  };
  request: {
    back: string; assurance: string; chooseDay: string; chooseTime: string; today: string; tomorrow: string;
    description: Record<ServiceKey, string>; estimate: Record<ServiceKey, string>; request: string; footnote: string; alertTitle: string;
    alertMessage: string; done: string;
  };
  signIn: {
    welcome: string; subtitle: string; phone: string; verification: string; sentHint: string;
    send: string; continue: string; email: string; emailTitle: string; emailMessage: string;
    family: string; familyTitle: string; familyMessage: string; nurse: string; nurseTitle: string;
    nurseMessage: string; privacy: string;
  };
};

const copy: Record<Language, Copy> = {
  en: {
    tabs: { home: 'Home', visits: 'Visits', medicines: 'Medicines', profile: 'Profile' },
    home: {
      morning: 'GOOD MORNING', greeting: 'Good morning, Ahmad', question: 'How can we help you today?',
      careTitle: 'Care that comes to you', careText: 'Licensed nurses. Clear updates. At home.',
      whatNeed: 'What do you need?', nextVisit: 'Your next visit', seeAll: 'See all', notifications: 'Notifications',
      help: 'Need help? Our care team is here 24/7.', confirmed: 'Confirmed', nurseSarah: 'Nurse Sarah',
      pressureSugar: 'PRESSURE & SUGAR',
    },
    services: {
      'blood-work': { title: 'Blood Work', subtitle: 'Samples collected at home' },
      'pressure-sugar': { title: 'Pressure & Sugar', subtitle: 'A gentle health check' },
      'heart-check': { title: 'Heart Check', subtitle: 'Care for your heart' },
      medicines: { title: 'My Medicines', subtitle: 'Reminders and refills' },
    },
    visits: {
      title: 'Your visits', subtitle: 'Everything scheduled for your care, in one place.', upcoming: 'Upcoming',
      noVisits: 'No visits booked', noVisitsText: 'Choose a service from Home when you are ready.', goHome: 'Go to Home',
      homeVisit: 'Home visit', nurseSarah: 'Nurse Sarah', confirmed: 'Confirmed',
      note: 'Your nurse will call before arriving. You can change a visit up to 2 hours before the appointment.',
    },
    medicines: {
      title: 'My medicines', subtitle: 'A simple reminder for every important dose.', progressOverline: "TODAY'S PROGRESS",
      progressTitle: '1 of 2 doses taken', progressText: 'You are doing great. Keep going.', today: 'Today',
      taken: 'Taken', runningLow: 'Running low?', refillText: 'Ask your family member to arrange a refill.', add: 'Add a medicine',
    },
    profile: {
      member: 'SeniorCare member since 2026', emergencyTitle: 'Emergency help',
      emergencyText: 'Call your local emergency services', account: 'Your account', language: 'Language',
      appLanguage: 'App language', signInFamily: 'Sign in as family member', version: 'SeniorCare · Here when you need us',
      rows: [
        { label: 'Personal information', detail: 'Ahmad Al-Khatib' }, { label: 'Home address', detail: 'Amman, Jordan' },
        { label: 'Family & caregivers', detail: '2 connected' }, { label: 'Privacy & safety' },
      ],
    },
    request: {
      back: 'Back', assurance: 'Your care is handled by a verified, licensed nurse.', chooseDay: 'Choose a day',
      chooseTime: 'Choose a time', today: 'Today', tomorrow: 'Tomorrow',
      estimate: { 'blood-work': 'Results usually ready in 24–48 hours', 'pressure-sugar': 'Takes about 20 minutes', 'heart-check': 'Nurse brings everything needed', medicines: 'Bring your medicine boxes' },
      description: { 'blood-work': 'A licensed nurse collects your sample safely at home.', 'pressure-sugar': 'A gentle check of your blood pressure and blood sugar.', 'heart-check': 'A calm, at-home check to help you understand your heart health.', medicines: 'A nurse can help you organize reminders and review your medicines.' },
      request: 'Request this visit', footnote: 'You can cancel or change your visit from the Visits tab.',
      alertTitle: 'Visit confirmed', alertMessage: 'Nurse Sarah will call before arriving.', done: 'Done',
    },
    signIn: {
      welcome: 'Welcome back', subtitle: 'Sign in with your phone. No password to remember.', phone: 'Phone number',
      verification: 'Verification code', sentHint: 'We sent a 4-digit code to +962', send: 'Send verification code',
      continue: 'Continue', email: 'Use email address instead', emailTitle: 'Email sign in',
      emailMessage: 'Email sign in will be available for family members.', family: 'Login as Family Member',
      familyTitle: 'Family member', familyMessage: 'Family members can connect after the patient has approved their access.',
      nurse: 'Login as Nurse', nurseTitle: 'Nurse login', nurseMessage: 'Nurse access is available through the verified provider portal.',
      privacy: 'Your health information is private and protected.',
    },
  },
  ar: {
    tabs: { home: 'الرئيسية', visits: 'الزيارات', medicines: 'الأدوية', profile: 'الملف الشخصي' },
    home: {
      morning: 'صباح الخير', greeting: 'صباح الخير، أحمد', question: 'كيف يمكننا مساعدتك اليوم؟',
      careTitle: 'الرعاية تصل إليك', careText: 'ممرضون مرخصون. تحديثات واضحة. في منزلك.',
      whatNeed: 'ماذا تحتاج؟', nextVisit: 'زيارتك القادمة', seeAll: 'عرض الكل', notifications: 'التنبيهات',
      help: 'هل تحتاج إلى مساعدة؟ فريق الرعاية هنا على مدار الساعة.', confirmed: 'مؤكدة', nurseSarah: 'الممرضة سارة',
      pressureSugar: 'الضغط والسكر',
    },
    services: {
      'blood-work': { title: 'تحاليل الدم', subtitle: 'سحب العينات من المنزل' },
      'pressure-sugar': { title: 'الضغط والسكر', subtitle: 'فحص صحي بسيط' },
      'heart-check': { title: 'فحص القلب', subtitle: 'رعاية لقلبك' },
      medicines: { title: 'أدويتي', subtitle: 'تذكير وتجديد الوصفات' },
    },
    visits: {
      title: 'زياراتك', subtitle: 'كل مواعيد رعايتك في مكان واحد.', upcoming: 'القادمة',
      noVisits: 'لا توجد زيارات محجوزة', noVisitsText: 'اختر خدمة من الرئيسية عندما تكون مستعداً.', goHome: 'العودة للرئيسية',
      homeVisit: 'زيارة منزلية', nurseSarah: 'الممرضة سارة', confirmed: 'مؤكدة',
      note: 'ستتصل بك الممرضة قبل الوصول. يمكنك تغيير الزيارة قبل الموعد بساعتين.',
    },
    medicines: {
      title: 'أدويتي', subtitle: 'تذكير بسيط بكل جرعة مهمة.', progressOverline: 'تقدم اليوم',
      progressTitle: 'تم أخذ جرعة واحدة من أصل جرعتين', progressText: 'أحسنت. استمر على هذا النحو.', today: 'اليوم',
      taken: 'تم أخذها', runningLow: 'هل اقترب الدواء من النفاد؟', refillText: 'اطلب من أحد أفراد عائلتك ترتيب التجديد.', add: 'إضافة دواء',
    },
    profile: {
      member: 'عضو في SeniorCare منذ 2026', emergencyTitle: 'مساعدة طارئة',
      emergencyText: 'اتصل بخدمات الطوارئ المحلية', account: 'حسابك', language: 'اللغة',
      appLanguage: 'لغة التطبيق', signInFamily: 'تسجيل دخول أحد أفراد العائلة', version: 'SeniorCare · هنا عندما تحتاجنا',
      rows: [
        { label: 'المعلومات الشخصية', detail: 'أحمد الخطيب' }, { label: 'عنوان المنزل', detail: 'عمّان، الأردن' },
        { label: 'العائلة ومقدمو الرعاية', detail: 'متصلان 2' }, { label: 'الخصوصية والأمان' },
      ],
    },
    request: {
      back: 'رجوع', assurance: 'رعايتك بيد ممرض مرخص وموثوق.', chooseDay: 'اختر اليوم',
      chooseTime: 'اختر الوقت', today: 'اليوم', tomorrow: 'غداً',
      estimate: { 'blood-work': 'تظهر النتائج عادة خلال 24–48 ساعة', 'pressure-sugar': 'يستغرق حوالي 20 دقيقة', 'heart-check': 'تحضر الممرضة كل ما يلزم', medicines: 'أحضر علب الأدوية' },
      description: { 'blood-work': 'تجمع ممرضة مرخصة عينتك بأمان في منزلك.', 'pressure-sugar': 'فحص بسيط لضغط الدم ومستوى السكر.', 'heart-check': 'فحص هادئ في المنزل لمساعدتك على فهم صحة قلبك.', medicines: 'تساعدك الممرضة في تنظيم تذكيرات الأدوية ومراجعتها.' },
      request: 'اطلب هذه الزيارة', footnote: 'يمكنك إلغاء أو تغيير الزيارة من تبويب الزيارات.',
      alertTitle: 'تم تأكيد الزيارة', alertMessage: 'ستتصل بك الممرضة سارة قبل الوصول.', done: 'تم',
    },
    signIn: {
      welcome: 'مرحباً بعودتك', subtitle: 'سجل دخولك برقم هاتفك. لا حاجة لتذكر كلمة مرور.', phone: 'رقم الهاتف',
      verification: 'رمز التحقق', sentHint: 'أرسلنا رمزاً من 4 أرقام إلى +962', send: 'إرسال رمز التحقق',
      continue: 'متابعة', email: 'استخدم البريد الإلكتروني بدلاً من ذلك', emailTitle: 'تسجيل الدخول بالبريد',
      emailMessage: 'سيكون تسجيل الدخول بالبريد متاحاً لأفراد العائلة.', family: 'تسجيل دخول فرد العائلة',
      familyTitle: 'فرد العائلة', familyMessage: 'يمكن لأفراد العائلة الاتصال بعد موافقة المريض على وصولهم.',
      nurse: 'تسجيل دخول الممرض', nurseTitle: 'تسجيل دخول الممرض', nurseMessage: 'دخول الممرضين متاح عبر بوابة مقدمي الخدمة الموثقة.',
      privacy: 'معلوماتك الصحية خاصة ومحمية.',
    },
  },
};

const STORAGE_KEY = '@seniorcare/local-state';

const defaultRequest: CareRequest = {
  id: 'visit-1',
  service: 'pressure-sugar',
  dateLabel: 'Today',
  timeLabel: '4:30 PM',
  status: 'Confirmed',
};

const SeniorCareContext = createContext<SeniorCareContextValue | null>(null);

export function SeniorCareProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [requests, setRequests] = useState<CareRequest[]>([defaultRequest]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (!value) return;
        const parsed = JSON.parse(value) as { language?: Language; requests?: CareRequest[] };
        if (parsed.language === 'en' || parsed.language === 'ar') setLanguageState(parsed.language);
        if (Array.isArray(parsed.requests)) setRequests(parsed.requests);
      })
      .catch(() => undefined)
      .finally(() => setIsLoaded(true));
  }, []);

  const persist = (nextLanguage: Language, nextRequests: CareRequest[]) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ language: nextLanguage, requests: nextRequests })).catch(
      () => undefined,
    );
  };

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    persist(nextLanguage, requests);
  };

  const addRequest = (request: CareRequest) => {
    const nextRequests = [request, ...requests];
    setRequests(nextRequests);
    persist(language, nextRequests);
  };

  const cancelRequest = (id: string) => {
    const nextRequests = requests.filter((request) => request.id !== id);
    setRequests(nextRequests);
    persist(language, nextRequests);
  };

  const value = useMemo(
    () => ({ language, setLanguage, requests, addRequest, cancelRequest, isLoaded }),
    [language, requests, isLoaded],
  );

  return <SeniorCareContext.Provider value={value}>{children}</SeniorCareContext.Provider>;
}

export function useSeniorCare() {
  const context = useContext(SeniorCareContext);
  if (!context) throw new Error('useSeniorCare must be used inside SeniorCareProvider');
  return context;
}

export function useCopy() {
  const { language } = useSeniorCare();
  return copy[language];
}