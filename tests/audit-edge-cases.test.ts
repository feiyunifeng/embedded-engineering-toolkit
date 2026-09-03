import { describe, expect, it } from 'vitest';
import { calculateUart } from '../src/lib/uart';
import { calculateTimer, solvePwm } from '../src/lib/stm32';

describe('上线前边界审计', () => {
  it('rejects runtime UART enum and overflow inputs', () => {
    expect(() => calculateUart({ baudRate: 9600, bytes: 1, dataBits: 8, parity: 'bad' as any, stopBits: 1 })).toThrow();
    expect(() => calculateUart({ baudRate: 1, bytes: Number.MAX_VALUE, dataBits: 9, parity: 'odd', stopBits: 2 })).toThrow();
  });
  it('validates 32-bit register limits and invalid width', () => {
    expect(calculateTimer({ timerClock: 1_000_000, psc: 0xffffffff, arr: 0xffffffff, ccr: 0xffffffff, width: 32 }).frequency).toBeGreaterThan(0);
    expect(() => calculateTimer({ timerClock: 1, psc: 0, arr: 1, ccr: 1, width: 8 as any })).toThrow();
  });
  it('keeps very-low-frequency solving bounded for 32-bit timers', () => {
    const result = solvePwm(72_000_000, 0.001, 32);
    expect(result.errorPercent).toBeLessThan(0.01);
  });
});
