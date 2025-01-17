import { Unit } from '../core/units/Unit.js';
import { PhysicalAttack, MagicAttack } from '../skills/index.js';
import * as validator from '../../utils/validator.js';
import { ERROR_MESSAGE } from '../../constants/error.js';

export class Player extends Unit {
  static CREATION_CONDITION = Object.freeze({
    MIN_NAME_LENGTH: 1,
    MAX_NAME_LENGTH: 5,

    TOTAL_HP_MP: 200,
  });

  _validateSpec({ name, hp, mp }) {
    this.validateName(name);
    this.validateTotalHpMp(hp, mp);
  }

  /**
   * @param {string} name
   */
  validateName(name) {
    const { MIN_NAME_LENGTH: min, MAX_NAME_LENGTH: max } = Player.CREATION_CONDITION;
    if (validator.isOutOfRange(name.length, min, max)) {
      throw new Error(ERROR_MESSAGE.IS_OUT_OF_RANGE({ target: '플레이어 이름', min, max }, '자'));
    }
  }

  /**
   * @param {number} hp
   * @param {number} mp
   */
  validateTotalHpMp(hp, mp) {
    const { TOTAL_HP_MP } = Player.CREATION_CONDITION;
    if (hp + mp !== TOTAL_HP_MP) {
      throw new Error(ERROR_MESSAGE.INVALID_TOTAL_HP_MP);
    }
  }

  /** @protected */
  _learnBasicSkills() {
    this.learnSkill(PhysicalAttack.of(this));
    this.learnSkill(MagicAttack.of(this));
  }
}
