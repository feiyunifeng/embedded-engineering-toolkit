export type Parity = 'none' | 'even' | 'odd';
export interface UartInput { baudRate: number; bytes: number; dataBits: 5|6|7|8|9; parity: Parity; stopBits: 1|1.5|2 }
export interface UartResult { bitsPerFrame:number; totalBits:number; seconds:number; payloadBitsPerSecond:number }
export function calculateUart(i: UartInput): UartResult {
  if (!Number.isFinite(i.baudRate)||i.baudRate<=0) throw new RangeError('Baud rate must be greater than zero.');
  if (!Number.isFinite(i.bytes)||i.bytes<0||!Number.isInteger(i.bytes)) throw new RangeError('Bytes must be a non-negative integer.');
  if (![5,6,7,8,9].includes(i.dataBits)) throw new RangeError('Data bits must be from 5 to 9.');
  if (!['none','even','odd'].includes(i.parity)) throw new RangeError('Parity must be None, Even, or Odd.');
  if (![1,1.5,2].includes(i.stopBits)) throw new RangeError('Stop bits must be 1, 1.5, or 2.');
  const bitsPerFrame=1+i.dataBits+(i.parity==='none'?0:1)+i.stopBits;
  const totalBits=bitsPerFrame*i.bytes, seconds=totalBits/i.baudRate;
  if (!Number.isFinite(totalBits)||!Number.isFinite(seconds)) throw new RangeError('The input values are too large to represent safely.');
  return {bitsPerFrame,totalBits,seconds,payloadBitsPerSecond:seconds===0?0:(i.bytes*8)/seconds};
}
export function formatDuration(s:number){ if(s<.001)return `${(s*1e6).toFixed(2)} μs`; if(s<1)return `${(s*1e3).toFixed(3)} ms`; return `${s.toFixed(3)} s`; }
