/**
 * @typedef {import('./units/Player').Player} Player
 * @typedef {import('./core/units/Monster').Monster} Monster
 * @typedef {import('./core/skills/Skill').Skill} Skill
 */

import { ERROR_MESSAGE } from '../constants/error.js';
import { Monster } from './core/units/Monster.js';
import { Player } from './units/Player.js';

export class BattleFiled {
  #turn = 1;

  #player;

  #enemy;

  #winner = null;

  #disable = false;

  /**
   * @param {Player} player
   */
  constructor(player) {
    this.#validate(player);
    this.#player = player;
  }

  #validate(player) {
    if (!(player instanceof Player)) {
      throw new Error(ERROR_MESSAGE.INVALID_PLAYER);
    }
  }

  /**
   * @returns {number}
   */
  get turn() {
    return this.#turn;
  }

  /**
   * @returns {Player}
   */
  get player() {
    return this.#player;
  }

  /**
   * @returns {Monster}
   */
  get enemy() {
    return this.#enemy;
  }

  /**
   * @returns {Monster | Player}
   */
  get winner() {
    return this.#winner;
  }

  init() {
    this.#turn = 1;
    this.#player = null;
    this.#enemy = null;
    this.#winner = null;
  }

  /**
   * @param {Monster} enemy
   */
  setEnemy(enemy) {
    this.#validateEnemy(enemy);
    this.#enemy = enemy;
  }

  #validateEnemy(player) {
    if (!(player instanceof Monster)) {
      throw new Error(ERROR_MESSAGE.INVALID_ENEMY);
    }
  }

  /**
   * @param {number} [value]
   */
  increaseTurn(value = 1) {
    this.#turn += value;
  }

  /**
   * @param {Skill} playerSkill
   * @param {Skill} enemySkill
   */
  processTurn(playerSkill, enemySkill) {
    if (this.#disable) {
      throw new Error(ERROR_MESSAGE.IS_ENDED_GAME);
    }
    this.playerUseSkill(playerSkill);
    this.checkWinner();
    if (this.#winner) {
      return;
    }
    this.enemyUseSkill(enemySkill);
    this.checkWinner();
    if (this.#winner) {
      return;
    }
    this.increaseTurn();
  }

  /**
   * @param {string} skillName
   */
  playerUseSkill(skillName) {
    this.#player.useSkill(skillName, this.#enemy);
  }

  /**
   * @param {string} skillName
   */
  enemyUseSkill(skillName) {
    this.#enemy.useSkill(skillName, this.#player);
  }

  checkWinner() {
    if (this.#player.status.isDead) {
      this.setWinner(this.#enemy);
      this.#enemy.setWinner();
      return;
    }
    if (this.#enemy.status.isDead) {
      this.setWinner(this.#player);
    }
  }

  setWinner(winner) {
    this.#winner = winner;
    this.#disable = true;
  }
}
