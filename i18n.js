export const LANGS = { en: 'English', fr: 'Français', es: 'Español', ar: 'العربية', tr: 'Türkçe' };
const ORDER = Object.keys(LANGS);

// Each entry: [en, fr, es, ar, tr]. {name} placeholders are filled by t().
export const dictionary = {
  'meta.title': ['Anonyx · hide faces before you post', 'Anonyx · masquez les visages avant de publier', 'Anonyx · oculta rostros antes de publicar', 'Anonyx · أخفِ الوجوه قبل النشر', 'Anonyx · paylaşmadan önce yüzleri gizleyin'],
  'meta.desc': ['Hides faces in a video or photo with a solid square, right on your phone. Nothing is sent over the internet.', 'Masque les visages d’une vidéo ou d’une photo avec un carré plein, directement sur votre téléphone. Rien n’est envoyé sur Internet.', 'Oculta los rostros de un vídeo o una foto con un cuadrado sólido, en tu propio teléfono. No se envía nada por Internet.', 'يخفي الوجوه في الفيديو أو الصورة بمربع مصمت، مباشرة على هاتفك. لا يُرسَل أي شيء عبر الإنترنت.', 'Bir videodaki veya fotoğraftaki yüzleri düz bir kareyle doğrudan telefonunuzda gizler. İnternete hiçbir şey gönderilmez.'],
  'lang.label': ['Language', 'Langue', 'Idioma', 'اللغة', 'Dil'],
  'common.cancel': ['Cancel', 'Annuler', 'Cancelar', 'إلغاء', 'İptal'],

  'home.title': ['Hide<br>the faces.', 'Masquez<br>les visages.', 'Oculta<br>los rostros.', 'أخفِ<br>الوجوه.', 'Yüzleri<br>gizleyin.'],
  'home.tagline.phone': ['Nothing leaves your phone.', 'Rien ne quitte votre téléphone.', 'Nada sale de tu teléfono.', 'لا شيء يغادر هاتفك.', 'Hiçbir şey telefonunuzdan çıkmaz.'],
  'home.tagline.pc': ['Nothing leaves your computer.', 'Rien ne quitte votre ordinateur.', 'Nada sale de tu ordenador.', 'لا شيء يغادر حاسوبك.', 'Hiçbir şey bilgisayarınızdan çıkmaz.'],
  'pick.loading': ['Loading…', 'Chargement…', 'Cargando…', 'جارٍ التحميل…', 'Yükleniyor…'],
  'pick.drop': ['Drop videos or photos,<br>or click to choose', 'Déposez des vidéos ou photos,<br>ou cliquez pour choisir', 'Suelta vídeos o fotos,<br>o haz clic para elegir', 'أفلت مقاطع فيديو أو صورًا،<br>أو انقر للاختيار', 'Video veya fotoğrafları bırakın,<br>ya da seçmek için tıklayın'],
  'pick.choose': ['Choose videos<br>or photos', 'Choisissez des vidéos<br>ou des photos', 'Elige vídeos<br>o fotos', 'اختر مقاطع فيديو<br>أو صورًا', 'Video veya<br>fotoğraf seçin'],
  'pick.unavailable': ['Tool unavailable', 'Outil indisponible', 'Herramienta no disponible', 'الأداة غير متاحة', 'Araç kullanılamıyor'],
  'opt.fast': ['Fast mode (may miss very small faces)', 'Mode rapide (peut rater de très petits visages)', 'Modo rápido (puede omitir rostros muy pequeños)', 'الوضع السريع (قد تفوته وجوه صغيرة جدًا)', 'Hızlı mod (çok küçük yüzleri kaçırabilir)'],
  'opt.quality': ['Best tracking (slower: smoother, fewer gaps)', 'Meilleur suivi (plus lent : plus fluide, moins de trous)', 'Mejor seguimiento (más lento: más fluido, menos huecos)', 'أفضل تتبّع (أبطأ: أكثر سلاسة وفجوات أقل)', 'En iyi takip (daha yavaş: daha akıcı, daha az boşluk)'],
  'link.how': ['How it works', 'Comment ça marche', 'Cómo funciona', 'كيف يعمل', 'Nasıl çalışır'],
  'link.verify': ['Verify Anonyx', 'Vérifier Anonyx', 'Verificar Anonyx', 'تحقّق من Anonyx', 'Anonyx’ı doğrulayın'],
  'link.source': ['Source code', 'Code source', 'Código fuente', 'الشيفرة المصدرية', 'Kaynak kod'],
  'link.legal': ['Legal notice', 'Mentions légales', 'Aviso legal', 'إشعار قانوني', 'Yasal bildirim'],

  'scan.frame': ['Current frame', 'Image en cours', 'Fotograma actual', 'الإطار الحالي', 'Geçerli kare'],
  'scan.fileOf': ['File {n} of {total}', 'Fichier {n} sur {total}', 'Archivo {n} de {total}', 'الملف {n} من {total}', 'Dosya {n} / {total}'],
  'scan.refine': ['Refining the gaps…', 'Affinage des trous…', 'Refinando los huecos…', 'تحسين الفجوات…', 'Boşluklar inceleniyor…'],

  'verb.click': ['Click', 'Cliquez', 'Haz clic', 'انقر', 'tıklayın'],
  'verb.tap': ['Tap', 'Touchez', 'Toca', 'المس', 'dokunun'],
  'hint.compare': ['Drag to compare. Masked on the left, original on the right.', 'Faites glisser pour comparer. Masqué à gauche, original à droite.', 'Arrastra para comparar. Con máscara a la izquierda, original a la derecha.', 'اسحب للمقارنة. المقنَّع على اليسار والأصلي على اليمين.', 'Karşılaştırmak için sürükleyin. Solda maskeli, sağda orijinal.'],
  'hint.masks': ['{verb} a face to hide or unhide its mask. {verb} elsewhere to add one.', '{verb} sur un visage pour masquer ou démasquer. {verb} ailleurs pour ajouter un masque.', '{verb} en un rostro para ocultar o mostrar su máscara. {verb} en otro sitio para añadir una.', '{verb} على وجه لإخفاء قناعه أو إظهاره. {verb} على مكان آخر لإضافة قناع.', 'Maskeyi gizlemek veya göstermek için bir yüze {verb}. Maske eklemek için başka bir yere {verb}.'],
  'hint.none': ['No face found. {verb} where a face is to add a mask.', 'Aucun visage trouvé. {verb} sur l’emplacement d’un visage pour ajouter un masque.', 'No se encontró ningún rostro. {verb} donde haya uno para añadir una máscara.', 'لم يُعثر على وجه. {verb} على موضع الوجه لإضافة قناع.', 'Yüz bulunamadı. Maske eklemek için yüzün olduğu yere {verb}.'],

  'files.prev': ['Previous file', 'Fichier précédent', 'Archivo anterior', 'الملف السابق', 'Önceki dosya'],
  'files.next': ['Next file', 'Fichier suivant', 'Archivo siguiente', 'الملف التالي', 'Sonraki dosya'],
  'files.dropTitle': ['Leave this file out', 'Exclure ce fichier', 'Excluir este archivo', 'استبعاد هذا الملف', 'Bu dosyayı dışarıda bırak'],
  'files.drop': ['Remove', 'Retirer', 'Quitar', 'إزالة', 'Kaldır'],
  'files.export': ['Export', 'Exporter', 'Exportar', 'تصدير', 'Dışa aktar'],
  'files.exportAll': ['Export all ({n})', 'Tout exporter ({n})', 'Exportar todo ({n})', 'تصدير الكل ({n})', 'Tümünü dışa aktar ({n})'],

  'mask.smaller': ['Smaller', 'Plus petit', 'Más pequeña', 'أصغر', 'Daha küçük'],
  'mask.larger': ['Larger', 'Plus grand', 'Más grande', 'أكبر', 'Daha büyük'],
  'mask.whole': ['Whole video', 'Toute la vidéo', 'Todo el vídeo', 'الفيديو كله', 'Tüm video'],
  'mask.remove': ['Remove this mask', 'Retirer ce masque', 'Quitar esta máscara', 'إزالة هذا القناع', 'Bu maskeyi kaldır'],
  'mask.removeFrom': ['Remove this mask from here on', 'Retirer ce masque à partir d’ici', 'Quitar esta máscara desde aquí', 'إزالة هذا القناع من هنا فصاعدًا', 'Bu maskeyi buradan itibaren kaldır'],
  'mask.restore': ['Restore this mask', 'Rétablir ce masque', 'Restaurar esta máscara', 'استعادة هذا القناع', 'Bu maskeyi geri yükle'],
  'mask.restoreFrom': ['Restore this mask from here on', 'Rétablir ce masque à partir d’ici', 'Restaurar esta máscara desde aquí', 'استعادة هذا القناع من هنا فصاعدًا', 'Bu maskeyi buradan itibaren geri yükle'],
  'mask.removeShort': ['Remove', 'Retirer', 'Quitar', 'إزالة', 'Kaldır'],
  'mask.restoreOne': ['Restore the removed mask', 'Rétablir le masque retiré', 'Restaurar la máscara quitada', 'استعادة القناع المُزال', 'Kaldırılan maskeyi geri yükle'],
  'mask.restoreMany': ['Restore the {n} removed masks', 'Rétablir les {n} masques retirés', 'Restaurar las {n} máscaras quitadas', 'استعادة الأقنعة المُزالة ({n})', 'Kaldırılan {n} maskeyi geri yükle'],
  'mask.keepOnly': ['Keep only this face visible, mask all others', 'Garder visible ce seul visage, masquer tous les autres', 'Dejar visible solo este rostro y ocultar los demás', 'إبقاء هذا الوجه وحده ظاهرًا وإخفاء البقية', 'Yalnızca bu yüzü açık bırak, diğerlerini gizle'],
  'follow.start': ['Follow what is under this mask', 'Suivre ce qui est sous ce masque', 'Seguir lo que hay bajo esta máscara', 'تتبّع ما تحت هذا القناع', 'Bu maskenin altındakini takip et'],
  'follow.stop': ['Stop following', 'Arrêter le suivi', 'Dejar de seguir', 'إيقاف التتبّع', 'Takibi durdur'],
  'follow.progress': ['Following… {n}%. Tap ■ to stop.', 'Suivi en cours… {n} %. Touchez ■ pour arrêter.', 'Siguiendo… {n} %. Toca ■ para parar.', 'جارٍ التتبّع… {n}٪. المس ■ للإيقاف.', 'Takip ediliyor… %{n}. Durdurmak için ■ öğesine dokunun.'],

  'time.prev': ['Previous frame', 'Image précédente', 'Fotograma anterior', 'الإطار السابق', 'Önceki kare'],
  'time.next': ['Next frame', 'Image suivante', 'Fotograma siguiente', 'الإطار التالي', 'Sonraki kare'],
  'time.pos': ['Position in video', 'Position dans la vidéo', 'Posición en el vídeo', 'الموضع في الفيديو', 'Videodaki konum'],
  'tool.size': ['Size', 'Taille', 'Tamaño', 'الحجم', 'Boyut'],
  'tool.sizeAllTitle': ['Use this size for every file', 'Utiliser cette taille pour tous les fichiers', 'Usar este tamaño en todos los archivos', 'استخدام هذا الحجم لكل الملفات', 'Bu boyutu tüm dosyalar için kullan'],
  'tool.sizeAll': ['Apply to all', 'Appliquer à tous', 'Aplicar a todos', 'تطبيق على الكل', 'Tümüne uygula'],
  'tool.sizeDone': ['Done', 'Fait', 'Hecho', 'تم', 'Tamam'],
  'tool.compare': ['Compare', 'Comparer', 'Comparar', 'مقارنة', 'Karşılaştır'],
  'tool.report': ['Report', 'Rapport', 'Informe', 'تقرير', 'Rapor'],
  'tool.play': ['Play', 'Lecture', 'Reproducir', 'تشغيل', 'Oynat'],
  'tool.style': ['Mask style', 'Style du masque', 'Estilo de máscara', 'شكل القناع', 'Maske stili'],
  'tool.blur': ['Blur', 'Flou', 'Desenfoque', 'تمويه', 'Bulanıklık'],
  'tool.blurStrength': ['Blur strength', 'Force du flou', 'Intensidad del desenfoque', 'قوة التمويه', 'Bulanıklık gücü'],

  'style.black': ['Solid black square', 'Carré noir plein', 'Cuadrado negro sólido', 'مربع أسود مصمت', 'Düz siyah kare'],
  'style.emoji': ['Mask with {e}', 'Masquer avec {e}', 'Enmascarar con {e}', 'إخفاء بـ {e}', '{e} ile maskele'],
  'style.noteLow': ['Low strength can leave a face recognisable. A solid square hides more.', 'Une faible force peut laisser un visage reconnaissable. Un carré plein cache davantage.', 'Una intensidad baja puede dejar un rostro reconocible. Un cuadrado sólido oculta más.', 'القوة المنخفضة قد تُبقي الوجه قابلًا للتعرّف. المربع المصمت يُخفي أكثر.', 'Düşük güç yüzü tanınabilir bırakabilir. Düz kare daha çok gizler.'],
  'style.noteBlur': ['Blur keeps colours and shape visible. A solid square hides more.', 'Le flou laisse visibles les couleurs et la forme. Un carré plein cache davantage.', 'El desenfoque deja visibles los colores y la forma. Un cuadrado sólido oculta más.', 'التمويه يُبقي الألوان والشكل ظاهرين. المربع المصمت يُخفي أكثر.', 'Bulanıklık renkleri ve şekli görünür bırakır. Düz kare daha çok gizler.'],

  'audio.mute': ['MUTE', 'MUET', 'SIN SONIDO', 'صامت', 'SESSİZ'],
  'audio.voice': ['VOICE', 'VOIX', 'VOZ', 'الصوت', 'SES'],
  'audio.keep': ['SOUND', 'SON', 'SONIDO', 'الصوت', 'SES'],
  'audio.title': ['Sound: silent, changed voice, or original', 'Son : muet, voix modifiée ou original', 'Sonido: silencio, voz cambiada u original', 'الصوت: صامت أو صوت مُغيَّر أو أصلي', 'Ses: sessiz, değiştirilmiş ses veya orijinal'],
  'audio.noteMute': ['Silent video. A voice can identify someone.', 'Vidéo muette. Une voix peut identifier quelqu’un.', 'Vídeo sin sonido. Una voz puede identificar a alguien.', 'فيديو صامت. الصوت قد يكشف هوية صاحبه.', 'Sessiz video. Bir ses, kişiyi belli edebilir.'],
  'audio.noteVoice': ['Voice changed (pitch and tone). It lowers recognition, it does not make it impossible.', 'Voix modifiée (hauteur et timbre). Elle réduit la reconnaissance sans la rendre impossible.', 'Voz cambiada (tono y timbre). Reduce el reconocimiento, no lo hace imposible.', 'تم تغيير الصوت (النبرة والطابع). يقلّل التعرّف عليه لكنه لا يجعله مستحيلًا.', 'Ses değiştirildi (perde ve tını). Tanınmayı azaltır, imkânsız kılmaz.'],
  'audio.noteKeep': ['Original sound kept. A voice can identify someone.', 'Son d’origine conservé. Une voix peut identifier quelqu’un.', 'Sonido original conservado. Una voz puede identificar a alguien.', 'تم الاحتفاظ بالصوت الأصلي. الصوت قد يكشف هوية صاحبه.', 'Orijinal ses korundu. Bir ses, kişiyi belli edebilir.'],

  'exp.res': ['Size', 'Taille', 'Tamaño', 'الأبعاد', 'Boyut'],
  'exp.resOrig': ['Original', 'Originale', 'Original', 'الأصلي', 'Orijinal'],
  'exp.cap': ['Limit', 'Limite', 'Límite', 'الحد', 'Sınır'],
  'exp.capNone': ['None', 'Aucune', 'Ninguno', 'بلا حد', 'Yok'],
  'exp.capWa': ['WhatsApp 16 MB', 'WhatsApp 16 Mo', 'WhatsApp 16 MB', 'واتساب 16 م.ب', 'WhatsApp 16 MB'],
  'exp.capSignal': ['Signal 100 MB', 'Signal 100 Mo', 'Signal 100 MB', 'سيجنال 100 م.ب', 'Signal 100 MB'],
  'exp.estimate': ['About {size}, {res}', 'Environ {size}, {res}', 'Unos {size}, {res}', 'حوالي {size}، {res}', 'Yaklaşık {size}, {res}'],
  'exp.estimateLow': ['About {size}, {res}. Long video: quality will be low.', 'Environ {size}, {res}. Vidéo longue : qualité faible.', 'Unos {size}, {res}. Vídeo largo: la calidad será baja.', 'حوالي {size}، {res}. فيديو طويل: ستكون الجودة منخفضة.', 'Yaklaşık {size}, {res}. Uzun video: kalite düşük olacak.'],
  'exp.photoFmt': ['Format', 'Format', 'Formato', 'الصيغة', 'Biçim'],
  'exp.voiceSlow': ['Voice change needs fast export. This video will be silent.', 'Le changement de voix exige l’export rapide. Cette vidéo sera muette.', 'El cambio de voz requiere exportación rápida. Este vídeo no tendrá sonido.', 'تغيير الصوت يتطلّب التصدير السريع. سيكون هذا الفيديو صامتًا.', 'Ses değiştirme hızlı dışa aktarma gerektirir. Bu video sessiz olacak.'],
  'exp.audioFail': ['The sound could not be copied: the video will be silent.', 'Le son n’a pas pu être copié : la vidéo sera muette.', 'No se pudo copiar el sonido: el vídeo no tendrá sonido.', 'تعذّر نسخ الصوت: سيكون الفيديو صامتًا.', 'Ses kopyalanamadı: video sessiz olacak.'],
  'exp.keepOn': ['Keep the screen on.', 'Gardez l’écran allumé.', 'Mantén la pantalla encendida.', 'أبقِ الشاشة مضاءة.', 'Ekranı açık tutun.'],
  'exp.emptyMany': ['{empty} of {total} files have no mask. Tap Export again to save them unchanged.', '{empty} fichiers sur {total} n’ont aucun masque. Touchez de nouveau Exporter pour les enregistrer tels quels.', '{empty} de {total} archivos no tienen máscara. Toca Exportar de nuevo para guardarlos sin cambios.', '{empty} من {total} ملفات بلا أي قناع. المس «تصدير» مرة أخرى لحفظها دون تغيير.', '{total} dosyanın {empty} tanesinde maske yok. Değiştirmeden kaydetmek için Dışa aktar’a tekrar dokunun.'],
  'exp.emptyOne': ['There is no mask on this file. Tap Export again to save it unchanged.', 'Ce fichier n’a aucun masque. Touchez de nouveau Exporter pour l’enregistrer tel quel.', 'Este archivo no tiene máscara. Toca Exportar de nuevo para guardarlo sin cambios.', 'لا يوجد أي قناع في هذا الملف. المس «تصدير» مرة أخرى لحفظه دون تغيير.', 'Bu dosyada maske yok. Değiştirmeden kaydetmek için Dışa aktar’a tekrar dokunun.'],

  'rep.faces': ['Faces tracked', 'Visages suivis', 'Rostros seguidos', 'الوجوه المتتبَّعة', 'Takip edilen yüzler'],
  'rep.check': ['{n} to double-check', '{n} à revérifier', '{n} por revisar', '{n} للتحقق مرة أخرى', '{n} tanesi tekrar kontrol edilmeli'],
  'rep.manual': ['Masks added by hand', 'Masques ajoutés à la main', 'Máscaras añadidas a mano', 'أقنعة أُضيفت يدويًا', 'Elle eklenen maskeler'],
  'rep.edited': ['Faces edited', 'Visages modifiés', 'Rostros editados', 'وجوه جرى تعديلها', 'Düzenlenen yüzler'],
  'rep.picture': ['Picture', 'Image', 'Imagen', 'الصورة', 'Görüntü'],
  'rep.frames': ['Frames with a mask', 'Images avec masque', 'Fotogramas con máscara', 'إطارات بها قناع', 'Maskeli kareler'],
  'rep.framesVal': ['{c} of {t} ({p}%)', '{c} sur {t} ({p} %)', '{c} de {t} ({p} %)', '{c} من {t} ({p}٪)', '{t} karenin {c} tanesi (%{p})'],
  'rep.analysed': ['Analysed', 'Analysé', 'Analizado', 'التحليل', 'Analiz'],
  'rep.analysedVal': ['{t} frames at {f} per second', '{t} images à {f} par seconde', '{t} fotogramas a {f} por segundo', '{t} إطارًا بمعدل {f} في الثانية', '{t} kare, saniyede {f}'],
  'rep.size': ['Mask size', 'Taille des masques', 'Tamaño de máscara', 'حجم القناع', 'Maske boyutu'],
  'rep.style': ['Style', 'Style', 'Estilo', 'الشكل', 'Stil'],
  'rep.styleBlack': ['Black square', 'Carré noir', 'Cuadrado negro', 'مربع أسود', 'Siyah kare'],
  'rep.styleBlur': ['Blur', 'Flou', 'Desenfoque', 'تمويه', 'Bulanıklık'],
  'rep.styleEmoji': ['Emoji {e}', 'Émoji {e}', 'Emoji {e}', 'إيموجي {e}', 'Emoji {e}'],
  'rep.sound': ['Sound', 'Son', 'Sonido', 'الصوت', 'Ses'],
  'rep.soundOff': ['off', 'coupé', 'sin sonido', 'مُعطَّل', 'kapalı'],
  'rep.soundVoice': ['voice changed', 'voix modifiée', 'voz cambiada', 'صوت مُغيَّر', 'ses değiştirildi'],
  'rep.soundKept': ['original kept', 'original conservé', 'original conservado', 'الأصلي محفوظ', 'orijinal korundu'],
  'rep.face': ['Face {n}', 'Visage {n}', 'Rostro {n}', 'الوجه {n}', 'Yüz {n}'],

  'done.ready': ['Ready.', 'Terminé.', 'Listo.', 'جاهز.', 'Hazır.'],
  'done.alt': ['Masked photo', 'Photo masquée', 'Foto enmascarada', 'صورة مُقنَّعة', 'Maskelenmiş fotoğraf'],
  'done.watch': ['Watch all of it before posting.', 'Regardez-la en entier avant de publier.', 'Míralo entero antes de publicar.', 'شاهده كاملًا قبل النشر.', 'Paylaşmadan önce tamamını izleyin.'],
  'done.look': ['Look at it closely before posting.', 'Examinez-la bien avant de publier.', 'Revísala con atención antes de publicar.', 'تفحّصها جيدًا قبل النشر.', 'Paylaşmadan önce dikkatlice inceleyin.'],
  'done.previewFail': ['The preview cannot play here. Open the saved video and watch all of it before posting.', 'L’aperçu ne peut pas être lu ici. Ouvrez la vidéo enregistrée et regardez-la en entier avant de publier.', 'La vista previa no se puede reproducir aquí. Abre el vídeo guardado y míralo entero antes de publicar.', 'تعذّر تشغيل المعاينة هنا. افتح الفيديو المحفوظ وشاهده كاملًا قبل النشر.', 'Önizleme burada oynatılamıyor. Kaydedilen videoyu açın ve paylaşmadan önce tamamını izleyin.'],
  'done.note': ['The mask hides faces, not clothes, tattoos, voice or place. No tool protects 100%.', 'Le masque cache les visages, pas les vêtements, tatouages, la voix ou le lieu. Aucun outil ne protège à 100 %.', 'La máscara oculta rostros, no la ropa, los tatuajes, la voz ni el lugar. Ninguna herramienta protege al 100 %.', 'القناع يخفي الوجوه، لا الملابس ولا الوشوم ولا الصوت ولا المكان. لا توجد أداة تحمي بنسبة 100٪.', 'Maske yüzleri gizler; kıyafetleri, dövmeleri, sesi veya yeri değil. Hiçbir araç %100 korumaz.'],
  'done.editMasks': ['Edit masks', 'Modifier les masques', 'Editar máscaras', 'تعديل الأقنعة', 'Maskeleri düzenle'],
  'done.share': ['Save or share', 'Enregistrer ou partager', 'Guardar o compartir', 'حفظ أو مشاركة', 'Kaydet veya paylaş'],
  'done.other': ['Other files', 'Autres fichiers', 'Otros archivos', 'ملفات أخرى', 'Başka dosyalar'],
  'done.download': ['Download', 'Télécharger', 'Descargar', 'تنزيل', 'İndir'],
  'done.downloadAll': ['Download all ({n})', 'Tout télécharger ({n})', 'Descargar todo ({n})', 'تنزيل الكل ({n})', 'Tümünü indir ({n})'],
  'done.save': ['Save', 'Enregistrer', 'Guardar', 'حفظ', 'Kaydet'],
  'done.report': ['Scan report', 'Rapport d’analyse', 'Informe del análisis', 'تقرير التحليل', 'Tarama raporu'],

  'info.jpeg': ['JPEG file', 'Fichier JPEG', 'Archivo JPEG', 'ملف JPEG', 'JPEG dosyası'],
  'info.png': ['PNG file', 'Fichier PNG', 'Archivo PNG', 'ملف PNG', 'PNG dosyası'],
  'info.video': ['{fmt} file, {sound}, {res}', 'Fichier {fmt}, {sound}, {res}', 'Archivo {fmt}, {sound}, {res}', 'ملف {fmt}، {sound}، {res}', '{fmt} dosyası, {sound}, {res}'],
  'info.soundWith': ['with sound', 'avec son', 'con sonido', 'مع الصوت', 'sesli'],
  'info.soundVoice': ['with changed voice', 'avec voix modifiée', 'con voz cambiada', 'بصوت مُغيَّر', 'değiştirilmiş sesle'],
  'info.soundNone': ['without sound', 'sans son', 'sin sonido', 'بلا صوت', 'sessiz'],
  'info.soundNoOrig': ['no sound in the original', 'pas de son dans l’original', 'el original no tenía sonido', 'لا صوت في الأصل', 'orijinalde ses yok'],
  'info.soundCopyFail': ['without sound (it could not be copied)', 'sans son (copie impossible)', 'sin sonido (no se pudo copiar)', 'بلا صوت (تعذّر النسخ)', 'sessiz (kopyalanamadı)'],
  'info.fast': ['fast export', 'export rapide', 'exportación rápida', 'تصدير سريع', 'hızlı dışa aktarma'],
  'info.standard': ['standard export', 'export standard', 'exportación estándar', 'تصدير عادي', 'standart dışa aktarma'],

  'err.load': ['The tool could not load in this browser. Try an up-to-date Chrome or Safari.', 'L’outil n’a pas pu se charger dans ce navigateur. Essayez une version à jour de Chrome ou Safari.', 'La herramienta no pudo cargarse en este navegador. Prueba con Chrome o Safari actualizados.', 'تعذّر تحميل الأداة في هذا المتصفح. جرّب إصدارًا حديثًا من Chrome أو Safari.', 'Araç bu tarayıcıda yüklenemedi. Güncel bir Chrome veya Safari deneyin.'],
  'err.reopen': ['This file can no longer be opened. Choose it again.', 'Ce fichier ne peut plus être ouvert. Choisissez-le de nouveau.', 'Este archivo ya no se puede abrir. Elígelo de nuevo.', 'لم يعد بالإمكان فتح هذا الملف. اخترْه مرة أخرى.', 'Bu dosya artık açılamıyor. Yeniden seçin.'],
  'err.reopenAll': ['A file could not be opened again. Choose the files again.', 'Un fichier n’a pas pu être rouvert. Choisissez de nouveau les fichiers.', 'No se pudo volver a abrir un archivo. Elige los archivos de nuevo.', 'تعذّر فتح أحد الملفات مرة أخرى. اختر الملفات من جديد.', 'Bir dosya yeniden açılamadı. Dosyaları tekrar seçin.'],
  'err.firefoxAndroid': ['Firefox on Android cannot process videos. Open this site in Chrome. Photos work here.', 'Firefox sur Android ne peut pas traiter les vidéos. Ouvrez ce site dans Chrome. Les photos fonctionnent ici.', 'Firefox en Android no puede procesar vídeos. Abre este sitio en Chrome. Las fotos funcionan aquí.', 'متصفح Firefox على أندرويد لا يستطيع معالجة الفيديو. افتح هذا الموقع في Chrome. الصور تعمل هنا.', 'Android’de Firefox videoları işleyemez. Bu siteyi Chrome’da açın. Fotoğraflar burada çalışır.'],
  'err.read': ['Your browser cannot read this file. Try another browser, or save it in another format.', 'Votre navigateur ne peut pas lire ce fichier. Essayez un autre navigateur, ou enregistrez-le dans un autre format.', 'Tu navegador no puede leer este archivo. Prueba con otro navegador o guárdalo en otro formato.', 'لا يستطيع متصفحك قراءة هذا الملف. جرّب متصفحًا آخر أو احفظه بصيغة أخرى.', 'Tarayıcınız bu dosyayı okuyamıyor. Başka bir tarayıcı deneyin veya dosyayı başka bir biçimde kaydedin.'],
  'err.heic': ['This browser cannot open HEIC photos. Use Safari, or convert the photo to JPEG first.', 'Ce navigateur ne peut pas ouvrir les photos HEIC. Utilisez Safari, ou convertissez d’abord la photo en JPEG.', 'Este navegador no puede abrir fotos HEIC. Usa Safari o convierte antes la foto a JPEG.', 'لا يستطيع هذا المتصفح فتح صور HEIC. استخدم Safari أو حوّل الصورة إلى JPEG أولًا.', 'Bu tarayıcı HEIC fotoğrafları açamıyor. Safari kullanın veya fotoğrafı önce JPEG’e dönüştürün.'],
  'err.analysis': ['Analysis failed in this browser. Try an up-to-date Chrome or Safari.', 'L’analyse a échoué dans ce navigateur. Essayez une version à jour de Chrome ou Safari.', 'El análisis falló en este navegador. Prueba con Chrome o Safari actualizados.', 'فشل التحليل في هذا المتصفح. جرّب إصدارًا حديثًا من Chrome أو Safari.', 'Analiz bu tarayıcıda başarısız oldu. Güncel bir Chrome veya Safari deneyin.'],
  'err.noFrames': ['This browser cannot display this video’s frames, so it cannot find the faces. Try an up-to-date Chrome or Safari.', 'Ce navigateur ne peut pas afficher les images de cette vidéo, il ne peut donc pas trouver les visages. Essayez une version à jour de Chrome ou Safari.', 'Este navegador no puede mostrar los fotogramas de este vídeo, así que no puede encontrar los rostros. Prueba con Chrome o Safari actualizados.', 'لا يستطيع هذا المتصفح عرض إطارات هذا الفيديو، لذا لا يمكنه إيجاد الوجوه. جرّب إصدارًا حديثًا من Chrome أو Safari.', 'Bu tarayıcı videonun karelerini gösteremiyor, bu yüzden yüzleri bulamıyor. Güncel bir Chrome veya Safari deneyin.'],
  'err.skipped': ['{n} of {total} files could not be processed and were skipped.', '{n} fichiers sur {total} n’ont pas pu être traités et ont été ignorés.', '{n} de {total} archivos no se pudieron procesar y se omitieron.', 'تعذّرت معالجة {n} من {total} ملفات وتم تخطّيها.', '{total} dosyanın {n} tanesi işlenemedi ve atlandı.'],
  'err.photo': ['This browser could not create the photo.', 'Ce navigateur n’a pas pu créer la photo.', 'Este navegador no pudo crear la foto.', 'تعذّر على هذا المتصفح إنشاء الصورة.', 'Bu tarayıcı fotoğrafı oluşturamadı.'],
  'err.fastFail': ['Fast export did not work here. Tap Export again: the video will be made at normal speed.', 'L’export rapide n’a pas fonctionné ici. Touchez de nouveau Exporter : la vidéo sera créée à vitesse normale.', 'La exportación rápida no funcionó aquí. Toca Exportar de nuevo: el vídeo se creará a velocidad normal.', 'لم ينجح التصدير السريع هنا. المس «تصدير» مرة أخرى: سيُنشأ الفيديو بسرعة عادية.', 'Hızlı dışa aktarma burada çalışmadı. Dışa aktar’a tekrar dokunun: video normal hızda oluşturulacak.'],
  'err.noVideoSupport': ['This browser cannot create videos. Try an up-to-date Chrome or Safari.', 'Ce navigateur ne peut pas créer de vidéos. Essayez une version à jour de Chrome ou Safari.', 'Este navegador no puede crear vídeos. Prueba con Chrome o Safari actualizados.', 'لا يستطيع هذا المتصفح إنشاء الفيديو. جرّب إصدارًا حديثًا من Chrome أو Safari.', 'Bu tarayıcı video oluşturamıyor. Güncel bir Chrome veya Safari deneyin.'],
  'err.videoFail': ['Creating the video failed in this browser. Try an up-to-date Chrome or Safari.', 'La création de la vidéo a échoué dans ce navigateur. Essayez une version à jour de Chrome ou Safari.', 'La creación del vídeo falló en este navegador. Prueba con Chrome o Safari actualizados.', 'فشل إنشاء الفيديو في هذا المتصفح. جرّب إصدارًا حديثًا من Chrome أو Safari.', 'Video oluşturma bu tarayıcıda başarısız oldu. Güncel bir Chrome veya Safari deneyin.'],
  'err.iosVideo': ['No video received: the iPhone photo library does not always pass them on. Save the video to Files (Share, then “Save to Files”), then tap the square and “Choose File”.', 'Aucune vidéo reçue : la photothèque de l’iPhone ne les transmet pas toujours. Enregistrez la vidéo dans Fichiers (Partager, puis « Enregistrer dans Fichiers »), puis touchez le carré et « Choisir un fichier ».', 'No se recibió ningún vídeo: la fototeca del iPhone no siempre los transmite. Guarda el vídeo en Archivos (Compartir y «Guardar en Archivos») y luego toca el cuadrado y «Elegir archivo».', 'لم يصل أي فيديو: مكتبة صور الآيفون لا تمرّرها دائمًا. احفظ الفيديو في «الملفات» (مشاركة ثم «حفظ في الملفات»)، ثم المس المربع و«اختيار ملف».', 'Video alınamadı: iPhone fotoğraf kitaplığı videoları her zaman iletmez. Videoyu Dosyalar’a kaydedin (Paylaş, ardından “Dosyalar’a Kaydet”), sonra kareye ve “Dosya Seç”e dokunun.'],
};

