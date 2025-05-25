import React, { useState } from 'react';
import './App.css';

function App() {
  // State tanımlamaları
  const [activeTab, setActiveTab] = useState('sentiment');
  const [textInputs, setTextInputs] = useState({
    sentiment: '',
    topic: '',
    author: ''
  });
  const [results, setResults] = useState({
    sentiment: '',
    topic: '',
    author: ''
  });
  const [loading, setLoading] = useState({
    sentiment: false,
    topic: false,
    author: false
  });

  // API çağrıları
  const callBackendAPI = async (prompt, type) => {
    try {
      setLoading(prev => ({ ...prev, [type]: true }));

      // API endpoint URL'i - production'da Netlify Functions, development'ta localhost
      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/api/gemini'
        : 'http://localhost:5002/api/gemini';

      // Backend proxy'ye istek gönder (API anahtarı güvenli bir şekilde backend'de)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(prev => ({ ...prev, [type]: data.text }));
      } else {
        setResults(prev => ({ ...prev, [type]: `Hata: ${data.error || 'Bilinmeyen hata'}` }));
      }
    } catch (error) {
      setResults(prev => ({ ...prev, [type]: `Bağlantı hatası: ${error.message}` }));
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  // Örnek metin oluşturma
  const generateText = async (type) => {
    setTextInputs(prev => ({ ...prev, [type]: '' }));
    setResults(prev => ({ ...prev, [type]: '' }));

    let prompt = '';
    if (type === 'sentiment') {
      prompt = "Duygu analizi için örnek bir ürün inceleme metni oluştur (yaklaşık 30-50 kelime, Türkçe). Metin pozitif, negatif veya nötr olabilir.";
    } else if (type === 'topic') {
      prompt = "Konu sınıflandırması için örnek bir haber başlığı veya kısa bir haber özeti oluştur (yaklaşık 20-40 kelime, Türkçe). Konu spor, siyaset, teknoloji, sağlık veya eğitim olabilir.";
    } else if (type === 'author') {
      prompt = "Yazar tanıma için belirgin bir edebi üsluba sahip (örneğin, esprili, resmi, şiirsel veya akademik) kısa bir paragraf oluştur (yaklaşık 40-60 kelime, Türkçe).";
    }

    await callBackendAPI(prompt, type);

    // Oluşturulan metni text input'a yerleştir
    if (results[type] && !results[type].startsWith('Hata') && !results[type].startsWith('Bağlantı hatası')) {
      setTextInputs(prev => ({ ...prev, [type]: results[type] }));
    }
  };

  // Metin analizi
  const analyzeText = async (type) => {
    if (!textInputs[type].trim()) {
      setResults(prev => ({ ...prev, [type]: 'Lütfen analiz edilecek bir metin girin veya örnek oluşturun.' }));
      return;
    }

    let prompt = '';
    if (type === 'sentiment') {
      prompt = `Aşağıdaki Türkçe metnin duygusunu analiz et (pozitif, negatif veya nötr olarak belirt) ve nedenini kısaca Türkçe açıkla:\n\n"${textInputs[type]}"`;
    } else if (type === 'topic') {
      prompt = `Aşağıdaki Türkçe metnin ana konusunu belirle (örneğin spor, siyaset, teknoloji) ve bu konuyu destekleyen 2-3 anahtar kelimeyi Türkçe listele:\n\n"${textInputs[type]}"`;
    } else if (type === 'author') {
      prompt = `Aşağıdaki Türkçe metnin yazarının olası üslup özelliklerini (örneğin cümle yapısı, kelime seçimi, ton) kısaca Türkçe analiz et:\n\n"${textInputs[type]}"`;
    }

    await callBackendAPI(prompt, type);
  };

  // Input değişikliği
  const handleInputChange = (e, type) => {
    setTextInputs(prev => ({ ...prev, [type]: e.target.value }));
  };

  return (
    <div className="App bg-[#F6FFEC] min-h-screen">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#FF7178]">Metin Analizi Raporu</h1>
            {process.env.NODE_ENV !== 'production' && (
              <a
                href="http://localhost:5002/original"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#FF7178] hover:underline"
              >
                Orijinal Sürümü Görüntüle →
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold text-[#010101] mb-4">Problem Alanlarına Genel Bakış (✨ AI Destekli)</h1>
          <p className="mb-4 text-lg leading-relaxed">
            Bu uygulama, metin analizi kapsamında ele alınan üç temel NLP görevini tanıtmaktadır.
            Her bir görev için AI kullanarak örnek metinler oluşturabilir ve metinleri analiz edebilirsiniz.
          </p>

          <div className="mb-4 p-3 rounded-lg border border-[#D4E7E3] bg-[#F6FFEC]">
            <div className="flex justify-between items-center">
              <span className="text-sm">🔒 Güvenli API Bağlantısı: <span className="text-green-600 font-semibold">Aktif</span></span>
              <span className="text-xs text-gray-500">* API anahtarınız güvenli bir şekilde backend'de saklanır</span>
            </div>
          </div>

          <div className="flex space-x-2 border-b">
            <button
              onClick={() => setActiveTab('sentiment')}
              className={`px-4 py-2 ${activeTab === 'sentiment' ? 'border-b-2 border-[#FF7178] text-[#FF7178] font-medium' : 'text-gray-500'}`}
            >
              Duygu Analizi
            </button>
            <button
              onClick={() => setActiveTab('topic')}
              className={`px-4 py-2 ${activeTab === 'topic' ? 'border-b-2 border-[#FF7178] text-[#FF7178] font-medium' : 'text-gray-500'}`}
            >
              Konu Sınıflandırması
            </button>
            <button
              onClick={() => setActiveTab('author')}
              className={`px-4 py-2 ${activeTab === 'author' ? 'border-b-2 border-[#FF7178] text-[#FF7178] font-medium' : 'text-gray-500'}`}
            >
              Yazar Tanıma
            </button>
          </div>

          <div className="mt-6">
            {/* Duygu Analizi Paneli */}
            {activeTab === 'sentiment' && (
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-[#010101] mb-3">💡 Duygu Analizi</h2>
                <p className="mb-4 leading-relaxed">
                  Bir metin parçasında ifade edilen öznel görüşü, tutumu veya duygusal tonu (pozitif, negatif, nötr vb.) otomatik olarak belirleme sürecidir.
                </p>
                <textarea
                  value={textInputs.sentiment}
                  onChange={(e) => handleInputChange(e, 'sentiment')}
                  className="w-full p-2 border rounded-md mb-3 h-28 text-sm"
                  placeholder="Analiz edilecek metni buraya yazın veya örnek oluşturun..."
                />
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <button
                    onClick={() => generateText('sentiment')}
                    className="bg-[#FF7178] text-white font-medium py-2 px-4 rounded hover:bg-[#E56067] transition"
                    disabled={loading.sentiment}
                  >
                    {loading.sentiment ? '✨ Oluşturuluyor...' : '✨ Örnek Oluştur'}
                  </button>
                  <button
                    onClick={() => analyzeText('sentiment')}
                    className="bg-[#FF7178] text-white font-medium py-2 px-4 rounded hover:bg-[#E56067] transition"
                    disabled={loading.sentiment}
                  >
                    {loading.sentiment ? '✨ Analiz Ediliyor...' : '✨ Analiz Et'}
                  </button>
                </div>
                {loading.sentiment && (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF7178]"></div>
                  </div>
                )}
                <div className="mt-2 p-3 bg-[#F6FFEC] rounded-md border border-[#D4E7E3] text-sm min-h-[60px] leading-relaxed">
                  {results.sentiment}
                </div>
              </div>
            )}

            {/* Konu Sınıflandırması Paneli */}
            {activeTab === 'topic' && (
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-[#010101] mb-3">📚 Konu Sınıflandırması</h2>
                <p className="mb-4 leading-relaxed">
                  Metin belgelerini önceden tanımlanmış bir dizi kategoriye (spor, siyaset, teknoloji vb.) otomatik olarak atama işlemidir.
                </p>
                <textarea
                  value={textInputs.topic}
                  onChange={(e) => handleInputChange(e, 'topic')}
                  className="w-full p-2 border rounded-md mb-3 h-28 text-sm"
                  placeholder="Analiz edilecek metni buraya yazın veya örnek oluşturun..."
                />
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <button
                    onClick={() => generateText('topic')}
                    className="bg-[#FF7178] text-white font-medium py-2 px-4 rounded hover:bg-[#E56067] transition"
                    disabled={loading.topic}
                  >
                    {loading.topic ? '✨ Oluşturuluyor...' : '✨ Örnek Oluştur'}
                  </button>
                  <button
                    onClick={() => analyzeText('topic')}
                    className="bg-[#FF7178] text-white font-medium py-2 px-4 rounded hover:bg-[#E56067] transition"
                    disabled={loading.topic}
                  >
                    {loading.topic ? '✨ Analiz Ediliyor...' : '✨ Analiz Et'}
                  </button>
                </div>
                {loading.topic && (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF7178]"></div>
                  </div>
                )}
                <div className="mt-2 p-3 bg-[#F6FFEC] rounded-md border border-[#D4E7E3] text-sm min-h-[60px] leading-relaxed">
                  {results.topic}
                </div>
              </div>
            )}

            {/* Yazar Tanıma Paneli */}
            {activeTab === 'author' && (
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-[#010101] mb-3">👤 Yazar Tanıma</h2>
                <p className="mb-4 leading-relaxed">
                  Verilen bir metin örneğinin yazarını, o yazarın kendine özgü yazım stili özelliklerine (stilometri) dayanarak tespit etme problemidir.
                </p>
                <textarea
                  value={textInputs.author}
                  onChange={(e) => handleInputChange(e, 'author')}
                  className="w-full p-2 border rounded-md mb-3 h-28 text-sm"
                  placeholder="Analiz edilecek metni buraya yazın veya örnek oluşturun..."
                />
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <button
                    onClick={() => generateText('author')}
                    className="bg-[#FF7178] text-white font-medium py-2 px-4 rounded hover:bg-[#E56067] transition"
                    disabled={loading.author}
                  >
                    {loading.author ? '✨ Oluşturuluyor...' : '✨ Örnek Oluştur'}
                  </button>
                  <button
                    onClick={() => analyzeText('author')}
                    className="bg-[#FF7178] text-white font-medium py-2 px-4 rounded hover:bg-[#E56067] transition"
                    disabled={loading.author}
                  >
                    {loading.author ? '✨ Analiz Ediliyor...' : '✨ Analiz Et'}
                  </button>
                </div>
                {loading.author && (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF7178]"></div>
                  </div>
                )}
                <div className="mt-2 p-3 bg-[#F6FFEC] rounded-md border border-[#D4E7E3] text-sm min-h-[60px] leading-relaxed">
                  {results.author}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-[#010101] mb-3">🔒 Güvenli API Kullanımı Hakkında</h2>
          <p className="leading-relaxed mb-3">
            Bu uygulamada, API anahtarlarının güvenli şekilde saklanması için backend proxy mimarisi kullanılmıştır.
            Böylece API anahtarı asla frontend kodunda yer almaz ve istemci tarafından görülemez.
          </p>
          <div className="bg-[#F6FFEC] p-4 rounded-lg">
            <h3 className="font-medium mb-2">Güvenli API Kullanımı Nasıl Sağlanır?</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>API anahtarı yalnızca backend'de .env dosyasında saklanır</li>
              <li>İstemci doğrudan AI servisiyle değil, kendi backend'inizle iletişim kurar</li>
              <li>Backend, istemciden aldığı istekleri kendi API anahtarıyla AI servisine iletir</li>
              <li>Bu sayede API anahtarı client-side JavaScript kodunda asla görünmez</li>
              <li>Tarayıcı Network sekmesinde API anahtarı görünmez</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-[#D4E7E3] text-center p-4">
        <p className="text-sm text-gray-700">&copy; 2024 Metin Analizi Raporu. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

export default App;
