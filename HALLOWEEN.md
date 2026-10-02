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
- [x] 2. Jorden og naturen: efterårsblade på jorden i stedet for sne, ingen sne på træer og tage (eventuelt lidt rimfrost), faldende blade i stedet for snefnug, frost på søen og kælkebakken.
- [x] 3. Lys og pynt: orange og lilla lyskæder, græskarlygter langs stien og ved husene, spindelvæv og anden pynt i stedet for julepynt.
- [x] 4. Gaver og mål: de fem gaver bliver til noget halloween-agtigt (for eksempel slikposer eller græskar), julekuglerne bliver til noget andet at samle, julestjernen på tårnet bliver til en stor, smilende græskarlygte, og ikonerne øverst og på minikortet følger med.
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

### Skridt 2 (jorden og naturen) - færdigt 2. oktober 2026

Lavet:
- Efterårsblade: `makeLeafTex()` tegner en sømløs tekstur med bøg, ahorn og eg (TEXTURES & MATERIALS). `leafify()` lægger bladene på efter verdenspositionen, så de har samme størrelse på alle ting, og tilføjer rimfrost med glimmer. Terrænet (`buildTerrain`) får bladfarver, jord på stierne, grå sten på skrænterne og mudder ved søen. Attributten `aHal` styrer pr. hjørne, hvor tæt bladene ligger (x) og hvor meget rimfrost der er (y).
- Materialer (lige efter `M.snow`): `M.snowJul` er altid den oprindelige sne. I Halloween er `M.snow` blade (bunker ved fødderne af ting, puder på kasser, stubbe og platforme), `M.frost` tynd rimfrost (tårnets kanter, vindueskarme, skorstene, skilte, lygter), `M.thatch` stråtag på husenes tage, og `M.snowFig` hvid sne til snemænd, hoppesnemænd, snebolde og "Byg en snemand". I jul peger alle fire på det samme sne-materiale.
- Træer (`makeFirGeometry`): ingen sne. Sne-puderne er blevet lysere grønne grene med lidt rimfrost øverst. De runde træer (`round`) har fået efterårsløv i orange, rød, gul og brun (`AUT`). Buskene ved verdens kant er røde og orange.
- Istapperne på husene er skjult i Halloween (`visible = !HALLO`).
- Faldende blade i stedet for sne (`snowfall`, `LEAF_VS`/`LEAF_FS`): hvert fjerde punkt er et blad, der falder langsomt, svajer og vender sig.
- Hop og landinger hvirvler blade og lidt jordstøv op (`leafPuff`, `leafBits`). Fodsporene er brune.
- Den første frostnat: rimfrost på bakken øst og vest for tårnet, hvor man kælker, og ved søens bred. Søen er stadig is, og kælkebanen har stadig is i bunden og hvide frostkanter.
- Lyset er gjort lidt varmere: lysere måneskin og et brunt genskin fra bladene (`hemi`), så bladene ser orange ud i stedet for lilla.

Mangler (kommer i de næste skridt):
- Snemænd, hoppesnemænd, snebolde og "Byg en snemand" er stadig hvide (skridt 5 og 6).
- Isklods-søjlerne ved tårnet og kælkebanens hvide kanter er beholdt (de passer til frostnatten). Kan ændres, hvis de virker for vinteragtige.

### Skridt 3 (lys og pynt) - færdigt 2. oktober 2026

Lavet:
- Lyskæder (`bulbs`, `PAL`): i Halloween er de varme pærer orange, de røde lilla, de grønne limegrønne, de blå violette og de gyldne ravfarvede. Alle lyskæder følger med automatisk.
- Guirlander (`garlandGeo`) er efterårsblade i stedet for grangrene med sne. Kransene (`wreathMesh`) har små græskar og lilla kugler, og sløjferne er lilla (`M.bow`, `M.wBallA`, `M.wBallB`, `lanternRibbonMat`). I jul er det de samme materialer som før.
- Ny Halloween-pynt i WORLD DECOR (objektet `HD`, kun i Halloween): `pumpkinLantern()` (smilende græskarlygte med lysende ansigt), `cobweb()` (spindelvæv i et hjørne), `hangingSpider()` (venlig edderkop, der vipper i en tråd) og papirflagermus (`HD.batGeo`).
- Hyggehusene (`cozyHouse`): tre græskarlygter ved trappen, spindelvæv i begge hjørner under tagskægget, en edderkop ved stuehuset og en papirflagermus i hvert vindue. Inde: et lille græskar i toppen af juletræet i stedet for stjernen, små græskar i stedet for gaver og på kaminhylden i stedet for kravlenisser og julesokker.
- Tårnet (`buildTower`): græskarlygter ved døren og spindelvæv i hjørnerne ved soklen.
- Kontrolpost-lygterne (`addLantern`): lille spindelvæv mellem pæl og arm.
- Græskarlygter langs stien fra byen til tårnet og rundt om pladsen i byen (blokken lige før `bulbs.finish()`). De står ved siden af stien, kun hvor der er frit, og har ingen kollision. Der blev 20 i alt.
- Bolsjestokkene ved kælkebanen og kælkeliften er orange og lilla (`CANE_A`, `CANE_B`, `CANE_TOP`), og bannerne KÆLKEBAKKEN og KÆLKELIFT har orange og lilla vimpler (`BAN_A`, `BAN_SH`, `BAN_TX`).

