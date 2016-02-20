export class Wrap {
  constructor(
    public prefix: string,
    public suffix: string) {}
}

export const DEFAULT_WRAP = new Wrap('$$@','>>#');