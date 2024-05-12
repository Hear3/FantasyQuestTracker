# Fantasy Quest Tracker

## Design

**Figma:** [Projekt](https://www.figma.com/file/FEFe6yD64K6KuKz90uXfLe/Fantasy-Quest-Tracker?type=design&node-id=0%3A1&mode=design&t=6zo3D0WPmgNciwgn-1)

## Opis aplikacji

Fantasy Quest Tracker to aplikacja oparta o framework Vue.js 3, która łączy w sobie funkcjonalność tradycyjnego task managera z elementami gry RPG. Użytkownicy mogą tworzyć i zarządzać listami zadań, śledzić swoje postępy, rozwijać swoją postać zdobywając kolejne poziomy i uzbrajając postać w zakupiony w sklepie ekwipunek.

## Widoki

> - Widok logowania i rejestracji
> - Widok strony głównej (widok zadań)
> - Widok postaci użytkownika
> - Widok formularza dodawania zadania
> - Widok sklepu z przedmiotami
> - Widok histori zadań

## Funkcje aplikacji

> - Logowanie do serwisu
> - Rejestracja konta użytkownika
> - Konfiguracja konta użytkownika
>   - Kustomizacja Postaci
> - **Quest Tracker**
>   - Widok informacji o postaci i jej aktualny wygląd.
>   - Widok aktualnie posiadanych zadań, wraz z ich podsumowaniem
>   - Możliwość wypełniania zadań
> - **Item Shop**
>   - Widok aktualnie możliwych do zakupienia przez użtkownika przedmiotów
>   - Możliwość wydawania waluty w aplikacji na przedmioty
>   - Podgląd na aktualnie posiadane przedmioty

## Opis techniczny

> - Vue3
> - Vue Router
> - Composition API
> - VueX
> - API Firebase Authenticator
> - Firebase Firestore Database
> - Ekrany:
>   - Home - Aktualne questy + wyposażona postać gracza + statystyki
>   - History - Historia z listą wypełnionych zadań przez użytkownika
>   - Item Merchant - Sklep z przedmiotami + widok aktualnego ekwipunku
>   - Add Quest - Formularz dodawania zadań przez gracza
>   - Character - Modularna postać gracza z możliwością customizacji wygladu
>   - SingIn/SingOut/Register - Uwierzytelniane z użyciem kont email i google
