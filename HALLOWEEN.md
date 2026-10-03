# Halloween-udgaven: Pigen og Græskarlygten

En Halloween-tvilling til "Pigen og Julestjernen" i samme spil, så man kan vælge mellem Jul og Halloween.

- Man vælger Jul eller Halloween med knapperne på startskærmen (eller pil venstre og pil højre). Linket uden noget bagved åbner jul, og linket med `?tema=halloween` åbner Halloween direkte:
  https://ai-michelklos.github.io/pigen-og-julestjernen/ og https://ai-michelklos.github.io/pigen-og-julestjernen/?tema=halloween
- Juleudgaven ser ud og virker præcis som før Halloween-arbejdet (bortset fra de to knapper på startskærmen).
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
- [x] 5. Figurer: heksehatte på rævene og bæverne, nissevennen bliver til et lille venligt spøgelse, nisserne i byen bliver udklædte, julemandens kane bliver til en heks på kost, og hoppesnemændene bliver til hoppegræskar.
- [x] 6. Aktiviteter: juletræet bliver til græskarlygter, der skal tændes, snemanden bliver til en fugleskræmsel, julekalenderen bliver til "slik eller ballade" ved husene, maden passer til Halloween, og julekortet bliver til et halloweenkort.
- [x] 7. Lyd og tekster: gå alle tekster, beskeder, nissevennens replikker og lyde igennem, så intet nævner jul i Halloween-udgaven.
- [x] 8. Afslutning: knapper på startskærmen til at vælge Jul eller Halloween, samlet afprøvning af begge udgaver, og læg det live.

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

### Skridt 5 (figurer) - færdigt 2. oktober 2026

Lavet:
- Pigen (`buildGirl`, PLAYER MODEL): heksehat med bred, blød skygge, orange bånd med spænde og en lille gylden halvmåne i spidsen. Lilla kjole (`TUN`), orange kanter (`PM.fur`) og en lilla og orange bort (`TB`, `TG`). Hatten er stivere end nissehuen (`this.hat` i `VikingAnim`).
- Rævene (`FOX_C.hat`, `FOX_GEO`): lille lilla heksehat med bred skygge og orange bånd. Ørerne stikker op gennem skyggen. Bæverne (`BV_GEO`): lille, skæv heksehat med bøjet spids oven på ørevarmerne.
- Nissen Nis (`Friend`, `NISSE_PUMPKIN`, `PUMPKIN_FACE`, `PUMPKIN_STEM`): klædt ud som græskar med orange dragt med ribber, grøn hue med stilk og ranke, et græskaransigt på maven og en lille græskarlygte i hånden. `recolorNisse()` bytter farverne i nisse-sættet.
- Nissen på skøjter (`SKATER`, `NISSE_BAT`): flagermus-kostume med ører, vinger der basker, orange vanter og et orange og lilla halstørklæde.
- Nissevennen (`GUIDE`, sidst i NISSEVEN): et lille, hvidt spøgelse med bølget kant, der svæver, læner sig frem når det flyver, vinker og bærer en græskarlygte. Ringen og pilen ved næste hop er uændrede. I test: `window.__GUIDE.ghost`.
- Julemandens kane (`SLEIGH`, AMBIENT LIFE): en venlig heks på kost med en sort kat bag sig og tre flagermus, der flyver omkring hende. Gnisterne bag kosten er orange og lilla. Kanen og rensdyrene er skjult.
- Flagermus (`FLYBAT`, `makeFlyBat`, `flapBat`): fire flagermus flyver i ottetaller højt oppe foran fuldmånen og ses fra startskærmen.
- Hoppesnemændene (`hoppeSnemand`): hoppegræskar, et stort græskar med lysende smil, kvistarme og en hue af grønne blade med stilk. Huen flyver op, når man hopper, som før. Kollisionen er uændret. `HD.pumpBody` er græskarkroppen uden stilk.

Mangler (kommer i de næste skridt):
- Lyde: heksen har stadig kaneklokker og "ho ho ho" (`Audio.jingle`, `Audio.hoho`). Det hører til skridt 7.
- Tekster: "Hoppesnemand!", "Kom med nissevennen!", knappen "Nisseven: til" i pausemenuen og Nissen Nis' replikker (fx "lille juleven" og "Glædelig jul") hører til skridt 7.
- Snemanden i byen ("Byg en snemand") med sine huer hører til skridt 6 (fugleskræmsel).
- Sneharerne og sneboldene er beholdt, de passer til frostnatten.

