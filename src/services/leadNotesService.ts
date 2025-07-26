// Lead notları servisi - mock veriler kullanır
// Gerçek uygulamada bu Supabase veya başka bir backend ile entegre olacaktır

// Lead notu ekleme
export const addLeadNote = async (noteData: {
  leadId: string;
  userName?: string;
  userPosition?: string;
  noteType: string;
  content: string;
  interactionChannel?: string;
  interactionDuration?: number;
  followUpRequired?: boolean;
  followUpDate?: string;
  isPrivate?: boolean;
}) => {
  try {
    console.log('Adding lead note:', noteData);
    
    // Mock başarılı yanıt
    await new Promise(resolve => setTimeout(resolve, 800)); // Simüle edilmiş gecikme
    
    // Yeni not objesi oluştur
    const newNote = {
      id: `note_${Date.now()}`,
      leadId: noteData.leadId,
      userId: 'current-user-id',
      userName: noteData.userName || 'Kullanıcı',
      userPosition: noteData.userPosition || 'Pozisyon',
      noteType: noteData.noteType,
      content: noteData.content,
      interactionChannel: noteData.interactionChannel,
      interactionDuration: noteData.interactionDuration,
      followUpRequired: noteData.followUpRequired,
      followUpDate: noteData.followUpDate,
      isPrivate: noteData.isPrivate,
      createdAt: new Date().toISOString()
    };
    
    // Mevcut notları localStorage'dan al
    let existingNotes = [];
    const storedNotes = localStorage.getItem('lead_notes');
    if (storedNotes) {
      existingNotes = JSON.parse(storedNotes);
    }
    
    // Yeni notu ekle
    existingNotes.push(newNote);
    
    // Güncellenmiş notları localStorage'a kaydet
    localStorage.setItem('lead_notes', JSON.stringify(existingNotes));
    
    return { 
      success: true, 
      data: newNote, 
      error: null 
    };
  } catch (error) {
    console.error('Error adding lead note:', error);
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Lead notu eklenirken bir hata oluştu.' 
    };
  }
};

// Lead notlarını getir
export const getLeadNotes = async (leadId: string, options?: {
  limit?: number;
  offset?: number;
  includePrivate?: boolean;
}) => {
  try {
    console.log('Getting lead notes for lead ID:', leadId);
    
    // Mock veri
    await new Promise(resolve => setTimeout(resolve, 500)); // Simüle edilmiş gecikme
    
    const mockNotes = [
      {
        id: 'note_1',
        leadId: leadId,
        userId: 'user_1',
        userName: 'Fatma Yılmaz',
        userPosition: 'Satış Temsilcisi',
        noteType: 'Telefon Görüşmesi',
        content: 'Müşteri ile 15 dakikalık bir telefon görüşmesi yaptım. Kalp cerrahisi hakkında detaylı bilgi istediler. Fiyat aralığı ve tedavi süreci hakkında bilgi verdim. Çok ilgililer, yakında karar vereceklerini söylediler.',
        interactionChannel: 'phone',
        interactionDuration: 15,
        followUpRequired: true,
        followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 gün sonra
        isPrivate: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 saat önce
      },
      {
        id: 'note_2',
        leadId: leadId,
        userId: 'user_1',
        userName: 'Fatma Yılmaz',
        userPosition: 'Satış Temsilcisi',
        noteType: 'WhatsApp Görüşmesi',
        content: 'Müşteri WhatsApp üzerinden bazı sorular sordu. Tedavi sonrası iyileşme süreci ve konaklama seçenekleri hakkında bilgi verdim. Ayrıca örnek hasta fotoğrafları istediler, gerekli izinleri alarak birkaç örnek gönderdim.',
        interactionChannel: 'whatsapp',
        interactionDuration: 10,
        followUpRequired: false,
        isPrivate: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 gün önce
      },
      {
        id: 'note_3',
        leadId: leadId,
        userId: 'user_2',
        userName: 'Dr. Mehmet Özkan',
        userPosition: 'Kardiyoloji Uzmanı',
        noteType: 'Tedavi Bilgisi',
        content: 'Hastanın gönderdiği test sonuçlarını inceledim. Bypass ameliyatı için uygun aday. Detaylı tedavi planı hazırladım ve fiyat teklifi için satış ekibine ilettim.',
        interactionChannel: 'email',
        followUpRequired: true,
        followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 gün sonra
        isPrivate: true,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12 saat önce
      }
    ];
    
    // Özel notları filtrele (eğer gerekiyorsa)
    const filteredNotes = options?.includePrivate 
      ? mockNotes 
      : mockNotes.filter(note => !note.isPrivate);
    
    // LocalStorage'dan notları al
    let storedNotes = [];
    const storedNotesData = localStorage.getItem('lead_notes');
    if (storedNotesData) {
      try {
        const parsedNotes = JSON.parse(storedNotesData);
        // Bu lead'e ait notları filtrele
        storedNotes = parsedNotes.filter(note => note.leadId === leadId);
        
        // Özel notları filtrele (eğer gerekiyorsa)
        if (!options?.includePrivate) {
          storedNotes = storedNotes.filter(note => !note.isPrivate);
        }
        
        // Tarihe göre sırala (en yeniler üstte)
        storedNotes.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } catch (e) {
        console.error('Error parsing stored notes:', e);
      }
    }
    
    // Eğer localStorage'da not varsa onları kullan, yoksa mock notları kullan
    const notesToReturn = storedNotes.length > 0 ? storedNotes : filteredNotes;
    
    return {
      success: true,
      data: notesToReturn,
      total: notesToReturn.length,
      error: null
    };
  } catch (error) {
    console.error('Error getting lead notes:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Lead notları alınırken bir hata oluştu.',
      data: [],
      total: 0
    };
  }
};

