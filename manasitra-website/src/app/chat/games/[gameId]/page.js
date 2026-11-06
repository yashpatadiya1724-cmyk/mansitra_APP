"use client";

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { BreathingBubble } from '@/features/mini-games/components/breathing-bubble';
import { TapToCalm } from '@/features/mini-games/components/tap-to-calm';
import { GroundingGuide } from '@/features/mini-games/components/grounding-guide';
import { FocusPuzzle } from '@/features/mini-games/components/focus-puzzle';
import { MoodCanvas } from '@/features/mini-games/components/mood-canvas';
import { AffirmationShuffle } from '@/features/mini-games/components/affirmation-shuffle';
import { WordReset } from '@/features/mini-games/components/word-reset';
import { GratitudeJar } from '@/features/mini-games/components/gratitude-jar';
import { BodyScan } from '@/features/mini-games/components/body-scan';
import { WorryBox } from '@/features/mini-games/components/worry-box';

const GAME_COMPONENTS = {
  breathing: BreathingBubble,
  tap: TapToCalm,
  grounding: GroundingGuide,
  puzzle: FocusPuzzle,
  canvas: MoodCanvas,
  affirmations: AffirmationShuffle,
  word_reset: WordReset,
  gratitude: GratitudeJar,
  body_scan: BodyScan,
  worry_box: WorryBox,
};

export default function GamePage() {
  const { gameId } = useParams();
  const router = useRouter();
  
  const GameComponent = GAME_COMPONENTS[gameId];
  
  if (!GameComponent) {
    return (
      <div className="h-full flex items-center justify-center bg-[#fcfaf8] flex-col gap-4">
        <p className="text-neutral-500 font-medium">Game not found</p>
        <button 
          onClick={() => router.back()}
          className="px-4 py-2 bg-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-300 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="relative h-full w-full bg-[#fcfaf8] overflow-hidden">
      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={() => router.back()}
          className="p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow hover:bg-white text-neutral-600 transition-all border border-neutral-100"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      
      <div className="h-full pt-16">
        <GameComponent standalone={true} />
      </div>
    </div>
  );
}
