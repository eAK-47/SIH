const fs = require('fs');

const path = '/home/om/Documents/sih/client/src/pages/TouristApp.tsx';
let source = fs.readFileSync(path, 'utf8');

// Add TransitMeterSimulator import
source = source.replace(/import { Loader2 } from 'lucide-react';/, "import { Loader2 } from 'lucide-react';\nimport { TransitMeterSimulator } from '../components/TransitMeterSimulator';");

// Add transit state
const stateDeclaration = "const [modalPlace, setModalPlace] = useState<{id: string, name: string} | null>(null);";
const newState = stateDeclaration + "\n  const [transitModal, setTransitModal] = useState<{id: string, name: string} | null>(null);";
source = source.replace(stateDeclaration, newState);

// Add global exposed function for transit modal
const loadPlacesRegex = /useEffect\(\(\) => \{[\s].*async function loadPlaces/s;
const globalHook = `
  useEffect(() => {
    (window as any).openTransitMeter = (id: string, name: string) => setTransitModal({ id, name });
    return () => { delete (window as any).openTransitMeter; };
  }, []);
`;
source = source.replace("useEffect(() => {\n    async function loadPlaces", globalHook + "\n  useEffect(() => {\n    async function loadPlaces");

// Add the modal component at the end
const modals = "{modalPlace && <SubmitBillModal placeId={modalPlace.id} placeName={modalPlace.name} onClose={() => setModalPlace(null)} />}";
const newModals = modals + "\n      {transitModal && <TransitMeterSimulator placeId={transitModal.id} placeName={transitModal.name} onClose={() => setTransitModal(null)} />}";
source = source.replace(modals, newModals);

fs.writeFileSync(path, source);
