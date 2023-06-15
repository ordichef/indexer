export type BRC20 = {
  p: 'brc-20';
  op: 'transfer' | 'deploy' | 'mint';
  tick: string;
  amt: string;
}