// Lead notu güncelle
export const updateLeadNote = async (noteId: string, noteData: {
  noteType?: string;
  content?: string;
  interactionChannel?: string;
  interactionDuration?: number;
  followUpRequired?: boolean;
  followUpDate?: string;
  isPrivate?: boolean;
}) => {
  try {
    console.log('Updating lead note:', noteId, noteData);
    
    // Mock başarılı yanıt
    await new Promise(resolve => setTimeout(resolve, 800)); // Simüle edilmiş gecikme
    
    // LocalStorage'dan notları al
    let existingNotes = [];
    const storedNotes = localStorage.getItem('lead_notes');
    if (storedNotes) {
      existingNotes = JSON.parse(storedNotes);
    }
    
    // Güncellenecek notu bul
    const noteIndex = existingNotes.findIndex(note => note.id === noteId);
    
    if (noteIndex >= 0) {
      // Notu güncelle
      existingNotes[noteIndex] = {
        ...existingNotes[noteIndex],
        ...noteData,
        updatedAt: new Date().toISOString()
      };
      
      // Güncellenmiş notları localStorage'a kaydet
      localStorage.setItem('lead_notes', JSON.stringify(existingNotes));
      
      return { 
        success: true, 
        data: existingNotes[noteIndex], 
        error: null 
      };
    } else {
      return { 
        success: false, 
        error: 'Not bulunamadı' 
      };
    }
  } catch (error) {
    console.error('Error updating lead note:', error);
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Lead notu güncellenirken bir hata oluştu.' 
    };
  }
};

// Lead notu sil
export const deleteLeadNote = async (noteId: string) => {
  try {
    console.log('Deleting lead note:', noteId);
    
    // Mock başarılı yanıt
    await new Promise(resolve => setTimeout(resolve, 800)); // Simüle edilmiş gecikme
    
    // LocalStorage'dan notları al
    let existingNotes = [];
    const storedNotes = localStorage.getItem('lead_notes');
    if (storedNotes) {
      existingNotes = JSON.parse(storedNotes);
    }
    
    // Silinecek notu filtrele
    const updatedNotes = existingNotes.filter(note => note.id !== noteId);
    
    // Güncellenmiş notları localStorage'a kaydet
    localStorage.setItem('lead_notes', JSON.stringify(updatedNotes));
    
    return { 
      success: true, 
      error: null 
    };
  } catch (error) {
    console.error('Error deleting lead note:', error);
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Lead notu silinirken bir hata oluştu.' 
    };
  }
};

// Not tiplerini getir
export const getNoteTypes = async () => {
  try {
    console.log('Getting note types');
    
    // Mock veri
    const mockNoteTypes = [
      { id: '1', name: 'Telefon Görüşmesi', description: 'Telefon üzerinden yapılan görüşme notları', color: 'blue', icon: 'phone', isActive: true },
      { id: '2', name: 'WhatsApp Görüşmesi', description: 'WhatsApp üzerinden yapılan görüşme notları', color: 'green', icon: 'message-circle', isActive: true },
      { id: '3', name: 'E-posta Yazışması', description: 'E-posta üzerinden yapılan yazışma notları', color: 'purple', icon: 'mail', isActive: true },
      { id: '4', name: 'Yüz Yüze Görüşme', description: 'Yüz yüze yapılan görüşme notları', color: 'orange', icon: 'users', isActive: true },
      { id: '5', name: 'Video Görüşme', description: 'Video konferans üzerinden yapılan görüşme notları', color: 'red', icon: 'video', isActive: true },
      { id: '6', name: 'Tedavi Bilgisi', description: 'Tedavi detayları ve tıbbi bilgiler', color: 'teal', icon: 'activity', isActive: true },
      { id: '7', name: 'Fiyat Teklifi', description: 'Verilen fiyat teklifleri ve detayları', color: 'green', icon: 'dollar-sign', isActive: true },
      { id: '8', name: 'Seyahat Planı', description: 'Seyahat ve konaklama detayları', color: 'blue', icon: 'plane', isActive: true },
      { id: '9', name: 'Takip Notu', description: 'Genel takip notları', color: 'gray', icon: 'file-text', isActive: true },
      { id: '10', name: 'Diğer', description: 'Diğer kategorilere uymayan notlar', color: 'gray', icon: 'more-horizontal', isActive: true }
    ];
    
    return {
      success: true,
      data: mockNoteTypes,
      error: null
    };
  } catch (error) {
    console.error('Error getting note types:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Not tipleri alınırken bir hata oluştu.',
      data: []
    };
  }
};