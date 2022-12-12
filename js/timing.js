export const frames_per_sec = 30.0;
export const speed_multiplier = 1.0;
//These should be in pixels per second, times the multiplier
export const relRancherSpeed = 200;
export const relGrassEaterSpeed = 140;
export const relMonsterSpeed = 160;
export const relFeederSpeed = 140;
export const relWurmSpeed = 160;
export const relParasiteSpeed = 190;
export const relBigMonsterSpeed = 130;
export const relBigMonsterAngrySpeed = 250;
//These are in degrees per second, times the multiplier
export const relRancherRotate = 360;
export const relGrassEaterRotate = 270;
export const relMonsterRotate = 180;
export const relFeederRotate = 270;
export const relWurmHeadRotate = 200;
export const relWurmBodyRotate = 200;
export const relParasiteRotate = 300;
export const relBigMonsterRotate = 130;
export const relBigMonsterAngryRotate = 270;
//In seconds, times multiplier
export const relGrassGrowTime = 4;
export const relEatGrassTime = 1;
export const relWurmStunTime = 2;
export const relLaserCoolDown = .2;
export const relSprayEffectivenessTime = 1.5;
export const relParasiteKillTime = 2;
export const relBigMonsterTantrumTime = 2;
export const relBigMonsterStompTime = .25;
export const relBigMonsterWeedSpawnTime = .75;
export const EatGrassTime = RelativeTimeToFrames(relEatGrassTime);
export const GrassGrowTime = RelativeTimeToFrames(relGrassGrowTime);
export const WurmStunTime = RelativeTimeToFrames(relWurmStunTime);
export const LaserCoolDown = RelativeTimeToFrames(relLaserCoolDown);
export const SprayEffectivenessTime = RelativeTimeToFrames(relSprayEffectivenessTime);
export const ParasiteKillTime = RelativeTimeToFrames(relParasiteKillTime);
export const BigMonsterTantrumTime = RelativeTimeToFrames(relBigMonsterTantrumTime);
export const BigMonsterStompTime = RelativeTimeToFrames(relBigMonsterStompTime);
export const BigMonsterWeedSpawnTime = RelativeTimeToFrames(relBigMonsterWeedSpawnTime);
//In seconds, no multiplier
export const realLaserFadeTime = .25;
export const realCreatureDeathFadeTime = 1;
export const LaserFadeTime = RealTimeToFrames(realLaserFadeTime);
export const CreatureDeathFadeTime = RealTimeToFrames(realCreatureDeathFadeTime);
export function RelativeSpeedToPixelsPerFrame(rel_speed) {
    return rel_speed / frames_per_sec * speed_multiplier;
}
export function RelativeRotateToRadiansPerFrame(rel_rot) {
    return rel_rot / frames_per_sec / 180 * Math.PI * speed_multiplier;
}
export function RelativeTimeToFrames(rel_time) {
    return (rel_time * frames_per_sec * speed_multiplier); // used to covert to int?
}
export function RealTimeToFrames(real_time) {
    return (real_time * frames_per_sec); // used to covert to int?
}
export function FramesToRealTime(frames) {
    return frames / frames_per_sec;
}
//# sourceMappingURL=timing.js.map