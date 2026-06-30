// Content and color config for the three lenses (physics / water / business).
// Edit this file to retitle quadrants, tweak copy, or restyle colors without
// touching the interaction logic in adoption_ohms_law_triple_mode.js.
var ADOPTION_CONFIG = {
  titles: {
    phys:  { tl: 'High current',  tr: 'Driven load',           bl: 'No EMF',          br: 'Open circuit' },
    water: { tl: 'High flow',     tr: 'Forced flow',           bl: 'No head',         br: 'Blocked pipe' },
    biz:   { tl: 'Hot demand',    tr: 'Displacement demand',   bl: 'Dormant demand',  br: 'Phantom demand' }
  },
  labels: {
    phys:  { x: 'R  (resistance) →', y: 'V (potential difference) →', v: 'V',       r: 'R',     i: 'I = V/R',  p: 'P = V·I' },
    water: { x: 'Pipe narrowness →', y: 'Pressure head →',            v: 'Head',    r: 'Pipe R', i: 'Flow',    p: 'Power' },
    biz:   { x: 'Switching cost →',  y: 'Trigger / drive →',          v: 'Trigger', r: 'Cost',  i: 'Adoption', p: 'Throughput' }
  },
  fills: { tl: '#639922', tr: '#378ADD', bl: '#EF9F27', br: '#E24B4A' },
  cells: {
    tl: {
      bg: '#EAF3DE', fg: '#27500A',
      signsP: 'Low R, high V. Steep ray, bright bulb.', actP: 'Large current flows freely.',
      signsW: 'Low pipe resistance, high head. Strong flow.', actW: 'Water gushes through.',
      signsB: 'Easy to switch, strong pull. Peers adopting, urgency now.', actB: 'Move fast — the window is open.'
    },
    tr: {
      bg: '#E6F1FB', fg: '#042C53',
      signsP: 'High R, high V. EMF overcomes the load.', actP: 'Current flows despite resistance.',
      signsW: 'Narrow pipe, but high head forces water through.', actW: 'Flow despite the restriction.',
      signsB: 'Costly to switch, but a real trigger forces it. Price hike, breach, new leadership.', actB: 'Build and invest — long game, real payoff.'
    },
    bl: {
      bg: '#FAEEDA', fg: '#633806',
      signsP: 'Low R, but no V. No potential to drive flow.', actP: 'Almost no current, bulb dark.',
      signsW: 'Wide pipe, but no head. Nothing to push the water.', actW: 'A trickle at best.',
      signsB: 'Cheap to adopt, but no consequence or urgency to act.', actB: 'Show value to create drive, or wait.'
    },
    br: {
      bg: '#FCEBEB', fg: '#501313',
      signsP: 'High R, weak V. Stored potential, no flow.', actP: 'No current, no power delivered.',
      signsW: 'Pinched pipe, low head. Water sits, barely seeps.', actW: 'Effectively blocked.',
      signsB: 'Chronic complaint, nobody has switched in years. No trigger.', actB: 'Don’t build — resource pit.'
    }
  }
};
