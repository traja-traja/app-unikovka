export default {
  gameId: '-MXX_s9-VTxO3uwHT20z',
  description: '',
  week: '',
  gameRounds: [
    {

      // matrix of values
      inputVariables: [
        [
          {x: 'randomInt(1,25)', b: 'randomInt(5,25)'}
        ], [
          {y: 0.1, a: 10},
          {y: 0.2, a: 5},
          {y: 0.3, a: 10},
          {y: 0.4, a: 5},
          {y: 0.5, a: 2},
          {y: 0.5, a: 4},
          {y: 0.5, a: 8},
          {y: 0.6, a: 10},
          {y: 0.7, a: 10},
          {y: 0.8, a: 10}
        ]
      ],
      helpers: [
        {helperX: `x + y`},
        {helperSubSolution: `helperX * a`},
        {c: `helperSubSolution + b`}
      ],
      solution:
        `round(helperX, 1)`,
      options:
        `round(solution + pickRandom([-1,1]) * (randomInt(0,3) + randomInt(1,9)*0.1), 1)`,
      assignmentText:
        `Vypočítej rovnici [b]{a}x + {b} = {c}[/b]`,
      adviseText:
        `[p]Od obou stran rovnice odečti číslo [b]{b}[/b]...[/p]`,
      solutionText: `x = {solution}`,

    }, {
      
      // matrix of values
      inputVariables: [
        [
          {x: 'randomInt(11,25)', price: 'randomInt(75,125)', percentageUp: 'randomInt(5,25)'}
        ]
      ],
      helpers: [
        {newPrice: `round(price * ( 100 + percentageUp ) / 100)`},
        {totalAmount: `x * price`}
      ],
      solution:
        `floor(totalAmount / newPrice)`,
      options:
        `round(solution + pickRandom([-1,1]) * randomInt(1,3))`,
      assignmentText:
        `[p]Učitelka v mateřské škole koupila dětem [b]{x}&nbsp;sad[/b] pastelek bez obrázku, každou sadu [b]za&nbsp;{price}&nbsp;Kč.[/b][/p]
        [p]Dětem se ale [i]obyčejné[/i] pastelky nelíbily, a tak se paní učitelka rozhodla pastelky vrátit a koupit místo nich lepší, s obrázkem! 😋[/p]
        [p]Kolik sad pastelek může paní učitelka koupit za původní částku, když pastelky s obrázkem stojí [b]{newPrice}&nbsp;Kč[/b] za sadu?[/p]`,
      adviseText:
        `Nejprve vypočítej, kolik měla paní učitelka s sebou peněz, když kupovala první typ pastelek....`,
      solutionText: `x = {solution}`

    }, {
      
      // matrix of values
      inputVariables: [
        [
          {x: 3000, y:2550}, {x: 3000, y:2610}, {x: 3000, y:2640}, {x: 3000, y:2670}, {x: 3000, y:2760}, 
          {x: 3250, y:2860}, {x: 3250, y:2925}, {x: 3250, y:2990}, {x: 3350, y:3015}, {x: 3400, y:2890}, 					
          {x: 3450, y:3105}, {x: 3500, y:2975}, {x: 3500, y:3045}, {x: 3500, y:3080}, {x: 3500, y:3115},
          {x: 3500, y:3150}, {x: 3500, y:3220}, {x: 3550, y:3195}, {x: 3600, y:3060}, {x: 3650, y:3285}, 	
          {x: 3700, y:3330}, {x: 3750, y:3300}, {x: 3750, y:3375}, {x: 3750, y:3450}, {x: 3800, y:3230},
          {x: 3000, y:2580}, {x: 3250, y:2795}, {x: 3500, y:3010}, {x: 4000, y:3440}, {x: 4000, y:3400},
          {x: 4000, y:3480}, {x: 4000, y:3520}, {x: 4000, y:3560}, {x: 4000, y:3680}, {x: 4100, y:3485}, 					
        ]
      ],
      helpers: [
        {priceDiff: `x - y`}
      ],
      solution:
        `round(priceDiff / x * 100, 2)`,
      options:
        `round(solution + pickRandom([-1,1]) * randomInt(1,5))`,
      assignmentText:
        `[p]V obchodě prodávají kuchyňský robot za [b]{x}&nbsp;Kč.[/b][/p]
        [p]Urči, o&nbsp;kolik procent by musel prodavač robot zlevnit, aby stál [b]{y}&nbsp;Kč.[/b][/p]`,
      adviseText:
        `[p]Tady chybí nápověda.... 😋[/p]
        [p]To se někdy v životě stává 🙂[/p]`,
      solutionText: `x = {solution}`,

    }, {

      // matrix of values
      inputVariables: [
        [
          {x: 'randomInt(1,25)', b: 'randomInt(5,25)'}
        ], [
          {y: 0.1, a: 10},
          {y: 0.2, a: 5},
          {y: 0.3, a: 10},
          {y: 0.4, a: 5},
          {y: 0.5, a: 2},
          {y: 0.5, a: 4},
          {y: 0.5, a: 8},
          {y: 0.6, a: 10},
          {y: 0.7, a: 10},
          {y: 0.8, a: 10}
        ]
      ],
      helpers: [
        {helperX: `x + y`},
        {helperSubSolution: `helperX * a`},
        {c: `helperSubSolution - b`}
      ],
      solution:
        `round(helperX, 1)`,
      options:
        `round(solution + pickRandom([-1,1]) * (randomInt(0,3) + randomInt(1,9)*0.1), 1)`,
      assignmentText:
        `Vypočítej rovnici [b]{a}x - {b} = {c}[/b]`,
      adviseText:
        `[p]K oběma stranám rovnice přičti číslo [b]{b}[/b].[/p]
        [p]Získáš tak rovnici: [b]{a}x = {helperSubSolution}[/b].[/p]
        [p]Tuto rovnici stačí vydělit číslem [b]{a}[/b], abys získal výsledek pro [b]1x[/b].[/p]`,
      solutionText: `x = {solution}`

    }, {

      // matrix of input variables
      // input variables are evaluated for randomInt() functions call only
      inputVariables: [
        [
          // dynamic variables (numbers) = just one of these objects would be used
          {x: 210000}, {x: 220000}, {x: 230000}, {x: 240000}, {x: 250000},
          {x: 260000}, {x: 270000}, {x: 280000}, {x: 290000},
          {x: 310000}, {x: 320000}, {x: 330000}, {x: 340000}, {x: 350000},
          {x: 360000}, {x: 370000}, {x: 380000}, {x: 390000},
          {x: 410000}, {x: 420000}, {x: 430000}, {x: 440000}, {x: 450000},
          {x: 460000}, {x: 470000}, {x: 480000}, {x: 490000}
        ], [
          // static variable = there is just one object here = this one will be used
          { percentageUp: 15, percentageDown: 15, percentageDownAgain: 12 }
        ], [
          // dynamic variables (strings)
          {familyNom: '"Horák"', familyDat: '"Horákovi"'},
          {familyNom: '"Novák"', familyDat: '"Novákovi"'},
          {familyNom: '"Filip"', familyDat: '"Filipovi"'},
        ]
      ],
      // helpers are evaluated one by one
      helpers: [
        {helper1: `x / 100`}, // 1 %
        {helper2: `helper1 * 15`},
        {helper3: `x + helper2`}
      ],
      // solution is always evaluated
      // if solution should be static, it can be placed into inputVariables
      solution:
        `round(x * ( 100 + percentageUp ) / 100 * ( 100 - percentageDown ) / 100 * ( 100 - percentageDownAgain ) / 100)`,
      options:
        `round(solution + pickRandom([-1,1]) * (randomInt(1, 25000) + randomInt(1,9)*0.1))`,
      assignmentText:
        `[p]Pan {familyNom} plánuje koupit nové auto. Auto, které si vybral, se v lednu prodávalo za&nbsp;[b]{x}&nbsp;Kč.[/b][/p]
        [p]Protože ale výroba aut v únoru zdražila, musela i&nbsp;automobilka navýšit cenu auta [b]o&nbsp;{percentageUp}&nbsp;%.[/b][/p]
        [p]V březnu sehnala automobilka levnějšího dodavatele, a proto auta [b]o&nbsp;{percentageDown}&nbsp;%[/b] z&nbsp;nové ceny zase&nbsp;zlevnila.[/p]
        [p]Panu {familyDat} se přesto auto zdálo stále drahé, a zřejmě nejen jemu. Auta tak zůstávala na skladě, a&nbsp;tak automobilka v dubnu nakonec auta opět zlevnila, tentokrát [b]o&nbsp;{percentageDownAgain}&nbsp;%[/b] z březnové&nbsp;ceny.[/p]
        [p]Za kolik korun se nyní auto prodává?[/p]`,
      adviseText:
        `[p]Lednová cena automobilu byla [b]{x} Kč[/b].[br]Z této částky vypočteme 1 procento tak, že cenu vydělíme číslem 100:[/p]
        [i][b]{x} : 100 = {helper1}[/b][br][b]{helper1}&nbsp;Kč[/b] je tedy [b]1 %[/b] z [b]{x} Kč[/b].[/i]
        [p]Auto bylo zdraženo o [b]{percentageUp} %[/b], a pokud víme, jaká částka odpovídá jednomu procentu, [b]{percentageUp} %[/b] dostaneme jednoduše vynásobením této částky číslem [b]{percentageUp}[/b]:[/p]
        [i][b]{helper1} * 15 = {helper2}[/b][br][b]{helper2} Kč[/b] je tedy [b]{percentageUp} %[/b] z [b]{x} Kč[/b].[/i]
        [p]Tuto částku přičteme k původní ceně.[/p]
        [p]V únoru tedy auto stálo [b]{helper3}[/b] ({x} + {helper2} = {helper3}).[/p]
        [p]U zlevnění postupujeme stejně, avšak vyjdeme z nové (únorové) ceny. Částku odpovídající [b]{percentageDown} %[/b] od&nbsp;únorové ceny odečteme, protože jde o&nbsp;snížení ceny, a získáme tak březnovou cenu, kterou použijeme jako základ pro další výpočet...[/p]`,
      solutionText: `Auto se nyní prodává za {solution}&nbsp;Kč.`

    }, {

      // matrix of input variables
      // input variables are evaluated for randomInt() functions call only
      inputVariables: [
        [
          // dynamic variables (numbers) = just one of these objects would be used
          {x: `randomInt(5,8)`, y: `randomInt(6,9)`, xPlus: `randomInt(2,4)`, yMinus: `randomInt(2,4)`, xyTimes:  `randomInt(3,6)`},
        ], [
          // dynamic variables (strings)
          {persons: '"brusičů"', verb: '"obrousí"', subjects: '"výrobků"'},
          {persons: '"truhlářů"', verb: '"zkompletuje"', subjects: '"židlí"'}
        ]
      ],
      // helpers are evaluated one by one
      helpers: [
        {xNew: `x + xPlus`}, // 1 %
        {yNew: `y - yMinus`},
        {z: `x * y * xyTimes`}
      ],
      // solution is always evaluated
      // if solution should be static, it can be placed into inputVariables
      solution:
        `round(z / x / y * xNew *yNew, 2)`,
      options:
        `round(solution + pickRandom([-1,1]) * randomInt(1,20))`,
      assignmentText:
        `[p]{x} {persons} {verb} za {y} hodin {z} {subjects}.[/p]
        [p]Vypočti, kolik {subjects} {verb} {xNew} {persons} za {yNew} hodin.[/p]`,
      adviseText:
        `[p]1. nápověda: Vypočti, kolik {subjects} {verb} {x} {persons} za 1 hodinu.[/p]
        [p]2. nápověda: Vypočti, kolik {subjects} {verb} {xNew} {persons} za 1 hodinu.[/p]
        [p]3. Nápověda: Vypočti, kolik {subjects} {verb} {xNew} {persons} za {yNew} hodin.[/p] `,
      solutionText: `{xNew} {persons} {verb} {yNew} {subjects} za {yNew} hodin.`

    }
  ]
}