Afprøvning:
- Juleudgaven var helt ens med før (`fingerprint.js`), og landskabet i Halloween var ens med julens (`world.js`).
- Figurer, der bevæger sig, kan følges med en lille render-hook: læg fx `G.HOOKS.render.push(() => { if (window.__follow) window.__follow(); })` i det første `"js"` i `VIEWS`, og sæt `window.__follow` til en funktion, der stiller kameraet. Skøjtenissen (`window.__AMB.SKATER`) er skjult, når kameraet er langt væk, så flyt pigen ned til søen først. Heksen startes med `window.__AMB.launchSleigh()`.
- Startskærmen med månen: `window.__T = 7.3` og `test/titlecam.js` (skjul `#start` for at se flagermusene foran månen).

### Skridt 6 (aktiviteter) - færdigt 2. oktober 2026

Lavet:
- Det store træ i byen (`bigChristmasTree`): vimpler i orange, lilla og grønt med en lille flagermus i stedet for dannebrogsflag, små hvide papirspøgelser i stedet for julehjerter (samme pladser), græskar i stedet for gaver under træet og ingen stjerne i toppen. Alle `rand()`-kald er de samme som i jul.
- Græskarlygterne på træet (`lanternTree`, bruges af `XMAS_TREE` i Halloween): otte slukkede græskarlygter hænger på træet. Når pigen kommer til træet med bolsjer, flyver et bolsje hen til den næste lygte, som så lyser op. Når alle lyser, tænder den store græskarlygte i toppen, og der er fyrværkeri i orange, lilla og grønt. Minikortet viser et græskar i toppen af træet. `makeCandyPiece()` laver et bolsje.
- Fugleskræmsel (`SNOWMAN` i Halloween, `SCARE`, `scareTufts`): man ruller to halmbolde og et græskar ind i ringen. Fugleskræmslet får ternet skjorte, reb om livet, halm der stikker ud, ærmer med halm og et lysende græskarhoved. Fire sæt tøj: heksehat, stråhat, troldmandshat og krans af blade. Skiltet hedder "BYG ET FUGLESKRÆMSEL".
- De to pynt-snemænd (ved indgangen til byen og i vest) er fugleskræmsler med stråhat, ternet skjorte, græskarhoved og en lille krage på armen (`scarecrowDecor`). Kollisionen er den samme.
- Slik eller ballade (`trickOrTreat`, bruges af `ADVENT` i Halloween): ved døren til de to huse kan man ringe på med mellemrum. Et venligt spøgelse kommer ud og giver fem bolsjer. Første gang i hus A: mønter og bolsjeregn. Første gang i hus B: alle hjerter fyldt op og et dansende spøgelse. Begge huse: fyrværkeri og stjernefest. Man kan ringe igen efter lidt tid og få lidt mere slik, eller "ballade" (konfetti). Tavlen på julekalenderens plads hedder "SLIK ELLER BALLADE" og viser de to huse, med et bolsje ved hvert hus, man har fået slik i.
- Spøgelset er nu en fælles funktion (`makeGhost`), som både spøgelsesvennen og spøgelserne i dørene bruger.
- Maden: græskarsuppe med en klat fløde i stuen (i stedet for risengrød) og spøgelsesboller med hvid glasur, chokoladeøjne og orange drys, chokoladesovs og varm kakao i køkkenet (i stedet for æbleskiver, syltetøj og gløgg). Teksterne (`FOOD_TXT`, `foodLabel`) følger med, og maden på pigens ske og gaffel har samme farver.
- Halloweenkort (`XCARD`): knappen hedder "Halloweenkort", kortet er lilla med orange ramme, smilende græskar og flagermus i hjørnerne og teksten "Glædelig halloween" og "fra Pigen og Græskarlygten".

Mangler (kommer i de næste skridt):
- Skridt 7: lyde (kaneklokker og "ho ho ho" hos heksen), Nissen Nis' replikker, "Kom med nissevennen!", "Nisseven: til" i pausemenuen, "Hoppesnemand!", "Julehygge" ved 50 mønter og resten af teksterne.

