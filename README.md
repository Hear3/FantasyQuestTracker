# Fantasy Quest Tracker

## Design
**Figma:** [Projekt](https://www.figma.com/file/FEFe6yD64K6KuKz90uXfLe/Fantasy-Quest-Tracker?type=design&node-id=0%3A1&mode=design&t=6zo3D0WPmgNciwgn-1)

## Opis aplikacji
Fantasy Quest Tracker to aplikacja oparta o framework Vue.js 3, która łączy w sobie funkcjonalność tradycyjnego task managera z elementami gry RPG. Użytkownicy mogą tworzyć i zarządzać listami zadań, śledzić swoje postępy, rozwijać swoją postać zdobywając kolejne poziomy i uzbrajając postać w zakupiony w sklepie ekwipunek.

## Widoki
>   * Widok logowania i rejestracji
>   * Widok strony głównej (widok zadań)
>   * Widok postaci użytkownika
>   * Widok formularza dodawania zadania
>   * Widok sklepu z przedmiotami
    * Widok histori zadań

## Funkcje aplikacji
>   * Logowanie do serwisu
>   * Rejestracja konta użytkownika
>   * Konfiguracja konta użytkownika
>	* Kustomizacja Postaci
>   * **Quest Tracker**
>       * Widok informacji o postaci i jej aktualny wygląd.
>       * Wyszukiwarka zadań
>       * Widok aktualnie posiadanych zadań, wraz z ich podsumowaniem
>       * Możliwość przejścia do dokładnego opisu i edycji poszczególnych zadań
>		* Możliwość dodawania i edycji zadań
>   * **Item Shop**
>       * Widok aktualnie możliwych do zakupienia przez użtkownika przedmiotów
>		* Możliwość wydawania waluty w aplikacji na przedmioty, których wymagania spełnia nasza postać

##  Opis techniczny

    * Vue.js 
    * Vue Router
    * Composition API
    * VueX
    * API Firebase Authenticator
    * Firestore database
    * Ekrany:
        * Home - aktualne questy + wyposarzona postać gracza + statystyki 
        * History - prototyp dla prowadzenia histori osiągnięć użytkownika ( co i kiedy)
        * Item Merchant - podzielone na sklep z przedmiotami i ekwipunek na te które gracz już posiada
        * Add Quest - formulaż dodawania zadań przez gracza
        * Character - modularna postać gracza z możliwością customizacji wygladu
        * SingIn/SingOut 

