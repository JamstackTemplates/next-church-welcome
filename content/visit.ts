import { services } from './services.ts';
import { displayTime } from '../lib/schedule.ts';

interface VisitStep { id: string; number: number; title: string; detail: string; icon: string }
interface FAQ { id: string; question: string; answer: string }

export const visitSteps: readonly VisitStep[] = [
  { id: 'park', number: 1, title: 'Park by the big oak', detail: 'The lot is off Laurel Hollow Road. Look for six first-timer spaces and four accessible spaces by the ramp.', icon: 'parking' },
  { id: 'doors', number: 2, title: 'Come through the red doors', detail: 'They open at 8:30, and someone will hold them for you.', icon: 'door' },
  { id: 'welcome-table', number: 3, title: 'Stop by the welcome table', detail: 'Pick up a coffee card and a building map. Name tags are optional.', icon: 'tag' },
  { id: 'kids', number: 4, title: 'Check in the kids', detail: 'Find Kids’ Trail by the blue door. You’ll get a matching pickup tag. Kids are welcome to stay with you, too.', icon: 'crayon' },
  { id: 'sanctuary', number: 5, title: 'Find a seat anywhere', detail: 'The back rows are open. Services last about 70 minutes, and you can settle in without introducing yourself.', icon: 'pew' },
  { id: 'coffee-after', number: 6, title: 'Stay for coffee if you like', detail: 'The pastor is by the fellowship hall door if you want to say hello.', icon: 'coffee' },
];

const late = services.find(service => service.id === 'late');

export const faqs: readonly FAQ[] = [
  { id: 'what-to-wear', question: 'What should I wear?', answer: 'Whatever’s comfortable. You’ll see jeans and Sunday best.' },
  { id: 'how-long', question: 'How long is a service?', answer: 'About 70 minutes.' },
  { id: 'kids-in-service', question: 'Can my kids stay with me?', answer: 'Always. Activity bags are at the sanctuary doors.' },
  { id: 'offering', question: 'Will I be asked to give?', answer: 'Guests aren’t expected to give. There’s an offering box at the back.' },
  { id: 'communion', question: 'Can I take communion?', answer: 'Everyone who follows Jesus is welcome. A gluten-free option is on the table. Passing is fine too.' },
  { id: 'beliefs', question: 'What do you believe?', answer: 'There’s a short summary in the welcome booklet. The pastor is happy to talk anytime.' },
  { id: 'livestream', question: 'Can I watch first?', answer: late ? `The ${displayTime(late.start)} service is livestreamed and archived.` : 'Ask the office about livestreams and archived services.' },
  { id: 'arrive-late', question: 'What if I’m late?', answer: 'Come on in. Greeters will help you find a seat.' },
];