Afprøvning:
- Juleudgaven var helt ens med før, og landskabet i Halloween var ens med julens.
- Spillet kører meget langsomt i testbrowseren, når der sker meget. Ting, der tager et par sekunders spilletid (fx slik eller ballade), kan tage 5 til 10 minutter. Kør dem med `nohup ... &` i baggrunden og en lille skærm (fx bredde 480 og højde 270), og vent på `G.GAME.simT` i stedet for på uret.
- I test: `window.__G.ADVENT.houses[i]` (dørene), `window.__G.XMAS_TREE.lamps` (græskarlygterne), `window.__G.SNOWMAN` og `window.__G.XCARD.open()`. Tryk på mellemrum kan efterlignes med `G.input.interactPressed = true`.

### Skridt 7 (lyd og tekster) - færdigt 3. oktober 2026

Lavet:
- Nissen Nis hedder Græskar-Nis i Halloween og har sine egne replikker (`new Friend(...)` i LEVEL LAYOUT): han fortæller om græskarlygten, slikposerne, "slik eller ballade", græskarlygterne på træet, den lilla kasse i bladene og hoppegræskarrene.
- Beskeder: "Kom med spøgelsesvennen!", knappen "Spøgelsesven: til" i pausemenuen, "Hoppegræskar!", "Halloweenhygge" ved hver 50. mønt, "Blade på næsen!" i bladbunkerne (glimtet i bunken er orange), "Lanternen er tændt!" i stedet for "Checkpoint!" og slikposen på skorstenen "på køkkenhuset".
- Lyde (AUDIO): heksen på kosten har et blødt sus med små magiske glimt (`broom`) i stedet for kaneklokker og et glad lille fnis (`hihi`) i stedet for "ho ho ho". Fanfaren, når man vinder, og når alle lygter lyser, har et magisk glimt (`shimmer`) i stedet for kaneklokker. Dørklokken passer fint til "slik eller ballade" og er beholdt.
- Hele spillet er søgt igennem for ord som jul, nisse, sne, gave, kane, stjerne og kugle. Det, der er tilbage, bruges kun i juleudgaven (fx julekalenderens låger og juletræets beskeder) eller er interne navne, man ikke ser.
- Bæverne kaster stadig snebolde, og søen er frossen. Det passer til frostnatten og er ikke jul, så de ord er beholdt.
- Startteksten passer stadig: heksehat, spøgelsesven, fem slikposer, hoppegræskar og græskarlygten på tårnet.

Mangler (skridt 8):
- Knapper på startskærmen til at vælge Jul eller Halloween, en samlet afprøvning af begge udgaver, og så skal det lægges live.

### Skridt 8 (afslutning) - færdigt 3. oktober 2026

Lavet:
- Startskærmen har to knapper under teksten: "Jul" (med en stjerne) og "Halloween" (med et græskar). Det valgte tema er fremhævet. Man skifter ved at klikke på den anden knap eller trykke pil venstre (jul) eller pil højre (halloween). Siden genindlæses så med det valgte tema. Koden ligger i det lille script lige efter `#start`, og udseendet i CSS-reglerne `.tema` og `.temaBtn`.
- Når man er i spillet, gør pilene det samme som før (knapperne virker kun på startskærmen).

Samlet afprøvning:
- Juleudgaven er sammenlignet med udgaven fra før Halloween-arbejdet (commit 8baa13e "Lille kort i hjørnet"): verden, materialer, shadere, lys, tåge, efterbehandling, tekster og musik er helt ens.
- Landskabet (kasser, træer, terræn, mønter, gaver, kasser og julekugler) er ens i jul og Halloween.
- I begge temaer: spillet starter, pigen hopper, samler en mønt og en gave eller slikpose, og målskærmen viser den rigtige tekst. Ingen fejl i browseren.
- Temaskift med pil højre, pil venstre og klik er afprøvet. Startskærmen er set i 1366 x 768, 960 x 540 og på en smal skærm.

Hvis der skal laves mere:
- Alle Halloween-ændringer er gatet med `HALLO` i koden. Søg efter `HALLO` for at finde dem.
- Brug `test/`-mappen som beskrevet under skridt 4 og 6. Sammenlign juleudgaven med den forrige udgave efter hver ændring.
