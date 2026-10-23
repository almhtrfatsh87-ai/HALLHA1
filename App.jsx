import React, { useMemo, useRef, useState } from 'react'
import {
  Search, Languages, FileText, Image, Calculator, QrCode, Type,
  FileUser, Sparkles, Menu, X, ArrowLeft, ShieldCheck, Globe2,
  Heart, Crown, LogIn, LogOut, User, CheckCircle2, AlertCircle,
  Download, Upload, ChevronDown
} from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import QRCode from 'qrcode'
import { supabase, authConfigured } from './supabase'

const translations = {
  ar: {
    tagline: 'كل مشكلة لها حل',
    subtitle: 'أدوات رقمية مفيدة، بسيطة ومجانية — في مكان واحد.',
    search: 'ابحث عن أداة...',
    tools: 'اكتشف الأدوات',
    all: 'كل الأدوات',
    pdf: 'دمج ملفات PDF',
    pdfDesc: 'اجمع عدة ملفات PDF في ملف واحد.',
    image: 'ضغط الصور',
    imageDesc: 'قلّل حجم الصورة وحمّل النسخة الجديدة.',
    calc: 'حاسبة الأرباح',
    calcDesc: 'احسب الربح وهامش الربح والخصم.',
    qr: 'إنشاء رمز QR',
    qrDesc: 'حوّل رابطًا أو نصًا إلى رمز QR.',
    text: 'أدوات النصوص',
    textDesc: 'احسب الكلمات والحروف ونظّم النص.',
    cv: 'منشئ السيرة الذاتية',
    cvDesc: 'جهّز سيرة ذاتية بسيطة للطباعة.',
    ai: 'مساعد الذكاء الاصطناعي',
    aiDesc: 'قريبًا — مساعد لإنجاز المهام.',
    free: 'مجاني',
    chooseFiles: 'اختر ملفات PDF (ملفين على الأقل)',
    merge: 'دمج وتنزيل',
    compress: 'ضغط الصورة',
    quality: 'جودة الصورة',
    original: 'الحجم الأصلي',
    newSize: 'الحجم الجديد',
    cost: 'التكلفة',
    sale: 'سعر البيع',
    profit: 'احسب الربح',
    discount: 'احسب الخصم',
    enterValues: 'أدخل أرقامًا صحيحة.',
    qrPlaceholder: 'اكتب رابطًا أو نصًا',
    makeQR: 'إنشاء الرمز',
    textPlaceholder: 'اكتب أو الصق النص هنا...',
    count: 'احسب الكلمات والحروف',
    words: 'الكلمات',
    chars: 'الحروف',
    uppercase: 'أحرف كبيرة',
    lowercase: 'أحرف صغيرة',
    clear: 'مسح',
    name: 'الاسم الكامل',
    job: 'المسمى الوظيفي',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    about: 'نبذة عنك',
    skills: 'المهارات',
    printCV: 'معاينة / طباعة السيرة الذاتية',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    emailAddress: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    account: 'حسابي',
    favorites: 'المفضلة',
    premium: 'عضوية Premium',
    soon: 'قريبًا',
    help: 'مركز المساعدة',
    privacy: 'خصوصيتك مهمة: تُعالج أدوات الملفات محليًا في متصفحك.',
    footer: '© 2026 HALLHA. جميع الحقوق محفوظة.',
    noResults: 'لا توجد أدوات مطابقة.',
    selectTool: 'اختر أداة للبدء',
    back: 'العودة للأدوات',
    authMissing: 'تسجيل الحسابات يحتاج إعداد مشروع Supabase أولًا. يمكنك استخدام الأدوات المجانية الآن.',
    authSuccess: 'تم إرسال رابط التأكيد إلى بريدك الإلكتروني إذا كان التسجيل متاحًا.',
    authError: 'تعذر إكمال العملية. تحقق من البيانات وإعدادات Supabase.',
    signOut: 'تسجيل الخروج',
    passwordHint: 'كلمة المرور (6 أحرف على الأقل)',
    pdfNeed: 'اختر ملفين PDF على الأقل.',
    processing: 'جارٍ التنفيذ...',
    done: 'تم بنجاح.',
    failed: 'حدث خطأ. تحقق من الملف وحاول مرة أخرى.',
    imageNeed: 'اختر صورة أولًا.',
    qrNeed: 'اكتب نصًا أو رابطًا أولًا.',
    cvNeed: 'اكتب اسمك أولًا.',
    download: 'تنزيل',
    navHome: 'الرئيسية'
  },
  en: {
    tagline: 'Every problem has a solution',
    subtitle: 'Useful, simple and free digital tools — all in one place.',
    search: 'Search for a tool...',
    tools: 'Explore tools',
    all: 'All tools',
    pdf: 'Merge PDF files',
    pdfDesc: 'Combine multiple PDF files into one.',
    image: 'Image compressor',
    imageDesc: 'Reduce image size and download the result.',
    calc: 'Profit calculator',
    calcDesc: 'Calculate profit, margin and discounts.',
    qr: 'QR code generator',
    qrDesc: 'Turn a link or text into a QR code.',
    text: 'Text tools',
    textDesc: 'Count words and characters and format text.',
    cv: 'Resume builder',
    cvDesc: 'Create a simple printable resume.',
    ai: 'AI assistant',
    aiDesc: 'Coming soon — an assistant for everyday tasks.',
    free: 'Free',
    chooseFiles: 'Choose PDF files (at least two)',
    merge: 'Merge and download',
    compress: 'Compress image',
    quality: 'Image quality',
    original: 'Original size',
    newSize: 'New size',
    cost: 'Cost',
    sale: 'Sale price',
    profit: 'Calculate profit',
    discount: 'Calculate discount',
    enterValues: 'Enter valid numbers.',
    qrPlaceholder: 'Enter a link or text',
    makeQR: 'Generate QR',
    textPlaceholder: 'Type or paste text here...',
    count: 'Count words and characters',
    words: 'Words',
    chars: 'Characters',
    uppercase: 'UPPERCASE',
    lowercase: 'lowercase',
    clear: 'Clear',
    name: 'Full name',
    job: 'Job title',
    email: 'Email address',
    phone: 'Phone number',
    about: 'About you',
    skills: 'Skills',
    printCV: 'Preview / print resume',
    login: 'Log in',
    signup: 'Create account',
    emailAddress: 'Email address',
    password: 'Password',
    account: 'Account',
    favorites: 'Favorites',
    premium: 'Premium membership',
    soon: 'Coming soon',
    help: 'Help center',
    privacy: 'Privacy: file tools process files locally in your browser.',
    footer: '© 2026 HALLHA. All rights reserved.',
    noResults: 'No matching tools found.',
    selectTool: 'Choose a tool to get started',
    back: 'Back to tools',
    authMissing: 'Accounts require Supabase setup first. You can use the free tools now.',
    authSuccess: 'If sign-up is enabled, a confirmation link has been sent to your email.',
    authError: 'Could not complete the action. Check your details and Supabase settings.',
    signOut: 'Sign out',
    passwordHint: 'Password (at least 6 characters)',
    pdfNeed: 'Choose at least two PDF files.',
    processing: 'Working...',
    done: 'Done.',
    failed: 'Something went wrong. Check the file and try again.',
    imageNeed: 'Choose an image first.',
    qrNeed: 'Enter text or a link first.',
    cvNeed: 'Enter your name first.',
    download: 'Download',
    navHome: 'Home'
  }
}

