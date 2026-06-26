/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useRef } from "react";
import * as Tone from "tone";

export function useAmbientSynth() {
  const started = useRef(false);
  const loop = useRef<Tone.Loop | null>(null);

  useEffect(() => {
    return () => {
      loop.current?.dispose();
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  const start = useCallback(async () => {
    if (!started.current) {
      await Tone.start();

      //-----------------------------------
      // Effects
      //-----------------------------------

      const reverb = new Tone.Reverb({
        decay: 12,
        wet: 0.55,
      }).toDestination();

      await reverb.generate();

      const chorus = new Tone.Chorus({
        frequency: 0.15,
        delayTime: 4,
        depth: 0.4,
        wet: 0.4,
      }).connect(reverb);

      chorus.start();

      //-----------------------------------
      // Poly Synth
      //-----------------------------------

      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "triangle",
        },
        envelope: {
          attack: 4,
          decay: 2,
          sustain: 1,
          release: 8,
        },
      }).connect(chorus);

      synth.volume.value = -18;

      //-----------------------------------
      // Chords
      //-----------------------------------

      const chords = [
        ["C4", "E4", "G4", "B4"],
        ["A3", "C4", "E4", "G4"],
        ["E3", "G3", "B3", "D4"],
        ["G3", "B3", "D4", "F#4"],
      ];

      let index = 0;

      loop.current = new Tone.Loop((time) => {
        synth.triggerAttackRelease(
          chords[index],
          "8m",
          time
        );

        index = (index + 1) % chords.length;
      }, "8m");

      Tone.Transport.bpm.value = 40;

      loop.current.start(0);
      Tone.Transport.start();

      started.current = true;
    } else {
      await Tone.start();
      Tone.Transport.start();
    }
  }, []);

  const stop = useCallback(() => {
    Tone.Transport.stop();
  }, []);

  return {
    start,
    stop,
  };
}