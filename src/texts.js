import text_malory1 from './texts/malory1.js';
import text_malory2 from './texts/malory2.js';
import text_shakespeare from './texts/shakespeare.js';
import text_idylls_king from './texts/idylls_king.js';
import text_faerie_queen from './texts/faerie_queen.js';
import text_bible from './texts/bible.js';
import text_aeneid from './texts/aeneid.js';
import text_iliad from './texts/iliad.js';
import text_odyssey from './texts/odyssey.js';
import text_paradise_lost from './texts/paradise_lost.js';
import text_paradise_regained from './texts/paradise_regained.js';
import text_mabinogion from './texts/mabinogion.js';

const texts = [
  {
    "name": "malory1",
    "full_name": "Malory Part 1",
    "checkbox_key": "checkbox_malory1",
    "text": text_malory1,
    "startsChecked": true
  },
  {
    "name": "malory2",
    "full_name": "Malory Part 2",
    "checkbox_key": "checkbox_malory2",
    "text": text_malory2,
    "startsChecked": true
  },
  {
    "name": "shakespeare",
    "full_name": "Shakespeare full works",
    "checkbox_key": "checkbox_shakespeare",
    "text": text_shakespeare,
    "startsChecked": false
  },
  {
    "name": "idylls_king",
    "full_name": "Tennyson Idylls of the King",
    "checkbox_key": "checkbox_idylls_king",
    "text": text_idylls_king,
    "startsChecked": false
  },
  {
    "name": "faerie_queen",
    "full_name": "Spenser's Faerie Queen",
    "checkbox_key": "checkbox_faerie_queen",
    "text": text_faerie_queen,
    "startsChecked": false
  },
  {
    "name": "bible",
    "full_name": "King James Bible",
    "checkbox_key": "checkbox_bible",
    "text": text_bible,
    "startsChecked": false
  },
  {
    "name": "aeneid",
    "full_name": "Dryden's Aeneid",
    "checkbox_key": "checkbox_aeneid",
    "text": text_aeneid,
    "startsChecked": false
  },
  {
    "name": "iliad",
    "full_name": "Pope's Iliad",
    "checkbox_key": "checkbox_iliad",
    "text": text_iliad,
    "startsChecked": false
  },
  {
    "name": "odyssey",
    "full_name": "Pope's Odyssey",
    "checkbox_key": "checkbox_odyssey",
    "text": text_odyssey,
    "startsChecked": false
  },
  {
    "name": "paradise_lost",
    "full_name": "Milton Paradise Lost",
    "checkbox_key": "checkbox_paradise_lost",
    "text": text_paradise_lost,
    "startsChecked": false
  },
  {
    "name": "paradise_regained",
    "full_name": "Milton Paradise Regained",
    "checkbox_key": "checkbox_paradise_regained",
    "text": text_paradise_regained,
    "startsChecked": false
  },
  {
    "name": "mabinogion",
    "full_name": "Lady Charlotte Guest's Mabinogion",
    "checkbox_key": "checkbox_mabinogion",
    "text": text_mabinogion,
    "startsChecked": false
  }
];

export default texts;