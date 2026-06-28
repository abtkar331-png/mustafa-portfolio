# مصطفى — بورتفوليو (Portfolio)

موقع بورتفوليو شخصي عصري لمجال **تصميم وتعديل الصور**، مبني بأحدث تقنيات الواجهات الأمامية.

## 🚀 التقنيات

- **React + Vite** — أساس سريع وخفيف
- **Tailwind CSS v4** — التصميم والثيم
- **Three.js / React Three Fiber + drei** — العناصر ثلاثية الأبعاد العائمة
- **Framer Motion** — حركات النصوص والظهور (Staggered / whileInView)
- **GSAP + ScrollTrigger** — أشرطة التقدّم في قسم المهارات

## 🧩 المميزات

- نظام شرائح كامل الصفحة (Full-Page Snap Scrolling) — كل قسم `100dvh`
- وضع ليلي بألوان نيون + زجاج شفاف (Glassmorphism)
- **Hero**: تقسيم 50/50 على الكمبيوتر، عناصر 3D عائمة خلف وأمام الصورة مع تأثير Parallax بحركة الماوس
- أزرار بتأثير مغناطيسي (Magnetic Buttons)
- **About**: بطاقة زجاجية تظهر من الأسفل
- **Skills**: شارات عائمة + أشرطة تقدّم تملأ نفسها عبر GSAP ScrollTrigger
- **Portfolio**: شبكة أعمال + **Before/After Slider** قابل للسحب + تكبير عند المرور
- **Contact**: نموذج بتأثيرات Micro-interactions + روابط اجتماعية
- مؤشر ماوس مخصص (Custom Cursor) يكبر فوق العناصر التفاعلية
- شاشة تحميل افتتاحية (Page Transition / Preloader)
- متجاوب 100% مع الهواتف مع تقليل أحمال الـ 3D للأداء

## ▶️ التشغيل

```bash
npm install
npm run dev      # تشغيل خادم التطوير
npm run build    # بناء نسخة الإنتاج
npm run preview  # معاينة نسخة الإنتاج
```

## ✏️ التخصيص (المطلوب منك)

| ما تريد تغييره | المكان |
|---|---|
| **صورتك الشخصية المفرّغة** | ضع الملف في `public/portrait.png` (يظهر تلقائياً بدل الحرف M) |
| **صور أعمالك** | `src/sections/Portfolio.jsx` — استبدل روابط `picsum` بصورك |
| **صور قبل/بعد** | نفس الملف، خصائص `before` و `after` في `<BeforeAfterSlider>` |
| **نِسَب المهارات** | `src/sections/Skills.jsx` — مصفوفة `skills` |
| **روابط التواصل** | `src/sections/Contact.jsx` — مصفوفة `socials` (عدّل `href`) |
| **النصوص التعريفية** | `src/sections/Hero.jsx` و `About.jsx` |
| **الألوان / الثيم** | `src/index.css` داخل كتلة `@theme` |

## 📁 البنية

```
src/
├─ App.jsx                 # التجميع: Cursor + Preloader + SideNav + الأقسام
├─ index.css               # الثيم، الزجاج، النيون، Snap Scroll
├─ components/
│  ├─ CustomCursor.jsx
│  ├─ Preloader.jsx
│  ├─ MagneticButton.jsx
│  ├─ SideNav.jsx
│  └─ BeforeAfterSlider.jsx
├─ three/
│  └─ FloatingScene.jsx    # مشهد 3D (طبقة خلفية وأمامية)
├─ hooks/
│  └─ useIsMobile.js
└─ sections/
   ├─ Hero.jsx
   ├─ About.jsx
   ├─ Skills.jsx
   ├─ Portfolio.jsx
   └─ Contact.jsx
```

## 📝 ملاحظات تقنية

- استُخدم **CSS Scroll-Snap** الأصلي (بدل Lenis) لتفادي التعارض مع نظام الشرائح وضمان أداء مستقر.
- عناصر الـ 3D لا تعتمد على أي خطوط/HDRI خارجية لتعمل بشكل كامل دون اتصال.
