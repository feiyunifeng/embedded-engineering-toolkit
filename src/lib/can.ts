export type CanFormat='standard'|'extended';
export interface CanInput {format:CanFormat;bitRate:number;dataLength:number;messagesPerSecond:number;messageCount:number}
export interface CanEstimate {baseBits:number;conservativeBits:number;frameSeconds:number;conservativeFrameSeconds:number;utilization:number;conservativeUtilization:number;remaining:number;conservativeRemaining:number}
export function baseCanFrameBits(format:CanFormat,dataLength:number){
  if(!Number.isInteger(dataLength)||dataLength<0||dataLength>8)throw new RangeError('Data length must be an integer from 0 to 8 bytes.');
  if(!['standard','extended'].includes(format))throw new RangeError('Unknown CAN identifier format.');
  return (format==='standard'?47:67)+dataLength*8; // includes 3-bit intermission
}
export function conservativeStuffedBits(baseBits:number){if(!Number.isFinite(baseBits)||baseBits<=0)throw new RangeError('Frame bits must be positive.'); return Math.ceil(baseBits*1.2);}
export function calculateCan(i:CanInput):CanEstimate{
  for(const [n,v] of [['Bit rate',i.bitRate],['Messages per second',i.messagesPerSecond],['Message count',i.messageCount]] as const)if(!Number.isFinite(v)||v<0)throw new RangeError(`${n} cannot be negative.`);
  if(i.bitRate===0)throw new RangeError('Bit rate must be greater than zero.'); if(!Number.isInteger(i.messageCount))throw new RangeError('Message count must be an integer.');
  const baseBits=baseCanFrameBits(i.format,i.dataLength),conservativeBits=conservativeStuffedBits(baseBits),frames=i.messagesPerSecond*i.messageCount;
  const utilization=baseBits*frames/i.bitRate*100,conservativeUtilization=conservativeBits*frames/i.bitRate*100;
  return {baseBits,conservativeBits,frameSeconds:baseBits/i.bitRate,conservativeFrameSeconds:conservativeBits/i.bitRate,utilization,conservativeUtilization,remaining:Math.max(0,100-utilization),conservativeRemaining:Math.max(0,100-conservativeUtilization)};
}