Mangler (kommer i de næste skridt):
- Det store juletræ i byen (stjerne, julehjerter og flag) hører til skridt 6. Gavekasserne, julekuglerne og julestjernen på tårnet hører til skridt 4. Nisserne hører til skridt 5.

### Skridt 4 (gaver og mål) - færdigt 2. oktober 2026

Lavet:
- De fem gaver er slikposer (COLLECTIBLES, `makeCandyBag`, `HALLO_BAG`): runde papirposer, bundet sammen med bånd og sløjfe, med prikker, striber, flagermus, små spøgelser eller zigzag. Farverne (`HALLO_BAG_COL`) bruges også i de fem felter øverst og på minikortet.
- Gavekasserne (de kasser, man hopper på for at få mønter) har lilla papir med flagermus og orange bånd (`blockTex('gift')`).
- Julekuglerne er bolsjer i papir (`BAUBLE_COLORS`, `candyEndGeo`, `candyWrapMats`, `candyStripeMat`) i orange, limegrøn, lilla, gul, lyserød og turkis.
- Julehjerterne er almindelige røde hjerter (`heartTex`).
- Julestjernen på tårnet er en stor, smilende græskarlygte (`buildStar`), der drejer langsomt frem og tilbage med orange glød og lys. Pigen bærer den, når hun vinder.
- Overraskelserne i slikposerne (FIVE LITTLE GIFT SURPRISES): et lille spøgelse danser, tre flagermus flyver rundt, en regnbue af bolsjer, tre græskar danser, og stjernefesten er uændret.
- Ikoner øverst: slikpose og bolsje. Minikortet (MINIKORT): efterårsfarver, slikposer, græskarlygte på tårnet, stråtag på husene, orange kant.
- Beskeder om de skiftede ting: startbeskeden, "Slikpose fundet!", "Bolsje!", "Hjerte!", kompasset ("Næste slikpose", "Græskarlygten"), pauseskærmen og målskærmen.

Mangler (kommer i de næste skridt):
- Det store juletræ på minikortet har stadig en lille stjerne (skridt 6).
- Resten af teksterne, fx nissevennens replikker og "Julehygge" ved 50 mønter, gennemgås i skridt 7.

Afprøvning (se mappen `test/`):
- `bash test/prep.sh` laver `test/game.html` med three.js fra npm. Start en server i `test/` med `python3 -m http.server 8123 --bind 127.0.0.1`.
- `node test/shot.mjs game.html "?test&tema=halloween" billede.png [script.js]` tager et billede. Hvert billede tager 1 til 2 minutter.
- `test/fingerprint.js` måler verden og udseende. Lav en kopi af den gamle udgave med `git show HEAD:index.html > /tmp/gammel.html && bash test/prep.sh /tmp/gammel.html orig.html`, og kør scriptet på den gamle og den nye juleudgave (`?test`), én ad gangen: alle felter skal være ens. Halloween skal have samme `geo` som jul (så er landskabet uændret). Efter skridt 1 var juleudgaven helt ens med før.
- `test/titlecam.js` viser titelkameraet ved et fast tidspunkt, og `test/play.js` afprøver musikken.
- `test/world.js` måler landskabet (kasser man kan stå på, træer, terræn, mønter, gaver, kasser og julekugler). Det skal være ens i jul og Halloween og ens før og efter en ændring. Kør fx `node test/shot.mjs game.html "?test" none fingerprint.js,world.js` (flere scripts adskilt af komma).
- Flere billeder i én omgang: `VIEWS='[{"p":[0,9,44],"l":[0,3,68]}]' node test/shot.mjs game.html "?test&tema=halloween" billede.png vent.js` giver `billede_0.png` osv. (p = kameraets plads, l = hvor det kigger hen). Gode steder: byen (0,9,44)->(0,3,68), kælkebakken mod øst (36,15,10)->(8,9,0), søen (-28,9,-8)->(-58,0,-30), tårnet (14,31,17)->(0,26,0).
- `test/land.js` lander pigen og tæller bladene, der hvirvler op.
- Efter skridt 2, 3 og 4 var juleudgaven helt ens med før, og landskabet i Halloween var ens med julens.
- I `VIEWS` kan et billede have `"js"`: kode, der køres først, fx `window.__view={p:[...],l:[...]}` ud fra en ting i spillet, eller `window.__GIFT_SURPRISE.trigger(0)` for at vise en overraskelse. `window.__GP` har `gifts`, `baubles`, `collectGift` og `winGame` til afprøvning.
- Gode nærbilleder (med `"gy":true`, så højden regnes fra jorden): hus B's dør (10.6,2.2,80.3)->(13.8,1.4,74.4), tårnets dør (2.2,2.4,8.6)->(0,2.2,2.6), starten af kælkebakken (4,2.8,-14)->(0,2.4,-6.2).
