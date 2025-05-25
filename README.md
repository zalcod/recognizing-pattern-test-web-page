# Metin Analizi Raporu - Güvenli API Entegrasyonu

Bu proje, metin analizi için bir web uygulamasıdır. Kullanıcılar metinleri analiz edebilir, örnek metinler oluşturabilir ve AI destekli sonuçlar alabilirler. Uygulama, API anahtarlarını güvenli bir şekilde yönetmek için backend proxy mimarisi kullanır.

## 🔒 Güvenli API Kullanımı

Bu uygulama, Gemini API anahtarlarının **güvenli şekilde** kullanılması için tasarlanmıştır:

- API anahtarı **sadece backend'de** `.env` dosyasında saklanır
- İstemci (client) asla doğrudan AI servisiyle iletişim kurmaz
- Tüm istekler, kendi backend servisimiz üzerinden proxy'lenir
- API anahtarı hiçbir zaman tarayıcıda görünmez
- Daha önce yaşanan API anahtarlarının açığa çıkması sorunu tamamen çözülür

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- NPM (v6 veya üzeri)

### Adımlar

1. Projeyi klonlayın:
   ```
   git clone <repo-url>
   cd oruntu-tanima-react
   ```

2. Bağımlılıkları yükleyin:
   ```
   npm install
   cd client && npm install && cd ..
   ```

3. `.env` dosyasını oluşturun:
   ```
   # api/.env dosyası oluşturun
   PORT=5002
   GEMINI_API_KEY=sizin_api_anahtariniz
   NODE_ENV=development
   ```

4. Uygulamayı geliştirme modunda başlatın:
   ```
   npm run dev
   ```

Bu komut, backend server'ı 5002 portunda, frontend'i ise 3000 portunda başlatacaktır.

## 📚 Kullanım

Uygulama başladıktan sonra, tarayıcınızda aşağıdaki adreslere giderek uygulamayı kullanabilirsiniz:

- **React Uygulaması:** `http://localhost:3000` - Güvenli API kullanımlı modern versiyon
- **Orijinal HTML:** `http://localhost:5002/original` - Orijinal HTML/CSS/JS sürümü

### React Uygulaması (Güvenli)

1. Duygu Analizi, Konu Sınıflandırması veya Yazar Tanıma sekmeleri arasında geçiş yapın
2. "Örnek Oluştur" butonuna tıklayarak AI tarafından oluşturulan örnek metinleri alın
3. Kendi metninizi yazın veya örnek metni düzenleyin
4. "Analiz Et" butonuna tıklayarak sonuçları görüntüleyin

### Orijinal HTML Sürümü

Orijinal HTML sürümüne, React uygulamasının üst kısmındaki "Orijinal Sürümü Görüntüle" bağlantısından veya doğrudan `http://localhost:5002/original` adresinden erişebilirsiniz.

## 🔨 Proje Yapısı

```
oruntu-tanima-react/
├── api/                 # Backend kodu
│   ├── server.js        # Express sunucusu ve API proxy
│   └── .env             # API anahtarları ve ortam değişkenleri
├── client/              # Frontend kodu (React)
│   ├── public/          # Statik dosyalar ve orijinal HTML/CSS
│   │   ├── index.html   # Orijinal HTML dosyası
│   │   ├── styles.css   # Orijinal CSS dosyası
│   │   └── ...
│   └── src/             # React kaynak kodu
│       ├── App.js       # Ana uygulama bileşeni
│       └── ...
├── package.json         # Bağımlılıklar ve scriptler
└── README.md            # Belgelendirme
```

## 🌐 Canlı Ortama Dağıtım

Uygulamayı Heroku, Vercel, Netlify veya benzeri platformlara dağıtabilirsiniz. Deployment için:

1. Frontend yapılandırması:
   - `client/src/App.js` dosyasında API adresini güncelleyin:
   ```javascript
   const response = await fetch('/api/gemini', { // Canlı ortamda göreli yol kullanın
   ```

2. Heroku için:
   ```
   heroku create
   git push heroku main
   ```

3. Canlı ortamda API anahtarınızı Heroku Dashboard'da veya CLI üzerinden ayarlayın:
   ```
   heroku config:set GEMINI_API_KEY=sizin_api_anahtariniz
   ```

## Netlify Deployment Talimatları

Bu proje, Netlify'da deploy edilmek üzere yapılandırılmıştır. Netlify Functions kullanarak API işlevselliğini korur.

### Deployment Adımları:

1. **Netlify'da Yeni Site Oluştur:**
   - Netlify hesabınıza giriş yapın
   - "New site from Git" butonuna tıklayın
   - GitHub/GitLab/Bitbucket hesabınızı bağlayın ve bu repo'yu seçin

2. **Build Ayarları:**
   - Build command: `npm run build`
   - Publish directory: `client/build`

3. **Environment Variables:**
   - Netlify site ayarlarında "Environment variables" bölümüne gidin
   - Aşağıdaki değişkeni ekleyin:
     - Key: `GEMINI_API_KEY`
     - Value: Gemini API anahtarınız

4. **Deploy:**
   - "Deploy site" butonuna tıklayın

### Not:
- Backend Express.js API'si yerine Netlify Functions kullanılmaktadır
- API endpoint `/api/gemini` otomatik olarak `/.netlify/functions/gemini` fonksiyonuna yönlendirilir
- Tüm SPA yönlendirmeleri `/*` → `/index.html` şeklinde yapılandırılmıştır

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 