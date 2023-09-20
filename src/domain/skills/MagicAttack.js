import Attack from '../core/skills/Attack';

export class MagicAttack extends Attack {
  static SKILL_NAME = '마법 공격';

  static DAMAGE = 30;

  static REQUIRED_MP = 30;

  static of(caster) {
    return new MagicAttack(caster, {
      skillName: MagicAttack.SKILL_NAME,
      damage: MagicAttack.DAMAGE,
      requireMp: MagicAttack.REQUIRED_MP,
    });
  }
}
