import { Player } from '../../src/domain/units';
import { MagicAttack, PhysicalAttack } from '../../src/domain/skills';
import { ERROR_MESSAGE } from '../../src/constants/error';

describe('플레이어 테스트', () => {
  /** @type {Player} */
  let player;

  beforeEach(() => {
    player = new Player({ name: '용사', hp: 120, mp: 80 });
  });

  it('플레이어는 이름, hp, mp를 보유한다.', () => {
    expect(player.status.name).toBe('용사');
    expect(player.status.hp).toBe(120);
    expect(player.status.mp).toBe(80);
  });

  it('플레이어는 기본 스킬로 물리 공격과 마법공격을 가진다.', () => {
    expect(player.skills.size).toBe(2);
    expect(player.skills.get(PhysicalAttack.SKILL_NAME)).toBeDefined();
    expect(player.skills.get(MagicAttack.SKILL_NAME)).toBeDefined();
  });
});

describe('플레이어 생성 예외 테스트', () => {
  it.each([{ name: '' }, { name: '스티븐제라드' }, { name: '황금독수리세상을놀라게하다' }])(
    '유효한 글자수가 아닌 $name을 입력하면 에러가 발생한다.',
    ({ name }) => {
      const { MIN_NAME_LENGTH: min, MAX_NAME_LENGTH: max } = Player.CREATION_CONDITION;
      expect(() => {
        new Player({ name, hp: 100, mp: 100 });
      }).toThrow(ERROR_MESSAGE.IS_OUT_OF_RANGE({ target: '플레이어 이름', min, max }, '자'));
    }
  );

  it.each([
    { hp: 100, mp: 50 },
    { hp: 100, mp: 99 },
  ])('hp와 mp의 합이 200이 아닐 경우 에러가 발생한다.', ({ hp, mp }) => {
    expect(() => {
      new Player({ name: '플레이어', hp, mp });
    }).toThrow(ERROR_MESSAGE.INVALID_TOTAL_HP_MP);
  });
});