const SUPPORTED = new Set(ORDER);
export let lang = 'en';

export function pickLang(search = location.search, prefs = navigator.languages || [navigator.language]) {
  const asked = new URLSearchParams(search).get('lang');
  if (asked && SUPPORTED.has(asked)) return asked;
  for (const p of prefs) {
    const code = String(p || '').toLowerCase().split('-')[0];
    if (SUPPORTED.has(code)) return code;
  }
  return 'en';
}

export function register(extra) {
  Object.assign(dictionary, extra);
}

export function t(key, vars) {
  const row = dictionary[key];
  const text = row ? row[ORDER.indexOf(lang)] || row[0] : key;
  return vars ? text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : text;
}

export function applyStatic(root = document) {
  for (const el of root.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);
  for (const el of root.querySelectorAll('[data-i18n-html]')) el.innerHTML = t(el.dataset.i18nHtml);
  for (const [attr, name] of [['title', 'i18nTitle'], ['aria-label', 'i18nAria'], ['alt', 'i18nAlt'], ['content', 'i18nContent']]) {
    for (const el of root.querySelectorAll(`[data-${name.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())}]`)) el.setAttribute(attr, t(el.dataset[name]));
  }
}

export function setLang(code, { explicit = false } = {}) {
  lang = SUPPORTED.has(code) ? code : 'en';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  applyStatic();
  const links = document.querySelectorAll('a[href]');
  const keep = explicit || new URLSearchParams(location.search).has('lang');
  for (const a of links) {
    const href = a.getAttribute('href');
    if (!/^(how|verify|legal)\.html|^\.\/$/.test(href.split('?')[0].split('#')[0]) && href !== './') continue;
    const [base, hash] = href.split('#');
    const clean = base.split('?')[0];
    a.setAttribute('href', (keep ? `${clean}?lang=${lang}` : clean) + (hash ? '#' + hash : ''));
  }
}

export function mountSwitcher(select) {
  select.replaceChildren(...ORDER.map((code) => Object.assign(document.createElement('option'), { value: code, textContent: LANGS[code] })));
  select.value = lang;
  select.addEventListener('change', () => {
    const u = new URL(location.href);
    u.searchParams.set('lang', select.value);
    history.replaceState(null, '', u);
    setLang(select.value, { explicit: true });
    select.dispatchEvent(new CustomEvent('langchange', { bubbles: true }));
  });
}

export function initPage() {
  setLang(pickLang());
}