const toolList = [
  { id: 'pdf', icon: FileText, category: 'Files' },
  { id: 'image', icon: Image, category: 'Images' },
  { id: 'calc', icon: Calculator, category: 'Business' },
  { id: 'qr', icon: QrCode, category: 'Utilities' },
  { id: 'text', icon: Type, category: 'Writing' },
  { id: 'cv', icon: FileUser, category: 'Career' },
  { id: 'ai', icon: Sparkles, category: 'AI', soon: true }
]

export default function App() {
  const [lang, setLang] = useState('ar')
  const [active, setActive] = useState('')
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMode, setAuthMode] = useState('login')
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [quality, setQuality] = useState(75)
  const [calcCost, setCalcCost] = useState('')
  const [calcSale, setCalcSale] = useState('')
  const [calcResult, setCalcResult] = useState('')
  const [textValue, setTextValue] = useState('')
  const [textResult, setTextResult] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [qrData, setQrData] = useState('')
  const [cv, setCv] = useState({ name:'', job:'', email:'', phone:'', about:'', skills:'' })
  const [imageUrl, setImageUrl] = useState('')
  const [imageStats, setImageStats] = useState('')
  const [busy, setBusy] = useState(false)
  const fileRef = useRef(null)
  const t = translations[lang]
  const rtl = lang === 'ar'

  const visibleTools = useMemo(() => toolList.filter(tool => {
    const label = t[tool.id]
    const desc = t[tool.id + 'Desc']
    return (label + ' ' + desc + ' ' + tool.category).toLowerCase().includes(query.toLowerCase())
  }), [query, t])

  async function handleAuth(e) {
    e.preventDefault()
    if (!supabase) { setNotice(t.authMissing); return }
    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setNotice(t.authSuccess)
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        setUser(data.user)
        setShowAuth(false)
        setNotice(t.done)
      }
    } catch { setNotice(t.authError) }
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
    setNotice(t.signOut)
  }

  async function mergePDF() {
    const files = [...(fileRef.current?.files || [])]
    if (files.length < 2) { setNotice(t.pdfNeed); return }
    setBusy(true); setNotice(t.processing)
    try {
      const merged = await PDFDocument.create()
      for (const file of files) {
        const source = await PDFDocument.load(await file.arrayBuffer())
        const pages = await merged.copyPages(source, source.getPageIndices())
        pages.forEach(page => merged.addPage(page))
      }
      const bytes = await merged.save()
      downloadBlob(new Blob([bytes], { type: 'application/pdf' }), 'HALLHA-merged.pdf')
      setNotice(t.done)
    } catch { setNotice(t.failed) } finally { setBusy(false) }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = filename; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 2000)
  }

  async function compressImage(file) {
    if (!file) { setNotice(t.imageNeed); return }
    setBusy(true); setNotice(t.processing)
    try {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      const img = await new Promise((resolve, reject) => {
        const image = new window.Image()
        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = data
      })
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight
      canvas.getContext('2d').drawImage(img, 0, 0)
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality / 100))
      if (!blob) throw new Error('Image conversion failed')
      if (imageUrl) URL.revokeObjectURL(imageUrl)
      const url = URL.createObjectURL(blob)
      setImageUrl(url)
      setImageStats(`${t.original}: ${(file.size/1024).toFixed(1)} KB · ${t.newSize}: ${(blob.size/1024).toFixed(1)} KB`)
      setNotice(t.done)
    } catch { setNotice(t.failed) } finally { setBusy(false) }
  }

  async function makeQR() {
    if (!qrValue.trim()) { setNotice(t.qrNeed); return }
    try { setQrData(await QRCode.toDataURL(qrValue.trim(), { width: 240, margin: 2 })); setNotice(t.done) }
    catch { setNotice(t.failed) }
  }

  function calculate(kind) {
    const a = Number(calcCost), b = Number(calcSale)
    if (!calcCost || !calcSale || !Number.isFinite(a) || !Number.isFinite(b) || a < 0 || b < 0) { setCalcResult(t.enterValues); return }
    if (kind === 'profit') setCalcResult(`${t.profit}: ${(b-a).toFixed(2)} · ${lang==='ar'?'هامش الربح':'Margin'}: ${b ? (((b-a)/b)*100).toFixed(2) : '0'}%`)
    else if (b > 100) setCalcResult(t.enterValues)
    else setCalcResult(`${lang==='ar'?'قيمة الخصم':'Discount'}: ${(a*b/100).toFixed(2)} · ${lang==='ar'?'السعر النهائي':'Final price'}: ${(a*(1-b/100)).toFixed(2)}`)
  }

  function countText() {
    const words = textValue.trim() ? textValue.trim().split(/\s+/).length : 0
    setTextResult(`${t.words}: ${words} · ${t.chars}: ${textValue.length}`)
  }

  function updateCV(key, value) { setCv(old => ({ ...old, [key]: value })) }
  function printCV() {
    if (!cv.name.trim()) { setNotice(t.cvNeed); return }
    const safe = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
    const w = window.open('', '_blank')
    if (!w) { setNotice('اسمح بفتح النوافذ المنبثقة للطباعة.'); return }
    w.document.write(`<html lang="${lang}" dir="${rtl?'rtl':'ltr'}"><meta charset="utf-8"><title>HALLHA CV</title><style>body{font-family:Arial;padding:40px;line-height:1.8;color:#17243a}h1{color:#2459a5}h2{border-bottom:1px solid #ddd}</style><h1>${safe(cv.name)}</h1><h3>${safe(cv.job)}</h3><p>${safe(cv.email)} · ${safe(cv.phone)}</p><h2>${rtl?'نبذة عني':'About me'}</h2><p>${safe(cv.about)}</p><h2>${rtl?'المهارات':'Skills'}</h2><p>${safe(cv.skills)}</p><script>window.onload=()=>window.print()<\/script></html>`)
    w.document.close()
  }

  const openTool = id => { if (id === 'ai') return; setActive(id); setNotice('') }
  const title = id => t[id]
  const desc = id => t[id + 'Desc']

  return <div className="app" dir={rtl ? 'rtl' : 'ltr'}>
    <header className="topbar">
      <a className="brand" href="#" onClick={() => setActive('')}><span className="brand-mark">H</span><span>HALLHA</span></a>
      <nav className="desktop-nav">
        <a href="#tools">{t.tools}</a>
        <a href="#about">{t.help}</a>
        <a href="#premium">{t.premium}</a>
      </nav>
      <div className="top-actions">
        <button className="icon-button language" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}><Languages size={17}/>{lang === 'ar' ? 'EN' : 'عربي'}</button>
        {user ? <button className="icon-button" onClick={signOut}><LogOut size={17}/>{t.signOut}</button> : <button className="primary small" onClick={() => setShowAuth(true)}><LogIn size={16}/>{t.login}</button>}
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="eyebrow"><Globe2 size={15}/> GLOBAL DIGITAL TOOLBOX</div>
        <h1>{t.tagline.split(' ').slice(0,-1).join(' ')} <span>{t.tagline.split(' ').slice(-1)}</span></h1>
        <p>{t.subtitle}</p>
        <div className="searchbar"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search}/><kbd>⌕</kbd></div>
        <div className="hero-meta"><span><CheckCircle2 size={15}/>{t.free}</span><span><ShieldCheck size={15}/>{rtl?'معالجة خاصة للملفات':'Private file processing'}</span><span><Globe2 size={15}/>Global</span></div>
      </section>

      {active ? <section className="workspace section-wrap">
        <div className="workspace-head"><button className="back-button" onClick={()=>setActive('')}><ArrowLeft size={17}/>{t.back}</button><span className="tool-kicker">HALLHA TOOL</span></div>
        <div className="workspace-title"><h2>{title(active)}</h2><p>{desc(active)}</p></div>

        {active === 'pdf' && <div className="tool-panel">
          <div className="dropzone"><Upload size={28}/><strong>{t.chooseFiles}</strong><input ref={fileRef} type="file" accept="application/pdf,.pdf" multiple /></div>
          <button className="primary action-button" disabled={busy} onClick={mergePDF}>{busy?t.processing:t.merge}</button>
        </div>}

        {active === 'image' && <div className="tool-panel">
          <input className="file-input" type="file" accept="image/*" onChange={e=>compressImage(e.target.files?.[0])}/>
          <label className="range-label">{t.quality}<strong>{quality}%</strong></label>
          <input className="range" type="range" min="10" max="100" value={quality} onChange={e=>setQuality(Number(e.target.value))}/>
          {imageStats && <p className="success-text">{imageStats}</p>}
          {imageUrl && <a className="download-link" href={imageUrl} download="HALLHA-compressed.jpg"><Download size={16}/>{t.download}</a>}
        </div>}

        {active === 'calc' && <div className="tool-panel">
          <div className="form-grid"><label>{t.cost}<input type="number" value={calcCost} onChange={e=>setCalcCost(e.target.value)} placeholder="0.00"/></label><label>{t.sale}<input type="number" value={calcSale} onChange={e=>setCalcSale(e.target.value)} placeholder="0.00"/></label></div>
          <div className="button-row"><button className="primary" onClick={()=>calculate('profit')}>{t.profit}</button><button className="ghost" onClick={()=>calculate('discount')}>{t.discount}</button></div>
          {calcResult && <div className="result-box">{calcResult}</div>}
        </div>}

        {active === 'qr' && <div className="tool-panel"><input className="text-input" value={qrValue} onChange={e=>setQrValue(e.target.value)} placeholder={t.qrPlaceholder}/><button className="primary action-button" onClick={makeQR}>{t.makeQR}</button>{qrData && <div className="qr-result"><img src={qrData} alt="QR code"/><a className="download-link" href={qrData} download="HALLHA-QR.png"><Download size={16}/>{t.download}</a></div>}</div>}

        {active === 'text' && <div className="tool-panel"><textarea className="text-area" value={textValue} onChange={e=>setTextValue(e.target.value)} placeholder={t.textPlaceholder}/><div className="button-row wrap"><button className="primary" onClick={countText}>{t.count}</button><button className="ghost" onClick={()=>setTextValue(v=>v.toUpperCase())}>{t.uppercase}</button><button className="ghost" onClick={()=>setTextValue(v=>v.toLowerCase())}>{t.lowercase}</button><button className="ghost" onClick={()=>{setTextValue('');setTextResult('')}}>{t.clear}</button></div>{textResult && <div className="result-box">{textResult}</div>}</div>}

        {active === 'cv' && <div className="tool-panel"><div className="form-grid">
          <label>{t.name}<input value={cv.name} onChange={e=>updateCV('name',e.target.value)}/></label>
          <label>{t.job}<input value={cv.job} onChange={e=>updateCV('job',e.target.value)}/></label>
          <label>{t.email}<input type="email" value={cv.email} onChange={e=>updateCV('email',e.target.value)}/></label>
          <label>{t.phone}<input value={cv.phone} onChange={e=>updateCV('phone',e.target.value)}/></label>
        </div><label className="full-label">{t.about}<textarea value={cv.about} onChange={e=>updateCV('about',e.target.value)}/></label><label className="full-label">{t.skills}<textarea value={cv.skills} onChange={e=>updateCV('skills',e.target.value)}/></label><button className="primary action-button" onClick={printCV}>{t.printCV}</button></div>}
      </section> : <section className="section-wrap tools-section" id="tools">
        <div className="section-heading"><div><span className="section-kicker">DISCOVER</span><h2>{t.tools}</h2></div><span className="count-pill">{visibleTools.length} {t.all}</span></div>
        <div className="tool-grid">
          {visibleTools.map(item => {
            const Icon = item.icon
            return <button key={item.id} className={`tool-card ${item.soon?'muted':''}`} onClick={()=>item.soon?setNotice(t.soon):openTool(item.id)}>
              <span className="tool-icon"><Icon size={23}/></span><span className="tool-card-copy"><strong>{title(item.id)}</strong><small>{desc(item.id)}</small><em>{item.soon?t.soon:t.free}</em></span><ArrowLeft className="card-arrow" size={17}/>
            </button>
          })}
        </div>
        {visibleTools.length===0 && <div className="empty-state">{t.noResults}</div>}
      </section>}

      <section className="trust-strip section-wrap" id="about"><div><ShieldCheck/><strong>{rtl?'خصوصيتك أولويتنا':'Privacy first'}</strong><p>{t.privacy}</p></div><div><Globe2/><strong>{rtl?'مصممة للجميع':'Made for everyone'}</strong><p>{rtl?'تجربة مناسبة للهاتف والكمبيوتر':'Responsive on mobile and desktop'}</p></div><div><Sparkles/><strong>{rtl?'المزيد قادم':'More coming'}</strong><p>{rtl?'نضيف أدوات وخدمات جديدة باستمرار':'New tools and services will be added'}</p></div></section>

      <section className="premium-banner section-wrap" id="premium"><div className="premium-icon"><Crown size={25}/></div><div><span className="section-kicker">HALLHA PLUS</span><h2>{t.premium}</h2><p>{rtl?'ستكون هناك مزايا اختيارية إضافية مستقبلًا. الأدوات الأساسية ستظل مجانية.':'Optional extra features may be introduced later. Core tools will remain free.'}</p></div><span className="coming-pill">{t.soon}</span></section>
    </main>

    <footer className="footer"><a className="brand" href="#"><span className="brand-mark">H</span><span>HALLHA</span></a><p>{t.footer}</p><span>Every problem has a solution.</span></footer>

    {notice && <div className="toast" role="status"><CheckCircle2 size={17}/>{notice}<button onClick={()=>setNotice('')} aria-label="Close"><X size={15}/></button></div>}

    {showAuth && <div className="modal-backdrop" onClick={()=>setShowAuth(false)}><div className="auth-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowAuth(false)}><X/></button><div className="modal-icon"><User/></div><h2>{authMode==='login'?t.login:t.signup}</h2><p className="muted-text">{authConfigured?'Supabase authentication':'Configure Supabase to enable accounts'}</p><form onSubmit={handleAuth}><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.emailAddress}/><input type="password" required minLength="6" value={password} onChange={e=>setPassword(e.target.value)} placeholder={t.passwordHint}/><button className="primary action-button" type="submit">{authMode==='login'?t.login:t.signup}</button></form><button className="switch-auth" onClick={()=>setAuthMode(authMode==='login'?'signup':'login')}>{authMode==='login'?t.signup:t.login}</button>{!authConfigured && <p className="setup-note"><AlertCircle size={15}/>{t.authMissing}</p>}</div></div>}
  </div>
}
