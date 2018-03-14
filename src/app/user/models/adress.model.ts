export class Address {
  constructor(
    public description?: string,
    public street?: string,
    public number?: number,
    public city?: string,
    public state?: string,
    public postalCode?: number,
    public active?: boolean
  ) {
    this.description = description || 'Primary';
  }
}
