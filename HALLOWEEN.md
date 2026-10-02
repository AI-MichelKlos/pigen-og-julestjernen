# Halloween-udgaven: Pigen og Græskarlygten

En Halloween-tvilling til "Pigen og Julestjernen" i samme spil, så man kan vælge mellem Jul og Halloween.

- Indtil sidste skridt kan Halloween kun ses via linket med `?tema=halloween`:
  https://ai-michelklos.github.io/pigen-og-julestjernen/?tema=halloween
- Uden `?tema=halloween` skal juleudgaven se ud og virke præcis som før.
- Landskab, huse, tårn, stier, kælkebakke, kælkelift, kælkene på bakkerne og minikortet beholdes. Kun temaet skifter.
- Hyggelig uhygge for en 5-årig: venlige spøgelser, smilende græskar, flagermus, måneskin. Intet skræmmende.
- Jorden er dækket af efterårsblade. Kælkebakken og søen forklares med "den første frostnat" (rimfrost og is).
- Styring: kun piletaster og mellemrum.
- Alle tekster på dansk, enkle og uden tankestreg (brug bindestreg).
- Musik: kun frie melodier, lavet i koden som den nuværende musik.

## Plan

- [x] 1. Fundament: et tema-valg i koden (?tema=halloween), himmel, lys og tåge i orange og lilla med fuldmåne, ny musik. Titlen er "Pigen og Græskarlygten".
- [ ] 2. Jorden og naturen: efterårsblade på jorden i stedet for sne, ingen sne på træer og tage (eventuelt lidt rimfrost), faldende blade i stedet for snefnug, frost på søen og kælkebakken.
- [ ] 3. Lys og pynt: orange og lilla lyskæder, græskarlygter langs stien og ved husene, spindelvæv og anden pynt i stedet for julepynt.
- [ ] 4. Gaver og mål: de fem gaver bliver til noget halloween-agtigt (for eksempel slikposer eller græskar), julekuglerne bliver til noget andet at samle, julestjernen på tårnet bliver til en stor, smilende græskarlygte, og ikonerne øverst og på minikortet følger med.
- [ ] 5. Figurer: heksehatte på rævene og bæverne, nissevennen bliver til et lille venligt spøgelse, nisserne i byen bliver udklædte, julemandens kane bliver til en heks på kost, og hoppesnemændene bliver til hoppegræskar.
- [ ] 6. Aktiviteter: juletræet bliver til græskarlygter, der skal tændes, snemanden bliver til en fugleskræmsel, julekalenderen bliver til "slik eller ballade" ved husene, maden passer til Halloween, og julekortet bliver til et halloweenkort.
- [ ] 7. Lyd og tekster: gå alle tekster, beskeder, nissevennens replikker og lyde igennem, så intet nævner jul i Halloween-udgaven.
- [ ] 8. Afslutning: knapper på startskærmen til at vælge Jul eller Halloween, samlet afprøvning af begge udgaver, og læg det live.

## Noter til næste gang

### Skridt 1 (fundament) - færdigt 2. oktober 2026

Lavet:
- Tema-valg: et lille script i `<head>` sætter `window.TEMA` ('jul' eller 'halloween') og `<html data-tema="halloween">`. I spillets kode (CONFIG & UTIL) findes `HALLO` (sand i Halloween) og en separat generator `hrand()`/`hrr()` til Halloween-ting. Brug aldrig `rand()`/`rr()` til Halloween.
- Startskærm: små scripts lige efter `#start` og `#win` skifter titel, græskarbillede, tekst og "Glædelig halloween!". Farverne ligger i CSS-blokken `[data-tema=halloween]` i `<head>`.
- Himmel, lys og tåge (RENDERER & POST og SKY & LIGHT): lilla tåge (`FOG_COLOR`), orange bånd i horisonten (`HAZE_GLSL`), lilla himmel uden nordlys, stor varm fuldmåne mod nordvest (`MOON_DIR`, `R0` i himmel-shaderen), lilla himmellys, lavendel måneskin, stærkere orange skær fra vest, farvekorrektion (`GRADE`), lilla kant på sne og figurer (`snowify`, `addRim`, `RIM_U`), `PARTICLE_TINT` og bjergsilhuetter.
- Titelkameraet (MAIN LOOP, `GAME.state === 'title'`) kigger lidt højere op i Halloween, så fuldmånen ses. I selve spillet kigger kameraet nedad, så månen ses mest på titelskærmen.
- Musik (AUDIO, `makeHalloSongs`): "I Dovregubbens hal" (Grieg) under spillet og "Au clair de la lune" i mol som spilledåse på titelskærmen og ved målet. De har samme navne som julesangene ('jingle' og 'silent'), så resten af koden er uændret.

Mangler (kommer i de næste skridt):
- Der ligger stadig sne overalt, og det sner (skridt 2). Sneen bliver lilla i måneskinnet indtil da.
- Gaver, julekugler, julestjernen, figurer, pynt og alle beskeder i spillet er stadig jul (skridt 3 til 7).
- Startteksten lover heksehat, spøgelsesven, slikposer og hoppegræskar. Pigen bør derfor få en heksehat i stedet for nissehuen i skridt 5. Tjek teksten igen i skridt 7.
- Idé til skridt 3 eller 5: flagermus, der flyver hen over månen.

Afprøvning (se mappen `test/`):
- `bash test/prep.sh` laver `test/game.html` med three.js fra npm. Start en server i `test/` med `python3 -m http.server 8123 --bind 127.0.0.1`.
- `node test/shot.mjs game.html "?test&tema=halloween" billede.png [script.js]` tager et billede. Hvert billede tager 1 til 2 minutter.
- `test/fingerprint.js` måler verden og udseende. Lav en kopi af den gamle udgave med `git show HEAD:index.html > /tmp/gammel.html && bash test/prep.sh /tmp/gammel.html orig.html`, og kør scriptet på den gamle og den nye juleudgave (`?test`), én ad gangen: alle felter skal være ens. Halloween skal have samme `geo` som jul (så er landskabet uændret). Efter skridt 1 var juleudgaven helt ens med før.
- `test/titlecam.js` viser titelkameraet ved et fast tidspunkt, og `test/play.js` afprøver musikken.
