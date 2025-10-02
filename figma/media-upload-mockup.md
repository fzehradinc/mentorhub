# MentorHub - Media Upload UI/UX Mockup

## 📱 Mobil-First Tasarım (375px)

### Avatar Upload Modal
```
┌─────────────────────────────────────┐
│ ✕                    Avatar Yükle   │
├─────────────────────────────────────┤
│                                     │
│     ┌─────────────────────────┐     │
│     │                         │     │
│     │    📷 Profil Fotoğrafı   │     │
│     │                         │     │
│     │   İlk izlenim çok        │     │
│     │   önemli 🌟             │     │
│     │                         │     │
│     └─────────────────────────┘     │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📁 Dosya Seç                │    │
│  └─────────────────────────────┘    │
│                                     │
│  💡 Kare format (1:1)               │
│  📏 Minimum 400×400px               │
│  📦 Maksimum 2MB                    │
│  🎨 JPG, PNG, WebP                 │
│                                     │
├─────────────────────────────────────┤
│           [İptal] [Yükle]           │
└─────────────────────────────────────┘
```

### Cover Upload Modal
```
┌─────────────────────────────────────┐
│ ✕                 Kapak Görseli     │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │  🎨 Kapak Görseli (16:9)        │ │
│ │                                 │ │
│ │  Kendi sahneni hazırla 🎨       │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📁 Dosya Seç                │    │
│  └─────────────────────────────┘    │
│                                     │
│  💡 Geniş format (16:9)             │
│  📏 Minimum 1280×720px              │
│  📦 Maksimum 5MB                    │
│  🎨 JPG, PNG, WebP                 │
│                                     │
├─────────────────────────────────────┤
│           [İptal] [Yükle]           │
└─────────────────────────────────────┘
```

### Video Upload Modal
```
┌─────────────────────────────────────┐
│ ✕              Tanıtım Videosu      │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │     ▶️ Tanıtım Videosu          │ │
│ │                                 │ │
│ │   Kendi hikayeni paylaş 🎥      │ │
│ │   (opsiyonel)                   │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🎬 Video Seç                │    │
│  └─────────────────────────────┘    │
│                                     │
│  💡 MP4 format                      │
│  ⏱️ 15 saniye - 2 dakika            │
│  📦 Maksimum 200MB                  │
│  🎥 Minimum 720p                    │
│                                     │
├─────────────────────────────────────┤
│           [İptal] [Yükle]           │
└─────────────────────────────────────┘
```

## 🖥️ Desktop Tasarım (1024px+)

### Media Upload Step (Wizard içinde)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Medya & Bio - Adım 5/6                            │
│                    "Görseller ve hikâyen ikna eder."                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐  ┌─────────────────────────────────────────────┐  │
│  │                     │  │                                             │  │
│  │   📷 Avatar         │  │  🎨 Kapak Görseli                          │  │
│  │   (Zorunlu)         │  │  (Opsiyonel)                               │  │
│  │                     │  │                                             │  │
│  │  ┌─────────────┐    │  │  ┌─────────────────────────────────────┐   │  │
│  │  │             │    │  │  │                                     │   │  │
│  │  │   Önizleme  │    │  │  │         Önizleme                    │   │  │
│  │  │             │    │  │  │                                     │   │  │
│  │  └─────────────┘    │  │  └─────────────────────────────────────┘   │  │
│  │                     │  │                                             │  │
│  │  [📁 Dosya Seç]     │  │  [📁 Dosya Seç]                            │  │
│  │                     │  │                                             │  │
│  └─────────────────────┘  └─────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  🎥 Tanıtım Videosu (Opsiyonel)                                    │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                             │   │   │
│  │  │                    ▶️ Video Önizleme                        │   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  [🎬 Video Seç] [🔗 YouTube/Vimeo Link]                            │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                        [⬅ Geri] [Devam Et ➡]                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📊 Upload Progress States

### Loading State
```
┌─────────────────────────────────────┐
│  📤 Yükleniyor...                   │
│                                     │
│  ████████████░░░░░░░░ 65%           │
│                                     │
│  Avatar işleniyor...                │
│  Tahmini süre: 15 saniye            │
└─────────────────────────────────────┘
```

### Success State
```
┌─────────────────────────────────────┐
│  ✅ Başarıyla yüklendi!             │
│                                     │
│  ┌─────────────┐                    │
│  │             │                    │
│  │  Önizleme   │                    │
│  │             │                    │
│  └─────────────┘                    │
│                                     │
│  [🔄 Değiştir] [❌ Sil]             │
└─────────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────────┐
│  ❌ Yükleme başarısız               │
│                                     │
│  Dosya çok büyük (3.2MB)            │
│  Maksimum boyut: 2MB                │
│                                     │
│  [🔄 Tekrar Dene]                   │
└─────────────────────────────────────┘
```

## 🎨 Tasarım Token'ları

### Renkler
```css
:root {
  --upload-primary: #2563eb;
  --upload-success: #10b981;
  --upload-error: #ef4444;
  --upload-warning: #f59e0b;
  --upload-bg: #f8fafc;
  --upload-border: #e2e8f0;
  --upload-text: #1e293b;
  --upload-muted: #64748b;
}
```

### Spacing
```css
.upload-container { padding: 24px; }
.upload-section { margin-bottom: 32px; }
.upload-field { margin-bottom: 16px; }
.upload-button { min-height: 44px; padding: 12px 24px; }
```

### Typography
```css
.upload-title { font-size: 1.5rem; font-weight: 600; }
.upload-subtitle { font-size: 1rem; color: var(--upload-muted); }
.upload-helper { font-size: 0.875rem; color: var(--upload-muted); }
.upload-error { font-size: 0.875rem; color: var(--upload-error); }
```

## 📐 Component Specifications

### Upload Button
- **Boyut**: 44px minimum yükseklik
- **Padding**: 12px vertical, 24px horizontal
- **Border Radius**: 12px
- **Focus Ring**: 2px blue outline
- **Hover State**: Scale 1.02, shadow artışı

### Preview Container
- **Avatar**: 120×120px circle
- **Cover**: 320×180px rectangle (16:9)
- **Video**: 320×180px with play overlay
- **Border**: 2px dashed gray (empty), 2px solid blue (filled)

### Progress Bar
- **Height**: 8px
- **Background**: Light gray
- **Fill**: Blue gradient
- **Animation**: Smooth width transition
- **Text**: Percentage + estimated time

### Error Messages
- **Background**: Light red
- **Border**: Red
- **Icon**: Warning triangle
- **Text**: Red, 14px
- **Action**: Retry button

---

**Figma Export Boyutları**:
- Mobile: 375×812px
- Tablet: 768×1024px  
- Desktop: 1440×900px

**Component Library**: Buttons, inputs, progress bars, modals
**Interaction States**: Default, hover, focus, loading, success, error