Metin Verisinden Duygu, Konu ve Yazar Tanıma Problemi için
Modelleme ve Değerlendirme
1. Giriş
Günümüzde dijital platformlarda üretilen metin verisinin hacmi ve çeşitliliği katlanarak
artmaktadır. Bu durum, metin içeriklerinden otomatik olarak anlamlı bilgiler çıkarabilen
akıllı sistemlere olan ihtiyacı da beraberinde getirmektedir. Doğal Dil İşleme (NLP)
alanının temel görevlerinden olan metinden duygu analizi, konu sınıflandırması ve
yazar tanıma, bu ihtiyaca cevap veren önemli problem alanlarıdır.
1 Bu rapor, söz konusu
örüntü tanıma problemleri için uygun modelleme tekniklerini, bu modellerin eğitim ve
değerlendirme süreçlerini ve performanslarını etkileyen faktörleri kapsamlı bir şekilde
ele almayı amaçlamaktadır.
1.1. Metinden Duygu, Konu ve Yazar Tanıma Problemlerine Genel Bakış
Bu üç temel NLP görevi, metin verilerini analiz ederek farklı türden bilgiler elde etmeyi
hedefler:
●
●
●
Duygu Analizi (Sentiment Analysis): Bir metin parçasında ifade edilen öznel
görüşü, tutumu veya duygusal tonu (örneğin; pozitif, negatif, nötr) otomatik olarak
belirleme sürecidir.
1 Özellikle sosyal medya gönderileri, ürün incelemeleri, müşteri
geri bildirimleri gibi alanlarda yaygın olarak kullanılır ve işletmelerin veya bireylerin
belirli bir konu, ürün veya hizmet hakkındaki genel kanıyı anlamalarına yardımcı
olur.
2 Duygu analizi, kelime düzeyinde, cümle düzeyinde veya doküman düzeyinde
uygulanabilir.
1
Konu Sınıflandırması (Topic Classification/Categorization): Metin belgelerini
önceden tanımlanmış bir dizi kategoriye (örneğin; spor, siyaset, teknoloji, sağlık
vb.) otomatik olarak atama işlemidir.
5 Bu görev, büyük hacimli metin
koleksiyonlarını organize etmek, bilgi erişimini kolaylaştırmak, içerik filtreleme
sistemleri oluşturmak ve haber akışlarını kişiselleştirmek gibi birçok uygulamada
kritik rol oynar.
6
Yazar Tanıma (Author Identification/Attribution): Verilen bir metin örneğinin
yazarını, o yazarın kendine özgü yazım stili özelliklerine (stilometri) dayanarak
tespit etme problemidir.
6 Stilometrik özellikler arasında kelime seçimi, cümle
uzunluğu, noktalama işaretleri kullanımı gibi dilsel örüntüler bulunur.
8 Yazar tanıma,
adli dilbilim (örneğin, anonim bir tehdit mektubunun yazarını bulma), edebi
metinlerin analizinde (örneğin, tartışmalı eserlerin yazarını belirleme) ve siber
güvenlik (örneğin, kötü amaçlı yazılımların veya sahte hesapların kaynağını tespit
etme) gibi alanlarda önemli uygulamalara sahiptir.
8
Bu üç problem, temelde metni anlamlandırmaya ve ondan yapılandırılmış bilgi
çıkarmaya yönelik olsa da, hedefleri ve kullandıkları özellik setleri açısından farklılaşır.
Duygu analizi daha çok metindeki leksikal (kelime bazlı) ve semantik (anlamsal)
ipuçlarına, özellikle duygusal yükü olan kelimelere ve ifadelere odaklanır. Konu
sınıflandırması ise metnin genel içeriğini yansıtan anahtar kelimeler, terim frekansları
ve tematik örüntülerle ilgilenir. Yazar tanıma ise metnin içeriğinden ziyade, yazarın
bilinçli veya bilinçsiz olarak kullandığı dilsel üslup özelliklerine, yani metnin "nasıl"
yazıldığına odaklanır.
1 Bu temel farklılıklar, her bir problem için en uygun modelleme
yaklaşımının ve özellik mühendisliği stratejilerinin de farklılaşmasına neden olur.
Örneğin, duygu analizinde "harika" veya "berbat" gibi kelimeler güçlü sinyaller
taşırken, yazar tanımada belirli bir bağlacın kullanım sıklığı veya cümlelerin ortalama
uzunluğu daha ayırt edici bir özellik olabilir. Dolayısıyla, her bir problem için tek bir
genel çözüm yerine, probleme özgü yaklaşımlar geliştirmek ve modelin dikkat etmesi
gereken metin özelliklerini doğru belirlemek, başarılı sonuçlar elde etmek için kritik
öneme sahiptir.
1.2. Örüntü Tanıma Yaklaşımı Olarak Metin Analizi
Metin analizi görevleri olan duygu analizi, konu sınıflandırması ve yazar tanıma, temel
olarak verilerdeki örüntüleri (kalıpları) tespit ederek sınıflandırma veya tahmin yapmayı
amaçlayan örüntü tanıma (pattern recognition) disiplininin birer uygulamasıdır.
1
Örüntü tanıma, girdilerden (bu durumda metin verisi) anlamlı özellikler çıkarmayı ve bu
özelliklere dayanarak belirli sonuçlara ulaşmayı hedefler.
9 Geleneksel bir örüntü tanıma
sistemi genellikle şu ana modülleri içerir: girdi, özellik çıkarma, özellik seçimi,
sınıflandırma ve sonucun belirlenmesi.
1
Metin verileri söz konusu olduğunda, bu adımlar metnin öncelikle sayısal bir forma
dönüştürülmesini (özellik çıkarma), ardından bu sayısal temsiller üzerinden ilgili
örüntülerin bir makine öğrenmesi modeli tarafından öğrenilmesini (sınıflandırma) içerir.
Örüntü tanımada iki temel sınıflandırma yöntemi bulunur: gözetimli (supervised) ve
gözetimsiz (unsupervised) öğrenme.
11 Gözetimli örüntü tanıma, etiketlenmiş (yani,
doğru sınıfları önceden bilinen) verilerle modeli eğitirken; gözetimsiz öğrenme,
etiketlenmemiş verilerdeki doğal gruplamaları veya yapıları bulmaya çalışır.
11 Bu
raporun odak noktası, duygu, konu ve yazar etiketlerine sahip metin verileriyle çalışan
gözetimli sınıflandırma yöntemleridir.
Metin verisinin kendine has özellikleri, örüntü tanıma açısından bazı zorlukları
beraberinde getirir. Bu özelliklerin başında yüksek boyutluluk (high dimensionality)
ve seyreklik (sparsity) gelir.
14 Bir dildeki kelime dağarcığı on binlerce hatta yüz
binlerce kelimeden oluşabilir ve her bir kelime potansiyel bir özellik olarak kabul
edilebilir. Bu durum, çok yüksek boyutlu bir özellik uzayı yaratır. Ancak, herhangi bir
metin belgesi genellikle bu kelime dağarcığının yalnızca küçük bir alt kümesini içerir, bu
da özellik vektörlerinin çoğunlukla sıfır değerlerinden oluştuğu seyrek bir yapıya yol
açar.
14 Bu "boyutluluk laneti" (curse of dimensionality) olarak da bilinen durum,
modellerin genelleme yapmasını zorlaştırabilir ve aşırı öğrenme riskini artırabilir. Bu
nedenle, metin verileriyle örüntü tanıma çalışmaları, etkili boyut indirgeme teknikleri,
anlamlı özellik seçimi stratejileri ve seyrek veriyi iyi işleyebilen makine öğrenmesi
modellerine ihtiyaç duyar.
Nihayetinde, duygu, konu veya yazar tanıma problemleri, metindeki "sinyali" (ilgili
örüntüyü) "gürültüden" (ilgisiz veya yanıltıcı bilgilerden) ayırma çabasıdır. Başarılı bir
model, her bir göreve özgü bu ayırt edici sinyalleri etkin bir şekilde yakalayabilmeli ve
genelleştirilebilir örüntüler öğrenebilmelidir.
2. Metin Analizi için Temel Modelleme Teknikleri
Metin verilerinden duygu, konu veya yazar tanıma problemlerinin çözümü için çeşitli
makine öğrenmesi modelleri kullanılmaktadır. Bu bölümde, hem klasik makine
öğrenmesi yaklaşımları hem de basit sinir ağı modelleri ele alınacak, her birinin temel
çalışma prensipleri, metin verilerine özgü uygulamaları, avantajları ve dezavantajları
tartışılacaktır.
2.1. Klasik Makine Öğrenmesi Modelleri
Bu başlık altında, metin sınıflandırma görevlerinde yaygın olarak kullanılan ve genellikle
iyi bir başlangıç noktası oluşturan geleneksel makine öğrenmesi algoritmaları
incelenecektir.
2.1.1. Naive Bayes (NB)
●
Temel İlkeler:
Naive Bayes sınıflandırıcısı, Bayes teoremine dayanan olasılıksal bir modeldir.15
Temel varsayımı, bir sınıfa ait bir belgedeki özelliklerin (metin için genellikle
kelimelerin veya n-gramların varlığı/frekansı) birbirinden bağımsız olduğudur.15 Bu
varsayım, özellikler arasında gerçekte var olabilecek korelasyonları göz ardı ettiği
için "naive" (saf) olarak adlandırılır. Bir d belgesinin belirli bir c sınıfına ait olma
olasılığı, Bayes teoremi kullanılarak aşağıdaki gibi ifade edilir:
P(c∣d)=P(d)P(d∣c)P(c)
Sınıflandırma yaparken, P(d) tüm sınıflar için sabit olduğundan genellikle ihmal
●
●
edilir ve en yüksek P(d∣c)P(c) değerini veren sınıf seçilir. P(c) sınıfın önsel
olasılığıdır (eğitim verisindeki sıklığı). P(d∣c) ise c sınıfı verildiğinde d belgesinin
(yani belgedeki kelimelerin) görülme olasılığıdır.
"Naive" bağımsızlık varsayımı
altında, P(d∣c) belgedeki her kelimenin c sınıfındaki koşullu olasılıklarının çarpımı
olarak hesaplanır.17 Metin sınıflandırmada yaygın olarak Multinomial Naive Bayes
(kelime frekansları için) ve Bernoulli Naive Bayes (kelime varlığı/yokluğu için) olmak
üzere iki ana varyantı kullanılır.16
Metin Uygulamaları (Duygu/Konu/Yazar Tanıma):
○
Avantajları: Naive Bayes, basitliği, hızı ve özellikle yüksek boyutlu seyrek
verilerde (metin verileri gibi) şaşırtıcı derecede iyi performans göstermesi
nedeniyle metin sınıflandırmada popüler bir seçenektir.
15 Az miktarda eğitim
verisiyle bile makul sonuçlar üretebilir 17 ve çok sınıflı problemlere (örneğin,
birden fazla konu veya yazar) kolayca uyarlanabilir.
15 Özellikle konu
sınıflandırma ve e-posta spam filtreleme gibi görevlerde temel bir model
olarak sıkça kullanılır.
15 Yazar tanımada, yazarların kelime kullanım
frekanslarındaki farklılıklara dayalı olarak "kelime torbası" (bag-of-words)
yaklaşımıyla etkili bir şekilde kullanılabilir.
18
○
Dezavantajları: En temel dezavantajı, özelliklerin (kelimelerin) birbirinden
bağımsız olduğu varsayımının gerçek dünya metin verilerinde genellikle geçerli
olmamasıdır.
15 Kelimeler arasındaki sıralama, bağlam ve anlamsal ilişkiler bu
model tarafından yakalanamaz, bu da özellikle duygu analizi gibi nüansların
önemli olduğu görevlerde performansını sınırlayabilir. Bir diğer önemli sorun
ise "sıfır frekans problemi"dir: Eğer bir kelime test verisinde mevcut olup
eğitim verisindeki belirli bir sınıfta hiç görülmemişse, o sınıf için koşullu olasılığı
sıfır olur ve bu durum tüm sınıf olasılığını sıfırlayabilir. Bu problemi aşmak için
Laplace düzeltmesi (Laplace smoothing) veya Lidstone düzeltmesi gibi
düzeltme (smoothing) teknikleri kullanılır.
15
Örnek Kullanım Alanları:
○
Duygu Analizi: Metinlerdeki kelimelerin frekanslarına (veya
varlığına/yokluğuna) bakarak metnin pozitif, negatif veya nötr bir duygu taşıyıp
taşımadığını sınıflandırır. Örneğin,
"mükemmel"
,
"sevdim" gibi kelimelerin
pozitif sınıfla,
"berbat"
,
"hayal kırıklığı" gibi kelimelerin ise negatif sınıfla daha
yüksek olasılığa sahip olduğunu öğrenir.
17
○
Konu Sınıflandırma: Belgeleri, içerdikleri kelimelerin belirli konularla olan
olasılıksal ilişkisine göre "spor"
,
"teknoloji"
,
"sağlık" gibi önceden tanımlanmış
kategorilere atar. Örneğin, bir belgede "transfer"
,
"şampiyonluk"
,
"antrenör"
kelimeleri sıkça geçiyorsa, bu belgenin "spor" kategorisine ait olma olasılığı
yüksek olacaktır.
16
○
Yazar Tanıma: Yazarların kelime dağarcığı ve kelime kullanım sıklıklarındaki
istatistiksel farklılıkları kullanarak bir metnin yazarını tahmin etmeye çalışır. Bir
yazarın belirli kelimeleri (örneğin, arkaik kelimeler, belirli argo ifadeler) diğer
yazarlara göre daha sık veya daha az kullanması, Naive Bayes için ayırt edici
bir özellik olabilir.
18
Naive Bayes'in "naive" varsayımı, metin gibi karmaşık ve bağlama duyarlı veriler için bir
kısıtlama gibi görünse de, pratikte şaşırtıcı derecede iyi çalışmasının altında yatan bir
neden vardır. Sınıflandırma kararı, mutlak olasılık değerlerinin doğruluğundan ziyade,
doğru sınıfın diğer sınıflara göre en yüksek olasılığa sahip olmasına dayanır. Yani,
bağımsızlık varsayımı tüm sınıflar için olasılık hesaplamalarını benzer şekilde "bozsa"
bile, eğer bu bozulma sınıfların göreceli sıralamasını değiştirmiyorsa (yani doğru sınıf
hala en yüksek olasılığa sahipse), sınıflandırma yine de doğru olabilir. Bu durum,
özellikle kelime dağarcığının büyük olduğu ve birçok kelimenin sınıflar arasında ayırt
edici bilgi taşıdığı metin sınıflandırma görevlerinde sıkça gözlemlenir. Sıfır frekans
problemi ve bu problemi çözmek için kullanılan düzeltme teknikleri, modelin daha önce
görmediği verilere genelleme yapabilmesi için hayati öneme sahiptir. Düzeltme
olmadan, eğitim setinde görülmeyen tek bir kelime bile tüm bir sınıfın olasılığını sıfıra
indirerek modelin performansını ciddi şekilde düşürebilir.
2.1.2. Destek Vektör Makineleri (SVM)
●
Temel İlkeler:
Destek Vektör Makineleri (SVM), denetimli öğrenme algoritmalarından biridir ve
hem sınıflandırma hem de regresyon problemleri için kullanılabilir, ancak özellikle
sınıflandırma görevlerinde yaygındır. SVM'nin temel amacı, farklı sınıflara ait veri
noktalarını en iyi şekilde ayıran bir hiperdüzlem (karar sınırı) bulmaktır.23 Bu
hiperdüzlem, farklı sınıflara ait en yakın veri noktaları (bunlara destek vektörleri
denir) arasındaki mesafeyi (marjini) maksimize edecek şekilde seçilir.25 Marjinin
maksimize edilmesi, modelin genelleme yeteneğini artırmaya yardımcı olur.
Veri noktaları doğrusal olarak ayrılamıyorsa, SVM çekirdek hilesi (kernel trick) adı
verilen bir teknik kullanır.23 Bu teknik, orijinal veri noktalarını daha yüksek boyutlu
bir özellik uzayına eşleyerek orada doğrusal bir ayrım yapılmasını mümkün kılar.
Yaygın olarak kullanılan çekirdek fonksiyonları arasında doğrusal (linear), polinom
(polynomial), radyal baz fonksiyonu (RBF) ve sigmoid bulunur.25
●
Metin Uygulamaları (Duygu/Konu/Yazar Tanıma):
○
Avantajları: SVM'ler, özellikle metin verilerinin sıklıkla sahip olduğu yüksek
boyutlu özellik uzaylarında oldukça etkilidir.
23 Özellik sayısının örnek sayısından
fazla olduğu durumlarda bile iyi performans gösterebilirler.
23 Aşırı öğrenmeye
(overfitting) karşı, özellikle yüksek boyutlu uzaylarda, nispeten dirençlidirler;
bu, regülarizasyon parametresi (genellikle C olarak adlandırılır) ile kontrol
edilir.
23 Çekirdek fonksiyonları sayesinde hem doğrusal hem de karmaşık
doğrusal olmayan örüntüleri yakalayabilirler. Bu özellikleriyle metin
sınıflandırmada genellikle güçlü bir temel (baseline) model olarak kabul
edilirler.
26
○
Dezavantajları: Büyük veri kümelerinde eğitim süresi oldukça uzun olabilir,
çünkü hesaplama karmaşıklığı genellikle örnek sayısının karesi (O(n2)) ile küpü
(O(n3)) arasında değişir.
23 Modelin performansı, C regülarizasyon parametresi,
çekirdek türü ve çekirdeğe özgü parametreler (örneğin, RBF çekirdeği için
gama) gibi hiperparametrelerin seçimine oldukça duyarlıdır. Optimal ayarları
bulmak için genellikle kapsamlı bir çapraz doğrulama veya grid search (ızgara
arama) süreci gerekir, bu da zaman alıcı ve hesaplama açısından maliyetli
olabilir.
23 Dengeli olmayan (imbalanced) veri kümelerinde performansı düşebilir
ve çoğunluk sınıfına doğru bir yanlılık gösterebilir.
23 Gürültülü verilerle (yanlış
etiketlenmiş örnekler veya alakasız özellikler içeren veriler) karşılaştığında
performansı önemli ölçüde azalabilir.
23 Yorumlanabilirliği, özellikle doğrusal
olmayan çekirdekler kullanıldığında düşüktür; hangi özelliklerin neden önemli
olduğunu ve modelin kararını nasıl verdiğini anlamak zorlaşır.
26
●
Örnek Kullanım Alanları:
○
Duygu Analizi: Metinleri pozitif, negatif veya nötr olarak sınıflandırmak için
kullanılır. Girdi olarak genellikle kelime frekanslarını (Bag-of-Words, TF-IDF)
veya kelime gömmelerini (word embeddings) temsil eden vektörler kullanılır.
24
○
Konu Sınıflandırma: Haber makaleleri, e-postalar veya diğer belgeleri spor,
siyaset, teknoloji gibi önceden tanımlanmış konulara ayırmada etkilidir. TF-IDF
ile oluşturulan özellik vektörleri ile birlikte sıkça tercih edilir.
25 Çok sınıflı
problemler için genellikle Bir-Diğerlerine Karşı (One-vs-Rest, OvR) veya
Bir-Birine Karşı (One-vs-One, OvO) stratejileriyle uygulanır.
25
○
Yazar Tanıma: Yazarların kullandığı stilometrik özellikleri (kelime frekansları,
cümle uzunlukları, noktalama işaretleri kullanımı vb.) temel alarak metinleri
belirli yazarlara atfetmek için kullanılır. Yüksek boyutlu stilometrik özellik
uzaylarında etkili bir şekilde çalışabilir.
8 Özellikle tam kelime formlarının
kullanıldığı durumlarda, yazar farklı konularda yazsa bile dikkate değer bir
sağlamlık gösterebilir.
28
SVM'lerin metin sınıflandırmadaki başarısı, büyük ölçüde metin verilerinin doğasında
bulunan seyreklik ve yüksek boyutlulukla başa çıkma yeteneğinden kaynaklanır. Marjini
maksimize etme prensibi, seyrek özellik uzayında bile iyi bir genelleme sınırı bulmasına
yardımcı olur, çünkü karar sınırı yalnızca destek vektörleri tarafından belirlenir ve bu da
alakasız özelliklerin (metinde bulunmayan veya düşük frekanslı kelimeler) etkisini
azaltır. Çekirdek hilesi, kelimeler arasındaki karmaşık anlamsal ilişkileri (doğrudan
kelime frekanslarıyla kolayca yakalanamayan) daha yüksek bir boyutta doğrusal olarak
ayrılabilir bir şekilde temsil ederek sınıflandırma performansını artırma potansiyeline
sahiptir. Örneğin, bir RBF çekirdeği, kelime kombinasyonlarının veya örtük anlamsal
benzerliklerin yakalanmasına yardımcı olabilir, bu da Bag-of-Words veya TF-IDF gibi
basit temsilllerin ötesine geçer. Ancak, bu artan karmaşıklık ve esneklik, modelin
yorumlanabilirliğini azaltır ve hesaplama maliyetini artırır. SVM'in performansı, metin ön
işleme adımlarının (tokenizasyon, durak kelimelerin çıkarılması, kök bulma vb.) ve
özellik çıkarma yöntemlerinin (TF-IDF, n-gramlar vb.) kalitesine oldukça bağlıdır. İyi
seçilmiş özellikler ve uygun bir çekirdek fonksiyonu, SVM'in gerçek potansiyelini ortaya
çıkarırken, yetersiz özellikler veya yanlış çekirdek seçimi model performansını önemli
ölçüde düşürebilir.
2.1.3. Lojistik Regresyon (LR)
●
Temel İlkeler:
Lojistik Regresyon, bir veya daha fazla bağımsız değişkene dayanarak kategorik
bir bağımlı değişkenin (genellikle ikili) sonucunun olasılığını tahmin etmek için
kullanılan istatistiksel bir modeldir.29 Bağımsız değişkenlerin doğrusal bir
kombinasyonunu alır ve bu kombinasyonu bir sigmoid (veya lojistik) fonksiyon
aracılığıyla 0 ile 1 arasında bir olasılık değerine dönüştürür.31 Bu olasılık değeri
daha sonra belirli bir eşik değere (genellikle 0.5) göre bir sınıf etiketine (örneğin, 0
veya 1) atanır.
Matematiksel olarak, p olasılığı için lojistik fonksiyon şu şekilde ifade edilir:
p=1+e−z1
Burada z, özelliklerin doğrusal birleşimidir: z=β0
+β1 x1
+β2 x2
+⋯+βn xn .
Lojistik Regresyon temel olarak ikili sınıflandırma için tasarlanmış olsa da,
Multinomial Lojistik Regresyon (doğrudan çok sınıflı olasılıkları modeller) veya
Bir-Diğerlerine Karşı (One-vs-Rest, OvR) ya da Bir-Birine Karşı (One-vs-One, OvO)
gibi stratejiler kullanılarak çok sınıflı problemlere de genişletilebilir.30
●
Metin Uygulamaları (Duygu/Konu/Yazar Tanıma):
○
Avantajları: Lojistik Regresyon'un uygulanması ve yorumlanması nispeten
kolaydır ve eğitimi genellikle verimlidir.
29 Modelin katsayıları (β değerleri), her
bir özelliğin (örneğin, bir kelimenin varlığı veya frekansı) sonucun log-oranları
üzerindeki etkisinin büyüklüğü ve yönü (pozitif veya negatif) hakkında
çıkarımlar sunar.
29 Bu, hangi özelliklerin modelin kararı için önemli olduğunu
anlamayı sağlar. Lojistik Regresyon, iyi kalibre edilmiş olasılık tahminleri üretme
eğilimindedir.
29 Doğrusal olarak ayrılabilir verilerde ve özellikle düşük boyutlu
veri kümelerinde iyi performans gösterebilir.
29 Metin sınıflandırmada, TF-IDF
gibi özellik temsilleriyle birlikte kullanıldığında güçlü bir temel (baseline) model
olabilir.
33
○
Dezavantajları: Temel varsayımı, bağımsız değişkenlerin sonucun
log-oranlarıyla doğrusal bir ilişkiye sahip olmasıdır.
29 Bu nedenle, karmaşık
doğrusal olmayan ilişkileri ve özellikler arasındaki etkileşimleri yakalamada
yetersiz kalabilir.
29 Yüksek boyutlu veri kümelerinde (örneğin, çok sayıda kelime
özelliği içeren metin verileri) aşırı öğrenmeye (overfitting) eğilimli olabilir; bu
durumu hafifletmek için regülarizasyon teknikleri (L1 - Lasso, L2 - Ridge)
kritik öneme sahiptir.
30 L1 regülarizasyonu aynı zamanda özellik seçimi yaparak
seyrek modeller üretebilir. Ayrıca, bağımsız değişkenler arasında yüksek çoklu
bağlantı (multicollinearity) varsa modelin katsayıları kararsız hale gelebilir ve
yorumlanması zorlaşabilir.
30
●
Örnek Kullanım Alanları:
○
Duygu Analizi: Kelime frekanslarını (özellikle TF-IDF ağırlıklı) veya n-gramları
özellik olarak kullanarak bir metnin pozitif mi, negatif mi (veya nötr mü)
olduğunu tahmin etmek için yaygın olarak kullanılır. Belirli kelimelerin (örneğin,
"harika"
,
"iğrenç"
,
"eh işte") katsayıları, duyguya olan pozitif veya negatif
etkilerini ve bu etkinin gücünü gösterebilir.
33
○
Konu Sınıflandırma: Belgeleri "spor"
,
"ekonomi"
,
"sağlık" gibi önceden
tanımlanmış konulara atamak için kullanılır. Multinomial Lojistik Regresyon, her
bir konuya ait olma olasılığını doğrudan modelleyebilir.
31
○
Yazar Tanıma: Stilometrik özellikleri (kelime frekansları, cümle yapıları,
noktalama işaretleri kullanımı vb.) girdi olarak kullanarak bir metnin yazarını
belirlemek için, özellikle Bayesian Multinomial Lojistik Regresyon gibi
yaklaşımlar kullanılabilir. Bu tür bir model, her bir yazar için metnin o yazara ait
olma olasılığını tahmin eder.
8
Lojistik Regresyon'un metin analizi için değerli bir özelliği, katsayıları aracılığıyla
sunduğu yorumlanabilirliktir. Bu, özellikle hangi kelimelerin veya metin özelliklerinin
belirli bir sınıflandırma kararına (örneğin, bir yorumun neden "olumsuz" olarak
etiketlendiğine) yol açtığını anlamak istendiğinde faydalıdır.
32 Ancak bu
yorumlanabilirlik, modelin temel varsayımları (özelliklerin log-oranlarla doğrusal ilişkisi
ve birbirlerinden bağımsız etkileri) çerçevesinde geçerlidir. Kelimeler arasındaki
karmaşık etkileşimler (örneğin,
"çok iyi değil" ifadesindeki "değil" kelimesinin "iyi"
kelimesinin anlamını değiştirmesi) veya derin anlamsal ilişkiler Lojistik Regresyon
tarafından doğrudan yakalanamaz. Bu tür durumlar için n-gram gibi özellik
mühendisliği teknikleri veya daha karmaşık model mimarileri gerekebilir. Yüksek
boyutlu metin verilerinde (çok sayıda benzersiz kelime olduğunda) Lojistik
Regresyon'un aşırı öğrenmesini engellemek ve daha genelleştirilebilir modeller
oluşturmak için L1 (Lasso) ve L2 (Ridge) regülarizasyon teknikleri kritik bir rol oynar.
30
L1 regülarizasyonu, bazı özelliklerin katsayılarını sıfıra indirerek dolaylı bir özellik seçimi
de yapar ve bu da modelin yorumlanabilirliğini daha da artırabilir.
2.1.4. Karar Ağaçları (DT)
●
Temel İlkeler:
Karar Ağaçları, denetimli öğrenme algoritmalarından biridir ve hem sınıflandırma
hem de regresyon görevleri için kullanılabilir. Temelde, veri kümesini özellik
●
değerlerine göre tekrar tekrar bölerek ağaç benzeri bir model yapısı
oluştururlar.39 Bu yapıda:
○
Her iç düğüm (internal node) bir özelliği (örneğin, metindeki bir kelimenin
varlığı veya frekansı) temsil eder.
○
Her dal (branch) bu özelliğe dayalı bir karar kuralını (örneğin,
"kelime X
metinde geçiyor mu?" Evet/Hayır) ifade eder.
○
Her yaprak düğüm (leaf node) bir sınıf etiketini (örneğin,
"pozitif duygu"
,
"spor konusu"
,
"Yazar A") veya bir olasılık dağılımını gösterir.
41 Ağaç, kök
düğümden başlar ve veriyi en iyi şekilde ayıran özelliği ve bölünme noktasını
seçerek aşağı doğru büyür.
"En iyi" ayrım genellikle Gini indeksi veya Entropi
(Bilgi Kazancı - Information Gain) gibi saflık (purity) metrikleri kullanılarak
belirlenir.
43 Amaç, her bir yaprak düğümün mümkün olduğunca tek bir sınıfa ait
örnekler içermesini sağlamaktır.
Metin Uygulamaları (Duygu/Konu/Yazar Tanıma):
○
Avantajları: Karar Ağaçları'nın en büyük avantajlarından biri, özellikle çok
derin olmadıklarında, sonuçlarının yorumlanmasının ve görselleştirilmesinin
kolay olmasıdır.
39 Oluşturulan kurallar ("eğer-ise" yapıları) insan tarafından
anlaşılabilir. Veri normalizasyonu veya ölçeklendirmesi gerektirmezler, çünkü
her özellik bağımsız olarak değerlendirilir.
39 Hem kategorik (örneğin, kelime
var/yok) hem de sayısal (örneğin, TF-IDF skorları) verilerle çalışabilirler.
39
Doğrusal olmayan ilişkileri yakalama potansiyelleri vardır.
39 Bazı uygulamaları
(örneğin, CART algoritması) eksik değerlerle başa çıkabilir.
39 Ayrıca, modeldeki
özelliklerin göreli önemini belirlemek için kullanılabilirler; daha üst seviyelerde
bölünen özellikler genellikle daha önemlidir.
42
○
Dezavantajları: Karar Ağaçları, özellikle kısıtlanmadıklarında (derinlik sınırı
veya minimum yaprak boyutu gibi), eğitim verisine aşırı öğrenmeye
(overfitting) çok eğilimlidirler.
39 Bu, modelin eğitim verisindeki gürültüyü ve
aykırı değerleri ezberlemesine ve yeni, görülmemiş verilerde kötü performans
göstermesine neden olabilir. Aşırı öğrenmeyi önlemek için budama (pruning)
teknikleri veya topluluk yöntemleri (Random Forest gibi) gereklidir. Veri
kümesindeki küçük değişikliklere karşı kararsız olabilirler; eğitim verisindeki
ufak bir değişiklik tamamen farklı bir ağaç yapısının oluşmasına yol açabilir.
39
Bu durum, modelin yorumlanabilirliğini ve güvenilirliğini etkileyebilir. Dengeli
olmayan sınıf dağılımlarına (imbalanced classes) sahip veri kümelerinde sorun
yaşayabilirler, çoğunluk sınıfına doğru yanlılık gösterebilirler.
39 Genellikle
açgözlü (greedy) bir yaklaşımla (her adımda yerel olarak en iyi bölünmeyi
seçerek) oluşturuldukları için global olarak en iyi ağacı bulma garantisi
yoktur.
39 Çok sayıda özelliğe veya örneğe sahip büyük veri kümelerinde
hesaplama açısından pahalı olabilirler.
39
●
Örnek Kullanım Alanları:
○
Duygu Analizi: Belirli kelimelerin ("harika"
,
"kötü"), ifadelerin veya metin
özelliklerinin (örneğin, ünlem işareti sayısı) varlığına veya yokluğuna dayalı
olarak duygu sınıflandırması yapabilir. Örneğin,
"eğer metinde 'beğenmedim'
kelimesi varsa VE 'ama' kelimesi yoksa, duygu negatiftir" gibi bir kural
üretebilir.
43
○
Konu Sınıflandırma: Metinlerdeki anahtar kelimelerin varlığına, TF-IDF
değerlerinin belirli eşiklerin üzerinde olup olmamasına veya diğer metin
özelliklerine göre konuları sınıflandırabilir.
40 Örneğin, bir belgede "borsa" ve
"hisse" kelimeleri geçiyorsa "finans" konusuna,
"galibiyet" ve "transfer"
kelimeleri geçiyorsa "spor" konusuna atanabilir.
○
Yazar Tanıma: Yazarların kullandığı belirli stilometrik özelliklere (örneğin,
ortalama cümle uzunluğu > X kelime, belirli bir bağlacın kullanım sıklığı < Y)
dayalı kurallar oluşturarak yazar atfı yapabilir.
46 Özellikle yazılım kaynak
kodlarının yazarlarını belirleme gibi alanlarda da kullanıldığı görülmüştür.
47
Karar Ağaçları'nın en büyük gücü olan yorumlanabilirlik, metin sınıflandırmada hangi
özelliklerin (kelimeler, n-gramlar, stilometrik ölçümler vb.) belirli bir sınıflandırma
kararına yol açtığını anlamak için çok değerlidir. Ancak, metin verisinin doğasında
bulunan yüksek boyutluluk (binlerce potansiyel kelime özelliği) ve kelimeler arasındaki
karmaşık ilişkiler nedeniyle, tek bir Karar Ağacı genellikle en iyi sınıflandırma
performansını vermez ve aşırı öğrenmeye oldukça yatkın olur. Bir ağaç, eğitim
verisindeki spesifik kelime kombinasyonlarını veya gürültüyü ezberleyerek çok
karmaşık hale gelebilir. Bu nedenle, pratikte metin sınıflandırması için tek bir Karar
Ağacı yerine, genellikle Random Forest (Rastgele Orman) veya Gradient Boosting
(Gradyan Artırma) gibi Karar Ağacı tabanlı topluluk yöntemleri (ensemble methods)
tercih edilir. Bu topluluk yöntemleri, birden fazla Karar Ağacı'nın tahminlerini
birleştirerek hem aşırı öğrenme riskini azaltır hem de genellikle daha yüksek ve daha
sağlam bir performans elde eder, ancak tek bir ağaca kıyasla yorumlanabilirlikleri bir
miktar azalır. Özellik seçimi, Karar Ağaçları için kritik öneme sahiptir. Alakasız veya
gürültülü özellikler, ağacın gereksiz yere karmaşıklaşmasına, yanlış bölünmelere ve
dolayısıyla düşük performansa yol açabilir. TF-IDF gibi özellik ağırlıklandırma
yöntemleri veya daha gelişmiş özellik seçimi teknikleri, Karar Ağaçları'nın ve onlara
dayalı topluluk modellerinin performansını artırmada önemli bir rol oynar.
2.1.5. k-En Yakın Komşu (k-NN)
●
Temel İlkeler:
k-En Yakın Komşu (k-NN), denetimli öğrenme algoritmalarından biridir ve hem
sınıflandırma hem de regresyon için kullanılabilir. Temelde örnek tabanlı
(instance-based) veya tembel öğrenme (lazy learning) algoritması olarak
sınıflandırılır, çünkü açık bir eğitim aşaması yoktur.48 Model, tüm eğitim veri setini
hafızasında tutar. Yeni bir örneği sınıflandırmak için, bu yeni örneğe özellik
●
●
uzayında en yakın olan 'k' adet eğitim örneğini bulur.49 Bu 'k' komşunun sınıf
etiketlerine bakılır ve yeni örnek, komşuları arasında en sık görülen (çoğunluk oyu)
sınıfa atanır.49
"Yakınlık" veya "benzerlik"
, bir uzaklık metriği ile ölçülür. Sayısal özellikler için
yaygın olarak Öklid uzaklığı veya Manhattan uzaklığı kullanılırken, metin verileri gibi
yüksek boyutlu ve seyrek veriler için genellikle Kosinüs benzerliği daha uygun bir
metriktir.49 Algoritmanın performansı,
'k' değeri (komşu sayısı) ve seçilen uzaklık
metriğine oldukça bağlıdır.
Metin Uygulamaları (Duygu/Konu/Yazar Tanıma):
○
Avantajları: k-NN'in uygulanması ve anlaşılması oldukça basittir.
49 Karmaşık
karar sınırları oluşturabilme yeteneği sayesinde esnektir. Açık bir eğitim
aşaması olmadığı için modelin "eğitilmesi" hızlıdır; tüm hesaplama tahmin
aşamasında gerçekleşir.
48 Çok sınıflı problemlere (örneğin, birden fazla konu
veya yazar) doğal bir şekilde uygulanabilir.
49
○
Dezavantajları: Sayısal olmayan özelliklerle doğrudan iyi çalışmaz; bu nedenle
metin verilerinin öncelikle uygun bir sayısal temsile (örneğin, TF-IDF vektörleri,
kelime gömmeleri) dönüştürülmesi gerekir.
49 Tahmin aşaması, özellikle büyük
eğitim veri kümelerinde yavaş olabilir, çünkü her yeni örnek için tüm eğitim
verilerine olan uzaklıkların hesaplanması gerekir.
49 Özelliklerin
ölçeklendirilmesine oldukça duyarlıdır; büyük sayısal değerlere sahip özellikler,
uzaklık hesaplamalarını domine edebilir, bu nedenle özellik normalizasyonu
veya standardizasyonu genellikle önemlidir.
48 En önemli dezavantajlarından
biri,
"boyutluluk laneti" (curse of dimensionality) olarak bilinen sorundan
muzdarip olmasıdır. Yüksek boyutlu uzaylarda (metin verilerinde kelime
dağarcığı nedeniyle özellik sayısı binleri bulabilir), uzaklık metrikleri anlamını
yitirmeye başlar ve tüm noktalar birbirinden neredeyse eşit derecede "uzak"
görünebilir, bu da en yakın komşuları bulmayı zorlaştırır ve modelin
performansını düşürür.
48 Optimal 'k' değerini ve uygun uzaklık metriğini
seçmek kritik öneme sahiptir ve genellikle probleme ve veri kümesine göre
deneysel olarak belirlenir.
48
Örnek Kullanım Alanları:
○
Duygu Analizi: Bir metin belgesini, özellik uzayında (örneğin, TF-IDF vektörleri
kullanılarak oluşturulmuş) ona en yakın olan 'k' adet metnin çoğunluk
duygusuna göre sınıflandırabilir. Örneğin,
"bu film gerçekten harikaydı" gibi bir
yorum, benzer pozitif kelimeler içeren diğer yorumlara yakınsa pozitif olarak
etiketlenebilir.
48
○
Konu Sınıflandırma: Bir belgeyi, kelime dağılımları veya diğer metin özellikleri
açısından ona en çok benzeyen 'k' adet komşu belgenin çoğunluk konusuna
göre sınıflandırır.
50
○
Yazar Tanıma: Bir metnin yazarını, stilometrik özellikler (kelime frekansları,
cümle yapıları, noktalama işaretleri kullanımı vb.) açısından ona en çok
benzeyen 'k' adet metnin yazarlarına göre tahmin edebilir.
51
k-NN'in metin sınıflandırmadaki etkinliği, büyük ölçüde kullanılan metin temsiline ve
seçilen uzaklık metriğine bağlıdır. Geleneksel olarak, metin belgeleri TF-IDF gibi kelime
frekanslarına dayalı yöntemlerle vektörleştirilir. Bu tür temsiller için, Öklid uzaklığı
yerine genellikle Kosinüs Benzerliği tercih edilir. Bunun temel nedeni, Kosinüs
benzerliğinin belge uzunluklarındaki farklılıklara karşı daha dirençli olması ve kelime
dağılımlarının yönünü (yani göreceli frekanslarını) dikkate almasıdır. Öklid uzaklığı ise
vektörlerin mutlak büyüklüklerinden (dolayısıyla toplam kelime sayılarından) daha fazla
etkilenebilir, bu da kısa ve uzun belgeler arasında yanıltıcı uzaklık ölçümlerine yol
açabilir.
"Boyutluluk laneti"
, k-NN'in metin verileri gibi yüksek boyutlu uzaylardaki en
büyük zorluğudur. Binlerce kelime özelliği olduğunda, çoğu örnek birbirinden
neredeyse eşit derecede "uzak" görünebilir, bu da en yakın komşuları bulma kavramını
anlamsızlaştırabilir. Bu nedenle, k-NN'in metin üzerinde etkili bir şekilde çalışabilmesi
için genellikle özellik seçimi (en ayırt edici kelimeleri seçmek) veya boyut indirgeme
(örneğin, Temel Bileşenler Analizi - PCA veya Latent Semantic Analysis - LSA gibi
tekniklerle özellik sayısını azaltmak) tekniklerinin uygulanması gereklidir. Bu adımlar,
modelin daha anlamlı örüntüler öğrenmesine ve daha iyi genelleme yapmasına
yardımcı olabilir.
2.2. Basit Sinir Ağı Yaklaşımları
Klasik makine öğrenmesi modellerinin yanı sıra, metin analizi görevleri için basit sinir
ağı mimarileri de kullanılabilir. Bu yaklaşımlar, özellikle kelime gömmeleri (word
embeddings) ile birleştirildiğinde, metindeki anlamsal ilişkileri yakalama potansiyeline
sahiptir.
2.2.1. Çok Katmanlı Algılayıcılar (MLP) ve Gömme (Embedding) Katmanları
●
Temel İlkeler:
Çok Katmanlı Algılayıcılar (MLP), en temel ileri beslemeli yapay sinir ağı türlerinden
biridir. Bir girdi katmanı, bir veya daha fazla gizli katman ve bir çıktı katmanından
oluşur.53 Her katmandaki nöronlar (veya düğümler), bir önceki katmandaki tüm
nöronlara ağırlıklı bağlantılarla bağlıdır (bu nedenle "tam bağlı katmanlar" veya
"dense layers" olarak da adlandırılırlar). Her nöron, girdilerinin ağırlıklı toplamını
alır, buna bir sapma (bias) terimi ekler ve sonucu bir aktivasyon fonksiyonundan
(örneğin, ReLU, sigmoid, tanh) geçirir.53 Bu aktivasyon fonksiyonları, ağın
doğrusal olmayan ilişkileri öğrenmesini sağlar.
Metin verileriyle çalışırken, kelimeler doğrudan bir MLP'ye girdi olarak verilemez.
Bunun yerine, kelimeler öncelikle sayısal vektörlere dönüştürülmelidir. Gömme
(Embedding) katmanları bu amaçla kullanılır.55 Bir gömme katmanı, her bir
kelimeyi (veya token'ı) yoğun (dense), genellikle düşük boyutlu bir vektör temsiline
●
●
eşler. Bu gömme vektörleri, kelimelerin anlamsal ilişkilerini ve bağlamsal
benzerliklerini yakalamayı hedefler; yani, benzer anlamlara sahip kelimeler gömme
uzayında birbirine yakın konumlanır. Bu gömme vektörleri daha sonra MLP'nin girdi
katmanına veya sonraki katmanlarına beslenir. Gömme katmanı, ya rastgele
başlatılıp görevle birlikte eğitilebilir ya da önceden eğitilmiş kelime gömmeleri
(örneğin, Word2Vec, GloVe, FastText) ile başlatılabilir.
Metin Uygulamaları (Duygu/Konu/Yazar Tanıma):
○
Avantajları: MLP'ler, yeterli karmaşıklıkta olduklarında doğrusal olmayan
karmaşık ilişkileri ve örüntüleri öğrenebilirler.
53 Özellikler arasındaki
etkileşimleri (örneğin, belirli kelime kombinasyonlarının özel bir anlam ifade
etmesi) yakalama potansiyeline sahiptirler. Kelime gömmeleri ile
birleştirildiklerinde, kelimelerin anlamsal benzerliklerini ve bağlamsal bilgilerini
kullanabilirler; bu, Bag-of-Words veya TF-IDF gibi geleneksel özellik
temsillerinin ötesine geçer.
56
○
Dezavantajları: Eğitimi, klasik makine öğrenmesi modellerine kıyasla
genellikle daha fazla veri ve daha yüksek hesaplama gücü gerektirebilir.
53
Özellikle derin veya geniş ağlarda aşırı öğrenmeye (overfitting) eğilimli
olabilirler; bu nedenle regülarizasyon teknikleri (örneğin, dropout, L1/L2
regülarizasyonu) ve erken durdurma (early stopping) gibi stratejiler önemlidir.
53
Model mimarisinin (katman sayısı, her katmandaki nöron sayısı, aktivasyon
fonksiyonları seçimi) ve hiperparametrelerin (öğrenme oranı, yığın boyutu vb.)
doğru bir şekilde ayarlanması karmaşık olabilir ve model performansı üzerinde
büyük ölçüde etkili olabilir.
53 Yorumlanabilirlikleri genellikle düşüktür ve "kara
kutu" (black-box) modeller olarak kabul edilirler; yani, modelin belirli bir kararı
neden verdiği anlamak zor olabilir.
53
Örnek Kullanım Alanları:
○
Duygu Analizi: Kelime gömmeleri ile eğitilmiş bir MLP, metindeki kelimelerin
ve potansiyel olarak bu kelimelerin birleşiminden oluşan anlamsal içeriği
kullanarak duygu tahmini yapabilir. Örneğin, gömme katmanı "harika" ve
"mükemmel" kelimelerini benzer vektörlere eşleyebilir ve MLP bu benzerlikten
faydalanarak pozitif duyguyu tanıyabilir.
54
○
Konu Sınıflandırma: Gömme katmanından sonra gelen MLP katmanları,
metnin genel konusunu temsil eden daha üst düzey özellikleri öğrenerek
sınıflandırma yapabilir. Girdi olarak tüm metnin gömme vektörlerinin ortalaması
veya birleştirilmiş bir temsili kullanılabilir.
57
○
Yazar Tanıma: Stilometrik özellikler (sayısal olarak kodlanmışsa) veya metnin
kendisine ait gömme temsilleri (örneğin, karakter veya kelime gömmeleri) bir
MLP'ye girdi olarak verilerek yazar sınıflandırması yapılabilir. MLP, farklı
yazarların üsluplarındaki ince örüntüleri bu temsiller üzerinden öğrenmeye
çalışır.
59
MLP'lerin metin sınıflandırmadaki gücü, özellikle kelime gömmeleri ile birleştirildiğinde
belirginleşir. Gömme katmanı, kelimeleri anlamsal olarak zengin, yoğun bir vektör
uzayına taşırken, MLP bu uzaydaki karmaşık örüntüleri öğrenme kapasitesine sahiptir.
Ancak, standart MLP'ler doğal olarak sıralı veriyi (metin gibi) işlemek için
tasarlanmamıştır. Genellikle, bir metindeki kelime gömme vektörlerinin ortalaması
alınarak, toplanarak veya birleştirilerek sabit boyutlu bir girdi vektörü oluşturulur ve bu
vektör MLP'ye beslenir. Bu tür birleştirme yöntemleri, kelime sırası bilgisinin ve
metindeki uzun mesafeli bağımlılıkların bir kısmının kaybolmasına neden olabilir.
Örneğin,
"Bu film çok iyi değildi" cümlesi ile "Bu film iyi değildi çok" cümlesi, kelime
gömmelerinin basit bir ortalaması alındığında benzer temsiller üretebilir, bu da kelime
sırasının duygu üzerindeki kritik etkisini göz ardı edebilir. Bu durum, özellikle
sıralamanın ve bağlamın çok önemli olduğu bazı karmaşık NLP görevlerinde (örneğin,
ince duygu nüanslarının anlaşılması veya uzun metinlerdeki argüman takibi) bir
sınırlama oluşturabilir. Önceden eğitilmiş kelime gömmelerinin (örneğin, Word2Vec,
GloVe, FastText) kullanılması, özellikle eğitim veri kümesinin küçük olduğu durumlarda
MLP'lerin performansını önemli ölçüde artırabilir. Bu önceden eğitilmiş gömmeler,
büyük metin külliyatlarından öğrenilmiş genel dil bilgisini ve anlamsal ilişkileri modele
aktararak daha iyi bir başlangıç noktası sunar ve modelin daha hızlı öğrenmesine ve
daha iyi genelleme yapmasına yardımcı olabilir.
2.2.2. Temel Evrişimli Sinir Ağları (CNN) ve Tekrarlayan Sinir Ağları (RNN)
Kavramları
Metin verilerinin sıralı ve bağlamsal doğasını daha iyi yakalamak için MLP'lerden daha
gelişmiş sinir ağı mimarileri olan Evrişimli Sinir Ağları (CNN) ve Tekrarlayan Sinir Ağları
(RNN) da kullanılabilir.
●
Evrişimli Sinir Ağları (CNN) Temel Kavramları:
CNN'ler genellikle görüntü işleme alanındaki başarılarıyla bilinir, ancak metin
sınıflandırması için de etkili bir şekilde uyarlanmışlardır.62 Metin verileri için
genellikle 1D evrişim katmanları kullanılır. Bu katmanlar, metin dizisi üzerinde kayan
farklı boyutlardaki filtreler (veya çekirdekler) aracılığıyla yerel örüntüleri (n-gram
benzeri özellikleri veya önemli kelime gruplarını) yakalar.64 Her filtre, metnin farklı
bir özelliğini (örneğin, belirli bir duygu ifadesi veya konuyla ilgili bir anahtar kelime
grubu) öğrenmeye çalışır. Filtrelerin çıktıları (özellik haritaları), genellikle bir
havuzlama (pooling) katmanından (örneğin, maksimum havuzlama - max pooling)
geçirilir. Havuzlama katmanı, her bir özellik haritasındaki en önemli bilgiyi (örneğin,
en güçlü sinyali veren özelliği) seçerek ve boyutunu azaltarak özelliklerin daha
sağlam bir temsilini oluşturur ve hesaplama karmaşıklığını düşürür. Son olarak, bu
havuzlanmış özellikler bir veya daha fazla tam bağlı katmana (MLP gibi) ve nihai
sınıflandırma için bir softmax (veya sigmoid) çıktı katmanına beslenir.63
○
Metin için Avantajları: CNN'ler, metindeki yerel ve önemli özellikleri (anahtar
●
●
kelime grupları, duygusal ifadeler gibi) konumlarından bağımsız olarak (yani,
bir ifadenin cümlenin başında veya sonunda olması fark etmeksizin)
yakalayabilirler. Filtreler hiyerarşik özellikler öğrenebilir; yani, alt seviye filtreler
basit kelime örüntülerini, üst seviye filtreler ise bu basit örüntülerin daha
karmaşık kombinasyonlarını öğrenebilir.
○
Metin için Dezavantajları: Metindeki uzun mesafeli bağlamsal bağımlılıkları
(örneğin, bir cümlenin başındaki bir kelimenin cümlenin sonundaki bir
kelimenin anlamını nasıl etkilediği) yakalamada RNN'ler kadar doğal veya etkili
olmayabilirler. Filtre boyutu, filtre sayısı gibi hiperparametrelerin doğru
ayarlanması performansı önemli ölçüde etkileyebilir.
Tekrarlayan Sinir Ağları (RNN) Temel Kavramları:
RNN'ler, doğaları gereği sıralı verileri (örneğin, zaman serileri, konuşma veya
metin) işlemek için tasarlanmıştır.55 Bir RNN, bir dizideki her bir elemanı (örneğin,
metindeki her bir kelimeyi) adım adım işler. Her bir zaman adımında, RNN bir girdi
alır (örneğin, mevcut kelimenin gömme vektörü), bir gizli durum (hidden state)
üretir ve bu gizli durumu bir sonraki zaman adımına aktarır. Bu gizli durum, ağın o
ana kadar işlediği dizideki önceki bilgilerden bir tür "hafıza" veya "bağlam"
taşımasını sağlar. Bu sayede RNN, kelime sırasını ve metindeki bağlamsal ilişkileri
modelleyebilir.
Basit RNN'ler, özellikle uzun dizilerde gradyan kaybolması (vanishing gradient)
veya gradyan patlaması (exploding gradient) gibi sorunlar yaşayabilir. Bu sorunları
aşmak ve uzun mesafeli bağımlılıkları daha etkili bir şekilde öğrenmek için Uzun
Kısa Vadeli Bellek (LSTM - Long Short-Term Memory) ve Kapılı Tekrarlayan Birim
(GRU - Gated Recurrent Unit) gibi daha gelişmiş RNN varyantları geliştirilmiştir.53
Bu mimariler, bilgiyi seçici olarak hatırlamak, unutmak ve güncellemek için özel
"kapı" mekanizmaları kullanır.
○
Metin için Avantajları: Kelime sırasını ve metindeki uzun mesafeli bağlamsal
bağımlılıkları doğal bir şekilde modelleyebilirler. Değişken uzunluktaki metin
girdileriyle başa çıkabilirler.
○
Metin için Dezavantajları: Basit RNN'ler uzun dizilerde gradyan
kaybolması/patlaması sorunlarına karşı hassastır (LSTM ve GRU bu sorunu
büyük ölçüde hafifletir). Eğitimi genellikle CNN'lere göre daha yavaştır, çünkü
her bir zaman adımındaki hesaplamalar bir sonrakine bağlı olduğu için işlemler
doğası gereği sıralı olarak yapılmalıdır ve paralelleştirilmesi daha zordur.
Örnek Kullanım Alanları (CNN/RNN):
○
Duygu Analizi: CNN'ler,
"çok iyi"
,
"hiç beğenmedim" gibi duyguyu güçlü bir
şekilde ifade eden önemli kelime gruplarını veya n-gramları yakalayabilir.
56
RNN'ler (özellikle LSTM/GRU), bir cümlenin başındaki bir olumsuzlama ekinin
("değil" gibi) cümlenin sonundaki bir kelimenin anlamını nasıl değiştirdiğini
(örneğin,
"Bu film iyi değildi") anlayarak daha karmaşık duygu ifadelerini
modelleyebilir.
55
○
Konu Sınıflandırma: CNN'ler, bir konuyu güçlü bir şekilde işaret eden anahtar
kelime öbeklerini veya ifadeleri metnin farklı yerlerinde tespit edebilir.
63
RNN'ler, bir belgenin başından sonuna kadar konunun nasıl geliştiğini ve farklı
argümanların nasıl birbirine bağlandığını takip ederek genel bir konu çıkarımı
yapabilir.
66
○
Yazar Tanıma: CNN'ler, bir yazara özgü kısa kelime veya karakter dizilerini
(n-gram benzeri yapılar) veya noktalama örüntülerini yakalayabilir.
68 RNN'ler
ise bir yazarın cümleleri nasıl kurduğuna, fikirleri nasıl sıraladığına veya
argümanlarını nasıl geliştirdiğine dair daha uzun ve sıralı stilistik örüntüleri
modelleyebilir.
70
CNN'ler ve RNN'ler, metin verisindeki farklı türden örüntüleri yakalamada birbirini
tamamlayıcı niteliktedir. CNN'ler daha çok metindeki yerel ve konumdan bağımsız
özelliklere odaklanırken (örneğin,
"çok heyecan verici" ifadesinin belgenin neresinde
geçtiğinden bağımsız olarak pozitif bir duygu sinyali olması), RNN'ler sıralı ve
bağlamsal bilgiye odaklanır. Bazı daha gelişmiş sinir ağı mimarileri, örneğin
CNN-LSTM hibrit modelleri, bu iki yaklaşımın güçlü yönlerini birleştirerek hem
metindeki önemli yerel özellikleri (CNN katmanları aracılığıyla) hem de bu özellikler
arasındaki uzun mesafeli sıralı bağımlılıkları (LSTM katmanları aracılığıyla) modellemeye
çalışır.
68 Hem CNN'lerin hem de RNN'lerin metin üzerinde etkili bir şekilde çalışabilmesi
için genellikle girdi olarak kelime gömmeleri (word embeddings) kullanılır. Bu
gömmeler, kelimelerin anlamsal özelliklerini ve ilişkilerini yakalayarak sinir ağlarının
daha anlamlı ve genelleştirilebilir örüntüler öğrenmesine yardımcı olur.
Aşağıdaki tablo, bu bölümde tartışılan klasik makine öğrenmesi modellerinin temel
özelliklerini, metin verisi için tipik özellik temsillerini, her bir problem türü (duygu, konu,
yazar) için genel avantaj ve dezavantajlarını, yorumlanabilirlik düzeylerini ve göreceli
hesaplama maliyetlerini özetlemektedir.
●
Tablo 2.1: Klasik Makine Öğrenmesi Modellerinin Karşılaştırması
Model Adı Temel
Çalışma
Prensibi
Metin
Verisi İçin
Tipik
Özellik
Temsili
Avantajla
rı
(Genel/Pr
obleme
Özgü)
Dezavant
ajları
(Genel/Pr
obleme
Özgü)
Yorumlan
abilirlik
Düzeyi
Hesaplam
a Maliyeti
Naive
Bayes
(NB)
Bayes
teoremi,
özelliklerin
koşullu
BoW,
TF-IDF,
n-gram
Hızlı, basit,
yüksek
boyutlu/se
yrek
Bağımsızlı
k
varsayımı
gerçekçi
Yüksek Düşük
Destek
Vektör
Makineler
i (SVM)
Lojistik
Regresyo
n (LR)
bağımsızlı
ğı
varsayımı.
Sınıflar
arası
marjini
maksimize
eden
hiperdüzle
m bulma,
çekirdek
hilesi.
Olasılık
modellem
e, sigmoid
fonksiyon
u ile
doğrusal
kombinasy
on.
BoW,
TF-IDF,
Embeddin
gs
BoW,
TF-IDF,
n-gram
veride iyi,
az veriyle
çalışır.
Konu
sınıflandır
ma ve
spam için
güçlü.
Yazar
tanımada
kelime
frekansları
na dayalı.
Yüksek
boyutlu
uzaylarda
etkili,
özellik >
örnek
durumund
a iyi, aşırı
öğrenmey
e dirençli.
Duygu,
konu,
yazar
tanımada
güçlü
temel
model.
Yorumlana
bilir
katsayılar,
iyi kalibre
olasılıklar.
Duygu
analizinde
kelime
etkileri
görülebilir.
Konu ve
yazar
tanımada
olasılıksal
değil (öz.
duygu).
Sıfır
frekans
problemi
(düzeltme
gerekir).
Kelime
sırası/bağl
amı yok.
Büyük
verilerde
yavaş,
parametre
seçimine
duyarlı,
dengesiz/
gürültülü
veride
zayıf.
Yorumlana
bilirliği
düşük (öz.
doğrusal
olmayan
çekirdek).
Doğrusal
ilişki
varsayımı,
karmaşık
örüntüleri
yakalayam
az. Yüksek
boyutta
aşırı
öğrenmey
e eğilimli
(regülariza
syon
Düşük (öz.
non-linear
)
Orta-Yüks
ek
Orta-Yüks
ek
Düşük-Ort
a
Karar
Ağaçları
(DT)
k-En
Yakın
Komşu
(k-NN)
Çok
Katmanlı
Algılayıcı
(MLP)
(Gömme
ile)
Veriyi
özelliklere
göre
tekrar
tekrar
bölerek
ağaç
yapısı
oluşturma.
Yeni
örneği,
eğitim
setindeki
en yakın
'k'
komşusun
un
çoğunluk
sınıfına
atama.
İleri
beslemeli
sinir ağı,
gizli
katmanlar,
aktivasyon
fonksiyonl
BoW,
TF-IDF,
Sayısal
Özellikler
TF-IDF
(Kosinüs
ile),
Embeddin
gs
Kelime/Kar
akter
Gömme
temel. Yorumlana
bilir,
görselleşti
rilebilir,
normaliza
syon
gerektirm
ez.
Duygu/kon
u/yazar
için kural
tabanlı
çıkarımlar.
Basit,
esnek,
eğitim
aşaması
yok.
Duygu/kon
u/yazar
için
benzer
metinlere
dayalı
sezgisel
sınıflandır
ma.
Doğrusal
olmayan
karmaşık
ilişkileri
öğrenebilir
, anlamsal
benzerlikle
gerekir).
Aşırı
öğrenmey
e çok
eğilimli
(budama
gerekir),
verideki
küçük
değişiklikl
ere
kararsız.
Tek başına
genellikle
en iyi
performan
sı vermez.
Büyük
verilerde
yavaş,
özellik
ölçekleme
ye duyarlı,
boyutluluk
laneti (öz.
metin).
'k'
ve uzaklık
metriği
seçimi
kritik.
Sayısal
olmayan
özelliklerle
doğrudan
çalışmaz.
Daha fazla
veri/hesap
lama gücü
gerektirir,
aşırı
öğrenmey
e eğilimli,
Yüksek
(sığ
ağaçlar)
Orta Düşük Orta
Yüksek
(tahminde
)
Orta-Yüks
ek
Basit
CNN
(Gömme
ile)
Basit
RNN
(Gömme
ile)
arı.
Kelimeler
gömme
vektörlerin
e
dönüştürül
ür.
1D evrişim
filtreleri ile
metindeki
yerel
örüntüleri
(n-gram
benzeri)
yakalama,
havuzlama
.
Sıralı veri
işleme,
gizli
durum ile
önceki
bilgileri
"hatırlama
"
.
Kelime/Kar
akter
Gömme
Kelime/Kar
akter
Gömme
ri yakalar.
Duygu,
konu,
yazar
tanımada
potansiyel
olarak
daha
yüksek
performan
s.
Yerel
özellikleri
konumdan
bağımsız
yakalar,
hiyerarşik
özellikler
öğrenebilir
. Duygu
için
anahtar
ifadeler,
konu için
tematik
kelime
grupları,
yazar için
kısa
stilistik
örüntüler.
Kelime
sırasını ve
bağlamsal
bağımlılıkl
arı
modelleye
bilir.
Duygu için
olumsuzla
ma, konu
için
hiperpara
metre
ayarı
karmaşık.
Yorumlana
bilirliği
düşük
("kara
kutu").
Sıralı
bilgiyi tam
yakalayam
ayabilir.
Uzun
mesafeli
bağımlılıkl
arı
yakalamad
a RNN
kadar iyi
değil.
Hiperpara
metre
(filtre
boyutu
vb.) ayarı
önemli.
Gradyan
kaybolmas
ı/patlamas
ı (basit
RNN'lerde
), eğitimi
yavaş
olabilir
(sıralı
işlem).
LSTM/GRU
Düşük Düşük Orta-Yüks
ek
Yüksek
argüman
akışı,
yazar için
cümle
yapısı
örüntüleri.
daha iyidir
ama daha
karmaşıktı
r.
Bu tablo, okuyucunun farklı klasik ve basit sinir ağı modellerinin metin sınıflandırma
görevlerine özgü güçlü ve zayıf yönlerini hızlıca karşılaştırmasına olanak tanır. Model
seçim sürecinde, veri kümesinin boyutu, özelliklerin doğası, yorumlanabilirlik ihtiyacı,
mevcut hesaplama kaynakları ve hedeflenen problem türü (duygu, konu veya yazar)
gibi faktörler göz önünde bulundurularak bu tablodan yararlanılabilir. Örneğin, hızlı,
yorumlanabilir ve seyrek verilerle iyi çalışan bir konu sınıflandırıcıya ihtiyaç duyuluyorsa
Naive Bayes iyi bir başlangıç noktası olabilirken, anlamsal nüansları yakalaması
gereken karmaşık bir duygu analizi görevi için kelime gömmeleri ile desteklenmiş bir
MLP veya RNN daha uygun olabilir.
3. Model Eğitim ve Test Süreçleri
Etkili metin sınıflandırma modelleri geliştirmek, sadece uygun bir algoritma seçmekle
kalmaz, aynı zamanda verinin dikkatli bir şekilde hazırlanmasını, modelin doğru bir
şekilde eğitilmesini ve performansının güvenilir yöntemlerle test edilmesini de
gerektirir. Bu bölümde, bu süreçlerin temel adımları detaylandırılacaktır.
3.1. Metin Verileri için Ön İşleme ve Özellik Çıkarma Temelleri
Ham metin verileri, makine öğrenmesi modelleri tarafından doğrudan işlenemez. Bu
nedenle, modelleme aşamasından önce bir dizi ön işleme ve özellik çıkarma adımından
geçirilmesi gerekir. Bu adımlar, metin verisini yapılandırılmış ve sayısal bir formata
dönüştürerek modellerin örüntüleri daha etkili bir şekilde öğrenmesini sağlar. Temel ön
işleme adımları şunları içerir 2:
●
Tokenizasyon (Tokenization): Metni kelimeler, cümleler veya alt kelime birimleri
gibi anlamlı birimlere (token'lara) ayırma işlemidir.
2
●
Küçük Harfe Dönüştürme (Lowercasing): Tüm metni küçük harfe çevirerek
"Kelime" ve "kelime" gibi aynı kelimenin farklı biçimlerinin tek bir formda temsil
edilmesini sağlar.
21
●
Noktalama İşaretlerinin Kaldırılması: Genellikle anlamsal değer katmayan virgül,
nokta gibi noktalama işaretleri metinden çıkarılır.
21 Ancak, bazı görevlerde
(örneğin, duygu analizinde ünlem işareti) bu işaretler bilgi taşıyabilir.
●
Durak Kelimelerin Kaldırılması (Stop Word Removal): "ve"
,
"ile"
,
"bir"
,
"bu" gibi
●
sık kullanılan ve genellikle ayırt edici bilgi taşımayan kelimeler (durak kelimeler)
metinden çıkarılır.
6 Bu, özellik uzayının boyutunu azaltmaya ve modelin daha
anlamlı kelimelere odaklanmasına yardımcı olabilir.
Kök Bulma (Stemming) / Temel Biçime İndirgeme (Lemmatization): Kelimeleri
köklerine veya temel sözcük biçimlerine indirgeyerek farklı çekimlenmiş hallerini
tek bir formda birleştirir.
6 Örneğin,
"koşuyor"
,
"koştu"
,
"koşan" kelimeleri "koş"
köküne indirgenebilir. Lemmatizasyon, kelimenin morfolojik analizini yaparak
sözlükteki temel biçimini (lemma) bulurken, stemming daha basit kural tabanlı
yaklaşımlarla sonekleri kaldırır. Lemmatizasyon genellikle daha doğru sonuçlar
verir ancak daha karmaşıktır.
Bu ön işleme adımlarının sırası ve hangilerinin uygulanacağı, çözülmek istenen
probleme ve kullanılan dilin özelliklerine göre değişiklik gösterebilir. Örneğin, konu
sınıflandırma gibi bir görevde durak kelimelerin kaldırılması genellikle faydalıyken,
yazarın üslubunun önemli olduğu yazar tanıma görevinde bu kelimeler stilistik bir
özellik taşıyabileceğinden korunabilir.
"Gürültü" olarak kabul edilen unsurlar ile "sinyal"
taşıyan unsurlar arasındaki ayrım, görevin doğasına bağlıdır.
Ön işlemenin ardından, metin verileri sayısal özellik vektörlerine dönüştürülür. Yaygın
özellik çıkarma yöntemleri şunlardır:
●
Bag-of-Words (BoW - Kelime Torbası): Metni, kelimelerin bir torbası olarak
temsil eder; kelime sırası ve gramer göz ardı edilir, yalnızca kelimelerin frekansları
(veya varlığı/yokluğu) dikkate alınır.
6 Her belge, kelime dağarcığındaki her kelime
için bir sayım içeren bir vektörle temsil edilir.
●
TF-IDF (Term Frequency-Inverse Document Frequency - Terim Frekansı-Ters
Belge Frekansı): Bir kelimenin bir belgedeki önemini, o kelimenin belgedeki
frekansı (TF) ve tüm belge koleksiyonundaki nadirliği (IDF) ile orantılı olarak
ağırlar.
6 Sık geçen ancak birçok belgede bulunan kelimelerin (örneğin,
"the"
,
"is")
ağırlığını azaltırken, belirli bir belgede sık geçen ancak genel koleksiyonda nadir
bulunan kelimelerin ağırlığını artırır.
●
N-gramlar: Metindeki ardışık N adet kelime veya karakter dizileridir (örneğin,
"çok
iyi" bir bi-gram,
"çok iyi bir" bir tri-gramdır).
76 Kelime sırasını ve yerel bağlamı bir
dereceye kadar yakalayabilirler.
Bu temel özellik çıkarma yöntemlerinin ardından,
"Model Performansını Etkileyen
Faktörler ve İyileştirme Önerileri" bölümünde daha detaylı ele alınacak olan kelime
gömmeleri (word embeddings) gibi daha gelişmiş temsil yöntemleri de bulunmaktadır.
3.2. Veri Kümesinin Bölünmesi: Eğitim, Doğrulama ve Test Kümeleri
Bir makine öğrenmesi modelinin performansını tarafsız bir şekilde değerlendirebilmek
ve modelin eğitim verisine aşırı öğrenmesini (overfitting) tespit edip önleyebilmek için
mevcut veri kümesinin dikkatli bir şekilde bölünmesi hayati öneme sahiptir.
79 Genellikle
veri kümesi üç ana alt kümeye ayrılır:
●
Eğitim Kümesi (Training Set): Modelin örüntüleri öğrenmesi ve parametrelerini
ayarlaması için kullanılan veri bölümüdür.
79 Bu, modelin "ders çalıştığı" kısımdır.
●
Doğrulama Kümesi (Validation Set): Model eğitimi sırasında, farklı model
mimarilerini veya hiperparametre ayarlarını karşılaştırmak ve en iyisini seçmek için
kullanılır.
79 Modelin eğitim kümesinde öğrendiklerini ne kadar iyi genelleştirdiğine
dair bir geri bildirim sağlar ve aşırı öğrenmenin erken tespiti için kritik bir rol oynar.
Örneğin, eğitim hatası azalmaya devam ederken doğrulama hatası artmaya
başlarsa, bu aşırı öğrenmenin bir işaretidir.
●
Test Kümesi (Test Set): Model tamamen eğitildikten ve en iyi hiperparametreler
doğrulama kümesi kullanılarak seçildikten sonra, modelin daha önce hiç görmediği
veriler üzerindeki nihai ve tarafsız performansını ölçmek için kullanılır.
79 Test
kümesi, model geliştirme ve ayarlama sürecinde hiçbir şekilde kullanılmamalıdır;
aksi takdirde performans tahminleri yanıltıcı derecede iyimser olabilir.
Scikit-learn gibi Python kütüphanelerinde, train
test
_
_
split fonksiyonu veri kümesini
eğitim ve test (veya eğitim ve doğrulama) kümelerine bölmek için yaygın olarak
kullanılır.
82 Bu fonksiyon kullanılırken random
_
state parametresinin belirli bir değere
sabitlenmesi, veri bölme işleminin her çalıştırıldığında aynı şekilde yapılmasını sağlar.
Bu, deneylerin tekrarlanabilirliği ve sonuçların karşılaştırılabilirliği açısından çok
önemlidir.
82 random
_
state belirtilmezse, her çalıştırmada farklı bir rastgele bölme
yapılacağından model performansları tutarsız görünebilir.
Metin sınıflandırma görevlerinde, özellikle yazar tanıma gibi bir belgenin bütünsel
stilinin önemli olduğu veya bir belgenin farklı bölümlerinin (paragraflar, cümleler) ayrı
örnekler olarak kullanıldığı durumlarda, belge bütünlüğünün korunması kritik bir
konudur. Aynı belgeye ait tüm parçaların (örneğin, aynı kitaptan alınan tüm
paragrafların) aynı veri kümesi bölümünde (eğitim, doğrulama veya test) kalması
sağlanmalıdır. Eğer aynı belgeden bazı parçalar eğitim kümesinde, bazıları ise test
kümesinde yer alırsa, model test verisi hakkında dolaylı yoldan bilgi sızdırmış olur (data
leakage) ve bu da modelin gerçek dünya performansını yansıtmayan, aşırı iyimser
sonuçlar vermesine neden olabilir. Scikit-learn kütüphanesindeki GroupKFold,
LeaveOneGroupOut veya GroupShuffleSplit gibi gruplu çapraz doğrulama yöntemleri,
her bir grubun (bu durumda her bir belgenin) tamamen bir katmanda kalmasını
sağlayarak bu tür veri sızıntılarını önlemeye yardımcı olabilir.
84
Veri kümesinin bölünme oranları genellikle veri kümesinin toplam büyüklüğüne ve
problemin doğasına göre değişir. Yaygın olarak kullanılan oranlar arasında %70 eğitim
- %30 test veya %80 eğitim - %20 test bulunur.
81 Eğer ayrı bir doğrulama kümesi
kullanılacaksa, %60 eğitim - %20 doğrulama - %20 test veya %70 eğitim - %15
doğrulama - %15 test gibi oranlar tercih edilebilir.
79
Veri bölme işlemi rastgele yapılsa da, özellikle küçük veri kümelerinde veya sınıf
dağılımının dengesiz olduğu durumlarda (örneğin, bazı duygu etiketlerinin, konuların
veya yazarların diğerlerinden çok daha az sayıda örneğe sahip olması), tabakalı
bölme (stratified splitting) yönteminin kullanılması önemlidir.
85 Tabakalı bölme, her
bir alt kümenin (eğitim, doğrulama, test) orijinal veri kümesindeki sınıf oranlarını
yaklaşık olarak korumasını sağlar. Bu, modelin tüm sınıflar hakkında yeterli ve temsili
bilgiyle eğitilmesini ve daha sonra bu sınıflar üzerindeki performansının daha güvenilir
bir şekilde değerlendirilmesini mümkün kılar. Eğer tabakalama yapılmazsa, rastgele
bölme sonucunda azınlık sınıflarına ait örneklerin eğitim kümesinde yetersiz kalması
veya test kümesinde hiç bulunmaması gibi durumlar ortaya çıkabilir, bu da modelin bu
sınıfları öğrenememesine veya bu sınıflardaki performansının doğru ölçülememesine
yol açar.
3.3. Çapraz Doğrulama (Cross-Validation) Teknikleri
Tek bir eğitim-doğrulama-test bölünmesi, özellikle veri kümesi küçükse, model
performansının tahmininde rastlantısallığa ve yanlılığa yol açabilir. Çapraz doğrulama
(CV), bu sorunu aşmak için kullanılan güçlü bir tekniktir. Modelin genelleme yeteneği
hakkında daha güvenilir bir tahmin sunar, veri kümesinin daha verimli kullanılmasını
sağlar ve modelin farklı veri alt kümelerine ne kadar duyarlı olduğu (robustness)
hakkında fikir verir.
87
3.3.1. K-Katmanlı Çapraz Doğrulama (K-Fold Cross-Validation)
En yaygın çapraz doğrulama tekniklerinden biri olan K-Katmanlı Çapraz Doğrulama'da,
eğitim veri kümesi rastgele olarak 'k' adet eşit (veya yaklaşık olarak eşit) büyüklükte alt
kümeye veya "katmana" (fold) bölünür.
87 Ardından, aşağıdaki süreç 'k' defa tekrarlanır:
1.
2.
3.
Katmanlardan biri test (veya doğrulama) katmanı olarak ayrılır.
Kalan k-1 katman, modeli eğitmek için kullanılır.
Model, ayrılan test katmanı üzerinde değerlendirilir ve bir performans skoru
(örneğin, doğruluk, F1-skoru) kaydedilir. Bu işlem, her bir katmanın tam olarak bir
kez test katmanı olarak kullanılmasıyla tamamlanır. Sonuç olarak,
'k' adet
performans skoru elde edilir ve bu skorların ortalaması (ve standart sapması)
modelin genel performansı hakkında daha istikrarlı bir tahmin sunar.
87 Tipik 'k'
değerleri 5 veya 10'dur.
87
3.3.2. Tabakalı K-Katmanlı Çapraz Doğrulama (Stratified K-Fold)
Tabakalı K-Katmanlı Çapraz Doğrulama, standart K-Katmanlı CV'nin bir varyasyonudur
ve özellikle sınıf dağılımının dengesiz olduğu veri kümeleri için tasarlanmıştır.
85 Metin
sınıflandırma problemlerinde, belirli duyguların (örneğin,
"şaşkınlık"), konuların
(örneğin,
"arkeoloji") veya yazarların (örneğin, az sayıda eseri olan bir yazar)
diğerlerine göre çok daha az sayıda örneğe sahip olması yaygın bir durumdur.
Standart K-Fold CV, katmanları rastgele oluşturduğu için, bazı katmanlarda azınlık
sınıflarından hiç örnek bulunmaması veya çok az sayıda örnek bulunması riskini taşır.
Bu durum, modelin bu sınıflar üzerindeki performansının doğru bir şekilde
değerlendirilmesini engeller.
Tabakalı K-Katmanlı CV, bu sorunu her bir katmanı oluştururken sınıfların orijinal veri
kümesindeki oranlarını koruyarak çözer.
87 Yani, eğer orijinal veri kümesinde %10
"negatif"
, %60 "nötr" ve %30 "pozitif" duygu etiketi varsa, Tabakalı K-Fold CV ile
oluşturulan her bir katman da yaklaşık olarak bu oranları yansıtacaktır. Bu, her
katmanın tüm sınıflardan temsili örnekler içermesini sağlar ve dolayısıyla modelin tüm
sınıflar üzerindeki performansının daha adil ve güvenilir bir şekilde tahmin edilmesine
olanak tanır. Dengesiz bir metin veri setinde, örneğin %90 pozitif ve %10 negatif duygu
içeren yorumlar varsa, standart K-Fold CV kullanıldığında bazı test katmanlarında hiç
negatif yorum olmayabilir. Bu durumda model, o katmanda negatif yorumları ne kadar
iyi sınıflandırdığına dair bir geri bildirim alamaz. Stratified K-Fold, her katmanda
yaklaşık %90 pozitif, %10 negatif oranını koruyarak bu sorunu çözer ve her sınıfın
değerlendirilmesini sağlar. Bu, modelin azınlık sınıflarındaki performansını daha doğru
bir şekilde ölçmek için kritik öneme sahiptir.
3.3.3. Zaman Serisi Çapraz Doğrulaması (TimeSeriesSplit)
Metin verileri bazen zamansal bir boyuta sahip olabilir. Örneğin, bir yazarın yazım
üslubu zamanla değişebilir, belirli konuların popülaritesi veya tartışılma biçimi zaman
içinde evrilebilir, ya da sosyal medyadaki duygu trendleri olaylara bağlı olarak
dalgalanabilir. Bu tür durumlarda, standart K-Fold veya Tabakalı K-Fold CV yöntemleri
uygun olmayabilir. Çünkü bu yöntemler veriyi rastgele karıştırarak katmanlar oluşturur
ve bu da gelecekteki verilerin eğitim setinde, geçmiş verilerin ise test setinde yer
almasına neden olabilir. Bu durum, veri sızıntısına (data leakage) yol açar ve modelin
gerçek dünya performansını yansıtmayan, aşırı iyimser tahminler üretmesine neden
olur. Model, pratikte karşılaşmayacağı bir senaryoda, yani "geleceği bilerek" eğitilmiş
olur.
TimeSeriesSplit (veya literatürdeki benzer ileriye dönük zincirleme - forward chaining -
stratejileri), bu sorunu çözmek için tasarlanmıştır.
94 Bu yöntemde, eğitim seti her
zaman test setinden önceki verileri içerir. Örneğin, k. çapraz doğrulama katmanında, ilk
k zaman dilimi eğitim için kullanılırken, (k+1). zaman dilimi test için kullanılır.
94 Bu,
modelin geçmiş verilere dayanarak gelecekteki (veya daha sonraki) verileri tahmin
etme yeteneğini daha gerçekçi bir şekilde simüle eder.
Yazar tanıma probleminde, bir yazarın kariyerinin farklı dönemlerinde (örneğin, gençlik
eserleri vs. olgunluk dönemi eserleri) yazım stili farklılıklar gösterebilir. Eğer rastgele
K-Fold CV kullanılırsa, model yazarın geç dönem metinleriyle eğitilip erken dönem
metinleriyle test edilebilir (veya tam tersi). Bu, modelin zamansal stil değişimlerini ne
kadar iyi yakaladığı veya bu değişimlere ne kadar dirençli olduğu konusunda yanıltıcı
bir değerlendirmeye yol açabilir. TimeSeriesSplit, bu tür zamansal bağımlılıkları dikkate
alarak, modelin yazarın stilindeki evrime veya bir konunun zaman içindeki değişimine
ne kadar iyi adapte olabildiğini daha doğru bir şekilde ölçer.
3.3.4. Veri Sızıntısını Önleme (Özellik Çıkarmanın CV Döngüsü İçinde Yapılması)
Çapraz doğrulama sürecinde model performansının doğru bir şekilde tahmin
edilebilmesi için en kritik hususlardan biri veri sızıntısının (data leakage)
önlenmesidir. Veri sızıntısı, test (veya doğrulama) verisinden gelen bilgilerin modelin
eğitim sürecine dahil olmasıyla meydana gelir ve bu da modelin performansının
gerçekte olduğundan daha iyi görünmesine neden olur.
Metin sınıflandırma bağlamında, veri sızıntısının yaygın bir kaynağı, özellik çıkarma
(örneğin, TF-IDF vektörleştiricinin kelime dağarcığını öğrenmesi ve IDF değerlerini
hesaplaması, kelime gömme katmanının eğitilmesi) ve diğer ön işleme adımlarının
(örneğin, sayısal özellikler için ölçeklendirme parametrelerinin öğrenilmesi) tüm veri
kümesi üzerinde, yani çapraz doğrulama döngüsünden önce yapılmasıdır.
96 Eğer bir
TF-IDF vektörleştirici tüm veri kümesi (hem eğitim hem de test katmanlarını içeren)
üzerinde eğitilirse (yani fit edilirse), test katmanlarındaki kelime dağılımları ve
frekansları hakkında bilgi edinmiş olur. Bu bilgi daha sonra eğitim katmanlarındaki
özelliklerin oluşturulmasında kullanıldığında, model dolaylı yoldan test verisi hakkında
"ön bilgiye" sahip olur.
Doğru yaklaşım, özellik çıkarma ve diğer tüm veri hazırlama adımlarını her bir çapraz
doğrulama döngüsü içinde, yalnızca o anki eğitim katmanı (training fold)
üzerinde uygulamaktır.
96 Yani, her katmanda:
1.
2. Veri, eğitim ve test (veya doğrulama) alt kümelerine ayrılır.
Özellik çıkarıcı (örneğin, TfidfVectorizer) sadece eğitim alt kümesi üzerinde
3.
4.
eğitilir (fit edilir). Bu, kelime dağarcığının ve IDF değerlerinin yalnızca eğitim
verisine dayalı olarak öğrenilmesini sağlar.
Eğitilmiş özellik çıkarıcı, hem eğitim alt kümesini hem de test alt kümesini
dönüştürmek (transform etmek) için kullanılır.
Model, dönüştürülmüş eğitim alt kümesi üzerinde eğitilir ve dönüştürülmüş test alt
kümesi üzerinde değerlendirilir.
Scikit-learn kütüphanesindeki Pipeline objeleri, bu süreci doğru ve kolay bir şekilde
yönetmek için son derece kullanışlıdır.
96 Bir Pipeline, bir vektörleştirici ve bir
sınıflandırıcı gibi adımları bir araya getirir. Çapraz doğrulama Pipeline üzerinde
çalıştırıldığında, Pipeline her katmanda vektörleştiricinin yalnızca eğitim verisi üzerinde
fit
transform edilmesini ve test verisi üzerinde sadece transform edilmesini otomatik
_
olarak sağlar, böylece veri sızıntısını önler.
Veri sızıntısının daha sinsi bir yolu ise, özellik seçimi veya hiperparametre
optimizasyonunun tüm veri kümesi üzerinde yapılıp, ardından bu "optimize edilmiş"
yapılandırmayla çapraz doğrulamanın çalıştırılmasıdır. Bu da test verisinden bilgi
sızmasına neden olur. İdeal olarak, özellik seçimi ve hiperparametre optimizasyonu da
çapraz doğrulama döngüsünün içine dahil edilmelidir (örneğin, iç içe çapraz
doğrulama - nested cross-validation kullanarak).
Aşağıdaki tablo, yaygın çapraz doğrulama tekniklerini, temel prensiplerini ve metin
sınıflandırma bağlamında ne zaman kullanılmaları gerektiğine dair bir özet
sunmaktadır.
●
Tablo 3.1: Çapraz Doğrulama Teknikleri
Teknik Adı Temel Prensibi Metin
Sınıflandırmad
a Ne Zaman
Kullanılmalı
Avantajları Dezavantajları/
Dikkat Edilmesi
Gerekenler
K-Katmanlı CV
(K-Fold CV)
Veri kümesini k
katmana böler,
her seferinde bir
katman test, k-1
katman eğitim
için kullanılır.
İşlem k defa
tekrarlanır.
Genel amaçlı,
sınıf dağılımı
dengeli
olduğunda veya
büyük veri
kümelerinde.
Verinin daha
verimli kullanımı,
tek bir bölmeye
göre daha
güvenilir
performans
tahmini.
Dengesiz
sınıflarda bazı
katmanlar azınlık
sınıfını temsil
etmeyebilir.
Zamansal veya
gruplu veriler
için uygun değil.
Tabakalı K-Fold CV gibi, Sınıf dağılımının Dengesiz Zamansal veya
K-Katmanlı CV
(Stratified
K-Fold CV)
ancak her
katmanda
sınıfların orijinal
veri kümesindeki
oranlarını korur.
dengesiz olduğu
metin verilerinde
(örn: nadir
konular, azınlık
duyguları, az
sayıda metni
olan yazarlar).
sınıflarda daha
güvenilir ve adil
performans
tahmini sağlar,
her sınıfın her
katmanda temsil
edilmesini
hedefler.
gruplu veriler
için uygun değil.
Çok küçük
azınlık
sınıflarında bile
her katmanda
yeterli örnek
olmayabilir.
Zaman Serisi
CV
(TimeSeriesSpl
it)
Eğitim verisinin
her zaman test
verisinden
önceki zaman
dilimlerini
içermesini
sağlar.
Katmanlar sıralı
olarak
oluşturulur.
Metin verilerinde
zamansal bir sıra
olduğunda (örn:
yazar üslubunun
zamanla
değişimi,
konuların evrimi,
duygu trendleri).
Zamansal veri
sızıntısını önler,
modelin zaman
içindeki
değişimlere
adaptasyonunu
daha gerçekçi
ölçer.
Verinin daha az
verimli kullanımı
(özellikle ilk
katmanlarda
eğitim verisi
azdır). Rastgele
karıştırma
yapılamaz.
Gruplu
K-Katmanlı CV
(GroupKFold)
Aynı gruba (örn:
aynı belgeye ait
farklı
cümleler/paragr
aflar) ait
örneklerin farklı
katmanlara
(eğitim/test)
dağılmasını
önler.
Bir belgenin alt
birimlerinin
(cümle,
paragraf) ayrı
örnekler olarak
kullanıldığı
durumlarda
belge
bütünlüğünü
korumak ve veri
sızıntısını
önlemek için.
Belge düzeyinde
genellemeyi
daha doğru
ölçer, aynı
kaynaktan gelen
örneklerin eğitim
ve test setlerine
karışmasını
engelleyerek
sızıntıyı azaltır.
Katman
boyutları
dengesiz olabilir.
Grupların
dengeli
dağıtılması her
zaman mümkün
olmayabilir.
Bu tablo, farklı çapraz doğrulama stratejilerinin ne zaman ve neden kullanılması
gerektiği konusunda bir rehber sunmaktadır. Özellikle metin verisinin kendine özgü
özelliklerine (sınıf dengesizliği, zamansal bağımlılıklar, hiyerarşik belge yapısı gibi) göre
doğru çapraz doğrulama tekniğinin seçilmesi, model değerlendirmesinin güvenilirliği
ve dolayısıyla model seçiminin doğruluğu için kritik bir adımdır. Yanlış bir çapraz
doğrulama tekniği seçimi, modelin gerçek dünya performansını yansıtmayan, yanıltıcı
performans metriklerine ve sonuç olarak yanlış model seçimine yol açabilir.
4. Temel Performans Değerlendirme Metrikleri
Bir metin sınıflandırma modelinin ne kadar iyi performans gösterdiğini anlamak için
çeşitli değerlendirme metrikleri kullanılır. Bu metrikler, modelin doğru ve yanlış
tahminlerini farklı açılardan analiz ederek güçlü ve zayıf yönleri hakkında bilgi verir. Bu
bölümde, temel metrikler ve karışıklık matrisi ile daha gelişmiş metrikler ve
görselleştirmeler ele alınacaktır.
4.1. Temel Metrikler ve Karışıklık Matrisi
Sınıflandırma modellerinin performansını değerlendirmede en temel araçlardan biri
karışıklık matrisidir. Bu matris, diğer birçok metriğin hesaplanması için temel oluşturur.
4.1.1. Karışıklık Matrisi (Confusion Matrix)
Karışıklık matrisi, bir sınıflandırma modelinin tahminlerinin gerçek sınıf etiketleriyle
karşılaştırıldığı bir tablodur.
99 İkili bir sınıflandırma problemi için (örneğin, duygu
pozitif/negatif), matris 2x2 boyutundadır. Çok sınıflı bir problem için (örneğin, N farklı
konu veya yazar), matris NxN boyutunda olacaktır.
99
İkili sınıflandırma için karışıklık matrisinin bileşenleri şunlardır:
●
Gerçek Pozitif (True Positive - TP): Modelin pozitif olarak doğru tahmin ettiği
örnek sayısı. Yani, gerçekte pozitif olan ve model tarafından da pozitif olarak
tahmin edilen durumlar.
100
●
Gerçek Negatif (True Negative - TN): Modelin negatif olarak doğru tahmin ettiği
örnek sayısı. Yani, gerçekte negatif olan ve model tarafından da negatif olarak
tahmin edilen durumlar.
100
●
Yanlış Pozitif (False Positive - FP): Modelin pozitif olarak yanlış tahmin ettiği
örnek sayısı. Gerçekte negatif olan ancak model tarafından pozitif olarak tahmin
edilen durumlar (Tip I Hata).
99
●
Yanlış Negatif (False Negative - FN): Modelin negatif olarak yanlış tahmin ettiği
örnek sayısı. Gerçekte pozitif olan ancak model tarafından negatif olarak tahmin
edilen durumlar (Tip II Hata).
99
Çok Sınıflı Yorumlama:
Çok sınıflı bir durumda, örneğin üç konu (Konu A, Konu B, Konu C) için karışıklık matrisi
aşağıdaki gibi olur 99:
Tahmin Edilen A Tahmin Edilen B Tahmin Edilen C
Gerçek Konu A TPA FNA (B) FNA (C)
Gerçek Konu B FPA (B) TPB FNB (C)
Gerçek Konu C FPA (C) FPB (C) TPC
Burada:
●
Köşegen elemanlar (TPA ,TPB ,TPC ), her sınıf için doğru sınıflandırma sayısını
●
gösterir.
Köşegen dışı elemanlar ise yanlış sınıflandırmaları gösterir. Örneğin, FNA (B)
(Gerçek Konu A, Tahmin Edilen Konu B hücresi), gerçekte Konu A olan ancak
model tarafından yanlışlıkla Konu B olarak tahmin edilen örnek sayısını ifade eder.
Bu, Konu A için bir Yanlış Negatif, Konu B için ise bir Yanlış Pozitif anlamına gelir.
Her bir sınıf için TP, TN, FP, FN değerleri ayrı ayrı hesaplanabilir. Örneğin,
"Konu A" için:
●
TPA : Gerçekte Konu A olan ve Konu A olarak tahmin edilenler.
●
FPA : Gerçekte Konu A olmayan (yani Konu B veya C olan) ancak Konu A olarak
tahmin edilenler.
●
FNA : Gerçekte Konu A olan ancak Konu B veya Konu C olarak tahmin edilenler.
●
TNA : Gerçekte Konu A olmayan ve Konu A olarak da tahmin edilmeyenler (yani,
gerçekte Konu B veya C olup, Konu B veya C olarak tahmin edilenler).
Karışıklık matrisi, modelin hangi sınıflarda iyi performans gösterdiğini, hangi sınıfları
birbiriyle karıştırdığını (örneğin, Konu A'yı sık sık Konu B ile karıştırıyor mu?) ve ne tür
hatalar yaptığını (Yanlış Pozitif mi, Yanlış Negatif mi daha baskın?) detaylı bir şekilde
gösterir.
103 Bu, sadece genel bir doğruluk skorundan çok daha fazla bilgi sunar ve
modelin zayıf yönlerini anlamak, hata analizi yapmak ve iyileştirme stratejileri
geliştirmek için kritik bir araçtır. Örneğin, bir duygu analiz modelinin "nötr" duyguları
sürekli "pozitif" ile karıştırdığını (nötr için FN, pozitif için FP) matristen görebiliriz. Bu
bilgi, sadece genel doğruluk skoruna bakarak elde edilemez ve probleme özgü
iyileştirmeler (örneğin, nötr ve pozitif duyguları daha iyi ayırt edecek özellikler eklemek
veya model mimarisini değiştirmek) yapılmasına olanak tanır.
4.1.2. Doğruluk (Accuracy)
●
Tanım: Modelin yaptığı tüm doğru tahminlerin (hem pozitif hem de negatif sınıflar
için) toplam örnek sayısına oranıdır.
99
●
Formül: Dog
˘
ruluk=TP+TN+FP+FNTP+TN
●
Yorum: Modelin genel olarak ne kadar başarılı olduğunu gösteren en basit ve en
yaygın metriklerden biridir. Ancak, dengesiz veri kümelerinde (imbalanced
datasets) yanıltıcı olabilir.
105 Örneğin, bir veri kümesinde örneklerin %95'i A
sınıfına, %5'i B sınıfına aitse, modeli tüm örnekleri A sınıfı olarak tahmin eden bir
●
model %95 doğruluk elde edebilir, ancak B sınıfını hiç tanıyamamış olur. Bu
nedenle, özellikle metin sınıflandırma gibi alanlarda sınıf dengesizlikleri yaygın
olabileceğinden, doğruluk metriği tek başına yeterli olmayabilir.
Ne Zaman Anlamlı: Sınıf dağılımlarının nispeten dengeli olduğu veya tüm
sınıflandırma hatalarının eşit maliyete sahip olduğu durumlarda genel bir
performans göstergesi olarak kullanılabilir.
4.1.3. Kesinlik (Precision)
●
●
●
●
Tanım: Model tarafından pozitif olarak tahmin edilen örnekler arasında gerçekten
pozitif olanların oranıdır.
99 Yani, model "bu pozitiftir" dediğinde ne kadar haklı
olduğunu gösterir.
Formül: Kesinlik=TP+FPTP
Yorum: Kesinlik, modelin yanlış pozitif (FP) yapma oranını kontrol altında tutmanın
önemli olduğu durumlarda kritik bir metriktir.
99 Yüksek kesinlik, modelin pozitif
olarak etiketlediği örneklerin büyük olasılıkla gerçekten pozitif olduğu anlamına
gelir.
Ne Zaman Anlamlı:
○
Duygu Analizi: Bir müşteri yorumunun "çok olumsuz" olarak etiketlenmesi
durumunda, bu etiketin doğruluğundan emin olmak isteniyorsa (yanlış bir
alarmın gereksiz müdahaleye yol açmaması için) kesinlik önemlidir.
110
○
Konu Sınıflandırma: Bir haber makalesinin "acil ve önemli" olarak
sınıflandırılması durumunda, bu sınıflandırmanın doğruluğu kritikse (yanlış bir
"acil" etiketinin kaynak israfına neden olmaması için) kesinlik öncelikli olabilir.
110
○
Yazar Tanıma: Bir metnin belirli bir yazara ait olduğu iddiasının (pozitif
tahmin) doğruluğundan yüksek derecede emin olunması gereken durumlarda
(örneğin, adli bir kanıt olarak kullanılacaksa veya intihal suçlaması yapılacaksa)
kesinlik çok önemlidir.
110
4.1.4. Duyarlılık (Recall / Sensitivity / True Positive Rate)
●
Tanım: Gerçekte pozitif olan tüm örnekler arasında model tarafından doğru bir
şekilde pozitif olarak tahmin edilenlerin oranıdır.
99 Yani, modelin mevcut tüm pozitif
örnekleri ne kadar iyi "yakalayabildiğini" gösterir.
●
Formül: Duyarlılık=TP+FNTP
●
Yorum: Duyarlılık, yanlış negatif (FN) yapma oranını minimize etmenin önemli
olduğu durumlarda kritik bir metriktir.
99 Yüksek duyarlılık, modelin gerçek pozitif
örneklerin çoğunu kaçırmadığı anlamına gelir.
●
Ne Zaman Anlamlı:
○
Duygu Analizi: Özellikle kritik olumsuz geri bildirimlerin (örneğin, ciddi müşteri
şikayetleri, güvenlik açığı raporları) hiçbirinin gözden kaçırılmaması
○
○
istendiğinde duyarlılık önemlidir. Bir şikayeti veya önemli bir olumsuz yorumu
kaçırmanın maliyeti yüksekse, duyarlılık öncelikli olmalıdır.
110
Konu Sınıflandırma: Belirli bir konuyla (örneğin,
"acil müdahale gerektiren
güvenlik tehditleri" veya "nadir görülen bir hastalıkla ilgili araştırmalar") ilgili
tüm belgelerin eksiksiz olarak bulunması kritikse duyarlılık önemlidir.
110
Yazar Tanıma: Belirli bir yazarın tüm eserlerinin eksiksiz olarak tespit edilmesi
veya bir soruşturmada şüpheli bir yazar tarafından yazılmış olabilecek tüm
metinlerin bulunması amaçlanıyorsa duyarlılık öncelikli olabilir.
110
4.1.5. F1-Skoru (F1-Score)
●
●
●
●
Tanım: Kesinlik (Precision) ve Duyarlılığın (Recall) harmonik ortalamasıdır.
99 Bu iki
metrik arasında bir denge kurar.
Formül: F1=2×Kesinlik+DuyarlılıkKesinlik×Duyarlılık
Yorum: F1-skoru, hem yanlış pozitiflerin hem de yanlış negatiflerin maliyetli olduğu
veya sınıf dağılımının dengesiz olduğu durumlarda özellikle kullanışlı bir metriktir.
102
Kesinlik ve duyarlılığın her ikisinin de yüksek olması durumunda F1-skoru da
yüksek olur. Eğer bu iki metrikten biri düşükse, F1-skoru da düşük olma
eğilimindedir, çünkü harmonik ortalama küçük değerlere daha duyarlıdır.
Ne Zaman Anlamlı: Çoğu metin sınıflandırma probleminde, özellikle duygu analizi
ve konu sınıflandırmada, sınıf dengesizlikleri (örneğin, nötr yorumların pozitif veya
negatif yorumlardan çok daha fazla olması veya bazı konuların diğerlerinden çok
daha nadir olması) yaygın bir durumdur. Bu gibi senaryolarda F1-skoru, genellikle
doğruluk metriğinden daha iyi ve daha dengeli bir performans göstergesidir. Yazar
tanıma görevinde de, hem bir yazarı yanlışlıkla atfetmenin (düşük kesinlik) hem de
o yazara ait bir metni kaçırmanın (düşük duyarlılık) istenmeyen sonuçları
olabileceğinden F1-skoru önemli olabilir.
4.2. Gelişmiş Metrikler ve Görselleştirmeler
Temel metriklerin yanı sıra, model performansını daha derinlemesine anlamak ve farklı
modelleri karşılaştırmak için kullanılan daha gelişmiş metrikler ve görselleştirme
araçları da mevcuttur.
4.2.1. ROC Eğrisi (Receiver Operating Characteristic Curve) ve AUC (Area Under
the Curve) Değeri
●
ROC Eğrisi: Bir sınıflandırma modelinin performansını farklı sınıflandırma eşik
değerlerinde görselleştiren bir grafiktir. Dikey eksende Gerçek Pozitif Oranı
(True Positive Rate - TPR), yani Duyarlılık (TPR=TP/(TP+FN)) yer alırken, yatay
eksende Yanlış Pozitif Oranı (False Positive Rate - FPR) (FPR=FP/(FP+TN)) yer
alır.
102 Her bir nokta, belirli bir eşik değerindeki TPR ve FPR çiftini temsil eder. İdeal
●
●
●
bir modelin ROC eğrisi grafiğin sol üst köşesine (TPR=1, FPR=0) yakınsar.
113
Rastgele tahmin yapan bir modelin ROC eğrisi ise (0,0) noktasından (1,1)
noktasına uzanan köşegen bir çizgi oluşturur.
113
AUC Değeri: ROC eğrisinin altında kalan alandır (Area Under the Curve).
113 AUC
değeri 0 ile 1 arasında değişir. AUC=1 mükemmel bir sınıflandırıcıyı, AUC=0.5 ise
rastgele bir sınıflandırıcıyı gösterir.
114 AUC, modelin rastgele seçilen bir pozitif
örneği, rastgele seçilen bir negatif örnekten daha yüksek bir olasılıkla sıralama
yeteneğini ölçer.
113 Bu nedenle, sınıflandırma eşik değerinden bağımsız bir
performans ölçüsüdür.
Yorumlanması ve Dengesiz Veri Kümelerindeki Faydası: AUC, özellikle sınıf
dağılımının dengesiz olduğu durumlarda doğruluk metriğine göre daha güvenilir
bir karşılaştırma sunar, çünkü TPR ve FPR oranlarını kullandığı için sınıf
büyüklüklerinden doğrudan etkilenmez.
113 Yüksek bir AUC değeri, modelin genel
olarak pozitif ve negatif sınıfları iyi ayırt edebildiğini gösterir.
Çok Sınıflı Uyarlamalar (OvR, OvO): Çok sınıflı metin sınıflandırma
problemlerinde ROC eğrisi ve AUC genellikle iki ana stratejiyle uyarlanır:
○
Bir-Diğerlerine Karşı (One-vs-Rest, OvR): Her bir sınıf için, o sınıf pozitif
kabul edilirken diğer tüm sınıflar negatif kabul edilerek ikili bir ROC eğrisi ve
AUC hesaplanır. Daha sonra bu sınıf bazlı AUC değerleri ortalanabilir (örneğin,
makro ortalama).
117 Bu yaklaşım, her bir sınıfın diğerlerinden ne kadar iyi ayırt
edildiğini gösterir ancak sınıf dengesizliklerinden etkilenebilir.
117
○
Bir-Birine Karşı (One-vs-One, OvO): Mümkün olan her sınıf çifti için ikili bir
ROC eğrisi ve AUC hesaplanır. Daha sonra bu çok sayıdaki ikili AUC değerinin
ortalaması alınır.
117 Bu yaklaşım, özellikle makro ortalama ile kullanıldığında sınıf
dengesizliğine karşı daha dirençlidir, çünkü her karşılaştırma yalnızca iki sınıf
arasında yapılır.
117 AUC, modelin genel "sıralama" yeteneğini ölçer; yani,
modelin pozitif örnekleri negatif örneklerden ne kadar iyi ayırdığını gösterir.
Ancak, bu ayrımı yapmak için en iyi "sınıflandırma eşik değerinin" ne olduğu
hakkında doğrudan bilgi vermez. En uygun eşik değerinin seçimi, yine kesinlik
ve duyarlılık arasındaki dengeye ve spesifik problemin gereksinimlerine
(örneğin, yanlış pozitiflerin mi yoksa yanlış negatiflerin mi daha maliyetli
olduğuna) bağlıdır. ROC eğrisi üzerindeki farklı noktalar, farklı eşik değerlerine
karşılık gelir ve bu kesinlik-duyarlılık (veya TPR-FPR) ödünleşimini görselleştirir.
Yüksek bir AUC değeri, modelin genel olarak iyi bir ayrım gücüne sahip
olduğunu gösterse de, pratikte kullanılacak optimal eşik değeri probleme özgü
olarak ayrıca belirlenmelidir.
4.2.2. Kesinlik-Duyarlılık Eğrileri (Precision-Recall Curves) ve PR AUC
●
Kesinlik-Duyarlılık Eğrisi: Farklı sınıflandırma eşik değerleri için kesinlik
●
●
(precision) değerini duyarlılık (recall) değerine karşı çizen bir grafiktir.
109 Özellikle
pozitif sınıfın çok azınlıkta olduğu (yani, veri kümesinin çok dengesiz olduğu)
durumlarda ROC eğrisinden daha bilgilendirici olabilir.
109 İdeal bir modelin
Kesinlik-Duyarlılık eğrisi grafiğin sağ üst köşesine (Kesinlik=1, Duyarlılık=1)
yakınsar.
PR AUC (Precision-Recall Area Under Curve) / Ortalama Kesinlik (Average
Precision - AP): Bu eğrinin altında kalan alanı ölçer ve modelin performansını tek
bir sayıda özetler.
109 Yüksek bir PR AUC değeri, modelin hem yüksek kesinliğe hem
de yüksek duyarlılığa sahip olduğunu gösterir.
Yorumlanması: ROC AUC, Gerçek Negatif (TN) sayısındaki büyük değişikliklerden
(çok sayıda negatif örnek olduğunda) önemli ölçüde etkilenebilir ve bu da pozitif
sınıfın az olduğu durumlarda yanıltıcı bir şekilde yüksek bir performans izlenimi
verebilir. Kesinlik-Duyarlılık eğrisi ise TN'yi doğrudan içermediği için, azınlık olan
pozitif sınıf üzerindeki performansa daha duyarlıdır ve bu tür senaryolarda
modelin gerçek yeteneklerini daha iyi yansıtabilir. Örneğin, duygu analizinde, çok
nadir görülen ancak tespit edilmesi çok önemli olan belirli bir şikayet türünü
(pozitif sınıf olarak kabul edilsin) yakalamak istiyorsak ve veri setinin %99'u bu
şikayeti içermiyorsa (negatif sınıf), model her şeyi "şikayet değil" olarak tahmin
etse bile TN sayısı çok yüksek olacağı için FPR düşük kalır ve ROC AUC yanıltıcı
derecede iyi görünebilir. Kesinlik-Duyarlılık eğrisi ise, bu nadir şikayetleri ne kadar
iyi yakaladığımıza (Duyarlılık) ve yakaladıklarımızın ne kadarının gerçekten o şikayet
olduğuna (Kesinlik) odaklanır, bu da bu durumda daha anlamlı bir performans
resmi sunar.
4.3. Çok Sınıflı Metrik Ortalamaları: Makro, Mikro ve Ağırlıklı Ortalamalar
Çok sınıflı metin sınıflandırma problemlerinde (örneğin, birden fazla konu veya yazar
arasında sınıflandırma), her bir sınıf için ayrı ayrı hesaplanan kesinlik, duyarlılık ve
F1-skoru gibi metriklerin genel bir model performansı ölçüsüne dönüştürülmesi
gerekir. Bu amaçla üç yaygın ortalama alma yöntemi kullanılır 120:
●
Makro Ortalama (Macro Average):
Bu yöntemde, her bir sınıf için istenen metrik (örneğin, F1-skoru) bağımsız olarak
hesaplanır. Daha sonra, bu sınıf bazlı metriklerin ağırlıksız aritmetik ortalaması
alınır.120 Makro ortalama, tüm sınıflara eşit önem verir. Bu nedenle, özellikle sınıf
dağılımının dengesiz olduğu durumlarda, azınlık sınıflarının performansını daha iyi
yansıtabilir. Eğer bir azınlık sınıfında model kötü performans gösteriyorsa, bu
durum makro ortalamayı düşürecektir.
○
Ne Zaman Kullanılmalı: Tüm sınıfların performansı eşit derecede önemliyse
ve azınlık sınıflarındaki düşük performansın genel skoru etkilemesini
●
●
istiyorsanız makro ortalama tercih edilir.
Mikro Ortalama (Micro Average):
Bu yöntemde, metrikler global olarak hesaplanır. Öncelikle tüm sınıflar için toplam
Gerçek Pozitif (TP), toplam Yanlış Pozitif (FP) ve toplam Yanlış Negatif (FN) sayıları
birleştirilir. Daha sonra, bu birleştirilmiş değerler kullanılarak kesinlik, duyarlılık ve
F1-skoru gibi metrikler tek bir kez hesaplanır.120 Mikro ortalama, her bir örneğe
(belgeye veya metin parçasına) eşit önem verir. Çok sınıflı ve tek etiketli (her
örneğin yalnızca bir sınıfa ait olduğu) sınıflandırma problemlerinde, mikro ortalama
kesinlik, mikro ortalama duyarlılık ve mikro ortalama F1-skoru birbirine ve genel
doğruluğa (accuracy) eşit olur.122
○
Ne Zaman Kullanılmalı: Genel doğruluğa yakın bir metrik isteniyorsa veya her
bir örneğin doğru sınıflandırılması eşit derecede önemliyse mikro ortalama
kullanılabilir. Sınıf dengesizliği durumunda, çoğunluk sınıflarının performansı
mikro ortalamayı domine edecektir.
Ağırlıklı Ortalama (Weighted Average):
Bu yöntem de makro ortalama gibi her sınıf için metrikleri ayrı ayrı hesaplar.
Ancak, bu sınıf bazlı metriklerin ortalamasını alırken, her bir sınıfın metrik değerini
o sınıftaki gerçek örnek sayısıyla (destek - support) ağırlıklandırır.121 Bu sayede,
sınıf dengesizliğini hesaba katarak daha büyük (daha fazla örneğe sahip) sınıfların
genel ortalamaya daha fazla katkıda bulunmasını sağlar.
○
Ne Zaman Kullanılmalı: Sınıf dengesizliğini hesaba katmak ve her sınıfın
katkısını kendi büyüklüğüne göre ayarlamak istiyorsanız ağırlıklı ortalama
uygun bir seçenektir. Makro ortalamanın tüm sınıflara eşit ağırlık vermesinin
istenmediği, ancak mikro ortalamanın da çoğunluk sınıfını fazla vurguladığı
düşünülen durumlarda bir denge sunar.
Metin sınıflandırmada konu dağılımları veya yazar katkıları gibi durumlar genellikle
dengesizdir. Örneğin, bir haber sitesindeki makalelerin çoğu "güncel olaylar" veya
"ekonomi" gibi popüler konulara aitken,
"sanat tarihi" gibi daha niş konulara ait makale
sayısı çok daha az olabilir. Benzer şekilde, bir yazar koleksiyonunda bazı yazarların
yüzlerce eseri varken, bazılarının sadece birkaç eseri bulunabilir. Bu gibi durumlarda,
metriklerin nasıl ortalandığı, modelin genel performansı hakkındaki yorumu önemli
ölçüde etkileyebilir. Eğer nadir ama önemli bir konunun veya az eseri olan bir yazarın
doğru sınıflandırılması kritikse, makro ortalama F1-skoru daha anlamlı bir gösterge
olabilir. Eğer genel olarak ne kadar metnin doğru sınıflandırıldığı önemliyse ve
çoğunluk sınıflarındaki performans daha ağırlıklı olarak değerlendirilmek isteniyorsa,
mikro ortalama (veya doğruluk) ya da ağırlıklı ortalama F1-skoru daha uygun olabilir.
Aşağıdaki tablo, bu bölümde ele alınan temel değerlendirme metriklerini
özetlemektedir.
●
Tablo 4.1: Temel Değerlendirme Metrikleri Özeti
Metrik Adı Formül Ne Ölçer? Doğruluk
(Accuracy)
TP+TN+FP+FNTP+TN Modelin genel olarak
ne kadar doğru
tahmin yaptığını.
Kesinlik (Precision) TP+FPTP Pozitif olarak tahmin
edilenlerin ne
kadarının gerçekten
pozitif olduğunu.
Duyarlılık
(Recall/Sensitivity)
TP+FNTP Gerçek pozitiflerin ne
kadarının model
tarafından
yakalanabildiğini.
F1-Skoru (F1-Score) 2×Kesinlik+DuyarlılıkK
esinlik×Duyarlılık
Kesinlik ve duyarlılık
arasında bir denge
sağlar.
Yanlış Pozitif Oranı
(FPR)
FP+TNFP Gerçek negatiflerin
ne kadarının
yanlışlıkla pozitif
olarak tahmin
edildiğini (yanlış
alarm oranı).
AUC (Area Under
ROC Curve)
ROC eğrisinin
altındaki alan
Modelin sınıfları ayırt
etme yeteneğini, eşik
değerinden bağımsız
olarak ölçer.
Ne Zaman
Öncelikli?
Sınıf dağılımları
dengeli olduğunda ve
tüm hatalar eşit
maliyetli olduğunda.
Yanlış pozitiflerin (FP)
maliyeti yüksek
olduğunda (örn:
spam olmayan
e-postayı spam
işaretlemek).
Yanlış negatiflerin
(FN) maliyeti yüksek
olduğunda (örn:
önemli bir hastalığı
teşhis edememek).
Sınıf dağılımı
dengesiz olduğunda
veya hem FP hem de
FN hatalarının
maliyetli olduğu
durumlarda.
ROC eğrisi çiziminde
ve yanlış alarmların
maliyetinin önemli
olduğu durumlarda.
Modelleri genel ayrım
güçlerine göre
karşılaştırırken,
özellikle sınıf
dengesizliği varsa.
PR AUC (Area Under
Precision-Recall
Curve)
Kesinlik-Duyarlılık
eğrisinin altındaki
alan
Özellikle pozitif sınıfın
çok nadir olduğu
durumlarda modelin
performansını ölçer.
Pozitif sınıfın azınlıkta
olduğu ve hem
kesinlik hem de
duyarlılığın önemli
olduğu çok dengesiz
veri kümelerinde.
Bu metrikler, bir metin sınıflandırma modelinin performansını kapsamlı bir şekilde
değerlendirmek için bir araç kutusu sunar. Hangi metriklerin seçileceği ve nasıl
yorumlanacağı, büyük ölçüde ele alınan spesifik probleme (duygu analizi, konu
sınıflandırması veya yazar tanıma), veri kümesinin özelliklerine (özellikle sınıf
dengesizliği) ve sınıflandırma hatalarının potansiyel sonuçlarına bağlıdır. Genellikle tek
bir metrik yerine birkaç metriği birlikte değerlendirmek, modelin güçlü ve zayıf yönleri
hakkında daha bütüncül bir anlayış sağlar.
5. Sonuçların Karşılaştırılması, Yorumlanması ve Görselleştirilmesi
Metin sınıflandırma modelleri geliştirildikten ve temel performans metrikleri
hesaplandıktan sonraki önemli adımlar, elde edilen sonuçların doğru bir şekilde
karşılaştırılması, anlamlı bir şekilde yorumlanması ve etkili bir biçimde
görselleştirilmesidir. Bu süreç, en iyi modeli seçmeye, modelin davranışını anlamaya ve
potansiyel iyileştirme alanlarını belirlemeye yardımcı olur.
5.1. Farklı Modellerin ve Hiperparametrelerin Karşılaştırmalı Sunumu
Genellikle bir metin sınıflandırma problemi için birden fazla model denenir (örneğin,
Naive Bayes, SVM, Lojistik Regresyon) veya aynı modelin farklı hiperparametre
ayarlarıyla (örneğin, SVM için farklı C değerleri veya çekirdek türleri) performansı
incelenir.
126 Bu farklı yaklaşımların performansını adil bir şekilde karşılaştırabilmek için,
tüm modellerin aynı eğitim ve test veri kümeleri üzerinde veya aynı çapraz doğrulama
katmanları (folds) üzerinde değerlendirilmesi kritik öneme sahiptir.
Sonuçlar genellikle bir tablo formatında sunulur. Bu tabloda satırlar farklı modelleri
veya hiperparametre kombinasyonlarını, sütunlar ise hesaplanan performans
metriklerini (örneğin, Doğruluk, Kesinlik, Duyarlılık, F1-Skoru, AUC) gösterir.
127 Her bir
metrik için en iyi performansı gösteren model veya ayar genellikle vurgulanır (örneğin,
kalın yazı tipiyle).
Örnek bir karşılaştırma tablosu (kurgusal değerler):
Model Adı /
Hiperparam
etre
Doğruluk Kesinlik
(Makro)
Duyarlılık
(Makro)
F1-Skoru
(Makro)
AUC (Makro
OvR)
Naive Bayes
(alpha=1.0)
0.75 0.72 0.71 0.71 0.78
SVM
(kernel=linea
r, C=1)
0.82 0.80 0.79 0.79 0.85
SVM
(kernel=rbf,
C=10)
0.85 0.83 0.82 0.82 0.88
Lojistik Regr.
(C=0.5)
0.80 0.78 0.77 0.77 0.83
Basit MLP (1
gizli katman)
0.86 0.84 0.83 0.82 0.88
Bu tür bir tablo, farklı yaklaşımların göreceli performansını bir bakışta değerlendirmeyi
kolaylaştırır. Ancak, sadece en yüksek skoru veren modele odaklanmak yerine,
metrikler arasındaki ödünleşimleri (trade-offs) ve problemin gereksinimlerini de
dikkate almak önemlidir. Örneğin, bir modelin F1-skoru en yüksek olabilirken, başka bir
model belirli bir sınıf için daha yüksek duyarlılık sunabilir ki bu bazı uygulamalar için
daha kritik olabilir. Tutarlı bir değerlendirme altyapısı kurmak, farklı deneylerden elde
edilen sonuçların güvenilir bir şekilde karşılaştırılabilmesi için elzemdir.
5.2. İstatistiksel Anlamlılık Testleri
Farklı modellerin veya hiperparametrelerin performans metrikleri arasında
gözlemlenen farkların istatistiksel olarak anlamlı olup olmadığını belirlemek önemlidir.
131
Küçük bir fark, sadece veri kümesindeki rastgelelikten veya test setinin şans eseri
belirli bir modele daha uygun olmasından kaynaklanıyor olabilir. İstatistiksel anlamlılık
testleri, gözlemlenen farkların gerçek bir performans farkını mı yansıttığını yoksa
tesadüfi mi olduğunu değerlendirmeye yardımcı olur.
●
McNemar Testi: Özellikle iki sınıflandırıcının aynı test seti üzerinde yaptığı
tahminlerin karşılaştırılması için kullanılır [134
Yontemleri
Alıntılanan çalışmalar
1. 2. 3. 4. (PDF) Derin Öğrenme Yöntemleri İle Konuşmadan Duygu Tanıma ..., erişim tarihi
Mayıs 24, 2025,
https://www.researchgate.net/publication/366583912
Derin
_
_
Ogrenme
_
Ile
Konusmadan
_
_
_
Duygu
Tanima
Uzerine
Bir
Literatur
ArastirmasiA
Literature
_
_
_
_
_
_
_
Review
On
_
_
Speech
Emotion
_
_
Recognition
_
Using_
Deep_
Learning_
Techniques
NLP (Natural Language Processing) Doğal Dil İşleme Nedir ..., erişim tarihi Mayıs
24, 2025, https://bulutistan.com/blog/nlp-natural-language-processing/
Sentiment Analysis | Papers With Code, erişim tarihi Mayıs 24, 2025,
https://paperswithcode.com/task/sentiment-analysis
Doğal Dil İşleme (NLP): Nasıl Çalışır, Faydaları ve Gerçek ...
- Shaip, erişim tarihi
Mayıs 24, 2025,
https://tr.shaip.com/blog/what-is-nlp-how-it-works-benefits-challenges-example
s/
5. dergipark.org.tr, erişim tarihi Mayıs 24, 2025,
https://dergipark.org.tr/en/download/article-file/1887359
6. dergipark.org.tr, erişim tarihi Mayıs 24, 2025,
https://dergipark.org.tr/tr/download/article-file/207208
7. Writer identification in medieval and modern handwriting - White Rose eTheses
Online, erişim tarihi Mayıs 24, 2025,
https://etheses.whiterose.ac.uk/id/eprint/2398/1/t.pdf
8. (PDF) Author identification using writer-dependent and writer ..., erişim tarihi
Mayıs 24, 2025,
https://www.researchgate.net/publication/220999556
Author
identification
_
_
_
g_
writer-dependent
and
_
_
writer-independent
_
strategies
9. Konuşmadan Duygu Tanıma Üzerine Detaylı bir İnceleme: Özellikler ve
Sınıflandırma Metotları - DergiPark, erişim tarihi Mayıs 24, 2025,
https://dergipark.org.tr/en/download/article-file/2143516
10. Pattern recognition in ML: A comprehensive overview - LeewayHertz, erişim tarihi
Mayıs 24, 2025, https://www.leewayhertz.com/pattern-recognition/
11. Örüntü Tanıma - FİGES A.Ş., erişim tarihi Mayıs 24, 2025,
https://figes.com.tr/matlab-simulink/probleminizi-nasil-cozeceginizi-kesfedin/orun
tu-tanima
usin
12. What is Pattern Recognition? A Gentle Introduction (2025) - viso.ai, erişim tarihi
Mayıs 24, 2025, https://viso.ai/deep-learning/pattern-recognition/
13. Classification | Introduction to Pattern Recognition and Machine Learning, erişim
tarihi Mayıs 24, 2025,
https://www.worldscientific.com/doi/10.1142/9789814335461
0005
_
14. Machine Learning (ML) for Natural Language Processing (NLP ..., erişim tarihi
Mayıs 24, 2025,
https://www.lexalytics.com/blog/machine-learning-natural-language-processing/
15. Naive Bayes Explained: Function, Advantages & Disadvantages in ..., erişim tarihi
Mayıs 24, 2025, https://www.upgrad.com/blog/naive-bayes-explained/
16. What Are Naïve Bayes Classifiers? - IBM, erişim tarihi Mayıs 24, 2025,
NB
m
https://www.ibm.com/think/topics/naive-bayes
17. How to Build Naive Bayes Classifier to Perform Sentiment Analysis, erişim tarihi
Mayıs 24, 2025,
https://www.analyticsvidhya.com/blog/2022/03/building-naive-bayes-classifier-fr
om-scratch-to-perform-sentiment-analysis/
18. Spooky Author Identification: In & Out a Naive Bayes classifier | An amazing
journey in Digitalization., erişim tarihi Mayıs 24, 2025,
https://pparacch.github.io/2017/11/19/Kaggle
_
Spooky_
Author
Identification
_
_
_
odel.html
19. Text Classification: How Machine Learning Is Revolutionizing Text ..., erişim tarihi
Mayıs 24, 2025, https://www.mdpi.com/2078-2489/16/2/130
20. www.ijrar.org, erişim tarihi Mayıs 24, 2025,
https://www.ijrar.org/papers/IJRAR2001659.pdf
21. Sentiment Analysis using Naive Bayes - EnjoyAlgorithms, erişim tarihi Mayıs 24,
2025,
https://www.enjoyalgorithms.com/blog/sentiment-analysis-using-naive-bayes/
22. www.ibm.com, erişim tarihi Mayıs 24, 2025,
https://www.ibm.com/think/topics/naive-bayes#:~:text=Na%C3%AFve%20Bayes
%20is%20part%20of,important%20to%20differentiate%20between%20classes.
23. 10 Pros & Cons of Support Vector Machines [2025] - DigitalDefynd, erişim tarihi
Mayıs 24, 2025,
https://digitaldefynd.com/IQ/pros-cons-of-support-vector-machines/
24. How to use SVM for sentiment analysis - Educative.io, erişim tarihi Mayıs 24, 2025,
https://www.educative.io/answers/how-to-use-svm-for-sentiment-analysis
25. Support Vector Machines for text classification | Natural Language ..., erişim tarihi
Mayıs 24, 2025,
https://library.fiveable.me/natural-language-processing/unit-2/support-vector-ma
chines-text-classification/study-guide/o7SwpwLKWskYCitb
26. Naive Bayes vs. SVM for Text Classification - GeeksforGeeks, erişim tarihi Mayıs
24, 2025,
https://www.geeksforgeeks.org/naive-bayes-vs-svm-for-text-classification/
27. Deep Learning based Authorship Identification - Stanford University, erişim tarihi
Mayıs 24, 2025,
https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1174/reports/2760185.pd
f
28. (PDF) Authorship Attribution with Support Vector Machines, erişim tarihi Mayıs 24,
2025,
https://www.researchgate.net/publication/43456924
_
Authorship_
Attribution
with
_
_
Support
Vector
Machines
_
_
29. Advantages and Disadvantages of Logistic Regression.
- Kaggle, erişim tarihi
Mayıs 24, 2025, https://www.kaggle.com/discussions/general/352871
30. Advantages and Disadvantages of Logistic Regression ..., erişim tarihi Mayıs 24,
2025,
https://www.geeksforgeeks.org/advantages-and-disadvantages-of-logistic-regre
ssion/
31. Logistic Regression for Classification - KDnuggets, erişim tarihi Mayıs 24, 2025,
https://www.kdnuggets.com/2022/04/logistic-regression-classification.html
32. Understanding Feature Importance in Logistic Regression Models |
GeeksforGeeks, erişim tarihi Mayıs 24, 2025,
https://www.geeksforgeeks.org/understanding-feature-importance-in-logistic-re
gression-models/
33. Sentiment Analysis with Logistic Regression — SHAP latest documentation, erişim
tarihi Mayıs 24, 2025,
https://shap.readthedocs.io/en/latest/example
notebooks/tabular
_
_
examples/linea
r
_
models/Sentiment%20Analysis%20with%20Logistic%20Regression.html
34. Mastering Logistic Regression with Scikit-Learn: A Complete Guide |
DigitalOcean, erişim tarihi Mayıs 24, 2025,
https://www.digitalocean.com/community/tutorials/logistic-regression-with-scikit
-learn
35. Natural Language Processing (NLP) for Sentiment Analysis with ..., erişim tarihi
Mayıs 24, 2025, https://blog.mlq.ai/nlp-sentiment-analysis-logistic-regression/
36. [Q] Logistic Regression : Classification vs Regression? : r/statistics - Reddit, erişim
tarihi Mayıs 24, 2025,
https://www.reddit.com/r/statistics/comments/12grros/q_
logistic
_
regression
_
ification
vs
_
_
regression/
37. dimacs.rutgers.edu, erişim tarihi Mayıs 24, 2025,
http://dimacs.rutgers.edu/Research/MMS/authorID-me05-fixed.pdf
38. (PDF) Bayesian Multinomial Logistic Regression for Author Identification -
ResearchGate, erişim tarihi Mayıs 24, 2025,
https://www.researchgate.net/publication/252244332
_
Bayesian
_
_
Logi
stic
_
Regression
for
Author
Identification
_
_
_
39. 8 Key Advantages and Disadvantages of Decision Trees - Inside ..., erişim tarihi
Mayıs 24, 2025,
https://insidelearningmachines.com/advantages
and
_
_
disadvantages
of
decision
_
_
trees/
class
Multinomial
_
40. scikit-learn.org, erişim tarihi Mayıs 24, 2025,
https://scikit-learn.org/stable/modules/tree.html#:~:text=Decision%20Trees%20(D
Ts)%20are%20a,as%20a%20piecewise%20constant%20approximation.
41. Decision tree learning - Wikipedia, erişim tarihi Mayıs 24, 2025,
https://en.wikipedia.org/wiki/Decision
tree
_
_
learning
42. Decision tree methods: applications for classification and prediction - PMC,
erişim tarihi Mayıs 24, 2025, https://pmc.ncbi.nlm.nih.gov/articles/PMC4466856/
43. Decision Trees in NLP: Mastering Text Classification | CodeSignal Learn, erişim
tarihi Mayıs 24, 2025,
https://codesignal.com/learn/courses/introduction-to-modeling-techniques-for-t
ext-classification/lessons/decision-trees-in-nlp-mastering-text-classification
44. Decision Trees: An Overview and Practical Guide - DataHeroes, erişim tarihi Mayıs
24, 2025,
https://dataheroes.ai/blog/decision-trees-an-overview-and-practical-guide/
45. From Decision Trees to Transformers: Comparing Sentiment Analysis Models for
Macedonian Restaurant... | Towards Data Science, erişim tarihi Mayıs 24, 2025,
https://towardsdatascience.com/from-decision-trees-to-transformers-comparin
g-sentiment-analysis-models-for-macedonian-restaurant-4c2d931ec021/
46. Using evidence-based decision trees instead of formulas to identify at-risk
readers | IES, erişim tarihi Mayıs 24, 2025,
https://ies.ed.gov/use-work/resource-library/report/descriptive-study/using-evide
nce-based-decision-trees-instead-formulas-identify-risk-readers
47. Author Identification: An Approach based on Code Feature Metrics using
Decision Trees, erişim tarihi Mayıs 24, 2025,
https://www.ijcaonline.org/archives/volume66/number4/11074-5995/
48. Deep Dive on KNN: Understanding and Implementing the K-Nearest ..., erişim
tarihi Mayıs 24, 2025,
https://arize.com/blog-course/knn-algorithm-k-nearest-neighbor/
49. Test Run - Understanding k-NN Classification Using C# | Microsoft ..., erişim tarihi
Mayıs 24, 2025,
https://learn.microsoft.com/en-us/archive/msdn-magazine/2017/december/test-r
un-understanding-k-nn-classification-using-csharp
50. K-Nearest Neighbors (KNN) Classification with scikit-learn - DataCamp, erişim
tarihi Mayıs 24, 2025,
https://www.datacamp.com/tutorial/k-nearest-neighbor-classification-scikit-lear
n
51. The KNN Algorithm - Explanation, Opportunities, Limitations - neptune.ai, erişim
tarihi Mayıs 24, 2025, https://neptune.ai/blog/knn-algorithm
52. Authorship Attribution Using Stylometry and Machine Learning Techniques -
ResearchGate, erişim tarihi Mayıs 24, 2025,
https://www.researchgate.net/publication/283862723
_
Authorship_
Attribution
_
ng_
Stylometry_
and
Machine
_
_
Learning_
Techniques
53. What is a Neural Network? | GeeksforGeeks, erişim tarihi Mayıs 24, 2025,
https://www.geeksforgeeks.org/neural-networks-a-beginners-guide/
54. Multi-Layer Perceptron Learning in Tensorflow - GeeksforGeeks, erişim tarihi
Mayıs 24, 2025,
https://www.geeksforgeeks.org/multi-layer-perceptron-learning-in-tensorflow/
55. Sentiment Analysis with an Recurrent Neural Networks (RNN ..., erişim tarihi Mayıs
24, 2025,
https://www.geeksforgeeks.org/sentiment-analysis-with-an-recurrent-neural-net
works-rnn/
Usi
56. An easy tutorial about Sentiment Analysis with Deep Learning and Keras, erişim
tarihi Mayıs 24, 2025,
https://towardsdatascience.com/an-easy-tutorial-about-sentiment-analysis-with
-deep-learning-and-keras-2bf52b9cba91/
57. Create Simple Deep Learning Neural Network for Classification - MathWorks,
erişim tarihi Mayıs 24, 2025,
https://www.mathworks.com/help/deeplearning/ug/create-simple-deep-learning-
network-for-classification.html
58. Implementing an MLP in TensorFlow & Keras - LearnOpenCV, erişim tarihi Mayıs
thesis/201901
Tzu
24, 2025, https://learnopencv.com/implementing-mlp-tensorflow-keras/
59. how-to-create-a-basic-mlp-classifier-with-the-keras-sequential-api.md -
GitHub, erişim tarihi Mayıs 24, 2025,
https://github.com/christianversloot/machine-learning-articles/blob/main/how-to-
create-a-basic-mlp-classifier-with-the-keras-sequential-api.md
60. www.math.ucdavis.edu, erişim tarihi Mayıs 24, 2025,
https://www.math.ucdavis.edu/~webfiles/undergrad
_
_
_
Feng_
Leu
ng_
DeLoera.pdf
61. Keras & TensorFlow Tutorial - Image classification with MLP - Code explained line
by line, erişim tarihi Mayıs 24, 2025,
https://www.youtube.com/watch?v=dkZ3sS
_
zqog
62. Graph Neural Networks for Text Classification: A Survey - arXiv, erişim tarihi Mayıs
24, 2025, https://arxiv.org/html/2304.11534v3
63. Convolutional Neural Network (CNN) in Tensorflow - GeeksforGeeks, erişim tarihi
Mayıs 24, 2025,
https://www.geeksforgeeks.org/convolutional-neural-network-cnn-in-tensorflow
/
64. Image Classification Using CNN with Keras and CIFAR-10 - Analytics Vidhya,
erişim tarihi Mayıs 24, 2025,
https://www.analyticsvidhya.com/blog/2021/01/image-classification-using-convol
utional-neural-networks-a-step-by-step-guide/
65. Mastering Text Classification with Simple RNNs in TensorFlow | CodeSignal Learn,
erişim tarihi Mayıs 24, 2025,
https://codesignal.com/learn/courses/advanced-modeling-for-text-classification/l
essons/mastering-text-classification-with-simple-rnns-in-tensorflow
66. Training of Recurrent Neural Networks (RNN) in TensorFlow - GeeksforGeeks,
erişim tarihi Mayıs 24, 2025,
https://www.geeksforgeeks.org/training-of-recurrent-neural-networks-rnn-in-te
nsorflow/
Identifi
67. Understanding Simple Recurrent Neural Networks in Keras -
MachineLearningMastery.com, erişim tarihi Mayıs 24, 2025,
https://machinelearningmastery.com/understanding-simple-recurrent-neural-net
works-in-keras/
68. Stylometric Author Identification via CNN-BiLSTM Architecture on Syntactic Text
Patterns, erişim tarihi Mayıs 24, 2025,
https://www.researchgate.net/publication/390945581
_
Stylometric
Author
_
_
cation
via
CNN-BiLSTM
Architecture
on
_
_
_
_
_
Syntactic
Text
Patterns
_
_
69. Implementing a CNN in TensorFlow & Keras - LearnOpenCV, erişim tarihi Mayıs
24, 2025, https://learnopencv.com/implementing-cnn-tensorflow-keras/
70. Stylometry: Identify authors by sentence structure - Kaggle, erişim tarihi Mayıs 24,
2025,
https://www.kaggle.com/code/christopher22/stylometry-identify-authors-by-sent
ence-structure/notebook
71. Text Classification: Categorize and Analyze Documents Efficiently - Lyzr AI, erişim
tarihi Mayıs 24, 2025, https://www.lyzr.ai/glossaries/text-classification/
72. Metin Sınıflandırması Nedir? - Metin Sınıflandırmasına Ayrıntılı Bakış - AWS, erişim
tarihi Mayıs 24, 2025, https://aws.amazon.com/tr/what-is/text-classification/
73. 5 Things You Need to Know about Sentiment Analysis and Classification -
KDnuggets, erişim tarihi Mayıs 24, 2025,
https://www.kdnuggets.com/2018/03/5-things-sentiment-analysis-classification.h
tml
74. Bag-of-words vs TF-IDF - GeeksforGeeks, erişim tarihi Mayıs 24, 2025,
https://www.geeksforgeeks.org/bag-of-words-vs-tf-idf/
75. Can TF-IDF be used for text Classification, How? - CrawlSpider, erişim tarihi Mayıs
24, 2025,
https://www.crawlspider.com/can-tf-idf-be-used-for-text-classification-how/
76. Author Profiling u sing Stylistic a nd N Gram Features | Scilit, erişim tarihi Mayıs 24,
2025, https://www.scilit.com/publications/62c8ceed28b5f999f62cb1fbe703d116
77. Detection of changes in literary writing style using N-grams as style markers and
supervised machine learning, erişim tarihi Mayıs 24, 2025,
https://pmc.ncbi.nlm.nih.gov/articles/PMC9299308/
78. TF – IDF for Bigrams & Trigrams - GeeksforGeeks, erişim tarihi Mayıs 24, 2025,
https://www.geeksforgeeks.org/tf-idf-for-bigrams-trigrams/
79. Training, Validation and Test Sets: How To Split Machine Learning Data - Kili
Technology, erişim tarihi Mayıs 24, 2025,
https://kili-technology.com/training-data/training-validation-and-test-sets-how-t
o-split-machine-learning-data
80. Train-Test-Validation Split: A Critical Component of ML, erişim tarihi Mayıs 24,
2025, https://www.analyticsvidhya.com/blog/2023/11/train-test-validation-split/
81. Cross Validation: Training, Validation and Testing Splits - The Examples Book,
erişim tarihi Mayıs 24, 2025,
https://the-examples-book.com/tools/data-modeling-cross-validation-train-valid
82. train
test
_
_
split — scikit-learn 1.6.1 documentation, erişim tarihi Mayıs 24, 2025,
https://scikit-learn.org/stable/modules/generated/sklearn.model
selection.train
_
st
_
split.html
83. sklearn.model
selection.train
test
_
_
_
split — scikit-learn 0.19.2 documentation,
erişim tarihi Mayıs 24, 2025,
https://scikit-learn.org/0.19/modules/generated/sklearn.model
selection.train
_
_
_
split.html
84. 3.1. Cross-validation: evaluating estimator performance - Scikit-learn, erişim tarihi
Mayıs 24, 2025,
https://scikit-learn.org/stable/modules/cross
validation.html#cross-validation-iter
_
ators-for-grouped-data
85. Preprocessing Text Data: Train-Test Split and Stratified Cross-Validation |
CodeSignal Learn, erişim tarihi Mayıs 24, 2025,
https://codesignal.com/learn/courses/introduction-to-modeling-techniques-for-t
ext-classification/lessons/preprocessing-text-data-train-test-split-and-stratified
-cross-validation
-test
te
_
test
86. Practical Implementation of Stratified Cross-Validation in Machine Learning,
erişim tarihi Mayıs 24, 2025,
https://www.numberanalytics.com/blog/practical-implementation-stratified-cros
s-validation
87. 10 Cross-Validation Folds: 8 Proven Strategies for Model Accuracy, erişim tarihi
Mayıs 24, 2025,
https://www.numberanalytics.com/blog/10-cross-validation-folds-strategies-mo
del-accuracy
88. Cross Validation: What You Need To Know, From the Basics To LLMs - Arize AI,
erişim tarihi Mayıs 24, 2025,
https://arize.com/blog/cross-validation-machine-learning/
89. How to Evaluate NLP Models - Key Metrics, Methods, and FAQs Explained -
MoldStud, erişim tarihi Mayıs 24, 2025,
https://moldstud.com/articles/p-how-to-evaluate-nlp-models-key-metrics-meth
ods-and-faqs-explained
90. Makine Öğrenmesinde Metin Sınıflandırması – Önem, Kullanım Örnekleri ve Süreç
- Shaip, erişim tarihi Mayıs 24, 2025,
https://tr.shaip.com/blog/text-classification-importance-use-cases-and-process/
91. K-Fold Cross-Validation in Scikit-Learn: Tutorial - Daily.dev, erişim tarihi Mayıs 24,
2025, https://daily.dev/blog/k-fold-cross-validation-in-scikit-learn-tutorial
92. Cross Validation in Machine Learning | GeeksforGeeks, erişim tarihi Mayıs 24,
2025, https://www.geeksforgeeks.org/cross-validation-machine-learning/
93. How to Fix k-Fold Cross-Validation for Imbalanced Classification ..., erişim tarihi
Mayıs 24, 2025,
https://machinelearningmastery.com/cross-validation-for-imbalanced-classificati
on/
94. TimeSeriesSplit — scikit-learn 1.6.1 documentation, erişim tarihi Mayıs 24, 2025,
https://scikit-learn.org/stable/modules/generated/sklearn.model
selection.TimeSe
_
riesSplit.html
95. TimeSeriesSplit method for time-based cross-validation. The data set...
ResearchGate, erişim tarihi Mayıs 24, 2025,
https://www.researchgate.net/figure/TimeSeriesSplit-method-for-time-based-cr
oss-validation-The-data-set-is-split-into
_
fig7
367975373
_
96. 3.1. Cross-validation: evaluating estimator performance - Scikit-learn, erişim tarihi
Mayıs 24, 2025,
https://scikit-learn.org/stable/modules/cross
validation.html#data-transformation
_
-with-held-out-data
97. Data Leakage in Machine Learning - MachineLearningMastery.com, erişim tarihi
Mayıs 24, 2025,
https://machinelearningmastery.com/data-leakage-machine-learning/
98. 3.1. Cross-validation: evaluating estimator performance - Scikit-learn, erişim tarihi
Mayıs 24, 2025, https://scikit-learn.org/stable/modules/cross
validation.html
_
99. Understanding the Confusion Matrix in Machine Learning | GeeksforGeeks, erişim
tarihi Mayıs 24, 2025,
https://www.geeksforgeeks.org/confusion-matrix-machine-learning/
100. Karışıklık Matrisi (Confusion Matrix) - Hakan Torun, erişim tarihi Mayıs 24, 2025,
-
101. 102. https://hakan.io/karisiklik-matrisi-confusion-matrix/
Karışıklık Matrisi Açıklandı | Ultralytics, erişim tarihi Mayıs 24, 2025,
https://www.ultralytics.com/tr/glossary/confusion-matrix
Understanding F1 Score, Accuracy, ROC-AUC & PR-AUC Metrics, erişim tarihi
Mayıs 24, 2025,
https://www.deepchecks.com/f1-score-accuracy-roc-auc-and-pr-auc-metrics-f
or-models/
103. Confusion Matrix (for multiclass models) - DataRobot docs, erişim tarihi Mayıs
24, 2025,
s.html
https://docs.datarobot.com/en/docs/modeling/analyze-models/evaluate/multiclas
els
104. 105. Multiclass Classification With an Imbalanced Data Set - Built In, erişim tarihi
Mayıs 24, 2025, https://builtin.com/machine-learning/multiclass-classification
Top 7 Metrics to Evaluate Sentiment Analysis Models - Focal, erişim tarihi
Mayıs 24, 2025,
https://www.getfocal.co/post/top-7-metrics-to-evaluate-sentiment-analysis-mod
106. 107. 108. Lojistik Regresyon ve Sınıflandırma Metrikleri - Miuul, erişim tarihi Mayıs 24,
2025, https://miuul.com/blog/lojistik-regresyon-ve-siniflandirma-metrikleri
Sınıflandırma: Doğruluk, geri çağırma, hassasiyet ve ilgili metrikler ..., erişim
tarihi Mayıs 24, 2025,
https://developers.google.com/machine-learning/crash-course/classification/accu
racy-precision-recall?hl=tr
Evaluation of text classification - Stanford NLP Group, erişim tarihi Mayıs 24,
2025,
https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-text-classificatio
n-1.html
109. 110. 111. 112. 113. F1 Score vs ROC AUC vs Accuracy vs PR AUC: Which Evaluation Metric Should
You Choose? - neptune.ai, erişim tarihi Mayıs 24, 2025,
https://neptune.ai/blog/f1-score-accuracy-roc-auc-pr-auc
Accuracy vs. precision vs. recall in machine learning: what's the ..., erişim tarihi
Mayıs 24, 2025,
https://www.evidentlyai.com/classification-metrics/accuracy-precision-recall
Precision and Recall: How to Evaluate Your Classification Model - Built In,
erişim tarihi Mayıs 24, 2025, https://builtin.com/data-science/precision-and-recall
Performans Metriklerine Derinlemesine Bakış - Ultralytics YOLO, erişim tarihi
Mayıs 24, 2025, https://docs.ultralytics.com/tr/guides/yolo-performance-metrics/
Classification: ROC and AUC | Machine Learning - Google for Developers,
erişim tarihi Mayıs 24, 2025,
https://developers.google.com/machine-learning/crash-course/classification/roc-
and-auc
114. How to explain the ROC AUC score and ROC curve? - Evidently AI, erişim tarihi
115. Mayıs 24, 2025,
https://www.evidentlyai.com/classification-metrics/explain-roc-curve
Makine Öğrenmesi Doğruluk Metrikleri: Modelinizin Performansını Anlamanın
Anahtarı - Veri Topluluğu - Manisa Celal Bayar Üniversitesi, erişim tarihi Mayıs 24,
2025, https://veri.mcbu.edu.tr/eski/article/12
116. ROC ve AUC Eğrileri Nedir? Yapay Zeka Eşik Değerleri - devreyakan, erişim
tarihi Mayıs 24, 2025, https://devreyakan.com/roc-ve-auc-egrileri/
117. roc
auc
_
_
score — scikit-learn 1.6.1 documentation, erişim tarihi Mayıs 24, 2025,
https://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc
auc
score.h
_
_
tml
118. Multiclass classification evaluation with ROC Curves and ROC AUC | Towards
Data Science, erişim tarihi Mayıs 24, 2025,
https://towardsdatascience.com/multiclass-classification-evaluation-with-roc-cu
rves-and-roc-auc-294fd4617e3a/
119. Tour of Evaluation Metrics for Imbalanced Classification -
MachineLearningMastery.com, erişim tarihi Mayıs 24, 2025,
https://machinelearningmastery.com/tour-of-evaluation-metrics-for-imbalanced
-classification/
re
120. model evaluations - Micro Average vs Macro average Performance ..., erişim
tarihi Mayıs 24, 2025,
https://datascience.stackexchange.com/questions/15989/micro-average-vs-macr
o-average-performance-in-a-multiclass-classification-settin
121. classification
_
report — scikit-learn 1.6.1 documentation, erişim tarihi Mayıs 24,
2025,
https://scikit-learn.org/stable/modules/generated/sklearn.metrics.classification
_
port.html
122. Averaging Methods: When to use macro, micro, or weighted average for
metrics · Testing with Kolena, erişim tarihi Mayıs 24, 2025,
https://docs.kolena.com/metrics/averaging-methods/
123. Classification Report — Yellowbrick v1.5 documentation, erişim tarihi Mayıs 24,
2025, https://www.scikit-yb.org/en/latest/api/classifier/classification
_
report.html
124. www.numberanalytics.com, erişim tarihi Mayıs 24, 2025,
https://www.numberanalytics.com/blog/ultimate-guide-f1-score-ml#:~:text=Varia
tions%3A%20Macro%2C%20Micro%2C%20and%20Weighted,
-With%20multi%E
2%80%91class&text=Macro%20F1%3A%20Good%20when%20you,performance
%2C%20especially%20with%20class%20imbalance.
125. The Ultimate Guide to F1 Score in Machine Learning - Number Analytics, erişim
tarihi Mayıs 24, 2025,
https://www.numberanalytics.com/blog/ultimate-guide-f1-score-ml
126. Comparative analysis of machine learning algorithms for biomedical text
document classification: A case study on cancer-related publications - Medicine
Science, erişim tarihi Mayıs 24, 2025,
https://www.medicinescience.org/article/4277
127. Performance Comparison of Text Classification Models Across Multiple
Datasets, erişim tarihi Mayıs 24, 2025,s
https://www.researchgate.net/figure/Performance-Comparison-of-Text-Classific
ation-Models-Across-Multiple-Datasets
tbl1
389392271
_
_
128. Are We Really Making Much Progress in Text Classification? A Comparative
Review - arXiv, erişim tarihi Mayıs 24, 2025, https://arxiv.org/html/2204.03954v6
129. Comparison of classification model's result | Download Scientific Diagram -
ResearchGate, erişim tarihi Mayıs 24, 2025,
https://www.researchgate.net/figure/Comparison-of-classification-models-result
tbl1
387678910
_
_
130. Text Classification: Neural Networks VS Machine Learning Models VS
Pre-trained Models - arXiv, erişim tarihi Mayıs 24, 2025,
https://arxiv.org/html/2412.21022v1
131. Statistical Significance Testing for Natural Language Processing | Request PDF,
erişim tarihi Mayıs 24, 2025,
https://www.researchgate.net/publication/361190988
Statistical
_
_
Significance
_
ing_
for
Natural
_
_
Language
_
Processing
132. arXiv:2312.17254v1 [cs.CL] 19 Dec 2023, erişim tarihi Mayıs 24, 2025,
https://arxiv.org/pdf/2312.17254
133. Statistical Significance Tests for Comparing Machine Learning Algorithms -
MachineLearningMastery.com, erişim tarihi Mayıs 24, 2025,
https://machinelearningmastery.com/statistical-significance-tests-for-comparing
-machine-learning-algorithms/
134. McNemar's test for classifier comparisons - mlxtend - GitHub Pages, erişim
tarihi Mayıs 24, 2025,
https://rasbt.github.io/mlxtend/user
_guide/evaluate/mcnemar/
Test