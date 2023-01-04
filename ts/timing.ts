//export const frames_per_sec = 30.0;
//export const speed_multiplier = 1.0;

import * as exp from "constants";

//These should be in pixels per milisecond
export const RancherSpeed = 200/1000;
export const GrassEaterSpeed = 140/1000;
export const MonsterSpeed = 165/1000;
export const FeederSpeed = 135/1000;
export const WurmSpeed = 155/1000;
export const ParasiteSpeed = 190/1000;
export const BigMonsterSpeed = 130/1000;
export const BigMonsterAngrySpeed = 250/1000;

//These are in radians per milisecond, times the multiplier
export const RancherRotate = 360/1000 * Math.PI/180;
export const GrassEaterRotate = 270/1000 * Math.PI/180;
export const MonsterRotate = 180/1000 * Math.PI/180;
export const FeederRotate = 270/1000 * Math.PI/180;
export const WurmHeadRotate = 200/1000 * Math.PI/180;
export const WurmBodyRotate = 200/1000 * Math.PI/180;
export const ParasiteRotate = 300/1000 * Math.PI/180;
export const BigMonsterRotate = 130/1000 * Math.PI/180;
export const BigMonsterAngryRotate = 270/1000 * Math.PI/180;

//In mili seconds
export const GrassGrowTime = 4000;
export const EatGrassTime = 1000;
export const WurmStunTime = 2000;
export const LaserCoolDown = 200;
export const SprayEffectivenessTime = 1500;
export const ParasiteKillTime = 2500;
export const BigMonsterTantrumTime = 2000;
export const BigMonsterStompTime = 250;
export const BigMonsterWeedSpawnTime = 750;


//In milliseconds, no multiplier
export const LaserFadeTime = 250;
export const CreatureDeathFadeTime = 1000;
export const GameCoolDownTime = 1100;