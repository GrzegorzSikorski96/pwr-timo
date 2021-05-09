# Teoria i metody optymalizacji

### Autor

Inż. Grzegorz Sikorski\
Automatyka i robotyka, studia stacjonarne II stopnia\
Wydział Elektroniki, Politechnika Wrocławska

### Prowadząca

Dr inż. Ewa Szlachcic

### Projekt

**Temat:** Algorytm dwufazowy simpleks dla wektora x rzeczywistego – dla liniowego zadania PL\
**Założenia:**\
n ≤ 5, m ≤ 5\
Funkcja celu: max x<sub>0</sub> = C<sup>T</sup>x\
Ograniczenia: A<sub>1</sub> x ≤ b, A<sub>2</sub> x ≥b\
x ∈ R<sup>n</sup>

### Aplikacja

Aplikacja rozwiązuje zadanie liniowego programowania w oparciu o dwufazowy algorytm simpleks. Po kliknięciu przycisku
**WCZYTAJ TESTOWE**, program załaduje przykładowe dane do aplikacji. Aby wczytać inne dane, należy ponownie kliknąć
przycisk bądź wprowadzić dane ręcznie. Jako wynik zwracane są poszczególne iteracje rozwiązywania zadania oraz
informacja o wyniku algorytmu.

### Struktura aplikacji

Odpowiednie funkcje związane z algorytmem znajdują się w plikach .js znajdujących się w katalogu src/helpers. Nazwy
plików odpowiadają czynnościami, za które odpowiedzialne są w nich zawarte funkcje. W plikach z rozszerzeniem .vue
znajdują się pliki zawierające interfejs aplikacji. W pliku Home.vue, poza interfejsem są umieszczone także podstawowe
funkcje.

* cases.js — funkcje odpowiedzialne za rozpoznawanie przypadków
* examples.js — funkcje oraz dane związane z przykładowymi danymi
* gaussian.js — funkcje związane z przekształceniem Gaussa
* matrix.js — funkcje związane z obsługą macierzy
* simplex.js — funkcje związane z algorytmem simplex

## Uruchomienie

W katalogu dist otworzyć w przeglądarce plik index.html

## Dalszy rozwój aplikacji

### Instalacja zależności

```
npm install
```

### Uruchomienie lokalnego serwera

```
npm run serve
```

### Kompilacja i minifikacja kodu przeznaczonego do publikacji

```
npm run build
```
