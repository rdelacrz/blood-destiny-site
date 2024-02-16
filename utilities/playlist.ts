import { Song } from "@/models";

import ephemeralMemories from "@/assets/audio/ephemeral_memories.mp3";
import darkDays from "@/assets/audio/dark_days.mp3";
import endOfTheDream from "@/assets/audio/end_of_the_dream.mp3";
import calmBeforeTheStorm from "@/assets/audio/calm_before_the_storm.mp3";
import justAnOrdinaryDay from "@/assets/audio/just_an_ordinary_day.mp3";
import shiftingShoreline from "@/assets/audio/shifting_shoreline.mp3";
import theColdNight from "@/assets/audio/the_cold_night.mp3";
import beginningOfTheEnd from "@/assets/audio/beginning_of_the_end.mp3";
import farewell from "@/assets/audio/farewell.mp3";
import vincentVangloriaTheme from "@/assets/audio/vincent_vangloria_theme.mp3";

export const playlist: Song[] = [
  {
    title: "Ephemeral Memories",
    artist: "Doommaker",
    length: "2:42",
    file: ephemeralMemories,
  },
  {
    title: "Dark Days",
    artist: "Doommaker",
    length: "3:20",
    file: darkDays,
  },
  {
    title: "Calm Before the Storm",
    artist: "Doommaker",
    length: "1:40",
    file: calmBeforeTheStorm,
  },
  {
    title: "Just An Ordinary Day",
    artist: "Doommaker",
    length: "0:44",
    file: justAnOrdinaryDay,
  },
  {
    title: "End Of The Dream",
    artist: "Doommaker",
    length: "1:49",
    file: endOfTheDream,
  },
  {
    title: "Shifting Shoreline",
    artist: "Doommaker",
    length: "0:54",
    file: shiftingShoreline,
  },
  {
    title: "The Cold Night",
    artist: "Doommaker",
    length: "2:20",
    file: theColdNight,
  },
  {
    title: "Beginning of the End",
    artist: "Doommaker",
    length: "3:33",
    file: beginningOfTheEnd,
  },
  {
    title: "Farewell",
    artist: "BigRicePiano",
    length: "3:16",
    file: farewell,
  },
  {
    title: "Vincent Vangloria's Theme",
    artist: "Brian R.",
    length: "4:05",
    file: vincentVangloriaTheme,
  },
];