
# 📚 BookHaven

BookHaven è una piattaforma gestionale cloud per biblioteche, progettata per digitalizzare e semplificare tutte le attività di una biblioteca moderna. Offre funzionalità avanzate sia per utenti (studenti/ragazzi) che per lo staff, con un'interfaccia intuitiva e accessibile da qualsiasi dispositivo.

🌐 **Provala subito su:**
https://bookhaven-library.vercel.app

ℹ️ Il backend è deploiato su Render (modalità gratuita): dopo 20 minuti di inattività va in sleep mode, quindi al primo avvio potrebbe richiedere qualche minuto.

---

## 🔑 Accesso Amministratore

👩‍💼 **Le credenziali admin sono disponibili su richiesta o nel mio CV.**

---

## ✨ Funzionalità principali

### 👤 Area Utente
🎫 Account personale
 📝 Registrazione tramite staff
 🔐 Login sicuro (credenziali via email)
 📊 Dashboard con riepilogo dati

📚 Catalogo e ricerca
 🔍 Ricerca avanzata
 🏷️ Filtri per titolo, autore, categoria
 📖 Dettagli libro e disponibilità in tempo reale

📅 Prenotazioni
 🎯 Prenotazione libri
 📋 Gestione prenotazioni attive
 📜 Storico personale
 ⏰ Scadenze sempre sotto controllo

📰 Blog e comunicazioni
 📣 News, eventi, iniziative
 📦 Nuove acquisizioni
 📞 Contatti e info

### ⚙️ Area Staff e Amministrazione
📚 Gestione catalogo
 ➕ Inserimento nuovi libri
 📝 Modifica e aggiornamento
 🗂️ Gestione categorie
 📊 Monitoraggio disponibilità

👥 Gestione utenti
 ➕ Registrazione nuovi utenti
 🎫 Gestione tessere
 📝 Modifica dati
 🔑 Gestione permessi

📋 Gestione prenotazioni
 👁️ Monitoraggio prenotazioni
 ✅ Conferma/annullamento
 📦 Gestione restituzioni
 ⏰ Controllo scadenze

📰 Gestione contenuti
 ✍️ Pubblicazione articoli
 📣 News della biblioteca
 💌 Comunicazioni utenti
 ⭐ Avvisi importanti

---

## 🛠️ Stack tecnologico & servizi

🎨 **Frontend**
 ⚛️ React + Redux + Vite (hosting: Vercel)
 📱 Design responsive, UI moderna (Tailwind CSS, Bootstrap)

🔧 **Backend**
 ☕ Java Spring Boot (hosting: Render)
 🔒 JWT Authentication
 🔄 API REST

💾 **Database & Storage**
 🐘 PostgreSQL (gestito tramite Supabase)
 �️ Storage file/documenti su Supabase

📧 **Email**
 📨 Invio email automatiche (credenziali, notifiche) tramite SendGrid

⚙️ **DevOps & Cloud**
 � Docker
 🚀 Deploy automatico
 ☁️ Cloud-native: Vercel (frontend), Render (backend), Supabase (db/storage)

---


## 🚦 Guida rapida all’uso

👤 **Per utenti/studenti**
1. Accedi alla piattaforma dal link sopra.
2. Se non hai un account, chiedi la registrazione allo staff della biblioteca.
3. Dopo aver ricevuto le credenziali via email, effettua il login.
4. Esplora il catalogo, cerca libri, visualizza i dettagli e prenota con un click!
5. Consulta la tua dashboard per vedere lo storico e le prenotazioni attive.

🛠️ **Per staff/amministratori**
1. Accedi con le credenziali admin fornite sopra.
2. Gestisci utenti, catalogo libri, prenotazioni e articoli dal pannello amministrativo.
3. Aggiungi nuovi libri, modifica dati, pubblica news e monitora le attività della biblioteca.

💡 **Suggerimento:**
Puoi navigare liberamente tra le sezioni per vedere tutte le funzionalità, sia lato utente che staff!

---

## 📂 Struttura del progetto

```
bookhaven-library/
│
├── backend/         # Backend Java Spring Boot
│   ├── src/         # Codice sorgente Java
│   ├── pom.xml      # Configurazione Maven
│   └── Dockerfile   # Build container backend
│
├── frontend/        # Frontend React + Vite
│   ├── src/         # Codice sorgente React
│   ├── public/      # Asset statici e immagini
│   ├── package.json # Dipendenze e script npm
│   └── vite.config.js
│
├── README.md        # Questo file
└── ...
```

---

## ℹ️ Note utili

- Il backend può andare in sleep: attendi qualche minuto se la risposta è lenta al primo accesso.
- Le email (credenziali, notifiche) sono inviate tramite SendGrid.
- Tutti i dati e i file sono gestiti in cloud su Supabase.
- Il frontend è sempre attivo su Vercel.
- Le immagini degli autori sono gestite in automatico tramite l'api di Open Library

---

## 🚀 Il futuro di BookHaven

📊 Statistiche avanzate (in arrivo)
 📈 Analisi libri più richiesti
 👥 Monitoraggio utenti attivi
 📉 Trend di utilizzo

🔔 Sistema notifiche
 ⏰ Promemoria scadenze
 📢 Avvisi disponibilità
 📧 Comunicazioni smart

🤝 Community
 ⭐ Recensioni dei lettori
 💬 Commenti sugli articoli
 👥 Community attiva

---

🌟 BookHaven: la tua biblioteca, sempre con te 📚
