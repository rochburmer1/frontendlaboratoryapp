# Frontend Laboratory App

Projekt zaliczeniowy wykonany w ramach laboratoriów. Aplikacja Next.js z integracją Firebase (Auth & Firestore).

## 👤 Autor
**Imię i Nazwisko:** Roch Burmer
**Nr albumu:** 15268
**Temat projektu:** Temat 3 – Komponent tabeli z funkcjami sortowania i collapse (zwijania wierszy).

## 🚀 Wersja Live (Demo)
Aplikacja jest dostępna pod adresem:
https://frontendlaboratoryapp-rho.vercel.app

## 🛠 Funkcjonalności
- **Logowanie i Rejestracja:** Pełna autoryzacja przez Firebase Auth.
- **Profil Użytkownika:** Możliwość zmiany danych i weryfikacji e-maila.
- **Inteligentna Tabela (Temat 3):** Sortowanie, filtrowanie i grupowanie wierszy (algorytm collapse).
- **Artykuły:** Pobieranie danych dynamicznych z bazy Firestore.
- **Responsive Design:** Dostosowanie do urządzeń mobilnych (Sidebar/Navbar).

## ⚙️ Technologie
- Next.js 16
- React 19
- Tailwind CSS 4
- Firebase (Auth, Firestore)
- Playwright (Testy E2E)

- ## 🚀 Uruchomienie lokalne

Aby uruchomić projekt na własnym komputerze:

1.  **Sklonuj repozytorium:**
    ```bash
    git clone [https://github.com/rochburmer1/frontendlaboratoryapp.git](https://github.com/rochburmer1/frontendlaboratoryapp.git)
    ```

2.  **Zainstaluj zależności:**
    ```bash
    npm install
    ```
    *(Jeśli wystąpią błędy wersji, użyj flagi `--legacy-peer-deps`)*

3.  **Skonfiguruj zmienne środowiskowe:**
    Utwórz plik `.env.local` i wklej klucze Firebase:
    ```env
    NEXT_PUBLIC_API_KEY=twoj_klucz
    NEXT_PUBLIC_AUTH_DOMAIN=twoja_domena
    NEXT_PUBLIC_PROJECT_ID=twoje_id
    ...
    ```

4.  **Uruchom serwer deweloperski:**
    ```bash
    npm run dev
    ```

5.  **Uruchom testy (opcjonalnie):**
    ```bash
    npx playwright test
    ```
